<script setup lang="ts">
import { Config } from "@form-create/designer";
import { ref, useTemplateRef, type Ref } from "vue";

defineOptions({
  name: "Designer04"
});

const designer = useTemplateRef("designer") as Ref<
  InstanceType<typeof import("@form-create/designer").FcDesigner>
>;

const config: Config = {
  autoActive: true,
  // 隐藏内置组件
  hiddenItem: ["input"],
  hiddenMenu: ["layout"],
  // 隐藏拖拽操作
  hiddenDragBtn: true,
  hiddenDragMenu: true,
  // 显示保存按钮
  showSaveBtn: true,
  // 隐藏配置
  showFormConfig: false,
  showControl: false,
  showBaseForm: false,
  // showPropsForm: false,
  // showStyleForm: false,
  showEventForm: false,
  showValidateForm: false,
  // 隐藏组件配置
  // showConfig: false
  // 属性配置控制
  // hiddenItemConfig: {
  //   default: ["disabled"],
  //   textarea: ["readonly"]
  // },
  disabledItemConfig: {
    default: ["disabled"],
    textarea: ["readonly"]
  }
};

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
const handleSave = data => {
  console.log(data);
};
</script>

<template>
  <div class="fd-container">
    <div class="flex justify-center p-2">
      <el-button type="primary" @click="handelOption">导出 Option</el-button>
      <el-button type="success" @click="handleRule">导出 Rule</el-button>
    </div>
    <FcDesigner ref="designer" :config="config" @save="handleSave" />
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
