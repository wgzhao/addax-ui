import axios from 'axios'
import {createRouter, createWebHistory} from 'vue-router'

import ETL from '@/views/ETL.vue'
import Home from '@/views/Home.vue'

// import PlanTask from '@/views/PlanTask.vue'
import SpMonitor from '@/views/SpMonitor.vue'
import TaskGroup from '@/views/TaskGroup.vue'
import Risk from '@/views/Risk.vue'
import Realtime from '@/views/Realtime.vue'
import SystemInfo from '@/views/SystemInfo.vue'


// 主表配置

import MbSp from '@/views/maintable/MbSp.vue'
import MbODS from '@/views/maintable/MbODS.vue'
// import MbDataService from '@/views/maintable/MbDataService.vue'
import MbParam from '@/views/maintable/MbParam.vue'
import MbDataSource from '@/views/maintable/MbDataSource.vue'
import MbDS from '@/views/maintable/MbDS.vue'
import PlanTask from '@/views/maintable/PlanTask.vue'


// demo
import Demo from '@/views/Demo.vue'



// import 'mdb-vue-ui-kit/css/mdb.min.css';

const routes = [
    { path: '/', name: 'Home', title: "Home", icon: "fa-home", component: Home},
    { path: '/etl', name: 'ETL', title: "采集监控", icon: "fa-dashboard", component: ETL},
    { path: '/spmonitor', name: 'spmonitor', title: "SP监控", icon: "fa-desktop", component: SpMonitor},
    { path: '/taskgroup', name: 'taskgroup', title: "任务组", icon: "fa-tasks", component: TaskGroup},
    { path: '/risk', name: 'risk', title: "风险点", icon: "fa-warning", component: Risk},
    { path: '/realtime', name: 'realtime', title: "实时监控", icon: "fa-tachometer", component: Realtime},
    { path: '/systeminfo', name: 'systeminfo', title: "系统一览", icon: "fa-database",  component: SystemInfo},
    { path: '/maintable', name: null, title: "主表配置", icon: "fa-cogs", component: null,
        children: [        
            { path: '/maintable/ods', name: 'mbods', title: "ODS 采集", icon: "fa-arrow-down", component: MbODS},
            { path: '/maintable/sp', name: 'mbsp', title: "SP 计算", icon: "fa-exchange", component: MbSp},
            { path: '/maintable/dataservice', name: 'dataservice', title: "数据服务", icon: "fa-arrow-up", component: MbDS},
            { path: '/maintable/plantask', name: 'plantask', title: "计划任务", icon: "fa-tasks",  component: PlanTask},
            { path: '/maintable/param', name: 'param', title:"参数管理", icon: "fa-th", component: MbParam},
            { path: '/maintable/datasource', name: 'datasource', title: "数据源管理", icon: "fa-database", component: MbDataSource},    
            { path: '', name: 'mbapi', title: "接口管理", icon: "fa-feed", component: null},
            { path: '', name: 'mbprocedure', title: "存储过程", icon: "fa-file-code", component: null},
            { path: '', name: 'mblog', title: "Trino 执行日志", icon: "fa-file",  component: null},
        ]
    },
    {path: '/demo', name: 'demo', title: "Demo", icon: "fa-file", component: Demo},

]


axios.defaults.baseURL = 'http://localhost:5001'
axios.defaults.timeout = 5000

const router = createRouter( {
    history: createWebHistory(),
    routes,
});

export default router