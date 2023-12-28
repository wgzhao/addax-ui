import axios from 'axios'
import {createRouter, createWebHistory} from 'vue-router'

import ETL from '../views/ETL.vue'
import Home from '../views/Home.vue'

// 主表配置

import ImpDB from '../views/ImpDB.vue'
import Dict from '../views/Dict.vue'
import ImpSp from '../views/ImpSp.vue'
import PlanTask from '../views/PlanTask.vue'
import SpMonitor from '../views/SpMonitor.vue'
import TaskGroup from '../views/TaskGroup.vue'
import Risk from '../views/Risk.vue'
import Realtime from '../views/Realtime.vue'
import SystemInfo from '../views/SystemInfo.vue'

// import 'mdb-vue-ui-kit/css/mdb.min.css';

axios.defaults.baseURL = 'http://188.175.3.34:5001'

const router = createRouter( {
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'Home', component: Home},
        { path: '/etl', name: 'ETL', component: ETL},
        { path: '/impdb', name: 'impdb', component: ImpDB},
        { path: '/dict', name: 'Dict', component: Dict},
        { path: '/impsp', name: 'impsp', component: ImpSp},
        { path: '/plantask', name: 'plantask', component: PlanTask},
        { path: '/spmonitor', name: 'spmonitor', component: SpMonitor},
        { path: '/taskgroup', name: 'taskgroup', component: TaskGroup},
        { path: '/risk', name: 'risk', component: Risk},
        { path: '/realtime', name: 'realtime', component: Realtime},
        { path: '/systeminfo', name: 'systeminfo', component: SystemInfo},
    ]
});

export default router