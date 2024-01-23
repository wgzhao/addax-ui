// 参数管理接口
import { ref } from "vue";
import axios from "axios";

const apiPrefix = ref("/maintable/paramManage")

const listDicts = () => {
    return axios.get(apiPrefix.value + "/dicts")
}

const createOrUpdateDict = (dict) => {
    return axios.post(apiPrefix.value + "/dict", dict)
}

const deleteDict = (dict_code) => {
    return axios.delete(apiPrefix.value + "/dicts/" + dict_code);
}


// items means the dictionary table

const listDictItems = (dict_code) => {
    return axios.get(apiPrefix.value + "/dictionaries/" + dict_code) 
}

const createOrUpdateDictItem = (dictItem) => {
    return axios.post(apiPrefix.value + "/dictionaries", dictItem)
}

const deleteDictItem = (dictItemId) => {
    return axios.delete(apiPrefix.value + "/dictionaries/" + dictItemId);
}

export default {listDicts, createOrUpdateDict, deleteDict, listDictItems, createOrUpdateDictItem, deleteDictItem}