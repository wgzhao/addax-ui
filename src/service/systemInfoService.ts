import Requests from "@/utils/requests";

class SystemInfoService {
    baseUrl = "systemInfo";
    getEtlAndDs(q?: string) {
        return Requests.get(this.baseUrl + "/etlAndDs", { q: q });
    }

    getEtlInfo(q?: string) {
        return Requests.get(this.baseUrl + "/etlInfo", { q: q });
    }

    getDsInfo(q?: string) {
        return Requests.get(this.baseUrl + "/dsInfo", { q: q });
    }
}

export default new SystemInfoService();
