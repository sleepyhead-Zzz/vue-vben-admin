<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { Page } from '@vben/common-ui';

import {
  Badge,
  Button,
  Drawer,
  List,
  message,
  Result,
  Skeleton,
  Tabs,
  Tag,
} from 'ant-design-vue';
import dayjs from 'dayjs';

import {
  getPagedUserNotice,
  getUserNoticeDetail,
  readAllNotice,
} from '#/api/system/userNotice';
import { useNotifyStore } from '#/store/notify';

type NoticeTabKey = '1' | '2' | 'all';
type NoticeId = NonNullable<SystemAPI.SysUserNotificationListDTO['noticeId']>;

type NoticeListItemView = SystemAPI.SysUserNotificationListDTO & {
  formattedCreateTime: string;
  isRead: boolean;
  summaryText: string;
  typeText: string;
};

type NoticeDetailView = SystemAPI.SysUserNotificationDetailDTO & {
  formattedCreateTime: string;
  formattedReadTime?: string;
  isRead: boolean;
  typeText: string;
};

const PAGE_SIZE_OPTIONS = ['10', '20', '50'];

const route = useRoute();
const router = useRouter();
const notifyStore = useNotifyStore();

const activeTab = ref<NoticeTabKey>('all');
const loading = ref(false);
const detailLoading = ref(false);
const errorText = ref('');

const pageNum = ref(1);
const pageSize = ref(10);
const total = ref(0);

const rawList = ref<SystemAPI.SysUserNotificationListDTO[]>([]);
const drawerOpen = ref(false);
const currentDetail = ref<NoticeDetailView | null>(null);

const unreadCount = computed(() => notifyStore.unreadCount);

const list = computed<NoticeListItemView[]>(() => {
  const mapped = rawList.value.map((item) => ({
    ...item,
    formattedCreateTime: item.createTime
      ? dayjs(item.createTime).format('YYYY-MM-DD HH:mm')
      : '-',
    isRead: item.readFlag === '1',
    summaryText: item.summary || '暂无摘要',
    typeText: item.noticeType === '2' ? '公告' : '通知',
  }));

  if (activeTab.value === 'all') {
    return mapped;
  }

  return mapped.filter((item) => item.noticeType === activeTab.value);
});

function getNoticeIdFromRoute() {
  const raw = route.query.noticeId;
  if (!raw) {
    return undefined;
  }

  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!value) {
    return undefined;
  }

  return value as unknown as NoticeId;
}

async function syncUnreadCount() {
  await notifyStore.refreshUnreadCount();
}

async function fetchList(reset = false) {
  if (reset) {
    pageNum.value = 1;
  }

  loading.value = true;
  errorText.value = '';

  try {
    const params = {
      pageNum: pageNum.value,
      pageSize: pageSize.value,
      ...(activeTab.value === 'all' ? {} : { type: activeTab.value }),
    } as SystemAPI.getPagedUserNoticeParams & { type?: NoticeTabKey };

    const { data } = await getPagedUserNotice(params);

    rawList.value = data?.rows || [];
    total.value = data?.total || 0;
  } catch (error) {
    console.error('fetchList error:', error);
    errorText.value = '加载通知失败，请稍后重试';
    rawList.value = [];
    total.value = 0;
  } finally {
    loading.value = false;
  }
}

function patchListReadState(noticeId: number) {
  rawList.value = rawList.value.map((item) =>
    item.noticeId === noticeId
      ? {
          ...item,
          readFlag: '1',
        }
      : item,
  );
}

async function openDetailById(noticeId: NoticeId, markRead = true) {
  detailLoading.value = true;

  try {
    const { data } = await getUserNoticeDetail({ noticeId });
    if (!data) {
      throw new Error('detail not found');
    }

    currentDetail.value = {
      ...data,
      formattedCreateTime: data.createTime
        ? dayjs(data.createTime).format('YYYY-MM-DD HH:mm:ss')
        : '-',
      formattedReadTime: data.readTime
        ? dayjs(data.readTime).format('YYYY-MM-DD HH:mm:ss')
        : undefined,
      isRead: data.readFlag === '1',
      typeText: data.noticeType === '2' ? '公告' : '通知',
    };

    drawerOpen.value = true;

    if (markRead && data.readFlag !== '1') {
      await notifyStore.readNotice(noticeId);
      patchListReadState(noticeId);
      currentDetail.value = {
        ...currentDetail.value,
        isRead: true,
        readFlag: '1',
        formattedReadTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        readTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      };
    }
  } catch (error) {
    console.error('openDetailById error:', error);
    message.error('该通知不存在、不可访问，或已被关闭');
  } finally {
    detailLoading.value = false;
  }
}

async function openDetail(item: NoticeListItemView) {
  if (!item.noticeId) {
    return;
  }

  await openDetailById(item.noticeId, true);
}

async function handleReadAll() {
  try {
    await readAllNotice();
    await Promise.all([
      fetchList(false),
      syncUnreadCount(),
      notifyStore.loadRecentNotifications(),
    ]);
    message.success('已全部标记为已读');
  } catch (error) {
    console.error('handleReadAll error:', error);
    message.error('全部已读失败，请稍后重试');
  }
}

