import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Icon } from "@iconify/vue";
import "./assets/styles/base/reset.css";
const app = createApp(App);

app.use(router);
app.use(store);
app.component("IconiFy", Icon);
app.mount("#app");
