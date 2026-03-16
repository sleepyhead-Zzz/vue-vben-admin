<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { Page } from '@vben/common-ui';

import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import {
  Button,
  Drawer,
  Empty,
  List,
  message,
  Result,
  Skeleton,
  Spin,
  Tag,
} from 'ant-design-vue';
import dayjs from 'dayjs';

import {
  getPagedUserNotice,
  getUserNoticeDetail,
} from '#/api/system/userNotice';
import { useNotifyStore } from '#/store/notify';

type NoticeTabKey = '1' | '2' | 'all';
type NoticeId = string;
type UserNoticePageParams = SystemAPI.getPagedUserNoticeParams & {
  type?: Exclude<NoticeTabKey, 'all'>;
};

type NoticeListItemView = SystemAPI.SysUserNotificationListDTO & {
  formattedCreateTime: string;
  isRead: boolean;
  summaryText: string;
  titleText: string;
  typeText: string;
};

type NoticeDetailView = SystemAPI.SysUserNotificationDetailDTO & {
  contentHtml: string;
  formattedCreateTime: string;
  formattedReadTime?: string;
  isRead: boolean;
  titleText: string;
  typeText: string;
};

const NOTICE_TABS = [
  { key: 'all', label: '全部' },
  { key: '1', label: '通知' },
  { key: '2', label: '公告' },
] as const;
const PAGE_SIZE_OPTIONS = ['10', '20', '50'];
const EMPTY_NOTICE_HTML = '<p>暂无正文</p>';
const DETAIL_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const route = useRoute();
const router = useRouter();
const notifyStore = useNotifyStore();

const breakpoints = useBreakpoints(breakpointsTailwind);
const isDesktop = breakpoints.greaterOrEqual('lg');

const activeTab = ref<NoticeTabKey>('all');
const loading = ref(false);
const detailLoading = ref(false);
const errorText = ref('');
const pageNum = ref(1);
const pageSize = ref(10);
const total = ref(0);
const rawList = ref<SystemAPI.SysUserNotificationListDTO[]>([]);
const currentDetail = ref<NoticeDetailView | null>(null);
const mobileDrawerOpen = ref(false);

let detailRequestToken = 0;

const unreadCount = computed(() => notifyStore.unreadCount);
const selectedNoticeId = computed(() => parseNoticeId(route.query.noticeId));
const showDetailSkeleton = computed(
  () => detailLoading.value && !currentDetail.value,
);
const showDetailOverlay = computed(
  () => detailLoading.value && !!currentDetail.value,
);

const list = computed<NoticeListItemView[]>(() => {
  return rawList.value.map((item) => mapNoticeListItem(item));
});

function mapNoticeListItem(
  item: SystemAPI.SysUserNotificationListDTO,
): NoticeListItemView {
  return {
    ...item,
    formattedCreateTime: item.createTime
      ? dayjs(item.createTime).format('YYYY-MM-DD HH:mm')
      : '-',
    isRead: item.readFlag === '1',
    summaryText: item.summary?.trim() || '暂无摘要',
    titleText: item.noticeTitle?.trim() || '未命名通知',
    typeText: item.noticeType === '2' ? '公告' : '通知',
  };
}

function normalizeNoticeId(noticeId?: null | number | string) {
  if (noticeId === undefined || noticeId === null || noticeId === '') {
    return undefined;
  }

  return String(noticeId);
}

function mapNoticeDetail(
  data: SystemAPI.SysUserNotificationDetailDTO,
): NoticeDetailView {
  return {
    ...data,
    contentHtml: data.noticeContent?.trim() || EMPTY_NOTICE_HTML,
    formattedCreateTime: data.createTime
      ? dayjs(data.createTime).format(DETAIL_TIME_FORMAT)
      : '-',
    formattedReadTime: data.readTime
      ? dayjs(data.readTime).format(DETAIL_TIME_FORMAT)
      : undefined,
    isRead: data.readFlag === '1',
    titleText: data.noticeTitle?.trim() || '未命名通知',
    typeText: data.noticeType === '2' ? '公告' : '通知',
  };
}

function parseNoticeId(rawValue: unknown): NoticeId | undefined {
  const value = Array.isArray(rawValue) ? rawValue[0] : rawValue;
  return normalizeNoticeId(
    typeof value === 'string' || typeof value === 'number' ? value : undefined,
  );
}

function isSelectedNotice(noticeId?: number | string) {
  return normalizeNoticeId(noticeId) === selectedNoticeId.value;
}

