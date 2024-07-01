<template>
  <!-- 数据中心采集及数据服务系统清单-->
  <!-- search input -->
  <div class="v-row">
    <div class="v-col col-12">
      <v-responsive max-width="360">
        <v-text-field
          append-inner-icon="mdi-magnify"
          density="compact"
          hide-details
          label="Search"
          v-model="filter"
          rounded="lg"
          single-line
          variant="outlined"
          @keyup.enter="fetchData"
          @click:append-inner="fetchData"
        ></v-text-field>
      </v-responsive>
    </div>
  </div>
  <div class="row">
    <div class="v-col col-12">
      <v-card flat title="数据中心采集及数据服务系统清单">
        <v-card-text>
          <v-data-table
            :items="etlAndDs"
            :headers="etlAndDsHeaders"
            items-per-page="10"
          >
            <template v-slot:item.dbConstr="{ item }">
              <code>{{ item.dbConstr }}</code>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </div>
  </div>

  <div class="v-row">
    <div class="v-col col-12">
      <v-card flat title="数据中心采集表清单(显示100条)">
        <v-card-text>
          <v-data-table
            :items="etlInfo"
            :headers="etlInfoHeaders"
            items-per-page="10"
          >
          </v-data-table>
        </v-card-text>
      </v-card>
    </div>
  </div>

  <div class="v-row">
    <div class="v-col col-12">
      <v-card flat title="数据中心数据推送表清单(显示100条)">
        <v-card-text>
          <v-data-table
            :items="dsInfo"
            :headers="dsInfoHeaders"
            items-per-page="20"
          >
          </v-data-table>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Requests } from "@/utils/requests";
import SystemInfoService from "@/service/systemInfoService";

const etlAndDs = ref([]);
const etlInfo = ref([]);
const dsInfo = ref([]);
const filter = ref("");
const etlAndDsHeaders = ref([
  { title: "类别", key: "sysKind" },
  { title: "系统编号", key: "sysid" },
  { title: "系统名称", key: "sysName" },
  { title: "连接串", key: "dbConstr" },
  { title: "登录用户", key: "dbUser" },
]);
const etlInfoHeaders = ref([
  { title: "系统名称", key: "sysName" },
  { title: "源用户", key: "souOwner" },
  { title: "源表名", key: "souTablename" },
  { title: "源表筛选", key: "souFilter" },
  { title: "目标用户", key: "destOwner" },
  { title: "目标表名", key: "destTablename" },
]);
const dsInfoHeaders = ref([
  { title: "任务组", key: "DS_NAME" },
  { title: "目标表", key: "TBLNAME" },
  { title: "推送开始时间", key: "START_TIME" },
  { title: "推送结束时间", key: "END_TIME" },
]);

const fetchData = () => {
  SystemInfoService.getEtlAndDs(filter.value).then((res) => {
    etlAndDs.value = res.data;
  });
  SystemInfoService.getEtlInfo(filter.value).then((res) => {
    etlInfo.value = res.data;
  });
  SystemInfoService.getDsInfo(filter.value).then((res) => {
    dsInfo.value = res.data;
  });
};

onMounted(() => {
  fetchData();
});
</script>
<style></style>
