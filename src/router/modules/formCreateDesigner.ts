export default {
  path: "/designer",
  name: "Designer",
  meta: {
    icon: "tabler:edit",
    // showLink: false,
    title: "表单设计器",
    rank: 9
  },
  children: [
    {
      path: "/designer/render",
      name: "Render",
      component: () => import("@/views/fd/formCreate.vue"),
      meta: {
        title: "表单渲染",
        showParent: true,
        keepAlive: true
      }
    },
    {
      path: "/designer/lesson01",
      name: "Designer01",
      component: () => import("@/views/fd/lesson01.vue"),
      meta: {
        title: "01.简单入门",
        showParent: true,
        keepAlive: true
      }
    },
    {
      path: "/designer/lesson02",
      name: "Designer02",
      component: () => import("@/views/fd/lesson02.vue"),
      meta: {
        title: "02.组件拓展",
        showParent: true,
        keepAlive: true
      }
    }
  ]
} satisfies RouteConfigsTable;
