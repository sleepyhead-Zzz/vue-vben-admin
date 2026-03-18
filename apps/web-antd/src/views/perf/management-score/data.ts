import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { DictEnum } from '@vben/constants';
import { getPopupContainer } from '@vben/utils';

import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Select',
    fieldName: 'userId',
    label: '销售人员',
  },
  {
    component: 'Select',
    componentProps: {
      getPopupContainer,
      options: [],
      optionFilterProp: 'label',
      optionLabelProp: 'label',
      showSearch: true,
    },
    fieldName: 'periodId',
    label: '绩效周期',
  },
  {
    component: 'Select',
    componentProps: {
      getPopupContainer,
      options: getDictOptions(DictEnum.PerfManagementScoreType),
    },
    fieldName: 'scoreType',
    label: '评分类型',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '记录ID',
    field: 'managementId',
    visible: false,
  },
  {
    title: '销售人员ID',
    field: 'userId',
    visible: false,
  },
  {
    title: '销售人员',
    field: 'userName',
    formatter({ row }) {
      return row.userName || row.userId || '-';
    },
  },
  {
    title: '绩效周期ID',
    field: 'periodId',
    visible: false,
  },
  {
    title: '绩效周期',
    field: 'periodName',
    formatter({ row }) {
      return row.periodName || row.periodId || '-';
    },
  },
  {
    title: '评分类型',
    field: 'scoreType',
    slots: {
      default: ({ row }) => {
        return renderDict(row.scoreType, DictEnum.PerfManagementScoreType);
      },
    },
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
    label: '记录ID',
    fieldName: 'managementId',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '销售人员',
    fieldName: 'userId',
    component: 'Select',
    componentProps: {
      getPopupContainer,
      options: [],
      optionFilterProp: 'label',
      optionLabelProp: 'label',
      showSearch: true,
    },
    rules: 'selectRequired',
  },
  {
    label: '绩效周期',
    fieldName: 'periodId',
    component: 'Select',
    componentProps: {
      getPopupContainer,
      options: [],
      optionFilterProp: 'label',
      optionLabelProp: 'label',
      showSearch: true,
    },
    rules: 'selectRequired',
  },
  {
    label: '评分类型',
    fieldName: 'scoreType',
    component: 'Select',
    componentProps: {
      getPopupContainer,
      options: getDictOptions(DictEnum.PerfManagementScoreType),
    },
    rules: 'selectRequired',
  },
  {
    label: '得分',
    fieldName: 'scoreValue',
    component: 'InputNumber',
    componentProps: {
      precision: 2,
    },
    rules: 'required',
  },
];
