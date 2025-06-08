import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'specificationName',
    label: '规格型号名称',
  },
  {
    component: 'Input',
    fieldName: 'categoryId',
    label: '资产分类ID',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '规格型号ID',
    field: 'specificationId',
  },
  {
    title: '规格型号名称',
    field: 'specificationName',
  },
  {
    title: '资产分类ID',
    field: 'categoryId',
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
    label: '规格型号ID',
    fieldName: 'specificationId',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '规格型号名称',
    fieldName: 'specificationName',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '资产分类ID',
    fieldName: 'categoryId',
    component: 'Input',
  },
];
