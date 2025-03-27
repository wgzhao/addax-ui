<template>
  <!-- ODS 采集 - 批量新增表 -->
  <v-card title="ODS 采集 - 批量新增表" :style="{ width: '80vw', height: 'auto' }">
    <v-card-text>
      <v-row>
        <v-col cols="4">
          <v-select :items="sourceSystemList" item-title="NAME" v-model="selectedSourceId" item-value="SYSID"
            density="compact" return-object single-line>
            <template #prepend>
              <span class="me-2">选择采集源</span>
            </template>
          </v-select>
        </v-col>
        <v-col cols="4">
          <v-select :items="sourceDbs" :disabled="!selectedSourceId.URL" v-model="selectedDb" density="compact"
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
          <v-btn color="primary" @click="saveItems" :loading="loadingSave" :disabled="tables.length === 0">保存</v-btn>
        </v-col>
      </v-row>

      <!-- tables -->
      <v-data-table :items="tables" :headers="headers" :items-per-page="15" density="compact" v-if="tables.length > 0">
        <template v-slot:[`item.action`]="{ item, index }">
          <v-btn color="error" class="btn btn-xs btn-danger" @click="deleteItem(index)">删除</v-btn>
        </template>
      </v-data-table>

      <v-alert v-else-if="loadingTables" type="info" variant="tonal" class="mt-4">
        正在加载表列表，请稍候...
      </v-alert>

      <v-alert v-else-if="tableLoadError" type="error" variant="tonal" class="mt-4">
        {{ tableLoadError }}
      </v-alert>

      <v-alert v-else type="info" variant="tonal" class="mt-4">
        请选择源系统和数据库，然后点击"获取表"按钮加载表列表
      </v-alert>
    </v-card-text>
  </v-card>

  <!-- Success Message Dialog -->
  <v-dialog v-model="showSuccessDialog" max-width="500px">
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
  { title: "目标表", key: "destTablename" },
  { title: "Action", value: "action" }
]);

// Loading states
const loadingTables = ref(false);
const loadingSave = ref(false);
const tableLoadError = ref('');
const showSuccessDialog = ref(false);
const successMessage = ref('');

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
  SYSID: "",
  URL: "",
  USERNAME: "",
  PASSWORD: "",
  NAME: ""
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

watch(selectedSourceId, (val) => {
  if (val.URL) {
    getDbsBySourceId();
  }
});

const getDbsBySourceId = async () => {
  try {
    const res = await request.post(`/maintable/ods/dbSources`,
      {
        url: selectedSourceId.value.URL,
        username: selectedSourceId.value.USERNAME,
        password: selectedSourceId.value.PASSWORD
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

const deleteItem = (index: number) => {
  if (tables.value.length > 1) {
    // only more than one item
    tables.value.splice(index, 1);
  }
};

const saveItems = async () => {
  if (tables.value.length === 0) return;

  loadingSave.value = true;

  // set destPardKind for each item and fix destTablename
  tables.value.forEach(item => {
    // set destTablename
    if (item.destTablename == "") {
      item.destTablename = item.souTablename.toUpperCase();
    }
  });

  try {
    // save data
    const response = await request.post("/maintable/ods/batchSave", tables.value, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    // Show success message
    successMessage.value = `成功添加 ${tables.value.length} 个表`;
    showSuccessDialog.value = true;

  } catch (error) {
    console.error("保存失败", error);
    alert("保存失败: " + (error.response?.data || error.message || "未知错误"));
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
  if (!selectedSourceId.value.SYSID || !selectedDb.value) {
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
        sysId: selectedSourceId.value.SYSID,
        url: selectedSourceId.value.URL,
        username: selectedSourceId.value.USERNAME,
        password: selectedSourceId.value.PASSWORD,
        db: selectedDb.value
      }
    );

    if (res.data && res.data.length > 0) {
      res.data.forEach(element => {
        // new defaultItem and populate it
        const newItem = { ...defaultItem.value };
        newItem.souSysid = selectedSourceId.value.SYSID;
        newItem.souOwner = selectedDb.value;
        newItem.souTablename = element;
        newItem.destTablename = element.toUpperCase();
        tables.value.push(newItem);
      });

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
<style>
.v-data-table {
  margin-top: 16px;
}
</style>
