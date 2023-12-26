import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'

// import BootstrapVue from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import SmartTable from 'vuejs-smart-table'
// import 'datatables.net-vue3/dist/datatables.net-vue3.js'
// import './assets/js/sb-admin-2.min.js'
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";


import router from './router'

// import './plugins/table.js'

createApp(App)
    .use(router)
    .use(SmartTable)
    .mount('#app')
