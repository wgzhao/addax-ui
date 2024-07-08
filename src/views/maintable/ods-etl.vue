<template>
  <!-- 主表配置 -- ODS 采集配置-->
  <v-card flat title="主表配置 - ODS 采集配置">
    <template v-slot:text>
      <v-row justify="center" align="center">
        <v-col cols="col-4">
          <v-text-field
            v-model="search"
            density="compact"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            single-line
            variant="outlined"
            hide-details
            @keyup.enter="searchOds"
            @click:append-inner="searchOds"
          ></v-text-field>
        </v-col>
        <v-col cols="auto">
          <v-btn
            variant="tonal"
            prepend-icon="mdi-plus"
            @click="showModal['BatchAdd'] = true"
            >批量新增表</v-btn
          >
        </v-col>
        <v-col cols="auto">
          <v-btn
            variant="tonal"
            prepend-icon="mdi-play"
            @click="doEtl('source')"
            >启动表更新</v-btn
          >
        </v-col>
        <v-col cols="auto">
          <v-btn variant="tonal" prepend-icon="mdi-play" @click="doEtl('sp')"
            >启动采集</v-btn
          >
        </v-col>
      </v-row>
    </template>
    <v-card-text>
      <v-data-table-server
        density="compact"
        :items="ods"
        :headers="headers"
        :item-per-page="itemsPerPage"
        :items-length="totalItems"
        item-value="name"
        :loading="loading"
        @update:options="loadItems"
      >
        <template v-slot:item.action="{ item }">
          <!-- add link for selectOption -->
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-dots-vertical" v-bind="props"> </v-btn>
            </template>
            <v-list>
              <v-list-item
                slim
                density="compact"
                v-for="(op, i) in selectOptions"
                :key="i"
                @click="doAction(item, op.value)"
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
  <!--    <div class="col-6">-->
  <!--      <component :is="tabs[dynamicComponent]" :d="item"></component>-->
  <!--    </div>-->
  <!-- action response -->
  <v-dialog v-model="alertMsg.show" width="auto">
    <v-card>
      <v-toolbar :color="alertMsg.color" :title="alertMsg.title"></v-toolbar>
      <v-card-text>
        <pre>{{ alertMsg.text }}</pre>
      </v-card-text>
    </v-card>
  </v-dialog>

  <!-- modal -->

  <BatchAdd v-model="showModal['BatchAdd']" v-if="showModal['BatchAdd']" />
  <MainTableInfo
    v-model="showModal['MainTableInfo']"
    v-if="showModal['MainTableInfo']"
    :d="item"
  />
  <FieldsCompare
    v-model="showModal['FieldsCompare']"
    v-if="showModal['FieldsCompare']"
    :d="item"
  />
  <CmdList
    v-model="showModal['CmdList']"
    v-if="showModal['CmdList']"
    :d="item"
  />
  <TableUsed
    v-model="showModal['TableUsed']"
    v-if="showModal['TableUsed']"
    :d="item"
  />
  <AddaxResult
    v-model="showModal['AddaxResult']"
    v-if="showModal['AddaxResult']"
    :d="item"
  />
  <LogFiles
    v-model="showModal['LogFiles1']"
    v-if="showModal['LogFiles1']"
    :d="item"
  />
  <LogFiles
    v-model="showModal['LogFiles2']"
    v-if="showModal['LogFiles2']"
    :d="item"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import OdsService from "@/service/maintable/odsService";
import MainTableInfo from "@/components/ods/MainTable.vue";
import FieldsCompare from "@/components/ods/FieldsCompare.vue";
import CmdList from "@/components/ods/CmdList.vue";
import TableUsed from "@/components/ods/TableUsed.vue";
import AddaxResult from "@/components/ods/AddaxResult.vue";
import BatchAdd from "@/components/ods/BatchAdd.vue";
import LogFiles from "@/components/ods/LogFiles.vue";

const ods = ref([]);
const search = ref("");
const item = ref<String>("");
const itemsPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(true);

const selectOptions = [
  { text: "主表信息", value: "MainTableInfo" },
  { text: "字段对比", value: "FieldsCompare" },
  { text: "命令列表", value: "CmdList" },
  { text: "使用场景", value: "TableUsed" },
  { text: "addax结果", value: "AddaxResult" },
  { text: "命令日志", value: "LogFiles1" },
  { text: "调度日志", value: "LogFiles2" }
];
const headers = [
  {
    title: "目标用户",
    align: "center",
    sortable: false,
    value: "destOwner",
    sort: "asc"
  },
  { title: "系统名称", value: "sysName", align: "center" },
  { title: "源用户", value: "souOwner", align: "center", sort: "asc" },
  { title: "目标表名", value: "destTablename", align: "center", sort: "asc" },
  { title: "状态", value: "flag", align: "center" },
  { title: "剩余", value: "retryCnt", align: "center" },
  { title: "耗时", value: "runtime", align: "center" },
  { title: "操作", value: "action", sortable: false, align: "center" }
];
const alertMsg = ref({ show: false, color: "", icon: "", text: "", title: "" });

const showModal = ref({
  MainTableInfo: false,
  FieldsCompare: false,
  CmdList: false,
  TableUsed: false,
  AddaxResult: false,
  BatchAdd: false,
  LogFiles1: false,
  LogFiles2: false
});

const doAction = (val: any, comp: string) => {
  // clear item
  item.value = "";

  if (comp == "LogFiles1") {
    // 命令日志
    item.value = val.spname;
    showModal.value[comp] = true;
    return;
  }
  if (comp == "LogFiles2") {
    // 调度日志
    item.value = "tuna_sp_etl_" + val.tid;
    showModal.value[comp] = true;
    return;
  }

  if (comp == "MainTableInfo" || comp == "FieldsCompare" || comp == "CmdList") {
    item.value = val.tid;
  } else if (comp == "TableUsed") {
    item.value = val.destOwner + "." + val.destTablename + "|" + val.sysid;
  } else if (comp == "AddaxResult") {
    item.value = val.spname;
  } else {
    item.value = val;
  }
  showModal.value[comp] = true;
};

const doEtl = (ctype: string) => {
  OdsService.execETL(ctype)
    .then(res => {
      alertMsg.value.show = true;
      alertMsg.value.color = "success";
      alertMsg.value.icon = "mdi-check-circle";
      alertMsg.value.title = "启动成功";
      alertMsg.value.text = res.data;
    })
    .catch(res => {
      alertMsg.value.show = true;
      alertMsg.value.color = "error";
      alertMsg.value.icon = "mdi-alert-circle";
      alertMsg.value.title = "启动失败";
      alertMsg.value.text = res.data;
    });
};
const loadItems = ({ page, itemsPerPage, sortBy }) => {
  loading.value = true;
  // const sort = createSort(sortBy)
  OdsService.fetchOdsList(page - 1, itemsPerPage, search.value).then(res => {
    ods.value = res.data["content"];
    totalItems.value = res.data["totalPages"];
    loading.value = false;
  });
};

const searchOds = () => {
  loadItems({ page: 0, itemsPerPage: itemsPerPage.value, sortBy: null });
};
</script>
<style scoped></style>
