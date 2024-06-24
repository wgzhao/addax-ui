<template>
  <!-- 主表配置 -- 参数管理 -->
  <v-row>
    <v-col cols="col-6" align="left" justify="top">
      <v-card>
        <v-card-text>
          <v-data-table :headers="headers" :items="dicts" density="compact">
            <template v-slot:item.actions="{ item }">
              <v-icon
                icon="mdi-chevron-right"
                size="small"
                class="me-2"
                @click="getDictionary(item.dictCode)"
              >
              </v-icon>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="col-6">
      <v-card title="参数详情">
        <v-btn class="btn btn-primary" @click="addItem">新增</v-btn>
        <v-card-text>
          <v-data-table
            v-if="dictionaries"
            :headers="dictionaryHeaders"
            :items="dictionaries"
            items-per-page="20"
            density="default"
            class="elevation-1"
          >
            <template v-slot:top>
              <!-- edit/new form -->
              <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-text-field
                      v-model="editedItem.entryCode"
                      label="参数值"
                      disabled
                    ></v-text-field>
                    <v-text-field
                      v-model="editedItem.entryValue"
                      label="参数项"
                    ></v-text-field>
                    <v-text-field
                      v-model="editedItem.entryContent"
                      label="参数名称"
                    ></v-text-field>
                    <v-text-field
                      v-model="editedItem.remark"
                      label="备注"
                    ></v-text-field>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="close">
                      Cancel
                    </v-btn>
                    <v-btn
                      color="blue-darken-1"
                      variant="text"
                      @click="saveDictionary"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- delete alert dialog -->
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5"
                    >Are you sure you want to delete this item?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue-darken-1"
                      variant="text"
                      @click="closeDelete"
                      >Cancel</v-btn
                    >
                    <v-btn
                      color="blue-darken-1"
                      variant="text"
                      @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
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

const dicts = ref([]);
const dictionaries = ref([]);
const headers = [
  { title: "参数值", value: "dictCode", width: "10%" },
  { title: "参数名称", value: "dictName", width: "25%" },
  { title: "参数分类", value: "dictClass", width: "10%" },
  { title: "参数说明", value: "remark", width: "50%" },
  { title: "#", value: "actions", width: "5%" },
];
const dictionaryHeaders = [
  { title: "参数值", value: "entryCode" },
  { title: "参数项", value: "entryValue" },
  { title: "参数名称", value: "entryContent" },
  { title: "备注", value: "remark" },
  { title: "Action", value: "actions", width: "5%" },
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
watch(dialog, async (newVal) => {
  dialog.value = newVal || close();
});

watch(dialogDelete, async (newVal) => {
  dialogDelete.value = newVal || closeDelete();
});

const getDictionary = (code) => {
  currEntryCode.value = code;
  DictService.listDictItems(code).then((res) => {
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
const editItem = (item) => {
  editedIndex.value = dictionaries.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialog.value = true;
};

const deleteItem = (item) => {
  editedIndex.value = dictionaries.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialogDelete.value = true;
};

const deleteItemConfirm = () => {
  dictionaries.value.splice(editedIndex.value, 1);
  closeDelete();
};
const saveDictionary = () => {
  if (editedIndex.value > -1) {
    Object.assign(dictionaries.value[editedIndex.value], editedItem.value);
  } else {
    dictionaries.value.push(editedItem.value);
  }
  // save
  DictService.createOrUpdateDictItem(editedItem.value).then((res) => {
    console.log(res.data);
    return res.data;
  });
  close();
};
onMounted(() => {
  DictService.listDicts().then((res) => {
    dicts.value = res.data;
    return res.data;
  });
});
</script>
