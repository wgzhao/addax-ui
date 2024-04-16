/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins


// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// import './styles/settings.scss'

// import './styles/settings.css'

// load .env file
// import 'dotenv/config'

// Import all of Bootstrap's JS
// import * as bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

// or, specify which plugins you need:
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


// // import 'vuetify/dist/vuetify.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@fortawesome/fontawesome-free/js/all.min.js'

import vuetify from '@/plugins/vuetify.js'

import { loadFonts } from '@/plugins/webfontloader.js'

import router from './router'

import { createPinia } from 'pinia'

loadFonts()

const pinia = createPinia()

createApp(App)
    .use(router)
    .use(vuetify)
    .use(pinia)
    .mount('#app')
