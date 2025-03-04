/**
 * SpDetail interface represents the structure of a stored procedure detail
 */
export interface SpDetail {
  spOwner: string;
  spName: string;
  spId: string;
  flag: string;
  runFreq: string;
  startTime: string;
  endTime: string;
  retryCnt: number;
  runtime: number;
  taskGroup: string | null;
  paramSou: string;
  remark: string | null;
  realtimeTaskgroup: string | null;
  pnType: string | null;
  pnFixed: string | null;
  pnInterval: string | null;
  pnRange: string | null;
}

/**
 * SpNeedsDetail interface represents the structure of a stored procedure needs/dependencies
 */
export interface SpNeedsDetail {
  NEED_SOU: string | null;
  NEED_SP: string | null;
  SP_DEST: string | null;
  SP_ALLNEXT: string | null;
  THROUGH_NEED_SP: string | null;
  SP_ALLTABS: string | null;
  THROUGH_NEED_SOU: string | null;
}
