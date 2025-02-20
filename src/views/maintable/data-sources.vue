<template>
  <!-- 主表配置 -- 数据源管理 -->
  <div class="row">
    <v-card flat title="数据源管理">
      <template v-slot:text>
        <v-row justify="center" align-center="center">
          <v-col cols="col-4">
            <v-text-field v-model="searchValue" density="compact" label="Search" prepend-inner-icon="mdi-magnify"
              single-line :variant="variant" hide-details></v-text-field>
          </v-col>
          <v-spacer />
          <v-col cols="auto">
            <v-btn variant="tonal" @click="addDataSource()">
              新增
            </v-btn>
          </v-col>
        </v-row>
      </template>
      <v-card-text>
        <v-data-table :items="impdbs" :headers="headers" :search="searchValue" density="compact" items-per-page="20">
          <template v-slot:item.actions="{ item }">
            <!-- add link for selectOption -->
            <!-- <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn icon="mdi-dots-vertical" v-bind="props"> </v-btn>
                </template>
    <v-list>
      <v-list-item slim density="compact" v-for="(op, i) in actions" :key="i" @click="doAction(item.id, op.value)">
        <v-list-item-title class="text-button">{{
          op.text
          }}</v-list-item-title>
      </v-list-item>
    </v-list>
    </v-menu> -->
            <v-btn class="btn btn-xs btn-info" @click="doAction(item.id, 'show')">详情</v-btn>
            <v-btn class="btn btn-xs btn-warning" @click="doAction(item.id, 'edit')">编辑</v-btn>
            <!-- <a href="#" class="btn btn-xs btn-info">使用场景</a>
                        <a href="#" class="btn btn-xs btn-info">探索源库</a> -->
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
  <!-- form -->
  <v-dialog width="auto" v-model="isShow">
    <v-card :style="{ width: '80vw', height: 'auto' }">
      <v-card-title>
        {{ title}}
        <!-- <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn> -->
        <v-list-item class="px-2">
          <slot name="header" />
          <template #append>
            <v-btn class="btn btn-primary bg-primary" text="关闭" @click="isShow = false"></v-btn>
          </template>
        </v-list-item>
      </v-card-title>

      <v-divider />
      <v-card-text>
        <AddDataSource v-bind="params" />
      </v-card-text>
      </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import DSService from "@/service/maintable/datasourceService";
import AddDataSource  from "@/components/datasource/AddDataSource.vue";

const impdbs = ref([]);
const isShow = ref(false)
// 模式： show 显示，edit 编辑， add 新增
const mode = ref("show");
const title = computed(() => {
  return mode.value === "show" ? "详情" : mode.value === "edit" ? "编辑" : "新增";
});
const sourceItem = ref({});
const searchValue = ref("");
const headers = [
  { title: "名称", key: "dbName" },
  { title: "采集编号", key: "dbIdEtl" },
  { title: "服务编号", key: "dbIdDs" },
  { title: "操作", value: "actions", align: "center" }
];
const actions = [
  { text: "详情", value: "show" },
  { text: "编辑", value: "edit" },
  { text: "使用场景", value: "scene" },
  { text: "探索源库", value: "explore" }
];

const params = ref({})
const retrieveImpDB = () => {
  DSService.list()
    .then(resp => {
      impdbs.value = resp.data;
      return resp;
    })
    .catch(error => {
      console.log(error);
    });
};

const doAction = (id, ctype) => {
  params.value = {
    sid: id,
    mode: ctype
  }
  isShow.value = true;
};

const addDataSource = () => {
  console.log("addDataSource");
  params.value = {
    sid: "-1",
    mode: "add"
  }
  isShow.value = true;
};

// load data

onMounted(() => {
  DSService.list()
    .then(resp => {
      impdbs.value = resp;
      return resp;
    })
    .catch(error => {
      return error;
    });
});
</script>
<style></style>
