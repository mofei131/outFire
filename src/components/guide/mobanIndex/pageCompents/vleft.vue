<template>
  <div class="leftbox">
    <div class="visual_box">
      <vtitle :txt="txt1" :imgsrc="require('../images/icon1.png')" />
      <div class="visual_chart" id="leftPie"></div>
    </div>
    <div class="visual_box">
      <vtitle :txt="txt2" :imgsrc="require('../images/icon2.png')" />
      <div class="visual_chart" id="main2"></div>
    </div>
    <div class="visual_box">
      <vtitle :txt="txt3" :imgsrc="require('../images/icon3.png')" />
      <letBtn />
    </div>
    
    <div class="cityData" v-show="isShow">
      <el-table :data="compDataList" height="380px"
      :row-style="getRowClass" :header-row-style="getRowClass" :header-cell-style="getRowClass2">
        <el-table-column align="center" prop="name" label="企业名称"></el-table-column>
        <el-table-column align="center" prop="safeManager" label="责任人"></el-table-column>
        <el-table-column align="center" prop="safeManagerPhone" label="手机号"></el-table-column>
        <el-table-column align="center" prop="updateTime" label="更新时间"></el-table-column>
      </el-table>
      <i class="el-icon-error closeBtn" @click="isShow = false"></i>
    </div>
    <div class="cityData" v-show="isShow1">
      <el-table :data="InstallData" height="380px"
      :row-style="getRowClass" :header-row-style="getRowClass" :header-cell-style="getRowClass2">
        <el-table-column align="center" prop="compId" label="所属企业"></el-table-column>
        <el-table-column align="center" prop="cardNo" label="设备卡号"></el-table-column>
        <el-table-column align="center" prop="brand" label="设备品牌"></el-table-column>
        <el-table-column align="center" prop="longitude" label="设备型号"></el-table-column>
        <el-table-column align="center" prop="name" label="设备名称"></el-table-column>
        <el-table-column align="center" prop="factureTime" label="出场时间"></el-table-column>
        <el-table-column align="center" prop="installId" label="安装厂家"></el-table-column>
        <el-table-column align="center" prop="installTime" label="安装时间"></el-table-column>
      </el-table>
      <i class="el-icon-error closeBtn" @click="isShow1 = false"></i>
    </div>
    <div class="cityData" v-show="isShow2">
      <el-table :data="MaintainData" height="380px"
      :row-style="getRowClass" :header-row-style="getRowClass" :header-cell-style="getRowClass2">
        <el-table-column align="center" prop="cid" label="设备编号"></el-table-column>
        <el-table-column align="center" prop="compId" label="所属企业"></el-table-column>
        <el-table-column align="center" prop="type" label="维保类型"></el-table-column>
        <el-table-column align="center" prop="content" label="维保内容"></el-table-column>
        <el-table-column align="center" prop="userId" label="维保人员"></el-table-column>
        <el-table-column align="center" prop="endTime" label="维保日期"></el-table-column>
      </el-table>
      <i class="el-icon-error closeBtn" @click="isShow2 = false"></i>
    </div>
    <div class="cityData" v-show="isShow3">
      <el-table :data="DiscardData" height="380px"
      :row-style="getRowClass" :header-row-style="getRowClass" :header-cell-style="getRowClass2">
        <el-table-column align="center" prop="cid" label="设备编号"></el-table-column>
        <el-table-column align="center" prop="name" label="设备名称"></el-table-column>
        <el-table-column align="center" prop="compId" label="所属企业"></el-table-column>
        <el-table-column align="center" prop="destroyId" label="报废企业"></el-table-column>
        <el-table-column align="center" prop="destrotContent" label="报废内容"></el-table-column>
        <el-table-column align="center" prop="destrotTime" label="报废时间"></el-table-column>
      </el-table>
      <i class="el-icon-error closeBtn" @click="isShow3 = false"></i>
    </div>
  </div>
