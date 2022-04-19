<template>
        <!-- <dv-scroll-ranking-board :config="config" style="width:100%;height:80%" /> -->
        <div class="visual_chart" style="width:100%" id="rightTopChart"></div>
</template>
<script>
import echarts from 'echarts'
import * as Checkn from '../../../../api/check/checkn'
  export default {
    mounted () {
      this.area()
    },
    data() {
      return {
        areaData:[],
        config: {
          data: [
            {
              id: 1,
              name: "乌鲁木齐",
              value:21
            },
            {
              id: 2,
              name: "阿克苏",
              value: 200
            },
            {
              id: 3,
              name: "阿勒泰",
              value: 100
            },
            {
              id: 4,
              name: "昌吉",
              value: 55
            },
            {
              id: 5,
              name: "克拉玛依",
              value: 50
            },
            {
              id: 6,
              name: "石河子",
              value: 100
            },
            {
              id: 7,
              name: "库尔勒",
              value: 200
            },
            {
              id: 8,
              name: "伊犁",
              value: 100
            },
            {
              id: 9,
              name: "塔城",
              value: 200
            },
            {
              id: 10,
              name: "喀什",
              value: 50
            }
          ],
          carousel: 'page',
          unit: '次'
        },
        index: 0,
      };
    },
    methods: {
      area(){
        var data = []
        Checkn.areaList().then(ret=>{
        var list = ret.data.data;
        for(var i=0;i<list.length;i++){
             data.push({
               name:list[i].name,
               value:list[i].countarea
             })
        }
        setInterval(() => {
        let a = data.slice(this.index,5+this.index).map(item => item.name)
        let b = data.slice(this.index,5+this.index).map(item => item.value)
        this.drawLine(a,b);
      },4000)
      })
      },
      drawLine (a,b) {
        if(this.index>=5){
          this.index = 0
        } else {
          this.index++
        }
        let t = this;
        let element = document.getElementById("rightTopChart")
        let myChart = this.$echarts.init(element);
        let op = {
          tooltip: {
            show: true,
            formatter: "{b}:{c}"
          },
          grid: {
            left: '5%',
            right: '10%',
            top: '5%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            show: true,
            type: 'value',
            axisLabel: {
              show: false,
              textStyle: {
                color: '#fff'
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: 'transparent'
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: 'transparent'
              }
            }
          }],
          yAxis: [{
            type: 'category',
            inverse: true,//倒叙
            data: a,
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff',
                fontSize: 16
              },
              interval: 0
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: 'transparent'
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: 'transparent'
              }
            }
          }],
          series: [{
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'right',
                formatter: '{c}',
                textStyle: {
                  color: '#ffffff',
                  fontSize: 16
                }
              }
            },
            itemStyle: {
              normal: {
                label: {
                  show: false,
                  position: 'insideRight'
                },
                color: {
                  type: 'linear',
                  colorStops: [{
                    offset: 0,
                    color: '#00e4e9' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#009dff' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                },
                barBorderRadius: 25
              }
            },
            barWidth: element.offsetHeight / 15,
            barMaxWidth: 25,
            data: b
          }]
        };
        // 绘制图表
        myChart.setOption(op);
        window.addEventListener("resize", function() {
          myChart.resize();
        });
      },
    }
  }
</script>
