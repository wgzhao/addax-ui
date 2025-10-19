// import axios from "axios";
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig
} from 'axios'
import { notify } from '@/stores/notifier'
import { useAuthStore } from '@/stores/auth'

// axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
// axios.defaults.timeout = 5000;
// console.log('mode = ' + import.meta.env.MODE)

// const requests = new Requests(import.meta.env.VITE_API_BASE_URL, 5000, authStore)

class Requests {
  private instance: AxiosInstance
  private authStore: ReturnType<typeof useAuthStore>

  constructor(baseURL: string, timeout = 5000, authStore: ReturnType<typeof useAuthStore>) {
    // 创建 Axios 实例
    this.authStore = authStore
    this.instance = axios.create({
      baseURL,
      timeout
    })

    // 配置请求拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = this.authStore.token // 从 Pinia Store 获取 Token
        if (token) {
          config.headers.Authorization = `Bearer ${token}` // 在请求头中添加 Authorization
        }

        return config
      },
      (error) => {
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
        let message = '请求发生错误'
        if (error.response) {
          // 服务器返回了错误响应
          const data: any = error.response.data
          // 尝试从响应体中获取更具体的错误信息
          if (data && typeof data === 'string') {
            message = data
          } else if (data && data.message) {
            message = data.message
          } else {
            message = `请求错误: ${error.response.status} ${error.response.statusText}`
          }
        } else {
          // 设置请求时触发了一个错误
          message = error.message
        }
        // notify(message, 'error')
        // 抛出错误，以便业务代码的 .catch() 块可以捕获
        return Promise.reject(new Error(message))
      }
    )
  }

  get<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get<T>(url, { params, ...config }) as Promise<T>
  }

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.post<T>(url, data, { ...config }) as Promise<T>
  }

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.put<T>(url, data, { ...config }) as Promise<T>
  }

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete<T>(url, { ...config }) as Promise<T>
  }

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.patch<T>(url, data, { ...config }) as Promise<T>
  }
}

const authStore = useAuthStore()

export default new Requests(import.meta.env.VITE_API_BASE_URL, 5000, authStore)
