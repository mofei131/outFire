<template>
  <div id="TempGroup">
    <!--创建一个echarts的容器-->
    <dv-border-box-8 class="borderTest">
      <div id="RR" style=" height:42vh;"></div>
    </dv-border-box-8>
  </div>
</template>

<script>
let echarts = require("echarts");
export default {
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById("RR"));

    // 绘制图表
    myChart.setOption({
      backgroundColor: "rgba(17, 57, 125, 0.3)",
      title: {
        text: "灭火器保有量",
        left: "center",
        top: 20,
        textStyle: {
          color: "#FFFFFF",
          fontSize: "120%"
        }
      },

      tooltip: {
        trigger: "item",
        formatter: "{b} : {c} ({d}%)"
      },

      visualMap: {
        show: false,
        min: 500,
        max: 600,
        inRange: {
          //colorLightness: [0, 1]
        }
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "60%",
          center: ["50%", "60%"],
          color: ["rgb(131,249,103)", "#FBFE27", "#FE5050", "#1DB7E5"], //'#FBFE27','rgb(11,228,96)','#FE5050'
          data: [
            {
              id: 1,
              value: 100,
              name: "手提式干粉灭火器"
            },
            {
              id: 2,
              value: 200,
              name: "手提式二氧化碳灭火器"
            },
            {
              id: 3,
              value: 100,
              name: "手提式泡沫灭火器"
            },
            {
              id: 4,
              value: 200,
              name: "手提式水基型灭火器"
            },
            {
              id: 5,
              value: 50,
              name: "手提式卤代烷灭火器"
            },
            {
              id: 6,
              value: 100,
              name: "推车式干粉灭火器"
            },
            {
              id: 7,
              value: 200,
              name: "推车式二氧化碳灭火器"
            },
            {
              id: 8,
              value: 100,
              name: "推车式泡沫灭火器"
            },
            {
              id: 9,
              value: 200,
              name: "推车式水基型灭火器"
            },
            {
              id: 10,
              value: 50,
              name: "推车式卤代烷灭火器"
            }
            // {
            //   id: 1,
            //   value: 285,
            //   name: "1号测试合集",
            //   location: [
            //     {
            //       id: 1,
            //       lng: 121.456717,
            //       lat: 37.469123,
            //       value: "id为1",
            //       show: false,
            //       warnData:[{code:111,status:false},{code:222,status:false}]
            //     },
            //     {
            //       id: 2,
            //       lng: 121.526856,
            //       lat: 37.409985,
            //       value: "id为2",
            //       show: false,
            //       warnData:[{code:333,status:false},{code:444,status:false}]
            //     }
            //   ]
            // },
            // {
            //   id: 2,
            //   value: 410,
            //   name: "2号测试合集",
            //   location: [
            //     {
            //       id: 3,
            //       lng: 121.438894,
            //       lat: 37.463166,
            //       value: "id为3",
            //       show: false,
            //       warnData:[{code:555,status:false},{code:666,status:false}]
            //     },
            //     {
            //       id: 4,
            //       lng: 121.604478,
            //       lat: 37.428155,
            //       value: "id为4",
            //       show: false,
            //        warnData:[{code:777,status:false},{code:888,status:false}]
            //     }
            //   ]
            // },
            // {
            //   id: 3,
            //   value: 274,
            //   name: "3号测试合集",
            //   location: [
            //     {
            //       id: 5,
            //       lng: 121.398083,
            //       lat: 37.437783,
            //       value: "id为5",
            //       show: false,
            //       warnData:[{code:999,status:false},{code:1010,status:false}]
            //     }
            //   ]
            // },
            // {
            //   id: 4,
            //   value: 235,
            //   name: "3号测试合集",
            //   location: [
            //     {
            //       id: 6,
            //       lng: 121.477997,
            //       lat: 37.41715,
            //       value: "id为6",
            //       show: false,
            //       warnData:[{code:1111,status:false},{code:1212,status:false}]
            //     }
            //   ]
            // }
          ].sort(function(a, b) {
            return a.value - b.value;
          }),
          roseType: "radius",

          label: {
            normal: {
              // formatter: ["{c|{c}次}", "{b|{b}}"].join("\n"),
              formatter: ["{c|{c}}", "{b|{b}}"].join("\n"),

              rich: {
                c: {
                  color: "rgb(241,246,104)",
                  // fontSize: 20,
                  // fontSize: window.innerHeight*0.02+"",
                  fontSize: "100%",
                  fontWeight: "bold",
                  lineHeight: 5
                },
                b: {
                  // color: "rgb(98,137,169)",
                  color: "#FFFFFF",

                  // fontSize: 15,
                  fontSize: "70%",
                  // height: 40
                  height: window.innerHeight * 0.05 + ""
                }
              }
            }
          },
          labelLine: {
            normal: {
              lineStyle: {
                color: "rgb(98,137,169)"
              },
              smooth: 0,
              length: 10,
              length2: 5 //线长度
            }
          },
          itemStyle: {
            normal: {
              shadowColor: "rgba(0, 0, 0, 0.8)",
              shadowBlur: 50
            }
          }
        }
      ]
    });

    //可缩放
    window.addEventListener("resize", () => {
      myChart.resize();
    });

    myChart.on("click", params => {
      console.log(params);
      console.log(params.data.location);
      // this.position = params.data.location
      // this.$emit('sendPosition',this.position);
      // var a = params.dataIndex;
      // var energyAreaId = params.data.id;
      // var url = params.data.url;
      // console.log(url);
      // this.areaEnergyindex = a;
    });
  },
  data() {
    return {
      position: []
    };
  },
  components: {},
  methods: {}
};
</script>

<style scoped>
#TempGroup {
  /* margin-top: 1.5vh; */
  /* padding: 1.5vh; */
}

#RR {
  padding: 1.5vh;
  /* background-color: #0D1D8E; */

  /* background-color: #00BDB1; */
  /* border-radius: 15px; */
}

.borderTest {
  /* padding: 10px; */
}
</style>

