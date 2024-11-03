<script setup lang="ts">
import formCreate from "@form-create/element-ui";
import type { Options, Rule, Api } from "@form-create/element-ui";
import { onMounted, ref, type Ref } from "vue";

import { ElButton } from "element-plus";
import { http } from "@/utils/http";

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
    field: "username",
    title: "用户名",
    value: "",
    directives: {
      autofocus: true
    },
    effect: {
      fetch: {
        action: "/get-async-routes",
        method: "get",
        parse: res => res.ignore[0].path,
        to: "props.value"
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
    value: "",
    on: {
      input: (val: string) => console.log(val)
    }
  },
  {
    type: "ElButton",
    field: "submit",
    title: "按钮",
    children: ["按钮"]
  },
  {
    type: "btn",
    field: "reset",
    title: "按钮",
    children: ["按钮"]
  },
  {
    type: "select",
    field: "select",
    title: "选择框",
    props: {},
    options: [],
    effect: {
      loadOptions: true
    }
  }
] as Rule[]);

// 注册组件
formCreate.component("ElButton", ElButton);
// const component = formCreate.component("ElButton");
// console.log(component);
// 组件别名
formCreate.componentAlias({ btn: "ElButton" });
// 注册指令
formCreate.directive("autofocus", el => el.focus());
// 注册一个格式处理方法
formCreate.parser({
  name: "input",
  toFormValue: val => val || 0
});
// 注册一个effect拓展
formCreate.register({
  name: "loadOptions",
  components: "select",
  init(_, rule) {
    rule.options = [
      { label: "好用", value: 0 },
      { label: "快速", value: 1 },
      { label: "高效", value: 2 },
      { label: "全能", value: 3 }
    ];
  }
});

formCreate.fetch = ({
  action,
  data,
  dataType,
  method,
  withCredentials,
  headers,
  onSuccess,
  onError
}) => {
  if (dataType === "formData") {
    data = Object.entries(data).reduce((prev, cur) => {
      const [k, v] = cur;
      prev.append(k, v);
      return prev;
    }, new FormData());
  }

  http
    .request(null, null, {
      url: action,
      method,
      withCredentials,
      headers,
      data
    })
    .then(onSuccess)
    .catch(onError);
};

onMounted(() => {
  formApi.value = formCreate.getApi("form");
  console.log(formApi.value);
  formApi.value?.onSubmit(value => {
    console.log(value);
  });
  // console.log(JSON.stringify(rules.value));
  // console.log(formCreate.toJson(rules.value as any)); // 能够转换函数
  // console.log(formCreate.parseJson(formCreate.toJson(rules.value as any)));
});
</script>

<template>
  <div class="base-container flex justify-center">
    <formCreate
      v-model="formData"
      name="form"
      class="w-[768px!important]"
      :option="formOptions"
      :rule="rules"
    />
  </div>
</template>
