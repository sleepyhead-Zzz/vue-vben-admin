<script lang="ts" setup>
import type { EchartsUIType } from '@vben/plugins/echarts';

import { onMounted, ref } from 'vue';

import { EchartsUI, useEcharts } from '@vben/plugins/echarts';

import { getAnalyticsData } from '#/api/traveler/book';

interface BookStatus {
  status: string;
  count: number;
}
interface BookTrend {
  dates: string[];
  counts: number[];
}

interface AnalyticsData {
  bookStatusDTOList: BookStatus[];
  bookTrendDTOList: BookTrend;
}

const statusChartRef = ref<EchartsUIType>();
const trendChartRef = ref<EchartsUIType>();

const { renderEcharts: renderStatusChart } = useEcharts(statusChartRef);
const { renderEcharts: renderTrendChart } = useEcharts(trendChartRef);

const loading = ref(false);
const errorMsg = ref<null | string>(null);

async function fetchAnalyticsData() {
  loading.value = true;
  errorMsg.value = null;
  try {
    const res = await getAnalyticsData();
    const data = res.data as AnalyticsData;

    // 预约状态饼图数据
    const statusChartData = data.bookStatusDTOList.map((item) => ({
      value: item.count,
      name: item.status,
    }));
    renderStatusChart({
      tooltip: { trigger: 'item' },
      legend: { bottom: 10 },
      series: [
        {
          name: '预约状态',
          type: 'pie',
          radius: '60%',
          data: statusChartData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    });

    // 预约趋势折线图数据
    renderTrendChart({
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: data.bookTrendDTOList.dates,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '预约数量',
          type: 'line',
          data: data.bookTrendDTOList.counts,
          smooth: true,
        },
      ],
    });
  } catch (error) {
    errorMsg.value = '获取预约分析数据失败';
    console.error(errorMsg.value, error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchAnalyticsData();
});
</script>

<template>
  <div class="grid grid-cols-1 gap-6 p-4">
    <EchartsUI ref="statusChartRef" style="height: 320px" />
    <EchartsUI ref="trendChartRef" style="height: 320px" />
    <div v-if="loading">加载中...</div>
    <div v-if="errorMsg" class="text-red-500">{{ errorMsg }}</div>
  </div>
</template>

<style scoped>
/* 你可以根据需要调整样式 */
</style>
