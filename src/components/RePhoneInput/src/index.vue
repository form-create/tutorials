<script setup lang="ts">
import { type CountryItem } from "./types";
import builtInCountries from "./defaults";

import { ref, watchEffect, onMounted } from "vue";

const props = defineProps({
  countries: {
    type: Array<CountryItem>,
    validate: (v: Array<CountryItem>) => {
      return v.every(item => item.country && item.perfix);
    }
  },
  perfix: {
    type: String,
    default: "+86"
  },
  // 表单API
  formCreateInject: {
    type: Object
  }
});

const emits = defineEmits(["update:modelValue", "validate", "perfixChange"]);

const modelValue = defineModel<string | null>({ required: true });
const countries = ref(props.countries ?? builtInCountries);
const phoneNumber = ref(modelValue.value);
const perfix = ref(props.perfix);

onMounted(() => {
  console.log(props.formCreateInject);
});

watchEffect(() => {
  if (modelValue.value === null) phoneNumber.value = "";
});

const renderSelectLabel = (country: CountryItem) => {
  return `${country.country} ${country.perfix}`;
};

const handlePhoneChanged = (value: string) => {
  const country = countries.value.find(item => item.perfix === perfix.value);
  const isValid = country?.validator?.(value, country) ?? false;
  if (isValid) debugger;
  modelValue.value = isValid ? phoneNumber.value : "";
  emits("validate", isValid);
};

const handleCountryChanged = (perfix: string) => {
  phoneNumber.value = "";
  emits("perfixChange", perfix);
};
</script>

<template>
  <div>
    <el-input
      v-model="phoneNumber"
      style="max-width: 600px"
      placeholder="请输入联系电话"
      class="input-with-select"
      @input="handlePhoneChanged"
    >
      <template #prepend>
        <el-select
          v-model="perfix"
          style="width: 100px"
          @change="handleCountryChanged"
        >
          <template v-for="item in countries" :key="item.country">
            <el-option :label="renderSelectLabel(item)" :value="item.perfix" />
          </template>
        </el-select>
      </template>
    </el-input>
  </div>
</template>

<style lang="scss" scoped>
.input-with-select {
  :deep(.el-input-group__prepend) {
    background-color: var(--el-fill-color-blank);
  }

  :deep(.el-input__validateIcon) {
    display: none;
  }
}
</style>
