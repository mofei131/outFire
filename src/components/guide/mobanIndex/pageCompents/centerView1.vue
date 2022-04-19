<template>
  <div class="visual_conBot">
    <img class="visual_conBot_l" src="../images/ksh42.png" />
    <img class="visual_conBot_2" src="../images/ksh43.png" />
    <img class="visual_conBot_3" src="../images/ksh44.png" />
    <img class="visual_conBot_4" src="../images/ksh45.png" />
    <div class="cityData" v-show="derail">
      <el-table :data="checknData" :row-style="getRowClass" class="table table-kingdargen" height="380px"
      :header-row-style="getRowClass" :header-cell-style="getRowClass2">
        <el-table-column align="center" prop="name" label="单位名"></el-table-column>
        <el-table-column align="center" prop="address" label="单位地址"></el-table-column>
        <el-table-column align="center" prop="cid" label="设备卡号"></el-table-column>
        <el-table-column align="center" prop="checktag" label="报警原因"></el-table-column>
        <el-table-column align="center" prop="ftime" label="报警时间"></el-table-column>
        <el-table-column align="center" prop="safe_leader" label="单位联系人"></el-table-column>
        <el-table-column align="center" prop="safe_leader_phone" label="单位联系人电话"></el-table-column>
      </el-table>
      <i class="el-icon-error closeBtn" @click="derail = false"></i>
       </div>
    <div class="cityData" v-show="isShow">
       <div class="table">
         <el-table  :data="cityDataList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
       :row-style="getRowClass" :header-row-style="getRowClass" :header-cell-style="getRowClass2">
        <el-table-column align="center" prop="name" label="单位名称"></el-table-column>
        <el-table-column align="center" prop="address" label="单位位置"></el-table-column>
        <el-table-column align="center" prop="safe_leader" label="联系人"></el-table-column>
        <el-table-column align="center" prop="safe_leader_phone" label="电话"></el-table-column>
      </el-table>
      <el-table   :data="cityDataList" :row-style="getRowClass" :header-row-style="getRowClass" :header-cell-style="getRowClass2">
        <el-table-column align="center" prop="namecid" label="设备名称"></el-table-column>
        <el-table-column align="center" prop="brand" label="品牌"></el-table-column>
        <el-table-column align="center" prop="card_no" label="NFC号"></el-table-column>
        <el-table-column align="center" prop="start_time" label="安装时间"></el-table-column>
      </el-table>
       </div>
      <i class="el-icon-error closeBtn" @click="isShow = false"></i>
    </div>
      <div class="visualSssf_left">
        <a @click="showAllData">全省数据</a>  
        <a @click="showDevice">显示单位</a>
        <a @click="showArea">隐藏单位</a>
      </div>
    <baidu-map class="map" :center="selectCityName" :zoom="zoom" @ready="handlerStyle">
      <bm-boundary :name="selectCityName" :strokeWeight="2" strokeColor="red" :fillOpacity="0.1"></bm-boundary>
      <bml-marker-clusterer :averageCenter="true">
        <bm-marker v-for="marker in points" :key="marker.id" :position="{lng: marker.lng, lat: marker.lat}" @click="clickHandler($event)"></bm-marker>
      </bml-marker-clusterer>

    </baidu-map>
    <CenterView4 class="alert"/>
    <div class="area">
      <centerMap @emitMapToParentGetCarWarning="getData" :options="options" filterable change-on-select
          v-model="selectedOptions"/>
    </div>
    <div class="search">
      <el-autocomplete class="colour" :fetch-suggestions="querySearchAsync"
      v-model="state" placeholder="输入单位名称" :trigger-on-focus="false" @select="handleSelect">
      <el-button class="btn" slot="append" @click="location()"><img :src="ico1" class="ico"></el-button>
      </el-autocomplete>
    </div>
  </div>
