import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'userId',
    label: 'todo',
  },
  {
    component: 'Input',
    fieldName: 'productId',
    label: 'todo',
  },
  {
    component: 'Input',
    fieldName: 'periodId',
    label: 'todo',
  },
  {
    component: 'Input',
    fieldName: 'planProfit',
    label: '计划利润金额',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: 'todo',
    field: 'id',
  },
  {
    title: 'todo',
    field: 'userId',
  },
  {
    title: 'todo',
    field: 'productId',
  },
  {
    title: 'todo',
    field: 'periodId',
  },
  {
    title: '计划利润金额',
    field: 'planProfit',
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
    label: 'todo',
    fieldName: 'id',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: 'todo',
    fieldName: 'userId',
    component: 'Input',
  },
  {
    label: 'todo',
    fieldName: 'productId',
    component: 'Input',
  },
  {
    label: 'todo',
    fieldName: 'periodId',
    component: 'Input',
  },
  {
    label: '计划利润金额',
    fieldName: 'planProfit',
    component: 'Input',
    rules: 'required',
  },
];
