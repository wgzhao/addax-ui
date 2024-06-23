import Requests from "@/utils/requests";

class RealtimeService {
    prefix = "/realtime";
    // 实时任务执行情况
    fetchPlanAll() {
        return Requests.get(this.prefix + "/planAll");
    }
}

export default new RealtimeService();