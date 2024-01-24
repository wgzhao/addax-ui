// 主表配置 - ODS 采集配置 API
import {ref} from 'vue'
import axios from "axios";

const apiPrefix = ref("/maintable/ods")

// 0. 主表列表
const fetchOdsList = (page, pageSize, q) => {
  return axios.get(apiPrefix.value, {
    params: {
      page: page,
      pageSize: pageSize,
      q: q
    }
  });
}

// 0.1 主表列表搜索
const searchOdsList = (page, pageSize, q) => {
  return axios.get(apiPrefix.value +"/search", {
    params: {
      q: q,
      page: page,
      pageSize: pageSize
    }
  })
}

// 1. 主表详情
const fetchOdsDetail = (tid) => {
  return axios.get(apiPrefix.value + "/" + tid);
}

// 2. 表字段对比
const fetchFieldsCompare = (tid) => {
  return axios.get(apiPrefix.value + "/fieldCompare/" + tid);
}

// 3. 执行采集的命令列表

const fetchCmdList = (tid) => {
    return axios.get(apiPrefix.value + "/cmdlist/" + tid);
}

// 4. 使用的表
const fetchTableUsed = (sysid, tbl) => {
    return axios.get(apiPrefix.value + "/scene", {
        params: {
            tbl: tbl,
            sysId: sysid
        }});
}

// 5. 保存
const save = (data) => {
    return axios.post(apiPrefix.value + "/save", data);
}

// 5. 采集的结果
const fetchAddaxResult = (spname) => {
    return axios.get(apiPrefix.value + "/addaxResult/" + spname);
}

export default {fetchOdsList, fetchOdsDetail, searchOdsList, fetchFieldsCompare, fetchCmdList, fetchTableUsed, fetchAddaxResult, save}