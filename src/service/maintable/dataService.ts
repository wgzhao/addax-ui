import Requests from "@/utils/requests";

class DataService {
  prefix: string = "/maintable/dataService";
  async list() {
    return Requests.get(this.prefix + "/list");
  }
}

export default new DataService();
