<template>
  <div>l5tdashboard</div>
  <Bar id="l5tdashboard" :data="data" :options="options" />
</template>
<script>
import axios from "axios";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
);

export default {
  name: "L5TEtlBar",
  setup() {},
  data() {
    return {
      data: {
        labels: ["BK", "CP", "DO", "FK", "GL", "GP", "H2", "H3", "HC", "HG"],
        datasets: [
          {
            label: "20231222",
            data: [],
            backgroundColor: "#42b983",
            parsing: {
              xAxisKey: "FID",
              yAxisKey: "RUNTIME",
            },
          },
        ],
        options: {
          responsive: true,
          parsing: {
            xAxisKey: "FID",
            yAxisKey: "RUNTIME",
          },
          stack: "FID",
        },
      },
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios.get("/dashboard/last5DaysEtlTime").then((res) => {
        this.data = res.data;
      });
    },
  },
  components: { Bar },
};
</script>
<style></style>