</template>
<script>
import vtitle from "./title";
import echarts from 'echarts'
import letBtn from "./leftBoxBtn";
import * as Comp from '../../../../api/comp/comp';
import * as Dict from '../../../../api/system/dict';
import * as Device from '../../../../api/device/device'
import * as Maintain from '../../../../api/recheck/recheck'
import * as Checkn from '../../../../api/check/checkn'
export default {
  mounted() {
    this.install();
    this.getCompDataAndDrawPie();
  },
  components: {
    vtitle,
    letBtn
  },
  data() {
    var that = this;
    this.chartExtend = {
      xAxis: {
        axisLabel: {
          textStyle: {
            color: "#fff" //x轴字体颜色
          }
        }
      },
      yAxis: {
        axisLabel: {
          textStyle: {
            color: "#fff" //y轴字体颜色
          }
        }
      },
      legend: {
        textStyle: {
          color: "#fff" //图例字体颜色
        }
      }
    };
    this.histClickEvent = {
      click: function(e){
        console.log('click ' , e);
        Dict.getDictionary({code:'comp_property'}).then(ret => {
          var comps = ret.data.data;
          var propertyId = 0;
          for(var i=0; i<comps.length; i++){
            if(comps[i].dictValue == e.name){
              propertyId = comps[i].dictKey;
              break;
            }
          }
          //请求企业信息
          var data = [];
          Comp.getList(1, 10, {propertyId: propertyId}).then(ret =>{
            //显示企业
            var list = ret.data.data.records;
            // console.log(list, ret);
            for(var i=0; i<list.length; i++){
              data.push({
                name: list[i].name,
                safeManager: list[i].safeLeader,
                safeManagerPhone: list[i].safeManagerPhone,
                updateTime: list[i].updateTime,
              })
            }
            that.isShow = true;
            that.compDataList = data;
          });
        });
      }
    }
    return {
      txt: "通知",
      txt1: "重点消防企业",
      txt2: "维保和报废数量",
      txt3: "巡检数据",
      chartData: {
        columns: ["类型", "企业数量"],
        rows: []
      },
      grid: {
        x: 35,
        y: 35,
        x2: 15,
        y2: 25
      },
      isShow: false,
      isShow1: false,
      isShow2: false,
      isShow3: false,
      compDataList: [],
      InstallData:[],
      MaintainData:[],
      DiscardData:[],
      MonthData:[],
      Recheck:[],
      Destrot:[]
    };
  },
  methods: {
    install(){
      var data = new Array();
      var recheck = []
      var destrot = []
     Checkn.installList().then(ret=>{
        var list = ret.data.data;
        for(var i=0;i<list.length;i++){
          data.push(list[i].monthscount)
        }
        //请求完数据后再显示echart
        this.MonthData = data;
        this.drawLine();
      })
      Checkn.recheckList().then(ret=>{
        var list = ret.data.data;
        for(var i=0;i<list.length;i++){
          recheck.push(list[i].monthscount)
        }
        //请求完数据后再显示echart
        this.Recheck = recheck;
        this.drawLine();
      })
      Checkn.destrotList().then(ret=>{
        var list = ret.data.data;
        for(var i=0;i<list.length;i++){
          destrot.push(list[i].monthscount)
        }
        //请求完数据后再显示echart
        this.Destrot = destrot;
        this.drawLine();
      })
    },
    drawLine() {
      let t = this;
      let myChart = this.$echarts.init(document.getElementById("main2"));
      let op = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#ffffff'
            }
          },
          textStyle: {
            fontSize: 14,
            color: '#ffffff'
          }
        },
        legend: {
          icon: 'circle',
          itemWidth: 14,
          itemHeight: 14,
          itemGap: 14,
          data: ['安装数', '维保数', '报废数'],
          right: '4%',
          top:'5',
          textStyle: {
            fontSize: 14,
            color: '#ffffff'
          }
        },
        grid: this.grid,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: "#105a77"
              }
            },
            axisLabel: {
              textStyle: {
                fontSize: 12,
                color: '#00d0d0'
              },
              interval: 0
            },
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ]
          }
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: "#105a77"
              }
            },
            axisLabel: {
              textStyle: {
                fontSize: 12,
                color: '#00d0d0'
              }
            },
            splitLine: {
              lineStyle: {
                color: '#105a77'
              }
            }
          }
        ],
        series: [
          {
            name: '安装数',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 4,
            showSymbol: true,
            lineStyle: {
              normal: {
                width: 2
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(9, 129,221, 0.5)'
                }, {
                  offset: 1,
                  color: 'rgba(9, 129,221, 0.1)'
                }], false),
    
              }
            },
            itemStyle: {
              normal: {
                color: "#0981dd",
                borderColor: "#ffffff",
                borderWidth: 4
    
              }
            },    
            data: this.MonthData
          },
          {
            name: "维保数",
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 4,
            showSymbol: true,
            lineStyle: {
              normal: {
                width: 2,
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(248, 155, 2, 0.5)'
                }, {
                  offset: 1,
                  color: 'rgba(248, 155, 2, 0.1)'
                }], false),
              }
            },
            itemStyle: {
              normal: {
                color: '#f89b02',
                borderColor: '#ffffff',
                borderWidth: 4
    
              }
            },
            data: this.Recheck
          },
          {
            name: "报废数",
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 4,
            showSymbol: true,
            lineStyle: {
              normal: {
                width: 2
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(255, 105, 122, 0.5)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 105, 122, 0.1)'
                }], false),
              }
            },
            itemStyle: {
              normal: {
                color: '#ff697a',
                borderColor: '#ffffff',
                borderWidth: 4
            
              }
            },
            data: this.Destrot
          }
        ]
      };
      // 绘制图表
      myChart.setOption(op);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
      var that = this;
      myChart.on('click', function(e){
        console.log("作为一个节点")
        // console.log(e)
       if(e.componentIndex == 0){
          var data = []
          Device.getList(1,10).then(ret =>{
            var list = ret.data.data.records;
            for(var i=0;i<list.length;i++){
              data.push({
                compId:list[i].compId,
                cardNo:list[i].cardNo,
                brand:list[i].brand,
                longitude:list[i].longitude,
                name:list[i].name,
                factureTime:list[i].factureTime,
                installId:list[i].installId,
                installTime:list[i].installTime
              })
            }
            that.InstallData = data;
            that.isShow1 = true;
            that.isShow2 = false;
            that.isShow3 = false;
          })
       }else if(e.componentIndex == 1){
         var data = []
          Maintain.getList(1,10).then(ret =>{
            var list = ret.data.data.records;
            for(var i=0;i<list.length;i++){
              data.push({
                cid:list[i].cid,
                compId:list[i].compId,
                type:list[i].type,
                content:list[i].content,
                userId:list[i].userId,
                endTime:list[i].endTime,
              })
            }
            that.MaintainData = data;
            that.isShow2 = true;
            that.isShow1 = false;
            that.isShow3 = false;
          })
       }else{
          var data = []
          Device.getList(1,10).then(ret =>{
            var list = ret.data.data.records;
            for(var i=0;i<list.length;i++){
              data.push({
                cid:list[i].cid,
                name:list[i].name,
                compId:list[i].compId,
                destroyId:list[i].destroyId,
                destrotContent:list[i].destrotContent,
                destrotTime:list[i].destrotTime,
              })
            }
            that.DiscardData = data;
            that.isShow3 = true;
            that.isShow2 = false;
            that.isShow1 = false;
          })
       }
      });
    },
    drawTopChart(){
      Dict.getDictionary({code:'comp_property'}).then(ret => {
        var comps = ret.data.data;
        var that = this;
        Comp.selectListGroupByPropertyId().then(ret => {
          var list = ret.data.data;
          var rows = [];
          for(var i=0; i<comps.length; i++){
            var value = 0;
            for(var j=0; j<list.length; j++){
              if(list[j].propertyId == comps[i].dictKey){
                value = list[j].id;
                break;
              }
            }
            rows.push({
              类型: comps[i].dictValue,
              企业数量: value
            })
          }
          that.chartData.rows = rows;
        });
      });
    },
    getCompDataAndDrawPie(){
      var that = this;
      Dict.getDictionary({code:'comp_property'}).then(ret => {
        var comps = ret.data.data;
        Comp.selectListGroupByPropertyId().then(ret => {
          var list = ret.data.data;
          var rows = [];
          for(var i=0; i<comps.length; i++){
            var value = 0;
            for(var j=0; j<list.length; j++){
              if(list[j].propertyId == comps[i].dictKey){
                value = list[j].id;
                break;
              }
            }
            rows.push({
              name: comps[i].dictValue,
              value: value,
              keyid: comps[i].dictKey
            })
          }
          //console.log(rows);
          that.drawTopPie(rows);
        });
      });
    },
    drawTopPie(data){
      var that = this;
      let chartsData = data.map(item => {
        return {
          name: item.name,
          y: parseInt(item.value),
          keyid: parseInt(item.keyid)
        }
      })
      Highcharts.setOptions({
        colors: ['#ff752a', '#70d947', '#ff697a', '#f89b02', '#8a75e2', '#70c8a9', '#FFF263', '#6AF9C4']
      });
      var chart = Highcharts.chart('leftPie', {
        chart: {
          type: 'pie',
          backgroundColor: 'transparent',
          options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
          }
        },
        credits: {
          enabled: false   //去掉画板上面的highcharts.com
        },
        title: {
          text: '',
          floating: false
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
              enabled: true,
              format: '{point.name}：{point.percentage:.1f}%',
              style: {
                color: '#ffffff',
                fontSize: 12
              }
            },
            events: {
              click: function (e) {
                var data = [];
                Comp.getList(1, 10, {propertyId: e.point.keyid}).then(ret =>{
                  //显示企业
                  var list = ret.data.data.records;
                  for(var i=0; i<list.length; i++){
                    data.push({
                      name: list[i].name,
                      safeManager: list[i].safeLeader,
                      updateTime: list[i].updateTime,
                      safeManagerPhone: list[i].safeManagerPhone
                    })
                  }
                  that.isShow = true;
                  that.compDataList = data;
                });
              }    
            }
          }
        },
        series: [{
          name: '重点消防企业',
          data: chartsData
        }]
      });
   
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
                return "background:rgba(16, 54, 87, 0.5);color:#CAFFFF;";
            },
            getRowClass2({ row, column, rowIndex, columnIndex }) {
                return "background:rgba(16, 54, 87, 0.5);color:#fff;";
            },
    
  }
};
</script>

