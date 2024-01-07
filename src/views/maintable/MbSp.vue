<template>
  <!-- 主表配置 -- SP 计算 -->
  <div class="row">
    <div class="col-6">
      <v-data-table
      :items = "impSps"
      :headers = "impHeaders"
      :items-per-page = "pageSize"
      density="compact"
      >
      <template v-slot:item.action="{ item }">
        <!-- <v-select :items="selectOptions" density="compact" label="操作" item-title="title" item-value="value"
                        return-object v-model="select">
        </v-select> -->
        <button type="button" class="btn btn-sm btn-outline-primary" @click="showDetail(item)">主表详情</button>
        <button type="button" class="btn btn-sm btn-outline-primary" @click="showCmd(item)">命令列表</button>
        <button type="button" class="btn btn-sm btn-outline-primary" @click="showLogs(item)">调度日志</button>
        <button type="button" class="btn btn-sm btn-outline-primary" @click="showScene(item)">使用场景</button>
        <button type="button" class="btn btn-sm btn-outline-primary" @click="showLineage(item)">计算溯源</button>
        <button type="button" class="btn btn-sm btn-outline-primary" @click="showRequires(item.spId)">前置情况</button>
      </template>
      
      </v-data-table>
    </div>
    <div class="col-6">
      <component :is="currentComp" :form="sp" :header="header" :needs="needs"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import SpDetail from '@/components/sp/SpDetail.vue'
import CmdList from '@/components/sp/CmdList.vue'
import SceneList from '@/components/sp/SceneList.vue'
// import SpLineage from '@/components/sp/SpLineage.vue'
import SpRequiresList from '@/components/sp/SpRequiresList.vue'

export default {
  data() {
    return {
      impSps: [],
      sp: null,
      header: null,
      currentComp: null,
      impHeaders: [
        { title: '运行频率', value: 'runFreq'},
        { title: '状态',    value: 'flag' },
        { title: 'SP 名称', value: 'spName' },
        { title: '开始时间', value: 'startTime' },
        { title: '结束时间', value: 'endTime' },
        { title: '耗时(秒)', value: 'runtime' },
        { title: 'Action', value: 'action'}
      ],
      needs: {
            "NEED_SOU": null,
            "NEED_SP": null,
            "SP_DEST": null,
            "SP_ALLNEXT": null,
            "THROUGH_NEED_SP": null,
            "SP_ALLTABS": null,
            "THROUGH_NEED_SOU": null
        },
      pageSize: 10,
      select: null,
      selectOptions: [
        { title: '主表详情', value: 'showDetailForm' },
        { title: '命令列表', value: 'showCmdList' },
        { title: '调度日志', value: 'showLogs' },
        { title: '使用场景', value: 'showSceneList' },
        { title: '计算溯源', value: 'showLineageChart' },
        { title: '前置情况', value: 'showRequiresList' }
      ]
    }
  },
  components: {
    SpDetail, CmdList, SceneList, SpRequiresList
  },
  methods: {

    showDetail(val) {
      // this.closeAllForms()
      this.currentComp = 'SpDetail';
      this.sp = val;
      axios.get('/impSp/through/' + val.spId).then(resp => this.needs = resp.data);
      // this.showDetailForm = true;
    },

    showScene(val) {
      // this.closeAllForms();
      // this.showSceneList = true;
      axios.get('/impSpNeedtab/scene', {
        params: {
          'tbl': val.spOwner + "." + val.spName
        }
      }).then(resp => this.sp = resp.data);
      this.currentComp = 'SceneList';
    },

    showCmd(val) {
      // this.closeAllForms();
      this.sp = val.spId;
      axios.get('/impSpCom/' + val.spId).then(resp => this.sp = resp.data);
      this.header = val.spOwner + '.' + val.spName;
      // this.showCmdList = true
      this.currentComp = 'CmdList';
    },

    showLineage(val) {
      // this.closeAllForms();
      // this.showLineageChart = true;
      this.currentComp = 'SpLineage';
    },

    showRequires(spId) {
      // this.closeAllForms();
      axios.get('/impSp/prequires/' + spId).then(resp => this.sp = resp.data);
      // this.showRequiresList = true;
      this.currentComp = 'SpRequiresList';
    },
    initData() {
      // Initial data
      axios.get('/impSp/list').then(resp => this.impSps = resp.data);
    },
  },

  mounted() {
    {
      this.initData();
    }
  }
}
</script>
<style>
table {
  font-size: 0.8rem;
}
</style>