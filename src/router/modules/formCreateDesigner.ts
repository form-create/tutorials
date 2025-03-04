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
        title: "02.自定义组件",
        showParent: true,
        keepAlive: true
      }
    },
    {
      path: "/designer/lesson03",
      name: "Designer03",
      component: () => import("@/views/fd/lesson03.vue"),
      meta: {
        title: "03.拓展右侧配置项",
        showParent: true,
        keepAlive: true
      }
    },
    {
      path: "/designer/lesson04",
      name: "Designer04",
      component: () => import("@/views/fd/lesson04.vue"),
      meta: {
        title: "04.配置功能模块",
        showParent: true,
        keepAlive: true
      }
    },
    {
      path: "/designer/lesson05",
      name: "Designer05",
      component: () => import("@/views/fd/lesson05.vue"),
      meta: {
        title: "05.获取数据",
        showParent: true,
        keepAlive: true
      }
    },
    {
      path: "/designer/lesson06",
      name: "Designer06",
      component: () => import("@/views/fd/lesson06.vue"),
      meta: {
        title: "06.事件与方法",
        showParent: true,
        keepAlive: true
      }
    }
  ]
} satisfies RouteConfigsTable;
