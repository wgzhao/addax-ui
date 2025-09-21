// 参数管理接口
import { ref } from 'vue'
import Requests from '@/utils/requests'

const apiPrefix = ref('/param')

const listDicts = () => {
  return Requests.get(apiPrefix.value + '/dicts')
}

const createOrUpdateDict = (dict: Map<string, string>) => {
  return Requests.post(apiPrefix.value + '/dict', dict)
}

const deleteDict = (code: number) => {
  return Requests.delete(apiPrefix.value + '/dicts/' + code)
}

// items means the dictionary table

const listSysItems = (dictCode: number) => {
  return Requests.get(apiPrefix.value + '/dictionaries/' + dictCode)
}

const createOrUpdateDictItem = (dictItem: Map<string, string>) => {
  return Requests.post(apiPrefix.value + '/dictionaries', dictItem)
}

const deleteDictItem = (dictCode: number, itemKey: string) => {
  return Requests.delete(`${apiPrefix.value}/dictionaries/${dictCode}/${itemKey}`)
}

export default {
  listDicts,
  createOrUpdateDict,
  deleteDict,
  listSysItems,
  createOrUpdateDictItem,
  deleteDictItem
}
