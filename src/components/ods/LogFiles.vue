<template>
  <!-- 调度和命令日志 -->
  <v-dialog v-model="dialog">
    <v-list lines="one" density="compact">
      <v-list-subheader>调度/命令日志</v-list-subheader>
      <v-list-item v-for="(f, index) in props.d" :key="index">
        <v-list-item-title>
          <a href="#"  class="text-sm" :key="index" @click.prevent="getContent(f)">{{ f }}</a>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-dialog>

  <!-- log content dialog -->
  <v-dialog  class="overflow-visible" v-model="fDialog">
    <v-card :title="filename">
      <template v-slot:text>
        <pre class="text-break">{{ fContent }}</pre>
      </template>
      <template v-slot:actions>
        <v-btn
          class="ms-auto bg-primary"
          text="Close"
          @click="closeDialog"
        ></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { ref } from "vue";

const dialog = defineModel({ required: true, default: true });

import LogService from "@/service/maintable/logService";

const props = defineProps(["d"]);
const fContent = ref();
const filename = ref();
const fDialog = ref(false);

const closeDialog = () => {
  fDialog.value = false;
  fContent.value = null;
};

const getContent = (f: string) => {
  LogService.getContent(f).then((res: any) => {
    fContent.value = res.data;
    filename.value = f;
    fDialog.value = true;
  });
};
</script>
<style></style>
