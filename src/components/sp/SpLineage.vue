<template>
    <v-chart class="chart" :option="option" />
  </template>
  
  <script setup>
  import { use } from "echarts/core";
  import { CanvasRenderer } from "echarts/renderers";
  import { PieChart, TreeChart } from "echarts/charts";
  import {
    TitleComponent,
    TooltipComponent,
    LegendComponent
  } from "echarts/components";
  import VChart, { THEME_KEY } from "vue-echarts";
  import { ref, provide } from "vue";
  
  use([
    CanvasRenderer,
    PieChart,
    TreeChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent
  ]);
  
//   provide(THEME_KEY, "dark");

  const option = ref({
    title: {
      text: "Traffic Sources",
      left: "center"
    },
    tooltip: {
      trigger: "item",
      triggerOn: 'mouseover'
    },
    series: [
        {
          type: 'tree',
          data: [
            {
                "name": "flare",
                "children": [
                    {
                    "name": "analytics",
                    "children": [
                        {
                        "name": "cluster",
                        "children": [
                            {"name": "AgglomerativeCluster"},
                            {"name": "CommunityStructure"},
                            {"name": "HierarchicalCluster"},
                            {"name": "MergeEdge"}
                            ]
                        },
                        {
                        "name": "graph",
                        "children": [
                            {"name": "BetweennessCentrality"},
                            {"name": "LinkDistance"},
                            {"name": "MaxFlowMinCut"},
                            {"name": "ShortestPaths"},
                            {"name": "SpanningTree"}
                            ]
                        },
                        {
                        "name": "optimization",
                        "children": [
                            {"name": "AspectRatioBanker"}
                            ]
                        }
                    ]
                    },
                    {
                    "name": "animate",
                    }
                ]
                }],
          top: '1%',
          left: '7%',
          bottom: '1%',
          right: '20%',
          symbolSize: 7,
          label: {
            position: 'left',
            verticalAlign: 'middle',
            align: 'right',
            fontSize: 9
          },
          leaves: {
            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'left'
            }
          },
          emphasis: {
            focus: 'descendant'
          },
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750
        }
      ]
  });
  </script>
  
  <style scoped>
  .chart {
    height: 400px;
  }
  </style>