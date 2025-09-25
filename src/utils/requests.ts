// import axios from "axios";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { notify } from '@/stores/notifier'
import { useAuthStore } from '@/stores/auth'

// axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
// axios.defaults.timeout = 5000;
console.log('mode = ' + import.meta.env.MODE)

// 后端统一返回结构
export interface ResponseData<T = any> {
  code: number
  message: string
  data: T
  [k: string]: any
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
        console.log(error)
        return Promise.reject(error) // 请求发生错误时直接抛出
      }
    )

    // 配置响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response.data
      },
      (error: AxiosError) => {
        // 统一处理非 2xx 状态码的错误
        let message = '请求发生错误';
        if (error.response) {
          // 服务器返回了错误响应
          const data: any = error.response;
          // 尝试从响应体中获取更具体的错误信息
          if (data && typeof data === 'string') {
            message = data;
          } else if (data && data.message) {
            message = data.message;
          } else {
            message = `请求错误: ${error.response.data.code} ${error.response.data.message}`;
          }
        } else if (error.request) {
          // 请求已发出，但没有收到响应
          message = '无法连接到服务器，请检查您的网络';
        } else {
          // 设置请求时触发了一个错误
          message = error.message;
        }
        console.error('API Error:', message, error);
        // 抛出错误，以便业务代码的 .catch() 块可以捕获
        return Promise.reject(new Error(message));
      }
    )
  }

  // GET 方法
  get<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
    return this.instance.get<ResponseData<T>>(url, { params, ...config }).then((r) => r as any)
  }

  // POST 方法
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
    return this.instance.post<ResponseData<T>>(url, data, { ...config }).then((r) => r as any)
  }

  // PUT 方法
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
    return this.instance.put<ResponseData<T>>(url, data, { ...config }).then((r) => r as any)
  }

  // DELETE 方法
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
    return this.instance.delete<ResponseData<T>>(url, { ...config }).then((r) => r as any)
  }

  // PATCH 方法
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
    return this.instance.patch<ResponseData<T>>(url, data, { ...config }).then((r) => r as any)
  }
}

export default new Requests(import.meta.env.VITE_API_BASE_URL)
