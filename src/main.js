/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'


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
import "bootstrap/dist/css/bootstrap.min.css"

// or, specify which plugins you need:
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// use vuetify
import 'vuetify/styles'
// import 'vuetify/dist/vuetify.min.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


import router from './router'

const vuetify = createVuetify({
    components,
    directives,
  })
  // import './plugins/table.js'

createApp(App)
    .use(router)
    .use(vuetify)
    .mount('#app')
