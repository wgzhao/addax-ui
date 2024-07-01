<template>
  <!-- 与 SP 详情 -->
  <!-- data sample
        {
            "spOwner": "edw",
            "spName": "agr_amc_client",
            "spId": "059B69186AEA1287E0631202AFBCC057",
            "flag": "E",
            "runFreq": "D",
            "startTime": "2023-09-18 04:17:40",
            "endTime": "2023-09-18 04:17:50",
            "retryCnt": 0,
            "runtime": 125,
            "taskGroup": null,
            "paramSou": "C",
            "remark": null,
            "realtimeTaskgroup": null,
            "pnType": null,
            "pnFixed": null,
            "pnInterval": null,
            "pnRange": null
        }

        needs data sample 
        {
            "NEED_SOU": "PR",
            "NEED_SP": null,
            "SP_DEST": null,
            "SP_ALLNEXT": null,
            "THROUGH_NEED_SP": null,
            "SP_ALLTABS": "ODSPR.PRO_SERVE\n",
            "THROUGH_NEED_SOU": null
        }
    -->
  <v-card title="HADOOP存储过程主表配置">
    <v-card-text>
      <v-form fast-fail @submit.prevent="saveData">
        <v-container>
          <v-row>
            <v-col cols="12" md="3" class="m-0">
              <v-text-field
                :variant="variant"
                v-model="spDetail.spOwner"
                label="SP 用户"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                :variant="variant"
                v-model="spDetail.spName"
                label="SP 名称"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                :variant="variant"
                v-model="spDetail.paramSou"
                label="参数组"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                :variant="variant"
                v-model="spDetail.runFreq"
                label="运行频率"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                :variant="variant"
                v-model="spDetail.flag"
                label="状态"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                :variant="variant"
                v-model="spDetail.retryCnt"
                label="剩余次数"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                :variant="variant"
                v-model="spDetail.taskGroup"
                label="任务组"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                :variant="variant"
                v-model="spDetail.realtimeTaskgroup"
                label="前置实时采集任务组"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                :variant="variant"
                v-model="spDetail.pnType"
                label="计划类型"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                :variant="variant"
                v-model="spDetail.pnFixed"
                label="计划定点时间"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                :variant="variant"
                v-model="spDetail.pnInterval"
                label="计划间隔时间"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                :variant="variant"
                v-model="spDetail.pnRange"
                label="计划间隔时间范围"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-textarea
                v-model="needs.NEED_SOU"
                label="直接前置源"
                rows="2"
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="6">
              <v-textarea
                v-model="needs.THROUGH_NEED_SOU"
                label="穿透后所有前置源"
                rows="2"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-textarea
                v-model="needs.NEED_SP"
                label="直接前置SP"
                rows="2"
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="6">
              <v-textarea
                v-model="needs.THROUGH_NEED_SP"
                label="穿透后所有前置SP"
                rows="2"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-textarea
                v-model="needs.SP_ALLTABS"
                label="脚本涉及表"
                auto-grow
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="6">
              <v-textarea
                v-model="needs.SP_DEST"
                label="脚本生成表"
                auto-grow
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                :variant="variant"
                v-model="needs.SP_ALLNEXT"
                label="穿透后所有下游"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
                :variant="variant"
                v-model="spDetail.remark"
                label="备注"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                :variant="variant"
                v-model="spDetail.startTime"
                label="开始时间"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                :variant="variant"
                v-model="spDetail.endTime"
                label="结束时间"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                :variant="variant"
                v-model="spDetail.runtime"
                label="运行耗时"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
                :variant="variant"
                v-model="spDetail.spId"
                label="SP编号"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-btn type="submit" class="btn btn-primary">保存</v-btn>
            <v-btn type="reset" class="btn btn-warning">取消</v-btn>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { spService } from "@/service/spService";

const props = defineProps(["spId"]);

const spDetail = ref({});
const needs = ref([]);

// input style default is outlined

const variant = ref("outlined");

const fetchData = () => {
  spService
    .fetchSpMainDetail(props.spId)
    .then((res) => (spDetail.value = res.data));
  spService.fetchSpThrough(props.spId).then((res) => (needs.value = res.data));
};

const saveData = () => {
  // SpService.spMainSave(spDetail.value)
};
onMounted(() => {
  fetchData();
  console.log(spDetail);
});
</script>
<style>
.input-group {
  display: flex;
  justify-content: space-between;
}
</style>
