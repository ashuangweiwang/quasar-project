const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"), //根路由对应调用该子路由的文件
    /*  children: [
      { path: "", component: () => import("pages/VtkRenderPage.vue") }, //该路由的默认路由
      { path: "Counter", component: () => import("pages/ComCounter.vue") },
      { path: "spliter", component: () => import("pages/SpliterPage.vue") },
    ], */
    children: [
      { path: "", component: () => import("pages/VtkRenderPage.vue") },
    ], //该路由的默认路由
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
