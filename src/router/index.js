import axios from 'axios'
import {createRouter, createWebHistory} from 'vue-router'
import routes from '~pages'

// import ETL from '@/pages/ETL.vue'
// import Home from '@/pages/Home.vue'

// import PlanTask from '@/pages/PlanTask.vue'
// import SpMonitor from '@/pages/SpMonitor.vue'
// import TaskGroup from '@/pages/TaskGroup.vue'
// import Risk from '@/pages/Risk.vue'
// import Realtime from '@/pages/Realtime.vue'
// import SystemInfo from '@/pages/SystemInfo.vue'


// 主表配置

// import MbSp from '@/pages/maintable/MbSp.vue'
// import MbODS from '@/pages/maintable/MbODS.vue'
// // import MbDataService from '@/pages/maintable/MbDataService.vue'
// import MbParam from '@/pages/maintable/MbParam.vue'
// import MbDataSource from '@/pages/maintable/MbDataSource.vue'
// import MbDS from '@/pages/maintable/MbDS.vue'
// import PlanTask from '@/pages/maintable/PlanTask.vue'


// demo
// import Demo from '@/pages/Demo.vue'



// import 'mdb-vue-ui-kit/css/mdb.min.css';

// const routes = [
//     { path: '/', name: 'Home', title: "Home", icon: "fa-home", component: Home},
//     { path: '/etl', name: 'ETL', title: "采集监控", icon: "fa-dashboard", component: ETL},
//     { path: '/spmonitor', name: 'spmonitor', title: "SP监控", icon: "fa-desktop", component: SpMonitor},
//     { path: '/taskgroup', name: 'taskgroup', title: "任务组", icon: "fa-tasks", component: TaskGroup},
//     { path: '/risk', name: 'risk', title: "风险点", icon: "fa-warning", component: Risk},
//     { path: '/realtime', name: 'realtime', title: "实时监控", icon: "fa-tachometer", component: Realtime},
//     { path: '/systeminfo', name: 'systeminfo', title: "系统一览", icon: "fa-database",  component: SystemInfo},
//     { path: '/maintable', name: null, title: "主表配置", icon: "fa-cogs", component: null,
//         children: [        
//             { path: '/maintable/ods', name: 'mbods', title: "ODS 采集", icon: "fa-arrow-down", component: MbODS, meta: {
//                 breadcrumbs: [
//                     { title: "Home", href: "/"},
//                     {title: "主表配置", href: "/maintable"},
//                     {title: "ODS 采集", href: "/maintable/ods"},
//                 ]
//             }},
//             { path: '/maintable/sp', name: 'mbsp', title: "SP 计算", icon: "fa-exchange", component: MbSp, meta: {
//                 breadcrumbs: [
//                     { title: "Home", href: "/"},
//                     {title: "主表配置", href: "/maintable"},
//                     {title: "SP 计算", href: "/maintable/sp"},
//                 ]
            
//             }},
//             { path: '/maintable/dataservice', name: 'dataservice', title: "数据服务", icon: "fa-arrow-up", component: MbDS, meta: {
//                 breadcrumbs: [
//                     { title: "Home", href: "/"},
//                     {title: "主表配置", href: "/maintable"},
//                     {title: "数据服务", href: "/maintable/dataservice"},
//                 ]
            
//             }},
//             { path: '/maintable/plantask', name: 'plantask', title: "计划任务", icon: "fa-tasks",  component: PlanTask, meta: {
//                 breadcrumbs: [
//                     { title: "Home", href: "/"},
//                     {title: "主表配置", href: "/maintable"},
//                     {title: "计划任务", href: "/maintable/plantask"},
//                 ]
//             }},
//             { path: '/maintable/param', name: 'param', title:"参数管理", icon: "fa-th", component: MbParam, meta: {
//                 breadcrumbs: [
//                     { title: "Home", href: "/"},
//                     {title: "主表配置", href: "/maintable"},
//                     {title: "参数管理", href: "/maintable/param"},
//                 ]
            
//             }},
//             { path: '/maintable/datasource', name: 'datasource', title: "数据源管理", icon: "fa-database", component: MbDataSource, meta: {
//                 breadcrumbs: [
//                     { title: "Home", href: "/"},
//                     {title: "主表配置", href: "/maintable"},
//                     {title: "数据源管理", href: "/maintable/datasource"},
//                 ]
            
//             }},  
//             { path: '', name: 'mbapi', title: "接口管理", icon: "fa-feed", component: null},
//             { path: '', name: 'mbprocedure', title: "存储过程", icon: "fa-file-code", component: null},
//             { path: '', name: 'mblog', title: "Trino 执行日志", icon: "fa-file",  component: null},
//         ]
//     },
//     {path: '/demo', name: 'demo', title: "Demo", icon: "fa-file", component: Demo, meta: {
//         breadcrumbs: [
//             { title: "Home", href: "/"},
//             { title: "Demo", href: "/demo"},
//         ]
//     }},

// ]


axios.defaults.baseURL = 'http://localhost:5001'
axios.defaults.timeout = 5000

console.log(routes)
const router = createRouter( {
    history: createWebHistory(),
    routes,
});

export default router