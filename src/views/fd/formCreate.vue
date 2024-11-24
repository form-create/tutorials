<script setup lang="ts">
import { ref, computed } from "vue";
import formCreate from "@form-create/element-ui";
defineOptions({
  name: "Render"
});

const optionJson = ref("");
const ruleJson = ref("");
const option = computed(() => {
  try {
    return formCreate.parseJson(optionJson.value);
  } catch (error) {
    return {};
  }
});

const rule = computed(() => {
  try {
    return formCreate.parseJson(ruleJson.value);
  } catch (error) {
    return [];
  }
});
</script>

<template>
  <div class="flex gap-4">
    <div class="flex flex-col flex-[2_1_0%] gap-4">
      <div class="text-center">规则区</div>
      <el-input
        v-model="optionJson"
        type="textarea"
        :rows="15"
        placeholder="请输入 Option"
      />
      <el-input
        v-model="ruleJson"
        type="textarea"
        :rows="15"
        placeholder="请输入 Rule"
      />
    </div>
    <div class="flex flex-col flex-[3_1_0%] gap-4">
      <div class="text-center">表单区</div>
      <div
        v-if="!ruleJson"
        class="flex flex-1 items-center justify-center text-gray-400"
      >
        左侧输入Rule后渲染
      </div>
      <formCreate v-else :option="option" :rule="rule" />
    </div>
  </div>
</template>
