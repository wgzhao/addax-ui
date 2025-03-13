<template>
  <!-- 调度和命令日志 -->
  <!-- <dialog-comp v-mode="dialog" title="调度/命令日志"> -->
  <v-list lines="one" density="compact">
    <v-list-item v-for="(f, index) in logList" :key="index">
      <v-list-item-title>
        <a href="#" class="text-sm leading-3 text-decoration-none" :key="index" @click.prevent="getContent(f)">{{ f
          }}</a>
      </v-list-item-title>
    </v-list-item>
  </v-list>
  <!-- </dialog-comp> -->

  <!-- log content dialog -->
  <v-dialog v-model="fDialog" max-width="1920px" scrollable>
    <v-card>
      <template v-slot:title>
        <v-row align="center" class="px-4">
          <v-col>{{ filename }}</v-col>
          <v-col cols="auto">
            <v-btn class="ms-2" color="primary" variant="text" @click="closeDialog">Close</v-btn>
          </v-col>
        </v-row>
      </template>

      <v-divider />

      <v-card-text class="pa-0">
        <v-virtual-scroll :items="[fContent]" height="70vh" item-height="24">
          <template v-slot:default="{ item }">
            <pre class="font-monospace text-body-1 pa-4">{{ item }}</pre>
          </template>
        </v-virtual-scroll>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
// import DialogComp from "./DialogComp.vue";
import LogService from "@/service/maintable/logService";

// const dialog = defineModel({ required: true, default: true });
const props = defineProps({ tid: String });

const fContent = ref();
const snackbar = ref(false);
const copyContent = () => {
  navigator.clipboard.writeText(fContent.value);
  snackbar.value = true;
};
const filename = ref();
const fDialog = ref(false);

const closeDialog = () => {
  fDialog.value = false;
  fContent.value = null;
};

const logList = ref([]);

const emit = defineEmits(["closeDialog"]);

const getContent = (f: string) => {
  LogService.getContent(f).then((res: any) => {
    fContent.value = res.data;
    filename.value = f;
    fDialog.value = true;
  });
};

onMounted(() => {
  const [tableName, spName] = props.tid.split("|");
  LogService.getLogFiles(tableName, spName).then(res => {
    logList.value = res.data;
  });
});
</script>
<style scoped>
.v-virtual-scroll {
  background: rgb(var(--v-theme-background));
}

pre {
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.5;
}
</style>
