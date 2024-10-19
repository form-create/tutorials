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
  injectEvent: true,
  submitBtn: true,
  resetBtn: true
};
const rules = ref([
  {
    type: "input",
    field: "userName", // field + event -> user-name-change.
    title: "用户名",
    value: "",
    emit: ["change"],
    emitPrefix: "username",
    inject: { key: "myKey" },
    on: {
      change: (inject, value: string) => {
        console.log("on: ", value);
      },
      input: (inject: Record<string, any>) => {
        // formApi.value.getRule("show").value = value;
        const { key } = inject.inject;
        const args = inject.args;
        inject.api.getRule("show").value = key + "-" + args[0];
      }
    }
  },
  {
    type: "input",
    field: "password",
    props: {
      type: "password"
    },
    title: "密码",
    value: ""
  },
  {
    type: "input",
    field: "show",
    title: "显示",
    value: "",
    props: {
      disabled: true
    }
  }
] as Rule[]);
onMounted(() => {
  formApi.value?.onSubmit(value => {
    console.log(value);
  });

  formApi.value.on("username-change", (_, val: string) => {
    console.log("fAPI: ", val);
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
      @username-change="(_, val: string) => console.log('emit: ', val)"
    />
  </div>
</template>
