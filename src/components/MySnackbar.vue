<template>
    <v-snackbar
      v-model="visible"
      :timeout="timeout"
      color="error"
      multi-line
    >
      {{ message }}
    </v-snackbar>
  </template>
<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
    name: "GlobalSnackbar",
});

const visible = ref(false); // 是否展示消息
const message = ref(''); // 消息内容
const timeout = ref(3000); // 显示时长
    
const showMessage = (message, timeoutMs: number = 3000) => {
      message.value = message; // 设置消息内容
      timeout.value = timeoutMs; // 设置显示时长
      visible.value = true; // 展示消息
    }
</script>