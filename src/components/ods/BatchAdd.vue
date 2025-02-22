<template>
  <!-- ODS 采集 - 批量新增表 -->
  <v-card title="ODS 采集 - 批量新增表" :style="{ width: '80vw', height: 'auto' }">
    <v-card-text>
      <v-row>
        <v-col cols="4">
          <v-select :items="sourceSystemList" item-title="NAME" v-model="selectedSourceId" item-value="SYSID"
            density="compact"
            return-object
            single-line
            >
            <template #prepend>
              <span class="me-2">选择采集源</span>
            </template>
          </v-select>
        </v-col>
        <v-col cols="4">
          <v-select :items="sourceDbs" :disabled="!selectedSourceId.URL" v-model="selectedDb" 
          density="compact"
          single-line
          >
            <template #prepend>
              <span class="me-2">选择库</span>
            </template>
            <template #append>
              <v-btn color="primary" @click="getTables">获取表</v-btn>
            </template>
          </v-select>
          </v-col>
          <v-spacer />
          <v-col cols="2">
          <v-btn color="primary" @click="saveItems">保存</v-btn>
          </v-col>
      </v-row>

      <!-- tables -->
    <v-data-table 
      :items="tables" 
      :headers="headers" 
      :items-per-page="15"
      density="compact" 
      v-if="tables.length > 0">
    <template v-slot:[`item.action`]="{ item, index }">
      <v-btn color="error" class="btn btn-xs btn-danger" @click="deleteItem(index)">删除</v-btn>
      </template>
    </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import request from "@/utils/requests";

const props = defineProps({
  tid: {
    type: String,
    required: false,
  }
}
);
// const dialog = defineModel({ required: true, type: Boolean, default: true });

const headers = ref([
  { title: "源系统", key: "souSysid" },
  { title: "源筛选", key: "souFilter" },
  { title: "源用户", key: "souOwner" },
  { title: "源表名", key: "souTablename" },
  { title: "目标表", key: "destTablename" },
  { title: "Action", value: "action" }
]);

interface Table {
  souSysid: string;
  souFilter: string;
  souOwner: string;
  souTablename: string;
  destTablename: string;
  destPardKind: string;
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

const defaultItem = ref({
  souSysid: "",
  souFilter: "1=1",
  souOwner: "",
  souTablename: "",
  destTablename: "",
  destPardKind: ""
});

const sourceSystemList = ref([]);

const sourceDbs = ref([]);

// const sourceDbs = computed(() => {
//   if (selectedSourceId.value.URL) {
//   return getDbsBySourceId();
//   }
// });

watch (selectedSourceId, (val) => {
  if (val.URL) {
    getDbsBySourceId();
  }
});
const getDbsBySourceId = async () => {
  const res = await request.post(`/maintable/ods/dbSources`,
     {
      url: selectedSourceId.value.URL,
      username: selectedSourceId.value.USERNAME,
      password: selectedSourceId.value.PASSWORD
    }
  );
  sourceDbs.value = res;
};
const fetchSourceData = () => {
  request.get("/maintable/ods/sourceSystem").then(res => {
    sourceSystemList.value = res;
  });
};

const deleteItem = (index: number) => {
  if (tables.value.length > 1) {
    // only more thanone item
    tables.value.splice(index, 1);
  }
};

const saveItems = () => {
  // set destPardKind for each item
  // rule: if(or(A2 = "JY", A2 = "J2", A2 = "WD"), 'N', 'D')
  tables.value.forEach(item => {
    if (
      item.souSysid == "JY" ||
      item.souSysid == "J2" ||
      item.souSysid == "WD"
    ) {
      item.destPardKind = "N";
    } else {
      item.destPardKind = "D";
    }
    // set destTablename
    if (item.destTablename == "") {
      item.destTablename = item.souTablename.toUpperCase();
    }
  });
  // save data
  request
    .post("/maintable/ods/batchSave", tables.value, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  // console.log(tables.value)
};

const getTables = async () => {
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
  res.forEach(element => {
    tables.value.push({
      souSysid: selectedSourceId.value.SYSID,
      souFilter: "1=1",
      souOwner: selectedDb.value,
      souTablename: element,
      destTablename: element.toUpperCase(),
      destPardKind: ""
    });
  });
};
onMounted(() => {
  fetchSourceData();
});
</script>
<style></style>
