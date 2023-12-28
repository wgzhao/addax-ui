<template>
    <div>l5tdashboard</div>
    <Bar id="l5tdashboard" :data="data" :options="options" />
</template>
<script>
import axios from 'axios'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'L5TEtlBar',
    setup() {
    const originData = [
                {"RUNTIME":303,"FID":"BK","TRADEDATE":20231222},
                {"RUNTIME":201,"FID":"CP","TRADEDATE":20231222},
                {"FID":"DO","RUNTIME":850,"TRADEDATE":20231222},
                {"FID":"FK","RUNTIME":2451,"TRADEDATE":20231222},
                {"FID":"GL","RUNTIME":1747,"TRADEDATE":20231222},
                {"FID":"GP","RUNTIME":581,"TRADEDATE":20231222},
                {"RUNTIME":212,"FID":"H2","TRADEDATE":20231222},
                {"RUNTIME":346,"FID":"H3","TRADEDATE":20231222},
                {"RUNTIME":1427,"FID":"HC","TRADEDATE":20231222},
                {"RUNTIME":28895,"TRADEDATE":20231222,"FID":"HG"}
            ]
    },
    data() {
        return {
            
            data: {
                labels:['BK','CP','DO','FK','GL','GP','H2','H3','HC','HG'],
                datasets:[{
                    label:'20231222',
                    data: originData,
                    backgroundColor:'#42b983',
                    parsing: {
                        xAxisKey: 'FID',
                        yAxisKey: 'RUNTIME'
                    },
                }],
            options: {
                responsive: true,
                parsing: {
                    xAxisKey: 'FID',
                    yAxisKey: 'RUNTIME'
                },
                stack: "FID"
            }
            }
        }
    },
    methods: {
        fetchData() {
            axios.get('/dashboard/last5DaysEtlTime').then(res => {
                this.data = res.data;
            });
        }
    },
    components: { Bar }
}
</script>
<style>
    
</style>