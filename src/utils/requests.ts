import axios from "axios";

import router from "@/router";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.timeout = 5000
const userinfo = JSON.parse(localStorage.getItem('userinfo'))

if (userinfo != null) {
  const token = userinfo.token
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} 

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.status === 401) {
    router.push('/login')
    // router.push('/login')
  }
  return Promise.reject(error)
})

class Requests {
  get(url: string, params?: Map<any, any>) {
    return axios.get(url, {params: params} )
  }

  post(url: string, data: Map<any, any>) {
    return axios.post(url, data)
  }

  delete(url: string, params?: Map<any, any>) {
    return axios.delete(url, { params })
  }

  put(url: string, data: Map<any, any>) {
    return axios.put(url, data)
  }

}
// export function get(url, params) {
//   const data = ref()
//   if (params === undefined ) {
//     axios.get(url).then(res => data.value = res.data).catch(err => {alert("请求(" + url + ")失败:\n" + err.message); console.log(err)})
//   } else {
//     axios.get(url, {
//       params: params,
//     }).then(res => data.value = res.data)
//     .catch(err => {alert("请求(" + url + ")失败:\n" + err.message); console.log(err)})
//   }
//   return data
// }

// export function post(url, data) {
//   axios.post(url, data).then(res => alert("请求成功")).catch(err => {alert("请求(" + url + ")失败:\n" + err.message); console.log(err)})
// }

// export function remove(url, params) {
//   axios.delete(url, {
//     params: params,
//   }).then(res => alert("请求成功")).catch(err => {alert("请求(" + url + ")失败:\n" + err.message); console.log(err)})
// }
export const requests =  new Requests()