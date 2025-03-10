<template>
  <!-- 主表配置 -- ODS 采集配置-->
  <v-card flat title="主表配置 - ODS 采集配置">
    <template v-slot:text>
      <v-row justify="center" align-content="center" >
        <v-col cols="col-2">
          <v-text-field v-model="search" density="compact" label="Search" prepend-inner-icon="mdi-magnify" single-line
            variant="outlined" hide-details @keyup.enter="searchOds" @click:append-inner="searchOds">
            <template #prepend>
              <span class="me-2">关键字查询</span>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="auto">
          <!-- 状态下拉框选择 statusOptions -->
          <v-select v-model="runStatus" :items="statusOptions" item-title="text" item-value="value"  density="compact">
            <template #prepend>
              <span class="me-2">状态</span>
            </template>
          </v-select>
        </v-col>
        <!-- add search button -->
        <v-col cols="auto">
          <v-btn variant="tonal" @click="searchOds">查询</v-btn>
        </v-col>
        <v-spacer />
        <v-col cols="auto">
          <v-btn variant="tonal" prepend-icon="mdi-pencil" @click="openDialog('BatchUpdate','BatchUpdate')" >批量修改</v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn variant="tonal" prepend-icon="mdi-plus" @click="openDialog('BatchAdd', 'BatchAdd')">批量新增表</v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn variant="tonal" prepend-icon="mdi-play" @click="doEtl('source')">启动表更新</v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn variant="tonal" prepend-icon="mdi-play" @click="doEtl('sp')">启动采集</v-btn>
        </v-col>
      </v-row>
    </template>
    <v-card-text>
      <v-data-table-server density="compact" :items="ods" :headers="headers" :items-per-page="itemsPerPage"
        :items-length="totalItems" item-value="tid" :loading="loading" @update:options="loadItems" show-select v-model="selected">
        <template v-slot:item.action="{ item }">
          <!-- add link for selectOption -->
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-dots-vertical" v-bind="props"> </v-btn>
            </template>
            <v-list>
              <v-list-item slim density="compact" v-for="(op, i) in selectOptions" :key="i"
                @click="openDialog(op.value, item)"
                >
                <v-list-item-title class="text-button">{{
                  op.text
                }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table-server>
    </v-card-text>
  </v-card>

  <!-- 对话框 -->
  <v-dialog v-model="dialogVisible" >
      <v-card :style="{ width: '80vw', height: 'auto' }">
        <v-card-title>
          <!-- <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn> -->
          <v-list-item class="px-2">
          <slot name="header" />
          <template #append>
            <v-btn
              class="btn btn-primary bg-primary"
              text="关闭"
              @click="closeDialog"
            ></v-btn>
          </template>
        </v-list-item>
        </v-card-title>

        <v-divider />

        <v-card-text>
          <!-- 动态加载的内容 -->
          <component :is="currentComponent"  v-bind="currentParams"   @closeDialog="closeDialog" @update:record="handleRecordUpdate" />
        </v-card-text>
      </v-card>
    </v-dialog>

  <v-dialog v-model="alertMsg.show" width="auto">
    <v-card>
      <v-toolbar :color="alertMsg.color" :title="alertMsg.title"></v-toolbar>
      <v-card-text>
        <pre>{{ alertMsg.text }}</pre>
      </v-card-text>
    </v-card>
  </v-dialog>

</template>

<script setup lang="ts">
import { ref, shallowRef } from "vue";
import OdsService from "@/service/maintable/odsService";
import MainTableInfo from "@/components/ods/MainTable.vue";
import FieldsCompare from "@/components/ods/FieldsCompare.vue";
import CmdList from "@/components/ods/CmdList.vue";
import TableUsed from "@/components/ods/TableUsed.vue";
import AddaxResult from "@/components/ods/AddaxResult.vue";
import BatchAdd from "@/components/ods/BatchAdd.vue";
import LogFiles1 from "@/components/ods/LogFiles.vue";
import LogFiles2 from "@/components/ods/LogFiles.vue";
import BatchUpdate from "@/components/ods/BatchUpdate.vue";

const ods = ref([]);
const search = ref("");
const selected = ref([]);
const item = ref<any>("");
const itemsPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(true);
const dialogVisible = ref(false);
// 当前要显示的组件（默认值为 null，表示对话框无内容）
// shallowRef 用于定义浅层响应式的引用，它不会递归地将对象或组件内部的数据设为响应式，因此适用于组件这种复杂对象。
const currentComponent = shallowRef(null);
// 传递给子组件的参数
const currentParams = ref({});
const componentMap = {
  MainTableInfo,
  FieldsCompare,
  CmdList,
  TableUsed,
  AddaxResult,
  BatchAdd,
  LogFiles1,
  LogFiles2,
  BatchUpdate
};

const selectOptions = [
  { text: "主表信息", value: "MainTableInfo" },
  { text: "字段对比", value: "FieldsCompare" },
  { text: "命令列表", value: "CmdList" },
  { text: "使用场景", value: "TableUsed" },
  { text: "addax结果", value: "AddaxResult" },
  { text: "命令日志", value: "LogFiles1" },
  { text: "调度日志", value: "LogFiles2" }
];

const statusOptions = [
  {
    text: "", value: "",
  },
  {
    text: "R_正在运行", value: "R"
  },
  {
    text: "Y_运行结束", value: "Y"
  },
  {
    text: "E_运行错误", value: "E"
  },
  {
    text: "W_等待", value: "W"
  },
  {
    text: "N_未运行", value: "N"
  },
  {
    text: "X_禁用", value: "X"
  }
];

const runStatus = ref("");

const headers = ref([
  {
    title: "目标用户",
    align: "center",
    sortable: false,
    key: "destOwner",
    sort: "asc"
  },
  { title: "系统名称", key: "sysName", align: "center", sort: "asc", sortable: true },
  { title: "源用户", key: "souOwner", align: "center", sort: "asc", sortable: true },
  { title: "目标表名", key: "destTablename", align: "center", sort: "asc", sortable: true },
  { title: "状态", key: "flag", align: "center", sort: "asc", sortable: true },
  { title: "剩余", key: "retryCnt", align: "center", sort: "asc", sortable: true },
  { title: "耗时", key: "runtime", align: "center", sort: "asc", sortable: true },
  { title: "操作", key: "action", sort: "asc", sortable: false, align: "center" }
]);
const alertMsg = ref({ show: false, color: "", icon: "", text: "", title: "" });

const showModal = ref({
  MainTableInfo: false,
  FieldsCompare: false,
  CmdList: false,
  TableUsed: false,
  AddaxResult: false,
  BatchAdd: false,
  LogFiles1: false,
  LogFiles2: false,
});

type ShowModalKey = keyof typeof showModal.value;

// 打开对话框并加载相应的组件
function openDialog(componentName, com: any) {
  currentComponent.value = componentMap[componentName]
  setParams(componentName, com);
  dialogVisible.value = true; // 打开对话框
}

// 关闭对话框
function closeDialog() {
  dialogVisible.value = false;
  currentComponent.value = null; // 清空内容
}

function setParams(compName: string, comp: any) {
  if (compName == "BatchUpdate") {
    // 批量修改
    currentParams.value = { tid: selected.value} ;
    return;
  }
  if (compName == "LogFiles1") {
    // 命令日志
    currentParams.value = { tid: comp.tid};
    return;
  }
  if (compName == "LogFiles2") {
    // 调度日志
    currentParams.value = { tid: "tuna_sp_etl_" + comp.tid};
    return;
  }

  if (compName == "MainTableInfo" || compName == "FieldsCompare" || compName == "CmdList") {
    currentParams.value = { tid: comp.tid};
  } else if (compName == "TableUsed") {
    currentParams.value = { tid: comp.destOwner + "." + comp.destTablename + "|" + comp.sysid};
  } else if (compName == "AddaxResult") {
    currentParams.value = { tid: comp.spname};
  } else if (compName === "BatchAdd") {
    currentParams.value = { tid: "-1"};
  }
  else {
    currentParams.value = { tid: comp.tid};
  }
}

const doEtl = (ctype: string) => {
  OdsService.execETL(ctype)
    .then(res => {
      alertMsg.value.show = true;
      alertMsg.value.color = "success";
      alertMsg.value.icon = "mdi-check-circle";
      alertMsg.value.title = "启动成功";
      alertMsg.value.text = JSON.stringify(res);
    })
    .catch(res => {
      alertMsg.value.show = true;
      alertMsg.value.color = "error";
      alertMsg.value.icon = "mdi-alert-circle";
      alertMsg.value.title = "启动失败";
      alertMsg.value.text = res;
    });
};

const handleRecordUpdate = (newRecord) => {
  const index = ods.value.findIndex(item => item.tid === newRecord.tid);
  if (index > -1) {
    ods.value.splice(index, 1, newRecord);  // 响应式替换单个记录
  }
};

interface LoadItemsOptions {
  page: number;
  itemsPerPage: number;
  sortBy: string | null;
};

const loadItems = ({ page, itemsPerPage, sortBy }: LoadItemsOptions) => {
  loading.value = true;
  // const sort = createSort(sortBy)
  OdsService.fetchOdsList(page - 1, itemsPerPage, search.value, runStatus.value).then(res => {
    ods.value = res.data["content"];
    totalItems.value = res.data["totalPages"];
    loading.value = false;
  });
};

const searchOds = () => {
  loadItems({ page: 0, itemsPerPage: itemsPerPage.value, sortBy: null });
};
</script>
<style scoped>
</style>
