<script setup lang="ts">
import formCreate from "@form-create/element-ui";
import type { Options, Rule, Api } from "@form-create/element-ui";
import { markRaw, onMounted, ref, type Ref } from "vue";

import RePhoneInput from "@/components/RePhoneInput";

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
    type: "input",
    field: "input1",
    title: "Info",
    value: "",
    info: {
      info: "这是一个提示",
      align: "left",
      children: [
        {
          type: "div",
          props: {
            innerHTML: "<a href='https://www.baidu.com'>百度</a>"
          }
        }
      ]
    }
  },
  {
    type: "input",
    field: "input2",
    title: "前缀后缀",
    value: "",
    prefix: {
      type: "div",
      style: "color:red",
      children: ["我是一个前缀"]
    },
    suffix: "我是一个后缀"
  },
  {
    type: "input",
    field: "input3",
    title: "Class 和 ID",
    value: "",
    class: "my-class",
    id: "my-input",
    style: "width: 80px;"
  },
  {
    type: "input",
    field: "input4",
    title: "Slots",
    value: "",
    children: [
      {
        slot: "prefix",
        type: "ElButton",
        children: ["我是插槽"]
      },
      {
        slot: "suffix",
        type: "ElButton",
        children: ["我是插槽"]
      }
    ]
  },
  {
    component: markRaw(RePhoneInput),
    field: "phone",
    title: "自定义组件",
    value: ""
  },
  {
    type: "input",
    field: "input5",
    title: "validator",
    value: "",
    validate: [{ message: "请输入值", required: true }]
  },
  {
    type: "select",
    field: "select",
    title: "Options",
    value: [],
    options: [
      { label: "选项1", value: "1" },
      { label: "选项2", value: "2" }
    ],
    optionsTo: "props.options"
  },
  {
    type: "input",
    field: "input6",
    title: "inject 和 On",
    value: "",
    inject: { key: "myKey" },
    on: {
      input: function (inject, value: string) {
        console.log(inject, value);
      }
    }
  },
  {
    type: "input",
    field: "input7",
    title: "Update 和 Col",
    value: "",
    update: (val, rule, fApi, by) => {
      rule.title = val;
    },
    col: {
      span: 12,
      offset: 6
    }
  },
  {
    type: "input",
    field: "input8",
    title: "Title",
    value: "",
    wrap: {
      show: false
    },
    col: {
      show: false
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
  </div>
</template>

<style lang="scss">
.my-class input {
  color: red;
}
</style>