</template>
<script>
import { regionData,CodeToText } from 'element-china-area-data'
import {BmlMarkerClusterer} from 'vue-baidu-map'
import centerMap from "./centerMap";
import * as Device from '../../../../api/device/device';
import CenterView4 from './centerView4';
import * as checkn from '../../../../api/check/checkn';
import * as Comp from '../../../../api/comp/comp';
import New from '@/main.js';
export default { 
  data() {
    var data = [];
          checkn.getList(1,5).then(ret =>{
            var list = ret.data.data;
            for(var i=0; i<list.length; i++){
              if (list[i].checktag == 3) {
                data.push({
                    checktag:"设备丢失",
                    name:list[i].name,
                    address: list[i].address,
                    cid:list[i].cid,
                    ftime: list[i].ftime,
                    safe_leader:list[i].safe_leader,
                    safe_leader_phone:list[i].safe_leader_phone,
                  })
                }else if(list[i].checktag == 4){
                  data.push({
                    checktag:"位置异常",
                    name:list[i].name,
                    address: list[i].address,
                    cid:list[i].cid,
                    ftime: list[i].ftime,
                    safe_leader:list[i].safe_leader,
                    safe_leader_phone:list[i].safe_leader_phone,
                  })
                }
            }
            this.checknData = data;
          });
    return {
      isShow: false,
      points: [],
      cityDataList: [],
      options: regionData,
      selectedOptions: ["650000"],
      selectCityName: '新疆',
      zoom: 6,
      pagesize:1,
      currentPage:1,
      cityData: [],
      imgUrl:require("../../../../../doc/img/source/source239.png"),
      imgUrl2:require("../../../../../doc/img/bg/bg8.jpg"),
      checknData:[],
      derail:false,
      state: '',
      data:[],
      ico1:require("../images/seach1.png"),
      input:""
      };
  },
  components: {
    centerMap,
    BmlMarkerClusterer,
    CenterView4
  },
  created(){
			New.$on('getisshow',data => {
				this.derail = data.show   
			})
		},
  mounted() {
    this.initCity();
    this.restaurants = this.loadAll();
  },
  methods: {
    loadAll(){
      var data = [];
          Comp.getList(1, 100).then(ret =>{
            var list = ret.data.data.records;
            for(var i=0; i<list.length; i++){
              data.push({
               "value": list[i].name,
              })
            }
          });
          return data;
    },
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      },
    handlerStyle({BMap, map}){
      let mapStyle = {style: 'midnight'}
      map.setMapStyle(mapStyle);
      map.enableScrollWheelZoom();
    },
    showDevice(){
      var points = []
      var arr = []
      checkn.gpsList().then(ret =>{
        var list = ret.data.data
         var n = []
         for(var j = 0; j < list.length; j++){  
           n.push(list[j].gps)
           if(points.indexOf(n[j]) == -1){ 
               points.push(n[j]); 
           }
       } 
        for(var i=0; i<points.length; i++){
             arr.push({
             lng:points[i].split(",")[0],
              lat:points[i].split(",")[1],
          })
        }
      })
      this.points = arr;
    }, 
    location(){
      this.input = this.state
      var points = []
      Comp.getList().then(ret =>{
        var list = ret.data.data.records;
        for(var i=0; i<list.length; i++){
          if(this.input == list[i].name){
           points.push({
            lng: list[i].gps.split(",")[0], 
            lat: list[i].gps.split(",")[1], 
          })
       }
        }
        if(points.length == 0){
           this.$alert('未找到该单位', '提示', {
            confirmButtonText: '确定',
           })
          }
      })
      this.points = points;
    },
    showArea(){
      this.points = [];
    },
    clickHandler:function(event){
      var data = [];
      var alert = [];
       checkn.gpsList().then(ret =>{
        var list = ret.data.data
        for(var i=0; i<list.length; i++){
          if(event.currentTarget.Av.lng == list[i].gps.split(",")[0] && event.currentTarget.Av.lat == list[i].gps.split(",")[1]){
            data.push({
            name:list[i].name,
            address:list[i].address,
            safe_leader:list[i].safe_leader,
            safe_leader_phone:list[i].safe_leader_phone,
            namecid:list[i].namecid,
            brand:list[i].brand,
            card_no:list[i].card_no,
            start_time:list[i].start_time
          })
          }
        }
      })
      this.cityDataList = data;
      this.isShow = true;
    },
    getData (value) {
      this.selectCityName = value;
      this.zoom = 7;
    },
    showAllData(){
      this.selectedOptions = ["650000"];
      this.selectCityName = '新疆';
      this.zoom = 6;
    },
    initCity(){
      var data = [];
      for(var i=0; i<regionData.length; i++){
        if(regionData[i].value == "650000"){
          data = regionData[i].children;
          break;
        }
      }
      this.options = data;
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
                return "background:#041129;color:#CAFFFF;";
            },
            getRowClass2({ row, column, rowIndex, columnIndex }) {
                return "background:#041129;color:#fff;";
            },
  },
};
</script>

