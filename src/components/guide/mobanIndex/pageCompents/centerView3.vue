<template>
  <div class="visual_conBot">
    <!-- <img class="visual_conBot_l" src="../images/ksh42.png" />
    <img class="visual_conBot_2" src="../images/ksh43.png" />
    <img class="visual_conBot_3" src="../images/ksh44.png" />
    <img class="visual_conBot_4" src="../images/ksh45.png" /> -->
    <centerMap/>
  </div>
</template>
<script>
import centerMap from "./centerMap";
export default {
  components: {
    centerMap
  },
  // mounted() {
  //   this.drawLine();
  //   this.drawLine1();
  //   this.drawLine2();
  // },
  data() {
    return {};
  },
  methods: {
    // drawLine() {
    //   // 基于准备好的dom，初始化echarts实例
    //   let myChart = this.$echarts.init(document.getElementById("main5"));
    //   var shadowColor = "#374b86";
    //   var value = 80;
    //   let op = {
    //     title: {
    //       //text: `${value}几瓶`,
    //       text: `报警总数`,
    //       subtext: "",
    //       left: "center",
    //       top: "center", //top待调整
    //       textStyle: {
    //         color: "#fff",
    //         fontSize: 16,
    //         fontFamily: "PingFangSC-Regular"
    //       },
    //       subtextStyle: {
    //         color: "#ff",
    //         fontSize: 14,
    //         fontFamily: "PingFangSC-Regular",
    //         top: "center"
    //       },
    //       itemGap: -1 //主副标题间距
    //     },
    //     series: [
    //       {
    //         name: "pie1",
    //         type: "pie",
    //         clockWise: true,
    //         radius: ["65%", "70%"],
    //         itemStyle: {
    //           normal: {
    //             label: {
    //               show: false
    //             },
    //             labelLine: {
    //               show: false
    //             }
    //           }
    //         },
    //         hoverAnimation: false,
    //         data: [
    //           {
    //             value: value,
    //             name: "completed",
    //             itemStyle: {
    //               normal: {
    //                 borderWidth: 8,
    //                 borderColor: {
    //                   colorStops: [
    //                     {
    //                       offset: 0,
    //                       color: "#1d54f7" || "#00cefc" // 0% 处的颜色
    //                     },
    //                     {
    //                       offset: 1,
    //                       color: "#68eaf9" || "#367bec" // 100% 处的颜色
    //                     }
    //                   ]
    //                 },
    //                 color: {
    //                   // 完成的圆环的颜色
    //                   colorStops: [
    //                     {
    //                       offset: 0,
    //                       color: "#1d54f7" || "#00cefc" // 0% 处的颜色
    //                     },
    //                     {
    //                       offset: 1,
    //                       color: "#68eaf9" || "#367bec" // 100% 处的颜色
    //                     }
    //                   ]
    //                 },
    //                 label: {
    //                   show: false
    //                 },
    //                 labelLine: {
    //                   show: false
    //                 }
    //               }
    //             }
    //           },
    //           {
    //             name: "gap",
    //             value: 100 - value,
    //             itemStyle: {
    //               normal: {
    //                 label: {
    //                   show: false
    //                 },
    //                 labelLine: {
    //                   show: false
    //                 },
    //                 color: "rgba(0, 0, 0, 0)",
    //                 borderColor: "rgba(0, 0, 0, 0)",
    //                 borderWidth: 0
    //               }
    //             }
    //           }
    //         ]
    //       }
    //     ]
    //   };

    //   // 绘制图表
    //   myChart.setOption(op);
    //   window.addEventListener("resize", function() {
    //     myChart.resize();
    //   });
    // },
    // drawLine1() {
    //   // 基于准备好的dom，初始化echarts实例

    //   let myChart = this.$echarts.init(document.getElementById("main6"));
    //   var shadowColor = "#374b86";
    //   var value = 85;
    //   let op = {
    //     title: {
    //       //text: `${value}万辆`,
    //       text: `今日上线`,
    //       subtext: "",
    //       left: "center",
    //       top: "center", //top待调整
    //       textStyle: {
    //         color: "#fff",
    //         fontSize: 16,
    //         fontFamily: "PingFangSC-Regular"
    //       },
    //       subtextStyle: {
    //         color: "#ff",
    //         fontSize: 14,
    //         fontFamily: "PingFangSC-Regular",
    //         top: "center"
    //       },
    //       itemGap: -1 //主副标题间距
    //     },

    //     series: [
    //       {
    //         name: "pie1",
    //         type: "pie",
    //         clockWise: true,
    //         radius: ["65%", "70%"],
    //         itemStyle: {
    //           normal: {
    //             label: {
    //               show: false
    //             },
    //             labelLine: {
    //               show: false
    //             }
    //           }
    //         },
    //         hoverAnimation: false,
    //         data: [
    //           {
    //             value: value,
    //             name: "completed",
    //             itemStyle: {
    //               normal: {
    //                 borderWidth: 8,
    //                 borderColor: {
    //                   colorStops: [
    //                     {
    //                       offset: 0,
    //                       color: "#02df94" || "#25d6bc" // 0% 处的颜色
    //                     },
    //                     {
    //                       offset: 1,
    //                       color: "#28d3d0" || "#14dbaa" // 100% 处的颜色
    //                     }
    //                   ]
    //                 },
    //                 color: {
    //                   // 完成的圆环的颜色
    //                   colorStops: [
    //                     {
    //                       offset: 0,
    //                       color: "#02df94" || "#25d6bc" // 0% 处的颜色
    //                     },
    //                     {
    //                       offset: 1,
    //                       color: "#28d3d0" || "#14dbaa" // 100% 处的颜色
    //                     }
    //                   ]
    //                 },
    //                 label: {
    //                   show: false
    //                 },
    //                 labelLine: {
    //                   show: false
    //                 }
    //               }
    //             }
    //           },
    //           {
    //             name: "gap",
    //             value: 100 - value,
    //             itemStyle: {
    //               normal: {
    //                 label: {
    //                   show: false
    //                 },
    //                 labelLine: {
    //                   show: false
    //                 },
    //                 color: "rgba(0, 0, 0, 0)",
    //                 borderColor: "rgba(0, 0, 0, 0)",
    //                 borderWidth: 0
    //               }
    //             }
    //           }
    //         ]
    //       }
    //     ]
    //   };

    //   // 绘制图表
    //   myChart.setOption(op);
    //   window.addEventListener("resize", function() {
    //     myChart.resize();
    //   });
    // },
    // drawLine2() {
    //   // 基于准备好的dom，初始化echarts实例

    //   let myChart = this.$echarts.init(document.getElementById("main7"));
    //   var shadowColor = "#374b86";
    //   var value = 46;
    //   let op = {
    //     title: {
    //       //text: `${value}万辆`,
    //       text: `今日报警`,
    //       subtext: "",
    //       left: "center",
    //       top: "center", //top待调整
    //       textStyle: {
    //         color: "#fff",
    //         fontSize: 16,
    //         fontFamily: "PingFangSC-Regular"
    //       },
    //       subtextStyle: {
    //         color: "#ff",
    //         fontSize: 14,
    //         fontFamily: "PingFangSC-Regular",
    //         top: "center"
    //       },
    //       itemGap: -1 //主副标题间距
    //     },

    //     series: [
    //       {
    //         name: "pie1",
    //         type: "pie",
    //         clockWise: true,
    //         radius: ["65%", "70%"],
    //         itemStyle: {
    //           normal: {
    //             label: {
    //               show: false
    //             },
    //             labelLine: {
    //               show: false
    //             }
    //           }
    //         },
    //         hoverAnimation: false,
    //         data: [
    //           {
    //             value: value,
    //             name: "completed",
    //             itemStyle: {
    //               normal: {
    //                 borderWidth: 8,
    //                 borderColor: {
    //                   colorStops: [
    //                     {
    //                       offset: 0,
    //                       color: "#eb3600" || "#cc9a00" // 0% 处的颜色
    //                     },
    //                     {
    //                       offset: 1,
    //                       color: "#d0a00e" || "#d0570e" // 100% 处的颜色
    //                     }
    //                   ]
    //                 },
    //                 color: {
    //                   // 完成的圆环的颜色
    //                   colorStops: [
    //                     {
    //                       offset: 0,
    //                       color: "#eb3600" || "#cc9a00" // 0% 处的颜色
    //                     },
    //                     {
    //                       offset: 1,
    //                       color: "#d0a00e" || "#d0570e" // 100% 处的颜色
    //                     }
    //                   ]
    //                 },
    //                 label: {
    //                   show: false
    //                 },
    //                 labelLine: {
    //                   show: false
    //                 }
    //               }
    //             }
    //           },
    //           {
    //             name: "gap",
    //             value: 100 - value,
    //             itemStyle: {
    //               normal: {
    //                 label: {
    //                   show: false
    //                 },
    //                 labelLine: {
    //                   show: false
    //                 },
    //                 color: "rgba(0, 0, 0, 0)",
    //                 borderColor: "rgba(0, 0, 0, 0)",
    //                 borderWidth: 0
    //               }
    //             }
    //           }
    //         ]
    //       }
    //     ]
    //   };

    //   // 绘制图表
    //   myChart.setOption(op);
    //   window.addEventListener("resize", function() {
    //     myChart.resize();
    //   });
    // }
  }
};
</script>

