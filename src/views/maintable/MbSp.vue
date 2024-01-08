<template>
  <!-- 主表配置 -- SP 计算 -->
  <div class="row">
    <div class="col-6">
      <v-card title="主表配置 -- SP 计算">
        <template v-slot:text>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field v-model="search" density="compact" label="Search" prepend-inner-icon="mdi-magnify" single-line
                variant="outlined" hide-details></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <div class="btn-group-sm" role="group" arial-label="Actions">
                <template v-for="a in selectOptions">
                  <button type="button" class="btn btn-outline-primary">{{ a.title }}</button>
                </template>
              </div>
            </v-col>
          </v-row>

        </template>
        <v-card-text>
          <v-data-table :items="impSps" :headers="impHeaders" :items-per-page="pageSize" density="compact" show-select
            select-strategy="single" class="elevation-0" v-model="selected" item-value="spId">
            <template v-slot:item.actions="{ item }">
              <template v-for="(a, index) in selectOptions">
                <button type="button" class="btn btn-sm btn-outline-primary" @click="doAction(index, item)">{{ a.title
                }}</button>
              </template>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </div>
    <div class="col-6">
      <component :is="currentComp" :form="sp" :header="header" :needs="needs" />
    </div>
  </div>
  <div class="row">
    <div class="col-6">
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import SpDetail from '@/components/sp/SpDetail.vue'
import CmdList from '@/components/sp/CmdList.vue'
import SceneList from '@/components/sp/SceneList.vue'
import SpLineage from '@/components/sp/SpLineage.vue'
import SpRequiresList from '@/components/sp/SpRequiresList.vue'

export default {
  data() {
    return {
      impSps: [],
      sp: [],
      header: null,
      currentComp: null,
      selected: null,
      search: null,
      apiPrefix: "/maintable/sp/",
      impHeaders: [
        { title: '运行频率', value: 'runFreq' },
        { title: '状态', value: 'flag' },
        { title: 'SP 名称', value: 'spName' },
        { title: '开始时间', value: 'startTime' },
        { title: '结束时间', value: 'endTime' },
        { title: '耗时(秒)', value: 'runtime' },
        { title: 'Action', value: 'actions' }
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
        { title: '主表详情', value: 'SpDetail', api: 'through' },
        { title: '命令列表', value: 'CmdList', api: 'cmdlist' },
        { title: '调度日志', value: 'showLogs', api: 'impSpLog' },
        { title: '使用场景', value: 'SceneList', api: 'scene' },
        { title: '计算溯源', value: 'SpLineage', api: 'lineage' },
        { title: '前置情况', value: 'SpRequiresList', api: 'prequires' }
      ]
    }
  },
  components: {
    SpDetail, CmdList, SceneList, SpRequiresList, SpLineage
  },
  methods: {

    doAction(idx, val) {
      // clear this.sp
      this.sp = []
      let a = this.selectOptions[idx]
      let api = this.apiPrefix + a.api + '/' + val.spId
      this.header = val.spOwner + '.' + val.spName;
      if (a.value == "SpDetail") {
        this.sp = val;
        axios.get(api).then(res => { this.needs = res.data })
      } else if (a.value == "SceneList") {
        axios.get(this.apiPrefix + a.api, {
          params: {
            'tbl': val.spOwner + "." + val.spName,
            'sysId': val.spId
          }
        }).then(resp => this.sp = resp.data);
      }
      else {
        axios.get(api).then(res => { this.sp = res.data })
      }
      this.currentComp = a.value;
    },

    initData() {
      // Initial data
      axios.get(this.apiPrefix  + "list").then(resp => this.impSps = resp.data);
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