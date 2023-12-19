<template>
    <!-- Page Heading -->
    <h1 class="h3 mb-1 text-gray-800">数据源管理</h1>
    <p class="mb-4">这里描述数据源管理的基本内容</p>
    <!-- Content Row -->
    <div class="d-inline-flex p-2">
        <div col="col-3">
            <button class="btn btn-xs btn-primary" >新增数据源</button>
        </div>
        <div col="col-3">
            <div class="input-group">
                <input type="text" class="form-control bg-light border-0 small" v-model="searchValue" placeholder="Search for..."
                    aria-label="Search" aria-describedby="basic-addon2">
                <div class="input-group-append">
                    <button class="btn btn-primary" type="button">
                        <i class="fas fa-search fa-sm"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- <div class="row">
        <div class="col-12">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="搜索">
                <div class="input-group-append">
                    <button type="button" class="btn btn-primary">搜索</button>
                </div>
            </div>
        </div>
    </div> -->
    <div class="row">
        <div class="col-auto">
            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>名称</th>
                            <th>采集编号</th>
                            <th>服务编号</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="d in filterImpdbs">
                            <tr>
                                <td>{{ d.dbName }}</td>
                                <td>{{ d.dbIdEtl }}</td>
                                <td>{{ d.dbIdDs }}</td>
                                <td>
                                    <a class="btn btn-xs btn-info" @click="dataOp(d.id, 'show')">详情</a>
                                    <a class="btn btn-xs btn-warning" @click="dataOp(d.id, 'edit')">编辑</a>
                                    <a href="#" class="btn btn-xs btn-info">使用场景</a>
                                    <a href="#" class="btn btn-xs btn-info">探索源库</a>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- form -->

        <div class="col-auto">
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
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            impdbs: [],
            //显示模式： show 显示，edit 编辑， add 新建
            mode: 'show',
            addMode: false,
            impdb: {},
            form: {},
            searchValue: '',
        }
    },
    components: {
        //  Grid
    },

    mounted() {
        this.retrieveImpDB();
    },

    computed: {

            filterImpdbs() {
                const filterImpdbs = this.searchValue === ""
                    ? this.impdbs
                    : this.impdbs.filter(wo => Object.values(wo).join("").indexOf(this.searchValue) !== -1);
                return filterImpdbs;
            },
        // filterImpdbs: function() {
        //     console.log(this.mode);
        //     // if (this.searchValue === '') {
        //     //     return this.impdbs.length >0 ? this.impdbs: this.retrieveImpDB()
        //     // } else {
        //     //     return this.impdbs.filter(function(item) {
        //     //         console.log(this.searchValue);
        //     //     })
        //     return this.impdbs;
        //     }
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
        },

        search() {
            this.impdbs.filters(impdb => {
                console.log(impdb.props)
            })
        }
    }
}
</script>


<style>@import 'bootstrap';
@import 'datatables.net-bs5';</style>
