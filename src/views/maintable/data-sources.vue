<template>
  <!-- 主表配置 -- 数据源管理 -->
  <div class="row">
    <div class="col-6">
      <v-card flat title="数据源管理">
        <template v-slot:text>
          <v-row justify="center" align="center">
            <v-col cols="col-4">
              <v-text-field
                v-model="searchValue"
                density="compact"
                label="Search"
                prepend-inner-icon="mdi-magnify"
                single-line
                :variant="variant"
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="auto">
              <button
                type="button"
                class="btn btn-primary"
                @click="addDataSource()"
              >
                新增
              </button>
            </v-col>
          </v-row>
        </template>
        <v-card-text>
          <v-data-table
            :items="impdbs"
            :headers="headers"
            :search="searchValue"
            density="compact"
            items-per-page="20"
          >
            <template v-slot:item.actions="{ item }">
              <!-- add link for selectOption -->
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn icon="mdi-dots-vertical" v-bind="props"> </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    slim
                    density="compact"
                    v-for="(op, i) in actions"
                    :key="i"
                    @click="doAction(item.id, op.value)"
                  >
                    <v-list-item-title class="text-button">{{
                      op.text
                    }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <!-- 
                        <a class="btn btn-xs btn-info" @click="dataOp(item.id, 'show')">详情</a>
                        <a class="btn btn-xs btn-warning" @click="dataOp(item.id, 'edit')">编辑</a>
                        <a href="#" class="btn btn-xs btn-info">使用场景</a>
                        <a href="#" class="btn btn-xs btn-info">探索源库</a> -->
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </div>

    <!-- form -->

    <div class="col-6">
      <v-form fast-fail @submit.prevent="saveData">
        <v-card flat :title="formTitle">
          <v-container>
            <v-row>
              <v-col cols="12" md="5">
                <v-text-field
                  :variant="variant"
                  v-model="sourceItem.dbName"
                  label="数据库名称"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="5">
                <v-text-field
                  :variant="variant"
                  v-model="sourceItem.dbConstr"
                  label="数据源链接串"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-switch
                  v-model="sourceItem.bvalid"
                  true-value="Y"
                  false-value="N"
                  color="primary"
                  hide-details
                  :label="`${sourceItem.bvalid == 'Y' ? '启用' : '禁用'}`"
                ></v-switch>
              </v-col>
            </v-row>
            <v-row>
              <div><h5 class="text-h6 mb-0 pb-0">采集信息</h5></div>
              <v-divider></v-divider>
              <v-col cols="12" md="3">
                <v-text-field
                  :variant="variant"
                  v-model="sourceItem.dbIdEtl"
                  label="采集编号"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  :variant="variant"
                  v-model="sourceItem.dbParalEtl"
                  label="并发数"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  :variant="variant"
                  v-model="sourceItem.dbUserEtl"
                  label="用户名"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  :variant="variant"
                  v-model="sourceItem.dbPassEtl"
                  label="密码"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <div><h5 class="text-h6 mb-0 pb-0">数据服务信息</h5></div>
              <v-divider></v-divider>
              <v-col cols="12" md="3">
                <v-text-field
                  :variant="variant"
                  v-model="sourceItem.dbIdDs"
                  label="采集编号"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  :variant="variant"
                  v-model="sourceItem.dbParalDs"
                  label="并发数"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  :variant="variant"
                  v-model="sourceItem.dbUserDs"
                  label="用户名"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  :variant="variant"
                  v-model="sourceItem.dbPassDs"
                  label="密码"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <div><h5 class="text-h6 mb-0 pb-0">采集扩展信息</h5></div>
              <v-divider></v-divider>
              <v-col cols="12" md="6">
                <v-text-field
                  :variant="variant"
                  v-model="sourceItem.dbStartType"
                  label="启动类型"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  :variant="variant"
                  v-model="sourceItem.dbStart"
                  label="启动时间"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-textarea
                  v-model="sourceItem.dbJudgeSql"
                  label="判断脚本"
                  rows="4"
                ></v-textarea>
              </v-col>
              <v-col cols="12" md="12">
                <v-textarea
                  v-model="sourceItem.dbJudgePre"
                  label="采集前置脚本"
                  rows="4"
                ></v-textarea>
              </v-col>
              <v-col cols="12" md="12">
                <v-textarea
                  v-model="sourceItem.conf"
                  label="其他配置"
                  rows="4"
                ></v-textarea>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="12">
                <v-textarea
                  v-model="sourceItem.dbRemark"
                  label="备注信息"
                  rows="4"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-btn type="submit" class="btn btn-primary">
              {{ mode === "add" ? "Add" : "Save" }}</v-btn
            >
            <v-btn type="reset">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import DSService from "@/service/maintable/datasourceService";

const variant = ref("outlined");
const impdbs = ref([]);
// 模式： show 显示，edit 编辑， add 新增
const mode = ref("show");
const sourceItem = ref({});
const searchValue = ref("");
const headers = [
  { title: "名称", key: "dbName" },
  { title: "采集编号", key: "dbIdEtl" },
  { title: "服务编号", key: "dbIdDs" },
  { title: "操作", value: "actions", align: "center" },
];
const actions = [
  { text: "详情", value: "show" },
  { text: "编辑", value: "edit" },
  { text: "使用场景", value: "scene" },
  { text: "探索源库", value: "explore" },
];

const formTitle = computed(() => {
  if (mode.value === "add") {
    return "新增数据源";
  } else if (mode.value === "edit") {
    return "编辑数据源";
  } else {
    return "数据源详情";
  }
});

const retrieveImpDB = () => {
  DSService.list()
    .then((resp) => {
      impdbs.value = resp.data;
      return resp;
    })
    .catch((error) => {
      console.log(error);
    });
};

const doAction = (id, ctype) => {
  mode.value = ctype;
  DSService.get(id)
    .then((resp) => {
      sourceItem.value = resp.data;
      return resp;
    })
    .catch((error) => {
      return error;
    });
};

const addDataSource = () => {
  mode.value = "add";
  sourceItem.value = {};
};

const saveData = () => {
  if (mode.value === "add" || mode.value === "edit") {
    DSService.save(sourceItem.value)
      .then((resp) => alert("保存成功"))
      .catch((error) => {
        alert("保存失败:" + error);
      });

    sourceItem.value = "";
    // get data agtain, it's lazy
    // retrieveImpDB()
  }
};

// load data

onMounted(() => {
  DSService.list()
    .then((resp) => {
      impdbs.value = resp.data;
      return resp;
    })
    .catch((error) => {
      return error;
    });
});
</script>
<style></style>
