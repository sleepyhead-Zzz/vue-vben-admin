<script setup lang="ts">
import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { addFullName, cloneDeep, getPopupContainer } from '@vben/utils';

import { useVbenForm } from '#/adapter/form';
import { addDevice, editDevice, getDeviceInfo } from '#/api/asset/device';
import { optionLocationSelect } from '#/api/asset/location';
import { optionManufacturerSelect } from '#/api/asset/manufacturer';
import { optionProjectSelect } from '#/api/asset/project';
import { optionSpecificationSelect } from '#/api/asset/specification';
import { optionDeptList } from '#/api/system/dept';
import { defaultFormValueGetter, useBeforeCloseDiff } from '#/utils/popup';

import { modalSchema } from './data';

const emit = defineEmits<{ reload: [] }>();

const isUpdate = ref(false);
const title = computed(() =>
  isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add'),
);

const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    formItemClass: 'col-span-2',
    labelWidth: 80,
    componentProps: { class: 'w-full' },
  },
  schema: modalSchema(),
  showDefaultActions: false,
  wrapperClass: 'grid-cols-2',
});

const { onBeforeClose, markInitialized, resetInitialized } = useBeforeCloseDiff(
  {
    initializedGetter: defaultFormValueGetter(formApi),
    currentGetter: defaultFormValueGetter(formApi),
  },
);

/** 部门选择 */
async function setupDeptSelect() {
  const deptTree = await optionDeptList({ query: {} });
  addFullName(deptTree.data, 'label', ' / ');

  const commonDeptProps = {
    class: 'w-full',
    fieldNames: { key: 'id', value: 'id', children: 'children' },
    getPopupContainer,
    placeholder: '请选择',
    showSearch: true,
    treeData: deptTree.data,
    treeDefaultExpandAll: true,
    treeLine: { showLeafIcon: false },
    treeNodeFilterProp: 'label',
    treeNodeLabelProp: 'fullName',
  };

  formApi.updateSchema([
    { componentProps: () => commonDeptProps, fieldName: 'usageDeptId' },
    { componentProps: () => commonDeptProps, fieldName: 'manageDeptId' },
  ]);
}

/** 位置选择 */
async function setupLocationSelect() {
  const locationTree = await optionLocationSelect({ query: {} });
  addFullName(locationTree.data, 'label', ' / ');
  formApi.updateSchema([
    {
      componentProps: () => ({
        class: 'w-full',
        fieldNames: { key: 'id', value: 'id', children: 'children' },
        getPopupContainer,
        placeholder: '请选择',
        showSearch: true,
        treeData: locationTree.data,
        treeDefaultExpandAll: true,
        treeLine: { showLeafIcon: false },
        treeNodeFilterProp: 'label',
        treeNodeLabelProp: 'label',
      }),
      fieldName: 'locationId',
    },
  ]);
}

/** 巡检项目选择 */
async function setupInspectionProjectSelect() {
  const projectList = await optionProjectSelect();
  formApi.updateSchema([
    {
      fieldName: 'inspectionProjectIds',
      componentProps: {
        getPopupContainer,
        optionFilterProp: 'label',
        optionLabelProp: 'label',
        options: projectList.data.map((item) => ({
          label: item.projectName,
          value: item.projectId,
        })),
      },
    },
  ]);
}

/** 主设备弹窗 */
const [BasicModal, modalApi] = useVbenModal({
  class: 'w-[550px]',
  fullscreenButton: false,
  onBeforeClose,
  onClosed: handleClosed,
  onConfirm: handleConfirm,
  onOpenChange: async (isOpen) => {
    if (!isOpen) return null;
    modalApi.modalLoading(true);

    const { id } = modalApi.getData() as { id?: number | string };
    isUpdate.value = !!id;

    const specificationList = await optionSpecificationSelect();
    const manufactureList = await optionManufacturerSelect();

    formApi.updateSchema([
      {
        componentProps: {
          optionLabelProp: 'label',
          options: specificationList.data.map((item) => ({
            label: item.specificationName,
            value: item.specificationId,
          })),
        },
        fieldName: 'specificationId',
      },
      {
        componentProps: {
          optionLabelProp: 'label',
          options: manufactureList.data.map((item) => ({
            label: item.manufacturerName,
            value: item.manufacturerId,
          })),
        },
        fieldName: 'manufacturerId',
      },
    ]);

    if (isUpdate.value && id) {
      const record = await getDeviceInfo({ deviceId: id });
      await formApi.setValues(record.data);
    }

    const promises = [
      setupDeptSelect(),
      setupLocationSelect(),
      setupInspectionProjectSelect(),
    ];
    await Promise.all(promises);
    await markInitialized();

    modalApi.modalLoading(false);
  },
});

async function handleConfirm() {
  try {
    modalApi.lock(true);
    const { valid } = await formApi.validate();
    if (!valid) return;

    const data = cloneDeep(await formApi.getValues());
    await (isUpdate.value
      ? editDevice({ deviceId: data.deviceId }, data)
      : addDevice(data));

    resetInitialized();
    emit('reload');
    modalApi.close();
  } catch (error) {
    console.error(error);
  } finally {
    modalApi.lock(false);
  }
}

async function handleClosed() {
  await formApi.resetForm();
  resetInitialized();
}
</script>

<template>
  <BasicModal :title="title">
    <BasicForm />
  </BasicModal>
</template>
