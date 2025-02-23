<template>
  <v-app-bar app color="primary" dark>
    <template v-slot:default>
      <v-app-bar-title>统一采集管理系统</v-app-bar-title>
      <template v-for="item in urls">
        <v-menu v-if="item.children">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" flat > {{ item.title }}</v-btn>
          </template>
          <v-list density="compact" nav v-for="(child, index) in item.children">
            <v-list-item :key="index" :to="{ path: child.path }" class="py-1" style="min-height: 20px;">
              <v-list-item-title>{{ child.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <div v-else>
          <v-btn flat :to="{ path: item.path }">
            {{ item.title }}
          </v-btn>
        </div>
      </template>
      <v-btn v-if="username" >{{ username }}</v-btn>
        <v-btn v-if="!username" :to="{path: '/login'}">
              Login
        </v-btn>
           <!-- 深色/浅色模式切换按钮 -->
          <v-btn
        icon
        @click="toggleTheme"
        :title="isDarkTheme? '切换为浅色模式' : '切换为深色模式'"
      >
        <v-icon>
          mdi-theme-light-dark
        </v-icon>
      </v-btn>
    </template>
  </v-app-bar>
  <!-- End of Topbar -->
</template>
<script setup lang="ts">
import { ref,computed,watch } from "vue";
import { useAuthStore } from '@/stores/auth';
import {useTheme} from "vuetify";

// const {global} = useTheme();

const authStore = useAuthStore();
    // 计算属性绑定用户名
const username = computed(() => authStore.username);

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

const theme = useTheme();
const isDarkTheme = computed(() => theme.global.name.value === "dark");

// 切换主题函数
const toggleTheme = () => {
  theme.global.name.value = isDarkTheme.value ? "light" : "dark";
  console.log("当前主题切换为：", theme.global.name.value);
};

// 如果需要记住用户选择（localStorage，可选）
watch(isDarkTheme, (newValue) => {
  localStorage.setItem("theme", newValue ? "dark" : "light");
});

// 在页面加载时初始化主题（从 localStorage 获取用户的选择）
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  theme.global.name.value = savedTheme;
}
</script>
