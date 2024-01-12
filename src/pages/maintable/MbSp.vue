<template>
  <!-- 主表配置 -- SP 计算 -->
  <div class="row">
    <div class="col-6">
      <v-card title="主表配置 -- SP 计算">
        <template v-slot:text>
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field v-model="search" density="compact" label="Search" prepend-inner-icon="mdi-magnify" single-line
                variant="outlined" hide-details></v-text-field>
            </v-col>
          </v-row>
        </template>
        
        <v-card-text>
          <v-data-table :items="impSps" :headers="impHeaders" items-per-page="10" density="default">
            <template v-slot:item.actions="{ item }">
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn icon="mdi-dots-vertical" v-bind="props">
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item slim density="compact" 
                    v-for="(op, i) in selectOptions" :key="i" @click="doAction(op.value, item)">
                    <v-list-item-title class="text-button">{{ op.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </div>
    <div class="col-6">
      <component :is="currentComp" :spId="spId" :key="uniqueKey"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import SpDetail from '@/components/sp/SpDetail.vue'
import SpCmdList from '@/components/sp/SpCmdList.vue'
import SceneList from '@/components/sp/SceneList.vue'
import SpLineage from '@/components/sp/SpLineage.vue'
import SpRequiresList from '@/components/sp/SpRequiresList.vue'

export default {
  data() {
    return {
      impSps: [],
      spId: null,
      uniqueKey: null,
      currentComp: null,
      search: null,
      impHeaders: [
        { title: '运行频率', value: 'runFreq' },
        { title: '状态', value: 'flag' },
        { title: 'SP 名称', value: 'spName' },
        { title: '开始时间', value: 'startTime' },
        { title: '结束时间', value: 'endTime' },
        { title: '耗时(秒)', value: 'runtime' },
        { title: '操作', value: 'actions' }
      ],
      selectOptions: [
        { title: '主表详情', value: 'SpDetail'  },
        { title: '命令列表', value: 'SpCmdList'  },
        { title: '调度日志', value: 'showLogs'  },
        { title: '使用场景', value: 'SceneList'  },
        { title: '计算溯源', value: 'SpLineage'  },
        { title: '前置情况', value: 'SpRequiresList'  }
      ]
    }
  },
  components: {
    SpDetail, SpCmdList, SceneList, SpRequiresList, SpLineage
  },
  methods: {

    doAction(comp, val) {
      this.spId = val.spId
      this.uniqueKey = val.spId
      console.log("invoke " + comp);
      this.currentComp = comp;
    },

    initData() {
      // Initial data
      axios.get("/maintable/sp/list").then(resp => this.impSps = resp.data);
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
</style>