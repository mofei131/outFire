<template>
  <div>
   <dv-border-box-8 class="borderTest">
     <ve-pie :data="chartData" :extend="chartExtend"  width="100%"></ve-pie>
    </dv-border-box-8>
    </div>
</template>

<script>
  export default {
    data () {
        this.chartExtend = {
     
      xAxis: {
        axisLabel: {
          textStyle: {
            color: "rgb(126, 203, 224)" //x轴字体颜色
          }
        }
      },
      yAxis: {
        axisLabel: {
          textStyle: {
            color: "rgb(126, 203, 224)" //y轴字体颜色
          }
        }
      },
      legend: {
        textStyle: {
          color: "rgb(126, 203, 224)" //图例字体颜色
        }
      }
    };
    
   
      return {
        chartData: {
          columns: ['日期', '访问用户'],
          rows: [
            { '日期': '1/1', '访问用户': 1393 },
            { '日期': '1/2', '访问用户': 3530 },
            { '日期': '1/3', '访问用户': 2923 },
            { '日期': '1/4', '访问用户': 1723 },
            { '日期': '1/5', '访问用户': 3792 },
            { '日期': '1/6', '访问用户': 4593 }
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
    }
</style>