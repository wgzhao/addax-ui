// SP 计算服务
import { ref } from "vue";
import Requests from "@/utils/requests";

// 主表 SP 计算的 API 前置
const mainSpApi = ref("/maintable/sp");

class SpService {
  // 0. 主表列表
  fetchSpMainList() {
    return Requests.get(mainSpApi.value + "/list");
  }

  // 0.1 主表详情
  fetchSpMainDetail(spId: string) {
    return Requests.get(mainSpApi.value + "/detail/" + spId);
  }

  // 1. 穿透表信息
  fetchSpThrough(spId: string) {
    return Requests.get(mainSpApi.value + "/through/" + spId);
  }

  // 2. 命令列表
  fetchSpCmdList(spId: string) {
    return Requests.get(mainSpApi.value + "/cmdlist/" + spId);
  }

  // 3. 使用场景
  fetchSpSceneList(tbl: string, spId: string) {
    return Requests.get(mainSpApi.value + "/scene", {
      params: {
        tbl: tbl,
        sysId: spId,
      },
    });
  }

  // 4. 计算溯源
  fetchSpLineage(spId: string) {
    return Requests.get(mainSpApi.value + "/lineage/" + spId);
  }

  // 5. 前置情况
  fetchSpPrequires(spId: string) {
    return Requests.get(mainSpApi.value + "/prequires/" + spId);
  }
}
export const spService = new SpService();