<style lang="scss" scoped>
.visual_conBot {
  height: calc(100% - 136px);
  background: url(../images/ksh41.png) no-repeat;
  background-size: 100% 100%;
  position: relative;
}
// .visual_conBot > img {
//   position: absolute;
//   width: 25px;
//   height: 25px;
// }
// .visual_conBot .visual_conBot_l {
//   position: absolute;
//   left: 0;
//   top: 0;
// }
// .visual_conBot .visual_conBot_2 {
//   position: absolute;
//   right: 0;
//   top: 0;
// }
// .visual_conBot .visual_conBot_3 {
//   position: absolute;
//   right: 0;
//   bottom: 0;
// }
// .visual_conBot .visual_conBot_4 {
//   position: absolute;
//   left: 0;
//   bottom: 0;
// }
// .visual_conBot .visual_chart {
//   width: 100%;
//   height: 100%;
//   position: absolute;
// }
// .visual_conBot .visual_chart_text {
//   color: #fff;
//   position: absolute;
//   top: 15px;
//   left: 15px;
//   z-index: 99;
// }
// .visual_conBot .visual_chart_text h1 {
//   font-size: 26px;
//   margin-bottom: 6px;
// }
// .visual_conBot .visual_chart_text h2 {
//   font-size: 20px;
// }
// .visual_conBot .visual_conBot_bot {
//   width: calc(100% - 8px);
//   height: 180px;
//   background: rgba(16, 54, 87, 0.5);
//   border: 1px solid #345f92;
//   position: absolute;
//   bottom: 4px;
//   left: 4px;
//   z-index: 99;
// }

