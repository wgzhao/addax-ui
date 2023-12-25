<script>
import axios from 'axios'
import SpDetail from '../components/sp/SpDetail.vue'
import CmdList from '../components/sp/CmdList.vue'
import SceneList from '../components/sp/SceneList.vue'
import SpLineage from '../components/sp/SpLineage.vue'
import SpRequiresList from '../components/sp/SpRequiresList.vue'

export default {
  data() {
    return {
      impSps: [],
      showDetailForm: false,
      showCmdList: false,
      showSceneList: false,
      showLineageChart: false,
      showRequiresList: false,
      sp: null,
      header: null,
      needs: {
            "NEED_SOU": null,
            "NEED_SP": null,
            "SP_DEST": null,
            "SP_ALLNEXT": null,
            "THROUGH_NEED_SP": null,
            "SP_ALLTABS": null,
            "THROUGH_NEED_SOU": null
        },
      currentSort: '',
      currentSortDir: 'asc',
      pageSize: 5,
      currentPage:1,
      }
  },
  components: {
    SpDetail, CmdList, SceneList, SpLineage, SpRequiresList
  },
  methods: {
    closeAllForms() {
      this.showCmdList = false
      this.showDetailForm = false
      this.showSceneList = false
      this.showLineageChart = false
      this.showRequiresList = false
      this.sp = null
    },

    showDetail(val) {
      this.closeAllForms()
      this.sp = val;
      axios.get('/impSp/through/' + val.spId).then(resp => this.needs = resp.data);
      this.showDetailForm = true;
    },

    showScene(val) {
      this.closeAllForms();
      this.showSceneList = true;
      axios.get('/impSpNeedtab/scene', {
        params: {
          'tbl': val.spOwner + "." + val.spName
        }
      }).then(resp => this.sp = resp.data);
    },

    showCmd(val) {
      this.closeAllForms();
      axios.get('/impSpCom/' + val.spId).then(resp => this.sp = resp.data);
      this.header = val.spOwner + '.' + val.spName;
      this.showCmdList = true
    },

    showLineage(val) {
      this.closeAllForms();
      this.showLineageChart = true;
    },

    showRequires(spId) {
      this.closeAllForms();
      axios.get('/impSp/prequires/' + spId).then(resp => this.sp = resp.data);
      this.showRequiresList = true;
    },
    initData() {
      // Initial data
      axios.get('/impSp/list').then(resp => this.impSps = resp.data);
    },

    sort(s) {
      //if s == current sort, reverse
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
    },
    nextPage() {
      if((this.currentPage*this.pageSize) < this.impSps.length) this.currentPage++;
    },
    prevPage() {
      if(this.currentPage > 1) this.currentPage--;
    },
  },

  computed: {
    sortedTable() {
      return this.impSps.sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      }).filter((row, index) => {
        let start = (this.currentPage-1)*this.pageSize;
        let end = this.currentPage*this.pageSize;
        if(index >= start && index < end) return true;
      });
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
          <template v-for="impsp in sortedTable">
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
                  <button type="button" class="btn btn-sm btn-outline-primary" @click="showRequires(impsp.spId)">前置情况</button>
                </td>
              </tr>
          </template>
        </tbody>
    </table>
    <p class="mt-0">
    <button @click="prevPage">Previous</button> 
    <button @click="nextPage">Next</button>
    </p>
    </div>
    <div class="col-6">
      <SpDetail v-if="showDetailForm" :form="sp" :header="header" :needs="needs"/>
      <CmdList v-if="showCmdList" :form="sp" :header="header" />
      <SceneList v-if="showSceneList" :form="sp" />
      <SpLineage v-if="showLineageChart" />
      <SpRequiresList v-if="showRequiresList" :form="sp"/>
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