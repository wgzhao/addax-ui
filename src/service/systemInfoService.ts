import Requests from "@/utils/requests";

class SystemInfoService {
  baseUrl = "systemInfo";
  getEtlAndDs(q?: string) {
    const params  = q? new URLSearchParams({q: q}): undefined;
    return Requests.get(this.baseUrl + "/etlAndDs", params);
  }

  getEtlInfo(q?: string) {
    const params  = q? new URLSearchParams({q: q}): undefined;
    return Requests.get(this.baseUrl + "/etlInfo", params);
  }

  getDsInfo(q?: string) {
    const params  = q? new URLSearchParams({q: q}): undefined;
    return Requests.get(this.baseUrl + "/dsInfo", params);
  }
}

export default new SystemInfoService();
