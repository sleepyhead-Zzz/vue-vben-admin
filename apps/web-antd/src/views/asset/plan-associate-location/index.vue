<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';

import { Page } from '@vben/common-ui';

import { Checkbox, message, Space } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  getLocationTree,
  getPlanLocations,
  savePlanLocations,
} from '#/api/asset/plan';

import { columns, querySchema } from './data';

type LocationId = NonNullable<AssetAPI.AssetLocationDTO['locationId']>;
type LocationNode = AssetAPI.AssetLocationDTO & {
  checked: boolean;
  children: LocationNode[];
  indeterminate: boolean;
  parent?: LocationNode;
};

const route = useRoute();
const planId = route.params.planId as unknown as AssetAPI.getPlanLocationsParams['planId'];
const ROOT_LOCATION_ID =
  '0' as unknown as AssetAPI.getLocationTreeParams['parentLocationId'];

// 已勾选叶子节点集合
const checkedLocationIdSet = reactive(new Set<LocationId>());

function isRootLocationId(
  value: '' | AssetAPI.AssetLocationDTO['parentLocationId'],
) {
  return (
    value === null ||
    value === undefined ||
    value === '' ||
    value === 0 ||
    value === ROOT_LOCATION_ID
  );
}

// 查询表单配置
const formOptions = {
  commonConfig: { labelWidth: 80, componentProps: { allowClear: true } },
  schema: querySchema(),
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
};

// 勾选/半选状态更新
function updateNodeCheckState(row: LocationNode, checked: boolean) {
  row.checked = checked;
  row.children?.forEach((c) => updateNodeCheckState(c, checked));
  let parent = row.parent;
  while (parent) {
    const allChecked = parent.children.every((c) => c.checked);
    const noneChecked = parent.children.every(
      (c) => !c.checked && !c.indeterminate,
    );
    parent.checked = allChecked;
    parent.indeterminate = !allChecked && !noneChecked;
    parent = parent.parent;
  }
}

// 表格配置
const gridOptions = {
  id: 'inspection-plan-location-select',
  columns: (columns ?? []).map((col) =>
    col.field === 'locationName'
      ? { ...col, slots: { default: 'checkbox-cell' } }
      : col,
  ),
  height: 'auto',
  rowConfig: { keyField: 'locationId' },
  pagerConfig: { enabled: false },
  proxyConfig: {
    ajax: {
      query: async () => {
        const resp = await getLocationTree({
          parentLocationId: ROOT_LOCATION_ID,
          planId,
        });
        const map = new Map<LocationId, LocationNode>();
        const list: LocationNode[] = (resp.data || []).map((item) => {
          const node: LocationNode = {
            ...item,
            checked: item.checked || false,
            indeterminate: item.hasChild
              ? item.checkedChildCount! > 0 &&
                item.checkedChildCount! < item.totalChildCount!
              : false,
            children: [],
          };
          if (node.locationId !== undefined) {
            map.set(node.locationId, node);
          }
          return node;
        });
        list.forEach((node) => {
          const parent = map.get(node.parentLocationId);
          if (!isRootLocationId(node.parentLocationId) && parent) {
            node.parent = parent;
            parent.children.push(node);
          }
        });
        return {
          rows: list.filter((node) => isRootLocationId(node.parentLocationId)),
        };
      },
    },
  },
  treeConfig: {
    parentField: 'parentLocationId',
    rowField: 'locationId',
    hasChildField: 'hasChild',
    transform: true,
    lazy: true,
    loadMethod: async ({ row }: { row: LocationNode }) => {
      const resp = await getLocationTree({
        parentLocationId: row.locationId,
        planId,
      });
      const children: LocationNode[] = (resp.data || []).map((item) => {
        const node: LocationNode = {
          ...item,
          checked: item.checked || false,
          indeterminate: item.hasChild
            ? item.checkedChildCount! > 0 &&
              item.checkedChildCount! < item.totalChildCount!
            : false,
          children: [],
          parent: row,
        };
        return node;
      });
      row.children = children;

      const total = row.children.length;
      const checkedCount = row.children.filter((c) => c.checked).length;
      row.checked = checkedCount === total;
      row.indeterminate = checkedCount > 0 && checkedCount < total;

      return children;
    },
  },
  scrollY: { enabled: true, gt: 0 },
};

const [BasicTable, tableApi] = useVbenVxeGrid({ formOptions, gridOptions });

// 工具栏
const expandAll = () => tableApi.grid?.setAllTreeExpand(true);
const collapseAll = () => tableApi.grid?.setAllTreeExpand(false);

// 初始化回显
async function initCheckedLocations() {
  if (!planId) return;
  const resp = await getPlanLocations({ planId });
  (resp.data?.checkedLocationIds || []).forEach((id) =>
    checkedLocationIdSet.add(id),
  );
}

// 保存
async function handleSubmit() {
  if (checkedLocationIdSet.size === 0) {
    message.warning('请至少选择一个巡检点位');
    return;
  }
  try {
    await savePlanLocations({
      planId,
      locationIds: [...checkedLocationIdSet],
    });
    message.success('保存成功');
  } catch (error) {
    console.error(error);
    message.error('保存失败，请重试');
  }
}

// checkbox change
function onCheckChange(row: LocationNode, e: { target: { checked: boolean } }) {
  const checked = e.target.checked;
  updateNodeCheckState(row, checked);

  function updateSet(node: LocationNode) {
    if (node.checked && (!node.children || node.children.length === 0))
      node.locationId !== undefined && checkedLocationIdSet.add(node.locationId);
    else if (!node.checked && node.locationId !== undefined)
      checkedLocationIdSet.delete(node.locationId);
    node.children?.forEach(updateSet);
  }
  updateSet(row);
}

// 生命周期
onMounted(async () => {
  await initCheckedLocations();
  await tableApi.query();
});
</script>

<template>
  <Page auto-content-height>
    <BasicTable table-title="选择巡检地点">
      <template #toolbar-tools>
        <Space>
          <a-button @click="collapseAll">折叠</a-button>
          <a-button @click="expandAll">展开</a-button>
          <a-button type="primary" @click="handleSubmit">保存</a-button>
        </Space>
      </template>

      <!-- 自定义复选框插槽 -->
      <template #checkbox-cell="{ row, level }">
        <div :style="{ paddingLeft: `${level * 16}px` }">
          <Checkbox
            :checked="row.checked"
            :indeterminate="row.indeterminate"
            @change="onCheckChange(row, $event)"
          >
            {{ row.locationName }}
          </Checkbox>
        </div>
      </template>
    </BasicTable>
  </Page>
</template>
