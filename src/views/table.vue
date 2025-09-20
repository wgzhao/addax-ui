<template>
  <v-card flat title="采集表配置">
    <template v-slot:text>
      <v-row justify="center" align-content="center">
        <v-col cols="col-2">
          <v-text-field v-model="search" density="compact" label="Search" prepend-inner-icon="mdi-magnify" single-line
            variant="outlined" hide-details @keyup.enter="searchTable" @click:append-inner="searchTable">
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
          <v-btn variant="tonal" @click="searchTable">查询</v-btn>
        </v-col>
        <v-spacer />
        <v-col cols="auto">
          <v-btn variant="tonal" prepend-icon="mdi-delete" :disabled="selected.length === 0"
            @click="confirmBatchDelete">批量删除</v-btn>
        </v-col>
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
          <v-btn variant="tonal" prepend-icon="mdi-play" @click="doEtl(null)">批量采集</v-btn>
        </v-col>
      </v-row>
    </template>
    <v-card-text>
      <v-data-table-server density="compact" :items="table" :headers="headers" :items-per-page="currPageSize"
        :items-length="totalItems" item-value="tid" :loading="loading" @update:options="loadItems" show-select
        v-model="selected" :item-class="getRowClass">
        <template v-slot:item.action="{ item }">
          <v-row justify="center" no-gutters>
            <v-btn small density="compact" color="primary" class="mr-1"
              @click="openDialog('MainTableInfo', item)">主表信息</v-btn>
            <v-btn small density="compact" color="secondary" class="mr-1"
              @click="openDialog('FieldsCompare', item)">字段对比</v-btn>
            <!-- <v-btn small density="compact" color="info" class="mr-1" @click="openDialog('CmdList', item)">命令列表</v-btn> -->
            <v-btn small density="compact" color="success" class="mr-1"
              @click="openDialog('AddaxResult', item)">采集结果</v-btn>
            <v-btn small density="compact" color="info" class="mr-1" @click="openDialog('LogFiles', item)">采集日志</v-btn>
            <v-btn small density="compact" color="error" @click="confirmDelete(item)">删除</v-btn>
            <v-btn small density="compact" color="info" @click="doEtl(item)">采集</v-btn>
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
          @update:record="handleRecordUpdate" @update:batch="handleBatchUpdate" @refresh-data="searchTable" />
      </v-card-text>
    </v-card>
  </v-dialog>


  <!-- 删除确认对话框 -->
  <v-dialog v-model="deleteDialogVisible" width="400">
    <v-card>
      <v-card-title class="text-h6">确认删除</v-card-title>
      <v-card-text>{{ deleteConfirmMessage }}</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="deleteDialogVisible = false">取消</v-btn>
        <v-btn color="error" @click="isBatchDelete ? batchDeleteItems() : deleteItem()">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- ETL进度对话框 -->
  <v-dialog v-model="etlProgressVisible" width="500" persistent>
    <v-card>
      <v-card-title class="text-h6 d-flex align-center">
        <v-icon class="mr-2" color="primary">mdi-database-sync</v-icon>
        {{ etlProgressTitle }}
      </v-card-title>
      <v-card-text class="pb-4">
        <div class="mb-4">
          <div class="text-body-1 mb-2">{{ etlProgressMessage }}</div>
          <!-- 不确定进度条 -->
          <v-progress-linear :indeterminate="etlInProgress" :model-value="etlInProgress ? undefined : 100"
            color="primary" height="8" rounded></v-progress-linear>
        </div>
        <!-- 当前处理信息 -->
        <div v-if="currentProcessingInfo" class="text-caption text-grey-600">
          {{ currentProcessingInfo }}
        </div>
        <!-- 结果信息 -->
        <div v-if="etlResults.length > 0" class="mt-3">
          <v-divider class="mb-2"></v-divider>
          <div class="text-subtitle-2 mb-2">执行结果：</div>
          <div class="result-container" style="max-height: 200px; overflow-y: auto;">
            <v-chip v-for="(result, index) in etlResults" :key="index" :color="result.success ? 'success' : 'error'"
              size="small" class="mr-1 mb-1">
              <v-icon start :icon="result.success ? 'mdi-check' : 'mdi-alert'"></v-icon>
              {{ result.message }}
            </v-chip>
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn v-if="!etlInProgress" color="primary" @click="closeEtlProgress">
          关闭
        </v-btn>
        <v-btn v-else variant="outlined" disabled>
          <v-progress-circular indeterminate size="16" width="2" class="mr-2"></v-progress-circular>
          执行中...
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script setup lang="ts">
import { ref, shallowRef, defineAsyncComponent } from "vue";
import { debounce } from '@/utils/debounce';
import { createSort } from '@/utils/';
import tableService from "@/service/tableService";
import { notify } from '@/stores/notifier';
// 异步按需加载组件，减轻首屏体积
const MainTableInfo = defineAsyncComponent(() => import('@/components/table/MainTable.vue'));
const FieldsCompare = defineAsyncComponent(() => import('@/components/table/FieldsCompare.vue'));
const CmdList = defineAsyncComponent(() => import('@/components/table/CmdList.vue'));
const TableUsed = defineAsyncComponent(() => import('@/components/table/TableUsed.vue'));
const AddaxResult = defineAsyncComponent(() => import('@/components/table/AddaxResult.vue'));
const BatchAdd = defineAsyncComponent(() => import('@/components/table/BatchAdd.vue'));
const LogFiles = defineAsyncComponent(() => import('@/components/table/LogFiles.vue'));
const BatchUpdate = defineAsyncComponent(() => import('@/components/table/BatchUpdate.vue'));

