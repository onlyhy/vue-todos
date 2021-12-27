import { createApp } from "vue";
import App from "./App.vue";
import router from './router';
// 全局注册vant组件
import { vantPlugin } from "./plugins/vant";
createApp(App).use(router).use(vantPlugin).mount("#app");
