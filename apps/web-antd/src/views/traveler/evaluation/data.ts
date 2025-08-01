import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

export const querySchema: FormSchemaGetter = () => [];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '评价ID',
    field: 'evaluationId',
  },
  {
    title: '预约ID',
    field: 'bookId',
  },
  {
    title: '服务态度',
    field: 'serviceAttitude',
  },
  {
    title: '专业能力',
    field: 'professionalism',
  },
  {
    title: '评语',
    field: 'evaluationContent',
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
    label: '评价ID',
    fieldName: 'evaluationId',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '预约ID',
    fieldName: 'bookId',
    component: 'Input',
  },
  {
    label: '服务态度',
    fieldName: 'serviceAttitude',
    component: 'Input',
  },
  {
    label: '专业能力',
    fieldName: 'professionalism',
    component: 'Input',
  },
  {
    label: '评语',
    fieldName: 'evaluationContent',
    component: 'Textarea',
    componentProps: {
      // disabled: false, // 是否只读
      // height: 400 // 高度 默认400
    },
  },
];
