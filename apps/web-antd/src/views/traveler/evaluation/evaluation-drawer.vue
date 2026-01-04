<script setup lang="ts">
import { ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import {
  Card,
  Descriptions,
  DescriptionsItem,
  Image,
  ImagePreviewGroup,
  message,
  Rate,
  Space,
} from 'ant-design-vue';

import { getEvaluationInfoByBookId } from '#/api/traveler/evaluation';

const detail = ref<TravelerAPI.TravelerEvaluationDTO>({
  evaluationId: undefined,
  bookId: undefined,
  serviceAttitude: 0,
  professionalism: 0,
  evaluationContent: '',
  files: [],
});

const [BasicDrawer, drawerApi] = useVbenDrawer({
  destroyOnClose: true,
  async onOpenChange(isOpen) {
    if (!isOpen) return;

    drawerApi.drawerLoading(true);

    try {
      const { id } = drawerApi.getData() as { id?: number | string };
      const { data } = await getEvaluationInfoByBookId({ bookId: id });

      detail.value = data;
    } catch {
      message.error('获取评价详情失败');
    } finally {
      drawerApi.drawerLoading(false);
    }
  },
});
</script>

<template>
  <BasicDrawer title="评价详情" class="w-[800px]">
    <Card bordered>
      <Descriptions bordered :column="1">
        <DescriptionsItem label="服务态度">
          <Rate :value="detail.serviceAttitude" disabled />
        </DescriptionsItem>

        <DescriptionsItem label="专业能力">
          <Rate :value="detail.professionalism" disabled />
        </DescriptionsItem>

        <DescriptionsItem label="评价内容">
          <div>{{ detail.evaluationContent || '暂无内容' }}</div>
        </DescriptionsItem>

        <DescriptionsItem label="附件图片">
          <ImagePreviewGroup>
            <Space wrap>
              <Image
                v-for="file in detail.files"
                :key="file.ossId"
                :width="100"
                :src="file.url"
                :alt="file.fileName"
                style="border-radius: 4px"
              />
            </Space>
          </ImagePreviewGroup>
        </DescriptionsItem>
      </Descriptions>
    </Card>
  </BasicDrawer>
</template>

<style scoped></style>