async function tryOpenNoticeFromRoute() {
  const noticeId = getNoticeIdFromRoute();
  if (!noticeId) {
    return;
  }

  await nextTick();
  await openDetailById(noticeId, true);
}

function handleDrawerClose() {
  drawerOpen.value = false;
}

function handleTabChange(key: number | string) {
  activeTab.value = String(key) as NoticeTabKey;
  fetchList(true);
}

function handleRetry() {
  fetchList(true);
}

function handlePageChange(page: number, size: number) {
  pageNum.value = page;
  pageSize.value = size;
  fetchList();
}

watch(
  () => route.query.noticeId,
  () => {
    tryOpenNoticeFromRoute();
  },
);

watch(drawerOpen, async (open) => {
  if (!open && route.query.noticeId) {
    const nextQuery = { ...route.query };
    delete nextQuery.noticeId;
    await router.replace({ query: nextQuery });
  }
});

onMounted(async () => {
  await Promise.all([fetchList(true), syncUnreadCount()]);
  await tryOpenNoticeFromRoute();
});
</script>

<template>
  <Page auto-content-height>
    <div class="user-notice-page mx-auto max-w-5xl px-4 py-6">
      <section class="hero-card mb-6">
        <div>
          <p class="eyebrow">Notification Center</p>
          <h1 class="hero-title">用户通知</h1>
          <p class="hero-desc">
            查看系统通知与公告，阅读状态会与右上角铃铛实时同步。
          </p>
        </div>
        <div class="hero-side">
          <Badge
            :count="unreadCount"
            :number-style="{ backgroundColor: '#14532d' }"
            show-zero
          >
            <div class="stat-card">
              <div class="stat-label">未读通知</div>
              <div class="stat-value">{{ unreadCount }}</div>
            </div>
          </Badge>
          <Button type="primary" @click="handleReadAll">全部已读</Button>
        </div>
      </section>

      <section class="list-card">
        <div class="mb-4 flex flex-wrap items-center justify-between gap-4">
          <Tabs
            v-model:active-key="activeTab"
            class="notice-tabs"
            @change="handleTabChange"
          >
            <Tabs.TabPane key="all" tab="全部" />
            <Tabs.TabPane key="1" tab="通知" />
            <Tabs.TabPane key="2" tab="公告" />
          </Tabs>
          <div class="count-text text-xs">
            共 {{ total }} 条，当前显示 {{ list.length }} 条
          </div>
        </div>

        <Result
          v-if="errorText"
          status="error"
          title="通知加载失败"
          :sub-title="errorText"
        >
          <template #extra>
            <Button type="primary" @click="handleRetry">重新加载</Button>
          </template>
        </Result>

        <List
          v-else
          :loading="loading"
          :data-source="list"
          item-layout="vertical"
          :locale="{ emptyText: '暂无通知' }"
          :pagination="{
            current: pageNum,
            pageSize,
            total,
            showSizeChanger: true,
            pageSizeOptions: PAGE_SIZE_OPTIONS,
            onChange: handlePageChange,
          }"
        >
          <template #renderItem="{ item }">
            <List.Item
              class="notice-item cursor-pointer"
              :class="{ unread: !item.isRead }"
              @click="openDetail(item)"
            >
              <div class="flex items-start gap-4">
                <div class="status-dot-wrap">
                  <Badge v-if="!item.isRead" status="processing" />
                </div>
                <div class="min-w-0 flex-1">
                  <div class="mb-2 flex flex-wrap items-center gap-2">
                    <span
                      class="truncate text-base"
                      :class="{ 'font-semibold': !item.isRead }"
                    >
                      {{ item.noticeTitle || '未命名通知' }}
                    </span>
                    <Tag :color="item.noticeType === '2' ? 'blue' : 'green'">
                      {{ item.typeText }}
                    </Tag>
                    <Tag v-if="item.isRead" color="default">已读</Tag>
                    <Tag v-else color="orange">未读</Tag>
                  </div>
                  <div class="summary mb-3">
                    {{ item.summaryText }}
                  </div>
                  <div class="meta-text text-xs">
                    {{ item.formattedCreateTime }}
                  </div>
                </div>
              </div>
            </List.Item>
          </template>
        </List>
      </section>

      <Drawer
        v-model:open="drawerOpen"
        title="通知详情"
        width="720"
        :footer="null"
        @close="handleDrawerClose"
      >
        <Skeleton v-if="detailLoading" active :paragraph="{ rows: 8 }" />

        <template v-else-if="currentDetail">
          <div class="space-y-6">
            <header class="detail-header border-b pb-5">
              <div class="mb-3 flex flex-wrap items-center gap-2">
                <Tag
                  :color="currentDetail.noticeType === '2' ? 'blue' : 'green'"
                >
                  {{ currentDetail.typeText }}
                </Tag>
                <Tag v-if="currentDetail.isRead" color="default">已读</Tag>
                <Tag v-else color="orange">未读</Tag>
              </div>
              <h2 class="detail-title mb-3 text-2xl font-semibold">
                {{ currentDetail.noticeTitle || '未命名通知' }}
              </h2>
              <div
                class="detail-meta flex flex-wrap items-center gap-4 text-sm"
              >
                <span>发布时间 {{ currentDetail.formattedCreateTime }}</span>
                <span v-if="currentDetail.formattedReadTime">
                  阅读时间 {{ currentDetail.formattedReadTime }}
                </span>
              </div>
            </header>

            <article
              class="notice-content prose prose-slate dark:prose-invert max-w-none"
              v-html="currentDetail.noticeContent || '<p>暂无正文</p>'"
            ></article>
          </div>
        </template>
      </Drawer>
    </div>
  </Page>
