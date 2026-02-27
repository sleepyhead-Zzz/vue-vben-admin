export const DictEnum = {
  SYS_COMMON_STATUS: 'sys_common_status',

  SYS_LOGIN_LOG_STATUS: 'sys_login_log_status',
  SYS_DEVICE_TYPE: 'sys_device_type', // 设备类型
  SYS_GRANT_TYPE: 'sys_grant_type', // 授权类型
  SYS_NORMAL_DISABLE: 'sys_normal_disable',
  SYS_NOTICE_STATUS: 'sys_notice_status', // 通知状态
  SYS_NOTICE_TYPE: 'sys_notice_type', // 通知类型
  SYS_OPER_TYPE: 'sys_oper_type', // 操作类型
  SYS_OSS_ACCESS_POLICY: 'oss_access_policy', // oss权限桶类型
  SYS_SHOW_HIDE: 'sys_show_hide', // 显示状态
  SYS_USER_SEX: 'sys_user_sex', // 性别
  SYS_YES_NO: 'sys_yes_no', // 是否
  WF_BUSINESS_STATUS: 'wf_business_status', // 业务状态
  WF_FORM_TYPE: 'wf_form_type', // 表单类型
  WF_TASK_STATUS: 'wf_task_status', // 任务状态,

  ASSET_LOCATION_TYPE: 'asset_location_type', // 设备所在位置类型
  ASSET_DEVICE_STATUS: 'asset_device_status', // 设备状态
  ASSET_INSPECTION_PLAN_STATUS: 'asset_inspection_plan_status', // 巡检计划状态
  ASSET_INSPECTION_TASK_STATUS: 'asset_inspection_task_status', // 巡检任务状态
  ASSET_INSPECTION_STATUS: 'asset_inspection_status', // 巡检状态
  ASSET_INSPECTION_ITEM_STATUS: 'asset_inspection_item_status', // 巡检项目状态
  ASSET_REPAIR_STATUS: 'asset_repair_status', // 维修状态
  ASSET_REPAIR_LEVEL: 'asset_repair_level', // 维修紧急程度
  ASSET_REPAIR_FAULT_TYPE: 'asset_repair_fault_type', // 维修故障类型
  ASSET_FIXED_STATUS: 'asset_fixed_status', // 是否修复状态
  ASSET_INSPECTION_OBJECT_TYPE: 'asset_inspection_object_type', // 巡检对象类型

  RegulatoryCardAssetStatus: 'regulatory_card_asset_status', // 信息卡资产状态
  RegulatoryCardAccountStatus: 'regulatory_card_account_status', // 信息卡财务入账状态
  RegulatoryCardBusinessStatus: 'regulatory_card_business_status', // 信息卡业务状态
  RegulatoryCardType: 'regulatory_card_type', // 信息卡业务状态
  OfficeDepreciationStatus: 'office_depreciation_status', // 办公资产折旧状态

  TravelerBookStatus: 'traveler_book_status',
  TravelerBookCertTypes: 'traveler_book_cert_types',
  TravelerBookGenders: 'traveler_book_genders',
  TravelerBookLanguages: 'traveler_book_languages',
  TravelerBookServices: 'traveler_book_services',
  TravelerBookRelations: 'traveler_book_relations',
  TravelerBookHeartNormals: 'traveler_book_heart_normals',

  PerfPeriodType: 'perf_period_type',
} as const;

export type DictEnumKey = keyof typeof DictEnum;
