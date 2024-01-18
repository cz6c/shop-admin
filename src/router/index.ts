import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import type { App } from "vue";
import type { AppRouteRecordRaw } from "/@/router/type";

export const Layout = () => import("/@/layout/index.vue");
export const IFrame = () => import("/@/views/iframe/index.vue");

export enum RouterEnum {
  // login path
  BASE_LOGIN_PATH = "/login",
  // basic home path
  BASE_HOME_PATH = "/dashboard",
  // redirect name
  REDIRECT_NAME = "Redirect",
}

// 公共菜单
const routesList: AppRouteRecordRaw[] = [
  // 根路由
  {
    path: "/",
    name: "Root",
    redirect: RouterEnum.BASE_HOME_PATH,
    meta: {
      title: "root",
    },
  },
  // 登录路由
  {
    path: "/login",
    name: "Login",
    component: () => import("/@/views/public/login.vue"),
    meta: {
      title: "login",
    },
  },
];

// Layout  404
export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: "/:pathMatch(.*)*",
  name: "PAGE_NOT_FOUND_NAME",
  component: () => import("/@/views/public/404.vue"),
  meta: {
    title: "",
    hideBreadcrumb: true,
    hideMenu: true,
    hideTag: true,
  },
};
// Layout redirect
export const REDIRECT_ROUTE: AppRouteRecordRaw = {
  path: "/redirect",
  component: Layout,
  name: "RouterEnum.REDIRECT_NAME",
  meta: {
    title: "",
    hideBreadcrumb: true,
    hideMenu: true,
    hideTag: true,
  },
  children: [
    {
      path: "/redirect/:path(.*)/:_redirect_type(.*)/:_origin_params(.*)?",
      name: RouterEnum.REDIRECT_NAME,
      component: () => import("/@/views/public/auth-redirect.vue"),
      meta: {
        title: "",
        hideBreadcrumb: true,
        hideMenu: true,
        hideTag: true,
      },
    },
  ],
};

const routes = [...routesList, PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE] as RouteRecordRaw[];

// app router
const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ left: 0, right: 0 }),
  routes,
});

// 白名单应该包含基本静态路由
const WHITE_NAME_LIST: string[] = [];
const getRouteNames = (array: any[]) =>
  array.forEach(item => {
    WHITE_NAME_LIST.push(item.name);
    getRouteNames(item.children || []);
  });
getRouteNames(routes);

/**
 * @description: 重置路由
 */
export function resetRouter() {
  router.getRoutes().forEach(route => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export default router;

// 配置路由器
export function setupRouter(app: App<Element>) {
  app.use(router);
}
