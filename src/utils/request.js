import axios from "axios";
import { ref } from "vue";

export function get(url, params) {
  const data = ref()
  if (params === undefined ) {
    axios.get(url).then(res => data.value = res.data).catch(err => {alert("请求(" + url + ")失败:\n" + err.message); console.log(err)})
  } else {
    axios.get(url, {
      params: params,
    }).then(res => data.value = res.data)
    .catch(err => {alert("请求(" + url + ")失败:\n" + err.message); console.log(err)})
  }
  return data
}

export function post(url, data) {
  axios.post(url, data).then(res => alert("请求成功")).catch(err => {alert("请求(" + url + ")失败:\n" + err.message); console.log(err)})
}

export function remove(url, params) {
  axios.delete(url, {
    params: params,
  }).then(res => alert("请求成功")).catch(err => {alert("请求(" + url + ")失败:\n" + err.message); console.log(err)})
}
export default {get, post, remove}