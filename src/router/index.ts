import { createRouter, createWebHistory } from "vue-router/auto";
import { routes } from "vue-router/auto-routes";
import { useAuthStore } from '@/stores/auth';

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
