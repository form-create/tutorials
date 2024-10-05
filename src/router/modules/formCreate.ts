export default {
  path: "/formCreate",
  name: "FormCreate",
  meta: {
    icon: "tabler:edit",
    // showLink: false,
    title: "表单渲染",
    rank: 9
  },
  children: [
    {
      path: "/formCreate/lesson01",
      name: "lesson01",
      component: () => import("@/views/fc/lesson01.vue"),
      meta: {
        title: "01.简单入门",
        showParent: true
      }
    }
  ]
} satisfies RouteConfigsTable;
