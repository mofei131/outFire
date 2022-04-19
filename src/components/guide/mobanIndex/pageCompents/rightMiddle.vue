<template>
  <div style="height: calc(100% - 40px);">
    <div class="navboxall" id="echart1"></div>
    
    <div class="cityData" v-show="isShow">
      <el-table :data="deviceDataList" height="380px"
      :row-style="getRowClass" :header-row-style="getRowClass" :header-cell-style="getRowClass2">
        <el-table-column align="center" prop="name" label="设备名称"></el-table-column>
        <el-table-column align="center" prop="brand" label="品牌"></el-table-column>
        <el-table-column align="center" prop="model" label="型号"></el-table-column>
        <el-table-column align="center" prop="installTime" label="安装时间"></el-table-column>
      </el-table>
      <i class="el-icon-error closeBtn" @click="isShow = false"></i>
    </div>
  </div>
</template>
<script>
import * as Device from '../../../../api/device/device';
import * as DeviceType from '../../../../api/type/devicetype';

export default {
  mounted() {
    this.getData();
  },
  data() {
    return {
      isShow: false,
      deviceDataList: []
    };
  },
  methods: {
    getData(){
      var that = this;
      DeviceType.getList(null, 100, {grade: 2}).then(ret =>{
        var types = ret.data.data.records; //所有类型
        Device.selectListGroupByType2Id().then(ret =>{
          var list = ret.data.data;
          // console.log("--->", list, types);
          var data = [];
          for(var i=0; i<types.length; i++){
            var value = 0;
            for(var j=0; j<list.length; j++){
              if(types[i].id == list[j].type2Id){
                value = list[j].id;
                break;
              }
            }
            data.push({
              value: value,
              name: types[i].name,
              type2Id: types[i].id
            })
          }
          // console.log(data);
          that.drawLine(data)
        });
      });
    },
    drawLine (data) {
      var that = this;
      let chartsData = data.map(item => {
        return {
          name: item.name,
          y: parseInt(item.value),
          type2Id: parseInt(item.type2Id)
        }
      })
      var chart = Highcharts.chart('echart1', {
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
            innerSize: 60,
            depth: 35,
            dataLabels: {
              enabled: true,
              format: '{point.name}',
              style: {
                color: '#ffffff',
                fontSize: 14
              }
            },
            events: {
              click: function (e) {
                var data = [];
                Device.getList(1, 10,{'type2Id': e.point.type2Id}).then(ret =>{
                  var data = [];
                  var list = ret.data.data.records;
                  for(var i=0; i<list.length; i++){
                    if(list > 5){
                      break;
                    }
                    data.push({
                      name: list[i].name,
                      brand: list[i].brand,
                      model: list[i].model,
                      installTime: list[i].installTime
                    });
                  }
                  that.isShow = true;
                  that.deviceDataList = data;
                })
              }    
            }
          }
        },
        series: [{
          name: '按设备类型统计',
          data: chartsData
        }]
      });
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
                return "background:rgba(16, 54, 87, 0.5);color:#fff;";
            },
            getRowClass2({ row, column, rowIndex, columnIndex }) {
                return "background-color: rgba(51,195,236,0.14);color: #9ebaef;";
            },
  }
};
</script>
<style lang="scss" scoped>
#echart1 {
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
    z-index: 100;
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
