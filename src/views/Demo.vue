<template>
  <div id="app">
    <!-- <apexchart width="500"  :options="options" :series="series"></apexchart> -->
  </div>
</template>

<script>
// import VueApexCharts from "vue3-apexcharts";
import axios from "axios";
export default {
  data() {
    return {
      options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          type: "category",
          categories: []
        },
        stroke: {
          curve: 'smooth'
        }
      },
      series: [{
        name: 'series-1',
        type: "area",
        data: []
      }]
    }
  },
  // components: {
  //   apexchart: VueApexCharts,
  // },
  mounted() {
    this.fetchData()
    console.log(this.series[0]["data"]);
    console.log(this.series);
  },
  methods: {
    fetchData() {
      axios.get("/dashboard/last12MonthsEtlData")
          .then(res => {
            for (let i=0; i< res.data.length; i++) {
              this.series[0]["data"].push(res.data[i]["num"]);
              this.options.xaxis.categories.push(res.data[i]["month"]);
            }
          })
          .catch(err => console.log(err));
  }
  }
}
</script>