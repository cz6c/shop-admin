import { createApp } from "vue";
import App from "./App.vue";
import { setupStore } from "/@/store";
import router, { setupRouter } from "/@/router";
import { setupRouterGuard } from "/@/permission";
import { registerGlobComp } from "/@/components";
import { setupGlobDirectives } from "/@/directives";

// css
import "normalize.css";
import "/@/assets/style/global.scss";

// 注册svg
import "virtual:svg-icons-register";

const app = createApp(App);

// 配置store
setupStore(app);

// 配置路由
setupRouter(app);

// 配置路由守卫
setupRouterGuard(router);

// 注册全局组件
registerGlobComp(app);

// 注册全局指令
setupGlobDirectives(app);

app.mount("#app");
