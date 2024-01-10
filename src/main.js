/**
 * main.js
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

// use vuetify
import 'vuetify/styles'
// // import 'vuetify/dist/vuetify.min.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import theme from '@/plugins/theme.js'

import { loadFonts } from '@/plugins/webfontloader.js'
import router from './router'

loadFonts()

const vuetify = createVuetify({
    components,
    directives,
    theme,
  })

createApp(App)
    .use(router)
    .use(vuetify)
    .mount('#app')
