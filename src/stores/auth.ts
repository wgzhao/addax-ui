import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '' as string | null, // 存储用户的 Token
    username: '' as string | null // 存储用户名
  }),
  actions: {
    // 更新 Token
    setToken(token: string) {
      this.token = token
      localStorage.setItem('authToken', token) // 持久化存储
    },
    setUserName(username: string) {
      this.username = username
      localStorage.setItem('authUsername', username) // 持久化存储用户名
    },
    // 加载持久化 Token
    loadTokenFromStorage() {
      const token = localStorage.getItem('authToken')
      if (token) {
        this.token = token
      }
      const username = localStorage.getItem('authUsername')
      if (username) {
        this.username = username
      }
    },
    // 退出登录
    logout() {
      this.token = null
      this.username = null
      localStorage.removeItem('authToken')
      localStorage.removeItem('authUsername')
    }
  }
})
