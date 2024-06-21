// 主表配置 - ODS 采集配置 API
import { ref } from "vue";
import Requests from "@/utils/requests";

const apiPrefix = ref("/maintable/ods");

class OdsService {
    // 0. 主表列表
    fetchOdsList(page: number, pageSize: number, q: string) {
        return Requests.get(apiPrefix.value, {
            page: page,
            pageSize: pageSize,
            q: q,
        });
    }

    // 0.1 主表列表搜索
    searchOdsList(page: number, pageSize: number, q: string) {
        return Requests.get(apiPrefix.value + "/search", {
            q: q,
            page: page,
            pageSize: pageSize,
        });
    }

    // 1. 主表详情
    fetchOdsDetail(tid: string) {
        return Requests.get(apiPrefix.value + "/" + tid);
    }

    // 2. 表字段对比
    fetchFieldsCompare(tid: string) {
        return Requests.get(apiPrefix.value + "/fieldCompare/" + tid);
    }

    // 3. 执行采集的命令列表

    fetchCmdList(tid: string) {
        return Requests.get(apiPrefix.value + "/cmdlist/" + tid);
    }

    // 4. 使用的表
    fetchTableUsed(sysid: string, tbl: string) {
        return Requests.get(apiPrefix.value + "/scene", {
            tbl: tbl,
            sysId: sysid,
        });
    }

    // 5. 保存
    save(data: Map<string, string>) {
        return Requests.post(apiPrefix.value + "/save", data);
    }

    // 5. 采集的结果
    fetchAddaxResult(spname: string) {
        return Requests.get(apiPrefix.value + "/addaxResult/" + spname);
    }
}

export default new OdsService();
