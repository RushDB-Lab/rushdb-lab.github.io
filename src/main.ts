import { createApp } from "vue";
import App from "./App.vue";
import "./styles/site.css";
import { i18n } from "./i18n";

createApp(App).use(i18n).mount("#app");
