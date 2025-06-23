import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'assetCategoryCode',
    label: '资产分类编号',
  },
  {
    component: 'Input',
    fieldName: 'assetCategoryName',
    label: '资产分类名称',
  },
  {
    component: 'Input',
    fieldName: 'assetName',
    label: '资产名称',
  },
  {
    component: 'Input',
    fieldName: 'unit',
    label: '计量单位',
  },
  {
    component: 'Input',
    fieldName: 'acquisitionMethod',
    label: '取得方式',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'acquisitionDate',
    label: '取得日期',
  },
  {
    component: 'Input',
    fieldName: 'procurementMethod',
    label: '采购组织形式',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'completionDate',
    label: '竣工日期',
  },
  {
    component: 'Input',
    fieldName: 'constructionMeasurement',
    label: '构筑物计量',
  },
  {
    component: 'Input',
    fieldName: 'usageYears',
    label: '使用年限',
  },
  {
    component: 'Input',
    fieldName: 'totalArea',
    label: '建筑面积',
  },
  {
    component: 'Input',
    fieldName: 'usableArea',
    label: '使用面积',
  },
  {
    component: 'Input',
    fieldName: 'officeArea',
    label: '实际办公室面积',
  },
  {
    component: 'Input',
    fieldName: 'meetingRoomArea',
    label: '会议室',
  },
  {
    component: 'Input',
    fieldName: 'garageArea',
    label: '车库',
  },
  {
    component: 'Input',
    fieldName: 'canteenArea',
    label: '食堂',
  },
  {
    component: 'Input',
    fieldName: 'powerRoomArea',
    label: '配电室',
  },
  {
    component: 'Input',
    fieldName: 'machineRoomArea',
    label: '机房',
  },
  {
    component: 'Input',
    fieldName: 'basementArea',
    label: '地下面积',
  },
  {
    component: 'Select',
    componentProps: {},
    fieldName: 'structureType',
    label: '建筑结构',
  },
  {
    component: 'Select',
    componentProps: {},
    fieldName: 'propertyType',
    label: '产权形式',
  },
  {
    component: 'Input',
    fieldName: 'ownershipProof',
    label: '权属证明',
  },
  {
    component: 'Input',
    fieldName: 'ownershipNumber',
    label: '权属证号',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'issueDate',
    label: '发证时间',
  },
  {
    component: 'Input',
    fieldName: 'location',
    label: '坐落位置',
  },
  {
    component: 'Select',
    componentProps: {},
    fieldName: 'valueType',
    label: '价值类型',
  },
  {
    component: 'Input',
    fieldName: 'originalValue',
    label: '价值',
  },
  {
    component: 'Input',
    fieldName: 'fundFinance',
    label: '财政拨款',
  },
  {
    component: 'Input',
    fieldName: 'fundBusiness',
    label: '事业收入',
  },
  {
    component: 'Input',
    fieldName: 'fundOffbudget',
    label: '其中：预算外收入',
  },
  {
    component: 'Input',
    fieldName: 'fundOther',
    label: '其他资金',
  },
  {
    component: 'Input',
    fieldName: 'fundBalance',
    label: '其中：财政性结余资金',
  },
  {
    component: 'Input',
    fieldName: 'accumulatedDepreciation',
    label: '累计折旧',
  },
  {
    component: 'Input',
    fieldName: 'netBookValue',
    label: '账面净值',
  },
  {
    component: 'Input',
    fieldName: 'voucherCode',
    label: '会计凭证号',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      optionType: 'button',
    },
    fieldName: 'depreciationStatus',
    label: '折旧状态',
  },
  {
    component: 'Input',
    fieldName: 'unitPrice',
    label: '均价',
  },
  {
    component: 'Input',
    fieldName: 'managementDept',
    label: '使用/管理部门',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      optionType: 'button',
    },
    fieldName: 'usageStatus',
    label: '使用状况',
  },
  {
    component: 'Input',
    fieldName: 'selfUseArea',
    label: '自用面积',
  },
  {
    component: 'Input',
    fieldName: 'lentArea',
    label: '出借面积',
  },
  {
    component: 'Input',
    fieldName: 'rentedArea',
    label: '出租面积',
  },
  {
    component: 'Input',
    fieldName: 'investArea',
    label: '对外投资面积',
  },
  {
    component: 'Input',
    fieldName: 'guaranteeArea',
    label: '担保面积',
  },
  {
    component: 'Input',
    fieldName: 'otherArea',
    label: '其他面积',
  },
  {
    component: 'Input',
    fieldName: 'selfUseValue',
    label: '自用价值',
  },
  {
    component: 'Input',
    fieldName: 'lentValue',
    label: '出借价值',
  },
  {
    component: 'Input',
    fieldName: 'rentedValue',
    label: '出租价值',
  },
  {
    component: 'Input',
    fieldName: 'investValue',
    label: '对外投资价值',
  },
  {
    component: 'Input',
    fieldName: 'guaranteeValue',
    label: '担保价值',
  },
  {
    component: 'Input',
    fieldName: 'otherValue',
    label: '其他价值',
  },
  {
    component: 'Input',
    fieldName: 'lentUnit',
    label: '出借对方单位',
  },
  {
    component: 'Input',
    fieldName: 'rentedUnit',
    label: '出租对方单位',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'useStartDate',
    label: '投入本单位使用时间',
  },
  {
    component: 'Textarea',
    fieldName: 'remarks',
    label: '备注',
  },
  {
    component: 'Input',
    fieldName: 'createdBy',
    label: '制单人',
  },
  {
    component: 'Input',
    fieldName: 'approvedBy',
    label: '审核人',
  },
  {
    component: 'Input',
    fieldName: 'depreciationRateMonthly',
    label: '月折旧率',
  },
  {
    component: 'Input',
    fieldName: 'depreciationAmountMonthly',
    label: '月折旧额',
  },
  {
    component: 'Input',
    fieldName: 'estimatedSalvage',
    label: '预计残值',
  },
  {
    component: 'Input',
    fieldName: 'salvageRate',
    label: '残值率',
  },
  {
    component: 'Input',
    fieldName: 'depreciatedMonths',
    label: '已提折旧月数',
  },
  {
    component: 'Input',
    fieldName: 'depreciationMethod',
    label: '折旧方法',
  },
  {
    component: 'Input',
    fieldName: 'isAccounted',
    label: '是否已入账',
  },
  {
    component: 'Input',
    fieldName: 'isDisposed',
    label: '是否未处置',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '主键 ID',
    field: 'estateId',
  },
  {
    title: '资产分类编号',
    field: 'assetCategoryCode',
  },
  {
    title: '资产分类名称',
    field: 'assetCategoryName',
  },
  {
    title: '资产名称',
    field: 'assetName',
  },
  {
    title: '计量单位',
    field: 'unit',
  },
  {
    title: '取得方式',
    field: 'acquisitionMethod',
  },
  {
    title: '取得日期',
    field: 'acquisitionDate',
  },
  {
    title: '采购组织形式',
    field: 'procurementMethod',
  },
  {
    title: '竣工日期',
    field: 'completionDate',
  },
  {
    title: '构筑物计量',
    field: 'constructionMeasurement',
  },
  {
    title: '使用年限',
    field: 'usageYears',
  },
  {
    title: '建筑面积',
    field: 'totalArea',
  },
  {
    title: '使用面积',
    field: 'usableArea',
  },
  {
    title: '实际办公室面积',
    field: 'officeArea',
  },
  {
    title: '会议室',
    field: 'meetingRoomArea',
  },
  {
    title: '车库',
    field: 'garageArea',
  },
  {
    title: '食堂',
    field: 'canteenArea',
  },
  {
    title: '配电室',
    field: 'powerRoomArea',
  },
  {
    title: '机房',
    field: 'machineRoomArea',
  },
  {
    title: '地下面积',
    field: 'basementArea',
  },
  {
    title: '建筑结构',
    field: 'structureType',
  },
  {
    title: '产权形式',
    field: 'propertyType',
  },
  {
    title: '权属证明',
    field: 'ownershipProof',
  },
  {
    title: '权属证号',
    field: 'ownershipNumber',
  },
  {
    title: '发证时间',
    field: 'issueDate',
  },
  {
    title: '坐落位置',
    field: 'location',
  },
  {
    title: '价值类型',
    field: 'valueType',
  },
  {
    title: '价值',
    field: 'originalValue',
  },
  {
    title: '财政拨款',
    field: 'fundFinance',
  },
  {
    title: '事业收入',
    field: 'fundBusiness',
  },
  {
    title: '其中：预算外收入',
    field: 'fundOffbudget',
  },
  {
    title: '其他资金',
    field: 'fundOther',
  },
  {
    title: '其中：财政性结余资金',
    field: 'fundBalance',
  },
  {
    title: '累计折旧',
    field: 'accumulatedDepreciation',
  },
  {
    title: '账面净值',
    field: 'netBookValue',
  },
  {
    title: '会计凭证号',
    field: 'voucherCode',
  },
  {
    title: '折旧状态',
    field: 'depreciationStatus',
  },
  {
    title: '均价',
    field: 'unitPrice',
  },
  {
    title: '使用/管理部门',
    field: 'managementDept',
  },
  {
    title: '使用状况',
    field: 'usageStatus',
  },
  {
    title: '自用面积',
    field: 'selfUseArea',
  },
  {
    title: '出借面积',
    field: 'lentArea',
  },
  {
    title: '出租面积',
    field: 'rentedArea',
  },
  {
    title: '对外投资面积',
    field: 'investArea',
  },
  {
    title: '担保面积',
    field: 'guaranteeArea',
  },
  {
    title: '其他面积',
    field: 'otherArea',
  },
  {
    title: '自用价值',
    field: 'selfUseValue',
  },
  {
    title: '出借价值',
    field: 'lentValue',
  },
  {
    title: '出租价值',
    field: 'rentedValue',
  },
  {
    title: '对外投资价值',
    field: 'investValue',
  },
  {
    title: '担保价值',
    field: 'guaranteeValue',
  },
  {
    title: '其他价值',
    field: 'otherValue',
  },
  {
    title: '出借对方单位',
    field: 'lentUnit',
  },
  {
    title: '出租对方单位',
    field: 'rentedUnit',
  },
  {
    title: '投入本单位使用时间',
    field: 'useStartDate',
  },
  {
    title: '备注',
    field: 'remarks',
  },
  {
    title: '制单人',
    field: 'createdBy',
  },
  {
    title: '审核人',
    field: 'approvedBy',
  },
  {
    title: '月折旧率',
    field: 'depreciationRateMonthly',
  },
  {
    title: '月折旧额',
    field: 'depreciationAmountMonthly',
  },
  {
    title: '预计残值',
    field: 'estimatedSalvage',
  },
  {
    title: '残值率',
    field: 'salvageRate',
  },
  {
    title: '已提折旧月数',
    field: 'depreciatedMonths',
  },
  {
    title: '折旧方法',
    field: 'depreciationMethod',
  },
  {
    title: '是否已入账',
    field: 'isAccounted',
  },
  {
    title: '是否未处置',
    field: 'isDisposed',
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
    label: '主键 ID',
    fieldName: 'estateId',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '资产分类编号',
    fieldName: 'assetCategoryCode',
    component: 'Input',
  },
  {
    label: '资产分类名称',
    fieldName: 'assetCategoryName',
    component: 'Input',
  },
  {
    label: '资产名称',
    fieldName: 'assetName',
    component: 'Input',
  },
  {
    label: '计量单位',
    fieldName: 'unit',
    component: 'Input',
  },
  {
    label: '取得方式',
    fieldName: 'acquisitionMethod',
    component: 'Input',
  },
  {
    label: '取得日期',
    fieldName: 'acquisitionDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '采购组织形式',
    fieldName: 'procurementMethod',
    component: 'Input',
  },
  {
    label: '竣工日期',
    fieldName: 'completionDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '构筑物计量',
    fieldName: 'constructionMeasurement',
    component: 'Input',
  },
  {
    label: '使用年限',
    fieldName: 'usageYears',
    component: 'Input',
  },
  {
    label: '建筑面积',
    fieldName: 'totalArea',
    component: 'Input',
  },
  {
    label: '使用面积',
    fieldName: 'usableArea',
    component: 'Input',
  },
  {
    label: '实际办公室面积',
    fieldName: 'officeArea',
    component: 'Input',
  },
  {
    label: '会议室',
    fieldName: 'meetingRoomArea',
    component: 'Input',
  },
  {
    label: '车库',
    fieldName: 'garageArea',
    component: 'Input',
  },
  {
    label: '食堂',
    fieldName: 'canteenArea',
    component: 'Input',
  },
  {
    label: '配电室',
    fieldName: 'powerRoomArea',
    component: 'Input',
  },
  {
    label: '机房',
    fieldName: 'machineRoomArea',
    component: 'Input',
  },
  {
    label: '地下面积',
    fieldName: 'basementArea',
    component: 'Input',
  },
  {
    label: '建筑结构',
    fieldName: 'structureType',
    component: 'Select',
    componentProps: {},
  },
  {
    label: '产权形式',
    fieldName: 'propertyType',
    component: 'Select',
    componentProps: {},
  },
  {
    label: '权属证明',
    fieldName: 'ownershipProof',
    component: 'Input',
  },
  {
    label: '权属证号',
    fieldName: 'ownershipNumber',
    component: 'Input',
  },
  {
    label: '发证时间',
    fieldName: 'issueDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '坐落位置',
    fieldName: 'location',
    component: 'Input',
  },
  {
    label: '价值类型',
    fieldName: 'valueType',
    component: 'Select',
    componentProps: {},
  },
  {
    label: '价值',
    fieldName: 'originalValue',
    component: 'Input',
  },
  {
    label: '财政拨款',
    fieldName: 'fundFinance',
    component: 'Input',
  },
  {
    label: '事业收入',
    fieldName: 'fundBusiness',
    component: 'Input',
  },
  {
    label: '其中：预算外收入',
    fieldName: 'fundOffbudget',
    component: 'Input',
  },
  {
    label: '其他资金',
    fieldName: 'fundOther',
    component: 'Input',
  },
  {
    label: '其中：财政性结余资金',
    fieldName: 'fundBalance',
    component: 'Input',
  },
  {
    label: '累计折旧',
    fieldName: 'accumulatedDepreciation',
    component: 'Input',
  },
  {
    label: '账面净值',
    fieldName: 'netBookValue',
    component: 'Input',
  },
  {
    label: '会计凭证号',
    fieldName: 'voucherCode',
    component: 'Input',
  },
  {
    label: '折旧状态',
    fieldName: 'depreciationStatus',
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      optionType: 'button',
    },
  },
  {
    label: '均价',
    fieldName: 'unitPrice',
    component: 'Input',
  },
  {
    label: '使用/管理部门',
    fieldName: 'managementDept',
    component: 'Input',
  },
  {
    label: '使用状况',
    fieldName: 'usageStatus',
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      optionType: 'button',
    },
  },
  {
    label: '自用面积',
    fieldName: 'selfUseArea',
    component: 'Input',
  },
  {
    label: '出借面积',
    fieldName: 'lentArea',
    component: 'Input',
  },
  {
    label: '出租面积',
    fieldName: 'rentedArea',
    component: 'Input',
  },
  {
    label: '对外投资面积',
    fieldName: 'investArea',
    component: 'Input',
  },
  {
    label: '担保面积',
    fieldName: 'guaranteeArea',
    component: 'Input',
  },
  {
    label: '其他面积',
    fieldName: 'otherArea',
    component: 'Input',
  },
  {
    label: '自用价值',
    fieldName: 'selfUseValue',
    component: 'Input',
  },
  {
    label: '出借价值',
    fieldName: 'lentValue',
    component: 'Input',
  },
  {
    label: '出租价值',
    fieldName: 'rentedValue',
    component: 'Input',
  },
  {
    label: '对外投资价值',
    fieldName: 'investValue',
    component: 'Input',
  },
  {
    label: '担保价值',
    fieldName: 'guaranteeValue',
    component: 'Input',
  },
  {
    label: '其他价值',
    fieldName: 'otherValue',
    component: 'Input',
  },
  {
    label: '出借对方单位',
    fieldName: 'lentUnit',
    component: 'Input',
  },
  {
    label: '出租对方单位',
    fieldName: 'rentedUnit',
    component: 'Input',
  },
  {
    label: '投入本单位使用时间',
    fieldName: 'useStartDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '备注',
    fieldName: 'remarks',
    component: 'Textarea',
  },
  {
    label: '制单人',
    fieldName: 'createdBy',
    component: 'Input',
  },
  {
    label: '审核人',
    fieldName: 'approvedBy',
    component: 'Input',
  },
  {
    label: '月折旧率',
    fieldName: 'depreciationRateMonthly',
    component: 'Input',
  },
  {
    label: '月折旧额',
    fieldName: 'depreciationAmountMonthly',
    component: 'Input',
  },
  {
    label: '预计残值',
    fieldName: 'estimatedSalvage',
    component: 'Input',
  },
  {
    label: '残值率',
    fieldName: 'salvageRate',
    component: 'Input',
  },
  {
    label: '已提折旧月数',
    fieldName: 'depreciatedMonths',
    component: 'Input',
  },
  {
    label: '折旧方法',
    fieldName: 'depreciationMethod',
    component: 'Input',
  },
  {
    label: '是否已入账',
    fieldName: 'isAccounted',
    component: 'Input',
  },
  {
    label: '是否未处置',
    fieldName: 'isDisposed',
    component: 'Input',
  },
];
