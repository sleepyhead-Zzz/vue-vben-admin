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
  noticeId: number;
  noticeType?: string;
};

const RECENT_NOTICE_PAGE_SIZE = 6;

function formatNoticeDate(value?: string) {
  return value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : '';
}

function mapNoticeToNotificationItem(
  item: SystemAPI.SysUserNotificationListDTO,
  userId: number | string,
): NoticeNotificationItem | null {
  if (!item.noticeId) {
    return null;
  }

  return {
    avatar: SvgMessageUrl,
    date: formatNoticeDate(item.createTime),
    isRead: item.readFlag === '1',
    message: item.summary || $t('component.notice.title'),
    noticeId: item.noticeId,
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

  function patchNoticeAsRead(noticeId: number) {
    const target = notifications.value.find((item) => item.noticeId === noticeId);
    if (!target || target.isRead) {
      return;
    }

    target.isRead = true;
    unreadCount.value = Math.max(unreadCount.value - 1, 0);
  }

  async function readNotice(noticeId: number) {
    await markNoticeAsRead({ noticeId });
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
        description: typeof message === 'string' ? message : $t('component.notice.received'),
        duration: 3,
        message: $t('component.notice.received'),
      });

      await refresh();
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
    refreshUnreadCount,
    setRead,
    showDot,
    startListeningMessage,
    unreadCount,
  };
});
