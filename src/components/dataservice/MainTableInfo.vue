<template>
  <!-- 数据服务主表配置--新版-->
  <v-card flat title="数据服务主表配置--新版">
    <v-form fast-fail @submit.prevent>
      <v-container>
        <v-row no-gutters>
          <v-col cols="12" md="3" class="m-0">
            <v-text-field
              v-model="data.dsId"
              label="数据服务编号"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="data.bupdate"
              label="是否更新表结构"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="data.taskGroup"
              label="任务组"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="data.destSysid"
              label="目标库系统编号"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="data.destOwner"
              label="目标表所在用户"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="data.colMap"
              label="额外的字段映射"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field v-model="data.flag" label="运行状态"></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="data.retryCnt"
              label="错误重试次数"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" md="3">
            <v-text-field v-model="data.paramSou" label="参数组"></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="data.paralNum"
              label="执行并发数"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="data.runFreq"
              label="运行频率"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="data.maxRuntime"
              label="允许最长耗时"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" md="3">
            <v-text-field v-model="data.pnType" label="计划类型"></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="data.pnInterval"
              label="计划间隔时间"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="data.pnRange"
              label="计划间隔时间范围"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="data.pnFixed"
              label="计划定点时间"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="data.realtimeFixed"
              label="实时定点"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="data.preSql"
              class="code"
              label="推送前执行SQL"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="data.postSql"
              class="code"
              label="推送成功执行SQL"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="data.prewSqlNew"
              class="code"
              label="推送前实际SQL"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="data.postSqlNew"
              label="推送成功实际SQL"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="data.preSh"
              label="推送前执行shell"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="data.postSh"
              label="推送成功执行shell"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="data.startTime"
              label="运行开始时间"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="data.endTime"
              label="运行结束时间"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="data.runtime"
              label="运行耗时"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12" md="12">
            <v-textarea
              v-model="data.needs"
              class="code"
              label="涉及源表"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12" md="12">
            <v-textarea v-model="data.remark" label="备注信息"></v-textarea>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>
<script setup lang="ts">
import axios from "axios";
import { ref, onMounted, onUnmounted } from "vue";
const props = defineProps(["d"]);
const data = ref({});
const fetchData = () => {
  axios
    .get("/maintable/dataService/detail/" + props.d)
    .then(function (response) {
      data.value = response.data;
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
onMounted(() => {
  fetchData();
});
onUnmounted(() => {
  data.value = {};
});
</script>
<style></style>
