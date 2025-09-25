<template>
  <v-snackbar
    v-model="notice.show"
    :timeout="notice.timeout"
    :color="notice.color"
    location="top right"
    elevation="4"
    z-index="9999"
    style="margin-top: 80px"
    class="custom-snackbar"
  >
    <div class="d-flex align-center">
      <v-icon v-if="notice.icon" class="me-2">{{ notice.icon }}</v-icon>
      <span>{{ notice.text }}</span>
    </div>
    <template #actions>
      <v-btn variant="text" @click="hide">关闭</v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
  import { useNotifier } from '@/stores/notifier'

  const { notice, hide } = useNotifier()
</script>

<style scoped>
  /* 深色主题下的额外优化 */
  .v-theme--dark .custom-snackbar {
    /* 确保文字对比度 */
    color: rgba(255, 255, 255, 0.95) !important;
  }

  /* 浅色主题下的优化 */
  .v-theme--light .custom-snackbar {
    color: rgba(0, 0, 0, 0.87) !important;
  }

  /* 通用优化 */
  .custom-snackbar {
    backdrop-filter: blur(8px);
    border-radius: 8px !important;
  }

  .custom-snackbar .v-btn {
    opacity: 0.8;
  }

  .custom-snackbar .v-btn:hover {
    opacity: 1;
  }
</style>
