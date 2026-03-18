import type { SelectProps } from 'ant-design-vue';

import { getPopupContainer } from '@vben/utils';

import { optionPeriodSelect } from '#/api/perf/period';
import { optionProductSelect } from '#/api/perf/product';
import { getPagedUser } from '#/api/system/user';

export interface PerfQuerySelectOption {
  label: string;
  value: number | string;
}

export function replacePerfQuerySelectOptions(
  target: PerfQuerySelectOption[],
  next: PerfQuerySelectOption[],
) {
  target.splice(0, target.length, ...next);
}

export function createPerfStaticQuerySelectProps(
  options: PerfQuerySelectOption[],
) {
  return {
    getPopupContainer,
    options,
    optionFilterProp: 'label',
    optionLabelProp: 'label',
    showSearch: true,
  } satisfies SelectProps;
}

export function createPerfRemoteUserQuerySelectProps(
  options: PerfQuerySelectOption[],
  onSearch: (keyword: string) => void,
) {
  return {
    ...createPerfStaticQuerySelectProps(options),
    filterOption: false,
    onClear: () => onSearch(''),
    onSearch,
  } satisfies SelectProps;
}

export async function fetchPerfUserQueryOptions(keyword: string) {
  const trimmedKeyword = keyword.trim();
  if (!trimmedKeyword) {
    return [];
  }

  const response = await getPagedUser({
    pageNum: 1,
    pageSize: 20,
    userName: trimmedKeyword,
  });

  return (
    response.data?.rows?.map((user) => ({
      label: user.nickName || user.userName || String(user.userId ?? '-'),
      value: user.userId ?? '',
    })) ?? []
  ).filter((item) => item.value !== '');
}

export function getPerfPeriodLabel(
  period: PerfAPI.PerfDimPeriodDTO | PerfAPI.PerfDimPeriodVO,
) {
  if (period.month) {
    return `${period.year}年${period.month}月`;
  }
  if (period.quarter) {
    return `${period.year}年第${period.quarter}季度`;
  }
  return `${period.year}年`;
}

export async function fetchPerfProductQueryOptions() {
  const response = await optionProductSelect();
  return (response.data ?? [])
    .map((product) => ({
      label: `${product.productName || '-'}(${product.productId})`,
      value: product.productId ?? '',
    }))
    .filter((item) => item.value !== '');
}

export async function fetchPerfPeriodQueryOptions() {
  const response = await optionPeriodSelect({});
  return (response.data ?? [])
    .map((period) => ({
      label: getPerfPeriodLabel(period),
      value: period.periodId ?? '',
    }))
    .filter((item) => item.value !== '');
}
