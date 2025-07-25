import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'bookId',
    label: '',
  },
  {
    component: 'Input',
    fieldName: 'serviceAttitude',
    label: '',
  },
  {
    component: 'Input',
    fieldName: 'professionalism',
    label: '',
  },
  {
    component: 'Input',
    fieldName: 'evaluationContent',
    label: '',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '',
    field: 'evaluationId',
  },
  {
    title: '',
    field: 'bookId',
  },
  {
    title: '',
    field: 'serviceAttitude',
  },
  {
    title: '',
    field: 'professionalism',
  },
  {
    title: '',
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
    label: '',
    fieldName: 'evaluationId',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '',
    fieldName: 'bookId',
    component: 'Input',
  },
  {
    label: '',
    fieldName: 'serviceAttitude',
    component: 'Input',
  },
  {
    label: '',
    fieldName: 'professionalism',
    component: 'Input',
  },
  {
    label: '',
    fieldName: 'evaluationContent',
    component: 'RichTextarea',
    componentProps: {
      // disabled: false, // 是否只读
      // height: 400 // 高度 默认400
    },
  },
];
