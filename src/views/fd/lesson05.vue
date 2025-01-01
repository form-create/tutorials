<script setup lang="ts">
import {
  MemberApiParams,
  MemberApiResponse
} from "@/components/biz/MemberSelect/src/types";
import { http } from "@/utils/http";
import FcDesigner, { Config } from "@form-create/designer";
import { ref, useTemplateRef, type Ref } from "vue";

defineOptions({
  name: "Designer05"
});

const designer = useTemplateRef("designer") as Ref<
  InstanceType<typeof import("@form-create/designer").FcDesigner>
>;

const config: Config = {
  autoActive: true,
  // 关闭表单项field(ID)只读
  fieldReadonly: false
};

const formCreate = FcDesigner.formCreate;
formCreate.setData("user", async function (deptId) {
  const res = await http.get<MemberApiResponse, MemberApiParams>(
    `/member/${deptId}`
  );
  if (res.code !== 200) return [];
  return res.data ?? [];
});

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

._fd-event-title {
  line-height: 100%;
}
</style>
