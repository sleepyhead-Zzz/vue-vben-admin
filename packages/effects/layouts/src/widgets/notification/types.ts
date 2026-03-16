interface NotificationItem {
  avatar: string;
  date: string;
  id?: number | string;
  isRead?: boolean;
  message: string;
  noticeId?: number | string;
  title: string;
  userId: number | string;
}

export type { NotificationItem };
