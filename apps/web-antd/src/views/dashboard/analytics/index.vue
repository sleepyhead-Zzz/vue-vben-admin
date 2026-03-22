<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import { Page } from '@vben/common-ui';

import { Card } from 'ant-design-vue';

interface QuickEntry {
  description: string;
  path: string;
  tag: string;
  title: string;
}

const router = useRouter();

const quickEntries: QuickEntry[] = [
  {
    title: '绩效周期',
    description: '维护考核周期，统一月度和阶段性绩效口径。',
    path: '/perf/period',
    tag: '基础配置',
  },
  {
    title: '销量计划',
    description: '查看并维护销量计划，为绩效计算提供目标依据。',
    path: '/perf/sales-plan',
    tag: '目标管理',
  },
  {
    title: '利润计划',
    description: '跟踪利润目标与计划值，支撑经营结果考核。',
    path: '/perf/profit-plan',
    tag: '经营指标',
  },
  {
    title: '新客户得分',
    description: '关注新客户开发成果，沉淀客户增长评分数据。',
    path: '/perf/new-customer-score',
    tag: '过程评分',
  },
  {
    title: '关键任务评分',
    description: '聚焦重点任务完成质量，及时查看评分记录。',
    path: '/perf/key-task-score',
    tag: '任务考核',
  },
  {
    title: '最终绩效结果',
    description: '汇总查看综合得分结果，支撑绩效复盘与归档。',
    path: '/perf/performance-result',
    tag: '结果归档',
  },
];

const summaryCards = computed(() => [
  {
    label: '当前定位',
    value: '绩效考核管理首页',
  },
  {
    label: '核心能力',
    value: '周期管理、过程评分、结果归档',
  },
  {
    label: '推荐动作',
    value: '先维护周期，再进入评分与结果模块',
  },
]);

function navigateTo(path: string) {
  router.push(path);
}
</script>

<template>
  <Page :auto-content-height="true" class="analytics-page">
    <div class="grid gap-6">
      <Card :bordered="false" class="hero-card">
        <div class="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
          <div class="grid gap-4">
            <div class="eyebrow">PERFORMANCE DASHBOARD</div>
            <div class="hero-title">欢迎使用绩效考核管理系统</div>
            <div class="hero-desc">
              这里汇集了绩效周期、计划目标、过程评分与结果归档等核心能力，
              可以作为日常绩效管理的统一入口。
            </div>
            <div class="hero-subdesc">
              建议先确认本期绩效周期，再进入销量计划、新客户得分、关键任务评分和最终绩效结果等模块开展工作。
            </div>
          </div>

          <div class="summary-panel">
            <div
              v-for="item in summaryCards"
              :key="item.label"
              class="summary-item"
            >
              <div class="summary-label">{{ item.label }}</div>
              <div class="summary-value">{{ item.value }}</div>
            </div>
          </div>
        </div>
      </Card>

      <section class="grid gap-3">
        <div class="section-title">快捷入口</div>
        <div class="entry-grid">
          <Card
            v-for="entry in quickEntries"
            :key="entry.path"
            :bordered="false"
            class="entry-card"
            hoverable
            @click="navigateTo(entry.path)"
          >
            <div class="entry-tag">{{ entry.tag }}</div>
            <div class="entry-title">{{ entry.title }}</div>
            <div class="entry-desc">{{ entry.description }}</div>
            <div class="entry-action">进入模块</div>
          </Card>
        </div>
      </section>
    </div>
  </Page>
</template>

<style scoped>
.analytics-page {
  min-height: 100%;
}

.hero-card {
  overflow: hidden;
  border-radius: 24px;
  background:
    radial-gradient(circle at top right, rgb(217 236 255 / 90%), transparent 32%),
    linear-gradient(135deg, #f7fbff 0%, #eef5ff 52%, #ffffff 100%);
  box-shadow: 0 18px 40px rgb(15 23 42 / 8%);
}

:deep(.hero-card .ant-card-body),
:deep(.entry-card .ant-card-body) {
  height: 100%;
}

.eyebrow {
  color: #2b5aac;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.hero-title {
  color: #132238;
  font-size: 30px;
  font-weight: 700;
  line-height: 1.3;
}

.hero-desc,
.hero-subdesc {
  max-width: 720px;
  color: #526174;
  font-size: 15px;
  line-height: 1.8;
}

.summary-panel {
  display: grid;
  gap: 12px;
  align-content: start;
}

.summary-item {
  border: 1px solid rgb(43 90 172 / 10%);
  border-radius: 18px;
  padding: 16px 18px;
  background: rgb(255 255 255 / 72%);
  backdrop-filter: blur(6px);
}

.summary-label {
  margin-bottom: 6px;
  color: #6b7a90;
  font-size: 13px;
}

.summary-value {
  color: #132238;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.6;
}

.section-title {
  color: #132238;
  font-size: 20px;
  font-weight: 600;
}

.entry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.entry-card {
  height: 100%;
  border-radius: 20px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  box-shadow: 0 12px 28px rgb(15 23 42 / 5%);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  cursor: pointer;
}

.entry-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 32px rgb(15 23 42 / 10%);
}

.entry-tag {
  display: inline-flex;
  align-items: center;
  margin-bottom: 14px;
  border-radius: 9999px;
  padding: 4px 10px;
  color: #2b5aac;
  background: #edf4ff;
  font-size: 12px;
  font-weight: 600;
}

.entry-title {
  margin-bottom: 10px;
  color: #132238;
  font-size: 18px;
  font-weight: 600;
}

.entry-desc {
  min-height: 48px;
  color: #5b6879;
  font-size: 14px;
  line-height: 1.7;
}

.entry-action {
  margin-top: 16px;
  color: #2b5aac;
  font-size: 14px;
  font-weight: 600;
}

html.dark .hero-card {
  background:
    radial-gradient(circle at top right, rgb(74 144 226 / 18%), transparent 36%),
    linear-gradient(135deg, #0f1726 0%, #152235 52%, #1b2b42 100%);
  box-shadow: 0 22px 48px rgb(2 6 23 / 35%);
}

html.dark .eyebrow {
  color: #8dbbff;
}

html.dark .hero-title,
html.dark .summary-value,
html.dark .section-title,
html.dark .entry-title {
  color: #f3f7ff;
}

html.dark .hero-desc,
html.dark .hero-subdesc,
html.dark .entry-desc {
  color: rgb(226 232 240 / 78%);
}

html.dark .summary-item {
  border-color: rgb(141 187 255 / 16%);
  background: rgb(15 23 38 / 72%);
}

html.dark .summary-label {
  color: rgb(191 219 254 / 72%);
}

html.dark .entry-card {
  background: linear-gradient(180deg, #111c2d 0%, #162336 100%);
  box-shadow: 0 16px 34px rgb(2 6 23 / 24%);
}

html.dark .entry-card:hover {
  box-shadow: 0 20px 36px rgb(2 6 23 / 36%);
}

html.dark .entry-tag {
  color: #bcd8ff;
  background: rgb(72 124 191 / 18%);
}

html.dark .entry-action {
  color: #8dbbff;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 24px;
  }

  .hero-desc,
  .hero-subdesc {
    font-size: 14px;
  }

  .entry-grid {
    grid-template-columns: 1fr;
  }
}
</style>
