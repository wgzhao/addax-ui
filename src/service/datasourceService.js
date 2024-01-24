// 数据源管理接口
import axios from 'axios'
const apiPrefix = "/maintable/datasource"

const list = () => {
    return axios.get(apiPrefix);
}

const get = (id) => {
    return axios.get(apiPrefix + "/" + id);
}

const save = (data) => {
    return axios.post(apiPrefix, data);
}

const deleteItem = (id) => {
    return axios.delete(apiPrefix + "/" + id);
}

export default {list, get, save, deleteItem}