<template>
  <v-form fast-fail @submit.prevent="save">
    <v-card denstify>
      <v-container>
        <v-row>
          <v-col cols="12" md="5">
            <v-text-field v-model="sourceItem.dbName" label="数据库名称"></v-text-field>
          </v-col>
          <v-col cols="12" md="5">
            <v-text-field v-model="sourceItem.dbConstr" label="数据源链接串"></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-switch v-model="sourceItem.bvalid" true-value="Y" false-value="N" color="primary" hide-details
              :label="`${sourceItem.bvalid == 'Y' ? '启用' : '禁用'}`"></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <div>
            <h5 class="text-h8 mb-0 pb-0">采集信息</h5>
          </div>
          <v-divider></v-divider>
          <v-col cols="12" md="3">
            <v-text-field v-model="sourceItem.dbIdEtl" label="采集编号"></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field v-model="sourceItem.dbParalEtl" label="并发数"></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field v-model="sourceItem.dbUserEtl" label="用户名"></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field v-model="sourceItem.dbPassEtl" label="密码"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <div>
            <h5 class="text-h8 mb-0 pb-0">数据服务信息</h5>
          </div>
          <v-divider></v-divider>
          <v-col cols="12" md="3">
            <v-text-field v-model="sourceItem.dbIdDs" label="采集编号"></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field v-model="sourceItem.dbParalDs" label="并发数"></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field v-model="sourceItem.dbUserDs" label="用户名"></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field v-model="sourceItem.dbPassDs" label="密码"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <div>
            <h5 class="text-h8 mb-0 pb-0">采集扩展信息</h5>
          </div>
          <v-divider></v-divider>
          <v-col cols="12" md="6">
            <v-text-field v-model="sourceItem.dbStartType" label="启动类型"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="sourceItem.dbStart" label="启动时间"></v-text-field>
          </v-col>
          <v-col cols="12" md="12">
            <v-textarea v-model="sourceItem.dbJudgeSql" label="判断脚本" auto-grow></v-textarea>
          </v-col>
          <v-col cols="12" md="12">
            <v-textarea v-model="sourceItem.dbJudgePre" label="采集前置脚本" auto-grow></v-textarea>
          </v-col>
          <v-col cols="12" md="12">
            <v-textarea v-model="sourceItem.conf" label="其他配置" auto-grow></v-textarea>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="12">
            <v-textarea v-model="sourceItem.dbRemark" label="备注信息" auto-grow></v-textarea>
          </v-col>
        </v-row>
      </v-container>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn type="submit" color="primary" class="btn" v-if="mode === 'add' || mode === 'edit'">保存</v-btn>
        <v-btn type="reset" color="warning" v-if="mode === 'add' || mode === 'edit'">重置</v-btn>
        <v-btn color="secondary" class="btn btn-secondary" @click="close">关闭</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import DSService from "@/service/maintable/datasourceService";

const props = defineProps({
  sid: String,
  mode: String
});

interface DataSource {
  dbName: string;
  dbConstr: string;
  bvalid: string;
  dbIdEtl: string;
  dbParalEtl: number;
  dbUserEtl: string;
  dbPassEtl: string;
  dbIdDs: string;
  dbParalDs: number;
  dbUserDs: string;
  dbPassDs: string;
  dbStartType: string;
  dbStart: string;
  dbJudgeSql: string;
  dbJudgePre: string;
  conf: string;
  dbRemark: string;
}

const sourceItem = ref<DataSource>({
  dbName: "",
  dbConstr: "",
  bvalid: "Y",
  dbIdEtl: "",
  dbParalEtl: 1,
  dbUserEtl: "",
  dbPassEtl: "",
  dbIdDs: "",
  dbParalDs: 1,
  dbUserDs: "",
  dbPassDs: "",
  dbStartType: "",
  dbStart: "",
  dbJudgeSql: "",
  dbJudgePre: "",
  conf: "",
  dbRemark: ""
})

const emit = defineEmits(["closeDialog"]);

const save = () => {
  if (props.mode === "add" || props.mode === "edit") {
    DSService.save(sourceItem.value)
      .then(resp => {
        alert("保存成功");
        emit('closeDialog');
      })
      .catch(error => {
        alert("保存失败:" + error);
      });
    //emit('save');
  }
};

// 定义关闭对话框的逻辑
const close = () => {
  emit('closeDialog'); // 通知父组件关闭对话框
};

onMounted(() => {
  console.log("mode = ", props.mode);
  if (props.sid != "-1") {
    DSService.get(props.sid)
      .then(resp => {
        sourceItem.value = resp;
        return resp;
      })
      .catch(error => {
        console.log(error);
      });
  }
})
</script>