<template>
  <!-- 主表配置 -- ODS 采集配置-->
  <v-card flat title="主表配置 - ODS 采集配置">
    <template v-slot:text>
      <v-row justify="center" align-content="center">
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
          <v-select v-model="runStatus" :items="statusOptions" item-title="text" item-value="value" density="compact"
            style="min-width: 150px;">
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
          <v-btn variant="tonal" prepend-icon="mdi-pencil"
            @click="openDialog('BatchUpdate', 'BatchUpdate')">批量修改</v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn variant="tonal" prepend-icon="mdi-plus" @click="openDialog('BatchAdd', 'BatchAdd')">批量新增表</v-btn>
        </v-col>
        <v-col cols="auto">
          <!-- old function doEtl('source') -->
          <v-btn variant="tonal" prepend-icon="mdi-play" @click="updateSchema()">启动表更新</v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn variant="tonal" prepend-icon="mdi-play" @click="doEtl('sp')">启动采集</v-btn>
        </v-col>
      </v-row>
    </template>
    <v-card-text>
      <v-data-table-server density="compact" :items="ods" :headers="headers" :items-per-page="currPageSize"
        :items-length="totalItems" item-value="tid" :loading="loading" @update:options="loadItems" show-select
        v-model="selected">
        <template v-slot:item.action="{ item }">
          <v-row justify="center" align="center" no-gutters>
            <v-btn small color="primary" class="me-2" @click="openDialog('MainTableInfo', item)">主表信息</v-btn>
            <v-btn small color="secondary" class="me-2" @click="openDialog('FieldsCompare', item)">字段对比</v-btn>
            <v-btn small color="info" class="me-2" @click="openDialog('CmdList', item)">命令列表</v-btn>
            <!-- <v-btn small color="warning" class="me-2" @click="openDialog('TableUsed', item)">使用场景</v-btn> -->
            <v-btn small color="success" class="me-2" @click="openDialog('AddaxResult', item)">采集结果</v-btn>
            <v-btn small color="info" class="me-2" @click="openDialog('LogFiles', item)">采集日志</v-btn>
            <v-btn small color="error" @click="confirmDelete(item)">删除</v-btn>
          </v-row>
        </template>
      </v-data-table-server>
    </v-card-text>
  </v-card>

  <!-- 对话框 -->
  <v-dialog v-model="dialogVisible" fullwidth :retain-focus="false">
    <v-card>
      <v-card-title>
        <!-- <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn> -->
        <v-list-item class="px-2">
          <slot name="header" />
          <template #append>
            <v-btn class="btn btn-primary bg-primary" text="关闭" @click="closeDialog"></v-btn>
          </template>
        </v-list-item>
      </v-card-title>

      <v-divider />

      <v-card-text>
        <!-- 动态加载的内容 -->
        <component :is="currentComponent" v-bind="currentParams" @closeDialog="closeDialog"
          @update:record="handleRecordUpdate" @update:batch="handleBatchUpdate" @refresh-data="searchOds" />
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-dialog v-model="alertMsg.show" width="auto">
    <v-card>
      <v-toolbar :color="alertMsg.color" :title="alertMsg.title"></v-toolbar>
      <v-card-text>
        {{ alertMsg.text }}
      </v-card-text>
    </v-card>
  </v-dialog>

  <!-- 删除确认对话框 -->
  <v-dialog v-model="deleteDialogVisible" width="400">
    <v-card>
      <v-card-title class="text-h6">确认删除</v-card-title>
      <v-card-text>您确定要删除此项吗？</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="deleteDialogVisible = false">取消</v-btn>
        <v-btn color="error" @click="deleteItem">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script setup lang="ts">
import { ref, shallowRef } from "vue";
import { createSort } from '@/utils/';
import OdsService from "@/service/maintable/odsService";
import MainTableInfo from "@/components/ods/MainTable.vue";
import FieldsCompare from "@/components/ods/FieldsCompare.vue";
import CmdList from "@/components/ods/CmdList.vue";
import TableUsed from "@/components/ods/TableUsed.vue";
import AddaxResult from "@/components/ods/AddaxResult.vue";
import BatchAdd from "@/components/ods/BatchAdd.vue";
import LogFiles from "@/components/ods/LogFiles.vue";
import BatchUpdate from "@/components/ods/BatchUpdate.vue";

const ods = ref([]);
const search = ref("");
const selected = ref([]);
const currPageSize = ref(10);
const totalItems = ref(0);
const loading = ref(true);
const dialogVisible = ref(false);
// 当前要显示的组件（默认值为 null，表示对话框无内容）
// shallowRef 用于定义浅层响应式的引用，它不会递归地将对象或组件内部的数据设为响应式，因此适用于组件这种复杂对象。
const currentComponent = shallowRef(null);
// 传递给子组件的参数
const currentParams = ref({});
const currentSortParam = ref([{
  sortField: null,
  sortOrder: null,
}]);
const componentMap = {
  MainTableInfo,
  FieldsCompare,
  CmdList,
  TableUsed,
  AddaxResult,
  BatchAdd,
  LogFiles,
  BatchUpdate
};

