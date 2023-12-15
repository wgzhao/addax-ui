import axios from 'axios'
import {createRouter, createWebHistory} from 'vue-router'

import ETL from '../views/ETL.vue'
import Home from '../views/Home.vue'

// 主表配置

import ImpDB from '../views/ImpDB.vue'

axios.defaults.baseURL = 'http://188.175.3.34:5001'

const router = createRouter( {
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'Home', component: Home},
        { path: '/etl', name: 'ETL', component: ETL},
        { path: '/impdb', name: 'impdb', component: ImpDB}
    ]
});

export default router