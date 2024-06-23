<template>
  <!-- 表使用场景 -->
  <v-data-table
      :items="d"
      density="compact"
  ></v-data-table>
</template>
<script setup lang="ts">
import {ref} from "vue";

defineProps(['d']);

const headers = ref([
  {title: "场景类别", key: "kind"},
  {title: "名称", key: "used"}
])

</script>
<style>

</style>