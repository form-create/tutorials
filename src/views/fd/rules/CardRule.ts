const CardRule = {
  //插入菜单位置
  menu: "biz",
  //图标
  icon: "icon-card",
  //名称
  label: "自定义容器",
  //id,唯一!
  name: "elCard",
  //是否可以操作, 除了容器类组件建议为true !
  mask: false,
  //可以向内部拖入组件
  drag: true,
  //组件操作按钮生成在组件的内部还是外部
  inside: true,
  //定义组件的事件
  event: [],
  //定义组件的渲染规则
  rule() {
    //自定义组件的生成规则
    return {
      type: "elCard",
      props: {
        header: "自定义标题"
      },
      style: { width: "100%" },
      children: []
    };
  },
  //自定义组件的属性配置
  props(_, { t }) {
    return [
      {
        type: "input",
        title: t?.("Card.title") || "标题",
        field: "header"
      },
      {
        type: "select",
        title: t?.("Card.size") || "阴影显示方式",
        field: "shadow",
        options: ["always", "hover", "never"].map(v => ({ value: v, label: v }))
      }
    ];
  }
};

export default CardRule;
