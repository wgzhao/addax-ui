<template>
  <!-- 表使用场景 -->
  <v-dialog v-mode="dialog">
    <v-data-table :items="d" density="compact" />
  </v-dialog>
</template>
<script setup lang="ts">
import { ref } from "vue";
const dialog = defineModel({ required: true, default: true });
defineProps(["d"]);

const headers = ref([
  { title: "场景类别", key: "kind" },
  { title: "名称", key: "used" }
]);
</script>
<style></style>
