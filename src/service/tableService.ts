// 主表配置 - ODS 采集配置 API
import Requests from "@/utils/requests";

class TableService {
  prefix: string = "/table";
  // 0. 主表列表
  fetchTableList(page: number, pageSize: number, q: string, runStatus?: string, sortBy?: any) {
    return Requests.get(this.prefix, {
      page: page,
      pageSize: pageSize,
      q: q,
      status: runStatus,
      sortField: sortBy.sortField,
      sortOrder: sortBy.sortOrder
    });
  }

  // 0.1 主表列表搜索
  searchTableList(page: number, pageSize: number, q: string) {
    return Requests.get(this.prefix + "/search", {
      q: q,
      page: page,
      pageSize: pageSize
    });
  }

  // 1. 主表详情
  fetchTableDetail(tid: string) {
    return Requests.get(this.prefix + "/" + tid);
  }

  // 2. 表字段对比
  fetchFieldsCompare(tid: string) {
    return Requests.get(this.prefix + "/fieldCompare/" + tid);
  }

  // 3. 执行采集的命令列表

  fetchCmdList(tid: string) {
    return Requests.get(this.prefix + "/cmdList/" + tid);
  }

  // 4. 使用的表
  fetchTableUsed(sysid: string, tbl: string) {
    return Requests.get(this.prefix + "/scene", {
      tbl: tbl,
      sysId: sysid
    });
  }

  // 5. 保存
  save(data: any) {
    return Requests.post(this.prefix + "/save", data);
  }

  // 5. 采集的结果
  fetchAddaxResult(spname: string) {
    return Requests.get(this.prefix + "/addaxResult/" + spname);
  }

  // 6. 执行ETL
  execETL(tid: string, timeout = 60000) { // 默认60秒超时，对于ETL任务来说更合理
    return Requests.post("/etl/execute/" + tid, undefined, { timeout });
  }
  // 7. 批量更新采集表的状态和重试测试
  updateStatus(data: any) {
    return Requests.post(this.prefix + "/batchUpdateStatus", data);
  }
  // 8. 表更新

  updateSchema(flag: string | null) {
    if (flag == null) {
      // 默认更新逻辑
      return Requests.post(this.prefix + "/updateSchema");
    }
    else if (flag === "all") {
      // 强制更新逻辑
      return Requests.post(this.prefix + "/updateSchema", { mode: "all" });
    } else {
        return Requests.post(this.prefix + "/updateSchema", { tid: flag });
    }
  }

  delete(tid: string) {
    return Requests.delete(this.prefix + "/" + tid);
  }

  // 获取采集模板
  fetchAddaxJob(tid: string) {
    return Requests.get(this.prefix + "/addaxJob/" + tid);
  }
}

export default new TableService();
