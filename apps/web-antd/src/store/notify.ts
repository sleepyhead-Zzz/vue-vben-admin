import type { NotificationItem } from '@vben/layouts';

import { computed, ref, watch } from 'vue';

import { SvgMessageUrl } from '@vben/icons';
import { $t } from '@vben/locales';
import { useUserStore } from '@vben/stores';

import { notification } from 'ant-design-vue';
import dayjs from 'dayjs';
import { defineStore } from 'pinia';

import {
  getPagedUserNotice,
  getUnreadNoticeCount,
  markNoticeAsRead,
  readAllNotice,
} from '#/api/system/userNotice';
import { useWebSocketMessage } from '#/utils/message';

type NoticeNotificationItem = NotificationItem & {
  noticeId: number | string;
  noticeType?: string;
};

const RECENT_NOTICE_PAGE_SIZE = 6;
const PUSH_REFRESH_DELAYS = [0, 400, 1200];

function formatNoticeDate(value?: string) {
  return value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : '';
}

function normalizeNoticeId(noticeId?: number | string) {
  if (noticeId === undefined || noticeId === null || noticeId === '') {
    return undefined;
  }

  return String(noticeId);
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function mapNoticeToNotificationItem(
  item: SystemAPI.SysUserNotificationListDTO,
  userId: number | string,
): NoticeNotificationItem | null {
  const normalizedNoticeId = normalizeNoticeId(item.noticeId);
  if (!normalizedNoticeId) {
    return null;
  }

  return {
    avatar: SvgMessageUrl,
    date: formatNoticeDate(item.createTime),
    id: normalizedNoticeId,
    isRead: item.readFlag === '1',
    message: item.summary || $t('component.notice.title'),
    noticeId: normalizedNoticeId,
    noticeType: item.noticeType,
    title: item.noticeTitle || $t('component.notice.title'),
    userId,
  };
}

export const useNotifyStore = defineStore('app-notify', () => {
  const userStore = useUserStore();

  const userId = computed(() => userStore.userInfo?.userId || '0');
  const unreadCount = ref(0);
  const notifications = ref<NoticeNotificationItem[]>([]);
  const loading = ref(false);
  const listeningStarted = ref(false);
  const pushRefreshTask = ref<null | Promise<void>>(null);

  const showDot = computed(() => unreadCount.value > 0);

  async function refreshUnreadCount() {
    try {
      const { data } = await getUnreadNoticeCount();
      unreadCount.value = data ?? 0;
    } catch (error) {
      console.error('refreshUnreadCount error:', error);
    }
  }

  async function loadRecentNotifications() {
    if (!userStore.userInfo?.userId) {
      notifications.value = [];
      unreadCount.value = 0;
      return;
    }

    loading.value = true;
    try {
      const { data } = await getPagedUserNotice({
        pageNum: 1,
        pageSize: RECENT_NOTICE_PAGE_SIZE,
      });
      const records = data?.rows || [];
      notifications.value = records
        .map((item) => mapNoticeToNotificationItem(item, userId.value))
        .filter((item): item is NoticeNotificationItem => item !== null);
    } catch (error) {
      console.error('loadRecentNotifications error:', error);
      notifications.value = [];
    } finally {
      loading.value = false;
    }
  }

  async function refresh() {
    await Promise.all([refreshUnreadCount(), loadRecentNotifications()]);
  }

  function getNotificationsSignature(items: NoticeNotificationItem[]) {
    return items
      .map((item) => `${item.noticeId}:${item.isRead ? 1 : 0}`)
      .join('|');
  }

  async function refreshFromPush() {
    const previousUnreadCount = unreadCount.value;
    const previousSignature = getNotificationsSignature(notifications.value);

    for (const delay of PUSH_REFRESH_DELAYS) {
      if (delay > 0) {
        await sleep(delay);
      }

      await refresh();

      const nextSignature = getNotificationsSignature(notifications.value);
      if (
        unreadCount.value !== previousUnreadCount ||
        nextSignature !== previousSignature
      ) {
        return;
      }
    }
  }

  async function scheduleRefreshFromPush() {
    if (pushRefreshTask.value) {
      await pushRefreshTask.value;
      return;
    }

    const task = refreshFromPush().finally(() => {
      if (pushRefreshTask.value === task) {
        pushRefreshTask.value = null;
      }
    });
    pushRefreshTask.value = task;
    await task;
  }

  function patchNoticeAsRead(noticeId: number | string) {
    const normalizedNoticeId = normalizeNoticeId(noticeId);
    if (!normalizedNoticeId) {
      return;
    }

    const target = notifications.value.find(
      (item) => normalizeNoticeId(item.noticeId) === normalizedNoticeId,
    );
    if (!target || target.isRead) {
      return;
    }

    target.isRead = true;
    unreadCount.value = Math.max(unreadCount.value - 1, 0);
  }

  async function readNotice(noticeId: number | string) {
    await markNoticeAsRead({ noticeId } as SystemAPI.markNoticeAsReadParams);
    patchNoticeAsRead(noticeId);
  }

  async function setRead(item: NoticeNotificationItem) {
    if (!item.isRead) {
      await readNotice(item.noticeId);
    }
  }

  async function markAllRead() {
    await readAllNotice();
    unreadCount.value = 0;
    notifications.value = notifications.value.map((item) => ({
      ...item,
      isRead: true,
    }));
  }

  async function clearAllMessage() {
    await markAllRead();
  }

  function startListeningMessage() {
    if (listeningStarted.value) {
      return;
    }

    const websocketReturnData = useWebSocketMessage();
    if (!websocketReturnData) {
      return;
    }

    listeningStarted.value = true;
    const { data } = websocketReturnData;

    watch(data, async (message) => {
      if (!message) {
        return;
      }

      notification.success({
        description:
          typeof message === 'string'
            ? message
            : $t('component.notice.received'),
        duration: 3,
        message: $t('component.notice.received'),
      });

      await scheduleRefreshFromPush();
      data.value = null;
    });
  }

  async function initialize() {
    await refresh();
    startListeningMessage();
  }

  function $reset() {
    notifications.value = [];
    unreadCount.value = 0;
    loading.value = false;
  }

  return {
    $reset,
    clearAllMessage,
    initialize,
    loadRecentNotifications,
    loading,
    markAllRead,
    notifications,
    readNotice,
    refresh,
    refreshFromPush,
    refreshUnreadCount,
    setRead,
    showDot,
    startListeningMessage,
    unreadCount,
  };
});
