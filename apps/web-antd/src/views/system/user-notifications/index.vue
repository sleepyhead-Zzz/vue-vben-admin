<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import {
  Badge,
  Button,
  Drawer,
  Empty,
  List,
  message,
  Tabs,
  Tag,
} from 'ant-design-vue';
import dayjs from 'dayjs';

import {
  getPagedUserNotice,
  getUserNoticeDetail,
  markNoticeAsRead,
} from '#/api/system/userNotice';

const activeTab = ref<'1' | '2' | 'all'>('all');
const loading = ref(false);

const pageNum = ref(1);
const pageSize = ref(10);
const total = ref(0);

const list = ref<SystemAPI.SysUserNotificationListDTO[]>([]);
const drawerOpen = ref(false);
const currentDetail = ref<null | SystemAPI.SysUserNotificationDetailDTO>(null);

const queryType = computed(() =>
  activeTab.value === 'all' ? undefined : activeTab.value,
);

async function fetchList(reset = false) {
  if (reset) pageNum.value = 1;
  loading.value = true;

  try {
    const { data } = await getPagedUserNotice({
      pageNum: pageNum.value,
      pageSize: pageSize.value,
      type: queryType.value,
    });

    list.value = data.records.map((item: any) => ({
      noticeId: item.noticeId,
      title: item.noticeTitle,
      summary: item.summary || '',
      type: item.noticeType,
      typeText: item.noticeType === '1' ? '通知' : '公告',
      createTime: dayjs(item.createTime).format('YYYY-MM-DD HH:mm'),
      read: item.readFlag === '1',
    }));

    total.value = data.total || 0;
  } catch {
    message.error('加载消息失败');
  } finally {
    loading.value = false;
  }
}

async function openDetail(item: SystemAPI.SysUserNotificationDetailDTO) {
  try {
    const { data } = await getUserNoticeDetail({ noticeId: item.noticeId });

    currentDetail.value = {
      noticeId: data.noticeId,
      title: data.noticeTitle,
      type: data.noticeType,
      content: data.noticeContent || '',
      createTime: dayjs(data.createTime).format('YYYY-MM-DD HH:mm:ss'),
      read: data.readFlag === '1',
      readTime: data.readTime
        ? dayjs(data.readTime).format('YYYY-MM-DD HH:mm:ss')
        : undefined,
    };

    drawerOpen.value = true;

    if (!item.read) {
      await markNoticeAsRead(item.noticeId);
      item.read = true;
    }
  } catch {
    message.error('获取详情失败');
  }
}

async function handleReadAll() {
  await fetchList(true);
  message.success('已全部标记为已读');
}

onMounted(() => fetchList(true));
</script>

<template>
  <div class="p-4">
    <!-- 顶部 Tabs + 全部已读 -->
    <div class="mb-4 flex items-center justify-between">
      <Tabs v-model:active-key="activeTab" @change="() => fetchList(true)">
        <Tabs.TabPane key="all" tab="全部" />
        <Tabs.TabPane key="1" tab="通知" />
        <Tabs.TabPane key="2" tab="公告" />
      </Tabs>
      <Button type="link" @click="handleReadAll">全部已读</Button>
    </div>

    <!-- 消息列表 -->
    <List
      :loading="loading"
      :data-source="list"
      item-layout="horizontal"
      :pagination="{
        current: pageNum,
        pageSize,
        total,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50'],
        onChange: (page, size) => {
          pageNum.value = page;
          pageSize.value = size;
          fetchList();
        },
      }"
    >
      <template #renderItem="{ item }">
        <List.Item
          class="cursor-pointer hover:bg-gray-50"
          @click="openDetail(item)"
        >
          <template #prefix>
            <Badge v-if="!item.read" status="processing" />
          </template>

          <List.Item.Meta>
            <template #title>
              <div class="flex items-center gap-2">
                <span :class="{ 'font-semibold': !item.read }">{{
                  item.title
                }}</span>
                <Tag :color="item.type === '2' ? 'blue' : 'default'">
                  {{ item.typeText }}
                </Tag>
              </div>
            </template>

            <template #description>
              <div class="line-clamp-2 text-gray-600">
                {{ item.summary || '暂无摘要' }}
              </div>
              <div class="mt-1 text-xs text-gray-400">
                {{ item.createTime }}
              </div>
            </template>
          </List.Item.Meta>
        </List.Item>
      </template>

      <template #empty>
        <Empty description="暂无消息" />
      </template>
    </List>

    <!-- 详情抽屉 -->
    <Drawer
      v-model:open="drawerOpen"
      title="消息详情"
      width="640"
      :footer="null"
    >
      <div v-if="currentDetail" class="space-y-4">
        <div>
          <h3 class="text-xl font-medium">{{ currentDetail.title }}</h3>
          <div class="mt-2 flex items-center gap-3 text-sm text-gray-500">
            <span>{{ currentDetail.createTime }}</span>
            <Tag :color="currentDetail.type === '2' ? 'blue' : 'default'">
              {{ currentDetail.type === '2' ? '公告' : '通知' }}
            </Tag>
            <span v-if="currentDetail.read" class="text-green-600">
              已读 {{ currentDetail.readTime }}
            </span>
            <span v-else class="text-orange-600">未读</span>
          </div>
        </div>
      </div>
    </Drawer>
  </div>
</template>

<style scoped>
:deep(.ant-list-item) {
  transition: background-color 0.2s;
}
</style>
