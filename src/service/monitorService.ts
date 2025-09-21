// 采集监控接口
import Requests from '@/utils/requests'

class MonitorService {
  prefix = '/monitor'
  d = []
  // 数据源完成情况
  fetchAccomplishList() {
    // fetch data via api and return
    return Requests.get(this.prefix + '/accomplishList')
  }

  // 特殊任务提醒：错误、耗时过长、有重试、有拒绝行
  fetchSpecialTask() {
    return Requests.get(this.prefix + '/specialTask')
  }

  // 采集拒绝行信息
  fetchRejectTask() {
    return Requests.get(this.prefix + '/rejectTask')
  }
}
export const monitorService = new MonitorService()
