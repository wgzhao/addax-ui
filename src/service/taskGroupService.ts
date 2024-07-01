import Requests from "@/utils/requests";

class TaskGroupService {
  prefix = "/taskGroup";

  fetchTotalExec(): Promise<any> {
    return Requests.get(this.prefix + "/totalExec");
  }

  fetchFlagGenTime(): Promise<any> {
    return Requests.get(this.prefix + "/flagGenTime");
  }

  fetchDataServiceExecTime(): Promise<any> {
    return Requests.get(this.prefix + "/dataServiceExecTime");
  }

  fetchDataServiceExecTimeout(): Promise<any> {
    return Requests.get(this.prefix + "/dataServiceExecTimeout");
  }

  fetchTargetComplete(): Promise<any> {
    return Requests.get(this.prefix + "/targetComplete");
  }
}

export default new TaskGroupService();
