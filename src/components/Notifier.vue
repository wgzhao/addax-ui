
<template>
  <v-alert
    v-if="notice.show"
    :type="alertType"
    :icon="notice.icon ? '' : undefined"
    border
    :title="notice.title || ''"
    :color="notice.color"
    prominent
    closable
    @click:close="hide"
    style="position: fixed; top: 80px; right: 24px; z-index: 9999; min-width: 280px; max-width: 400px;"
  >
    <!-- <template #prepend v-if="notice.icon">
      <v-icon class="me-2">{{ notice.icon }}</v-icon>
    </template>
    <span>{{ notice.text }}</span> -->
    {{ notice.text }}
  </v-alert>
</template>

<script setup lang="ts">
  import { useNotifier } from '@/stores/notifier'
  import { computed } from 'vue'
  const { notice, hide } = useNotifier()
  // 只允许 Vuetify 支持的类型
  const alertType = computed(() => {
    if (notice.value.color === 'success' || notice.value.color === 'error' || notice.value.color === 'warning' || notice.value.color === 'info') {
      return notice.value.color
    }
    return 'info'
  })
</script>
