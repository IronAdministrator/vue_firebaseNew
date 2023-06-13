import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";

// const app = createApp(App);
//! changes to wait for firebase to autherize users
let app;

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App);
    app.use(router);
    app.mount("#app");
  }
});
