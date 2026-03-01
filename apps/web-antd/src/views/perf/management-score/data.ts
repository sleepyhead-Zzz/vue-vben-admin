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
    component: 'Select',
    componentProps: {},
    fieldName: 'scoreType',
    label: '评分类型：WEEKLY_REPORT/SAMPLE/EXECUTION',
  },
  {
    component: 'Input',
    fieldName: 'scoreValue',
    label: '得分',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '',
    field: 'managementId',
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
    title: '评分类型：WEEKLY_REPORT/SAMPLE/EXECUTION',
    field: 'scoreType',
  },
  {
    title: '得分',
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
    fieldName: 'managementId',
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
    label: '评分类型：WEEKLY_REPORT/SAMPLE/EXECUTION',
    fieldName: 'scoreType',
    component: 'Select',
    componentProps: {},
  },
  {
    label: '得分',
    fieldName: 'scoreValue',
    component: 'Input',
  },
];
