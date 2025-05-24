import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'bucketName',
    label: '',
  },
  {
    component: 'Input',
    fieldName: 'fileName',
    label: '文件名',
  },
  {
    component: 'Input',
    fieldName: 'filePath',
    label: '文件存储路径',
  },
  {
    component: 'Input',
    fieldName: 'originalName',
    label: '',
  },
  {
    component: 'Input',
    fieldName: 'fileSize',
    label: '文件大小',
  },
  {
    component: 'Select',
    componentProps: {},
    fieldName: 'fileType',
    label: '文件类型',
  },
  {
    component: 'Input',
    fieldName: 'fileExtension',
    label: '文件扩展名',
  },
  {
    component: 'Input',
    fieldName: 'accessPolicy',
    label: '',
  },
  {
    component: 'Input',
    fieldName: 'url',
    label: '',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      optionType: 'button',
    },
    fieldName: 'status',
    label: '',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '',
    field: 'fileId',
  },
  {
    title: '',
    field: 'bucketName',
  },
  {
    title: '文件名',
    field: 'fileName',
  },
  {
    title: '文件存储路径',
    field: 'filePath',
  },
  {
    title: '',
    field: 'originalName',
  },
  {
    title: '文件大小',
    field: 'fileSize',
  },
  {
    title: '文件类型',
    field: 'fileType',
  },
  {
    title: '文件扩展名',
    field: 'fileExtension',
  },
  {
    title: '',
    field: 'accessPolicy',
  },
  {
    title: '',
    field: 'url',
  },
  {
    title: '',
    field: 'status',
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 180,
  },
];
