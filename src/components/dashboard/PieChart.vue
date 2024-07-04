<template>
  <Pie :data="data" :options="options" />
</template>
<script>
import {
  Chart as ChartJS,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import { Pie } from "vue-chartjs";

ChartJS.register(ArcElement, PointElement, Title, Tooltip, Legend);

export default {
  name: "PieChart",
  data() {
    return {
      type: "doughnut",
      data: {
        labels: ["Direct", "Referral", "Social"],
        datasets: [
          {
            data: [55, 30, 15],
            backgroundColor: ["#4e73df", "#1cc88a", "#36b9cc"],
            hoverBackgroundColor: ["#2e59d9", "#17a673", "#2c9faf"],
            hoverBorderColor: "rgba(234, 236, 244, 1)"
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          borderColor: "#dddfeb",
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          caretPadding: 10
        },
        cutoutPercentage: 80,
        responsive: true,
        maintainAspectRatio: false,
        cutout: "80%"
      },
      plugins: {
        legend: {
          display: false
        }
      }
    };
  },
  components: { Pie }
};
</script>