// .visualSssf_left {
//   width: 40%;
//   float: left;
//   color: #fff;
//   padding: 10px 20px 0 20px;
// }
// .visualSssf_left h3 {
//   color: #fff;
//   font-size: 20px;
//   font-weight: 600;
//   margin-bottom: 10px;
// }
// .visualSssf_left a {
//   width: 32%;
//   color: #fff;
//   display: inline-block;
//   margin-bottom: 10px;
//   cursor: pointer;
// }
// .visualSssf_left a.active {
//   color: #01f0ff;
// }
// .visualSssf_right {
//   width: 60%;
//   height: 100%;
//   float: left;
// }
// .visualSssf_right .visualSssf_right_box {
//   width: 33%;
//   float: left;
//   height: 100%;
// }

// .visualSfzsfl {
//   position: relative;
// }
// .visualSfzsfl .visual_chart {
//   opacity: 0.6;
// }
// .visualSfzsfl .visual_table {
//   width: 60%;
//   position: absolute;
//   z-index: 99;
//   top: 40px;
//   left: 0;
// }
// .visualSfzsfl .visual_table table {
//   width: 100%;
//   color: #fff;
//   text-align: center;
// }
// .visualSfzsfl .visual_table table tr {
//   border-bottom: 1px dashed #ddd;
// }
// .visualSfzsfl .visual_table table tr:first-child {
//   color: #01c0ff;
// }
// .visualSfzsfl .visual_table table tr:last-child {
//   border-bottom: 1px solid #ddd;
// }
</style>
