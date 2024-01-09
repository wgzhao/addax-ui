<template>
    <!-- 主表配置 -- 数据源管理 -->
    <div class="row">
        <div class="col-6">
            <v-card flat title="数据源管理">
                <v-card-actions>
                    <v-btn @click="addDataSource()">新增</v-btn>
                </v-card-actions>
                        <template v-slot:text>
                            <v-text-field v-model="searchValue"  label="Search" prepend-inner-icon="mdi-magnify" single-line
                                variant="outlined" hide-details></v-text-field>
                        </template>
    
                <v-data-table 
                    :items="impdbs" 
                    :headers="headers" 
                    :search="searchValue" 
                    density="compact"
                    items-per-page="20">
                    <template v-slot:item.actions="{item}">
                        <a class="btn btn-xs btn-info" @click="dataOp(item.id, 'show')">详情</a>
                        <a class="btn btn-xs btn-warning" @click="dataOp(item.id, 'edit')">编辑</a>
                        <a href="#" class="btn btn-xs btn-info">使用场景</a>
                        <a href="#" class="btn btn-xs btn-info">探索源库</a>
                    </template>
                </v-data-table>
            </v-card>
        </div>

        <!-- form -->

        <div class="col-6">
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

                            <span class="input-group-text">是否有效</span>
                            <v-radio-group v-model="form.bvalid" inline>
                                <v-radio  label="有效" value="Y" />
                                <v-radio  label="无效" value="N" />
                            </v-radio-group>

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
                            <textarea v-model="form.dbJudgePre" class="form-control" rows="4"></textarea>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">其他配置</span>
                            <textarea v-model="form.conf" class="form-control" rows="4"></textarea>
                        </div>


                        <div class="input-group mb-3">
                            <span class="input-group-text">备注信息</span>
                            <textarea v-model="form.dbRemark" class="form-control" rows="4"></textarea>
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
            headers: [
                { title: "名称", key: "dbName" },
                { title: "采集编号", key: "dbIdEtl" },
                { title: "服务编号", key: "dbIdDs" },
                { title: "操作", value: "actions", align: "center" }
            ]
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
            const result = this.searchValue === ""
                ? this.impdbs
                : this.impdbs.filter(
                    wo => Object.values(wo).join("").toLocaleLowerCase().indexOf(this.searchValue.toLocaleLowerCase()) !== -1
                );
            return result;

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
            axios.get("/maintable/datasource/list")
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
            axios.get("/maintable/datasource/detail/" + id)
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
                axios.post('/maintable/datasource/save', {
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


<style></style>
