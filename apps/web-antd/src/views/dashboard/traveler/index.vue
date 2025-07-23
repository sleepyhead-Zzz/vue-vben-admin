<script lang="ts" setup>
import type { EchartsUIType } from '@vben/plugins/echarts';

import { onMounted, ref } from 'vue';

import { EchartsUI, useEcharts } from '@vben/plugins/echarts';

const statusChartRef = ref<EchartsUIType>();
const trendChartRef = ref<EchartsUIType>();
const serviceChartRef = ref<EchartsUIType>();

const { renderEcharts: renderStatusChart } = useEcharts(statusChartRef);
const { renderEcharts: renderTrendChart } = useEcharts(trendChartRef);
const { renderEcharts: renderServiceChart } = useEcharts(serviceChartRef);

onMounted(() => {
  // 1. 预约状态分布
  renderStatusChart({
    tooltip: { trigger: 'item' },
    series: [
      {
        name: '预约状态',
        type: 'pie',
        radius: '60%',
        data: [
          { value: 320, name: '完成' },
          { value: 120, name: '取消' },
          { value: 220, name: '进行中' },
        ],
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

  // 2. 预约数量趋势
  renderTrendChart({
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: ['07-18', '07-19', '07-20', '07-21', '07-22', '07-23'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '预约数量',
        type: 'line',
        data: [120, 200, 150, 80, 70, 110],
        smooth: true,
      },
    ],
  });

  // 3. 服务类型分布
  renderServiceChart({
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: ['轮椅服务', '陪同服务', '翻译服务', '协助登机'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '服务类型',
        type: 'bar',
        data: [120, 90, 60, 30],
        itemStyle: {
          color: '#5ab1ef',
        },
      },
    ],
  });
});
</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <EchartsUI ref="statusChartRef" style="height: 300px" />
    <EchartsUI ref="trendChartRef" style="height: 300px" />
    <EchartsUI ref="serviceChartRef" style="height: 300px" />
  </div>
</template>

<style scoped>
/* 可根据你项目 Tailwind / SCSS 风格调整布局 */
</style>
