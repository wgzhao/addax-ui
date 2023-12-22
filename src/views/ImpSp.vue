<script>
import axios from 'axios'
import SpDetail from '../components/sp/SpDetail.vue'
import CmdList from '../components/sp/CmdList.vue'

export default {
  data() {
    return {
      impSps: [],
      showDetailForm: false,
      showCmdList: false,
      sp: null,
      header: null
      }
  },
  components: {
    SpDetail, CmdList
  },
  methods: {
    closeAllForms() {
      this.showCmdList = false
      this.showDetailForm = false
      this.sp = null
    },
    showDetail(val) {
      this.closeAllForms()
      this.showDetailForm = true;
      this.sp = val;
    },

    showCmd(val) {
      this.closeAllForms();
      axios.get('/impSpCom/' + val.spId).then(resp => this.sp = resp.data);
      this.header = val.spOwner + '.' + val.spName;
      this.showCmdList = true
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
  }
}
</script>
<template>
  <div class="row">
    <!-- <DataTable 
      class="table table-striped" 
      :columns="columns"
      :data="impSps"
      :options ="options"
      >
    </DataTable> -->
    <div class="col-6">
    <table class="table table-stripped">
              <thead>
            <tr>
                <th width="5%">运行频率</th>
                <th width="5%">状态</th>
                <th width="20%">SP 名称</th>
                <th width="15%">开始时间</th>
                <th width="15%">结束时间</th>
                <th width="5%">耗时(秒)</th>
                <th width="30%">Action</th>
            </tr>
        </thead>
        <tbody>
          <template v-for="impsp in impSps">
              <tr>
                <td>{{ impsp.runFreq }}</td>
                <td>{{ impsp.flag }}</td>
                <td>{{ impsp.spName }}</td>
                <td>{{ impsp.startTime }}</td>
                <td>{{ impsp.endTime }}</td>
                <td>{{ impsp.runtime }}</td>
                <td>
                  <button type="button" class="btn btn-sm btn-outline-primary" @click="showDetail(impsp)">主表详情</button>
                  <button type="button" class="btn btn-sm btn-outline-primary" @click="showCmd(impsp)">命令列表</button>
                  <button type="button" class="btn btn-sm btn-outline-primary" @click="showLogs(impsp)">调度日志</button>
                  <button type="button" class="btn btn-sm btn-outline-primary" @click="showScene(impsp)">使用场景</button>
                  <button type="button" class="btn btn-sm btn-outline-primary" @click="showLineage(impsp)">计算溯源</button>
                  <button type="button" class="btn btn-sm btn-outline-primary" @click="showRequires(impsp)">前置情况</button>

                </td>
              </tr>
          </template>
        </tbody>
    </table>
    </div>
    <div class="col-6">
      <SpDetail v-if="showDetailForm" :form="sp" :header="header"/>
      <CmdList v-if="showCmdList" :form="sp" :header="header" />
    </div>
  </div>
</template>


<style>
/* @import 'bootstrap';
@import 'datatables.net-bs5'; */

table {
  font-size: 1rem;
}
</style>