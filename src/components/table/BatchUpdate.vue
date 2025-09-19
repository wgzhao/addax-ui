<template>
  <v-card flat>
    <v-card-title class="text-h6">
      批量修改 <span class="text-caption ms-2">(选中 {{ selectedCount }} 条记录)</span>
    </v-card-title>
    <v-divider></v-divider>

    <v-form fast-fail @submit.prevent="updateItem">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-select v-model="flag" :items="statusOptions" item-title="text" item-value="value" density="compact"
              label="状态" hint="选择要更新的状态值" persistent-hint></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="retryCnt" label="剩余运行次数" type="number" min="0" max="99" density="compact"
              hint="设置剩余可运行次数" persistent-hint></v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <v-card-actions class="justify-end">
        <v-btn type="reset" variant="outlined" class="me-2">取消</v-btn>
        <v-btn type="submit" color="primary" :disabled="!isValid" :loading="loading">
          应用修改
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { notify } from '@/stores/notifier';
import OdsService from "@/service/tableService";

const props = defineProps({
  tid: {
    type: Array,
    required: true,
  }
});

const flag = ref("N");
const retryCnt = ref(3);
const loading = ref(false);

const selectedCount = computed(() => {
  return props.tid ? props.tid.length : 0;
});

const isValid = computed(() => {
  return flag.value || (retryCnt.value !== null && retryCnt.value !== undefined);
});

const statusOptions = [
  { text: "请选择状态", value: "" },
  { text: "R_正在运行", value: "R" },
  { text: "Y_运行结束", value: "Y" },
  { text: "E_运行错误", value: "E" },
  { text: "W_等待", value: "W" },
  { text: "N_未运行", value: "N" },
  { text: "X_禁用", value: "X" }
];

const emit = defineEmits(["closeDialog", "update:batch"]);
function updateItem() {
  if (!isValid.value) return;

  loading.value = true;

  const payload = {
    tids: props.tid,
    flag: flag.value,
    retryCnt: retryCnt.value
  };
  loading.value = false;
  // Here you would call your actual update service
  OdsService.updateStatus(payload)
    .then(() => {
      console.log('Items updated successfully');
      notify('批量更新成功', 'success');
      emit('closeDialog');
      emit('update:batch', payload);
    })
    .catch((error) => {
      notify('批量更新失败: ' + error, 'error');
    });
}
</script>

<style>
.v-input .v-field {
  font-size: 0.9rem;
}
</style>
