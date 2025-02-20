<template>
  <!-- 调度和命令日志 -->
  <!-- <dialog-comp v-mode="dialog" title="调度/命令日志"> -->
    <v-list lines="one" density="compact">
      <v-list-item v-for="(f, index) in logList" :key="index">
        <v-list-item-title>
          <a
            href="#"
            class="text-sm leading-3 text-decoration-none"
            :key="index"
            @click.prevent="getContent(f)"
            >{{ f }}</a
          >
        </v-list-item-title>
      </v-list-item>
    </v-list>
  <!-- </dialog-comp> -->

  <!-- log content dialog -->
  <v-dialog class="overflow-visible" v-model="fDialog">
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
import { ref, onMounted } from "vue";
// import DialogComp from "./DialogComp.vue";
import LogService from "@/service/maintable/logService";

// const dialog = defineModel({ required: true, default: true });
const props = defineProps({ tid: String });

const fContent = ref();
const filename = ref();
const fDialog = ref(false);

const closeDialog = () => {
  fDialog.value = false;
  fContent.value = null;
};

const logList = ref([]);

const getContent = (f: string) => {
  LogService.getContent(f).then((res: any) => {
    fContent.value = res;
    filename.value = f;
    fDialog.value = true;
  });
};

onMounted(() => {
  console.log("command log===>", props.tid);
  LogService.getLogFiles(props.tid).then(res => {
    logList.value = res;
  });
});
</script>
<style></style>
