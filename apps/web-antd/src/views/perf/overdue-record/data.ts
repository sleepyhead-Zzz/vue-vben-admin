import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'userId',
    label: '',
  },
  {
    component: 'Input',
    fieldName: 'customerId',
    label: '',
  },
  {
    component: 'Input',
    fieldName: 'periodId',
    label: '',
  },
  {
    component: 'Input',
    fieldName: 'overdueLevel',
    label: '逾期区间：0_10/11_30/31_59/60_90/90_plus',
  },
  {
    component: 'Input',
    fieldName: 'scoreValue',
    label: '最终扣分值',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '',
    field: 'overdueId',
  },
  {
    title: '',
    field: 'userId',
  },
  {
    title: '',
    field: 'customerId',
  },
  {
    title: '',
    field: 'periodId',
  },
  {
    title: '逾期区间：0_10/11_30/31_59/60_90/90_plus',
    field: 'overdueLevel',
  },
  {
    title: '最终扣分值',
    field: 'scoreValue',
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
    label: '',
    fieldName: 'overdueId',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '',
    fieldName: 'userId',
    component: 'Input',
  },
  {
    label: '',
    fieldName: 'customerId',
    component: 'Input',
  },
  {
    label: '',
    fieldName: 'periodId',
    component: 'Input',
  },
  {
    label: '逾期区间：0_10/11_30/31_59/60_90/90_plus',
    fieldName: 'overdueLevel',
    component: 'Input',
  },
  {
    label: '最终扣分值',
    fieldName: 'scoreValue',
    component: 'Input',
  },
];
