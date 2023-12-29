<template>
    <!-- 主表配置 -- 参数管理 -->
    <div class="row">
        <div class="col-sm-12">
            <section class="panel">
                <header class="panel-heading">
                    参数管理
                </header>
                <div class="panel-body">
                    <div class="adv-table">
                        <div class="clearfix">
                            <div class="btn-group">
                                <a href="#" class="btn btn-xs btn-primary">新增参数 <i class="fa fa-plus"></i></a>
                            </div>
                            <div class="btn-group pull-right">
                                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i>
                                </button>
                                <ul class="dropdown-menu pull-right">
                                    <li><a href="#">Print</a></li>
                                    <li><a href="#">Save as PDF</a></li>
                                    <li><a href="#">Export to Excel</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="space15"></div>
                        <table class="display table table-bordered table-striped" id="table-dict">
                            <thead>
                            <tr>
                                <th>参数值</th>
                                <th>参数名称</th>
                                <th>参数分类</th>
                                <th class="w-25">参数说明</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                                <template v-for="d in dicts" :key="d.dictCode">
                            <tr>
                                <td>{{ d.dictCode}}</td>
                                <td>{{ d.dictName}}</td>
                                <td>{{ d.dictClass}}</td>
                                <td>{{ d.remark}}</td>
                                <td><button class="btn btn-xs btn-primary">编辑</button>
                                <button class="btn btn-xs btn-danger">删除</button></td>
                            </tr>
                        </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import axios from 'axios';


export default {
    data() {
        return {
            dicts: []
        }
    },

    created() {
        this.fetchDicts()
    },
    methods: {
        fetchDicts() {
            axios.get("/dict/list")
                .then(resp => {
                    this.dicts = resp.data;
                    return resp;
                })
                .catch(error => console.log(error))
        }
    }
}
</script>