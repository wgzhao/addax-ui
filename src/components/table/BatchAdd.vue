<template>
  <!-- ODS 采集 - 批量新增表 -->
  <v-card title="ODS 采集 - 批量新增表">
    <v-card-text>
      <v-row>
        <v-col cols="4">
          <v-select :items="sourceSystemList" item-title="name" v-model="selectedSourceId" item-value="sysid"
            density="compact" return-object single-line>
            <template #prepend>
              <span class="me-2">选择采集源</span>
            </template>
          </v-select>
        </v-col>
        <v-col cols="4">
          <v-select :items="sourceDbs" :disabled="!selectedSourceId.url" v-model="selectedDb" density="compact"
            single-line>
            <template #prepend>
              <span class="me-2">选择库</span>
            </template>
            <template #append>
              <v-btn color="primary" @click="getTables" :loading="loadingTables" :disabled="!selectedDb">获取表</v-btn>
            </template>
          </v-select>
        </v-col>
        <v-spacer />
        <v-col cols="2">
          <v-btn color="primary" @click="saveItems" :loading="loadingSave" :disabled="selectedCnt === 0">保存</v-btn>
        </v-col>
      </v-row>

      <!-- Search field for tables - fixed width to prevent icon overlap -->
      <v-row v-if="tables.length > 0" class="mb-2">
        <v-col cols="4">
          <v-text-field v-model="search" label="搜索表" append-icon="mdi-magnify" single-line hide-details
            density="compact" clearable />
        </v-col>
        <v-col cols="4" class="d-flex align-center">
          <v-chip variant="text" color="primary" class="text-body-1">
            已选择 {{ selectedCnt }} 个表
          </v-chip>
        </v-col>
      </v-row>

      <!-- Tables container with fixed height to prevent layout jumps -->
      <div class="table-container">
        <!-- tables -->
        <v-data-table :items="tables" :headers="headers" :items-per-page="15" density="compact" show-select
          v-model="selectedTables" :search="search" item-value="souTablename" v-if="tables.length > 0" return-object />

        <v-alert v-else-if="loadingTables" type="info" variant="tonal" class="mt-4">
          正在加载表列表，请稍候...
        </v-alert>

        <v-alert v-else-if="tableLoadError" type="error" variant="tonal" class="mt-4">
          {{ tableLoadError }}
        </v-alert>

        <v-alert v-else type="info" variant="tonal" class="mt-4">
          请选择源系统和数据库，然后点击"获取表"按钮加载表列表
        </v-alert>
      </div>
    </v-card-text>
  </v-card>

  <!-- Success Message Dialog -->
  <v-dialog v-model="showSuccessDialog" max-width="500px" :retain-focus="false" persistent>
    <v-card>
      <v-card-title class="text-h5 bg-success text-white">
        操作成功
      </v-card-title>
      <v-card-text class="pt-4">
        {{ successMessage }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="handleSuccessConfirm">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { notify } from '@/stores/notifier';
import request from "@/utils/requests";

const props = defineProps({
  tid: {
    type: String,
    required: false,
  }
});

// Define emits for parent component communication
const emit = defineEmits(['closeDialog', 'refresh-data']);

const headers = ref([
  { title: "源系统", key: "souSysid" },
  { title: "源筛选", key: "souFilter" },
  { title: "源用户", key: "souOwner" },
  { title: "源表名", key: "souTablename" },
  { title: "目标表", key: "destTablename" }
]);

// Loading states
const loadingTables = ref(false);
const loadingSave = ref(false);
const tableLoadError = ref('');
const showSuccessDialog = ref(false);
const successMessage = ref('');
const search = ref(''); // 新增：搜索关键字
const selectedTables = ref<Table[]>([]); // 新增：已选择的表格

interface Table {
  souSysid: string;
  souFilter: string;
  souOwner: string;
  souTablename: string;
  destTablename: string;
  destPartKind: string;
  flag: string;
  paramSou: string;
  bupdate: string;
  bcreate: string;
  retryCnt: number;
  etlKind: string;
  bpreview: string;
  realtimeInterval: number;
  btdh: string;
  runtimeAdd: number;
}
// 选择的采集源ID
const selectedSourceId = ref({
  sysid: "",
  url: "",
  username: "",
  password: "",
  name: ""
});

const selectedDb = ref()

const tables = ref<Table[]>([]);

const defaultItem = ref<Table>({
  souSysid: "",
  souFilter: "1=1",
  souOwner: "",
  souTablename: "",
  destTablename: "",
  destPartKind: "D",
  flag: "W",
  paramSou: "C",
  bupdate: "Y",
  bcreate: "Y",
  retryCnt: 3,
  etlKind: "A",
  bpreview: "N",
  realtimeInterval: 0,
  btdh: "N",
  runtimeAdd: 0
});

const sourceSystemList = ref([]);

const sourceDbs = ref([]);

const selectedCnt = computed(() => selectedTables.value.length);

watch(selectedSourceId, (val) => {
  if (val.url) {
    getDbsBySourceId();
  }
});

const getDbsBySourceId = async () => {
  try {
    const res = await request.post(`/maintable/ods/dbSources`,
      {
        url: selectedSourceId.value.url,
        username: selectedSourceId.value.username,
        password: selectedSourceId.value.password
      }
    );
    sourceDbs.value = res.data;
  } catch (error) {
    console.error("获取数据库列表失败", error);
    sourceDbs.value = [];
  }
};

const fetchSourceData = () => {
  request.get("/maintable/ods/sourceSystem").then(res => {
    sourceSystemList.value = res.data;
  }).catch(error => {
    console.error("获取源系统列表失败", error);
  });
};

const saveItems = async () => {
  if (selectedCnt.value === 0) {
    notify('请选择至少一个表', 'warning');
    return;
  }

  loadingSave.value = true;

  // set destPardKind for each item and fix destTablename
  const itemsToSave = selectedTables.value.map(item => {
    const saveItem = { ...item };
    // set destTablename
    if (saveItem.destTablename == "") {
      saveItem.destTablename = saveItem.souTablename;
    }
    return saveItem;
  });

  try {
    // save data
    const response = await request.post("/maintable/ods/batchSave", itemsToSave, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    // Show success message
    successMessage.value = `成功添加 ${itemsToSave.length} 个表`;
    showSuccessDialog.value = true;

  } catch (error) {
    console.error('保存失败', error);
    notify('保存失败: ' + (error.response?.data || error.message || '未知错误'), 'error');
  } finally {
    loadingSave.value = false;
  }
};

const handleSuccessConfirm = () => {
  showSuccessDialog.value = false;
  emit('closeDialog');
  emit('refresh-data');
};

const getTables = async () => {
  if (!selectedSourceId.value.sysid || !selectedDb.value) {
    tableLoadError.value = '请选择源系统和数据库';
    return;
  }

  loadingTables.value = true;
  tableLoadError.value = '';

  try {
    // clear tables
    tables.value = [];

    const res = await request.post(`/maintable/ods/tables`,
      {
        sysId: selectedSourceId.value.sysid,
        url: selectedSourceId.value.url,
        username: selectedSourceId.value.username,
        password: selectedSourceId.value.password,
        db: selectedDb.value
      }
    );

    if (res.data && res.data.length > 0) {
      res.data.forEach(element => {
        // new defaultItem and populate it
        const newItem = { ...defaultItem.value };
        newItem.souSysid = selectedSourceId.value.sysid;
        newItem.souOwner = selectedDb.value;
        newItem.souTablename = element;
        newItem.destTablename = element;
        tables.value.push(newItem);
      });
      console.log(tables.value);
      // Show feedback
      tableLoadError.value = '';


    } else {
      tableLoadError.value = '未找到任何表';
    }
  } catch (error) {
    console.error("获取表失败", error);
    tableLoadError.value = '获取表失败: ' + (error.response?.data || error.message || "未知错误");
  } finally {
    loadingTables.value = false;
  }
};

onMounted(() => {
  fetchSourceData();
});
</script>
<style scoped>
.v-data-table {
  margin-top: 16px;
}

.table-container {
  min-height: 400px;
  position: relative;
}

/* Ensure dialog has stable positioning */
.v-dialog {
  position: fixed;
  z-index: 2000;
}
</style>