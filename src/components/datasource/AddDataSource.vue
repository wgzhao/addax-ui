<template>
  <v-form fast-fail @submit.prevent="save">
    <v-card density="compact">
      <v-container>
        <v-row dense>
          <v-col cols="12" sm="6" md="2">
            <v-text-field v-model="sourceItem.dbIdEtl" label="采集编号" density="compact"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <v-text-field v-model="sourceItem.dbName" label="采集名称" required density="compact"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <div>
              <v-switch v-model="sourceItem.bvalid" true-value="Y" false-value="N" color="primary" hide-details
                density="compact">
                <template v-slot:append>
                  <v-chip size="x-small" :color="sourceItem.bvalid === 'Y' ? 'success' : 'error'"
                    :text="sourceItem.bvalid === 'Y' ? '已启用' : '已禁用'" class="ml-1"></v-chip>
                </template>
              </v-switch>
            </div>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12" sm="12" md="6">
            <v-text-field v-model="sourceItem.dbConstr" placeholder="JDBC 连接串" label="JDBC 连接地址" required
              density="compact"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field v-model="sourceItem.dbUserEtl" complete="false" label="用户名" density="compact"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field v-model="sourceItem.dbPassEtl" label="密码" type="password" density="compact"></v-text-field>
          </v-col>
        </v-row>
        <!-- 采集信息 -->
        <v-row dense class="mt-3">
          <v-col cols="12" sm="6" md="3">
            <v-text-field v-model="sourceItem.dbParalEtl" label="并发数" type="number" placeholder="0 表示默认"
              density="compact"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field v-model="sourceItem.dbStart" placeholder="HH:mm 或 HH:mm:ss (例如: 08:30 或 08:30:15)"
              label="采集时间" :rules="[timeFormatRule]" :error-messages="timeError" density="compact">
            </v-text-field>
          </v-col>
        </v-row>

        <!-- 备注信息 -->
        <v-row dense class="mt-3">
          <v-col cols="12">
            <v-textarea v-model="sourceItem.dbRemark" label="备注信息" auto-grow rows="4" density="compact"></v-textarea>
          </v-col>
        </v-row>
      </v-container>

      <v-card-actions class="pa-3">
        <v-btn color="info" size="small" v-if="mode === 'add' || mode === 'edit'" @click="testConnect">测试连接</v-btn>
        <v-spacer></v-spacer>
        <v-btn type="submit" color="primary" size="small" v-if="mode === 'add' || mode === 'edit'">保存</v-btn>
        <v-btn type="reset" color="warning" size="small" v-if="mode === 'add' || mode === 'edit'">重置</v-btn>
        <v-btn color="secondary" size="small" @click="close">关闭</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { notify } from '@/stores/notifier';
import DSService from "@/service/maintable/datasourceService";
import { TbImpDb } from "@/types/database";

const props = defineProps({
  sid: String,
  mode: String
});

const sourceItem = ref<TbImpDb>({
  dbIdEtl: '',
  dbName: '',
  dbConstr: '',
  dbUserEtl: '',
  dbPassEtl: '',
  dbParalEtl: 0,
  dbStart: '',
  dbRemark: '',
  bvalid: 'Y'
})

const emit = defineEmits(["closeDialog", "save"]);

// 时间格式验证
const timeFormatRule = computed(() => {
  // 支持 HH:mm 和 HH:mm:ss 两种格式
  const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
  return (value: string) => {
    if (!value) return true; // 允许空值
    if (!timeRegex.test(value)) {
      return '时间格式不正确，请使用 HH:mm 或 HH:mm:ss 格式（如：08:30 或 08:30:15）';
    }
    return true;
  };
});

// 时间错误消息
const timeError = computed(() => {
  if (!sourceItem.value.dbStart) return [];
  // 支持 HH:mm 和 HH:mm:ss 两种格式
  const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
  if (!timeRegex.test(sourceItem.value.dbStart)) {
    return ['时间格式不正确，请使用 HH:mm 或 HH:mm:ss 格式（如：08:30 或 08:30:15）'];
  }
  return [];
});

// 时间格式化函数：自动补充秒数
const formatTimeInput = (value: string) => {
  if (!value) return value;

  // 如果是 HH:mm 格式，自动补充 :00
  const timeWithoutSeconds = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
  if (timeWithoutSeconds.test(value)) {
    return value + ':00';
  }

  return value;
};

const save = () => {
  if (props.mode === "add" || props.mode === "edit") {
    // 验证时间格式
    if (sourceItem.value.dbStart && timeError.value.length > 0) {
      notify('请检查启动时间格式', 'error');
      return;
    }

    // 格式化时间输入，自动补充秒数
    if (sourceItem.value.dbStart) {
      sourceItem.value.dbStart = formatTimeInput(sourceItem.value.dbStart);
    }

    DSService.save(sourceItem.value)
      .then(resp => {
        notify('保存成功', 'success');
        emit('save'); // 发出save事件，通知父组件更新列表
        emit('closeDialog'); // 关闭对话框
      })
      .catch(error => {
        notify('保存失败: ' + error, 'error');
      });
  }
};

// 定义关闭对话框的逻辑
const close = () => {
  emit('closeDialog'); // 通知父组件关闭对话框
};

const testConnect = () => {
  DSService.testConnect(sourceItem.value.dbConstr, sourceItem.value.dbUserEtl, sourceItem.value.dbPassEtl)
    .then(resp => {
      if (resp.code === 0) {
        notify('连接成功', 'success');
      } else {
        notify('连接失败', 'warning');
      }
    })
    .catch(error => {
      notify('连接失败: ' + error, 'error');
    });
}
onMounted(() => {
  console.log("mode = ", props.mode);
  if (props.sid != "-1") {
    DSService.get(props.sid)
      .then(resp => {
        sourceItem.value = resp.data;
        return resp;
      })
      .catch(error => {
        console.log(error);
      });
  }

})


</script>