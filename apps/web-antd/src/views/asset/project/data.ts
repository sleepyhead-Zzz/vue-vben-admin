import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'projectName',
    label: '检查项名称',
  },
  {
    component: 'Input',
    fieldName: 'projectType',
    label: '检查方法',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '检查项ID',
    field: 'projectId',
    visible: false,
  },
  {
    title: '检查项名称',
    field: 'projectName',
  },
  {
    title: '检查方法',
    field: 'projectType',
  },
  {
    title: '数值下限',
    field: 'minValue',
  },
  {
    title: '数值上限',
    field: 'maxValue',
  },
  {
    title: '单位',
    field: 'unit',
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
    label: '检查项ID',
    fieldName: 'projectId',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '检查项名称',
    fieldName: 'projectName',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '检查方法',
    fieldName: 'projectType',
    component: 'Input',
  },
  {
    label: '数值下限',
    fieldName: 'minValue',
    component: 'Input',
  },
  {
    label: '数值上限',
    fieldName: 'maxValue',
    component: 'Input',
  },
  {
    label: '单位',
    fieldName: 'unit',
    component: 'Input',
  },
];
