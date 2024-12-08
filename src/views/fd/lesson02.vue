<script setup lang="ts">
import { onMounted, ref, useTemplateRef, type Ref } from "vue";
import MemberSelectDragRule from "./rules/memberSelect";

defineOptions({
  name: "Designer02"
});

const designer = useTemplateRef("designer") as Ref<
  InstanceType<typeof import("@form-create/designer").FcDesigner>
>;

const modalVisible = ref(false);

const json = ref("");
const handelOption = () => {
  modalVisible.value = true;
  json.value = designer.value?.getOptionsJson();
};
const handleRule = () => {
  modalVisible.value = true;
  json.value = designer.value?.getJson();
};

onMounted(() => {
  designer.value?.addComponent(MemberSelectDragRule);
  designer.value?.addMenu({
    name: "biz",
    title: "业务组件",
    list: [
      {
        name: "MemberSelect",
        label: "成员选择",
        icon: "icon-select"
      }
    ]
  });
});
</script>

<template>
  <div class="fd-container">
    <div class="flex justify-center p-2">
      <el-button type="primary" @click="handelOption">导出 Option</el-button>
      <el-button type="success" @click="handleRule">导出 Rule</el-button>
    </div>
    <FcDesigner ref="designer" />
    <el-dialog
      v-model="modalVisible"
      title="导出JSON"
      width="40%"
      @close="() => (json = '')"
    >
      <el-input v-model="json" type="textarea" :rows="10" />
    </el-dialog>
  </div>
</template>

<style lang="scss">
.fd-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 8px 24px;
  margin: 0 !important;
}
</style>
