<template>
  <v-card title="HADOOP存储过程主表配置" class="pa-2">
    <v-card-text class="pa-2">
      <v-form fast-fail @submit.prevent="saveData" class="form-compact">
        <v-container class="pa-2">
          <!-- First row -->
          <v-row dense class="mb-1">
            <v-col cols="12" md="3" class="pa-1">
              <v-text-field
                density="compact"
                v-model="spDetail.spOwner"
                label="SP 用户"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" class="pa-1">
              <v-text-field
                density="compact"
                v-model="spDetail.spName"
                label="SP 名称"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" class="pa-1">
              <v-text-field
                density="compact"
                v-model="spDetail.paramSou"
                label="参数组"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" class="pa-1">
              <v-text-field
                density="compact"
                v-model="spDetail.runFreq"
                label="运行频率"
              ></v-text-field>
            </v-col>
          </v-row>
          
          <!-- Second row -->
          <v-row dense class="mb-1">
            <v-col cols="12" md="3" class="pa-1">
              <v-text-field
                density="compact"
                v-model="spDetail.flag"
                label="状态"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" class="pa-1">
              <v-text-field
                density="compact"
                v-model="spDetail.retryCnt"
                label="剩余次数"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" class="pa-1">
              <v-text-field
                density="compact"
                v-model="spDetail.taskGroup"
                label="任务组"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" class="pa-1">
              <v-text-field
                density="compact"
                v-model="spDetail.realtimeTaskgroup"
                label="前置实时采集任务组"
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- Third row -->
          <v-row dense class="mb-1">
            <v-col cols="12" md="3" class="pa-1">
              <v-text-field
                density="compact"
                v-model="spDetail.pnType"
                label="计划类型"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" class="pa-1">
              <v-text-field
                density="compact"
                v-model="spDetail.pnFixed"
                label="计划定点时间"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" class="pa-1">
              <v-text-field
                density="compact"
                v-model="spDetail.pnInterval"
                label="计划间隔时间"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" class="pa-1">
              <v-text-field
                density="compact"
                v-model="spDetail.pnRange"
                label="计划间隔时间范围"
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- Textarea rows - keep some spacing for readability -->
          <v-row dense class="mb-1">
            <v-col cols="12" md="6" class="pa-1">
              <v-textarea
                density="compact"
                v-model="needs.NEED_SOU"
                label="直接前置源"
                rows="2"
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="6" class="pa-1">
              <v-textarea
                density="compact"
                v-model="needs.THROUGH_NEED_SOU"
                label="穿透后所有前置源"
                rows="2"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row dense class="mb-1">
            <v-col cols="12" md="6" class="pa-1">
              <v-textarea
                density="compact"
                v-model="needs.NEED_SP"
                label="直接前置SP"
                rows="2"
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="6" class="pa-1">
              <v-textarea
                density="compact"
                v-model="needs.THROUGH_NEED_SP"
                label="穿透后所有前置SP"
                rows="2"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row dense class="mb-1">
            <v-col cols="12" md="6" class="pa-1">
              <v-textarea
                density="compact"
                v-model="needs.SP_ALLTABS"
                label="脚本涉及表"
                rows="2"
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="6" class="pa-1">
              <v-textarea
                density="compact"
                v-model="needs.SP_DEST"
                label="脚本生成表"
                rows="2"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row dense class="mb-1">
            <v-col cols="12" class="pa-1">
              <v-text-field
                density="compact"
                v-model="needs.SP_ALLNEXT"
                label="穿透后所有下游"
              ></v-text-field>
            </v-col>
          </v-row>
          
          <v-row dense class="mb-1">
            <v-col cols="12" class="pa-1">
              <v-text-field
                density="compact"
                v-model="spDetail.remark"
                label="备注"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row dense class="mb-1">
            <v-col cols="12" md="4" class="pa-1">
              <v-text-field
                density="compact"
                v-model="spDetail.startTime"
                label="开始时间"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="pa-1">
              <v-text-field
                density="compact"
                v-model="spDetail.endTime"
                label="结束时间"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="pa-1">
              <v-text-field
                density="compact"
                v-model="spDetail.runtime"
                label="运行耗时"
              ></v-text-field>
            </v-col>
          </v-row>
          
          <v-row dense class="mb-1">
            <v-col cols="12" class="pa-1">
              <v-text-field
                density="compact"
                v-model="spDetail.spId"
                label="SP编号"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="mt-2">
            <v-col class="d-flex gap-2">
              <v-spacer />
              <v-btn type="submit" class="mx-2" color="primary" density="compact">保存</v-btn>
              <v-btn type="reset" color="warning" density="compact">取消</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits } from "vue";
import { spService } from "@/service/spService";
import type { SpDetail, SpNeedsDetail } from "@/types/spDetail";

const props = defineProps(["spId"]);
const emit = defineEmits(["save-success"]);

const spDetail = ref<SpDetail>();
const needs = ref<SpNeedsDetail>();

const fetchData = () => {
  spService
    .fetchSpMainDetail(props.spId)
    .then(res => (spDetail.value = res.data));
  spService.fetchSpThrough(props.spId).then(res => (needs.value = res.data));
};

const saveData = () => {
  spService.saveSpConfig(spDetail.value.spId, spDetail.value).then(() => {
    alert("保存成功");
    emit("save-success");
  }).catch(error => {
    alert("保存失败: " + error);
  });
};

onMounted(() => {
  fetchData();
});
</script>

<style>
.form-compact .v-input__details {
  margin-bottom: 0;
  min-height: 0;
  padding-top: 0;
}

.form-compact .v-field__field {
  min-height: 40px !important;
}

.form-compact .v-field--variant-outlined .v-field__outline {
  --v-field-border-width: 1px;
}

.form-compact .v-text-field input {
  font-size: 0.875rem;
}

.form-compact .v-label {
  font-size: 0.875rem;
  top: 6px;
}
</style>
