<template>
    <div class="visual_conBot">
          <div class="visual_conBot_bot">
      <div class="visualSssf_right" style="margin-top: 10px; float:right;">
        <div class="visualSssf_right_box" id="main5" @click="onfocus"></div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
import New from '@/main.js'
export default {
    data(){
        return {
            points: [],
        };
    },
    mounted() {
        this.drawLine();
        this.drawLine1();
        this.drawLine2();
    },
    methods:{
        drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById("main5"));
        var shadowColor = "#374b86";
        var value = 80;
        let op = {
            title: {
            //text: `${value}几瓶`,
            text: `设备报警`,
            subtext: "",
            left: "center",
            top: "center", //top待调整
            textStyle: {
                color: "#fff",
                fontSize: 16,
                fontFamily: "PingFangSC-Regular"
            },
            subtextStyle: {
                color: "#ff",
                fontSize: 14,
                fontFamily: "PingFangSC-Regular",
                top: "center"
            },
            itemGap: -1 //主副标题间距
            },
            series: [
            {
                name: "pie1",
                type: "pie",
                clockWise: true,
                radius: ["65%", "70%"],
                itemStyle: {
                normal: {
                    label: {
                    show: false
                    },
                    labelLine: {
                    show: false
                    }
                }
                },
                hoverAnimation: false,
                data: [
                {
                    value: value,
                    name: "completed",
                    itemStyle: {
                    normal: {
                        borderWidth: 8,
                        borderColor: {
                        colorStops: [
                            {
                            offset: 0,
                            color: "#1d54f7" || "#00cefc" // 0% 处的颜色
                            },
                            {
                            offset: 1,
                            color: "#68eaf9" || "#367bec" // 100% 处的颜色
                            }
                        ]
                        },
                        color: {
                        // 完成的圆环的颜色
                        colorStops: [
                            {
                            offset: 0,
                            color: "#1d54f7" || "#00cefc" // 0% 处的颜色
                            },
                            {
                            offset: 1,
                            color: "#68eaf9" || "#367bec" // 100% 处的颜色
                            }
                        ]
                        },
                        label: {
                        show: false
                        },
                        labelLine: {
                        show: false
                        }
                    }
                    }
                },
                {
                    name: "gap",
                    value: 100 - value,
                    itemStyle: {
                    normal: {
                        label: {
                        show: false
                        },
                        labelLine: {
                        show: false
                        },
                        color: "rgba(0, 0, 0, 0)",
                        borderColor: "rgba(0, 0, 0, 0)",
                        borderWidth: 0
                    }
                    }
                }
                ]
            }
            ]
        };

        // 绘制图表
        myChart.setOption(op);
        window.addEventListener("resize", function() {
            myChart.resize();
        });
        },
        drawLine1() {
        // 基于准备好的dom，初始化echarts实例

        let myChart = this.$echarts.init(document.getElementById("main6"));
        var shadowColor = "#374b86";
        var value = 85;
        let op = {
            title: {
            //text: `${value}万辆`,
            text: `巡检报警`,
            subtext: "",
            left: "center",
            top: "center", //top待调整
            textStyle: {
                color: "#fff",
                fontSize: 16,
                fontFamily: "PingFangSC-Regular"
            },
            subtextStyle: {
                color: "#ff",
                fontSize: 14,
                fontFamily: "PingFangSC-Regular",
                top: "center"
            },
            itemGap: -1 //主副标题间距
            },

            series: [
            {
                name: "pie1",
                type: "pie",
                clockWise: true,
                radius: ["65%", "70%"],
                itemStyle: {
                normal: {
                    label: {
                    show: false
                    },
                    labelLine: {
                    show: false
                    }
                }
                },
                hoverAnimation: false,
                data: [
                {
                    value: value,
                    name: "completed",
                    itemStyle: {
                    normal: {
                        borderWidth: 8,
                        borderColor: {
                        colorStops: [
                            {
                            offset: 0,
                            color: "#02df94" || "#25d6bc" // 0% 处的颜色
                            },
                            {
                            offset: 1,
                            color: "#28d3d0" || "#14dbaa" // 100% 处的颜色
                            }
                        ]
                        },
                        color: {
                        // 完成的圆环的颜色
                        colorStops: [
                            {
                            offset: 0,
                            color: "#02df94" || "#25d6bc" // 0% 处的颜色
                            },
                            {
                            offset: 1,
                            color: "#28d3d0" || "#14dbaa" // 100% 处的颜色
                            }
                        ]
                        },
                        label: {
                        show: false
                        },
                        labelLine: {
                        show: false
                        }
                    }
                    }
                },
                {
                    name: "gap",
                    value: 100 - value,
                    itemStyle: {
                    normal: {
                        label: {
                        show: false
                        },
                        labelLine: {
                        show: false
                        },
                        color: "rgba(0, 0, 0, 0)",
                        borderColor: "rgba(0, 0, 0, 0)",
                        borderWidth: 0
                    }
                    }
                }
                ]
            }
            ]
        };

        // 绘制图表
        myChart.setOption(op);
        window.addEventListener("resize", function() {
            myChart.resize();
        });
        },
        drawLine2() {
        // 基于准备好的dom，初始化echarts实例

        let myChart = this.$echarts.init(document.getElementById("main7"));
        var shadowColor = "#374b86";
        var value = 46;
        let op = {
            title: {
            //text: `${value}万辆`,
            text: `设备故障`,
            subtext: "",
            left: "center",
            top: "center", //top待调整
            textStyle: {
                color: "#fff",
                fontSize: 16,
                fontFamily: "PingFangSC-Regular"
            },
            subtextStyle: {
                color: "#ff",
                fontSize: 14,
                fontFamily: "PingFangSC-Regular",
                top: "center"
            },
            itemGap: -1 //主副标题间距
            },

            series: [
            {
                name: "pie1",
                type: "pie",
                clockWise: true,
                radius: ["65%", "70%"],
                itemStyle: {
                normal: {
                    label: {
                    show: false
                    },
                    labelLine: {
                    show: false
                    }
                }
                },
                hoverAnimation: false,
                data: [
                {
                    value: value,
                    name: "completed",
                    itemStyle: {
                    normal: {
                        borderWidth: 8,
                        borderColor: {
                        colorStops: [
                            {
                            offset: 0,
                            color: "#eb3600" || "#cc9a00" // 0% 处的颜色
                            },
                            {
                            offset: 1,
                            color: "#d0a00e" || "#d0570e" // 100% 处的颜色
                            }
                        ]
                        },
                        color: {
                        // 完成的圆环的颜色
                        colorStops: [
                            {
                            offset: 0,
                            color: "#eb3600" || "#cc9a00" // 0% 处的颜色
                            },
                            {
                            offset: 1,
                            color: "#d0a00e" || "#d0570e" // 100% 处的颜色
                            }
                        ]
                        },
                        label: {
                        show: false
                        },
                        labelLine: {
                        show: false
                        }
                    }
                    }
                },
                {
                    name: "gap",
                    value: 100 - value,
                    itemStyle: {
                    normal: {
                        label: {
                        show: false
                        },
                        labelLine: {
                        show: false
                        },
                        color: "rgba(0, 0, 0, 0)",
                        borderColor: "rgba(0, 0, 0, 0)",
                        borderWidth: 0
                    }
                    }
                }
                ]
            }
            ]
        };

        // 绘制图表
        myChart.setOption(op);
        window.addEventListener("resize", function() {
            myChart.resize();
        });
        },
        onfocus:function(fromid){
		    	New.$emit('getisshow',{
		    		show:true
		    	})
		     }
    }

}
</script>

<style lang="scss" scoped>
.visual_conBot{
   bottom: 200px;
}
 .visual_conBot_bot {
  width: calc(100% - 8px);
  height: 180px;
  position: absolute;
  top: 4px;
  left: 4px;
  z-index: 10;
}
.visualSssf_right {
  width: 60%;
  height: 80%;
}
.visualSssf_right .visualSssf_right_box {
  width: 33%;
  float: right;
  height: 100%;
}
.table{
    z-index:100;
    bottom: 200px;
}
</style>
