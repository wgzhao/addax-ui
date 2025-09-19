<template>
  <!-- 主表配置 -- 参数管理 -->
  <v-row>
    <v-col cols="col-6" align="left" justify="top">
      <v-card>
        <v-card-text>
          <v-data-table :headers="headers" :items="dicts" density="compact">
            <template v-slot:item.actions="{ item }">
              <v-icon icon="mdi-chevron-right" size="small" class="me-2" @click="getDictionary(item.dictCode)">
              </v-icon>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="col-6">
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="auto">
              <span class="text-h6">{{ currEntryCode }} 参数详情</span>
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
              <v-btn color="info" class="btn btn-primary" @click="addItem">新增</v-btn>
            </v-col>
          </v-row>
          <v-data-table v-if="dictionaries" :headers="dictionaryHeaders" :items="dictionaries" items-per-page="20"
            density="default" class="elevation-1">
            <template v-slot:top>
              <!-- edit/new form -->
              <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-text-field v-model="editedItem.entryCode" label="参数值" disabled></v-text-field>
                    <v-text-field v-model="editedItem.entryValue" label="参数项"></v-text-field>
                    <v-textarea v-model="editedItem.entryContent" label="参数名称"></v-textarea>
                    <v-text-field v-model="editedItem.remark" label="备注"></v-text-field>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="info" @click="close">
                      取消
                    </v-btn>
                    <v-btn color="primary" @click="saveDictionary">
                      保存
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- delete alert dialog -->
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="warning" @click="closeDelete">Cancel</v-btn>
                    <v-btn color="primary" @click="deleteItemConfirm">OK</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>

            <!-- action -->
            <template v-slot:item.actions="{ item }">
              <v-icon size="small" class="me-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon size="small" @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick } from "vue";
import DictService from "@/service/dictService";
import { notify } from '@/stores/notifier';

const dicts = ref([]);
const dictionaries = ref([]);
const headers = [
  { title: "参数值", value: "dictCode", width: "10%" },
  { title: "参数名称", value: "dictName", width: "25%" },
  { title: "参数分类", value: "dictClass", width: "10%" },
  { title: "参数说明", value: "remark", width: "50%" },
  { title: "#", value: "actions", width: "5%" }
];
const dictionaryHeaders = [
  { title: "参数值", value: "entryCode" },
  { title: "参数项", value: "entryValue" },
  { title: "参数名称", value: "entryContent" },
  { title: "备注", value: "remark", width: "30%" },
  { title: "Action", value: "actions", width: "10%" }
];
const dialog = ref(false);
const dialogDelete = ref(false);
const currEntryCode = ref("");
const editedIndex = ref(-1);
const editedItem = ref({});
const defaultItem = ref({});
const formTitle = computed(() => {
  return editedIndex.value === -1 ? "New Item" : "Edit Item";
});

const close = () => {
  dialog.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value);
    editedIndex.value = -1;
  });
};

const closeDelete = () => {
  dialogDelete.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value);
    editedIndex.value = -1;
  });
};
watch(dialog, async newVal => {
  dialog.value = newVal || close();
});

watch(dialogDelete, async newVal => {
  dialogDelete.value = newVal || closeDelete();
});

const getDictionary = code => {
  currEntryCode.value = code;
  DictService.listDictItems(code).then(res => {
    dictionaries.value = res.data;
  });
};

const addItem = () => {
  // add default entry_code
  // entryCode = editItem.value.dictCode;
  // editedItem.value = Object.assign({}, defaultItem.value)
  // editedItem.value.entryCode = entryCode;

  editedItem.value = Object.assign({}, defaultItem.value);
  editedItem.value.entryCode = currEntryCode.value;

  dialog.value = !dialog.value;
};
const editItem = item => {
  editedIndex.value = dictionaries.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialog.value = true;
};

const deleteItem = item => {
  editedIndex.value = dictionaries.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialogDelete.value = true;
};

const deleteItemConfirm = () => {
  const ec = editedItem.value.entryCode;
  const ev = editedItem.value.entryValue;
  DictService.deleteDictItem(ec, ev)
    .then(() => {
      if (editedIndex.value > -1) {
        dictionaries.value.splice(editedIndex.value, 1);
      }
      notify('删除成功', 'success');
      closeDelete();
    })
    .catch(err => {
      notify('删除失败: ' + err, 'error');
    });
};
const saveDictionary = () => {
  if (editedIndex.value > -1) {
    Object.assign(dictionaries.value[editedIndex.value], editedItem.value);
  } else {
    dictionaries.value.push(editedItem.value);
  }
  // save
  DictService.createOrUpdateDictItem(editedItem.value)
    .then(() => notify('保存成功', 'success'))
    .catch(err => notify('保存失败: ' + err, 'error'));
  close();
};
onMounted(() => {
  DictService.listDicts().then(res => {
    dicts.value = res.data;
  });
});
</script>

<style lang="css" scoped>
/* 覆盖 .v-data-table 的斑马纹背景 */
.v-data-table .v-data-table__divider:nth-child(odd) {
  background-color: #fafafa !important;
  /* 奇数行的背景颜色 */
}

.v-data-table .v-data-table__divider:nth-child(even) {
  background-color: #ffffff !important;
  /* 偶数行的背景颜色 */
}
</style>