const selectOptions = [{
  text: "主表信息",
  value: "MainTableInfo"
},
{
  text: "字段对比",
  value: "FieldsCompare"
},
{
  text: "命令列表",
  value: "CmdList"
},
{
  text: "使用场景",
  value: "TableUsed"
},
{
  text: "采集结果",
  value: "AddaxResult"
},
{
  text: "采集相关日志",
  value: "LogFiles"
}
];

const statusOptions = [{
  text: "",
  value: "",
},
{
  text: "R_正在运行",
  value: "R"
},
{
  text: "Y_运行结束",
  value: "Y"
},
{
  text: "E_运行错误",
  value: "E"
},
{
  text: "W_等待",
  value: "W"
},
{
  text: "N_未运行",
  value: "N"
},
{
  text: "X_禁用",
  value: "X"
}
];

const runStatus = ref("");

const headers = ref([{
  title: "目标用户",
  align: "center",
  sortable: false,
  key: "destOwner",
  width: "5%"
},
{
  title: "系统名称",
  key: "sysName",
  align: "center",
  sortable: true,
  width: "10%"
},
{
  title: "源用户",
  key: "souOwner",
  align: "center",
  sortable: true,
  width: "5%"
},
{
  title: "目标表名",
  key: "destTablename",
  align: "center",
  sortable: true,
  width: "20%"
},
{
  title: "状态",
  key: "flag",
  align: "center",
  sortable: true,
  width: "10%"
},
{
  title: "剩余",
  key: "retryCnt",
  align: "center",
  sortable: true,
  width: "5%"
},
{
  title: "耗时",
  key: "runtime",
  align: "center",
  sortable: true,
  width: "5%"
},
{
  title: "操作",
  key: "action",
  align: "center",
  sortable: false,
  width: "35%"
}
]);
const alertMsg = ref({
  show: false,
  color: "",
  icon: "",
  text: "",
  title: ""
});

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
    currentParams.value = {
      tid: selected.value
    };
    return;
  }
  if (compName == "MainTableInfo" || compName == "FieldsCompare" || compName == "CmdList") {
    currentParams.value = {
      tid: comp.tid
    };
  } else if (compName == "TableUsed") {
    currentParams.value = {
      tid: comp.destOwner + "." + comp.destTablename + "|" + comp.sysid
    };
  } else if (compName == "AddaxResult") {
    currentParams.value = {
      tid: comp.spname
    };
  } else if (compName === "BatchAdd") {
    currentParams.value = {
      tid: "-1"
    };
  } else if (compName === "LogFiles") {
    currentParams.value = {
      tid: comp.destOwner + "_" + comp.destTablename + "|" + comp.tid
    }
  }
  else {
    currentParams.value = {
      tid: comp.tid
    };
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
    ods.value.splice(index, 1, newRecord); // 响应式替换单个记录
  }
};

/**
 * 
 * @param payload   
 * const payload = {
    tids: props.tid,
    flag: flag.value,
    retryCnt: retryCnt.value
  };
 */
const handleBatchUpdate = (payload) => {
  payload.tids.forEach(tid => {
    const index = ods.value.findIndex(item => item.tid === tid);
    if (index > -1) {
      ods.value[index].flag = payload.flag;
      ods.value[index].retryCnt = payload.retryCnt;
    }
  });
};

interface LoadItemsOptions {
  page: number;
  itemsPerPage: number;
  sortBy: any
};

const loadItems = ({
  page,
  itemsPerPage,
  sortBy
}: LoadItemsOptions) => {
  loading.value = true;
  currPageSize.value = itemsPerPage;
  const sortParam = createSort(sortBy)
  if (sortParam.sortField != null) {
    currentSortParam.value = sortBy;
  }
  // const sortParam = sortBy?.length > 0 ? sortBy[0] : null; // 
  OdsService.fetchOdsList(page - 1, itemsPerPage, search.value, runStatus.value,
    sortParam
  ).then(res => {
    ods.value = res.data["content"];
    totalItems.value = res.data["totalElements"];
    loading.value = false;
  });
};

const searchOds = () => {
  loadItems({
    page: 0,
    itemsPerPage: currPageSize.value,
    sortBy: currentSortParam.value
  });
};

function updateSchema() {
  OdsService.updateSchema().then(res => {
    alert(res.data);
  }).catch(res => {
    alert(res.data);
  });
}

const deleteDialogVisible = ref(false);
const itemToDelete = ref(null);

function confirmDelete(item) {
  itemToDelete.value = item;
  deleteDialogVisible.value = true;
}

function deleteItem() {
  if (itemToDelete.value) {
    const tid = itemToDelete.value.tid;
    OdsService.delete(tid).then(res => {
      const index = ods.value.findIndex(i => i.tid === tid);
      if (index > -1) {
        ods.value.splice(index, 1); // 删除项
      }
      deleteDialogVisible.value = false;
      itemToDelete.value = null;
    });
  }
}
</script>
