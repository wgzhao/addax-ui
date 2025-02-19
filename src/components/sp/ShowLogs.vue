<template>
  <!-- 调度和命令日志 -->
  <v-card>
    <v-card-title>
      <span class="text-h5">调度/命令日志</span>
    </v-card-title>
    <v-card-text>
      <ul>
        <template v-for="(f, index) in logs">
          <li>
            <a href="#" :key="index" @click="getLog(f)">{{ f }}</a>
          </li>
        </template>
      </ul>
      <v-spacer></v-spacer>
      <!-- file content-->
      <div v-if="fContent">
        <h6>{{ filename }}</h6>
        <pre>{{ fContent }}</pre>
      </div>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import LogService from "@/service/maintable/logService";

const props = defineProps(["spId"]);
const fContent = ref();
const filename = ref();
const logs = ref([]);

const fetchLogs = () => {
  LogService.getLogFiles(props.spId).then(res => {
    logs.value = res;
    return res;
  });
};
const getLog = (f: string) => {
  LogService.getContent(f).then(res => {
    fContent.value = res;
    filename.value = f;
  });
};
onMounted(() => {
  fetchLogs();
});
</script>
<style></style>
