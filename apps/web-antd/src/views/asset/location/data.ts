import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { DictEnum } from '@vben/constants';

import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'locationName',
    label: '位置名称',
  },
  {
    component: 'Input',
    fieldName: 'parentLocationId',
    label: '父位置ID',
  },
  {
    component: 'Input',
    fieldName: 'locationCode',
    label: '位置编码',
  },
  {
    component: 'Input',
    fieldName: 'description',
    label: '位置描述',
  },
  {
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.ASSET_LOCATION_TYPE 便于维护
      options: getDictOptions(DictEnum.ASSET_LOCATION_TYPE),
    },
    fieldName: 'locationType',
    label: '位置类型',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
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
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.ASSET_LOCATION_TYPE 便于维护
        return renderDict(row.locationType, DictEnum.ASSET_LOCATION_TYPE);
      },
    },
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 180,
  },
];

export const modalSchema: FormSchemaGetter = () => [
  {
    label: '位置ID',
    fieldName: 'locationId',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '位置名称',
    fieldName: 'locationName',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '父位置ID',
    fieldName: 'parentLocationId',
    component: 'TreeSelect',
  },
  {
    label: '位置编码',
    fieldName: 'locationCode',
    component: 'Input',
  },
  {
    label: '位置描述',
    fieldName: 'description',
    component: 'Input',
  },
  {
    label: '位置类型',
    fieldName: 'locationType',
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.ASSET_LOCATION_TYPE 便于维护
      options: getDictOptions('asset_location_type'),
    },
  },
];