function patchListReadState(noticeId: NoticeId) {
  const normalizedNoticeId = normalizeNoticeId(noticeId);
  if (!normalizedNoticeId) {
    return;
  }

  rawList.value = rawList.value.map((item) =>
    normalizeNoticeId(item.noticeId) === normalizedNoticeId
      ? {
          ...item,
          readFlag: '1',
        }
      : item,
  );
}

function patchAllReadState() {
  rawList.value = rawList.value.map((item) => ({
    ...item,
    readFlag: '1',
  }));

  if (!currentDetail.value) {
    return;
  }

  const now = dayjs().format(DETAIL_TIME_FORMAT);
  currentDetail.value = {
    ...currentDetail.value,
    formattedReadTime: currentDetail.value.formattedReadTime || now,
    isRead: true,
    readFlag: '1',
    readTime: currentDetail.value.readTime || now,
  };
}

async function replaceNoticeQuery(noticeId?: NoticeId) {
  const nextQuery = { ...route.query };

  if (noticeId === undefined) {
    delete nextQuery.noticeId;
  } else {
    nextQuery.noticeId = String(noticeId);
  }

  await router.replace({ query: nextQuery });
}

async function clearSelectedNotice() {
  currentDetail.value = null;
  if (!isDesktop.value) {
    mobileDrawerOpen.value = false;
  }

  if (route.query.noticeId) {
    await replaceNoticeQuery(undefined);
  }
}

async function handleNoticeSelect(noticeId?: number | string) {
  const normalizedNoticeId = normalizeNoticeId(noticeId);
  if (!normalizedNoticeId) {
    return;
  }

  if (selectedNoticeId.value === normalizedNoticeId) {
    if (!isDesktop.value) {
      mobileDrawerOpen.value = true;
    }
    return;
  }

  if (!isDesktop.value) {
    mobileDrawerOpen.value = true;
  }

  await replaceNoticeQuery(normalizedNoticeId);
}

async function fetchList(reset = false) {
  if (reset) {
    pageNum.value = 1;
  }

  loading.value = true;
  errorText.value = '';

  try {
    const params: UserNoticePageParams = {
      pageNum: pageNum.value,
      pageSize: pageSize.value,
      ...(activeTab.value === 'all' ? {} : { type: activeTab.value }),
    };

    const { data } = await getPagedUserNotice(params);
    rawList.value = data?.rows || [];
    total.value = data?.total || 0;

    const currentDetailId = normalizeNoticeId(currentDetail.value?.noticeId);
    if (currentDetailId && currentDetail.value?.readFlag === '1') {
      patchListReadState(currentDetailId);
    }
  } catch (error) {
    console.error('fetchList error:', error);
    errorText.value = '加载通知失败，请稍后重试';
    rawList.value = [];
    total.value = 0;
  } finally {
    loading.value = false;
  }
}

async function markDetailAsRead(
  noticeId: NoticeId,
  requestToken: number,
  detail: NoticeDetailView,
) {
  if (detail.readFlag === '1') {
    patchListReadState(noticeId);
    return;
  }

  try {
    await notifyStore.readNotice(noticeId);
    if (requestToken !== detailRequestToken) {
      return;
    }

    const now = dayjs().format(DETAIL_TIME_FORMAT);
    patchListReadState(noticeId);
    currentDetail.value = {
      ...detail,
      formattedReadTime: detail.formattedReadTime || now,
      isRead: true,
      readFlag: '1',
      readTime: detail.readTime || now,
    };
  } catch (error) {
    console.error('markDetailAsRead error:', error);
    message.warning('通知已打开，但已读状态同步失败，请稍后重试');
  }
}

async function loadDetail(noticeId: NoticeId) {
  const requestToken = ++detailRequestToken;
  detailLoading.value = true;

  try {
    const { data } = await getUserNoticeDetail({
      noticeId,
    } as SystemAPI.getUserNoticeDetailParams);
    if (!data) {
      throw new Error('detail not found');
    }

    if (requestToken !== detailRequestToken) {
      return;
    }

    const detail = mapNoticeDetail(data);
    currentDetail.value = detail;
    await markDetailAsRead(noticeId, requestToken, detail);
  } catch (error) {
    if (requestToken !== detailRequestToken) {
      return;
    }

    console.error('loadDetail error:', error);
    currentDetail.value = null;
    await clearSelectedNotice();
    message.error('该通知不存在、不可访问，或已被关闭');
  } finally {
    if (requestToken === detailRequestToken) {
      detailLoading.value = false;
    }
  }
}

