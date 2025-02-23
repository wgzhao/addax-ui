<template>
  <div class="chart-wrapper" :class="{ 'dark-mode': isDark }">
    <div v-if="!chartReady">Loading...</div>
    <Bar v-else :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { Bar } from "vue-chartjs";
import requests from "@/utils/requests";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { ref, computed, onMounted } from "vue";
import { useTheme } from "vuetify"; // Vuetify 主题钩子

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// Vuetify 主题钩子
const vuetifyTheme = useTheme();
const isDark = computed(() => vuetifyTheme.current.value.dark);

const rawData = ref([]);
const chartReady = ref(false);

// 动态生成图表数据
const chartData = computed(() => {
  const uniqueFIDs = [...new Set(rawData.value.map((item) => item.FID))].sort();
  const groupedByDate = rawData.value.reduce((acc, item) => {
    const date = item.TRADEDATE.toString();
    if (!acc[date]) acc[date] = {};
    acc[date][item.FID] = item.RUNTIME;
    return acc;
  }, {});

  const dates = Object.keys(groupedByDate)
    .map((date) => parseInt(date))
    .sort((a, b) => b - a)
    .slice(0, 5);

  const colors = [
    "#42a5f5", // 蓝色
    "#66bb6a", // 绿色
    "#ffa726", // 橙色
    "#ef5350", // 红色
    "#ab47bc", // 紫色
  ];

  const datasets = dates.map((date, index) => ({
    label: date.toString(),
    data: uniqueFIDs.map((fid) => groupedByDate[date][fid] || 0),
    backgroundColor: colors[index % colors.length],
    borderColor: colors[index % colors.length],
    borderWidth: 1,
  }));

  return {
    labels: uniqueFIDs,
    datasets,
  };
});

// 图表配置（动态主题）
const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: isDark.value ? "#ffffff" : "#333333", // 暗模式白色，亮模式深灰
      },
    },
    y: {
      grid: {
        color: isDark.value ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)", // 暗模式浅白，亮模式浅黑
      },
      ticks: {
        color: isDark.value ? "#ffffff" : "#333333",
        beginAtZero: true,
      },
      title: {
        display: true,
        text: "Runtime (seconds)",
        color: isDark.value ? "#ffffff" : "#333333",
      },
    },
  },
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      labels: {
        color: isDark.value ? "#ffffff" : "#333333",
      },
    },
    tooltip: {
      enabled: true,
      mode: "index",
      intersect: false,
      backgroundColor: isDark.value ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)",
      titleColor: isDark.value ? "#ffffff" : "#333333",
      bodyColor: isDark.value ? "#ffffff" : "#333333",
    },
    title: {
      display: false,
      text: "Last 5 Days ETL Runtime by FID",
      color: isDark.value ? "#ffffff" : "#333333",
      font: {
        size: 16,
      },
    },
  },
}));

const fetchData = async () => {
  try {
    const res = await requests.get("/dashboard/last5DaysEtlTime");
    rawData.value = res;
    chartReady.value = true;
    console.log("Fetched data:", rawData.value);
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.chart-wrapper {
  position: relative;
  height: 300px;
  width: 100%;
  transition: background-color 0.3s ease;
}

.dark-mode {
  background-color: #1e293b; /* 暗模式背景 */
}

.chart-wrapper:not(.dark-mode) {
  background-color: #ffffff; /* 亮模式背景 */
}
</style>