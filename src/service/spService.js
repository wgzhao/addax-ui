// SP 计算服务
import {ref} from 'vue'
import axios from "axios";

// 主表 SP 计算的 API 前置 
const mainSpApi = ref("/maintable/sp")

// 0. 主表列表
const fetchSpMainList = () => {
  return axios.get(mainSpApi.value + "/list");
}

// 0.1 主表详情
const fetchSpMainDetail = (spId) => {
  return axios.get(mainSpApi.value + "/detail/" + spId);
}

// 1. 穿透表信息
const fetchSpThrough = (spId) => {
  return axios.get(mainSpApi.value + "/through/" + spId);
}

// 2. 命令列表
const fetchSpCmdList = (spId) => {
  return axios.get(mainSpApi.value + "/cmdlist/" + spId);
}

// 3. 使用场景
const fetchSpSceneList = (tbl, spId) => {
  return axios.get(mainSpApi.value + "/scene", {
    params: {
        tbl: tbl,
        sysId: spId
    }});
}

// 4. 计算溯源
const fetchSpLineage = (spId) => {
  return axios.get(mainSpApi.value + "/lineage/" + spId);
}

// 5. 前置情况
const fetchSpPrequires = (spId) => {
  return axios.get(mainSpApi.value + "/prequires/" + spId);
}

export default {fetchSpMainList, fetchSpMainDetail, fetchSpThrough, fetchSpCmdList, fetchSpSceneList, fetchSpLineage, fetchSpPrequires}