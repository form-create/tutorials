<script setup lang="ts">
import formCreate from "@form-create/element-ui";
import type { Options, Rule, Api } from "@form-create/element-ui";
import { onMounted, ref, type Ref } from "vue";

const formData = ref({});
const formApi = ref({}) as Ref<Api>;
const formOptions: Options = {
  form: {
    labelWidth: "100px",
    labelPosition: "right"
  },
  submitBtn: true,
  resetBtn: true
};
const rules = ref([
  {
    type: "checkbox",
    field: "checkbox",
    title: "配置",
    value: [],
    options: [
      { label: "展示", value: "0" },
      { label: "隐藏", value: "1" },
      { label: "禁用", value: "2" },
      { label: "必填", value: "3" }
    ],
    control: [
      {
        value: "0",
        condition: "on",
        method: "display",
        rule: ["input1"]
      },
      {
        value: "1",
        condition: "notOn",
        method: "hidden",
        rule: ["input2"]
      },
      {
        value: "2",
        condition: "notOn",
        method: "disabled",
        rule: ["input1", "b"]
      },
      {
        value: "3",
        condition: "on",
        method: "required",
        rule: ["a", "input2"]
      }
    ]
  },
  {
    type: "input",
    field: "input1",
    name: "a",
    title: "输入框1"
  },
  {
    type: "input",
    field: "input2",
    name: "b",
    title: "输入框2",
    control: [
      {
        value: "",
        condition: "empty",
        rule: [
          {
            native: true,
            type: "div",
            children: ["内容为空"]
          }
        ]
      }
    ]
  },
  {
    type: "inputNumber",
    field: "number",
    value: 0,
    control: [
      {
        value: 2,
        condition: "<",
        rule: [
          {
            type: "div",
            native: true,
            children: ["内容小于2"]
          }
        ]
      },
      {
        value: 2,
        condition: ">",
        rule: [
          {
            type: "div",
            native: true,
            children: ["内容大于2"]
          }
        ]
      },
      {
        value: [4, 6],
        condition: "between",
        rule: [
          {
            type: "div",
            native: true,
            children: ["内容在4-6之间"]
          }
        ]
      }
    ]
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
  </div>
</template>
