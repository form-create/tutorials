<script setup lang="ts">
import FcDesigner, { Config } from "@form-create/designer";
import type { Rule, Options } from "@form-create/element-ui";
import { ref, useTemplateRef, type Ref } from "vue";

defineOptions({
  name: "Designer06"
});

const designer = useTemplateRef("designer") as Ref<
  InstanceType<typeof import("@form-create/designer").FcDesigner>
>;
const formCreate = FcDesigner.formCreate;
const handleEmit = (type, data) => {
  console.log(type, data);
};
const binding = {
  config: {
    autoActive: true,
    fieldReadonly: false,
    showSaveBtn: true
  } satisfies Config,
  ...[
    "active",
    "create",
    "copy",
    "delete",
    "drag",
    "inputData",
    "save",
    "clear"
  ].reduce((prev, cur) => {
    const eventKey = "on" + cur[0].toUpperCase() + cur.slice(1);
    prev[eventKey] = (...args) => handleEmit(cur, args);
    return prev;
  }, {})
};

// 弹窗相关
const modalVisible = ref(false);
const editMode = ref(false);
const mode = ref("rule");
const json = ref("");
const handelOption = () => {
  modalVisible.value = true;
  json.value = designer.value?.getOptionsJson();
};
const handleRule = () => {
  modalVisible.value = true;
  json.value = designer.value?.getJson();
};
const handleData = () => {
  modalVisible.value = true;
  json.value = JSON.stringify(designer.value?.getFormData());
};
// 处理弹窗保存事件
const handleSave = () => {
  if (mode.value === "rule") {
    designer.value?.setRule(formCreate.parseJson(json.value) as Rule[]);
  } else if (mode.value === "option") {
    designer.value?.setOptions(formCreate.parseJson(json.value) as Options);
  } else if (mode.value === "data") {
    designer.value?.setFormData(JSON.parse(json.value));
  }
  modalVisible.value = false;
};
const handleEditOption = () => {
  mode.value = "option";
  editMode.value = true;
  modalVisible.value = true;
};
const handleEditRule = () => {
  mode.value = "rule";
  editMode.value = true;
  modalVisible.value = true;
};
const handleEditData = () => {
  mode.value = "data";
  editMode.value = true;
  modalVisible.value = true;
};

const handleEvent = (type: String, value: any) => {
  console.log(type, value);
};
</script>

<template>
  <div class="fd-container">
    <div class="flex justify-center p-2">
      <el-button type="primary" @click="handleEditOption">
        导入 Option
      </el-button>
      <el-button type="primary" @click="handleEditRule">导入 Rule</el-button>
      <el-button type="primary" @click="handleEditData">导入 Data</el-button>
      <el-button type="success" @click="handelOption">导出 Option</el-button>
      <el-button type="success" @click="handleRule">导出 Rule</el-button>
      <el-button type="success" @click="handleData">导出 Data</el-button>
      <el-button type="primary" plain @click="designer?.openPreview()">
        预览
      </el-button>
      <el-button type="danger" plain @click="designer?.clearDragRule()">
        清空 Rule
      </el-button>
    </div>
    <FcDesigner ref="designer" v-bind="binding" />
    <el-dialog
      v-model="modalVisible"
      title="导出JSON"
      width="40%"
      @close="() => (json = '')"
    >
      <el-input v-model="json" type="textarea" :rows="10" />
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleSave">保存</el-button>
        </div>
      </template>
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

._fd-event-title {
  line-height: 100%;
}
</style>
