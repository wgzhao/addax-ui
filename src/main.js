import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'

// import BootstrapVue from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// use vuetify
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
