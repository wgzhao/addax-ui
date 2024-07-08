interface MainTableType {
  id: number;
  sysName: string;
  souSysid: string;
  souOwner: string;
  souTable: string;
  souFilter: string;
  souSplit: string;
  destSysid: string;
  destOwner: string;
  destTable: string;
  destSplit: string;
  bcreate: string;
  bupdate: string;
  realtimeInterval: string;
  realtimeTaskgroup: string;
  realtimeSouOwner: string;
  realtimeSouFilter: string;
  realtimeFixed: string;
  etlKind: string;
  realtimeIntervalRange: string;
  afterRetryPntype: string;
  afterRetryFixed: string;
  startTime: string;
  endTime: string;
  runtime: string;
  tid: string;
  runtimeAdd: string;
  remark: string;
}

export default MainTableType;
