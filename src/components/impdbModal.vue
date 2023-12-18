<template>
        <!-- modal -->
        <div class="modal fade" aria-hidden="true" id="dataShow" aria-labelledby="dataShowLabel" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <span v-show="mode === 'add'">新增数据源</span>
                        <span v-show="mode == 'edit'">编辑数据源</span>
                        <span v-show="mode == 'show'">数据源详情</span>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                            <form @submit.prevent="saveData">
                                <div class="input-group mb-3">
                                    <span class="input-group-text">数据库名称</span>
                                    <input v-model="form.dbName" :readonly="mode == 'show'" class="form-control" />
                                </div>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">数据源链接串</span>
                                    <input v-model="form.dbConstr" :readonly="mode == 'show'" id="constr"
                                        class="form-control" />
                                </div>

                                <span>采集信息</span>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">采集编号</span>
                                    <input v-model="form.dbIdEtl" :readonly="mode == 'show'" class="form-control" />
                                    <span class="input-group-text">并发数</span>
                                    <input v-model="form.dbParalEtl" :readonly="mode == 'show'" class="form-control" />
                                </div>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">用户名</span>
                                    <input v-model="form.dbUserEtl" :readonly="mode == 'show'" class="form-control" />
                                    <span class="input-group-text">密码</span>
                                    <input v-model="form.dbPassEtl" :readonly="mode == 'show'" class="form-control" />
                                </div>

                                <span>数据服务信息</span>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">采集编号</span>
                                    <input v-model="form.dbIdDs" :readonly="mode == 'show'" class="form-control" />
                                    <span class="input-group-text">并发数</span>
                                    <input v-model="form.dbParalDs" :readonly="mode == 'show'" class="form-control" />
                                </div>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">用户名</span>
                                    <input v-model="form.dbUserDs" :readonly="mode == 'show'" class="form-control" />
                                    <span class="input-group-text">密码</span>
                                    <input v-model="form.dbPassDs" :readonly="mode == 'show'" class="form-control" />
                                </div>

                                <span>采集扩展信息</span>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">启动类型</span>
                                    <input v-model="form.dbStartType" :readonly="mode == 'show'" class="form-control" />
                                    <span class="input-group-text">启动时间</span>
                                    <input v-model="form.dbStart" :readonly="mode == 'show'" class="form-control" />
                                </div>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">判断脚本</span>
                                    <input v-model="form.dbJudgeSql" :readonly="mode == 'show'" class="form-control" />
                                </div>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">采集前置脚本</span>
                                    <input v-model="form.dbJudgePre" :readonly="mode == 'show'" class="form-control" />
                                </div>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">其他配置</span>
                                    <textarea v-model="form.conf" :readonly="mode == 'show'" class="form-control"
                                        rows="6"></textarea>
                                </div>

                                <div class="input-group mb-3">
                                    <span class="input-group-text">备注信息</span>
                                    <textarea v-model="form.dbRemark" :readonly="mode == 'show'" class="form-control"
                                        rows="6"></textarea>
                                </div>
                                
                                <div class="form-group" v-if="mode != 'show'">
                                    <button type="submit" :disabled="mode == 'show'" class="btn btn-primary">
                                        <span v-if="mode == 'add'">Add</span>
                                        <span v-else>Save</span>
                                    </button>
                                    <button type="reset" class="btn btn-warning">Cancel</button>
                                </div>
                            </form>
                </div>
                <!-- <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["form", "mode"],
}
</script>