<template>
  <!-- 表使用场景 -->
  <v-dialog v-mode="dialog">
    <v-data-table :items="used" :headers="headers" density="compact" />
  </v-dialog>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import OdsService from "@/service/maintable/odsService";

const dialog = defineModel({ required: true, default: true });

const props = defineProps(["d"]);

const headers = [
  { title: "场景类别", key: "kind" },
  { title: "名称", key: "used" }
];

const used = ref([]);

onMounted(() => {
  OdsService.fetchTableUsed(props.d.split("|")[0], props.d.split("|")[1]).then(
    res => {
      used.value = res;
    }
  );
});
</script>
<style></style>
