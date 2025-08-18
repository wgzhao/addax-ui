// import axios from "axios";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { notify } from '@/stores/notifier';
import { useAuthStore } from '@/stores/auth'

// axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
// axios.defaults.timeout = 5000;
console.log('mode = ' + import.meta.env.MODE)

// 后端统一返回结构
export interface ResponseData<T = any> {
  code: number;
  message: string;
  data: T;
  [k: string]: any;
}

class Requests {
  private instance: AxiosInstance

  constructor(baseURL: string, timeout = 5000) {
    // 创建 Axios 实例
    this.instance = axios.create({
      baseURL,
      timeout
    })

    // 配置请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        const authStore = useAuthStore()
        const token = authStore.token // 从 Pinia Store 获取 Token
        if (token) {
          config.headers.Authorization = `Bearer ${token}` // 在请求头中添加 Authorization
        }

        return config
      },
      (error) => {
        console.log(error);
        return Promise.reject(error) // 请求发生错误时直接抛出
      }
    )

    // 配置响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        const resp: ResponseData<any> = response.data;
        if (typeof resp.code !== 'undefined' && resp.code !== 0) {
          notify(resp.message || '请求失败', 'error');
          // 统一包装为 rejected Promise
          return Promise.reject(resp.message);
        }
        // 将处理结果重新赋回以保持 AxiosResponse 形状
        (response as any).data = resp;
        return response;
      },
      (error) => {
        // 处理响应错误
        if (error.response?.status === 401) {
          const authStore = useAuthStore()
          authStore.logout() // Token 失效时，自动登出
          window.location.href = '/login' // 跳转至登录页
        }

        console.log("response error: ", error.message);

        // alert(msg);
  return Promise.reject(error)
        // snackbar.showMessage(message);

        // return Promise.reject(error); // 将错误内容抛出给业务逻辑去处理
      }
    )
  }

  // GET 方法
  get<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
  return this.instance.get<ResponseData<T>>(url, { params, ...config }).then(r => r.data as any);
  }

  // POST 方法
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
  return this.instance.post<ResponseData<T>>(url, data, { ...config }).then(r => r.data as any);
  }

  // PUT 方法
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
  return this.instance.put<ResponseData<T>>(url, data, { ...config }).then(r => r.data as any);
  }

  // DELETE 方法
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
  return this.instance.delete<ResponseData<T>>(url, { ...config }).then(r => r.data as any);
  }
}

export default new Requests(import.meta.env.VITE_API_BASE_URL)
