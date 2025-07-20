import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'travelerName',
    label: '',
  },
  {
    component: 'Select',
    componentProps: {},
    fieldName: 'documentType',
    label: '',
  },
  {
    component: 'Input',
    fieldName: 'documentNumber',
    label: '',
  },
  {
    component: 'Input',
    fieldName: 'gender',
    label: '',
  },
  {
    component: 'Input',
    fieldName: 'language',
    label: '',
  },
  {
    component: 'Input',
    fieldName: 'phoneNumber',
    label: '',
  },
  {
    component: 'Input',
    fieldName: 'service',
    label: '',
  },
  {
    component: 'Input',
    fieldName: 'address',
    label: '',
  },
  {
    component: 'Textarea',
    fieldName: 'remarks',
    label: '',
  },
  {
    component: 'Select',
    componentProps: {},
    fieldName: 'travelerType',
    label: '',
  },
  {
    component: 'Input',
    fieldName: 'flightNumber',
    label: '',
  },
  {
    component: 'Input',
    fieldName: 'checkedBaggage',
    label: '',
  },
  {
    component: 'Input',
    fieldName: 'handBaggage',
    label: '',
  },
  {
    component: 'Input',
    fieldName: 'companionName',
    label: '',
  },
  {
    component: 'Input',
    fieldName: 'relation',
    label: '',
  },
  {
    component: 'Input',
    fieldName: 'companionPhone',
    label: '',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      optionType: 'button',
    },
    fieldName: 'status',
    label: '状态',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'flightTime',
    label: '',
  },
  {
    component: 'Input',
    fieldName: 'staffId',
    label: '服务人员',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'orderTime',
    label: '接单时间',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'serviceStartTime',
    label: '服务开始时间',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'serviceEndTime',
    label: '服务结束时间',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'cancelTime',
    label: '取消时间',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '',
    field: 'bookId',
  },
  {
    title: '',
    field: 'travelerName',
  },
  {
    title: '',
    field: 'documentType',
  },
  {
    title: '',
    field: 'documentNumber',
  },
  {
    title: '',
    field: 'gender',
  },
  {
    title: '',
    field: 'language',
  },
  {
    title: '',
    field: 'phoneNumber',
  },
  {
    title: '',
    field: 'service',
  },
  {
    title: '',
    field: 'address',
  },
  {
    title: '',
    field: 'remarks',
  },
  {
    title: '',
    field: 'travelerType',
  },
  {
    title: '',
    field: 'flightNumber',
  },
  {
    title: '',
    field: 'checkedBaggage',
  },
  {
    title: '',
    field: 'handBaggage',
  },
  {
    title: '',
    field: 'companionName',
  },
  {
    title: '',
    field: 'relation',
  },
  {
    title: '',
    field: 'companionPhone',
  },
  {
    title: '状态',
    field: 'status',
  },
  {
    title: '',
    field: 'flightTime',
  },
  {
    title: '服务人员',
    field: 'staffId',
  },
  {
    title: '接单时间',
    field: 'orderTime',
  },
  {
    title: '服务开始时间',
    field: 'serviceStartTime',
  },
  {
    title: '服务结束时间',
    field: 'serviceEndTime',
  },
  {
    title: '取消时间',
    field: 'cancelTime',
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 180,
  },
];
