<template>
  <div id="rate-radar-component"></div>
</template>
<script>
// // ECharts
// import echarts from 'echarts/lib/echarts'
// // ECharts 雷达图
// require('echarts/lib/chart/radar')
import echarts from 'echarts'

export default {
  name: 'rate-radar-component',
  props: ['rateList'],
  data() {
    return {}
  },
  mounted() {
    this.getRateRadar()
  },
  watch: {
    // 动态更新评分列表
    rateList() {
      this.getRateRadar()
    }
  },
  methods: {
    // 评分雷达
    getRateRadar() {
      // 初始化echarts实例
      let myChart = echarts.init(
        document.getElementById('rate-radar-component')
      )
      // echarts配置
      let option = {
        title: {},
        tooltip: {},
        radar: {
          // 雷达形状
          shape: 'polygon',
          // 半径
          radius: '58%',
          // 位置
          center: ['50%', '50%'],
          // 雷达图圈数设置
          splitNumber: 5,
          // 维度标签
          name: {
            show: true,
            color: '#000',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: 16
          },
          // 坐标轴的维度标签是否响应和触发鼠标事件
          triggerEvent: true,
          // 轴线
          axisLine: {
            lineStyle: {
              // 轴线颜色
              color: '#fff',
              // 轴线宽度
              width: 1,
              // 轴线透明度
              opacity: 1
            }
          },
          // 坐标轴刻度
          axisTick: {},
          // 坐标轴刻度标签
          axisLabel: {},
          // 雷达图的指示器，用来指定雷达图中的多个变量（维度）
          indicator: this.indicatorList,
          splitArea: {
            show: false,
            areaStyle: {
              // 背景颜色
              color: 'rgba(255,0,0,0)'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              // 坐标轴网格颜色
              color: '#fff'
            }
          }
        },
        series: [
          // 一个系列
          {
            // 系列名称
            name: '评分雷达',
            // 系列类型 雷达图
            type: 'radar',
            // 拐点的样式
            symbol: 'circle',
            // 拐点大小
            symbolSize: 18,
            // 图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件
            silent: false,
            // 初始动画的缓动效果
            animationEasing: 'cubicOut',
            // 初始动画的延迟
            animationDelay: function(idx) {
              // 越往后的数据延迟越大
              return idx * 100 + 100
            },
            // 数据更新动画的时长
            animationDurationUpdate: function(idx) {
              // 越往后的数据延迟越大
              return idx * 100 + 100
            },
            // 当前系列的数据列表
            data: [
              {
                // 自定义数据
                custom: this.rateList,
                // 数据列表
                value: this.dataList,
                // 数据项名称
                name: '评分列表',
                // 单个数据标记的大小
                symbolSize: 4,
                // 标记相对于原本位置的偏移
                symbolOffset: [0, 0],
                // 图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
                label: {
                  show: true,
                  // 距离图形元素的距离。当 position 为字符描述值（如 'top'、'insideRight'）时候有效
                  distance: 5,
                  // 标签颜色
                  color: 'red',
                  fontStyle: 'normal',
                  fontWeight: 'bold',
                  fontSize: 15
                },
                // 折线拐点标志的样式设置
                itemStyle: {},
                // 线条样式
                lineStyle: {
                  color: '#0084ff',
                  width: 1
                },
                // 区域填充样式
                areaStyle: {
                  color: '#0084ff'
                },
                // 鼠标悬停高亮设置
                emphasis: {
                  label: {}
                },
                // 鼠标悬停提示框
                tooltip: {
                  backgroundColor: 'rgba(50,50,50,0.8)',
                  formatter: function(params) {
                    const rateList = params.data.custom
                    let result = `
                    <table>
                    <tr>
                    <th>网站</th>
                    <th>评分</th>
                    <th>评价数</th>
                    </tr>
                    `
                    rateList.forEach(rate => {
                      result += `
                      <tr>
                      <td>${rate.type}</td>
                      <td>${rate.score}</td>
                      <td>${
                        rate.vote === 0
                          ? ' '
                          : rate.vote >= 1000
                          ? parseInt(rate.vote / 1000) + 'k'
                          : // "<span style='color:red'>k</span>"
                            rate.vote
                      }</td>
                      </tr>
                      `
                    })
                    return result + `</table>`
                  }
                }
              }
            ]
          }
        ]
      }
      let that = this
      // 点击响应事件
      myChart.on('click', function(params) {
        // 点击了选择器
        if (params.componentType === 'radar') {
          that.rateList.forEach(rate => {
            if (params.name === rate.type) {
              // 选择器跳转
              window.open(rate.url)
            }
          })
        } else if (params.componentType === 'series') {
          // 点击了雷达图
          console.log('click series')
        }
      })
      // 悬停响应事件
      myChart.on('mouseover', function(params) {
        // 悬停了选择器
        if (params.componentType === 'radar') {
          console.log('over radar')
        } else if (params.componentType === 'series') {
          // 悬停了雷达图
          console.log('over series')
        }
      })
      myChart.setOption(option)
    }
  },
  computed: {
    // 雷达图的指示器，用来指定雷达图中的多个变量（维度）
    indicatorList() {
      let indicatorList = []
      this.rateList.forEach(rate => {
        indicatorList.push({
          name: rate.type,
          max: 10,
          min: 0,
          color: rate.color
        })
      })
      return indicatorList
    },
    // 雷达图的多维度数据
    dataList() {
      let dataList = []
      this.rateList.forEach(rate => {
        dataList.push(rate.score)
      })
      return dataList
    }
  }
}
</script>
<style>
#rate-radar-component {
  /* background-color: rgba(255, 255, 255, 0); */
  width: 250px;
  height: 250px;
  border-radius: 10px;
  position: relative;
}
</style>