async function handleReadAll() {
  if (unreadCount.value <= 0) {
    return;
  }

  try {
    await notifyStore.markAllRead();
    patchAllReadState();
    message.success('已全部标记为已读');
  } catch (error) {
    console.error('handleReadAll error:', error);
    message.error('全部已读失败，请稍后重试');
  }
}

async function handleTabChange(tabKey: NoticeTabKey) {
  activeTab.value = tabKey;

  if (tabKey !== 'all' && currentDetail.value?.noticeType !== tabKey) {
    await clearSelectedNotice();
  }

  await fetchList(true);
}

async function handleRetry() {
  await fetchList(true);
}

async function handlePageChange(page: number, size: number) {
  pageNum.value = page;
  pageSize.value = size;
  await fetchList();
}

async function handleDrawerClose() {
  await clearSelectedNotice();
}

watch(isDesktop, (desktop) => {
  mobileDrawerOpen.value = desktop
    ? false
    : selectedNoticeId.value !== undefined;
});

watch(
  () => route.query.noticeId,
  async (rawNoticeId) => {
    if (!rawNoticeId) {
      currentDetail.value = null;
      detailLoading.value = false;
      mobileDrawerOpen.value = false;
      return;
    }

    const noticeId = parseNoticeId(rawNoticeId);
    if (!noticeId) {
      currentDetail.value = null;
      detailLoading.value = false;
      mobileDrawerOpen.value = false;
      message.warning('通知链接无效，已为你清理');
      await replaceNoticeQuery(undefined);
      return;
    }

    if (!isDesktop.value) {
      mobileDrawerOpen.value = true;
    }

    await loadDetail(noticeId);
  },
  {
    immediate: true,
  },
);

onMounted(async () => {
  await Promise.all([
    fetchList(true),
    notifyStore.refreshUnreadCount(),
    notifyStore.loadRecentNotifications(),
  ]);
});
</script>

