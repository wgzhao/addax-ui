import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
// import BootstrapVue from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import router from './router'

// import './plugins/table.js'

createApp(App)
    .use(router)
    .mount('#app')
