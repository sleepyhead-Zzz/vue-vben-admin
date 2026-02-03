import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { DictEnum } from '@vben/constants';

import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';

/* 查询条件 */
export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'locationName',
    label: '位置名称',
  },
  {
    component: 'Input',
    fieldName: 'locationCode',
    label: '位置编码',
  },
  {
    component: 'Select',
    fieldName: 'locationType',
    label: '位置类型',
    componentProps: {
      options: getDictOptions(DictEnum.ASSET_LOCATION_TYPE),
    },
  },
];

/* 表格列 */
export const columns: VxeGridProps['columns'] = [
  {
    title: '位置名称',
    field: 'locationName',
    treeNode: true,
  },
  {
    title: '位置编码',
    field: 'locationCode',
  },
  {
    title: '位置类型',
    field: 'locationType',
    slots: {
      default: ({ row }) =>
        renderDict(row.locationType, DictEnum.ASSET_LOCATION_TYPE),
    },
  },
];
