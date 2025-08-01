import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { DictEnum } from '@vben/constants';

import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';

const certTypes = [
  { value: 1, label: '中国居民身份证' },
  { value: 2, label: '港澳居民来往内地通行证' },
  { value: 3, label: '护照' },
  { value: 4, label: '台湾居民来往大陆通行证' },
];

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'travelerName',
    label: '旅客姓名',
  },
  {
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '中国居民身份证',
          value: '中国居民身份证',
        },
        {
          label: '港澳居民来往内地通行证',
          value: '港澳居民来往内地通行证',
        },
        {
          label: '护照',
          value: '护照',
        },
        {
          label: '台湾居民来往大陆通行证',
          value: '台湾居民来往大陆通行证',
        },
      ],
      placeholder: '请选择',
    },
    fieldName: 'documentType',
    label: '证件类型',
  },
  {
    component: 'Input',
    fieldName: 'documentNumber',
    label: '证件号',
  },

  {
    component: 'Input',
    fieldName: 'phoneNumber',
    label: '手机号',
  },
  {
    component: 'Input',
    fieldName: 'service',
    label: '服务项目',
  },

  {
    component: 'Input',
    fieldName: 'travelerType',
    label: '旅客类型',
  },
  {
    component: 'Input',
    fieldName: 'flightNumber',
    label: '航班号',
  },

  {
    label: '状态',
    fieldName: 'status',
    component: 'Select',
    componentProps: {
      options: getDictOptions(DictEnum.TravelerBookStatus, true),
    },
  },
  {
    component: 'DatePicker',
    componentProps: {
      format: 'YYYY-MM-DD ',
      valueFormat: 'YYYY-MM-DD',
    },
    fieldName: 'flightTime',
    label: '航班时间',
  },
  {
    component: 'Input',
    fieldName: 'staffId',
    label: '服务人员',
  },
  {
    component: 'DatePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
    },
    fieldName: 'orderTime',
    label: '接单时间',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '',
    field: 'bookId',
    visible: false,
  },
  {
    title: '旅客姓名',
    field: 'travelerName',
  },
  {
    title: '证件类型',
    field: 'documentType',
  },
  {
    title: '证件号',
    field: 'documentNumber',
  },
  {
    title: '性别',
    field: 'gender',
  },
  {
    title: '语言',
    field: 'language',
  },
  {
    title: '手机号',
    field: 'phoneNumber',
  },
  {
    title: '服务类型',
    field: 'service',
  },

  {
    title: '旅客类型',
    field: 'travelerType',
  },
  {
    title: '航班号',
    field: 'flightNumber',
  },
  {
    title: '托运行李数量',
    field: 'checkedBaggage',
  },
  {
    title: '手提行李数量',
    field: 'handBaggage',
  },

  {
    title: '状态',
    field: 'status',
    slots: {
      default: ({ row }) => {
        return renderDict(row.status, DictEnum.TravelerBookStatus);
      },
    },
  },
  {
    title: '航班时间',
    field: 'flightTime',
  },
  {
    title: '服务人员',
    field: 'staffId',
    visible: false,
  },
  {
    title: '服务人员',
    field: 'staffName',
  },
  {
    title: '接单时间',
    field: 'orderTime',
  },

  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    className: 'action-column-wrap',
    width: 300,
  },
];

export const modalSchema: FormSchemaGetter = () => [
  {
    label: '',
    fieldName: 'bookId',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '旅客姓名',
    fieldName: 'travelerName',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '证件类型',
    fieldName: 'documentType',
    component: 'Select',
    componentProps: {
      options: certTypes,
    },
  },
  {
    label: '证件号',
    fieldName: 'documentNumber',
    component: 'Input',
  },
  {
    label: '性别',
    fieldName: 'gender',
    component: 'Input',
  },
  {
    label: '语言',
    fieldName: 'language',
    component: 'Input',
  },
  {
    label: '手机号',
    fieldName: 'phoneNumber',
    component: 'Input',
  },
  {
    label: '服务类型',
    fieldName: 'service',
    component: 'Input',
  },
  {
    label: '地址',
    fieldName: 'address',
    component: 'Input',
  },
  {
    label: '备注',
    fieldName: 'remarks',
    component: 'Textarea',
  },
  {
    label: '旅客类型',
    fieldName: 'travelerType',
    component: 'Input',
  },
  {
    label: '航班号',
    fieldName: 'flightNumber',
    component: 'Input',
  },
  {
    label: '托运行李数量',
    fieldName: 'checkedBaggage',
    component: 'Input',
  },
  {
    label: '手提行李数量',
    fieldName: 'handBaggage',
    component: 'Input',
  },
  {
    label: '陪同人姓名',
    fieldName: 'companionName',
    component: 'Input',
  },
  {
    label: '与乘机人关系',
    fieldName: 'relation',
    component: 'Input',
  },
  {
    label: '陪同人联系方式',
    fieldName: 'companionPhone',
    component: 'Input',
  },
  {
    label: '状态',
    fieldName: 'status',
    component: 'Select',
    componentProps: {
      options: getDictOptions(DictEnum.TravelerBookStatus, true),
    },
    disabled: true,
  },
  {
    label: '航班时间',
    fieldName: 'flightTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '服务人员',
    fieldName: 'staffId',
    component: 'Select',
  },
  {
    label: '接单时间',
    fieldName: 'orderTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '服务开始时间',
    fieldName: 'serviceStartTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '服务结束时间',
    fieldName: 'serviceEndTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '取消时间',
    fieldName: 'cancelTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
];

export const statusModalSchema: FormSchemaGetter = () => [
  {
    label: '',
    fieldName: 'bookId',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '旅客姓名',
    fieldName: 'travelerName',
    component: 'Input',
    rules: 'required',
    disabled: true,
  },
  {
    label: '证件类型',
    fieldName: 'documentType',
    component: 'Select',
    componentProps: {
      options: [
        { value: 1, label: '中国居民身份证' },
        { value: 2, label: '港澳居民来往内地通行证' },
        { value: 3, label: '护照' },
        { value: 4, label: '台湾居民来往大陆通行证' },
      ],
    },
    disabled: true,
  },
  {
    label: '证件号',
    fieldName: 'documentNumber',
    component: 'Input',
    disabled: true,
  },
  {
    label: '状态',
    fieldName: 'status',
    component: 'Select',
    componentProps: {
      options: getDictOptions(DictEnum.TravelerBookStatus, true),
    },
  },
];
