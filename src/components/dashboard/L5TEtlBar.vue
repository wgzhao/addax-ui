<template>
  <div>l5tdashboard</div>
  <Bar id="l5tdashboard" :data="data" :options="data.options" />
</template>
<script setup lang="ts">
import axios from "axios";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from "chart.js";
import { onMounted, ref } from "vue";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const data = ref({
  labels: ["BK", "CP", "DO", "FK", "GL", "GP", "H2", "H3", "HC", "HG"],
  datasets: [
    {
      label: "20231222",
      data: [],
      backgroundColor: "#42b983",
      parsing: {
        xAxisKey: "FID",
        yAxisKey: "RUNTIME"
      }
    }
  ],
  options: {
    responsive: true,
    parsing: {
      xAxisKey: "FID",
      yAxisKey: "RUNTIME"
    },
    stack: "FID"
  }
});

onMounted(() => {
  axios.get("/dashboard/last5DaysEtlTime").then(res => {
    data.value = res.data;
  });
});
</script>
<style></style>
