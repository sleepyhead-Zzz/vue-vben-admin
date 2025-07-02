import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'assetCode',
    label: '资产编号',
  },
  {
    component: 'Input',
    fieldName: 'assetName',
    label: '资产名称',
  },
  {
    component: 'TreeSelect',
    // 在drawer里更新 这里不需要默认的componentProps
    defaultValue: undefined,
    fieldName: 'manageDeptId',
    label: '所属部门',
  },
  {
    label: '位置',
    defaultValue: undefined,
    fieldName: 'locationId',
    component: 'TreeSelect',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '资产编号',
    field: 'assetCode',
  },
  {
    title: '资产名称',
    field: 'assetName',
  },

  {
    title: '所属部门ID',
    field: 'manageDeptId',
    visible: false,
  },
  {
    title: '所属部门',
    field: 'manageDeptName',
  },
  {
    title: '位置ID',
    field: 'locationId',
    visible: false,
  },
  {
    title: '位置',
    field: 'locationName',
  },
  {
    title: '使用人',
    field: 'userId',
    visible: false,
  },
  {
    title: '使用人',
    field: 'userName',
  },
  {
    title: '资产描述',
    field: 'description',
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
    label: '主键ID',
    fieldName: 'furnitureId',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '资产编号',
    fieldName: 'assetCode',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '资产名称',
    fieldName: 'assetName',
    component: 'Input',
    rules: 'required',
  },
  {
    component: 'TreeSelect',
    // 在drawer里更新 这里不需要默认的componentProps
    defaultValue: undefined,
    fieldName: 'manageDeptId',
    label: '所属部门',
    rules: 'selectRequired',
  },
  {
    label: '位置',
    defaultValue: undefined,
    fieldName: 'locationId',
    component: 'TreeSelect',
    rules: 'selectRequired',
  },
  {
    label: '使用人',
    fieldName: 'userId',
    component: 'Select',
    rules: 'selectRequired',
  },
  {
    label: '资产描述',
    fieldName: 'description',
    component: 'Textarea',
  },
];
