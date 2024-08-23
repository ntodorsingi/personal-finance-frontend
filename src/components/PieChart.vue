<template>
    <div>
      <canvas ref="canvas"></canvas>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, PropType } from 'vue';
  import {
    Chart,
    PieController,
    ArcElement,
    Tooltip,
    Legend,
    Title
  } from 'chart.js';
  
  Chart.register(PieController, ArcElement, Tooltip, Legend, Title);
  
  export default defineComponent({
    name: 'PieChart',
    props: {
      data: {
        type: Array as PropType<number[]>,
        required: true
      },
      labels: {
        type: Array as PropType<string[]>,
        required: true
      },
      title: {
        type: String,
        required: true
      }
    },
    setup(props) {
      const canvas = ref<HTMLCanvasElement | null>(null);
  
      onMounted(() => {
        if (canvas.value) {
          new Chart(canvas.value, {
            type: 'pie',
            data: {
              labels: props.labels,
              datasets: [
                {
                  data: props.data,
                  backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66BB6A', '#FF7043'],
                  hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66BB6A', '#FF7043']
                }
              ]
            },
            options: {
              responsive: true,
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => {
                      const label = tooltipItem.label || '';
                      const value = Number(tooltipItem.raw) || 0; // Explicitly cast to number
                      const total = props.data.reduce((sum, val) => sum + val, 0);
                      const percentage = ((value / total) * 100).toFixed(2);
                      return `${label}: ${percentage}%`;
                    }
                  }
                },
                legend: {
                  position: 'top'
                },
                title: {
                  display: true,
                  text: props.title
                }
              }
            }
          });
        }
      });
  
      return {
        canvas
      };
    }
  });
  </script>
  
  <style scoped>
  canvas {
    max-width: 100%;
    height: auto;
  }
  </style>
  