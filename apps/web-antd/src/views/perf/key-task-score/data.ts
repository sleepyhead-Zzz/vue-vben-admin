import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';
import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'userId',
    label: '',
  },
  {
    component: 'Input',
    fieldName: 'periodId',
    label: '',
  },
  {
    component: 'Input',
    fieldName: 'scoreValue',
    label: '重点工作平均得分',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '',
    field: 'taskId',
  },
  {
    title: '',
    field: 'userId',
  },
  {
    title: '',
    field: 'periodId',
  },
  {
    title: '重点工作平均得分',
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
    fieldName: 'taskId',
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
    fieldName: 'periodId',
    component: 'Input',
  },
  {
    label: '重点工作平均得分',
    fieldName: 'scoreValue',
    component: 'Input',
  },
];
