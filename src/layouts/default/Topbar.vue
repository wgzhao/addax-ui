<template>
  <v-app-bar class="bg-primary">
    <template v-slot:default>
      <v-app-bar-title>统一采集管理系统</v-app-bar-title>
      <template v-for="item in urls">
        <v-menu v-if="item.children">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" flat> {{ item.title }}</v-btn>
          </template>
          <v-list density="compact" v-for="(child, index) in item.children">
            <v-list-item :key="index" :to="{ path: child.path }">
              {{ child.title }}
            </v-list-item>
          </v-list>
        </v-menu>
        <div v-else>
          <v-btn flat :to="{ path: item.path }">
            {{ item.title }}
          </v-btn>
        </div>
      </template>
    </template>
  </v-app-bar>
  <!-- End of Topbar -->
</template>
<script setup lang="ts">
import { ref } from "vue";
// import {useTheme} from "vuetify";

// const {global} = useTheme();

const urls = ref([
  {
    path: "/",
    name: "Home",
    title: "Home"
  },
  {
    path: "/etl-monitor",
    name: "ETL",
    title: "采集监控"
  },
  {
    path: "/sp-monitor",
    title: "SP监控",
    icon: "fa-desktop"
  },
  {
    path: "/task-group",
    title: "任务组"
  },
  {
    path: "/risk-monitor",
    title: "风险点检测"
  },
  {
    path: "/realtime",
    title: "实时监控"
  },
  {
    path: "/closed-check",
    title: "盘后检查"
  },
  {
    path: "/system-info",
    title: "系统一览"
  },
  {
    path: "/maintable",
    title: "主表配置",
    children: [
      {
        path: "/maintable/ods-etl",
        title: "ODS 采集"
      },
      {
        path: "/maintable/sp",
        title: "SP 计算"
      },
      {
        path: "/maintable/data-service",
        title: "数据服务"
      },
      {
        path: "/maintable/plan-task",
        title: "计划任务"
      },
      {
        path: "/maintable/params",
        title: "参数管理"
      },
      {
        path: "/maintable/data-sources",
        title: "数据源管理"
      }
    ]
  },
  {
    path: "/demo",
    title: "Demo"
  }
]);
</script>
