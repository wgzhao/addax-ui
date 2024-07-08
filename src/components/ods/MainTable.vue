<template>
  <!-- ODS 主表信息 ODS采集主表配置-->
  <!-- <v-sheet class="mx-auto"> -->
  <dialog-comp v-model="dialog" title="ODS采集主表配置">
    <v-form fast-fail @submit.prevent="saveOds">
      <v-container>
        <v-row>
          <v-col cols="12" md="3" class="m-0">
            <v-text-field
              v-model="mainTable.sysName"
              label="源系统"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="mainTable.souFilter"
              label="源筛选"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="mainTable.souOwner"
              label="源用户"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="mainTable.souTablename"
              label="源表名"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="mainTable.destTablename"
              label="目标表"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="mainTable.destPartKind"
              label="入库规则"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field v-model="mainTable.flag" label="状态"></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="mainTable.retryCnt"
              label="剩余次数"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="mainTable.paramSou"
              label="参数组"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="mainTable.bpreview"
              label="预发布"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="mainTable.bcreate"
              label="是否建表"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="mainTable.bupdate"
              label="是否更新"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="mainTable.realtimeInterval"
              label="实时间隔"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="mainTable.realtimeTaskgroup"
              label="实时任务组"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="mainTable.realtimeSouOwner"
              label="实时源用户"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="mainTable.realtimeSouFilter"
              label="实时筛选条件"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="mainTable.realtimeFixed"
              label="实时定点"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="mainTable.etlKind"
              label="采集模式"
              hint="A:盘后采集,R:实时采集,默认为A"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="mainTable.realtimeIntervalRange"
              label="实时间隔范围"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="mainTable.souSplit"
              label="源表分片字段"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="mainTable.afterRetryPntype"
              label="盘后重采计划"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="mainTable.afterRetryFixed"
              label="盘后重采时间"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="mainTable.startTime"
              label="开始时间"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="mainTable.endTime"
              label="结束时间"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="mainTable.runtime"
              label="运行耗时"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field v-model="mainTable.tid" label="编号"></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="mainTable.runtimeAdd"
              label="运行耗时手工"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="mainTable.remark"
              label="备注"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn type="reset" class="bg-primary">取消</v-btn>
        <v-btn type="submit" class="btn btn-primary bg-primary">
          {{ mode == "add" ? "新增" : "保存" }}</v-btn
        >
      </v-card-actions>
    </v-form>
    <!-- </v-sheet> -->
  </dialog-comp>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import OdsService from "@/service/maintable/odsService";
import DialogComp from "./DialogComp.vue";
import MainTableType from "@/types/mainTable";

const props = defineProps(["d"]);

const dialog = defineModel();

const mainTable = ref<MainTableType>();

const mode = ref("add");

const saveOds = () => {
  mainTable.value["souSysid"] = mainTable.value["destOwner"].substring(3);
  OdsService.save(mainTable.value)
    .then(res => {
      alert("保存成功!");
    })
    .catch(err => {
      alert("保存失败! " + err);
    });
};

onMounted(() => {
  console.log("d = " + props.d);
  OdsService.fetchOdsDetail(props.d).then(res => (mainTable.value = res.data));
});
</script>
<style>
.v-input .v-field {
  font-size: 0.9rem;
}
</style>