<style lang="scss" scoped>
.leftbox {
  width: 100%;
  height: 100%;
}
.visual_box {
  height: calc(33.333% - 10px);
  position: relative;
  margin-bottom: 10px;
  z-index: 2;
}
.visual_box:before {
    background: url(../images/top.png) center no-repeat;
    background-size: 100% auto;
    width: 100%;
    height: 10px;
    display: block;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
}
.visual_box:after {
    background: url(../images/bottom.png) center no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 10px;
    display: block;
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
}
.visual_box .visual_chart {
  height: calc(100% - 40px);
  background: rgba(49,151,255,0.1);
  position: relative;
  z-index: 3;
}

#main1 {
  height: 100%;
}

.cityData {
  position: fixed;
  max-height: 90%;
  overflow: auto;
  background: url(../images/dia.png) center no-repeat;
  background-size: 100% 100%;;
  width: 820px;
  height: 550px;
  top: 105px;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 1000;
  padding: 80px 50px 0;
  .closeBtn {
    background: url(../images/close.png) center no-repeat;
    width: 44px;
    height: 44px;
    display: block;
    cursor: pointer;
    position: absolute;
    top: 15px;
    right: 10px;
    z-index: 1000;
  }
  .el-table {
    // border-radius: 8px;
    background: rgba(16, 54, 87, 0);
  }
  .el-table::before {
    height: 0
  }
  /deep/ .el-table tr th {
    line-height: 29px;
    text-align: center;
    font-weight: bold;
    border-bottom: none;
    font-size: 15px;
    padding: 4px 0;
    border-top: 1px solid #00c1ff;
  }
  /deep/ .el-table tr th.gutter {
    background: rgba(51, 195, 236, 0.14)
  }
  /deep/ .el-table__body tr:hover>td {
    background-color: transparent;
  }
  /deep/ .el-table__body tr>td {
    padding: 6px 0;
    font-size: 14px;
    border-bottom: 0;
  }
  /deep/ .el-table__body  tr:nth-child(2n) td {
    background-color: rgba(5, 37, 63, 1);
  }
  /deep/ .el-table__body  tr:nth-child(2n-1) td {
    background-color: #010e27;
  }
}
</style>
