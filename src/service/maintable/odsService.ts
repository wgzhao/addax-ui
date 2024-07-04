// 主表配置 - ODS 采集配置 API
import Requests from "@/utils/requests";
import { c } from "unplugin-vue-router/options-EuMjkncO";

class OdsService {
  prefix: string = "/maintable/ods";
  // 0. 主表列表
  fetchOdsList(page: number, pageSize: number, q: string) {
    return Requests.get(this.prefix, {
      page: page,
      pageSize: pageSize,
      q: q
    });
  }

  // 0.1 主表列表搜索
  searchOdsList(page: number, pageSize: number, q: string) {
    return Requests.get(this.prefix + "/search", {
      q: q,
      page: page,
      pageSize: pageSize
    });
  }

  // 1. 主表详情
  fetchOdsDetail(tid: string) {
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
  save(data: Map<string, string>) {
    return Requests.post(this.prefix + "/save", data);
  }

  // 5. 采集的结果
  fetchAddaxResult(spname: string) {
    return Requests.get(this.prefix + "/addaxResult/" + spname);
  }

  // 6. 执行ETL
  execETL(ctype: string) {
    return Requests.post(this.prefix + "/execETL/", { ctype: ctype });
  }
}

export default new OdsService();
