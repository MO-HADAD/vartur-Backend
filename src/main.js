import { createApp } from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import router from "./router";
import VueRouter from "vue-router";

const app = createApp(App);
app.use(VueRouter);
app.use(router);
app.use(Antd).mount("#app");
