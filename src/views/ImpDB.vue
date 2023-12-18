<template>
    <div class="container text-left">
        <div class="row">
            <div class="col-12">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="搜索">
                    <div class="input-group-append">
                        <button type="button" class="btn btn-primary">搜索</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <button type="button" class="btn btn-success">增加一行</button>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12 col-md-7">
                <div class="table-responsive">
                <DataTable class="display" options = "{data-page-length: '25'}">
                    <thead>
                        <tr>
                            <th>名称</th>
                            <th>采集编号</th>
                            <th>服务编号</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="d in impdbs">
                            <tr>
                                <td><a href="#" @click="dataOp(d.id, 'show')">{{ d.dbName }}</a></td>
                                <td>{{ d.dbIdEtl }}</td>
                                <td>{{ d.dbIdDs }}</td>
                                <td>
                                    <a class="btn btn-xs btn-warning" @click="dataOp(d.id, 'edit')">编辑</a>
                                    <a href="#" class="btn btn-xs btn-info">使用场景</a>
                                    <a href="#" class="btn btn-xs btn-info">探索源库</a>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </DataTable>
            </div>
            </div>

            <!-- form -->

            <div class="col-md-5">
                <div class="card">
                    <div class="card-header text-light bg-dark">
                        <span v-show="mode === 'add'">新增数据源</span>
                        <span v-show="mode == 'edit'">编辑数据源</span>
                        <span v-show="mode == 'show'">数据源详情</span>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="saveData">
                            <div class="input-group mb-3">
                                <span class="input-group-text">数据库名称</span>
                                <input v-model="form.dbName" class="form-control" />
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">数据源链接串</span>
                                <input v-model="form.dbConstr" id="constr" class="form-control" />
                            </div>

                            <span>采集信息</span>
                            <div class="input-group mb-3">
                                <span class="input-group-text">采集编号</span>
                                <input v-model="form.dbIdEtl" class="form-control" />
                                <span class="input-group-text">并发数</span>
                                <input v-model="form.dbParalEtl" class="form-control" />
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">用户名</span>
                                <input v-model="form.dbUserEtl" class="form-control" />
                                <span class="input-group-text">密码</span>
                                <input v-model="form.dbPassEtl" class="form-control" />
                            </div>

                            <span>数据服务信息</span>
                            <div class="input-group mb-3">
                                <span class="input-group-text">采集编号</span>
                                <input v-model="form.dbIdDs" class="form-control" />
                                <span class="input-group-text">并发数</span>
                                <input v-model="form.dbParalDs" class="form-control" />
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">用户名</span>
                                <input v-model="form.dbUserDs" class="form-control" />
                                <span class="input-group-text">密码</span>
                                <input v-model="form.dbPassDs" class="form-control" />
                            </div>

                            <span>采集扩展信息</span>
                            <div class="input-group mb-3">
                                <span class="input-group-text">启动类型</span>
                                <input v-model="form.dbStartType" class="form-control" />
                                <span class="input-group-text">启动时间</span>
                                <input v-model="form.dbStart" class="form-control" />
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">判断脚本</span>
                                <input v-model="form.dbJudgeSql" class="form-control" />
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">采集前置脚本</span>
                                <input v-model="form.dbJudgePre" class="form-control" />
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">其他配置</span>
                                <textarea v-model="form.conf" class="form-control" rows="6"></textarea>
                            </div>


                            <div class="input-group mb-3">
                                <span class="input-group-text">备注信息</span>
                                <textarea v-model="form.dbRemark" class="form-control" rows="6"></textarea>
                            </div>

                            <div class="form-group">
                                <button type="submit" :disabled="mode == 'show'" class="btn btn-primary">
                                    <span v-if="mode == 'add'">Add</span>
                                    <span v-else>Save</span>
                                </button>
                                <button type="reset" class="btn btn-warning">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
// import Grid from 'gridjs-vue'
import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net';
import DataTablesCore from 'datatables.net-bs5';
import 'datatables.net-select';
import 'datatables.net-responsive';
 
DataTable.use(DataTablesCore);

export default {
    data() {
        return {
            impdbs: [],
            //显示模式： show 显示，edit 编辑， add 新建
            mode: 'show',
            addMode: false,
            impdb: {},
            form: {}
        }
    },
    components: {
        //  Grid
    },
    created() {
        this.retrieveImpDB();
    },

    methods: {
        retrieveImpDB() {
            axios.get("/impdb/list")
                .then(resp => {
                    this.impdbs = resp.data
                    return resp
                })
                .catch(error => {
                    return error
                });
        },

        dataOp(id, flag) {
            this.mode = flag
            axios.get("/impdb/detail/" + id)
                .then(resp => {
                    this.form = resp.data
                    return resp
                })
                .catch(error => {
                    return error
                });
        },

        addDataSource() {
            this.mode = 'add'
            this.form = {}
        },

        saveData() {
            console.log(this.mode)
            if (this.mode == 'add' || this.mode == 'edit') {
                axios.post('/save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.form)
                }).then(resp => resp.json());

                this.form = ''

                // get data agtain, it's lazy
                this.retrieveImpDB()
            }
        }
    }
}
</script>


<style>
@import 'datatables.net-bs5';
</style>
