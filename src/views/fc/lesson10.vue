<script setup lang="ts">
import formCreate from "@form-create/element-ui";
import type { Options, Rule, Api } from "@form-create/element-ui";
import { onMounted, ref, type Ref } from "vue";

const formData = ref({});
const formApi = ref({}) as Ref<Api>;

const getToken = () => "Bearer token";

const formOptions: Options = {
  beforeFetch: config => {
    const headers: Record<string, any> = config.headers || {};
    const token = getToken();
    headers.Authorization = token;
    config.headers = headers;
  },
  form: {
    labelWidth: "100px",
    labelPosition: "right"
  },
  submitBtn: true,
  resetBtn: true
};
const rules = ref([
  {
    type: "select", // radio checkbox
    field: "userType",
    title: "用户类型",
    value: "",
    effect: {
      fetch: {
        action: "/options",
        method: "get",
        data: {},
        // headers: {
        //   Authorization: "Bearer token"
        // },
        to: "options",
        parse: response => {
          return Object.entries(response.data).map(item => {
            const [en, cn] = item;
            return { label: cn, value: en };
          });
        },
        onError: err => console.log(err)
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
