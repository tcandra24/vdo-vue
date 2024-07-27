import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./routes";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./style.css";

import Vue3Toastify from "vue3-toastify";

import App from "./App.vue";

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(Vue3Toastify, {
  autoClose: 2000,
});
app.mount("#app");
