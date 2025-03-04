// import axios from "axios";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useAuthStore } from '@/stores/auth';

// axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
// axios.defaults.timeout = 5000;
console.log("mode = " + import.meta.env.MODE);

interface ResponseData<T> {
  code: number;
  message: string;
  data: T;
}

class Requests {
  private instance: AxiosInstance;

  constructor(baseURL: string, timeout = 5000) {
    // 创建 Axios 实例
    this.instance = axios.create({
      baseURL,
      timeout
    });

    // 配置请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        const authStore = useAuthStore();
        const token = authStore.token; // 从 Pinia Store 获取 Token
        if (token) {
          config.headers.Authorization = `Bearer ${token}`; // 在请求头中添加 Authorization
        }

        return config;
      },
      (error) => {
        return Promise.reject(error); // 请求发生错误时直接抛出
      }
    );

    // 配置响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        if (response.data.code !== 0) {
          alert(response.data.message);
          return Promise.reject(response.data.message);
        }
        return response.data; // 根据实际需要，可以直接返回 data，简化业务层操作
      },
      (error) => {
        // 处理响应错误
        if (error.response?.status === 401) {
          const authStore = useAuthStore();
          authStore.logout(); // Token 失效时，自动登出
          window.location.href = '/login'; // 跳转至登录页
        }
        const msg = error.response?.message || "服务器发生未知错误";
     
          // alert(msg);
          return Promise.reject(error);
          // snackbar.showMessage(message);
        
        // return Promise.reject(error); // 将错误内容抛出给业务逻辑去处理
      }
    );

  }

  // GET 方法
  get<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
    return this.instance.get<T>(url, { params, ...config });
  }

  // POST 方法
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
    return this.instance.post<T>(url, data, { ...config });
  }

  // PUT 方法
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
    return this.instance.put<T>(url, data, { ...config });
  }

  // DELETE 方法
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
    return this.instance.delete<T>(url, { ...config });
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
export default new Requests(import.meta.env.VITE_API_BASE_URL);
