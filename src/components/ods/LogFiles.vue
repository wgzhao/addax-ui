<template>
  <!-- 调度和命令日志 -->
  <v-list lines="one" density="compact">
    <v-list-subheader>调度/命令日志</v-list-subheader>
    <v-list-item v-for="(f, index) in props.d" :key="index">
      <v-list-item-title>
        <a href="#" :key="index" @click.prevent="getContent(f)">{{ f }}</a>
      </v-list-item-title>
      <v-dialog width="auto" v-model="dialog">
        <v-card :title="filename">
          <template v-slot:text>
            <pre>{{ fContent }}</pre>
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
    </v-list-item>
  </v-list>
</template>
<script setup lang="ts">
import { ref } from "vue";
import LogService from "@/service/maintable/logService";

const props = defineProps(["d"]);
const fContent = ref();
const filename = ref();
const dialog = ref(false);

const closeDialog = () => {
  dialog.value = false;
  fContent.value = null;
};

const getContent = (f: string) => {
  LogService.getContent(f).then((res: any) => {
    fContent.value = res.data;
    filename.value = f;
    dialog.value = true;
  });
};
</script>
<style></style>
