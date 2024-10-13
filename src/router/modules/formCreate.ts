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
    },
    {
      path: "/formCreate/lesson02",
      name: "lesson02",
      component: () => import("@/views/fc/lesson02.vue"),
      meta: {
        title: "02.组件渲染",
        showParent: true
      }
    },
    {
      path: "/formCreate/lesson03",
      name: "lesson03",
      component: () => import("@/views/fc/lesson03.vue"),
      meta: {
        title: "03.表单联动",
        showParent: true
      }
    },
    {
      path: "/formCreate/lesson04",
      name: "lesson04",
      component: () => import("@/views/fc/lesson04.vue"),
      meta: {
        title: "04.表单联动(续)",
        showParent: true
      }
    }
  ]
} satisfies RouteConfigsTable;
