<template>
  <!-- 主表配置 -- 数据源管理 -->
  <div class="row">
    <v-card flat title="数据源管理">
      <template v-slot:text>
        <v-row justify="center" align-center="center">
          <v-col cols="col-4">
            <v-text-field v-model="searchValue" density="compact" label="Search" prepend-inner-icon="mdi-magnify"
              single-line hide-details></v-text-field>
          </v-col>
          <v-spacer />
          <v-col cols="auto">
            <v-btn variant="tonal" @click="doAction('-1', 'add')">
              新增
            </v-btn>
          </v-col>
        </v-row>
      </template>
      <v-card-text>
        <v-data-table :items="impdbs" :headers="headers" :search="searchValue" density="compact" items-per-page="20">
          <template v-slot:item.actions="{ item }">
            <v-btn color="secondary" class="btn btn-xs btn-info mx-2" @click="doAction(item.id, 'show')">详情</v-btn>
            <v-btn color="primary" class="btn btn-xs btn-warning mx-2" @click="doAction(item.id, 'edit')">编辑</v-btn>
            <v-btn color="error" class="btn btn-xs btn-danger" @click="openDeleteDialog(item.id, item.dbName)">删除</v-btn>
            <!-- <a href="#" class="btn btn-xs btn-info">使用场景</a>
                        <a href="#" class="btn btn-xs btn-info">探索源库</a> -->
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
  <!-- form -->

  <v-dialog v-model="isShow">
    <v-card :style="{ justify: 'center', width: '80vw', height: 'auto' }" :title="title">
      <v-card-text>
        <AddDataSource v-bind="params" @save="handleSave" @close-dialog="isShow = false" />
      </v-card-text>
    </v-card>
  </v-dialog>

  <!-- 确认删除对话框 -->
  <v-dialog
      v-model="deleteDialog"
      max-width="600"
    >
      <v-card>
        <v-card-title class="headline">
          确认删除
        </v-card-title>
        <v-card-text>
          您确定要删除{{ itemNameToDelete }}这个数据源吗？
        </v-card-text>
        <v-card-actions>
          <v-btn color="default" text @click="deleteDialog=false">
            取消
          </v-btn>
          <v-btn color="error" text @click="confirmDelete">
            确认
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import DSService from "@/service/maintable/datasourceService";
import AddDataSource from "@/components/datasource/AddDataSource.vue";

const impdbs = ref([]);
const isShow = ref(false)
const deleteDialog = ref(false);
const itemIdToDelete = ref(null);
const itemNameToDelete = ref(null);
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
      impdbs.value = resp;
      return resp;
    })
    .catch(error => {
      console.log(error);
    });
};

const doAction = (id, ctype) => {
  params.value = {
    mode: ctype,
    sid: id
  }
  isShow.value = true;
  mode.value = ctype;
};

const closeDialog = () => {
  isShow.value = false;
}

// 处理保存事件
const handleSave = () => {
  console.log('父组件收到了保存事件，可以在此处理后续逻辑');
  retrieveImpDB();
};

// 删除相关操作
// 打开删除确认对话框
const openDeleteDialog = (id, name) => {
  itemIdToDelete.value = id; // 保存要删除的记录 ID
  itemNameToDelete.value = name;
  deleteDialog.value = true; // 打开对话框
};


// 确认删除
const confirmDelete = () => {
  if (itemIdToDelete.value !== null) {
    deleteSource(itemIdToDelete.value);
  }
  deleteDialog.value = false;
};

// 删除数据逻辑
const deleteSource = (id) => {
  console.log(`删除记录 ID: ${id}`);
  // 这里实现删除逻辑，例如调用 API 接口或移除本地数据
  DSService.deleteItem(id)
    .then(resp => {
      alert("删除成功");
      impdbs.value = impdbs.value.filter((item) => item.id !== id);
      itemIdToDelete.value = null;
    })
    .catch(error => {
      alert("删除失败:" + error);
    });
};
onMounted(() => {
  retrieveImpDB();
});
</script>
<style></style>
