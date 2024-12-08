import type { DragRule } from "@form-create/designer";

let uniqueId = 0;

const MemberSelectDragRule: DragRule = {
  name: "MemberSelect",
  icon: "icon-select",
  label: "成员选择",
  menu: "biz",
  mask: true,
  event: ["change"],
  rule({ t }) {
    return {
      type: "MemberSelect",
      title: t?.("memberSelect") || "成员选择",
      value: [],
      field: "memberSelect" + ++uniqueId,
      info: "",
      props: {
        disabled: false,
        multiple: false,
        readonly: false,
        placeholder: "请选择人员"
      },
      $required: false
    };
  },
  watch: {
    multiple: ({ rule }) => {
      rule.key = rule.field + new Date();
    }
  },
  props(rule, { t }) {
    return [
      {
        type: "switch",
        title: t?.("disabled") || "禁用",
        field: "disabled"
      },
      {
        type: "switch",
        title: t?.("multiple") || "多选",
        field: "multiple"
      },
      {
        type: "switch",
        title: t?.("readonly") || "只读",
        field: "readonly"
      },
      {
        type: "input",
        title: t?.("placeholder") || "提示词",
        field: "placeholder"
      },
      {
        type: "input",
        title: t?.("deptId") || "部门ID",
        field: "deptId"
      }
    ];
  }
};

export default MemberSelectDragRule;
