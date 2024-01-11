<template>
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
        <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                class="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
    </div>

    <!-- Content Row -->
    <div class="row">

        <!-- Earnings (Monthly) Card Example -->
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-ms font-weight-bold text-primary  mb-1">
                                采集数据源</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ ratios.length }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-calendar fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Earnings (Monthly) Card Example -->
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-success mb-1">
                                昨日数据采集 (GiB)</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ lastEtlData }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fa-solid fa-database fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Earnings (Monthly) Card Example -->
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-info shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Tasks
                            </div>
                            <div class="row no-gutters align-items-center">
                                <div class="col-auto">
                                    <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                                </div>
                                <div class="col">
                                    <div class="progress progress-sm mr-2">
                                        <div class="progress-bar bg-info" role="progressbar" style="width: 50%"
                                            aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Pending Requests Card Example -->
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-warning shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                Pending Requests</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">18</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-comments fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Content Row -->

    <div class="row">

        <!-- Area Chart -->
        <div class="col-xl-12 col-lg-7">
            <div class="card shadow mb-4">
                <!-- Card Header - Dropdown -->
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">最近12个月累计数据采集量(GiB)</h6>
                </div>
                <!-- Card Body -->
                <div class="card-body">
                    <div class="chart-area">
                        <!-- <canvas id="myAreaChart"></canvas> -->
                        <LineChart />
                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- Content Row -->
    <div class="row">

        <!-- Content Column -->
        <div class="col-lg-6 mb-4">

            <!-- Project Card Example -->
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Projects</h6>
                </div>
                <div class="card-body">
                    <template v-for="ratio in ratios" :key="ratio.OVER_PREC">
                        <v-progress-linear model-value="ratio.OVER_PREC" :class="ratio.BG_COLOR" height="20" rounded>
                        <!-- <template v-slot:default="{ value }">
                            {{value.SYSNAME}} - {{ value.OVER_PREC }}%
                        </template> -->
                        {{ ratio.SYSNAME }} ({{ ratio.OVER_PREC }}%)
                        </v-progress-linear>
                        <br/>
                        <!-- <h4 class="small font-weight-bold">{{ ratio.SYSNAME }} <span class="float-right">{{ ratio.OVER_PREC }}%</span></h4>
                        <div class="progress mb-4">
                        <div class="progress-bar" :class="ratio.BG_COLOR" role="progressbar" :style="{width: ratio.OVER_PREC + '%'}" aria-valuenow="{{ ratio.OVER_PREC }}"
                            aria-valuemin="0" aria-valuemax="100"></div> -->
                    <!-- </div> -->
                    </template>
                </div>
            </div>

        </div>

        <div class="col-lg-6 mb-4">

            <!-- Illustrations -->
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Illustrations</h6>
                </div>
                <div class="card-body">
                    <L5TEtlBar />
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import axios from 'axios';
import LineChart from '../components/dashboard/LineChart.vue'
import PieChart from '../components/dashboard/PieChart.vue'
import L5TEtlBar from '../components/dashboard/L5TEtlBar.vue';

export default {
    data() {
        return {
            ratios: [],
            lastEtlData: 0.0
        }
    },
    components: {LineChart, PieChart, L5TEtlBar},

    mounted() {
        this.fetchRatio();
    },

    computed: {
        barWidthCalculated(val) {
            return {
                width: val + '%'
            }
        },
        bgCalc(val) {
            console.log(val)
            if (val <= 0.2) {
                return 'bg-danger';
            }
            if (val <=0.4) {
                return 'bg-warning';
            }
            if ( 0.4 < val <=0.8) {
                return 'bg-info';
            }
            return 'bg-success';
        }
    },
    methods: {
        fetchRatio() {
            axios.get('/etl/accomplishRatio').then(resp => this.ratios = resp.data);
            axios.get('/dashboard/lastEtlData').then(res => this.lastEtlData = res.data);
        }
    }
}
</script>

<style scoped>

</style>