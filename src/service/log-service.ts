// 采集日志
import Requests from '@/utils/requests'

// find all files matching the pattern
const getLogFiles = (tid: string) => {
  return Requests.get(`/log/addaxLog/list/${tid}`)
}
// get the content of special file
const getContent = (id: number) => {
  return Requests.get(`/log/addaxLog/content/${id}`)
}

export default { getLogFiles, getContent }
