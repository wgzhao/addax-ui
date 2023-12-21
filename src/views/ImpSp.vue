<script>
import {ref, onMounted} from 'vue'
import axios from 'axios'
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';
import SpDetail from '../components/sp/Detail.vue'

DataTable.use(DataTablesCore);

export default {
  data() {
    return {
      columns:  [
                {data: 'runFreq', title:'频率', width: '5%'},
                {data: 'flag', title: '状态', width: '5%'},
                {data: 'spName', title: 'SP 名称', width: '20%'},
                {data: 'startTime', title: '开始时间', width: '10%'},
                {data: 'endTime', title: '结束时间', width: '10%'},
                {data: 'runtime', title: '耗时(秒)', width: '5%'},
                {data: null, orerable: false, title: '操作', width:'20%', render: function (data) { 
                  return '<button type="button" class="btn btn-sm btn-outline-primary" @click="showDetail(\'' + data.spId + '\')">主表详情</button>' +
                  '<button type="button" class="btn btn-sm btn-outline-primary" @click="showCmd(' + data.spId + ')">命令列表</button>' + 
                  '<button type="button" class="btn btn-sm btn-outline-primary" @click="showLogs(' + data.spId + ')">调度日志</button>' +
                  '<button type="button" class="btn btn-sm btn-outline-primary" @click="showScene(' + data.spId + ')">使用场景</button>' +
                  '<button type="button" class="btn btn-sm btn-outline-primary" @click="showLineage(' + data.spId + ')">计算溯源</button>' +
                  '<button type="button" class="btn btn-sm btn-outline-primary" @click="showRequires(' + data.spId + ')">前置情况</button>';
                }
                }
              ],
      impSps: [],
      data: null,
      showModal: false,
      currentComponent: null
    }
  },
  components: {
    DataTable,
    SpDetail
  },
  methods: {
    showDetail(val) {
      this.showModal = true;
      console.log(this.showModal);
      this.data = val;
      this.currentComponent = 'SpDetail';
    },

    initData() {
      // Initial data
      axios.get('/impSp/list').then(resp => this.impSps = resp.data);
    }
  },

  mounted() {
    {
      this.initData();
    }
  },
}
</script>
<template>
  <div class="row">
    <DataTable 
      class="table table-striped" 
      :columns="columns"
      :data="impSps"
      :options ="{paging: true, searching: true, info: true, 
        lengthChange: true, pageLength: 10, 
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, 'All']]
        }"
      >
        <!-- <thead>
            <tr>
                <th>运行频率</th>
                <th>状态</th>
                <th>SP 名称</th>
                <th>开始时间</th>
                <th>结束时间</th>
                <th>耗时(秒)</th>
            </tr>
        </thead> -->
    </DataTable>
  </div>

  <div v-if="showModal">
    <!-- <slot name="SpDetail" :data="data" /> -->
    <SpDetail />
    <!-- <component :is="currentComponent" :data="data" /> -->
  </div>
</template>


<style>
@import 'bootstrap';
@import 'datatables.net-bs5';

table {
  font-size: 1rem;
}
</style>