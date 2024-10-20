<script setup lang="ts">
import { message } from "@/utils/message";
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
    type: "input",
    field: "password",
    title: "旧密码",
    value: "",
    update: (val, rule, fApi, arg) => {
      const password = "123456";
      if (val === password) {
        const newPassword = fApi.getRule("newPassword");
        newPassword.props.disabled = false;
      }
    }
  },
  {
    type: "input",
    field: "newPassword",
    title: "新密码",
    value: "",
    props: {
      disabled: true
    },
    update: (val, rule, fApi, arg) => {
      const oldPassword = fApi.getRule("password");
      if (val && val === oldPassword.value) {
        message("新密码不能与旧密码相同", { type: "error" });
        rule.value = "";
      }
    }
  },
  {
    type: "input",
    field: "checkPassword",
    title: "确认密码",
    value: "",
    link: ["newPassword"],
    hidden: true,
    update: (val, rule, fApi, arg) => {
      const { origin, linkField } = arg;
      const newPassword = fApi.getRule("newPassword");
      if (origin === "link" && linkField === "newPassword") {
        rule.hidden = !newPassword.value;
      }
      if (!val) return;
      if (origin === "change" && val === newPassword.value) {
        message("密码校验通过", { type: "success" });
      } else {
        message("两次密码不一致", { type: "error" });
      }
    }
  },
  {
    type: "select",
    field: "country",
    title: "国家",
    value: "",
    options: [
      { label: "中国", value: "中国" },
      { label: "美国", value: "美国" },
      { label: "英国", value: "英国" }
    ],
    update: (val, rule, fApi, arg) => {
      const country = fApi.getRule("area");
      if (val === "中国") {
        country.options = [
          { label: "北京", value: "北京" },
          { label: "上海", value: "上海" },
          { label: "深圳", value: "深圳" }
        ];
      }
      if (val === "美国") {
        country.options = [
          { label: "纽约", value: "纽约" },
          { label: "洛杉矶", value: "洛杉矶" },
          { label: "旧金山", value: "旧金山" }
        ];
      }
      if (val === "英国") {
        country.options = [{ label: "伦敦", value: "伦敦" }];
      }
    }
  },
  {
    type: "select",
    field: "area",
    title: "地区",
    value: "",
    options: []
  },
  {
    type: "input",
    field: "test",
    title: "测试",
    value: "666",
    update: (val, rule, fApi, arg) => {
      if (arg.origin === "init") {
        console.log(rule.value);
      }
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
