// 采集监控接口
import { ref } from "vue";
import Requests from "@/utils/requests";

const apiPrefix = ref("/etl");

class EtlService {
    // 数据源完成情况
    fetchAccomplishList() {
        // fetch data via api and return
        const d = ref([]);
        Requests.get(apiPrefix.value + "/accomplishList").then((res) => {
            d.value = res.data;
            return res.data;
        });
        return d;
    }

    // 特殊任务提醒：错误、耗时过长、有重试、有拒绝行
    fetchSpecialTask() {
        const d = ref([]);
        Requests.get(apiPrefix.value + "/specialTask").then((res) => {
            d.value = res.data;
            return res.data;
        });
        return d;
    }

    // 采集拒绝行信息
    fetchRejectTask() {
        const d = ref([]);
        Requests.get(apiPrefix.value + "/rejectTask").then((res) => {
            d.value = res.data;
            return res.data;
        });
        return d;
    }

    // 日间实时采集任务执行情况
    fetchRealtimeTask() {
        const d = ref([]);
        Requests.get(apiPrefix.value + "/realtimeTask").then((res) => {
            d.value = res.data;
            return res.data;
        });
        return d;
    }
}
export const etlService = new EtlService();
