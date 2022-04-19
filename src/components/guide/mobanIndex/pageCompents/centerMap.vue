<template>
  <div id="myChart" class="center" ></div>
</template>
<script type="text/javascript">
import xj from 'echarts/map/json/province/xinjiang'
import byglmgzzz from '@/assets/json/巴音郭楞蒙古自治州'
// import sd from 'echarts/map/json/province/shandong'
export default {
  data(){
    return{
      btn: false,
      option: {
        // visualMap: { // 地图矢量柱
        //   min: 0,
        //   max: 200,
        //   left: 'left',
        //   top: 'bottom',
        //   text:['高','低'],
        //   calculable : true,
        //   inRange: {
        //     color: ['#a9dcf9','#271CF2']
        //   },
        //   textStyle: {
        //     color: '#fff'
        //   }
        // },
        tooltip: {
          trigger: 'item',
          formatter: '{b}'
        },
        series: [{
          name: '',
          type: 'map', //地图种类
          mapType: '新疆', //地图类型
          label: {
            normal: {
              show: false,//显示省份标签
              textStyle:{color:"#000"},//省份标签字体颜色
              fontSize:"1px",
            },
            emphasis: {//对应的鼠标悬浮效果
              show: true,
              textStyle:{color:"#fff"}
            }
          },
          itemStyle: {
            normal: {
              borderWidth: .5,//区域边框宽度
              borderColor: '#271CF2',//区域边框颜色
              areaColor:"#395A6B",//区域颜色
            },
            emphasis: {
              borderWidth: .5,
              borderColor: '#271CF2',
              areaColor:"#271CF2",
            }
          },
          data:[
            {
              name:'哈密市',
              itemStyle: {
                normal: {
                  // areaColor: '#2059f7',
                  borderColor: '#edce00',
                }
              }
            },
            {
              name:'乌鲁木齐市',
              itemStyle: {
                normal: {
                  // areaColor: '#0075C4',
                  borderColor: '#0abcee'
                }
              }
            },
            {
              name:'克拉玛依市',
              itemStyle: {
                normal: {
                  // areaColor: '#EFA00B',
                  borderColor: '#1ca9f2'
                }
              }
            },
            {
              name:'喀什地区',
              itemStyle: {
                normal: {
                  // areaColor: '#D65108',
                  borderColor: '#88ddf5',
                }
              }
            },
            {
              name:'和田地区',
              itemStyle: {
                normal: {
                  // areaColor: '#BF211E',
                  borderColor: '#1ca9f2'
                  
                }
              }
            },
            {
              name:'阿克苏地区',
              itemStyle: {
                normal: {
                  // areaColor: '#2D20DE',
                  borderColor: '#45b5ef'
                }
              }
            },
            {
              name:'伊犁哈萨克自治州',
              itemStyle: {
                normal: {
                  // areaColor: '#02427B',
                  borderColor: '#45b5ef',
                }
              }
            },
            {
              name:'塔城地区',
              itemStyle: {
                normal: {
                  // areaColor: '#CDDB0A',
                  borderColor: '#edce00'
                }
              }
            },
            {
              name:'阿勒泰地区',
              itemStyle: {
                normal: {
                  // areaColor: '#2364AA',
                  borderColor: '#45b5ef',
                }
              }
            },
            {
              name:'昌吉自治州',
              itemStyle: {
                normal: {
                  // areaColor: '#FFA400',
                  borderColor: '#edce00'
                }
              }
            },
            {
              name:'吐鲁番市',
              itemStyle: {
                normal: {
                  // areaColor: '#E49061',
                  borderColor: '#45b5ef',
                }
              }
            },
            {
              name:'博尔塔拉蒙古自治州',
              itemStyle: {
                normal: {
                  // areaColor: '#13d5ff',
                  borderColor: '#45b5ef'
                }
              }
            },
            {
              name:'巴音郭楞蒙古自治州',
              itemStyle: {
                normal: {
                  // areaColor: '#65DB0A',
                  borderColor: '#45b5ef',
                }
              }
            },
            {
              name:'昌吉回族自治州',
              itemStyle: {
                normal: {
                  // areaColor: '#180ADB',
                  borderColor: '#45b5ef',
                }
              }
            },
            {
              name:'克孜勒苏柯尔克孜自治州',
              itemStyle: {
                normal: {
                  // areaColor: '#0ABFDB',
                  borderColor: '#45b5ef',
                }
              }
            }
          ]
        }]
      }
    }
  },
  methods: {
    echartsInit(){
      var _this = this
      let chart = this.$echarts.init(document.getElementById('myChart'))
      chart.setOption(this.option)
      chart.on('click',function(param){
        var param = param.name
        // console.log('param', param)
        //释放图标实例
        // _this.$echarts.dispose(document.getElementById('myChart'))
        // let chart = _this.$echarts.init(document.getElementById('myChart'))
        // _this.option.series[0].mapType = param.name
        // console.log('...' + _this.option.series[0].mapType)
        // chart.setOption(_this.option, true)
        _this.$emit('emitMapToParentGetCarWarning', param)
      })
    }
  },
  mounted () {
    this.echartsInit()
  }
}
</script>
<style lang="scss" scoped>
.center{
  height: calc(100%);
  // position: relative;
  // top: 50%
  margin-right: 25px;
  margin: 0px;
}
</style>
