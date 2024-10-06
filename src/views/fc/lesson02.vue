<script setup lang="ts">
import formCreate from "@form-create/element-ui";
import type { Options, Rule, Api } from "@form-create/element-ui";
import { onMounted, ref, type Ref } from "vue";
import RePhoneInput from "@/components/RePhoneInput";

formCreate.component("RePhoneInput", RePhoneInput);

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
    type: "RePhoneInput",
    field: "phone",
    title: "手机号",
    value: null,
    props: {
      perfix: "+44"
    },
    on: {
      validate: function (isVaild: boolean) {
        isVaild && alert("校验通过");
      }
    },
    validate: [{ message: "手机号不正确", required: true }]
  },
  {
    type: "el-tabs",
    style: "width: 100%",
    field: "activeKey",
    modelKey: "activeKey",
    props: {
      modelValue: "0",
      editable: true,
      closeable: true,
      tabPosition: "bottom"
    },
    children: [
      {
        type: "el-tab-pane",
        key: "1",
        props: {
          label: "页签1",
          name: "0"
        },
        children: [
          {
            type: "input",
            field: "input1",
            title: "输入框1"
          }
        ]
      },
      {
        type: "el-tab-pane",
        key: "2",
        props: {
          label: "页签2",
          name: "1"
        },
        children: [
          {
            type: "input",
            field: "input2",
            title: "输入框2"
          }
        ]
      }
    ],
    on: {
      tabChange: function (tabName) {
        console.log(tabName);
      },
      tabAdd: function () {
        const panes = formApi.value.getRule("activeKey").children;
        panes.push({
          type: "el-tab-pane",
          key: "3",
          props: {
            label: `页签${panes.length + 1}`,
            name: `${panes.length}`
          },
          children: [
            {
              type: "input",
              field: `input${panes.length + 1}`,
              title: `输入框${panes.length + 1}`
            }
          ]
        });
        formApi.value.setRule("activeKey", panes);
      },
      tabRemove: function (tabName) {
        const panes = formApi.value.getRule("activeKey").children;
        const removeIndex = panes.findIndex(
          (item: Rule) => item.props.name === tabName
        );
        if (!~removeIndex) return;
        panes.splice(removeIndex, 1);
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