<template>
  <Page :auto-content-height="true">
    <div
      class="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-4 py-4 lg:px-6"
    >
      <section
        class="border-border bg-background relative overflow-hidden rounded-[calc(var(--radius)+8px)] border px-4 py-5 shadow-sm sm:px-6"
      >
        <div
          class="bg-primary/12 pointer-events-none absolute -right-12 top-0 h-32 w-32 rounded-full blur-3xl"
        ></div>
        <div
          class="pointer-events-none absolute bottom-0 left-10 h-24 w-24 rounded-full bg-emerald-400/10 blur-2xl dark:bg-emerald-300/10"
        ></div>

        <div
          class="relative flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between"
        >
          <div class="space-y-3">
            <p
              class="text-primary/80 text-xs font-semibold uppercase tracking-[0.24em]"
            >
              Notification Center
            </p>
            <div class="space-y-2">
              <h1 class="text-foreground text-2xl font-semibold sm:text-3xl">
                用户通知
              </h1>
              <p class="text-muted-foreground max-w-2xl text-sm leading-6">
                查看系统通知与公告，阅读状态会与右上角铃铛实时同步，桌面端支持双栏快速浏览详情。
              </p>
            </div>
          </div>

          <div class="grid gap-3 sm:grid-cols-[minmax(160px,200px),auto]">
            <div
              class="border-border bg-accent/50 rounded-2xl border px-4 py-3 shadow-sm"
            >
              <div class="text-muted-foreground text-xs font-medium">
                未读通知
              </div>
              <div
                class="text-foreground mt-2 text-3xl font-semibold leading-none"
              >
                {{ unreadCount }}
              </div>
            </div>
            <Button
              :disabled="unreadCount <= 0"
              class="h-auto rounded-2xl px-5 py-3"
              type="primary"
              @click="handleReadAll"
            >
              全部已读
            </Button>
          </div>
        </div>
      </section>

      <section
        class="grid gap-4 lg:grid-cols-[minmax(360px,420px),minmax(0,1fr)]"
      >
        <div
          class="border-border bg-background min-w-0 rounded-[var(--radius)] border shadow-sm"
        >
          <div class="border-border border-b px-4 py-4 sm:px-5">
            <div class="flex flex-col gap-3">
              <div
                class="bg-accent inline-flex w-full rounded-full p-1 sm:w-auto"
              >
                <button
                  v-for="tab in NOTICE_TABS"
                  :key="tab.key"
                  :class="
                    activeTab === tab.key
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  "
                  class="flex-1 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 sm:flex-none"
                  type="button"
                  @click="handleTabChange(tab.key)"
                >
                  {{ tab.label }}
                </button>
              </div>

              <div
                class="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 text-xs"
              >
                <span>共 {{ total }} 条</span>
                <span>当前页 {{ list.length }} 条</span>
                <span v-if="selectedNoticeId">
                  已选中通知 #{{ selectedNoticeId }}
                </span>
              </div>
            </div>
          </div>

          <Result
            v-if="errorText"
            status="error"
            sub-title="请稍后重试，或重新打开通知中心。"
            title="通知加载失败"
          >
            <template #extra>
              <Button type="primary" @click="handleRetry">重新加载</Button>
            </template>
          </Result>

          <List
            v-else
            :data-source="list"
            :loading="loading"
            :locale="{ emptyText: '暂无通知' }"
            :pagination="{
              current: pageNum,
              pageSize,
              total,
              showSizeChanger: true,
              pageSizeOptions: PAGE_SIZE_OPTIONS,
              onChange: handlePageChange,
            }"
            class="[&_.ant-list-items]:space-y-3 [&_.ant-list-items]:px-3 [&_.ant-list-items]:py-3 sm:[&_.ant-list-items]:px-4 [&_.ant-list-pagination]:px-4 [&_.ant-list-pagination]:pb-4 [&_.ant-list-pagination]:pt-2"
            item-layout="vertical"
            :split="false"
          >
            <template #renderItem="{ item }">
              <List.Item class="!border-none !p-0">
                <button
                  :class="
                    isSelectedNotice(item.noticeId)
                      ? 'border-primary bg-primary/6 shadow-[0_0_0_1px_hsl(var(--primary)/0.18)]'
                      : item.isRead
                        ? 'border-border bg-background hover:border-primary/30 hover:bg-accent/60'
                        : 'border-primary/25 bg-primary/5 hover:border-primary/40 hover:bg-primary/8'
                  "
                  class="group flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all duration-200"
                  type="button"
                  @click="handleNoticeSelect(item.noticeId)"
                >
                  <div class="mt-1 flex w-4 shrink-0 justify-center">
                    <span
                      v-if="!item.isRead"
                      class="bg-primary h-2.5 w-2.5 rounded-full shadow-[0_0_0_5px_hsl(var(--primary)/0.12)]"
                    ></span>
                    <span
                      v-else
                      class="border-border h-2.5 w-2.5 rounded-full border bg-transparent"
                    ></span>
                  </div>

                  <div class="min-w-0 flex-1">
                    <div class="mb-3 flex flex-wrap items-center gap-2">
                      <span
                        :class="item.isRead ? 'font-medium' : 'font-semibold'"
                        class="text-foreground line-clamp-1 text-base"
                      >
                        {{ item.titleText }}
                      </span>
                      <Tag :color="item.noticeType === '2' ? 'blue' : 'green'">
                        {{ item.typeText }}
                      </Tag>
                      <Tag :color="item.isRead ? 'default' : 'orange'">
                        {{ item.isRead ? '已读' : '未读' }}
                      </Tag>
                    </div>

                    <p
                      class="text-muted-foreground line-clamp-2 text-sm leading-6"
                    >
                      {{ item.summaryText }}
                    </p>

                    <div
                      class="text-muted-foreground mt-3 flex flex-wrap items-center gap-3 text-xs"
                    >
                      <span>{{ item.formattedCreateTime }}</span>
                      <span
                        v-if="isSelectedNotice(item.noticeId)"
                        class="text-primary font-medium"
                      >
                        当前查看
                      </span>
                    </div>
                  </div>
                </button>
              </List.Item>
            </template>
          </List>
        </div>

        <div class="hidden lg:block">
          <section
            class="border-border bg-background sticky top-4 min-h-[640px] rounded-[var(--radius)] border shadow-sm"
          >
            <div class="border-border border-b px-6 py-5">
              <div
                class="text-muted-foreground text-xs font-medium uppercase tracking-[0.2em]"
              >
                Detail
              </div>
              <div class="text-foreground mt-2 text-lg font-semibold">
                通知详情
              </div>
            </div>

            <div class="p-6">
              <Skeleton
                v-if="showDetailSkeleton"
                active
                :paragraph="{ rows: 12 }"
              />

              <template v-else-if="currentDetail">
                <div class="relative space-y-6">
                  <div
                    v-if="showDetailOverlay"
                    class="bg-background/75 absolute inset-0 z-10 flex items-center justify-center rounded-2xl backdrop-blur-[1px]"
                  >
                    <Spin />
                  </div>

                  <div class="flex flex-wrap items-center gap-2">
                    <Tag
                      :color="
                        currentDetail.noticeType === '2' ? 'blue' : 'green'
                      "
                    >
                      {{ currentDetail.typeText }}
                    </Tag>
                    <Tag :color="currentDetail.isRead ? 'default' : 'orange'">
                      {{ currentDetail.isRead ? '已读' : '未读' }}
                    </Tag>
                  </div>

                  <div class="space-y-3">
                    <h2
                      class="text-foreground text-2xl font-semibold leading-tight"
                    >
                      {{ currentDetail.titleText }}
                    </h2>

                    <div
                      class="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-2 text-sm"
                    >
                      <span>
                        发布时间 {{ currentDetail.formattedCreateTime }}
                      </span>
                      <span v-if="currentDetail.formattedReadTime">
                        阅读时间 {{ currentDetail.formattedReadTime }}
                      </span>
                    </div>
                  </div>

                  <!-- eslint-disable vue/no-v-html -->
                  <!-- 内容来自内部富文本通知链路，后端负责基础净化。 -->
                  <article
                    class="prose prose-slate dark:prose-invert prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-foreground prose-a:text-primary prose-img:rounded-xl prose-img:shadow-sm prose-pre:bg-accent prose-li:text-foreground/90 [&_blockquote]:border-primary/30 [&_blockquote]:text-muted-foreground [&_td]:border-border [&_th]:border-border [&_th]:bg-accent/70 max-w-none text-sm [&_img]:max-w-full [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:px-3 [&_td]:py-2 [&_th]:border [&_th]:px-3 [&_th]:py-2"
                    v-html="currentDetail.contentHtml"
                  ></article>
                  <!-- eslint-enable vue/no-v-html -->
                </div>
              </template>

              <div
                v-else
                class="border-border bg-accent/30 flex min-h-[480px] items-center justify-center rounded-2xl border border-dashed"
              >
                <Empty description="从左侧选择一条通知查看详情" />
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>

    <Drawer
      v-if="!isDesktop"
      :footer="null"
      :open="mobileDrawerOpen"
      placement="right"
      title="通知详情"
      width="100%"
      @close="handleDrawerClose"
    >
      <Skeleton v-if="showDetailSkeleton" active :paragraph="{ rows: 10 }" />

      <template v-else-if="currentDetail">
        <div class="relative space-y-6">
          <div
            v-if="showDetailOverlay"
            class="bg-background/75 absolute inset-0 z-10 flex items-center justify-center rounded-2xl backdrop-blur-[1px]"
          >
            <Spin />
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <Tag :color="currentDetail.noticeType === '2' ? 'blue' : 'green'">
              {{ currentDetail.typeText }}
            </Tag>
            <Tag :color="currentDetail.isRead ? 'default' : 'orange'">
              {{ currentDetail.isRead ? '已读' : '未读' }}
            </Tag>
          </div>

          <div class="space-y-3">
            <h2 class="text-foreground text-xl font-semibold leading-tight">
              {{ currentDetail.titleText }}
            </h2>

            <div
              class="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-2 text-sm"
            >
              <span>发布时间 {{ currentDetail.formattedCreateTime }}</span>
              <span v-if="currentDetail.formattedReadTime">
                阅读时间 {{ currentDetail.formattedReadTime }}
              </span>
            </div>
          </div>

          <!-- eslint-disable vue/no-v-html -->
          <!-- 内容来自内部富文本通知链路，后端负责基础净化。 -->
          <article
            class="prose prose-slate dark:prose-invert prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-foreground prose-a:text-primary prose-img:rounded-xl prose-img:shadow-sm prose-pre:bg-accent prose-li:text-foreground/90 [&_blockquote]:border-primary/30 [&_blockquote]:text-muted-foreground [&_td]:border-border [&_th]:border-border [&_th]:bg-accent/70 max-w-none text-sm [&_img]:max-w-full [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:px-3 [&_td]:py-2 [&_th]:border [&_th]:px-3 [&_th]:py-2"
            v-html="currentDetail.contentHtml"
          ></article>
          <!-- eslint-enable vue/no-v-html -->
        </div>
      </template>

      <Empty v-else description="请选择一条通知" />
    </Drawer>
  </Page>
</template>
