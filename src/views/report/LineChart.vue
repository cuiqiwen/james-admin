<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts'

  require('echarts/theme/macarons') // echarts theme
  import { debounce } from '@/utils'

  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '350px'
      },
      autoResize: {
        type: Boolean,
        default: true
      },
      chartData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        chart: null
      }
    },
    watch: {
      chartData: {
        deep: true,
        handler(val) {
          this.setOptions(val)
        }
      }
    },
    mounted() {
      this.initChart()
      if (this.autoResize) {
        this.__resizeHanlder = debounce(() => {
          console.log('Success resize')
          if (this.chart) {
            this.chart.resize()
          }
        }, 100)
        window.addEventListener('transitionend', this.__resizeHanlder)
      }

      // 监听侧边栏的变化
      const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
      sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      if (this.autoResize) {
        window.removeEventListener('resize', this.__resizeHanlder)
      }

      const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
      sidebarElm.removeEventListener('resize', this.__resizeHanlder)

      this.chart.dispose()
      this.chart = null
    },
    methods: {
      setOptions(chartData = {}) {
        const xData = chartData['xData']
        const yData = chartData['yData']
        const series = []
        const legend = []
        for (let i = 0; i < yData.length; i++) {
          legend.push(yData[i].title)
          series.push({
            name: yData[i].title,
            smooth: true,
            type: yData[i].type,
            stack: yData[i].stack || '',
            itemStyle: {
              normal: {
                color: yData[i].color,
                lineStyle: {
                  color: yData[i].color,
                  width: 1
                }
              }
            },
            data: yData[i].data,
            animationDuration: 1500,
            animationEasing: 'cubicInOut'
          })
        }
        this.chart.setOption({
          xAxis: {
            data: xData,
            boundaryGap: true,
            axisTick: {
              show: false
            }
          },
          yAxis: {type: 'value'},
          grid: {
            left: 10,
            right: 10,
            bottom: 20,
            top: 30,
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            padding: [10, 10]
          },
          legend: {
            data: legend
          },
          dataZoom: null,
          series: series
        })
      },
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')
        this.setOptions(this.chartData)
      }
    }
  }
</script>
