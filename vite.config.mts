// Plugins
import Components from "unplugin-vue-components/vite";
import Vue from "@vitejs/plugin-vue";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
// import ViteFonts from 'unplugin-fonts/vite'
import Layouts from "vite-plugin-vue-layouts";
import VueRouter from "unplugin-vue-router/vite";
import { loadEnv } from "vite";

// Utilities
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    return {
        plugins: [
            VueRouter({
                routesFolder: [
                    {
                        src: "src/views",
                        path: "",
                    },
                ],
            }),
            Layouts(),
            Vue({
                template: { transformAssetUrls },
            }),
            // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
            Vuetify({
                autoImport: true,
                styles: {
                    configFile: "src/styles/settings.scss",
                },
            }),
            Components(),
        ],
        define: { "process.env": {} },
        resolve: {
            alias: {
                "@": fileURLToPath(new URL("./src", import.meta.url)),
            },
            extensions: [
                ".js",
                ".json",
                ".jsx",
                ".mjs",
                ".ts",
                ".tsx",
                ".vue",
                ".json",
            ],
        },
        server: {
            host: "0.0.0.0",
            port: 3030,
            proxy: {
                [env.VITE_API_BASE_URL]: {
                    target: env.VITE_API_HOST,
                    changeOrigin: false,
                },
            },
        },
    };
});
