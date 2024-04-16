// 数据源管理接口
import {requests} from '@/utils/requests'
const apiPrefix = "/maintable/datasource"

const list = () => {
    return requests.get(apiPrefix);
}

const get = (id) => {
    return requests.get(apiPrefix + "/" + id);
}

const save = (data) => {
    return requests.post(apiPrefix, data);
}

const deleteItem = (id) => {
    return requests.delete(apiPrefix + "/" + id);
}

export default {list, get, save, deleteItem}