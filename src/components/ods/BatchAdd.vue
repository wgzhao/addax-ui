<template>
  <!-- ODS 采集 - 批量新增表 -->
  <dialog-comp v-model="dialog" title="批量新增表">
    <template #header>
      <v-btn color="primary" class="flex px-2 mr-5" @click="addItem"
        >新增一行</v-btn
      >
      <v-btn color="primary" class="flex px-2" @click="saveItems">保存</v-btn>
    </template>
    <v-data-table-virtual :items="data" :headers="headers" density="compact">
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
  </dialog-comp>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import DialogComp from "./DialogComp.vue";
import axios from "axios";

defineProps(["d"]);

const dialog = defineModel({ required: true, type: Boolean, default: true });

const headers = ref([
  { title: "源系统", key: "souSysid" },
  { title: "源筛选", key: "souFilter" },
  { title: "源用户", key: "souOwner" },
  { title: "源表名", key: "souTablename" },
  { title: "目标表", key: "destTablename" },
  { title: "Action", value: "action" }
]);

const data = ref([
  {
    souSysid: "",
    souFilter: "1=1",
    souOwner: "",
    souTablename: "",
    destTablename: "",
    destPardKind: ""
  }
]);

const defaultItem = ref({
  souSysid: "",
  souFilter: "1=1",
  souOwner: "",
  souTablename: "",
  destTablename: "",
  destPardKind: ""
});

const sourceSystemList = ref([]);
const fetchSourceData = () => {
  axios.get("/maintable/ods/sourceSystem").then(res => {
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
  data.value.forEach(item => {
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
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  // console.log(data.value)
};
onMounted(() => {
  fetchSourceData();
});
</script>
<style></style>