<style lang="scss" scoped>
.map{
  width: 100%;
  height: 100%;
}
.visual_conBot {
  height: calc(100% - 32px);
  background-size: 100% 100%;
  position: relative;
  top: -35px
}
.visual_conBot > img {
  position: absolute;
  width: 25px;
  height: 25px;
}
.visual_conBot .visual_conBot_l {
  position: absolute;
  left: 0;
  top: 0;
}
.visual_conBot .visual_conBot_2 {
  position: absolute;
  right: 0;
  top: 0;
}
.visual_conBot .visual_conBot_3 {
  position: absolute;
  right: 0;
  bottom: 0;
}
.visual_conBot .visual_conBot_4 {
  position: absolute;
  left: 0;
  bottom: 0;
}
.visual_conBot .visual_chart {
  width: 100%;
  height: 100%;
  position: absolute;
}
.visual_conBot .visual_chart_text {
  color: #fff;
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 99;
}
.visual_conBot .visual_chart_text h1 {
  font-size: 26px;
  margin-bottom: 6px;
}
.visual_conBot .visual_chart_text h2 {
  font-size: 20px;
}
.visual_conBot .visual_conBot_bot {
  width: calc(100% - 8px);
  height: 80px;
  background: rgba(16, 54, 87, 0.5);
  border: 1px solid #eaf1fa;
  position: absolute;
  top: 4px;
  left: 4px;
  z-index: 9;
}

.visualSssf_left {
  position: absolute;
  z-index: 10;
  width: 40%;
  float: left;
  color: #fff;
  padding: 10px 20px 0 20px;
  margin-top:70%;
}
.visualSssf_left a {
  width: 32%;
  color: #fff;
  display: inline-block;
  margin-bottom: 10px;
  cursor: pointer;
  background:url(../images/ksh40.png) no-repeat;
  background-size:100% 100%;
    border: 2px solid transparent;
    cursor:pointer;
    width:33%;
    color:#20dbfd;
    font-size:11px;
    font-family: 'yjsz';
    text-align:center;
}
.visualSssf_right {
  width: 60%;
  height: 100%;
  float: left;
}
.visualSssf_right .visualSssf_right_box {
  width: 33%;
  float: left;
  height: 100%;
}

.visualSfzsfl {
  position: relative;
}
.visualSfzsfl .visual_chart {
  opacity: 0.6;
}
.visualSfzsfl .visual_table {
  width: 60%;
  position: absolute;
  z-index: 9;
  top: 40px;
  left: 0;
}
.visualSfzsfl .visual_table table {
  width: 100%;
  color: #fff;
  text-align: center;
}
.visualSfzsfl .visual_table table tr {
  border-bottom: 1px dashed #ddd;
}
.visualSfzsfl .visual_table table tr:first-child {
  color: #01c0ff;
}
.visualSfzsfl .visual_table table tr:last-child {
  border-bottom: 1px solid #ddd;
}

.cityData {
  background: url(../images/dia.png) center no-repeat;
  position:absolute;
  z-index: 15;
  width: 80%;
  left: 10%;
  top: 30px;
  max-height: 100%;
  overflow: auto;
  padding: 50px 30px;
  background-size: 100% 100%;
  .closeBtn {
   background: url(../images/close.png) center no-repeat;
         width: 44px;
         height: 44px;
         display: block;
         cursor: pointer;
         position: absolute;
         top: 10px;
         right: 10px;
         z-index: 1000;
  }
  .el-table {
    background:rgba(0,0,0,0);
  }
}
.area{
  width: 35%;
  height: 35%;
  background-size: 50% 50%;
  position: absolute;
  bottom: 65%;
  background:url(../images/ksh40.png) no-repeat;
  background-size:100% 100%;
  border: 1px solid transparent;
  padding: 0px;
}
.alert{
  // position:fixed;
  top:-150px;
  z-index: 9;
}
.box-card{
  height: 450px;
  border-radius: 10px;
}
.cardImg{
  width: 80%;
}
.backgroud{
  position: absolute;
  left: 0px;
  top: 0px;
  width: 670px;
  height: 450px;
  border-radius: 10px;
}
.clearfix{
  position: relative;
  z-index: 10;
  color: #fff;
  height: 10px;
  font-size: 20px;
}
.search{
    margin-left: 30%;
}
.colour{
  position:absolute;
  bottom: 90.3%;
  width: 300px;
  height: 30px;
  margin-left: 12.5%;
}
.btn{
  padding: 0;
  position: absolute;
}
.ico{
  position: absolute;
  width:38px;
  height: 38px;
  margin: 0;
  top: -9px
}
</style>
<style>
  .el-input__inner{
	border: 0;
	background: transparent;
  border: 1px solid #044f6e;
  line-height: 30px;
  color: #FFFFFF;
  border-radius: 0%;
}
</style>