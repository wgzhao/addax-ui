// 数据源管理接口
import Requests from "@/utils/requests";
const apiPrefix = "/maintable/datasource";

const list = () => {
  return Requests.get(apiPrefix);
};

const get = (id) => {
  return Requests.get(apiPrefix + "/" + id);
};

const save = (data) => {
  return Requests.post(apiPrefix, data);
};

const deleteItem = (id) => {
  return Requests.delete(apiPrefix + "/" + id);
};

export default { list, get, save, deleteItem };
