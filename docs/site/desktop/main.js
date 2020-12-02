import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";
import routes from "../router";
import { isMobile, importAll } from "../utils";

if (isMobile) {
  location.replace("mobile.html" + location.hash);
}

Vue.use(VueRouter);

const docs = {};
const docsFromMarkdown = require.context("../../markdown", false, /\.md$/);
const docsFromPackages = require.context("../../../src", true, /README.md/);

importAll(docs, docsFromMarkdown);
importAll(docs, docsFromPackages);

const router = new VueRouter({
  mode: "hash",
  routes: routes({ componentMap: docs }),
  scrollBehavior(to) {
    if (to.hash) {
      return { selector: to.hash };
    }

    return { x: 0, y: 0 };
  }
});

router.afterEach(() => {
  Vue.nextTick(() => window.syncPath());
});

window.vueRouter = router;

if (process.env.NODE_ENV !== "production") {
  Vue.config.productionTip = false;
}

new Vue({
  el: "#app",
  mounted() {
    if (this.$route.hash) {
      // wait page init
      setTimeout(() => {
        const el = document.querySelector(this.$route.hash);
        if (el) {
          el.scrollIntoView({
            behavior: "smooth"
          });
        }
      }, 1000);
    }
  },
  render: h => h(App),
  router
});
