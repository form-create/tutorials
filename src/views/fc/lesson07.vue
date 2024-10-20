<script setup lang="ts">
import formCreate from "@form-create/element-ui";
import type { Options, Rule, Api } from "@form-create/element-ui";
import { onMounted, ref, type Ref } from "vue";

const formData = ref({ input1: "456" });
const formApi = ref({}) as Ref<Api>;
const formOptions: Options = {
  form: {
    labelWidth: "100px",
    labelPosition: "right",
    labelSuffix: "：",
    size: "large"
  },
  row: {
    gutter: 0
  },
  col: {
    span: 12
  },
  formData: {
    input1: "123"
  },
  submitBtn: {
    innerText: "确认",
    click: () => formApi.value.submit()
  },
  resetBtn: {
    innerText: "清空",
    click: () => formApi.value.resetFields(),
    show: true
  },
  info: {
    align: "right"
  }
};
const rules = ref([
  {
    type: "input",
    field: "input1",
    title: "输入框1",
    value: "789",
    info: {
      info: "left",
      align: "left"
    }
  },
  {
    type: "input",
    field: "input2",
    title: "输入框2",
    value: "",
    info: "right"
  },
  {
    type: "select",
    field: "select",
    title: {
      title: "选择框",
      style: "color:red"
    },
    col: {
      offset: 12
    }
  }
] as Rule[]);
onMounted(() => {
  formApi.value?.onSubmit(value => {
    console.log(value);
  });
});
</script>

<template>
  <div class="base-container flex justify-center">
    <formCreate
      v-model:api="formApi"
      v-model="formData"
      class="w-[768px!important]"
      :option="formOptions"
      :rule="rules"
    />
    <div>{{ formData }}</div>
  </div>
</template>
