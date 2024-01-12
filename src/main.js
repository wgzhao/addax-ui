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


// use vuetify
// import '@/styles/vuetify/index.scss'
import 'vuetify/styles'
// // import 'vuetify/dist/vuetify.min.css'
// import '@fortawesome/fontawesome-free/css/all.min.css'
// import '@fortawesome/fontawesome-free/js/all.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

// import router from './router'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')

// createApp(App)
//     .use(router)
//     .use(vuetify)
//     .mount('#app')
