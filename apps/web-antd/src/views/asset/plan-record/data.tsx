import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { useRoute } from 'vue-router';

import { DictEnum } from '@vben/constants';

import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';

export const querySchema: FormSchemaGetter = () => {
  const route = useRoute();
  return [
    {
      component: 'Input',
      fieldName: 'planId',
      defaultValue: route.params.planId,
      label: '关联的巡检计划ID',
      show: false,
    },
    {
      component: 'Select',
      componentProps: {
        options: getDictOptions(DictEnum.ASSET_INSPECTION_STATUS),
      },
      fieldName: 'status',
      label: '巡检状态',
    },
  ];
};

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '巡检记录ID',
    field: 'inspectionId',
  },
  {
    title: '关联的巡检计划ID',
    field: 'planId',
  },
  {
    title: '巡检状态',
    field: 'status',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.ASSET_LOCATION_TYPE 便于维护
        return renderDict(row.status, DictEnum.ASSET_INSPECTION_STATUS);
      },
    },
  },
  {
    title: '巡检实际开始时间',
    field: 'startDate',
  },
  {
    title: '巡检实际结束时间',
    field: 'endDate',
  },
  {
    title: '巡检结果简述',
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
    label: '巡检记录ID',
    fieldName: 'inspectionId',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '关联的巡检计划ID',
    fieldName: 'planId',
    component: 'Input',
  },
  {
    label: '巡检任务ID',
    fieldName: 'taskId',
    component: 'Input',
    rules: 'required',
  },
  {
    component: 'Select',
    componentProps: {
      options: getDictOptions(DictEnum.ASSET_INSPECTION_STATUS),
    },
    fieldName: 'status',
    label: '巡检状态',
  },
  {
    label: '巡检实际开始时间',
    fieldName: 'startDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '巡检实际结束时间',
    fieldName: 'endDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '巡检结果简述',
    fieldName: 'description',
    component: 'Input',
  },
];
