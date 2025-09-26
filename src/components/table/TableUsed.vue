<template>
  <!-- 表使用场景 -->
  <!-- <v-dialog v-mode="dialog"> -->
  <v-data-table :items="used" :headers="headers" density="compact" />
  <!-- </v-dialog> -->
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { DataTableHeader } from "vuetify";
import tableService from "@/service/table-service";

const dialog = defineModel({ required: true, default: true });

const props = defineProps({ tid: String });

const headers: DataTableHeader[] = [
  { title: "场景类别", value: "kind" },
  { title: "名称", value: "used" }
];

const used = ref([]);

onMounted(() => {
  tableService.fetchTableUsed(props.tid.split("|")[0], props.tid.split("|")[1]).then(
    res => {
      used.value = res;
    }
  );
});
</script>
<style></style>
