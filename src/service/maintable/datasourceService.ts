// 数据源管理接口
import Requests from "@/utils/requests";
const apiPrefix = "/maintable/datasource";

const list = () => {
  return Requests.get(apiPrefix);
};

const get = (id: string) => {
  return Requests.get(apiPrefix + "/" + id);
};

const save = (data: any) => {
  return Requests.post(apiPrefix, data);
};

const deleteItem = (id: string) => {
  return Requests.delete(apiPrefix + "/" + id);
};

export default { list, get, save, deleteItem };
