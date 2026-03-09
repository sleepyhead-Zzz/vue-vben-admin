<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';

import { useRouter } from 'vue-router';

import { Page } from '@vben/common-ui';
import { DictEnum } from '@vben/constants';

import { Progress, Space } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { pageJobs } from '#/api/system/jobTask';
import { renderDict } from '#/utils/render';

import { columns, querySchema } from './data';

const router = useRouter();

const formOptions: VbenFormProps = {
  commonConfig: {
    labelWidth: 80,
    componentProps: {
      allowClear: true,
    },
  },
  schema: querySchema(),
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
};

const gridOptions: VxeGridProps = {
  columns,
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues = {}) => {
        const { data } = await pageJobs({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
        return data;
      },
    },
  },
  rowConfig: {
    keyField: 'taskId',
  },
  id: 'system-job-task-index',
};

const [BasicTable] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

function handleView(row: SystemAPI.JobTaskDTO) {
  router.push(`/system/job-task/${row.taskId}`);
}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="任务列表">
      <template #status="{ row }">
        <component
          :is="renderDict(row.status || '', DictEnum.SYS_JOB_TASK_STATUS)"
        />
      </template>

      <template #progress="{ row }">
        <Progress :percent="Number(row.progress ?? 0)" size="small" />
      </template>

      <template #action="{ row }">
        <Space>
          <ghost-button
            v-access:code="['system:job:query']"
            @click.stop="handleView(row)"
          >
            查看
          </ghost-button>
        </Space>
      </template>
    </BasicTable>
  </Page>
</template>
