/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from "./vuetify";
import router from "@/router";

// Types
import type { App } from "vue";

//highlight
import HljsVuePlugin from "@highlightjs/vue-plugin";
import "highlight.js/styles/github-dark.css";
import "highlight.js/lib/common";

export function registerPlugins(app: App) {
  app.use(vuetify).use(router).use(HljsVuePlugin);
}
