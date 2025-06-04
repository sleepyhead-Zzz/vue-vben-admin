import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

export const querySchema: FormSchemaGetter = () => [
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
    fieldName: 'fileExtension',
    label: '文件扩展名',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '文件名',
    field: 'fileName',
  },
  {
    title: '文件原名',
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
    title: '文件预览',
    field: 'url',
    showOverflow: true,
    slots: { default: 'url' },
  },
  {
    title: '创建时间',
    field: 'createTime',
    sortable: true,
  },
  {
    title: '上传人',
    field: 'creatorId',
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 180,
  },
];
