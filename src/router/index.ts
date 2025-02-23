import { createRouter, createWebHistory } from "vue-router/auto";
import { routes } from "vue-router/auto-routes";
import { useAuthStore } from '@/stores/auth';

// 为特定路由添加 meta 信息
routes.forEach(route => {
  // 如果是登录页面，设置单独的布局
  if (route.path === '/login') {
    route.meta = { ...route.meta, layout: "login" };
  } else {
    // 其他页面使用默认布局
    route.meta = { ...route.meta, layout: "default" };
  }
});

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  // 如果没有 Token 且尝试访问非登录页面，则跳转到登录页
  if (!authStore.token && to.path !== '/login') {
    next('/login');
  } else {
    next();
  }
});

export default router;
