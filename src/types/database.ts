// src/types/database.ts

// TB_DICT 表的类型定义
export interface TbDict {
  dictCode: string // DICT_CODE
  dictName?: string // DICT_NAME
  dictClass?: string // DICT_CLASS
  remark?: string // REMARK
}

// TB_DICTIONARY 表的类型定义
export interface TbDictionary {
  entryCode: string // ENTRY_CODE
  entryValue: string // ENTRY_VALUE
  entryContent?: string // ENTRY_CONTENT
  remark?: string // REMARK
}

// TB_IMP_CHK 表的类型定义
export interface TbImpChk {
  chkKind?: string // CHK_KIND
  chkName?: string // CHK_NAME
  chkContent?: string // CHK_CONTENT
  updtDate?: Date // UPDT_DATE
  chkMobile?: string // CHK_MOBILE
  chkSendtype?: string // CHK_SENDTYPE
}

// TB_IMP_DS2 表的类型定义
export interface TbImpDs2 {
  taskGroup: string // TASK_GROUP
  destSysid: string // DEST_SYSID
  destOwner?: string // DEST_OWNER
  flag?: string // FLAG
  paramSou?: string // PARAM_SOU
  retryCnt?: number // RETRY_CNT
  startTime?: Date // START_TIME
  endTime?: Date // END_TIME
  dsId: string // DS_ID
  preSql?: string // PRE_SQL
  postSql?: string // POST_SQL
  colMap?: string // COL_MAP
  paralNum?: number // PARAL_NUM
  bupdate?: string // BUPDATE
  runtime?: number // RUNTIME
  preSh?: string // PRE_SH
  postSh?: string // POST_SH
  maxRuntime?: number // MAX_RUNTIME
  runFreq?: string // RUN_FREQ
  pnFixed?: string // PN_FIXED
  pnInterval?: number // PN_INTERVAL
  pnRange?: string // PN_RANGE
  pnType?: string // PN_TYPE
  remark?: string // REMARK
}

// TB_IMP_ETL 表的类型定义
export interface TbImpEtl {
  souSysid: string // SOU_SYSID
  souOwner: string // SOU_OWNER
  souTablename: string // SOU_TABLENAME
  souFilter?: string // SOU_FILTER
  destTablename: string // DEST_TABLENAME
  destPartKind?: string // DEST_PART_KIND
  flag?: string // FLAG
  paramSou?: string // PARAM_SOU
  bupdate?: string // BUPDATE
  bcreate?: string // BCREATE
  retryCnt?: number // RETRY_CNT
  startTime?: Date // START_TIME
  endTime?: Date // END_TIME
  runtime?: number // RUNTIME
  tid: string // TID
  souSplit?: string // SOU_SPLIT
  remark?: string // REMARK
  etlKind?: string // ETL_KIND
  bpreview?: string // BPREVIEW
  realtimeInterval?: number // REALTIME_INTERVAL
  realtimeTaskgroup?: string // REALTIME_TASKGROUP
  realtimeSouOwner?: string // REALTIME_SOU_OWNER
  realtimeFixed?: string // REALTIME_FIXED
  realtimeSouFilter?: string // REALTIME_SOU_FILTER
  realtimeIntervalRange?: string // REALTIME_INTERVAL_RANGE
  afterRetryFixed?: string // AFTER_RETRY_FIXED
  afterRetryPntype?: string // AFTER_RETRY_PNTYPE
  btdh?: string // BTDH
  runtimeAdd?: number // RUNTIME_ADD
}

// TB_IMP_DB 表的类型定义
export interface TbImpDb {
  dbName?: string // DB_NAME
  dbConstr?: string // DB_CONSTR
  dbIdEtl?: string // DB_ID_ETL
  dbUserEtl?: string // DB_USER_ETL
  dbPassEtl?: string // DB_PASS_ETL
  dbParalEtl?: number // DB_PARAL_ETL
  dbIdDs?: string // DB_ID_DS
  dbUserDs?: string // DB_USER_DS
  dbPassDs?: string // DB_PASS_DS
  dbParalDs?: number // DB_PARAL_DS
  dbStart?: string // DB_START
  dbStartType?: string // DB_START_TYPE
  dbJudgeSql?: string // DB_JUDGE_SQL
  dbJudgePre?: string // DB_JUDGE_PRE
  dbRemark?: string // DB_REMARK
  did?: string // DID
  bvalid?: string // BVALID
  conf?: string // CONF
}

// TB_IMP_ETL_SOUTAB 表的类型定义
export interface TbImpEtlSoutab {
  souDbConn: string // SOU_DB_CONN
  owner: string // OWNER
  tableName: string // TABLE_NAME
  columnName: string // COLUMN_NAME
  dataType?: string // DATA_TYPE
  dataLength?: number // DATA_LENGTH
  dataPrecision?: number // DATA_PRECISION
  dataScale?: number // DATA_SCALE
  columnId?: number // COLUMN_ID
  tableType?: string // TABLE_TYPE
  tabComment?: string // TAB_COMMENT
  colComment?: string // COL_COMMENT
  dwCltDate?: Date // DW_CLT_DATE
}

// TB_IMP_TBL_SOU 表的类型定义
export interface TbImpTblSou {
  tid: string // TID
  souDbConn?: string // SOU_DB_CONN
  souOwner?: string // SOU_OWNER
  souTablename?: string // SOU_TABLENAME
  columnNameOrig?: string // COLUMN_NAME_ORIG
  columnName?: string // COLUMN_NAME
  columnId?: number // COLUMN_ID
  dataType?: string // DATA_TYPE
  dataLength?: number // DATA_LENGTH
  dataPrecision?: number // DATA_PRECISION
  dataScale?: number // DATA_SCALE
  tblComment?: string // TBL_COMMENT
  colComment?: string // COL_COMMENT
  destType?: string // DEST_TYPE
  destTypeFull?: string // DEST_TYPE_FULL
  updtDate?: Date // UPDT_DATE
}

export interface ETLAndDS {
  sysKind: string
  sysid: string
  sysName: string
  dbConstr: string
  dbUser: string
}

export interface MainTable {
  id: number
  sysName: string
  souSysid: string
  souOwner: string
  souTable: string
  souFilter: string
  souSplit: string
  destSysid: string
  destOwner: string
  destTable: string
  destSplit: string
  bcreate: string
  bupdate: string
  realtimeInterval: string
  realtimeTaskgroup: string
  realtimeSouOwner: string
  realtimeSouFilter: string
  realtimeFixed: string
  etlKind: string
  realtimeIntervalRange: string
  afterRetryPntype: string
  afterRetryFixed: string
  startTime: string
  endTime: string
  runtime: string
  tid: string
  runtimeAdd: string
  remark: string
}
