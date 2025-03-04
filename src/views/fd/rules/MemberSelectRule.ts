import type { DragRule } from "@form-create/designer";

let index = 0;

const MemberSelectRule: DragRule = {
  //插入菜单位置
  menu: "biz",
  //图标
  icon: "icon-select",
  //名称
  label: "用户选择",
  //id,唯一!
  name: "MemberSelect",
  //是否可以操作, 除了容器类组件建议为true !
  mask: true,
  //支持组件验证, 值的类型
  validate: ["array"],
  //定义组件的事件
  event: ["change"],
  //定义组件的渲染规则
  rule({ t }) {
    //组件的生成规则
    return {
      type: "MemberSelect",
      //field不能重复!!!
      field: `MemberSelect${++index}`,
      title: t?.("MemberSelect.title") || "用户选择",
      info: "",
      $required: false,
      props: {}
    };
  },
  watch: {
    multiple: ({ rule }) => {
      rule.key = rule.field + new Date();
    }
  },
  //组件的属性配置
  props(_, { t }) {
    return [
      {
        type: "switch",
        title: t?.("MemberSelect.disabled") || "是否禁用",
        field: "disabled"
      },
      {
        type: "switch",
        title: t?.("MemberSelect.readonly") || "是否只读",
        field: "readonly"
      },
      {
        type: "switch",
        title: t?.("MemberSelect.multiple") || "是否多选",
        field: "multiple"
      },
      {
        type: "input",
        title: t?.("MemberSelect.placeholder") || "提示词",
        field: "placeholder"
      },
      {
        type: "input",
        title: t?.("MemberSelect.deptId") || "部门id",
        field: "deptId"
      }
    ];
  }
};

export default MemberSelectRule;
