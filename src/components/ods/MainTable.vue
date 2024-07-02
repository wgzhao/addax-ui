<template>
  <!-- ODS 主表信息 ODS采集主表配置-->
  <!-- <v-sheet class="mx-auto"> -->
  <v-dialog min-width="800" v-model="dialog">
    <v-form fast-fail @submit.prevent="saveOds">
      <v-card flat>
        <v-list-item class="px-6" height="88">
          <template #title>
            ODS采集主表配置
          </template>
          <template #append>
            <v-btn class="btn btn-primary bg-secondary" text="关闭" @click="dialog = false"></v-btn>
          </template>
        </v-list-item>
        <v-container>
          <v-row>
            <v-col cols="12" md="3" class="m-0">
              <v-text-field v-model="props.d.sysName" label="源系统"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field v-model="props.d.souFilter" label="源筛选"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field v-model="props.d.souOwner" label="源用户"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field v-model="props.d.souTablename" label="源表名"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="3">
              <v-text-field v-model="props.d.destTablename" label="目标表"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field v-model="props.d.destPartKind" label="入库规则"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field v-model="props.d.flag" label="状态"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field v-model="props.d.retryCnt" label="剩余次数"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="3">
              <v-text-field v-model="props.d.paramSou" label="参数组"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field v-model="props.d.bpreview" label="预发布"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field v-model="props.d.bcreate" label="是否建表"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field v-model="props.d.bupdate" label="是否更新"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="3">
              <v-text-field v-model="props.d.realtimeInterval" label="实时间隔"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field v-model="props.d.realtimeTaskgroup" label="实时任务组"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field v-model="props.d.realtimeSouOwner" label="实时源用户"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field v-model="props.d.realtimeSouFilter" label="实时筛选条件"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="3">
              <v-text-field v-model="props.d.realtimeFixed" label="实时定点"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field v-model="props.d.etlKind" label="采集模式" hint="A:盘后采集,R:实时采集,默认为A"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field v-model="props.d.realtimeIntervalRange" label="实时间隔范围"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field v-model="props.d.souSplit" label="源表分片字段"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="3">
              <v-text-field v-model="props.d.afterRetryPntype" label="盘后重采计划"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field v-model="props.d.afterRetryFixed" label="盘后重采时间"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field v-model="props.d.startTime" label="开始时间"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field v-model="props.d.endTime" label="结束时间"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="3">
              <v-text-field v-model="props.d.runtime" label="运行耗时"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field v-model="props.d.tid" label="编号"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field v-model="props.d.runtimeAdd" label="运行耗时手工"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field v-model="props.d.remark" label="备注"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn type="reset" class="bg-primary">取消</v-btn>
          <v-btn type="submit" class="btn btn-primary bg-primary">
            {{ mode == "add" ? "新增" : "保存" }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
    <!-- </v-sheet> -->
  </v-dialog>
</template>
<script setup>
import OdsService from "@/service/maintable/odsService";
const props = defineProps(["d"]);

const dialog = defineModel();

const saveOds = () => {
  props.d["souSysid"] = props.d["destOwner"].substring(3);
  OdsService.save(props.d)
    .then((res) => {
      alert("保存成功!");
    })
    .catch((err) => {
      alert("保存失败! " + err);
    });
};
</script>
<style>
.v-input .v-field {
  font-size: 0.9rem;
}
</style>
