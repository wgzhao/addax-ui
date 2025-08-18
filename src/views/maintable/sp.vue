<template>
  <!-- 主表配置 -- SP 计算 -->
  <v-card title="主表配置 -- SP 计算">
    <template v-slot:text>
      <v-row>
        <v-col cols="12" sm="12">
          <v-text-field v-model="search" density="compact" label="Search" prepend-inner-icon="mdi-magnify" single-line
            variant="outlined" hide-details></v-text-field>
        </v-col>
      </v-row>
    </template>

    <v-card-text>
      <v-data-table :items="impSps" :headers="impHeaders" :search="search" items-per-page="10" density="default"
        class="stripped">
        <template v-slot:item.actions="{ item }">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
            </template>
            <v-list>
              <v-list-item slim density="compact" v-for="(op, i) in selectOptions" :key="i"
                @click="openDialog(op.value, item)">
                <v-list-item-title class="text-button">{{ op.title }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>


  <!-- 对话框 -->
  <v-dialog v-model="dialogVisible">
    <v-card :style="{ width: '80vw', height: 'auto' }">
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
        <component :is="currentComponent" :spId="spId" :key="uniqueKey" @save-success="handleSaveSuccess" />
      </v-card-text>
    </v-card>
  </v-dialog>
  <div class="col-6">

  </div>

</template>

<script setup lang="ts">
import { onMounted, ref, shallowRef, defineAsyncComponent, watch } from "vue";
import { debounce } from '@/utils/debounce';
// 异步组件
const SpDetail = defineAsyncComponent(() => import('@/components/sp/SpDetail.vue'));
const SpCmdList = defineAsyncComponent(() => import('@/components/sp/SpCmdList.vue'));
const SceneList = defineAsyncComponent(() => import('@/components/sp/SceneList.vue'));
// const SpLineage = defineAsyncComponent(() => import('@/components/sp/SpLineage.vue'));
const SpRequiresList = defineAsyncComponent(() => import('@/components/sp/SpRequiresList.vue'));
const ShowLogs = defineAsyncComponent(() => import('@/components/sp/ShowLogs.vue'));
import Requests from "@/utils/requests";

const impSps = ref([]);
const spId = ref<string>();
const uniqueKey = ref();
const search = ref('');
const impHeaders = [
  { title: "运行频率", value: "runFreq" },
  { title: "状态", value: "flag" },
  { title: "SP 名称", value: "spName" },
  { title: "开始时间", value: "startTime" },
  { title: "结束时间", value: "endTime" },
  { title: "耗时(秒)", value: "runtime" },
  { title: "操作", value: "actions" }
];
const selectOptions = [
  { title: "主表详情", value: "SpDetail" },
  { title: "命令列表", value: "SpCmdList" },
  { title: "命令日志", value: "ShowLogs1" },
  { title: "调度日志", value: "ShowLogs2" },
  { title: "使用场景", value: "SceneList" },
  { title: "计算溯源", value: "SpLineage" },
  { title: "前置情况", value: "SpRequiresList" }
];

const dialogVisible = ref(false);
const currentComponent = shallowRef(null);
const componentMap = {
  SpDetail,
  SpCmdList,
  SceneList,
  // SpLineage,
  SpRequiresList,
  ShowLogs
};
// 关闭对话框
function closeDialog() {
  dialogVisible.value = false;
  currentComponent.value = null;
}

// 处理保存成功事件
function handleSaveSuccess() {
  // 关闭对话框
  closeDialog();
  // 刷新数据列表
  initData();
}

function openDialog(comp: string, val: any) {
  console.log("invoke " + comp);
  if (comp === "ShowLogs1") {
    spId.value = val.spName;
    uniqueKey.value = val.spId + "1";
    currentComponent.value = componentMap["ShowLogs"];
  } else if (comp === "ShowLogs2") {
    spId.value = "tuna_sp_etl_" + val.spId;
    uniqueKey.value = val.spId + "2";
    currentComponent.value = componentMap["ShowLogs"];
  } else {
    spId.value = val.spId;
    uniqueKey.value = val.spId;
    currentComponent.value = componentMap[comp]

  }
  dialogVisible.value = true; // 打开对话框
}

function initData() {
  // Initial data
  loading.value = true;
  Requests.get("/maintable/sp/list")
    .then(resp => {
      impSps.value = resp.data;
      loading.value = false;
    })
    .catch(error => {
      console.error("加载数据失败:", error);
      loading.value = false;
    });
}

// Add loading state
const loading = ref(false);

onMounted(() => {
  initData();
});

// 若后端支持服务器端过滤，这里可以改为调用 initData 带参数；目前只是前端过滤可延迟无额外逻辑
watch(search, debounce(() => {
  // 预留：如果未来需要服务器端过滤，可在此调用 initData({ q: search.value })
}, 300));
</script>
<style></style>
