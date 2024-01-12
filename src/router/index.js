//router/index.ts

// Automatic routes for `./src/pages/*.vue`

import axios from 'axios'
import {createRouter, createWebHistory} from 'vue-router/auto'

const routes = [
    { path: '/', name: 'index', title: "Home", icon: "fa-home" },
    { path: '/etl-monitor', name: 'etl-monitor', title: "采集监控", icon: "fa-dashboard"},
    { path: '/sp-monitor', name: 'sp-monitor', title: "SP监控", icon: "fa-desktop"},
    { path: '/task-group', name: 'task-group', title: "任务组", icon: "fa-tasks"},
    { path: '/risk', name: 'risk', title: "风险点", icon: "fa-warning"},
    { path: '/realtime', name: 'realtime', title: "实时监控", icon: "fa-tachometer"},
    { path: '/system-info', name: 'systeminfo', title: "系统一览", icon: "fa-database"},
    { path: '/maintable', name: null, title: "主表配置", icon: "fa-cogs",
        children: [        
            { path: '/maintable/ods', name: 'mbods', title: "ODS 采集", icon: "fa-arrow-down", meta: {
                breadcrumbs: [
                    { title: "Home", href: "/"},
                    {title: "主表配置", href: "/maintable"},
                    {title: "ODS 采集", href: "/maintable/ods"},
                ]
            }},
            { path: '/maintable/sp', name: 'mbsp', title: "SP 计算", icon: "fa-exchange", meta: {
                breadcrumbs: [
                    { title: "Home", href: "/"},
                    {title: "主表配置", href: "/maintable"},
                    {title: "SP 计算", href: "/maintable/sp"},
                ]
            
            }},
            { path: '/maintable/dataservice', name: 'dataservice', title: "数据服务", icon: "fa-arrow-up", meta: {
                breadcrumbs: [
                    { title: "Home", href: "/"},
                    {title: "主表配置", href: "/maintable"},
                    {title: "数据服务", href: "/maintable/dataservice"},
                ]
            
            }},
            { path: '/maintable/plantask', name: 'plantask', title: "计划任务", icon: "fa-tasks", meta: {
                breadcrumbs: [
                    { title: "Home", href: "/"},
                    {title: "主表配置", href: "/maintable"},
                    {title: "计划任务", href: "/maintable/plantask"},
                ]
            }},
            { path: '/maintable/param', name: 'param', title:"参数管理", icon: "fa-th", meta: {
                breadcrumbs: [
                    { title: "Home", href: "/"},
                    {title: "主表配置", href: "/maintable"},
                    {title: "参数管理", href: "/maintable/param"},
                ]
            
            }},
            { path: '/maintable/datasource', name: 'datasource', title: "数据源管理", icon: "fa-database", meta: {
                breadcrumbs: [
                    { title: "Home", href: "/"},
                    {title: "主表配置", href: "/maintable"},
                    {title: "数据源管理", href: "/maintable/datasource"},
                ]
            
            }},  
            { path: '', name: 'mbapi', title: "接口管理", icon: "fa-feed"},
            { path: '', name: 'mbprocedure', title: "存储过程", icon: "fa-file-code"},
            { path: '', name: 'mblog', title: "Trino 执行日志", icon: "fa-file"},
        ]
    },
    {path: '/demo', name: 'demo', title: "Demo", icon: "fa-file", meta: {
        breadcrumbs: [
            { title: "Home", href: "/"},
            { title: "Demo", href: "/demo"},
        ]
    }},

]


axios.defaults.baseURL = 'http://localhost:5001'
axios.defaults.timeout = 1000

const router = createRouter( {
    history: createWebHistory(process.env.BASE_URL),
});

export default router