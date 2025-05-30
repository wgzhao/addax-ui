<template>
  <v-container fluid class="pa-4">
    <!-- 搜索栏 -->
    <v-row dense class="mb-2">
      <v-col cols="12" md="4" lg="3">
        <v-text-field
          append-inner-icon="mdi-magnify"
          density="compact"
          hide-details
          label="Search"
          v-model="filter"
          rounded="lg"
          single-line
          variant="outlined"
          @keyup.enter="fetchData"
          @click:append-inner="fetchData"
        />
      </v-col>
    </v-row>

    <!-- 主内容网格 -->
    <v-row dense>
      <!-- 数据中心采集及数据服务系统清单（全宽） -->
      <v-col cols="12">
        <v-card flat title="数据中心采集及数据服务系统清单" class="mb-4">
          <v-card-text>
            <v-data-table
              :items="etlAndDs"
              :headers="etlAndDsHeaders"
              items-per-page="10"
              density="compact"
              class="elevation-1"
            >
              <template v-slot:item.dbConstr="{ item }">
                <code>{{ item.dbConstr }}</code>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- 数据中心采集表清单和推送表清单（左右分栏） -->
      <v-col cols="12" md="6">
        <v-card flat title="数据中心采集表清单(显示100条)" class="mb-4">
          <v-card-text>
            <v-data-table-server
              :items="etlInfo"
              :headers="etlInfoHeaders"
              items-per-page="10"
              :items-length="etlTotalItems"
              density="compact"
              class="elevation-1"
              @update:options="loadItems"
            />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card flat title="数据中心数据推送表清单(显示100条)">
          <v-card-text>
            <v-data-table
              :items="dsInfo"
              :headers="dsInfoHeaders"
              items-per-page="10"
              density="compact"
              class="elevation-1"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import SystemInfoService from '@/service/systemInfoService'
  import type { ETLAndDS } from '@/types/database'
  import type { LoadItemsOptions } from '@/types'

  const etlAndDs = ref<ETLAndDS[]>([])
  const etlInfo = ref<any[]>([])
  const etlInfoParams = ref<LoadItemsOptions>({
    page: 1,
    itemsPerPage: 10,
    sortBy: null
  })
  const etlTotalItems = ref(0)
  const dsInfo = ref<any[]>([])
  const filter = ref('')

  const etlAndDsHeaders = [
    { title: '类别', key: 'sysKind' },
    { title: '系统编号', key: 'sysid' },
    { title: '系统名称', key: 'sysName' },
    { title: '连接串', key: 'dbConstr' },
    { title: '登录用户', key: 'dbUser' }
  ]

  const etlInfoHeaders = [
    { title: '系统名称', key: 'sysName' },
    { title: '源用户', key: 'souOwner' },
    { title: '源表名', key: 'souTablename' },
    { title: '源表筛选', key: 'souFilter' },
    { title: '目标用户', key: 'destOwner' },
    { title: '目标表名', key: 'destTablename' }
  ]

  const dsInfoHeaders = [
    { title: '任务组', key: 'DS_NAME' },
    { title: '目标表', key: 'TBLNAME' },
    { title: '推送开始时间', key: 'START_TIME' },
    { title: '推送结束时间', key: 'END_TIME' }
  ]

  const fetchData = () => {
    SystemInfoService.getEtlAndDs(filter.value).then((res) => {
      etlAndDs.value = res.data
    })
    loadItems(etlInfoParams.value)
    SystemInfoService.getDsInfo(filter.value).then((res) => {
      dsInfo.value = res.data
    })
  }

  const loadItems = ({ page, itemsPerPage, sortBy }: LoadItemsOptions) => {
    // const sort = createSort(sortBy)
    etlInfoParams.value = {
      page: page,
      itemsPerPage: itemsPerPage,
      sortBy: sortBy
    }
    SystemInfoService.getEtlInfo(etlInfoParams.value).then((res) => {
      etlInfo.value = res.data.content
      etlInfoParams.value = {
        page: res.data.pageable.pageNumber,
        itemsPerPage: res.data.pageable.pageSize,
        sortBy: null
      }
      etlTotalItems.value = res.data.totalElements
    })
  }

  onMounted(() => {
    fetchData()
  })
</script>

<style scoped>
  .v-data-table {
    background: transparent; /* 表格背景透明，继承卡片背景 */
  }
</style>
