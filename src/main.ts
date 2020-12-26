import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import restaurantStore from "./store/restaurant";

createApp(App).use(restaurantStore).mount("#app");
