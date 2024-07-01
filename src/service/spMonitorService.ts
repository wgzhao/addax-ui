import Requests from "@/utils/requests";

class SpMonitorService {
  prefix = "/sp";
  // SP计算的有效性检测结果
  fetchValidChkSp() {
    return Requests.get(this.prefix + "/validChkSp");
  }

  fetchPipeline(): Promise<any> {
    return Requests.get(this.prefix + "/pipeline");
  }

  fetchTotalExec(): Promise<any> {
    return Requests.get(this.prefix + "/totalExec");
  }

  fetchErrorTasks(): Promise<any> {
    return Requests.get(this.prefix + "/errorTasks");
  }
}

export default new SpMonitorService();
