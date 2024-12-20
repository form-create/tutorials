import { computed, defineComponent, ref, watchEffect } from "vue";
import { http } from "@/utils/http";
import type { Member, MemberApiParams, MemberApiResponse } from "./types";

export default defineComponent({
  name: "MemberSelect",
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "请选择人员"
    },
    deptId: {
      type: String,
      default: ""
    }
  },
  setup(props, { emit }) {
    const members = ref([] as Member[]);
    const data = computed({
      get: () => (props.multiple ? props.modelValue : props.modelValue[0]),
      set: value => {
        if (props.readonly) return;
        emit("update:modelValue", Array.isArray(value) ? value : [value]);
      }
    });

    // 数据获取
    watchEffect(() => {
      let deptId = props.deptId || "list";
      http
        .get<MemberApiResponse, MemberApiParams>(`/member/${deptId}`)
        .then(res => {
          members.value = res.data ?? [];
        });
    });

    return () => (
      <el-select
        v-model={data.value}
        multiple={props.multiple}
        disabled={props.disabled}
        readonly={props.readonly}
        placeholder={props.placeholder}
      >
        {members.value.map(item => (
          <el-option label={item.name} value={item.id} />
        ))}
      </el-select>
    );
  }
});
