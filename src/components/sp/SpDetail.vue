<template>
    <!-- 与 SP 详情 -->
    <!-- data sample
        {
            "spOwner": "edw",
            "spName": "agr_amc_client",
            "spId": "059B69186AEA1287E0631202AFBCC057",
            "flag": "E",
            "runFreq": "D",
            "startTime": "2023-09-18 04:17:40",
            "endTime": "2023-09-18 04:17:50",
            "retryCnt": 0,
            "runtime": 125,
            "taskGroup": null,
            "paramSou": "C",
            "remark": null,
            "realtimeTaskgroup": null,
            "pnType": null,
            "pnFixed": null,
            "pnInterval": null,
            "pnRange": null
        }

        needs data sample 
        {
            "NEED_SOU": "PR",
            "NEED_SP": null,
            "SP_DEST": null,
            "SP_ALLNEXT": null,
            "THROUGH_NEED_SP": null,
            "SP_ALLTABS": "ODSPR.PRO_SERVE\n",
            "THROUGH_NEED_SOU": null
        }
    -->
    <div class="card">
        <div class="card-header text-light bg-dark">
            HADOOP存储过程主表配置
        </div>
        <div class="card-body">
            <form @submit.prevent="saveData">
                <div class="input-group mb-1">
                    <span class="input-group-text">SP 用户</span>
                    <input v-model="form.spOwner" class="form-control" />
                    <span class="input-group-text">SP 名称</span>
                    <input v-model="form.spName"  class="form-control" />
                </div>
                <div class="input-group mb-1">
                    <span class="input-group-text">参数组</span>
                    <input v-model="form.paramSou" class="form-control" />
                    <span class="input-group-text">运行频率</span>
                    <input v-model="form.runFreq" class="form-control" />
                </div>
                <div class="input-group mb-1">
                    <span class="input-group-text">状态</span>
                    <input v-model="form.flag" class="form-control" />
                    <span class="input-group-text">剩余次数</span>
                    <input v-model="form.retryCnt" class="form-control" />
                </div>

                <div class="input-group mb-1">
                    <span class="input-group-text">前置实时采集任务组</span>
                    <input v-model="form.realtimeTaskgroup" class="form-control" />
                    <span class="input-group-text">任务组</span>
                    <input v-model="form.taskGroup" class="form-control" />
                </div>
                
                <span></span>

                <div class="input-group mb-3">
                    <span class="input-group-text">计划类型</span>
                    <input v-model="form.pnType" class="form-control" />
                    <span class="input-group-text">计划定点时间</span>
                    <input v-model="form.pnFixed" class="form-control" />
                </div>

                <div class="input-group mb-1">
                    <span class="input-group-text">计划间隔时间</span>
                    <input v-model="form.pnInterval" class="form-control" />
                    <span class="input-group-text">计划间隔时间范围</span>
                    <input v-model="form.pnRange" class="form-control" />
                </div>

                <span></span>

                <div class="input-group mb-3">
                    <span class="input-group-text">直接前置源</span>
                    <textarea v-model="needs.NEED_SOU" class="form-control" rows="2"></textarea>
                    <span class="input-group-text">穿透后所有前置源</span>
                    <textarea v-model="needs.THROUGH_NEED_SOU" class="form-control" rows="2"></textarea>
                </div>
                <div class="input-group mb-1">
                    <span class="input-group-text">直接前置SP</span>
                    <textarea v-model="needs.NEED_SP" class="form-control" rows="2"></textarea>
                    <span class="input-group-text">穿透后所有前置SP</span>
                    <textarea v-model="needs.THROUGH_NEED_SP" class="form-control" rows="4"></textarea>
                </div>

                <div class="input-group mb-1">
                    <span class="input-group-text">脚本涉及表</span>
                    <textarea v-model="needs.SP_ALLTABS" class="form-control" rows="2"></textarea>
                    <span class="input-group-text">脚本生成表</span>
                    <textarea v-model="needs.SP_DEST" class="form-control" rows="2"></textarea>
                </div>

                <div class="input-group mb-1">
                    <span class="input-group-text">穿透后所有下游</span>
                    <textarea v-model="needs.SP_ALLNEXT" class="form-control" rows="4"></textarea>
                </div>

                <span></span>

                <div class="input-group mb-3">
                    <span class="input-group-text">备注</span>
                    <textarea v-model="form.remark" class="form-control" rows="4"></textarea>
                </div>

                <span></span>

                <div class="input-group mb-1">
                    <span class="input-group-text">开始时间</span>
                    <input v-model="form.startTime" class="form-control" />
                    <span class="input-group-text">结束时间</span>
                    <input v-model="form.endTime" class="form-control" />
                </div>

                <div class="input-group mb-1">
                    <span class="input-group-text">运行耗时</span>
                    <input v-model="form.runtime" class="form-control" />
                    <span class="input-group-text">SP编号</span>
                    <input v-model="form.spId" class="form-control" />
                </div>
                
                <div class="form-group">
                    <button type="submit" class="btn btn-primary">
                        <span>Save</span>
                    </button>
                    <button type="reset" class="btn btn-warning">Cancel</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    props: ['form', 'header', 'needs']
}
</script>
<style>
.input-group {
    display: flex;
    justify-content: space-between;
  }
</style>