const table = ref([]);
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

function getRowClass(item: any) {
  return selected.value.includes(item.tid) ? 'selected-row' : '';
}

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
},
{
  text: "手工采集",
  value: "doEtl"
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

const headers = ref([
  { title: '系统名称', key: 'dbName', align: 'center' as const, sortable: true, width: '13%' },
  { title: '源库', key: 'souOwner', align: 'center' as const, sortable: true, width: '5%' },
  { title: '目标库', key: 'souSysid', align: 'center' as const, sortable: false, width: '3%' },
  { title: '目标表', key: 'destTablename', align: 'center' as const, sortable: true, width: '20%' },
  { title: '状态', key: 'flag', align: 'center' as const, sortable: true, width: '3%' },
  { title: '剩余', key: 'retryCnt', align: 'center' as const, sortable: true, width: '2%' },
  { title: '耗时', key: 'runtime', align: 'center' as const, sortable: true, width: '3%' },
  { title: '操作', key: 'action', align: 'center' as const, sortable: false, width: '40%' }
]);
// 已使用全局 Notifier 替换旧的 alertMsg

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
function openDialog(componentName: string, com: any) {
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
      tid: comp.tid
    };
  } else if (compName === "BatchAdd") {
    currentParams.value = {
      tid: "-1"
    };
  } else if (compName === "LogFiles") {
    currentParams.value = {
      tid: comp.tid
    }
  }
  else {
    currentParams.value = {
      tid: comp.tid
    };
  }
}

const doEtl = (item: any | null) => {
  if (item != null) {
    // 单个采集
    showEtlProgress('手工采集', '正在执行单个表的数据采集...');
    updateEtlProgress('正在执行单个表的数据采集...', `处理表: ${item.destTablename}`);

    tableService.execETL(item.tid, 300000).then(() => { // 设置5分钟超时
      addEtlResult(`表 ${item.destTablename} 采集成功`, true);
      updateEtlProgress('采集完成');
      finishEtlProgress();
      notify('手工采集任务已启动', 'success', 3000, 'mdi-check-circle');
    }).catch(res => {
      const errorMsg = res?.data || res?.message || '未知错误';
      addEtlResult(`表 ${item.destTablename} 采集失败: ${errorMsg}`, false);
      updateEtlProgress('采集失败');
      finishEtlProgress();
      notify('启动失败: ' + errorMsg, 'error', 4000, 'mdi-alert-circle');
    });
    return;
  }

  if (selected.value.length === 0) return;

  const tids = [...selected.value];
  const totalCount = tids.length;

  // 批量采集
  showEtlProgress('批量手工采集', `正在执行 ${totalCount} 个表的数据采集...`);

  let completedCount = 0;
  let successCount = 0;
  let failureCount = 0;

  // 逐个执行，避免并发过多
  const executeSequentially = async () => {
    for (let i = 0; i < tids.length; i++) {
      const currentTid = tids[i];
      // 通过 tid 获取表名等信息用于显示
      const currentItem = table.value.find(item => item.tid === currentTid);
      const currentTableName = currentItem ? currentItem.destTablename : currentTid;
      updateEtlProgress(
        `正在处理第 ${i + 1}/${totalCount} 个表...`,
        `当前处理: ${currentTableName}`
      );

      try {
        await tableService.execETL(currentTid, 300000); // 设置5分钟超时
        successCount++;
        addEtlResult(`表 ${currentTableName} 采集成功`, true);
      } catch (res) {
        failureCount++;
        const errorMsg = res?.data || res?.message || '未知错误';
        addEtlResult(`表 ${currentTableName} 采集失败: ${errorMsg}`, false);
      }

      completedCount++;
    }

    // 所有任务完成
    updateEtlProgress(`批量采集完成 - 成功: ${successCount}, 失败: ${failureCount}`);
    finishEtlProgress();

    // 清空选中项
    selected.value = [];

    // 显示总结通知
    if (failureCount === 0) {
      notify(`批量采集完成，全部 ${successCount} 个表采集成功`, 'success', 3000, 'mdi-check-circle');
    } else if (successCount === 0) {
      notify(`批量采集完成，全部 ${failureCount} 个表采集失败`, 'error', 4000, 'mdi-alert-circle');
    } else {
      notify(`批量采集完成，成功: ${successCount}, 失败: ${failureCount}`, 'warning', 4000, 'mdi-alert');
    }
  };

  executeSequentially().catch((error) => {
    updateEtlProgress('批量采集过程中发生错误');
    finishEtlProgress();
    notify('批量采集过程中发生错误: ' + (error?.message || ''), 'error', 4000, 'mdi-alert-circle');
  });
};

