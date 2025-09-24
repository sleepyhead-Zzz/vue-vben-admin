<script setup lang="ts">
import { computed, h, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { addFullName, cloneDeep, getPopupContainer } from '@vben/utils';

import { useVbenForm } from '#/adapter/form';
import { addDevice, editDevice, getDeviceInfo } from '#/api/asset/device';
import { dropdownlistLocation } from '#/api/asset/location';
import { dropdownlistManufacturer } from '#/api/asset/manufacturer';
import { dropdownProjectList } from '#/api/asset/project';
import { dropDownListSpecification } from '#/api/asset/specification';
import { dropdownDeptList } from '#/api/system/dept';
import { defaultFormValueGetter, useBeforeCloseDiff } from '#/utils/popup';

import InspectionProjectModal from '../project/project-modal.vue';
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
  const deptTree = await dropdownDeptList({ query: {} });
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
  const locationTree = await dropdownlistLocation({ query: {} });
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

/** 巡检项目选择（带新增按钮） */
const projectModalRef = ref<InstanceType<typeof InspectionProjectModal>>();

async function setupInspectionProjectSelect() {
  const list = await dropdownProjectList();
  formApi.updateSchema([
    {
      label: '巡检项目',
      fieldName: 'inspectionProjectIds',
      component: 'Select',
      componentProps: {
        mode: 'multiple',
        showSearch: true,
        placeholder: '请选择巡检项目',
        optionLabelProp: 'label',
        options: list.data.map((item) => ({
          label: item.projectName,
          value: item.projectId,
        })),
        addonAfter: () =>
          h(
            'a',
            {
              style:
                'margin-left: 8px; color: var(--primary-color); cursor: pointer;',
              onClick: () => projectModalRef.value?.open({}),
            },
            '+ 新建',
          ),
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

    const specificationList = await dropDownListSpecification();
    const manufactureList = await dropdownlistManufacturer();

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
  <!-- 设备表单弹窗 -->
  <BasicModal :title="title">
    <BasicForm />
  </BasicModal>

  <!-- 巡检项目新增弹窗（子组件） -->
  <InspectionProjectModal
    ref="projectModalRef"
    title="新增巡检项目"
    @reload="setupInspectionProjectSelect"
  />
</template>
