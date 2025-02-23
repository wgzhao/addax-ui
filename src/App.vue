<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import DefaultLayout from './layouts/DefaultLayout.vue';
import LoginLayout from './layouts/LoginLayout.vue';

const route = useRoute();
const layout = computed(() => {
  const layoutName = route.meta.layout || 'default'; // 默认使用 DefaultLayout
  return layoutName === 'default' ?  DefaultLayout: LoginLayout;
});
</script>

<template>
  <component :is="layout">
   <router-view />
  </component>
</template>

<style>
</style>