const handleRecordUpdate = (newRecord) => {
  const index = table.value.findIndex(item => item.tid === newRecord.tid);
  if (index > -1) {
    table.value.splice(index, 1, newRecord); // 响应式替换单个记录
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
    const index = table.value.findIndex(item => item.tid === tid);
    if (index > -1) {
      table.value[index].flag = payload.flag;
      table.value[index].retryCnt = payload.retryCnt;
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
  tableService.fetchTableList(page - 1, itemsPerPage, search.value, runStatus.value,
    sortParam
  ).then(res => {
    table.value = res.data["content"];
    totalItems.value = res.data["totalElements"];
    loading.value = false;
  });
};

const _searchCore = () => loadItems({
  page: 0,
  itemsPerPage: currPageSize.value,
  sortBy: currentSortParam.value
});

const searchTable = debounce(_searchCore, 400);

function updateSchema() {
  tableService.updateSchema().then(() => {
    notify('更新成功', 'success', 3000, 'mdi-check-circle');
  }).catch(res => {
    notify('更新失败: ' + (res?.data || res?.message || ''), 'error', 4000, 'mdi-alert-circle');
  });
}

const deleteDialogVisible = ref(false);
const itemToDelete = ref(null);
const isBatchDelete = ref(false);
const deleteConfirmMessage = ref('');

// ETL进度相关变量
const etlProgressVisible = ref(false);
const etlInProgress = ref(false);
const etlProgressTitle = ref('');
const etlProgressMessage = ref('');
const currentProcessingInfo = ref('');
const etlResults = ref([]);

// ETL进度相关函数
function showEtlProgress(title: string, message: string) {
  etlProgressTitle.value = title;
  etlProgressMessage.value = message;
  etlInProgress.value = true;
  etlResults.value = [];
  currentProcessingInfo.value = '';
  etlProgressVisible.value = true;
}

function updateEtlProgress(message: string, processingInfo?: string) {
  etlProgressMessage.value = message;
  if (processingInfo) {
    currentProcessingInfo.value = processingInfo;
  }
}

function addEtlResult(message: string, success: boolean) {
  etlResults.value.push({ message, success });
}

function finishEtlProgress() {
  etlInProgress.value = false;
  currentProcessingInfo.value = '';
}

function closeEtlProgress() {
  etlProgressVisible.value = false;
  etlInProgress.value = false;
  etlResults.value = [];
  etlProgressTitle.value = '';
  etlProgressMessage.value = '';
  currentProcessingInfo.value = '';
}

function confirmDelete(item) {
  itemToDelete.value = item;
  deleteConfirmMessage.value = '您确定要删除此项吗？';
  isBatchDelete.value = false;
  deleteDialogVisible.value = true;
}

function confirmBatchDelete() {
  if (selected.value.length === 0) return;
  deleteConfirmMessage.value = `您确定要删除选中的 ${selected.value.length} 项吗？`;
  isBatchDelete.value = true;
  deleteDialogVisible.value = true;
}

function deleteItem() {
  if (itemToDelete.value) {
    const tid = itemToDelete.value.tid;
    tableService.delete(tid).then(() => {
      const index = table.value.findIndex(i => i.tid === tid);
      if (index > -1) {
        table.value.splice(index, 1); // 删除项
      }
      deleteDialogVisible.value = false;
      itemToDelete.value = null;
    });
  }
}

function batchDeleteItems() {
  if (selected.value.length === 0) return;
  const tids = [...selected.value];
  // 并发删除所有选中项
  Promise.all(
    tids.map(tid =>
      tableService.delete(tid).catch(() => null) // swallow 单个失败，后续可加入失败提示收集
    )
  ).then(() => {
    // 关闭确认框 & 清空选中
    deleteDialogVisible.value = false;
    selected.value = [];
    // 重新加载数据，防止当前页面空白
    // 直接调用核心加载函数，避免 debounce 延迟
    _searchCore();
  });
}
</script>
