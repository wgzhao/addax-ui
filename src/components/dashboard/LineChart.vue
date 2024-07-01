<template>
  <Line
    :options="areaOtions"
    :data="areaData"
    :chart-data="last12MonthsEtlData"
  />

  <div></div>
</template>
<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "vue-chartjs";

// ChartJS.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
// ChartJS.defaultFontColor = '#858796';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);
const last12MonthsEtlData = ref();
const areaData = ref({
  // labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Earnings",
      backgroundColor: "rgba(78, 115, 223, 0.05)",
      borderColor: "rgba(78, 115, 223, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(78, 115, 223, 1)",
      pointBorderColor: "rgba(78, 115, 223, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
      pointHoverBorderColor: "rgba(78, 115, 223, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      fill: true,
      data: last12MonthsEtlData.value,
    },
  ],
});
const areaOtions = ref({
  maintainAspectRatio: false,
  parsing: {
    xAxisKey: "month",
    yAxisKey: "num",
  },
  layout: {
    padding: {
      left: 10,
      right: 25,
      top: 25,
      bottom: 0,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  tooltips: {
    titleMarginBottom: 10,
    borderWidth: 1,
    xPadding: 15,
    yPadding: 15,
    displayColors: false,
    intersect: false,
    mode: "index",
    caretPadding: 10,
  },
});

const fetchAccumData = () => {
  axios
    .get("/dashboard/last12MonthsEtlData")
    .then((res) => {
      last12MonthsEtlData.value = res.data;
      console.log(last12MonthsEtlData.value);
    })
    .catch((err) => console.log(err));
};

onMounted(() => {
  fetchAccumData();
});
</script>
