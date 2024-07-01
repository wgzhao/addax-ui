<template>
  <!-- ODS 采集 - 批量新增表 -->
  <v-dialog min-width="800" v-model="dialog">
      <v-form v-model="valid" @submit.prevent>
        <v-card>
          <template v-slot:text>
            <v-row justify="center">
              <v-col cols="col-2 ml-auto">
                <v-btn color="primary" class="mb-2" @click="addItem"
                  >新增一行</v-btn
                >
              </v-col>
              <v-col cols="col-2 ml-auto">
                <v-btn color="primary" class="mb-2" @click="saveItems"
                  >保存</v-btn
                >
              </v-col>
              <v-col cols="col-2 ml-auto">
                <v-btn color="primary" @click="$emit('close')">关闭</v-btn>
              </v-col>
            </v-row>
          </template>
          <v-card-text>
            <v-data-table-virtual
              :items="data"
              :headers="headers"
              density="compact"
              height="400"
            >
              <template v-slot:item="{ item, index }">
                <tr>
                  <td>
                    <v-select
                      required
                      label="Select"
                      density="compact"
                      :items="sourceSystemList"
                      item-title="NAME"
                      item-value="SYSID"
                      single-line
                      v-model="item.souSysid"
                    >
                    </v-select>
                  </td>
                  <td>
                    <v-text-field
                      density="compact"
                      v-model="item.souFilter"
                      required
                    ></v-text-field>
                  </td>
                  <td>
                    <v-text-field
                      density="compact"
                      v-model="item.souOwner"
                      required
                    ></v-text-field>
                  </td>
                  <td>
                    <v-text-field
                      density="compact"
                      v-model="item.souTablename"
                      required
                    ></v-text-field>
                  </td>
                  <td>
                    <v-text-field
                      density="compact"
                      v-model="item.destTablename"
                      :value="item.souTablename.toUpperCase()"
                    ></v-text-field>
                  </td>
                  <td class="d-flex justify-center">
                    <v-icon size="x-large" @click="deleteItem(index)"
                      >mdi-delete</v-icon
                    >
                  </td>
                </tr>
              </template>
            </v-data-table-virtual>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="addItem">新增一行</v-btn>
            <v-btn color="primary" @click="saveItems">保存</v-btn>
            <v-btn color="primary" @click="$emit('close')">关闭</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
  </v-dialog>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

defineProps(["d"]);

const dialog = defineModel();

const valid = ref(true);

const headers = ref([
  { title: "源系统", key: "souSysid" },
  { title: "源筛选", key: "souFilter" },
  { title: "源用户", key: "souOwner" },
  { title: "源表名", key: "souTablename" },
  { title: "目标表", key: "destTablename" },
  { title: "Action", value: "action" },
]);

const data = ref([
  {
    souSysid: "",
    souFilter: "1=1",
    souOwner: "",
    souTablename: "",
    destTablename: "",
    destPardKind: "",
  },
]);

const defaultItem = ref({
  souSysid: "",
  souFilter: "1=1",
  souOwner: "",
  souTablename: "",
  destTablename: "",
  destPardKind: "",
});

const sourceSystemList = ref([]);
const fetchSourceData = () => {
  axios.get("/maintable/ods/sourceSystem").then((res) => {
    sourceSystemList.value = res.data;
  });
};

const deleteItem = (index: number) => {
  if (data.value.length > 1) {
    // only more thanone item
    data.value.splice(index, 1);
  }
};
const addItem = () => {
  data.value.push(defaultItem.value);
};
const saveItems = () => {
  // set destPardKind for each item
  // rule: if(or(A2 = "JY", A2 = "J2", A2 = "WD"), 'N', 'D')
  data.value.forEach((item) => {
    if (
      item.souSysid == "JY" ||
      item.souSysid == "J2" ||
      item.souSysid == "WD"
    ) {
      item.destPardKind = "N";
    } else {
      item.destPardKind = "D";
    }
    // set destTablename
    if (item.destTablename == "") {
      item.destTablename = item.souTablename.toUpperCase();
    }
  });
  // save data
  axios
    .post("/maintable/ods/batchSave", data.value, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  // console.log(data.value)
};
onMounted(() => {
  fetchSourceData();
});
</script>
<style>
</style>
