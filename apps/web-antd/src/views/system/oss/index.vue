<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';

import { onMounted, ref } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';
import { getVxePopupContainer } from '@vben/utils';

import {
  Image,
  message,
  Modal,
  Popconfirm,
  Space,
  Spin,
  Switch,
  Tooltip,
} from 'ant-design-vue';

import { useVbenVxeGrid, vxeCheckboxChecked } from '#/adapter/vxe-table';
import { downloadFile } from '#/api/core/download';
import { getConfigKey } from '#/api/system/config';
import { batchRemoveFile, getPagedFiles } from '#/api/system/file';
import { $t } from '#/locales';
import { calculateFileSize } from '#/utils/file';
import { downloadByData } from '#/utils/file/download';

import { supportImageList } from './constant';
import { columns, querySchema } from './data';
import fallbackImageBase64 from './fallback-image.txt?raw';
import fileUploadModal from './file-upload-modal.vue';
import imageUploadModal from './image-upload-modal.vue';

const formOptions: VbenFormProps = {
  commonConfig: {
    labelWidth: 80,
    componentProps: {
      allowClear: true,
    },
  },
  schema: querySchema(),
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  // 日期选择格式化
  fieldMappingTime: [
    [
      'createTime',
      ['params[beginCreateTime]', 'params[endCreateTime]'],
      ['YYYY-MM-DD 00:00:00', 'YYYY-MM-DD 23:59:59'],
    ],
  ],
};

const gridOptions: VxeGridProps = {
  checkboxConfig: {
    // 高亮
    highlight: true,
    // 翻页时保留选中状态
    reserve: true,
    // 点击行选中
    // trigger: 'row',
  },
  // 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
  // columns: columns(),
  columns,
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues = {}) => {
        const { data } = await getPagedFiles({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
        return data;
      },
    },
  },
  rowConfig: {
    keyField: 'fileId',
  },
  // 表格全局唯一表示 保存列配置需要用到
  id: 'domain-file-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
  gridEvents: {
    // 排序 重新请求接口
    sortChange: () => tableApi.query(),
  },
});
async function handleDelete(row: SystemAPI.SysFileDTO) {
  await batchRemoveFile({ fileIds: [row.fileId ?? 0] });
  await tableApi.query();
}

async function handleDownload(row: SystemAPI.SysFileDTO) {
  const downloadSize = ref($t('pages.common.downloadLoading'));
  const hideLoading = message.loading({
    content: () => downloadSize.value,
    duration: 0,
  });
  try {
    const { data } = await downloadFile({ fileId: row.fileId }, (e) => {
      const percent = Math.floor((e.loaded / e.total!) * 100);
      const current = calculateFileSize(e.loaded);
      const total = calculateFileSize(e.total!);
      downloadSize.value = `已下载: ${current}/${total} (${percent}%)`;
    });

    downloadByData(data, row.originalName);
    message.success('下载完成');
  } catch {
    message.error('下载失败，请稍后再试');
  } finally {
    hideLoading();
  }
}

function handleMultiDelete() {
  const rows = tableApi.grid.getCheckboxRecords();
  const ids = rows.map((row) => row.fileId);
  Modal.confirm({
    title: '提示',
    okType: 'danger',
    content: `确认删除选中的${ids.length}条记录吗？`,
    onOk: async () => {
      await batchRemoveFile({ ids });
      await tableApi.query();
    },
  });
}

const preview = ref(false);
onMounted(async () => {
  const { data } = await getConfigKey({
    configKey: 'sys.oss.previewListResource',
  });
  preview.value = data === 'true';
});

/**
 * 根据拓展名判断是否是图片
 * @param ext 拓展名
 */
function isImageFile(ext: string) {
  return supportImageList.some((item) =>
    ext.toLocaleLowerCase().includes(item),
  );
}

/**
 * 判断是否是pdf文件
 * @param ext 扩展名
 */
function isPdfFile(ext: string) {
  return ext.toLocaleLowerCase().includes('pdf');
}

/**
 * pdf预览 使用浏览器接管
 * @param url 文件地址
 */
function pdfPreview(url: string) {
  window.open(url);
}
const [ImageUploadModal, imageUploadApi] = useVbenModal({
  connectedComponent: imageUploadModal,
});

const [FileUploadModal, fileUploadApi] = useVbenModal({
  connectedComponent: fileUploadModal,
});
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="文件上传列表">
      <template #toolbar-tools>
        <Space>
          <Tooltip title="预览图片">
            <Switch v-model:checked="preview" />
          </Tooltip>
          <a-button
            :disabled="!vxeCheckboxChecked(tableApi)"
            danger
            type="primary"
            v-access:code="['domain:file:remove']"
            @click="handleMultiDelete"
          >
            {{ $t('pages.common.delete') }}
          </a-button>
          <a-button
            v-access:code="['system:oss:upload']"
            @click="fileUploadApi.open"
          >
            文件上传
          </a-button>
          <a-button
            v-access:code="['system:oss:upload']"
            @click="imageUploadApi.open"
          >
            图片上传
          </a-button>
        </Space>
      </template>
      <template #url="{ row }">
        <!-- placeholder为图片未加载时显示的占位图 -->
        <!-- fallback为图片加载失败时显示 -->
        <!-- 需要设置key属性 否则切换翻页会有延迟 -->
        <Image
          :key="row.ossId"
          v-if="preview && isImageFile(row.url)"
          :src="row.url"
          height="50px"
          :fallback="fallbackImageBase64"
        >
          <template #placeholder>
            <div class="flex size-full items-center justify-center">
              <Spin />
            </div>
          </template>
        </Image>
        <!-- pdf预览 使用浏览器开新窗口 -->
        <span
          v-else-if="preview && isPdfFile(row.url)"
          class="icon-[vscode-icons--file-type-pdf2] size-10 cursor-pointer"
          @click.stop="pdfPreview(row.url)"
        ></span>
        <span v-else>{{ row.url }}</span>
      </template>

      <template #action="{ row }">
        <Space>
          <ghost-button
            v-access:code="['system:oss:download']"
            @click="handleDownload(row)"
          >
            {{ $t('pages.common.download') }}
          </ghost-button>
          <Popconfirm
            :get-popup-container="getVxePopupContainer"
            placement="left"
            title="确认删除？"
            @confirm="handleDelete(row)"
          >
            <ghost-button
              danger
              v-access:code="['domain:file:remove']"
              @click.stop=""
            >
              {{ $t('pages.common.delete') }}
            </ghost-button>
          </Popconfirm>
        </Space>
      </template>
    </BasicTable>
    <ImageUploadModal @reload="tableApi.query" />
    <FileUploadModal @reload="tableApi.query" />
  </Page>
</template>
