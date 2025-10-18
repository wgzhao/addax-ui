import Requests, { ResponseData } from '@/utils/requests'

export interface ConfigItem {
  item_key: string
  item_value: string
  remark: string
}

export interface HiveServer2Config {
  url: string
  user: string
  password: string
  driverPath: string
  driverClassName?: string
}

export interface SystemConfig {
  HIVE_CLI: string
  HDFS_STORAGE_FORMAT: string
  HDFS_COMPRESS_FORMAT: string
  ADDAX: string
  HIVE_SERVER2: string // JSON string
  HDFS_PREFIX: string
  SWITCH_TIME: string
  CONCURRENT_LIMIT: string // 后端返回字符串格式
  QUEUE_SIZE: string // 后端返回字符串格式
}

class SettingsService {
  baseUrl = 'settings'

  /**
   * 获取所有系统配置
   */
  async getSettings(): Promise<SystemConfig> {
    try {
      const response = await Requests.get<SystemConfig>(`${this.baseUrl}/sys-config`)

      // 由于 Requests 工具已经返回了 response.data，
      // 我们需要检查返回的数据结构
      if (response && response.data) {
        return response.data
      } else if (response) {
        return response as unknown as SystemConfig
      }

      throw new Error('无效的响应格式')
    } catch (error) {
      console.error('获取配置失败:', error)
      throw error
    }
  }

  /**
   * 获取特定配置项
   */
  async getConfigByKey(key: string): Promise<ConfigItem> {
    const response = await Requests.get<ConfigItem>(`${this.baseUrl}/config/${key}`)
    return response.data
  }

  /**
   * 保存系统配置
   */
  async saveSettings(config: SystemConfig): Promise<boolean> {
    const response = await Requests.post<boolean>(`${this.baseUrl}/config`, config)
    return response.data
  }

  /**
   * 更新单个配置项
   */
  async updateConfigItem(item: ConfigItem): Promise<boolean> {
    const response = await Requests.put<boolean>(`${this.baseUrl}/config/${item.item_key}`, item)
    return response.data
  }

  /**
   * 批量更新配置项
   */
  async batchUpdateConfig(items: ConfigItem[]): Promise<boolean> {
    const response = await Requests.put<boolean>(`${this.baseUrl}/config/batch`, items)
    return response.data
  }

  /**
   * 测试HiveServer2连接
   */
  testHiveConnection(config: HiveServer2Config): Promise<any> {
    return Requests.post(`${this.baseUrl}/test-hive-connect`, config, {
      timeout: 10000
    }) as unknown as Promise<any>
  }

  /**
   * 验证Addax程序目录
   */
  async validateAddaxPath(path: string): Promise<boolean> {
    const response = await Requests.post<boolean>(`${this.baseUrl}/validate/addax`, { path })
    return response.data
  }

  /**
   * 获取系统默认配置
   */
  async getDefaultConfig(): Promise<SystemConfig> {
    const response = await Requests.get<SystemConfig>(`${this.baseUrl}/config/default`)
    return response.data
  }

  /**
   * 重置配置为默认值
   */
  async resetToDefault(): Promise<boolean> {
    const response = await Requests.post<boolean>(`${this.baseUrl}/config/reset`)
    return response.data
  }

  /**
   * 导出配置
   */
  async exportConfig(): Promise<Blob> {
    const response = await Requests.get(`${this.baseUrl}/config/export`, undefined, {
      responseType: 'blob'
    })
    return response as any // 对于blob类型的特殊处理
  }

  /**
   * 导入配置
   */
  async importConfig(file: File): Promise<boolean> {
    const formData = new FormData()
    formData.append('file', file)
    const response = await Requests.post<boolean>(`${this.baseUrl}/config/import`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  }
}

export default new SettingsService()
