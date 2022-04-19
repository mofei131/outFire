<template>
<div>
   <dv-border-box-8 class="borderTest">
      <ve-line :data="chartData" :settings="chartSettings" :extend="chartExtend"></ve-line>

    </dv-border-box-8>

</div>
 
</template>

<script>
  // 使用前需先引入对应模块
  // import 'echarts/lib/component/visualMap'
  export default {
    data () {
       this.chartExtend = {
     
      xAxis: {
        axisLabel: {
          textStyle: {
            color: "#1370fb" //x轴字体颜色
          }
        }
      },
      yAxis: {
        axisLabel: {
          textStyle: {
            color: "#1370fb" //y轴字体颜色
          }
        }
      },
      legend: {
        textStyle: {
          color: "#fff" //图例字体颜色
        }
      }
    };
     this.chartSettings = {
        labelMap: {
          'PV': '访问用户',
          'Order': '下单用户'
        },
        legendName: {
          '访问用户': '访问用户 total: 10000'
        }
      }
      return {
        chartData: {
          columns: ['date', 'PV', 'Order', 'OrderRate'],
          rows: [
            { 'date': '1/1', 'PV': 1393, 'Order': 1093, 'OrderRate': 0.32 },
            { 'date': '1/2', 'PV': 3530, 'Order': 3230, 'OrderRate': 0.26 },
            { 'date': '1/3', 'PV': 2923, 'Order': 2623, 'OrderRate': 0.76 },
            { 'date': '1/4', 'PV': 1723, 'Order': 1423, 'OrderRate': 0.49 },
            { 'date': '1/5', 'PV': 3792, 'Order': 3492, 'OrderRate': 0.323 },
            { 'date': '1/6', 'PV': 4593, 'Order': 4293, 'OrderRate': 0.78 }
          ]
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
 .borderTest{
   padding-top: 20px;
   box-sizing: border-box;
   overflow: hidden;
 }
</style>