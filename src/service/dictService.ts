// 参数管理接口
import { ref } from "vue";
import Requests from "@/utils/requests";

const apiPrefix = ref("/maintable/paramManage");

const listDicts = () => {
  return Requests.get(apiPrefix.value + "/dicts");
};

const createOrUpdateDict = (dict: Map<string, string>) => {
  return Requests.post(apiPrefix.value + "/dict", dict);
};

const deleteDict = (dict_code: string) => {
  return Requests.delete(apiPrefix.value + "/dicts/" + dict_code);
};

// items means the dictionary table

const listDictItems = (dict_code: string) => {
  return Requests.get(apiPrefix.value + "/dictionaries/" + dict_code);
};

const createOrUpdateDictItem = (dictItem: Map<string, string>) => {
  return Requests.post(apiPrefix.value + "/dictionaries", dictItem);
};

const deleteDictItem = (dictItemId: number) => {
  return Requests.delete(apiPrefix.value + "/dictionaries/" + dictItemId);
};

export default {
  listDicts,
  createOrUpdateDict,
  deleteDict,
  listDictItems,
  createOrUpdateDictItem,
  deleteDictItem,
};
