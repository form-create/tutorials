<script setup lang="ts">
import { Config } from "@form-create/designer";
import { ref, useTemplateRef, type Ref } from "vue";

defineOptions({
  name: "Designer03"
});

const designer = useTemplateRef("designer") as Ref<
  InstanceType<typeof import("@form-create/designer").FcDesigner>
>;

const config: Config = {
  autoActive: true,
  // 拓展表单配置项: formOption
  appendConfigData: ["remark"],
  formRule: {
    append: true,
    rule() {
      return [
        {
          type: "input",
          field: ">remark",
          title: "备注",
          props: {
            type: "textarea",
            row: 3
          }
        }
      ];
    }
  },
  // 拓展基础配置项: Rule
  baseRule: {
    append: true,
    rule() {
      return [
        {
          type: "input",
          field: "info",
          info: "这是一个提示",
          title: "提示词"
        },
        {
          type: "switch",
          field: "$required",
          title: "是否必填"
        }
      ];
    }
  },
  // 拓展组件配置项: Rule.props
  componentRule: {
    default: {
      append: true,
      rule() {
        return [
          {
            type: "input",
            field: "remark",
            title: "描述说明"
          }
        ];
      }
    },
    input: {
      append: true,
      rule() {
        return [
          {
            type: "select",
            field: "type",
            title: "类型",
            value: "text",
            options: [
              { label: "文本框", value: "text" },
              { label: "密码框", value: "password" },
              { label: "多行文本框", value: "textarea" }
            ]
          }
        ];
      }
    }
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
</script>

<template>
  <div class="fd-container">
    <div class="flex justify-center p-2">
      <el-button type="primary" @click="handelOption">导出 Option</el-button>
      <el-button type="success" @click="handleRule">导出 Rule</el-button>
    </div>
    <FcDesigner ref="designer" :config="config" />
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
