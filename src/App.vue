<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import DefaultLayout from './layouts/DefaultLayout.vue';
import LoginLayout from './layouts/LoginLayout.vue';

const route = useRoute();
const layout = computed(() => {
  const layoutName = route.meta.layout || 'default'; // 默认使用 DefaultLayout
  return layoutName === 'default' ? DefaultLayout : LoginLayout;
});
</script>

<template>
  <component :is="layout">
    <router-view />
    <!-- 全局通知条 -->
    <Notifier />
  </component>
</template>

<style></style>

<script lang="ts">
import { defineComponent } from 'vue';
import { useNotifier } from './stores/notifier';

// 内联一个轻量通知组件，避免单独文件
const Notifier = defineComponent({
  name: 'Notifier',
  setup() {
    const { notice, hide } = useNotifier();
    return { notice, hide };
  },
  template: `
    <v-snackbar
      v-model="notice.show"
      :timeout="notice.timeout"
      :color="notice.color"
      location="bottom right"
      elevation="4"
    >
      <div class="d-flex align-center">
        <v-icon v-if="notice.icon" class="me-2">{{ notice.icon }}</v-icon>
        <span>{{ notice.text }}</span>
      </div>
      <template #actions>
        <v-btn variant="text" @click="hide">关闭</v-btn>
      </template>
    </v-snackbar>`
});

export default { components: { Notifier } };
</script>
