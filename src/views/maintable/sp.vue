<template>
  <!-- 主表配置 -- SP 计算 -->
  <div class="row">
    <div class="col-6">
      <v-card title="主表配置 -- SP 计算">
        <template v-slot:text>
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="search"
                density="compact"
                label="Search"
                prepend-inner-icon="mdi-magnify"
                single-line
                variant="outlined"
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
        </template>

        <v-card-text>
          <v-data-table
            :items="impSps"
            :headers="impHeaders"
            :search="search"
            items-per-page="10"
            density="default"
            class="stripped"
          >
            <template v-slot:item.actions="{ item }">
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
                </template>
                <v-list>
                  <v-list-item
                    slim
                    density="compact"
                    v-for="(op, i) in selectOptions"
                    :key="i"
                    @click="doAction(op.value, item)"
                  >
                    <v-list-item-title class="text-button"
                      >{{ op.title }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </div>
    <div class="col-6">
      <component :is="currentComp" :spId="spId" :key="uniqueKey" />
    </div>
  </div>
</template>

<script setup lang="ts">
// import SpDetail from "@/components/sp/SpDetail.vue";
// import SpCmdList from "@/components/sp/SpCmdList.vue";
// import SceneList from "@/components/sp/SceneList.vue";
// import SpLineage from "@/components/sp/SpLineage.vue";
// import SpRequiresList from "@/components/sp/SpRequiresList.vue";
// import ShowLogs from "@/components/sp/ShowLogs.vue";
import Requests from "@/utils/requests";
import { onMounted, ref } from "vue";

const impSps = ref([]);
const spId = ref<string>();
const uniqueKey = ref();
const currentComp = ref<string>();
const search = ref();
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

function doAction(comp: string, val: any) {
  console.log("invoke " + comp);
  if (comp === "ShowLogs1") {
    spId.value = val.spName;
    uniqueKey.value = val.spId + "1";
    currentComp.value = "ShowLogs";
  } else if (comp === "ShowLogs2") {
    spId.value = "tuna_sp_etl_" + val.spId;
    uniqueKey.value = val.spId + "2";
    currentComp.value = "ShowLogs";
  } else {
    spId.value = val.spId;
    uniqueKey.value = val.spId;
    currentComp.value = comp;
  }
}

function initData() {
  // Initial data
  Requests.get("/maintable/sp/list").then(resp => (impSps.value = resp.data));
}

onMounted(() => {
  initData();
});
</script>
<style></style>