</template>

<style scoped>
.user-notice-page {
  --notice-count-text: #6b7280;
  --notice-detail-title: #111827;
  --notice-hero-bg:
    radial-gradient(
      circle at top right,
      rgb(167 243 208 / 90%),
      transparent 30%
    ),
    linear-gradient(135deg, #f0fdf4, #ecfeff 55%, #f8fafc);
  --notice-hero-border: #d1fae5;
  --notice-item-hover: #f8fafc;
  --notice-item-unread: linear-gradient(
    90deg,
    rgb(240 253 244 / 95%),
    rgb(255 255 255 / 95%)
  );
  --notice-list-bg: transparent;
  --notice-list-border: #e5e7eb;
  --notice-meta-text: #9ca3af;
  --notice-stat-bg: rgb(240 253 244 / 42%);
  --notice-stat-label: #6b7280;
  --notice-stat-value: #14532d;
  --notice-summary: #4b5563;

  min-height: 100%;
}

:global(html.dark) .user-notice-page {
  --notice-count-text: rgb(148 163 184 / 90%);
  --notice-detail-title: rgb(241 245 249 / 96%);
  --notice-hero-bg:
    radial-gradient(circle at top right, rgb(20 83 45 / 50%), transparent 30%),
    linear-gradient(135deg, rgb(12 18 16), rgb(12 28 28) 55%, rgb(15 23 42));
  --notice-hero-border: rgb(21 128 61 / 28%);
  --notice-item-hover: rgb(30 41 59 / 45%);
  --notice-item-unread: linear-gradient(
    90deg,
    rgb(20 83 45 / 22%),
    rgb(15 23 42 / 12%)
  );
  --notice-list-bg: rgb(2 6 23 / 72%);
  --notice-list-border: rgb(71 85 105 / 35%);
  --notice-meta-text: rgb(148 163 184 / 72%);
  --notice-stat-bg: rgb(15 23 42 / 68%);
  --notice-stat-label: rgb(148 163 184 / 82%);
  --notice-stat-value: rgb(167 243 208 / 98%);
  --notice-summary: rgb(203 213 225 / 86%);
}

.hero-card {
  display: flex;
  gap: 24px;
  justify-content: space-between;
  padding: 24px;
  background: var(--notice-hero-bg);
  border: 1px solid var(--notice-hero-border);
  border-radius: 20px;
}

.eyebrow {
  margin-bottom: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #047857;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.hero-title {
  margin: 0;
  font-size: 32px;
  line-height: 1.1;
  color: #111827;
}

.hero-desc {
  max-width: 560px;
  margin-top: 10px;
  color: var(--notice-summary);
}

.hero-side {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-end;
  justify-content: space-between;
}

.stat-card {
  min-width: 132px;
  padding: 14px 16px;
  background: var(--notice-stat-bg);
  border-radius: 16px;
  box-shadow: inset 0 0 0 1px var(--notice-list-border);
}

.stat-label {
  font-size: 12px;
  color: var(--notice-stat-label);
}

.stat-value {
  margin-top: 6px;
  font-size: 28px;
  font-weight: 700;
  line-height: 1;
  color: var(--notice-stat-value);
}

.list-card {
  padding: 20px;
  background: var(--notice-list-bg);
  border: 1px solid var(--notice-list-border);
  border-radius: 20px;
}

.notice-item {
  padding: 16px;
  border-radius: 16px;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

.notice-item:hover {
  background: var(--notice-item-hover);
  transform: translateY(-1px);
}

.notice-item.unread {
  background: var(--notice-item-unread);
}

.status-dot-wrap {
  width: 12px;
  padding-top: 7px;
}

.summary {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  color: var(--notice-summary);
  -webkit-box-orient: vertical;
}

.count-text {
  color: var(--notice-count-text);
}

.meta-text,
.detail-meta {
  color: var(--notice-meta-text);
}

.detail-title {
  color: var(--notice-detail-title);
}

.detail-header {
  border-color: var(--notice-list-border);
}

.notice-content :deep(img) {
  max-width: 100%;
  border-radius: 12px;
}

.notice-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
}

.notice-content :deep(td),
.notice-content :deep(th) {
  padding: 8px 10px;
  border: 1px solid #e5e7eb;
}

@media (max-width: 768px) {
  .hero-card {
    flex-direction: column;
  }

  .hero-side {
    align-items: stretch;
  }
}
</style>
