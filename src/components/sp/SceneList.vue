<template>
  <v-card>
    <v-card-text>
      <v-data-table-virtual :items="data" :headers="headers" height="300">
      </v-data-table-virtual>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { spService } from "@/service/spService";
const props = defineProps(["spId"]);
const headers = ref([
  { title: "场景类别", value: "kindName", align: "center" },
  { title: "名称", value: "used", align: "center" }
]);
const data = ref();

const fetchData = () => {
  spService.fetchSpSceneList(props.spId).then(res => (data.value = res.data));
};
onMounted(() => {
  fetchData();
});
</script>
