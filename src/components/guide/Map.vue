<template>
  <div class="Map">
    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation> -->
    <!-- 定位 -->
    <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
    <!-- 城市切换 -->
    <bm-city-list class="cityList" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
     <!-- 散点 -->
    <bm-point-collection
      :points="position"
      shape="BMAP_POINT_SHAPE_CIRCLE"
      color="red"
      size="BMAP_POINT_SIZE_BIG"
      @click="pointsClickHandler"
    ></bm-point-collection>

    <!-- 坐标 -->
    <div v-for="item in position" :key="item.id">
      <bm-marker
        @click="infoWindowOpen(item.id)"
        :icon="{url: logo, size: {width: 40, height: 40}}"
        :position="{lng: item.lng, lat: item.lat}"
      >
        <bm-info-window
          :show="item.show"
          @close="infoWindowClose(item.id)"
          @open="infoWindowOpen(item.id)"
        >
          {{item.value}}
          <button @click="showDetail(item.id,item)">详情</button>
        </bm-info-window>
      </bm-marker>
    </div>

    <!-- 行政区域填充 -->
    <bm-boundary name="福山区" :strokeWeight="2" strokeColor="blue"></bm-boundary>

    <bm-polygon
      :path="polygonPath"
      stroke-color="#D8DE5F"
      fillColor="rgba(255, 182, 192, 0.3)"
      :stroke-opacity="0"
      :stroke-weight="2"
      :editing="false"
    />

    <bm-polygon
      @mouseover="showBorder"
      @mouseout="closeBorder"
      :path="polygonPath2"
      :stroke-color="strokeColor"
      :fillColor="fillColor"
      :stroke-opacity="0"
      :stroke-weight="2"
      :editing="false"
    />
    <!--  -->

    <!-- 详情弹窗 -->
    <div class="detail" v-if="detailShow == true">
      <div>
        <div class="detailContent">{{windowDetail.value}}</div>
        <button class="windowClose" @click="closeDetail">关闭</button>
      </div>
      <div class="detailTd">
        <table class="table w100 border">
          <tr class="w100">
            <td class="border w80 paddingBgc">设备名称</td>
            <td class="border w20 paddingBgc">数量</td>
          </tr>
          <tr class="w100" v-for="item in windowDetail.mt" :key="item.id">
            <td class="border w80">{{item.name}}</td>
            <td class="border w20">{{item.number}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div id="mainBox">
    <div id="leftBox">
    <div class="test1">
      <test1 @sendPosition="getPosition" />
    </div>
    <!-- <div class="right1">
      <right1 />
    </div> -->
     <!-- <div class="left3">
      <left3/>
        
     </div> -->
      <div class="test2">
      <test2 />
    </div>
      
    </div>
    <!-- /rightbox -->
    <!-- <div class="weather">
      <Weather :weatherData="weatherData" />
    </div>-->
 <!-- center -->
   <div id="centerDiv">
     <div class="centerbox">
      <div class="searchTool">
        <el-autocomplete
          clearable
          size="medium"
          prefix-icon="el-icon-search"
          v-model="state"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
          @select="handleSelect"
        ></el-autocomplete>
        <!-- 1234--{{restaurants}} -->
      </div>
      <dv-border-box-8 class="Border" style="padding-top:5px;overflow: hidden;z-index:99999 ">
        <baidu-map
          class="bm-view"
          :center="center"
          :zoom="zoom"
          :scroll-wheel-zoom="true"
          :mapStyle="mapStyle"
        ></baidu-map>
      </dv-border-box-8>
    </div>
    <div class="warn">
      <Warn @sendWarnData="getWarnData" />
    </div>
   
   </div>


 <!-- /center -->
     <div id="rightBox">
       
   
     <div class="right2">
      <right2 @sendPosition="getPosition" />
    </div>
      <div class="right3">
        <right3/>
      </div>

     </div>
     
     
   

    </div>
   
  </div>
</template>

<script>
import logo from "@/assets/Location.png";
import test1 from "./test1";
import Weather from "./Weather";
import Warn from "./Warn";
import test2 from "./test2.vue";
import right1 from "./right1.vue";
import right2 from "./right2.vue";
import right3 from "./right3.vue";
import left3 from "./left3.vue";

let echarts = require("echarts");
export default {
  mounted() {
    this.restaurants = this.loadAll();
    this.getWeather();
  },
  data() {
    return {
      center: { lng: 87.68, lat: 43.77 },
      zoom: 10,
      mapStyle: { style: "midnight" },
      logo: logo,
      position: [
        {
          id: 1,
          lng: 87.578433,
          lat: 43.836134,
          value: "乌鲁木齐测试企业1",
          show: false,
          type: 1,
          warnData: [
            { code: 111, status: false },
            { code: 222, status: false },
            { code: 1515, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },
        {
          id: 2,
          lng: 87.613796,
          lat: 43.784601,
          value: "乌鲁木齐测试企业2",
          show: false,
          type: 1,
          warnData: [
            { code: 333, status: false },
            { code: 444, status: false },
            { code: 1616, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },
        {
          id: 3,
          lng: 87.621005,
          lat: 43.764521,
          value: "乌鲁木齐测试企业3",
          show: false,
          type: 2,
          warnData: [
            { code: 555, status: false },
            { code: 666, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },
        {
          id: 4,
          lng: 87.706836,
          lat: 43.803187,
          value: "乌鲁木齐测试企业4",
          show: false,
          type: 2,
          warnData: [
            { code: 777, status: false },
            { code: 888, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },
        {
          id: 5,
          lng: 87.526592,
          lat: 43.841334,
          value: "乌鲁木齐测试企业5",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },
        {
          id: 6,
          lng: 87.504276,
          lat: 43.83861,
          value: "乌鲁木齐测试企业6",
          show: false,
          type: 4,
          warnData: [{ code: 1111, status: false }],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },

        // 阿克苏
        {
          id: 7,
          lng: 80.267823,
          lat: 41.171978,
          value: "阿克苏测试企业7",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },
        {
          id: 8,
          lng: 80.291083,
          lat: 41.264237,
          value: "阿克苏测试企业8",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },

        // 阿勒泰
        {
          id: 9,
          lng: 88.131819,
          lat: 47.827053,
          value: "阿勒泰测试企业9",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },
        {
          id: 10,
          lng: 88.134137,
          lat: 47.816277,
          value: "阿勒泰测试企业10",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },

        // 昌吉
        {
          id: 11,
          lng: 87.31723,
          lat: 44.005124,
          value: "昌吉测试企业11",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },
        {
          id: 12,
          lng: 87.28603,
          lat: 44.007964,
          value: "昌吉测试企业12",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },

        // 克拉玛依
        {
          id: 13,
          lng: 84.903128,
          lat: 45.585952,
          value: "克拉玛依测试企业13",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },
        {
          id: 14,
          lng: 84.889138,
          lat: 45.555189,
          value: "克拉玛依测试企业14",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },

        // 石河子
        {
          id: 15,
          lng: 86.039857,
          lat: 44.302041,
          value: "石河子测试企业15",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },
        {
          id: 16,
          lng: 86.080841,
          lat: 44.30497,
          value: "石河子测试企业16",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },

        // 库尔勒
        {
          id: 17,
          lng: 86.161243,
          lat: 41.742007,
          value: "库尔勒测试企业17",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },
        {
          id: 18,
          lng: 86.144764,
          lat: 41.745209,
          value: "库尔勒测试企业18",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },

        //伊犁
        {
          id: 19,
          lng: 81.29975,
          lat: 43.925915,
          value: "伊利测试企业19",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },
        {
          id: 20,
          lng: 81.281554,
          lat: 43.928512,
          value: "伊利测试企业20",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },

        //塔城
        {
          id: 21,
          lng: 82.974467,
          lat: 46.749777,
          value: "塔城测试企业21",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },
        {
          id: 22,
          lng: 82.998843,
          lat: 46.741396,
          value: "塔城测试企业22",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },

        // 喀什
        {
          id: 23,
          lng: 75.997828,
          lat: 39.465504,
          value: "喀什测试企业23",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },
        {
          id: 24,
          lng: 75.984117,
          lat: 39.463384,
          value: "喀什测试企业24",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        }
      ],

      // fillColor:'rgba(176, 226, 255, 0.3)',
      fillColor: "rgba(8, 48, 74, 0)",

      // strokeColor:'#90FF71',
      strokeColor: "#08304A",

      polygonPath: [
        { lng: 121.30493, lat: 37.582983 },
        { lng: 121.305156, lat: 37.577684 },
        { lng: 121.304033, lat: 37.575064 },
        { lng: 121.299954, lat: 37.573066 },
        { lng: 121.297997, lat: 37.571812 },
        { lng: 121.295666, lat: 37.568402 },
        { lng: 121.294726, lat: 37.566551 },
        { lng: 121.294352, lat: 37.563851 },
        { lng: 121.294482, lat: 37.558529 },
        { lng: 121.293559, lat: 37.546642 },
        { lng: 121.292976, lat: 37.545269 },
        { lng: 121.292106, lat: 37.54394 },
        { lng: 121.283776, lat: 37.538196 },
        { lng: 121.281612, lat: 37.537112 },
        { lng: 121.280908, lat: 37.535822 },
        { lng: 121.280534, lat: 37.53366 },
        { lng: 121.280994, lat: 37.532662 },
        { lng: 121.282568, lat: 37.531375 },
        { lng: 121.283324, lat: 37.530963 },
        { lng: 121.285731, lat: 37.530796 },
        { lng: 121.288436, lat: 37.530179 },
        { lng: 121.290313, lat: 37.529473 },
        { lng: 121.293513, lat: 37.52584 },
        { lng: 121.294, lat: 37.524863 },
        { lng: 121.294121, lat: 37.523952 },
        { lng: 121.294104, lat: 37.523179 },
        { lng: 121.293599, lat: 37.522514 },
        { lng: 121.292747, lat: 37.521641 },
        { lng: 121.289164, lat: 37.519183 },
        { lng: 121.28813, lat: 37.518062 },
        { lng: 121.287669, lat: 37.517189 },
        { lng: 121.287608, lat: 37.515587 },
        { lng: 121.28855, lat: 37.513578 },
        { lng: 121.289005, lat: 37.511996 },
        { lng: 121.289036, lat: 37.511213 },
        { lng: 121.288895, lat: 37.509679 },
        { lng: 121.288471, lat: 37.508423 },
        { lng: 121.288094, lat: 37.507905 },
        { lng: 121.286823, lat: 37.506666 },
        { lng: 121.285819, lat: 37.505427 },
        { lng: 121.285521, lat: 37.504768 },
        { lng: 121.28538, lat: 37.503828 },
        { lng: 121.285677, lat: 37.500929 },
        { lng: 121.285957, lat: 37.495696 },
        { lng: 121.286316, lat: 37.491951 },
        { lng: 121.289454, lat: 37.491966 },
        { lng: 121.290717, lat: 37.492314 },
        { lng: 121.290809, lat: 37.492332 },
        { lng: 121.291017, lat: 37.491482 },
        { lng: 121.290971, lat: 37.491412 },
        { lng: 121.290691, lat: 37.491029 },
        { lng: 121.292438, lat: 37.490881 },
        { lng: 121.292459, lat: 37.491421 },
        { lng: 121.295988, lat: 37.491337 },
        { lng: 121.295698, lat: 37.488642 },
        { lng: 121.29694, lat: 37.488548 },
        { lng: 121.296563, lat: 37.485615 },
        { lng: 121.301259, lat: 37.481884 },
        { lng: 121.302196, lat: 37.481258 },
        { lng: 121.301141, lat: 37.481217 },
        { lng: 121.300475, lat: 37.48122 },
        { lng: 121.299436, lat: 37.481169 },
        { lng: 121.298534, lat: 37.481057 },
        { lng: 121.297776, lat: 37.480886 },
        { lng: 121.297159, lat: 37.480698 },
        { lng: 121.295586, lat: 37.480087 },
        { lng: 121.295491, lat: 37.479993 },
        { lng: 121.295356, lat: 37.47998 },
        { lng: 121.293723, lat: 37.479288 },
        { lng: 121.295279, lat: 37.477113 },
        { lng: 121.296895, lat: 37.473956 },
        { lng: 121.297227, lat: 37.473485 },
        { lng: 121.29743, lat: 37.472662 },
        { lng: 121.297327, lat: 37.472111 },
        { lng: 121.297377, lat: 37.47176 },
        { lng: 121.297594, lat: 37.47145 },
        { lng: 121.299316, lat: 37.470209 },
        { lng: 121.300153, lat: 37.469935 },
        { lng: 121.301566, lat: 37.469741 },
        { lng: 121.303385, lat: 37.469664 },
        { lng: 121.305344, lat: 37.470068 },
        { lng: 121.305843, lat: 37.470008 },
        { lng: 121.306631, lat: 37.469359 },
        { lng: 121.306848, lat: 37.46903 },
        { lng: 121.307526, lat: 37.46681 },
        { lng: 121.308408, lat: 37.46544 },
        { lng: 121.309515, lat: 37.464236 },
        { lng: 121.310128, lat: 37.463254 },
        { lng: 121.310469, lat: 37.462452 },
        { lng: 121.310684, lat: 37.461194 },
        { lng: 121.310876, lat: 37.458385 },
        { lng: 121.310832, lat: 37.457222 },
        { lng: 121.309892, lat: 37.453087 },
        { lng: 121.309514, lat: 37.449607 },
        { lng: 121.309678, lat: 37.44705 },
        { lng: 121.309979, lat: 37.446261 },
        { lng: 121.310393, lat: 37.445773 },
        { lng: 121.310934, lat: 37.445398 },
        { lng: 121.311549, lat: 37.445185 },
        { lng: 121.317692, lat: 37.445209 },
        { lng: 121.319865, lat: 37.444874 },
        { lng: 121.322264, lat: 37.444164 },
        { lng: 121.325701, lat: 37.4427 },
        { lng: 121.327136, lat: 37.441621 },
        { lng: 121.328366, lat: 37.440195 },
        { lng: 121.329482, lat: 37.438653 },
        { lng: 121.329964, lat: 37.437731 },
        { lng: 121.330286, lat: 37.436337 },
        { lng: 121.330325, lat: 37.435194 },
        { lng: 121.330205, lat: 37.43394 },
        { lng: 121.329903, lat: 37.432535 },
        { lng: 121.329641, lat: 37.429837 },
        { lng: 121.329259, lat: 37.428262 },
        { lng: 121.329229, lat: 37.42759 },
        { lng: 121.329309, lat: 37.427249 },
        { lng: 121.330013, lat: 37.426308 },
        { lng: 121.332013, lat: 37.424175 },
        { lng: 121.332254, lat: 37.423724 },
        { lng: 121.333993, lat: 37.421571 },
        { lng: 121.334907, lat: 37.42073 },
        { lng: 121.33549, lat: 37.420411 },
        { lng: 121.336213, lat: 37.420335 },
        { lng: 121.336518, lat: 37.420777 },
        { lng: 121.336663, lat: 37.420769 },
        { lng: 121.338067, lat: 37.419637 },
        { lng: 121.338738, lat: 37.419556 },
        { lng: 121.339401, lat: 37.419782 },
        { lng: 121.340136, lat: 37.420241 },
        { lng: 121.340781, lat: 37.420321 },
        { lng: 121.341644, lat: 37.420226 },
        { lng: 121.343422, lat: 37.420218 },
        { lng: 121.344037, lat: 37.420571 },
        { lng: 121.344806, lat: 37.420583 },
        { lng: 121.347031, lat: 37.419896 },
        { lng: 121.347922, lat: 37.419713 },
        { lng: 121.349038, lat: 37.419656 },
        { lng: 121.351437, lat: 37.419699 },
        { lng: 121.353917, lat: 37.420037 },
        { lng: 121.357582, lat: 37.420296 },
        { lng: 121.358478, lat: 37.419818 },
        { lng: 121.359663, lat: 37.419524 },
        { lng: 121.36192, lat: 37.417908 },
        { lng: 121.365389, lat: 37.416282 },
        { lng: 121.365752, lat: 37.415995 },
        { lng: 121.366052, lat: 37.415496 },
        { lng: 121.366333, lat: 37.414761 },
        { lng: 121.367314, lat: 37.413594 },
        { lng: 121.367373, lat: 37.411576 },
        { lng: 121.366858, lat: 37.411275 },
        { lng: 121.366214, lat: 37.410193 },
        { lng: 121.365992, lat: 37.409469 },
        { lng: 121.364867, lat: 37.408109 },
        { lng: 121.362266, lat: 37.406473 },
        { lng: 121.36001, lat: 37.4046 },
        { lng: 121.358694, lat: 37.403137 },
        { lng: 121.357609, lat: 37.40258 },
        { lng: 121.355858, lat: 37.401408 },
        { lng: 121.353595, lat: 37.399813 },
        { lng: 121.353508, lat: 37.399658 },
        { lng: 121.35255, lat: 37.399454 },
        { lng: 121.351241, lat: 37.398244 },
        { lng: 121.350636, lat: 37.397441 },
        { lng: 121.350818, lat: 37.397203 },
        { lng: 121.350557, lat: 37.396512 },
        { lng: 121.349866, lat: 37.395659 },
        { lng: 121.349739, lat: 37.395305 },
        { lng: 121.349637, lat: 37.393694 },
        { lng: 121.349352, lat: 37.392951 },
        { lng: 121.348924, lat: 37.392306 },
        { lng: 121.348589, lat: 37.391392 },
        { lng: 121.348015, lat: 37.390962 },
        { lng: 121.347004, lat: 37.38858 },
        { lng: 121.347047, lat: 37.38773 },
        { lng: 121.347591, lat: 37.386247 },
        { lng: 121.347596, lat: 37.386006 },
        { lng: 121.347542, lat: 37.385824 },
        { lng: 121.347355, lat: 37.385722 },
        { lng: 121.346768, lat: 37.385624 },
        { lng: 121.346618, lat: 37.385461 },
        { lng: 121.346333, lat: 37.384755 },
        { lng: 121.346321, lat: 37.383379 },
        { lng: 121.346689, lat: 37.380134 },
        { lng: 121.346554, lat: 37.378469 },
        { lng: 121.346349, lat: 37.377896 },
        { lng: 121.345847, lat: 37.377158 },
        { lng: 121.344711, lat: 37.375934 },
        { lng: 121.344239, lat: 37.374196 },
        { lng: 121.343853, lat: 37.373225 },
        { lng: 121.343041, lat: 37.3721 },
        { lng: 121.341861, lat: 37.370828 },
        { lng: 121.340891, lat: 37.369472 },
        { lng: 121.340596, lat: 37.368649 },
        { lng: 121.340069, lat: 37.368412 },
        { lng: 121.339496, lat: 37.367796 },
        { lng: 121.338228, lat: 37.365317 },
        { lng: 121.338161, lat: 37.365053 },
        { lng: 121.338302, lat: 37.364712 },
        { lng: 121.338258, lat: 37.364403 },
        { lng: 121.33704, lat: 37.363105 },
        { lng: 121.336534, lat: 37.361898 },
        { lng: 121.336164, lat: 37.361392 },
        { lng: 121.335024, lat: 37.360722 },
        { lng: 121.334621, lat: 37.360134 },
        { lng: 121.334494, lat: 37.359258 },
        { lng: 121.334345, lat: 37.358919 },
        { lng: 121.33368, lat: 37.358796 },
        { lng: 121.333607, lat: 37.358666 },
        { lng: 121.333635, lat: 37.358054 },
        { lng: 121.333544, lat: 37.357429 },
        { lng: 121.332411, lat: 37.355377 },
        { lng: 121.331006, lat: 37.35316 },
        { lng: 121.330545, lat: 37.351945 },
        { lng: 121.330368, lat: 37.350449 },
        { lng: 121.330498, lat: 37.34933 },
        { lng: 121.331006, lat: 37.348094 },
        { lng: 121.334409, lat: 37.344662 },
        { lng: 121.337106, lat: 37.341486 },
        { lng: 121.338611, lat: 37.339309 },
        { lng: 121.338759, lat: 37.336439 },
        { lng: 121.337862, lat: 37.331388 },
        { lng: 121.33613, lat: 37.329013 },
        { lng: 121.334485, lat: 37.327948 },
        { lng: 121.333556, lat: 37.327214 },
        { lng: 121.333173, lat: 37.327091 },
        { lng: 121.330639, lat: 37.326786 },
        { lng: 121.329776, lat: 37.326451 },
        { lng: 121.327894, lat: 37.326171 },
        { lng: 121.322875, lat: 37.325128 },
        { lng: 121.321995, lat: 37.324842 },
        { lng: 121.320382, lat: 37.323726 },
        { lng: 121.323155, lat: 37.319965 },
        { lng: 121.324991, lat: 37.31937 },
        { lng: 121.326592, lat: 37.318622 },
        { lng: 121.335598, lat: 37.311309 },
        { lng: 121.341879, lat: 37.303583 },
        { lng: 121.342618, lat: 37.295846 },
        { lng: 121.340398, lat: 37.287734 },
        { lng: 121.334306, lat: 37.276576 },
        { lng: 121.327109, lat: 37.267716 },
        { lng: 121.324332, lat: 37.265683 },
        { lng: 121.321382, lat: 37.263836 },
        { lng: 121.316954, lat: 37.262356 },
        { lng: 121.314918, lat: 37.261796 },
        { lng: 121.313812, lat: 37.259953 },
        { lng: 121.313629, lat: 37.257742 },
        { lng: 121.311968, lat: 37.254422 },
        { lng: 121.301449, lat: 37.246757 },
        { lng: 121.294804, lat: 37.246014 },
        { lng: 121.289639, lat: 37.243427 },
        { lng: 121.284167, lat: 37.23739 },
        { lng: 121.282781, lat: 37.236653 },
        { lng: 121.282211, lat: 37.237041 },
        { lng: 121.281088, lat: 37.238072 },
        { lng: 121.280412, lat: 37.238302 },
        { lng: 121.276869, lat: 37.237819 },
        { lng: 121.274317, lat: 37.237788 },
        { lng: 121.274172, lat: 37.238358 },
        { lng: 121.273898, lat: 37.238764 },
        { lng: 121.273326, lat: 37.238863 },
        { lng: 121.272724, lat: 37.2388 },
        { lng: 121.270529, lat: 37.238043 },
        { lng: 121.270367, lat: 37.2378 },
        { lng: 121.270276, lat: 37.237396 },
        { lng: 121.270306, lat: 37.236084 },
        { lng: 121.270081, lat: 37.235626 },
        { lng: 121.269587, lat: 37.23527 },
        { lng: 121.269131, lat: 37.234674 },
        { lng: 121.268602, lat: 37.234371 },
        { lng: 121.268103, lat: 37.234229 },
        { lng: 121.267165, lat: 37.234215 },
        { lng: 121.265616, lat: 37.23454 },
        { lng: 121.265142, lat: 37.234774 },
        { lng: 121.264562, lat: 37.235194 },
        { lng: 121.264321, lat: 37.235511 },
        { lng: 121.263933, lat: 37.236336 },
        { lng: 121.262942, lat: 37.237813 },
        { lng: 121.260691, lat: 37.238024 },
        { lng: 121.260704, lat: 37.238558 },
        { lng: 121.26038, lat: 37.238676 },
        { lng: 121.260687, lat: 37.23937 },
        { lng: 121.263196, lat: 37.239101 },
        { lng: 121.263508, lat: 37.239566 },
        { lng: 121.263649, lat: 37.240387 },
        { lng: 121.261222, lat: 37.24078 },
        { lng: 121.26179, lat: 37.242662 },
        { lng: 121.260738, lat: 37.242744 },
        { lng: 121.258898, lat: 37.243071 },
        { lng: 121.258877, lat: 37.243706 },
        { lng: 121.259252, lat: 37.243778 },
        { lng: 121.259501, lat: 37.244091 },
        { lng: 121.259388, lat: 37.244626 },
        { lng: 121.259413, lat: 37.245111 },
        { lng: 121.258964, lat: 37.245329 },
        { lng: 121.256931, lat: 37.24545 },
        { lng: 121.256606, lat: 37.246462 },
        { lng: 121.25695, lat: 37.24745 },
        { lng: 121.256863, lat: 37.248097 },
        { lng: 121.256454, lat: 37.248385 },
        { lng: 121.254611, lat: 37.248245 },
        { lng: 121.254468, lat: 37.249999 },
        { lng: 121.255024, lat: 37.250158 },
        { lng: 121.254955, lat: 37.250532 },
        { lng: 121.254668, lat: 37.251457 },
        { lng: 121.254198, lat: 37.251462 },
        { lng: 121.253684, lat: 37.25377 },
        { lng: 121.253381, lat: 37.253792 },
        { lng: 121.253335, lat: 37.254863 },
        { lng: 121.25228, lat: 37.254833 },
        { lng: 121.252306, lat: 37.254003 },
        { lng: 121.251028, lat: 37.253905 },
        { lng: 121.250738, lat: 37.254714 },
        { lng: 121.248936, lat: 37.25464 },
        { lng: 121.248764, lat: 37.25685 },
        { lng: 121.247556, lat: 37.256319 },
        { lng: 121.247725, lat: 37.257627 },
        { lng: 121.248761, lat: 37.258504 },
        { lng: 121.249203, lat: 37.258561 },
        { lng: 121.249935, lat: 37.258909 },
        { lng: 121.250055, lat: 37.259199 },
        { lng: 121.250131, lat: 37.259554 },
        { lng: 121.250064, lat: 37.260635 },
        { lng: 121.249757, lat: 37.261121 },
        { lng: 121.249611, lat: 37.261603 },
        { lng: 121.250643, lat: 37.261669 },
        { lng: 121.251411, lat: 37.261902 },
        { lng: 121.252016, lat: 37.26248 },
        { lng: 121.252336, lat: 37.262986 },
        { lng: 121.252853, lat: 37.263498 },
        { lng: 121.253451, lat: 37.263906 },
        { lng: 121.254031, lat: 37.264231 },
        { lng: 121.256285, lat: 37.265038 },
        { lng: 121.257407, lat: 37.265613 },
        { lng: 121.258555, lat: 37.266558 },
        { lng: 121.259255, lat: 37.266952 },
        { lng: 121.260123, lat: 37.267147 },
        { lng: 121.26074, lat: 37.267515 },
        { lng: 121.261471, lat: 37.268194 },
        { lng: 121.261749, lat: 37.268971 },
        { lng: 121.261888, lat: 37.269128 },
        { lng: 121.26266, lat: 37.269139 },
        { lng: 121.264371, lat: 37.269803 },
        { lng: 121.266263, lat: 37.270152 },
        { lng: 121.267958, lat: 37.270624 },
        { lng: 121.268349, lat: 37.27094 },
        { lng: 121.268453, lat: 37.271731 },
        { lng: 121.265891, lat: 37.277653 },
        { lng: 121.262009, lat: 37.281477 },
        { lng: 121.261028, lat: 37.282932 },
        { lng: 121.262131, lat: 37.284448 },
        { lng: 121.264086, lat: 37.286298 },
        { lng: 121.266414, lat: 37.287819 },
        { lng: 121.268142, lat: 37.291415 },
        { lng: 121.267708, lat: 37.294264 },
        { lng: 121.265042, lat: 37.29626 },
        { lng: 121.262489, lat: 37.297336 },
        { lng: 121.259867, lat: 37.302325 },
        { lng: 121.257418, lat: 37.305985 },
        { lng: 121.251498, lat: 37.314426 },
        { lng: 121.247194, lat: 37.316295 },
        { lng: 121.23503, lat: 37.31736 },
        { lng: 121.229236, lat: 37.318051 },
        { lng: 121.228239, lat: 37.319594 },
        { lng: 121.226887, lat: 37.323147 },
        { lng: 121.226558, lat: 37.326742 },
        { lng: 121.223922, lat: 37.328929 },
        { lng: 121.222492, lat: 37.331032 },
        { lng: 121.222639, lat: 37.332444 },
        { lng: 121.223403, lat: 37.336142 },
        { lng: 121.222805, lat: 37.337685 },
        { lng: 121.221973, lat: 37.339448 },
        { lng: 121.218904, lat: 37.340533 },
        { lng: 121.215394, lat: 37.344632 },
        { lng: 121.210394, lat: 37.350792 },
        { lng: 121.200109, lat: 37.356258 },
        { lng: 121.19124, lat: 37.365461 },
        { lng: 121.178152, lat: 37.369089 },
        { lng: 121.170798, lat: 37.367249 },
        { lng: 121.155413, lat: 37.362075 },
        { lng: 121.151176, lat: 37.360918 },
        { lng: 121.143793, lat: 37.355858 },
        { lng: 121.135332, lat: 37.343646 },
        { lng: 121.127025, lat: 37.336838 },
        { lng: 121.120719, lat: 37.326613 },
        { lng: 121.117743, lat: 37.323558 },
        { lng: 121.114402, lat: 37.322379 },
        { lng: 121.110992, lat: 37.32238 },
        { lng: 121.1091, lat: 37.323948 },
        { lng: 121.100688, lat: 37.328369 },
        { lng: 121.098361, lat: 37.329862 },
        { lng: 121.099152, lat: 37.33872 },
        { lng: 121.100776, lat: 37.340384 },
        { lng: 121.10925, lat: 37.344204 },
        { lng: 121.109831, lat: 37.344955 },
        { lng: 121.109918, lat: 37.346992 },
        { lng: 121.113286, lat: 37.353517 },
        { lng: 121.115942, lat: 37.361123 },
        { lng: 121.118684, lat: 37.363076 },
        { lng: 121.1212, lat: 37.374261 },
        { lng: 121.121213, lat: 37.374279 },
        { lng: 121.121209, lat: 37.3743 },
        { lng: 121.122798, lat: 37.381366 },
        { lng: 121.12475, lat: 37.387555 },
        { lng: 121.126658, lat: 37.388761 },
        { lng: 121.132884, lat: 37.390873 },
        { lng: 121.137409, lat: 37.391866 },
        { lng: 121.138077, lat: 37.394401 },
        { lng: 121.136994, lat: 37.397355 },
        { lng: 121.135373, lat: 37.399767 },
        { lng: 121.136457, lat: 37.403174 },
        { lng: 121.135547, lat: 37.404881 },
        { lng: 121.126582, lat: 37.410127 },
        { lng: 121.123692, lat: 37.418911 },
        { lng: 121.123685, lat: 37.418929 },
        { lng: 121.123681, lat: 37.418946 },
        { lng: 121.123504, lat: 37.419482 },
        { lng: 121.122846, lat: 37.420564 },
        { lng: 121.121102, lat: 37.421481 },
        { lng: 121.112418, lat: 37.424603 },
        { lng: 121.110552, lat: 37.426019 },
        { lng: 121.111004, lat: 37.434998 },
        { lng: 121.112002, lat: 37.437945 },
        { lng: 121.116847, lat: 37.443599 },
        { lng: 121.117099, lat: 37.443594 },
        { lng: 121.117648, lat: 37.444078 },
        { lng: 121.117954, lat: 37.444885 },
        { lng: 121.118321, lat: 37.446335 },
        { lng: 121.117991, lat: 37.447454 },
        { lng: 121.11746, lat: 37.448035 },
        { lng: 121.115928, lat: 37.450406 },
        { lng: 121.115715, lat: 37.452244 },
        { lng: 121.114822, lat: 37.453494 },
        { lng: 121.114749, lat: 37.454202 },
        { lng: 121.113593, lat: 37.457067 },
        { lng: 121.11358, lat: 37.457577 },
        { lng: 121.113849, lat: 37.457936 },
        { lng: 121.11426, lat: 37.458164 },
        { lng: 121.115716, lat: 37.458614 },
        { lng: 121.115819, lat: 37.458772 },
        { lng: 121.115891, lat: 37.459949 },
        { lng: 121.115724, lat: 37.462977 },
        { lng: 121.114774, lat: 37.464271 },
        { lng: 121.114017, lat: 37.465078 },
        { lng: 121.113149, lat: 37.465703 },
        { lng: 121.111874, lat: 37.46568 },
        { lng: 121.110907, lat: 37.466401 },
        { lng: 121.110493, lat: 37.465598 },
        { lng: 121.110321, lat: 37.465426 },
        { lng: 121.108204, lat: 37.464036 },
        { lng: 121.107469, lat: 37.462567 },
        { lng: 121.107009, lat: 37.462164 },
        { lng: 121.105369, lat: 37.462069 },
        { lng: 121.10494, lat: 37.462236 },
        { lng: 121.104222, lat: 37.464483 },
        { lng: 121.104059, lat: 37.46456 },
        { lng: 121.103149, lat: 37.464158 },
        { lng: 121.103817, lat: 37.462079 },
        { lng: 121.101959, lat: 37.46185 },
        { lng: 121.100706, lat: 37.464114 },
        { lng: 121.100218, lat: 37.464682 },
        { lng: 121.099401, lat: 37.465112 },
        { lng: 121.099011, lat: 37.465667 },
        { lng: 121.094346, lat: 37.469248 },
        { lng: 121.094232, lat: 37.470156 },
        { lng: 121.09376, lat: 37.470836 },
        { lng: 121.093292, lat: 37.472314 },
        { lng: 121.092003, lat: 37.471665 },
        { lng: 121.091442, lat: 37.472742 },
        { lng: 121.090982, lat: 37.473333 },
        { lng: 121.090292, lat: 37.474186 },
        { lng: 121.089756, lat: 37.474466 },
        { lng: 121.089613, lat: 37.474643 },
        { lng: 121.089289, lat: 37.475379 },
        { lng: 121.089292, lat: 37.475898 },
        { lng: 121.087848, lat: 37.476097 },
        { lng: 121.08345, lat: 37.476397 },
        { lng: 121.083244, lat: 37.477712 },
        { lng: 121.084584, lat: 37.477772 },
        { lng: 121.084828, lat: 37.478269 },
        { lng: 121.084615, lat: 37.479053 },
        { lng: 121.084403, lat: 37.479476 },
        { lng: 121.083861, lat: 37.479576 },
        { lng: 121.082664, lat: 37.479512 },
        { lng: 121.08149, lat: 37.479691 },
        { lng: 121.080717, lat: 37.479411 },
        { lng: 121.080006, lat: 37.478889 },
        { lng: 121.079744, lat: 37.478264 },
        { lng: 121.080068, lat: 37.477901 },
        { lng: 121.080271, lat: 37.47725 },
        { lng: 121.080306, lat: 37.476885 },
        { lng: 121.080199, lat: 37.476637 },
        { lng: 121.077621, lat: 37.476576 },
        { lng: 121.075788, lat: 37.476318 },
        { lng: 121.073733, lat: 37.476215 },
        { lng: 121.073177, lat: 37.476391 },
        { lng: 121.0725, lat: 37.477117 },
        { lng: 121.072137, lat: 37.478219 },
        { lng: 121.072091, lat: 37.478928 },
        { lng: 121.071949, lat: 37.479001 },
        { lng: 121.071862, lat: 37.479674 },
        { lng: 121.072406, lat: 37.480358 },
        { lng: 121.072885, lat: 37.480566 },
        { lng: 121.073521, lat: 37.481018 },
        { lng: 121.074567, lat: 37.483429 },
        { lng: 121.074534, lat: 37.484179 },
        { lng: 121.074786, lat: 37.484839 },
        { lng: 121.075668, lat: 37.48525 },
        { lng: 121.076056, lat: 37.485304 },
        { lng: 121.076577, lat: 37.48451 },
        { lng: 121.078286, lat: 37.485112 },
        { lng: 121.078421, lat: 37.485292 },
        { lng: 121.078518, lat: 37.485848 },
        { lng: 121.078506, lat: 37.486336 },
        { lng: 121.078274, lat: 37.486664 },
        { lng: 121.078123, lat: 37.487128 },
        { lng: 121.07825, lat: 37.487618 },
        { lng: 121.079159, lat: 37.48801 },
        { lng: 121.079577, lat: 37.488018 },
        { lng: 121.080324, lat: 37.48823 },
        { lng: 121.081065, lat: 37.488686 },
        { lng: 121.081383, lat: 37.489083 },
        { lng: 121.082432, lat: 37.489496 },
        { lng: 121.082598, lat: 37.489428 },
        { lng: 121.083065, lat: 37.488482 },
        { lng: 121.083946, lat: 37.488631 },
        { lng: 121.084112, lat: 37.49044 },
        { lng: 121.089023, lat: 37.495679 },
        { lng: 121.090518, lat: 37.497425 },
        { lng: 121.088694, lat: 37.503411 },
        { lng: 121.085114, lat: 37.503825 },
        { lng: 121.074212, lat: 37.504225 },
        { lng: 121.067628, lat: 37.507958 },
        { lng: 121.04788, lat: 37.51299 },
        { lng: 121.045921, lat: 37.514066 },
        { lng: 121.042882, lat: 37.518465 },
        { lng: 121.038162, lat: 37.525707 },
        { lng: 121.037649, lat: 37.534852 },
        { lng: 121.041796, lat: 37.538449 },
        { lng: 121.050051, lat: 37.540817 },
        { lng: 121.056729, lat: 37.545645 },
        { lng: 121.061777, lat: 37.553621 },
        { lng: 121.064554, lat: 37.560823 },
        { lng: 121.065764, lat: 37.570258 },
        { lng: 121.067914, lat: 37.578357 },
        { lng: 121.07316, lat: 37.587936 },
        { lng: 121.083916, lat: 37.597254 },
        { lng: 121.090979, lat: 37.605125 },
        { lng: 121.09074, lat: 37.605254 },
        { lng: 121.089368, lat: 37.605258 },
        { lng: 121.087301, lat: 37.604904 },
        { lng: 121.085928, lat: 37.604907 },
        { lng: 121.085659, lat: 37.604982 },
        { lng: 121.085583, lat: 37.6053 },
        { lng: 121.086434, lat: 37.60739 },
        { lng: 121.085876, lat: 37.608259 },
        { lng: 121.085534, lat: 37.608519 },
        { lng: 121.085162, lat: 37.608646 },
        { lng: 121.084364, lat: 37.608337 },
        { lng: 121.083863, lat: 37.60869 },
        { lng: 121.084073, lat: 37.609371 },
        { lng: 121.0845, lat: 37.609695 },
        { lng: 121.085861, lat: 37.610121 },
        { lng: 121.087158, lat: 37.611005 },
        { lng: 121.088424, lat: 37.612054 },
        { lng: 121.090864, lat: 37.614809 },
        { lng: 121.092617, lat: 37.615637 },
        { lng: 121.092993, lat: 37.615655 },
        { lng: 121.093373, lat: 37.615955 },
        { lng: 121.093412, lat: 37.615953 },
        { lng: 121.093391, lat: 37.615969 },
        { lng: 121.091839, lat: 37.616711 },
        { lng: 121.091932, lat: 37.617622 },
        { lng: 121.092631, lat: 37.617963 },
        { lng: 121.092338, lat: 37.618542 },
        { lng: 121.091965, lat: 37.618941 },
        { lng: 121.091637, lat: 37.619063 },
        { lng: 121.091649, lat: 37.619439 },
        { lng: 121.091412, lat: 37.619469 },
        { lng: 121.091423, lat: 37.619699 },
        { lng: 121.091807, lat: 37.619827 },
        { lng: 121.092518, lat: 37.622127 },
        { lng: 121.092218, lat: 37.622821 },
        { lng: 121.092222, lat: 37.623393 },
        { lng: 121.092361, lat: 37.623877 },
        { lng: 121.093216, lat: 37.624524 },
        { lng: 121.092723, lat: 37.62489 },
        { lng: 121.092509, lat: 37.625453 },
        { lng: 121.092246, lat: 37.625703 },
        { lng: 121.091957, lat: 37.625749 },
        { lng: 121.091288, lat: 37.62556 },
        { lng: 121.090777, lat: 37.625526 },
        { lng: 121.089364, lat: 37.625629 },
        { lng: 121.088589, lat: 37.625871 },
        { lng: 121.088327, lat: 37.62607 },
        { lng: 121.087907, lat: 37.626216 },
        { lng: 121.087459, lat: 37.626182 },
        { lng: 121.085971, lat: 37.62547 },
        { lng: 121.085588, lat: 37.625412 },
        { lng: 121.085032, lat: 37.62581 },
        { lng: 121.084763, lat: 37.626315 },
        { lng: 121.084343, lat: 37.626435 },
        { lng: 121.082513, lat: 37.626556 },
        { lng: 121.081899, lat: 37.626749 },
        { lng: 121.080954, lat: 37.627319 },
        { lng: 121.079495, lat: 37.627956 },
        { lng: 121.079006, lat: 37.628253 },
        { lng: 121.078672, lat: 37.628807 },
        { lng: 121.078442, lat: 37.629007 },
        { lng: 121.077924, lat: 37.629176 },
        { lng: 121.076546, lat: 37.629152 },
        { lng: 121.075179, lat: 37.628695 },
        { lng: 121.074571, lat: 37.628659 },
        { lng: 121.07279, lat: 37.629289 },
        { lng: 121.072298, lat: 37.629688 },
        { lng: 121.071627, lat: 37.630822 },
        { lng: 121.071206, lat: 37.630968 },
        { lng: 121.069889, lat: 37.631046 },
        { lng: 121.069275, lat: 37.631213 },
        { lng: 121.06866, lat: 37.631431 },
        { lng: 121.066836, lat: 37.632493 },
        { lng: 121.066189, lat: 37.632685 },
        { lng: 121.06529, lat: 37.632669 },
        { lng: 121.064237, lat: 37.632446 },
        { lng: 121.062925, lat: 37.632321 },
        { lng: 121.062544, lat: 37.632161 },
        { lng: 121.06122, lat: 37.63122 },
        { lng: 121.061086, lat: 37.630224 },
        { lng: 121.060655, lat: 37.629504 },
        { lng: 121.059924, lat: 37.62921 },
        { lng: 121.059539, lat: 37.629228 },
        { lng: 121.058945, lat: 37.629829 },
        { lng: 121.058633, lat: 37.63074 },
        { lng: 121.058397, lat: 37.631143 },
        { lng: 121.05797, lat: 37.631517 },
        { lng: 121.057337, lat: 37.632422 },
        { lng: 121.057351, lat: 37.632785 },
        { lng: 121.058114, lat: 37.633404 },
        { lng: 121.058758, lat: 37.633314 },
        { lng: 121.059142, lat: 37.633372 },
        { lng: 121.059426, lat: 37.63353 },
        { lng: 121.059705, lat: 37.633942 },
        { lng: 121.059803, lat: 37.63509 },
        { lng: 121.059537, lat: 37.635467 },
        { lng: 121.059116, lat: 37.635587 },
        { lng: 121.05761, lat: 37.636705 },
        { lng: 121.056943, lat: 37.636438 },
        { lng: 121.055565, lat: 37.636336 },
        { lng: 121.054416, lat: 37.637308 },
        { lng: 121.054109, lat: 37.637964 },
        { lng: 121.053825, lat: 37.63897 },
        { lng: 121.053781, lat: 37.639486 },
        { lng: 121.053119, lat: 37.640212 },
        { lng: 121.052231, lat: 37.64101 },
        { lng: 121.050773, lat: 37.641518 },
        { lng: 121.050317, lat: 37.641764 },
        { lng: 121.049434, lat: 37.642359 },
        { lng: 121.047989, lat: 37.643553 },
        { lng: 121.046976, lat: 37.644197 },
        { lng: 121.046738, lat: 37.644727 },
        { lng: 121.047027, lat: 37.645955 },
        { lng: 121.046951, lat: 37.646386 },
        { lng: 121.046717, lat: 37.646738 },
        { lng: 121.04616, lat: 37.647135 },
        { lng: 121.045381, lat: 37.647451 },
        { lng: 121.042708, lat: 37.647706 },
        { lng: 121.042026, lat: 37.647973 },
        { lng: 121.041762, lat: 37.648223 },
        { lng: 121.042141, lat: 37.649707 },
        { lng: 121.042277, lat: 37.650626 },
        { lng: 121.042663, lat: 37.65183 },
        { lng: 121.042612, lat: 37.652542 },
        { lng: 121.042283, lat: 37.652842 },
        { lng: 121.037543, lat: 37.654661 },
        { lng: 121.036377, lat: 37.654995 },
        { lng: 121.035635, lat: 37.655108 },
        { lng: 121.033419, lat: 37.655039 },
        { lng: 121.032837, lat: 37.655155 },
        { lng: 121.032412, lat: 37.655452 },
        { lng: 121.032282, lat: 37.656724 },
        { lng: 121.032269, lat: 37.658404 },
        { lng: 121.032363, lat: 37.659704 },
        { lng: 121.032189, lat: 37.660236 },
        { lng: 121.031429, lat: 37.66101 },
        { lng: 121.03059, lat: 37.661121 },
        { lng: 121.02974, lat: 37.661639 },
        { lng: 121.028294, lat: 37.661636 },
        { lng: 121.027419, lat: 37.661874 },
        { lng: 121.026217, lat: 37.66236 },
        { lng: 121.023722, lat: 37.663075 },
        { lng: 121.022924, lat: 37.66283 },
        { lng: 121.021351, lat: 37.662748 },
        { lng: 121.020513, lat: 37.662808 },
        { lng: 121.019768, lat: 37.663022 },
        { lng: 121.019275, lat: 37.66342 },
        { lng: 121.018896, lat: 37.66438 },
        { lng: 121.01904, lat: 37.664994 },
        { lng: 121.019318, lat: 37.665407 },
        { lng: 121.019464, lat: 37.665996 },
        { lng: 121.01922, lat: 37.666678 },
        { lng: 121.018852, lat: 37.667231 },
        { lng: 121.018537, lat: 37.668193 },
        { lng: 121.018064, lat: 37.669049 },
        { lng: 121.016925, lat: 37.669536 },
        { lng: 121.015782, lat: 37.670201 },
        { lng: 121.015056, lat: 37.670874 },
        { lng: 121.015414, lat: 37.671925 },
        { lng: 121.016053, lat: 37.673262 },
        { lng: 121.016343, lat: 37.674464 },
        { lng: 121.01662, lat: 37.674954 },
        { lng: 121.016828, lat: 37.675594 },
        { lng: 121.016731, lat: 37.676814 },
        { lng: 121.016131, lat: 37.678789 },
        { lng: 121.016062, lat: 37.680188 },
        { lng: 121.015385, lat: 37.681422 },
        { lng: 121.014692, lat: 37.682096 },
        { lng: 121.01436, lat: 37.683668 },
        { lng: 121.014294, lat: 37.68494 },
        { lng: 121.014567, lat: 37.686753 },
        { lng: 121.014297, lat: 37.687232 },
        { lng: 121.013771, lat: 37.687654 },
        { lng: 121.013404, lat: 37.688131 },
        { lng: 121.013233, lat: 37.688509 },
        { lng: 121.013218, lat: 37.689094 },
        { lng: 121.013688, lat: 37.690759 },
        { lng: 121.014083, lat: 37.691632 },
        { lng: 121.015551, lat: 37.692043 },
        { lng: 121.017033, lat: 37.691971 },
        { lng: 121.017939, lat: 37.691785 },
        { lng: 121.01868, lat: 37.691749 },
        { lng: 121.019159, lat: 37.69186 },
        { lng: 121.020179, lat: 37.692237 },
        { lng: 121.021129, lat: 37.69279 },
        { lng: 121.021435, lat: 37.693407 },
        { lng: 121.021812, lat: 37.69372 },
        { lng: 121.022734, lat: 37.69412 },
        { lng: 121.024116, lat: 37.694198 },
        { lng: 121.026634, lat: 37.693351 },
        { lng: 121.027186, lat: 37.693648 },
        { lng: 121.027403, lat: 37.693958 },
        { lng: 121.027627, lat: 37.695209 },
        { lng: 121.027551, lat: 37.695641 },
        { lng: 121.026997, lat: 37.69591 },
        { lng: 121.025732, lat: 37.696318 },
        { lng: 121.024703, lat: 37.697494 },
        { lng: 121.024644, lat: 37.698512 },
        { lng: 121.024412, lat: 37.698762 },
        { lng: 121.024054, lat: 37.698933 },
        { lng: 121.023572, lat: 37.698898 },
        { lng: 121.023127, lat: 37.698711 },
        { lng: 121.022612, lat: 37.698701 },
        { lng: 121.022094, lat: 37.698844 },
        { lng: 121.021698, lat: 37.699192 },
        { lng: 121.021331, lat: 37.699694 },
        { lng: 121.021078, lat: 37.700733 },
        { lng: 121.02051, lat: 37.702131 },
        { lng: 121.020472, lat: 37.702167 },
        { lng: 121.020416, lat: 37.702206 },
        { lng: 121.02007, lat: 37.702389 },
        { lng: 121.019833, lat: 37.702478 },
        { lng: 121.019646, lat: 37.702539 },
        { lng: 121.019129, lat: 37.702656 },
        { lng: 121.018802, lat: 37.702852 },
        { lng: 121.018606, lat: 37.703293 },
        { lng: 121.019671, lat: 37.703748 },
        { lng: 121.02229, lat: 37.705515 },
        { lng: 121.025912, lat: 37.708898 },
        { lng: 121.028044, lat: 37.711262 },
        { lng: 121.03515, lat: 37.720029 },
        { lng: 121.037704, lat: 37.718566 },
        { lng: 121.045656, lat: 37.716403 },
        { lng: 121.050723, lat: 37.715664 },
        { lng: 121.055102, lat: 37.715743 },
        { lng: 121.064545, lat: 37.717124 },
        { lng: 121.065568, lat: 37.720021 },
        { lng: 121.068373, lat: 37.725171 },
        { lng: 121.071177, lat: 37.725084 },
        { lng: 121.072938, lat: 37.722867 },
        { lng: 121.072938, lat: 37.719623 },
        { lng: 121.075481, lat: 37.717792 },
        { lng: 121.086641, lat: 37.721179 },
        { lng: 121.096346, lat: 37.722686 },
        { lng: 121.107608, lat: 37.723233 },
        { lng: 121.124024, lat: 37.723637 },
        { lng: 121.136232, lat: 37.723282 },
        { lng: 121.139838, lat: 37.723038 },
        { lng: 121.144241, lat: 37.721904 },
        { lng: 121.148495, lat: 37.719645 },
        { lng: 121.152896, lat: 37.716227 },
        { lng: 121.15572, lat: 37.713014 },
        { lng: 121.158414, lat: 37.709186 },
        { lng: 121.159566, lat: 37.706862 },
        { lng: 121.16025, lat: 37.703141 },
        { lng: 121.160284, lat: 37.701158 },
        { lng: 121.160042, lat: 37.699045 },
        { lng: 121.158447, lat: 37.695358 },
        { lng: 121.155648, lat: 37.690858 },
        { lng: 121.149314, lat: 37.683086 },
        { lng: 121.146108, lat: 37.678859 },
        { lng: 121.1444, lat: 37.675446 },
        { lng: 121.143377, lat: 37.671285 },
        { lng: 121.1427, lat: 37.661282 },
        { lng: 121.146314, lat: 37.660938 },
        { lng: 121.151495, lat: 37.659845 },
        { lng: 121.154449, lat: 37.658794 },
        { lng: 121.156598, lat: 37.657375 },
        { lng: 121.158443, lat: 37.655154 },
        { lng: 121.160158, lat: 37.652317 },
        { lng: 121.161266, lat: 37.648929 },
        { lng: 121.161699, lat: 37.646342 },
        { lng: 121.161508, lat: 37.644063 },
        { lng: 121.160772, lat: 37.642033 },
        { lng: 121.15942, lat: 37.639943 },
        { lng: 121.152133, lat: 37.631227 },
        { lng: 121.150123, lat: 37.628978 },
        { lng: 121.149065, lat: 37.62618 },
        { lng: 121.148796, lat: 37.623858 },
        { lng: 121.149134, lat: 37.621639 },
        { lng: 121.149541, lat: 37.619863 },
        { lng: 121.15039, lat: 37.618261 },
        { lng: 121.153699, lat: 37.613954 },
        { lng: 121.166302, lat: 37.603618 },
        { lng: 121.169741, lat: 37.600608 },
        { lng: 121.174513, lat: 37.597495 },
        { lng: 121.182516, lat: 37.594268 },
        { lng: 121.205099, lat: 37.586992 },
        { lng: 121.215905, lat: 37.583118 },
        { lng: 121.217465, lat: 37.582808 },
        { lng: 121.229334, lat: 37.582113 },
        { lng: 121.251241, lat: 37.581112 },
        { lng: 121.258368, lat: 37.581351 },
        { lng: 121.270841, lat: 37.582006 },
        { lng: 121.277332, lat: 37.582554 },
        { lng: 121.281912, lat: 37.582627 },
        { lng: 121.290154, lat: 37.582467 },
        { lng: 121.294336, lat: 37.582199 },
        { lng: 121.29805, lat: 37.582204 },
        { lng: 121.30493, lat: 37.582983 }
      ],

      polygonPath2: [
        { lng: 121.366052, lat: 37.415496 },
        { lng: 121.370904, lat: 37.421809 },
        { lng: 121.372695, lat: 37.422641 },
        { lng: 121.374652, lat: 37.42306 },
        { lng: 121.375094, lat: 37.423078 },
        { lng: 121.382893, lat: 37.423404 },
        { lng: 121.38477, lat: 37.423905 },
        { lng: 121.385596, lat: 37.424362 },
        { lng: 121.385969, lat: 37.425109 },
        { lng: 121.386144, lat: 37.430471 },
        { lng: 121.386552, lat: 37.433923 },
        { lng: 121.388717, lat: 37.441783 },
        { lng: 121.389178, lat: 37.442656 },
        { lng: 121.390838, lat: 37.443986 },
        { lng: 121.393044, lat: 37.444821 },
        { lng: 121.395833, lat: 37.445608 },
        { lng: 121.397205, lat: 37.446481 },
        { lng: 121.397865, lat: 37.44748 },
        { lng: 121.397996, lat: 37.448688 },
        { lng: 121.397414, lat: 37.450432 },
        { lng: 121.395043, lat: 37.452884 },
        { lng: 121.39209, lat: 37.454793 },
        { lng: 121.390969, lat: 37.455209 },
        { lng: 121.388719, lat: 37.455542 },
        { lng: 121.386729, lat: 37.456578 },
        { lng: 121.38606, lat: 37.458031 },
        { lng: 121.385521, lat: 37.460236 },
        { lng: 121.385478, lat: 37.461318 },
        { lng: 121.387182, lat: 37.466099 },
        { lng: 121.387686, lat: 37.468174 },
        { lng: 121.387686, lat: 37.46959 },
        { lng: 121.387391, lat: 37.471252 },
        { lng: 121.387391, lat: 37.472208 },
        { lng: 121.387556, lat: 37.473206 },
        { lng: 121.388139, lat: 37.474288 },
        { lng: 121.389016, lat: 37.475452 },
        { lng: 121.390676, lat: 37.477198 },
        { lng: 121.392927, lat: 37.480734 },
        { lng: 121.395299, lat: 37.487677 },
        { lng: 121.397774, lat: 37.494219 },
        { lng: 121.397633, lat: 37.495348 },
        { lng: 121.397409, lat: 37.495711 },
        { lng: 121.394651, lat: 37.497014 },
        { lng: 121.394341, lat: 37.497358 },
        { lng: 121.394198, lat: 37.497731 },
        { lng: 121.394202, lat: 37.499124 },
        { lng: 121.394321, lat: 37.499849 },
        { lng: 121.393561, lat: 37.500801 },
        { lng: 121.393541, lat: 37.501683 },
        { lng: 121.394057, lat: 37.502708 },
        { lng: 121.39478, lat: 37.503522 },
        { lng: 121.395276, lat: 37.503903 },
        { lng: 121.396284, lat: 37.503945 },
        { lng: 121.399162, lat: 37.502994 },
        { lng: 121.400751, lat: 37.502588 },
        { lng: 121.403613, lat: 37.50236 },
        { lng: 121.405607, lat: 37.501825 },
        { lng: 121.406511, lat: 37.501822 },
        { lng: 121.406513, lat: 37.501531 },
        { lng: 121.407362, lat: 37.500906 },
        { lng: 121.41016, lat: 37.498036 },
        { lng: 121.410508, lat: 37.497269 },
        { lng: 121.410876, lat: 37.496834 },
        { lng: 121.411321, lat: 37.496686 },
        { lng: 121.411574, lat: 37.496469 },
        { lng: 121.411974, lat: 37.495879 },
        { lng: 121.412765, lat: 37.495075 },
        { lng: 121.413297, lat: 37.494751 },
        { lng: 121.413805, lat: 37.494229 },
        { lng: 121.414836, lat: 37.493802 },
        { lng: 121.416794, lat: 37.490039 },
        { lng: 121.416901, lat: 37.488873 },
        { lng: 121.417222, lat: 37.488062 },
        { lng: 121.417257, lat: 37.487732 },
        { lng: 121.41705, lat: 37.487069 },
        { lng: 121.417287, lat: 37.486301 },
        { lng: 121.417575, lat: 37.485776 },
        { lng: 121.417461, lat: 37.484607 },
        { lng: 121.417691, lat: 37.484169 },
        { lng: 121.417858, lat: 37.484128 },
        { lng: 121.418077, lat: 37.48424 },
        { lng: 121.418374, lat: 37.484508 },
        { lng: 121.418642, lat: 37.484931 },
        { lng: 121.419104, lat: 37.485267 },
        { lng: 121.419736, lat: 37.485429 },
        { lng: 121.420427, lat: 37.485438 },
        { lng: 121.421516, lat: 37.484836 },
        { lng: 121.422029, lat: 37.484324 },
        { lng: 121.422782, lat: 37.483838 },
        { lng: 121.423143, lat: 37.483873 },
        { lng: 121.423393, lat: 37.484128 },
        { lng: 121.423487, lat: 37.484669 },
        { lng: 121.42405, lat: 37.486052 },
        { lng: 121.42473, lat: 37.486401 },
        { lng: 121.425106, lat: 37.486477 },
        { lng: 121.425409, lat: 37.486337 },
        { lng: 121.425559, lat: 37.485614 },
        { lng: 121.425702, lat: 37.485373 },
        { lng: 121.426208, lat: 37.485053 },
        { lng: 121.426438, lat: 37.485183 },
        { lng: 121.42659, lat: 37.48547 },
        { lng: 121.426868, lat: 37.485473 },
        { lng: 121.427179, lat: 37.485327 },
        { lng: 121.427574, lat: 37.484288 },
        { lng: 121.428083, lat: 37.483995 },
        { lng: 121.428429, lat: 37.483959 },
        { lng: 121.430391, lat: 37.48422 },
        { lng: 121.430834, lat: 37.484159 },
        { lng: 121.431365, lat: 37.483814 },
        { lng: 121.431838, lat: 37.483643 },
        { lng: 121.432531, lat: 37.483519 },
        { lng: 121.432999, lat: 37.483547 },
        { lng: 121.43447, lat: 37.484468 },
        { lng: 121.434868, lat: 37.485244 },
        { lng: 121.435191, lat: 37.485623 },
        { lng: 121.435711, lat: 37.485849 },
        { lng: 121.436923, lat: 37.485908 },
        { lng: 121.43812, lat: 37.485416 },
        { lng: 121.440244, lat: 37.484097 },
        { lng: 121.440717, lat: 37.483904 },
        { lng: 121.442223, lat: 37.48362 },
        { lng: 121.442634, lat: 37.483641 },
        { lng: 121.442822, lat: 37.483808 },
        { lng: 121.4427, lat: 37.484242 },
        { lng: 121.441891, lat: 37.486021 },
        { lng: 121.44056, lat: 37.489291 },
        { lng: 121.440139, lat: 37.491437 },
        { lng: 121.440006, lat: 37.492282 },
        { lng: 121.440095, lat: 37.493982 },
        { lng: 121.44061, lat: 37.496034 },
        { lng: 121.441098, lat: 37.498868 },
        { lng: 121.44095, lat: 37.499239 },
        { lng: 121.440396, lat: 37.499387 },
        { lng: 121.439263, lat: 37.49944 },
        { lng: 121.438542, lat: 37.499607 },
        { lng: 121.437201, lat: 37.500406 },
        { lng: 121.434917, lat: 37.501032 },
        { lng: 121.434304, lat: 37.501383 },
        { lng: 121.432333, lat: 37.501954 },
        { lng: 121.431995, lat: 37.502258 },
        { lng: 121.431785, lat: 37.503048 },
        { lng: 121.431848, lat: 37.50404 },
        { lng: 121.431589, lat: 37.504522 },
        { lng: 121.431082, lat: 37.505 },
        { lng: 121.430475, lat: 37.504971 },
        { lng: 121.428122, lat: 37.503972 },
        { lng: 121.427128, lat: 37.503982 },
        { lng: 121.426517, lat: 37.504128 },
        { lng: 121.425331, lat: 37.505391 },
        { lng: 121.423857, lat: 37.505879 },
        { lng: 121.420761, lat: 37.505972 },
        { lng: 121.419985, lat: 37.506116 },
        { lng: 121.419143, lat: 37.506766 },
        { lng: 121.41689, lat: 37.507442 },
        { lng: 121.415012, lat: 37.507417 },
        { lng: 121.413507, lat: 37.507987 },
        { lng: 121.412661, lat: 37.509126 },
        { lng: 121.411754, lat: 37.510744 },
        { lng: 121.411772, lat: 37.511607 },
        { lng: 121.411817, lat: 37.513572 },
        { lng: 121.411701, lat: 37.51471 },
        { lng: 121.411799, lat: 37.515955 },
        { lng: 121.412546, lat: 37.517261 },
        { lng: 121.413072, lat: 37.520333 },
        { lng: 121.414212, lat: 37.522613 },
        { lng: 121.415296, lat: 37.523644 },
        { lng: 121.416056, lat: 37.525 },
        { lng: 121.416273, lat: 37.526004 },
        { lng: 121.41669, lat: 37.527236 },
        { lng: 121.417222, lat: 37.527849 },
        { lng: 121.419256, lat: 37.527848 },
        { lng: 121.421198, lat: 37.527202 },
        { lng: 121.422245, lat: 37.527216 },
        { lng: 121.423091, lat: 37.526482 },
        { lng: 121.423707, lat: 37.526261 },
        { lng: 121.425868, lat: 37.526052 },
        { lng: 121.42646, lat: 37.526097 },
        { lng: 121.42706, lat: 37.525916 },
        { lng: 121.427161, lat: 37.525906 },
        { lng: 121.427326, lat: 37.525887 },
        { lng: 121.42792, lat: 37.525823 },
        { lng: 121.429062, lat: 37.525697 },
        { lng: 121.429419, lat: 37.525659 },
        { lng: 121.429505, lat: 37.525647 },
        { lng: 121.432585, lat: 37.522077 },
        { lng: 121.432841, lat: 37.522223 },
        { lng: 121.433119, lat: 37.522359 },
        { lng: 121.433366, lat: 37.52247 },
        { lng: 121.433677, lat: 37.522623 },
        { lng: 121.434096, lat: 37.522863 },
        { lng: 121.434066, lat: 37.524093 },
        { lng: 121.434168, lat: 37.524567 },
        { lng: 121.434113, lat: 37.525423 },
        { lng: 121.435243, lat: 37.525585 },
        { lng: 121.435911, lat: 37.525709 },
        { lng: 121.437765, lat: 37.525741 },
        { lng: 121.453244, lat: 37.527717 },
        { lng: 121.453953, lat: 37.527277 },
        { lng: 121.457658, lat: 37.526006 },
        { lng: 121.459329, lat: 37.523988 },
        { lng: 121.459839, lat: 37.52262 },
        { lng: 121.459977, lat: 37.521187 },
        { lng: 121.459977, lat: 37.519889 },
        { lng: 121.459735, lat: 37.518522 },
        { lng: 121.459025, lat: 37.516305 },
        { lng: 121.457726, lat: 37.512961 },
        { lng: 121.456981, lat: 37.506989 },
        { lng: 121.456668, lat: 37.502652 },
        { lng: 121.457075, lat: 37.499648 },
        { lng: 121.457456, lat: 37.498622 },
        { lng: 121.458546, lat: 37.496775 },
        { lng: 121.460451, lat: 37.493836 },
        { lng: 121.475419, lat: 37.478092 },
        { lng: 121.477356, lat: 37.475938 },
        { lng: 121.479259, lat: 37.474978 },
        { lng: 121.485928, lat: 37.473726 },
        { lng: 121.493581, lat: 37.470531 },
        { lng: 121.500862, lat: 37.466445 },
        { lng: 121.510822, lat: 37.463003 },
        { lng: 121.514938, lat: 37.461862 },
        { lng: 121.519149, lat: 37.461745 },
        { lng: 121.521978, lat: 37.461945 },
        { lng: 121.527997, lat: 37.463088 },
        { lng: 121.529528, lat: 37.463152 },
        { lng: 121.530886, lat: 37.463044 },
        { lng: 121.532045, lat: 37.46246 },
        { lng: 121.533091, lat: 37.461024 },
        { lng: 121.534181, lat: 37.458838 },
        { lng: 121.536628, lat: 37.452479 },
        { lng: 121.537208, lat: 37.451215 },
        { lng: 121.538229, lat: 37.450561 },
        { lng: 121.540374, lat: 37.450112 },
        { lng: 121.542684, lat: 37.450072 },
        { lng: 121.544181, lat: 37.449795 },
        { lng: 121.544865, lat: 37.449042 },
        { lng: 121.545306, lat: 37.44819 },
        { lng: 121.546093, lat: 37.44706 },
        { lng: 121.548066, lat: 37.445896 },
        { lng: 121.555623, lat: 37.443661 },
        { lng: 121.565321, lat: 37.440396 },
        { lng: 121.561652, lat: 37.424095 },
        { lng: 121.561639, lat: 37.423571 },
        { lng: 121.561814, lat: 37.422833 },
        { lng: 121.562724, lat: 37.421118 },
        { lng: 121.562449, lat: 37.419756 },
        { lng: 121.56215, lat: 37.419069 },
        { lng: 121.561564, lat: 37.418082 },
        { lng: 121.560517, lat: 37.417047 },
        { lng: 121.558974, lat: 37.416036 },
        { lng: 121.556649, lat: 37.414185 },
        { lng: 121.555976, lat: 37.413895 },
        { lng: 121.552176, lat: 37.412669 },
        { lng: 121.551819, lat: 37.412476 },
        { lng: 121.551122, lat: 37.411749 },
        { lng: 121.548751, lat: 37.409642 },
        { lng: 121.547817, lat: 37.408246 },
        { lng: 121.543744, lat: 37.401223 },
        { lng: 121.541321, lat: 37.398712 },
        { lng: 121.54131, lat: 37.398696 },
        { lng: 121.541246, lat: 37.398634 },
        { lng: 121.541234, lat: 37.398622 },
        { lng: 121.533452, lat: 37.392825 },
        { lng: 121.533437, lat: 37.392813 },
        { lng: 121.533422, lat: 37.392803 },
        { lng: 121.523984, lat: 37.385773 },
        { lng: 121.512958, lat: 37.377725 },
        { lng: 121.506559, lat: 37.373198 },
        { lng: 121.506178, lat: 37.372752 },
        { lng: 121.504241, lat: 37.368281 },
        { lng: 121.503618, lat: 37.367584 },
        { lng: 121.502286, lat: 37.366663 },
        { lng: 121.501447, lat: 37.365897 },
        { lng: 121.500211, lat: 37.364194 },
        { lng: 121.498714, lat: 37.36076 },
        { lng: 121.497832, lat: 37.359568 },
        { lng: 121.497235, lat: 37.358198 },
        { lng: 121.494554, lat: 37.354016 },
        { lng: 121.493421, lat: 37.352869 },
        { lng: 121.490974, lat: 37.351026 },
        { lng: 121.490092, lat: 37.350225 },
        { lng: 121.488794, lat: 37.348579 },
        { lng: 121.487843, lat: 37.346845 },
        { lng: 121.48722, lat: 37.346026 },
        { lng: 121.48504, lat: 37.344243 },
        { lng: 121.48261, lat: 37.342036 },
        { lng: 121.481295, lat: 37.340637 },
        { lng: 121.478587, lat: 37.338152 },
        { lng: 121.477151, lat: 37.337096 },
        { lng: 121.473742, lat: 37.334912 },
        { lng: 121.472488, lat: 37.333231 },
        { lng: 121.472064, lat: 37.332368 },
        { lng: 121.471683, lat: 37.331309 },
        { lng: 121.471276, lat: 37.329222 },
        { lng: 121.471224, lat: 37.328245 },
        { lng: 121.471362, lat: 37.326186 },
        { lng: 121.471769, lat: 37.323879 },
        { lng: 121.471699, lat: 37.321257 },
        { lng: 121.471517, lat: 37.319816 },
        { lng: 121.470946, lat: 37.318072 },
        { lng: 121.470106, lat: 37.316858 },
        { lng: 121.467484, lat: 37.314442 },
        { lng: 121.464611, lat: 37.311578 },
        { lng: 121.464066, lat: 37.311267 },
        { lng: 121.463174, lat: 37.311282 },
        { lng: 121.462421, lat: 37.311688 },
        { lng: 121.461902, lat: 37.311649 },
        { lng: 121.461036, lat: 37.311348 },
        { lng: 121.46095, lat: 37.311109 },
        { lng: 121.461824, lat: 37.310703 },
        { lng: 121.461962, lat: 37.309904 },
        { lng: 121.462369, lat: 37.309308 },
        { lng: 121.462542, lat: 37.309181 },
        { lng: 121.463434, lat: 37.308932 },
        { lng: 121.464455, lat: 37.308304 },
        { lng: 121.465112, lat: 37.307473 },
        { lng: 121.465199, lat: 37.306535 },
        { lng: 121.465052, lat: 37.306245 },
        { lng: 121.464368, lat: 37.305747 },
        { lng: 121.463641, lat: 37.305375 },
        { lng: 121.461304, lat: 37.303635 },
        { lng: 121.459635, lat: 37.298869 },
        { lng: 121.457203, lat: 37.293148 },
        { lng: 121.454983, lat: 37.289972 },
        { lng: 121.447688, lat: 37.288819 },
        { lng: 121.442876, lat: 37.289066 },
        { lng: 121.439967, lat: 37.287479 },
        { lng: 121.440231, lat: 37.283503 },
        { lng: 121.442479, lat: 37.281644 },
        { lng: 121.443271, lat: 37.276208 },
        { lng: 121.440693, lat: 37.272169 },
        { lng: 121.43408, lat: 37.272443 },
        { lng: 121.429449, lat: 37.271653 },
        { lng: 121.427068, lat: 37.269534 },
        { lng: 121.427596, lat: 37.266485 },
        { lng: 121.430904, lat: 37.262903 },
        { lng: 121.433549, lat: 37.257863 },
        { lng: 121.429712, lat: 37.252565 },
        { lng: 121.418726, lat: 37.247669 },
        { lng: 121.41237, lat: 37.247539 },
        { lng: 121.403097, lat: 37.248731 },
        { lng: 121.397928, lat: 37.247537 },
        { lng: 121.391962, lat: 37.245281 },
        { lng: 121.388382, lat: 37.247929 },
        { lng: 121.382547, lat: 37.256142 },
        { lng: 121.375251, lat: 37.25958 },
        { lng: 121.367952, lat: 37.257979 },
        { lng: 121.357332, lat: 37.253323 },
        { lng: 121.351622, lat: 37.255567 },
        { lng: 121.348171, lat: 37.25967 },
        { lng: 121.344187, lat: 37.262048 },
        { lng: 121.337282, lat: 37.263758 },
        { lng: 121.327109, lat: 37.267716 },
        { lng: 121.334306, lat: 37.276576 },
        { lng: 121.340398, lat: 37.287734 },
        { lng: 121.342618, lat: 37.295846 },
        { lng: 121.341879, lat: 37.303583 },
        { lng: 121.335598, lat: 37.311309 },
        { lng: 121.326592, lat: 37.318622 },
        { lng: 121.324991, lat: 37.31937 },
        { lng: 121.323155, lat: 37.319965 },
        { lng: 121.320382, lat: 37.323726 },
        { lng: 121.321995, lat: 37.324842 },
        { lng: 121.322875, lat: 37.325128 },
        { lng: 121.327894, lat: 37.326171 },
        { lng: 121.329776, lat: 37.326451 },
        { lng: 121.330639, lat: 37.326786 },
        { lng: 121.333173, lat: 37.327091 },
        { lng: 121.333556, lat: 37.327214 },
        { lng: 121.334485, lat: 37.327948 },
        { lng: 121.33613, lat: 37.329013 },
        { lng: 121.337862, lat: 37.331388 },
        { lng: 121.338759, lat: 37.336439 },
        { lng: 121.338611, lat: 37.339309 },
        { lng: 121.337106, lat: 37.341486 },
        { lng: 121.334409, lat: 37.344662 },
        { lng: 121.331006, lat: 37.348094 },
        { lng: 121.330498, lat: 37.34933 },
        { lng: 121.330368, lat: 37.350449 },
        { lng: 121.330545, lat: 37.351945 },
        { lng: 121.331006, lat: 37.35316 },
        { lng: 121.332411, lat: 37.355377 },
        { lng: 121.333544, lat: 37.357429 },
        { lng: 121.333635, lat: 37.358054 },
        { lng: 121.333607, lat: 37.358666 },
        { lng: 121.33368, lat: 37.358796 },
        { lng: 121.334345, lat: 37.358919 },
        { lng: 121.334494, lat: 37.359258 },
        { lng: 121.334621, lat: 37.360134 },
        { lng: 121.335024, lat: 37.360722 },
        { lng: 121.336164, lat: 37.361392 },
        { lng: 121.336534, lat: 37.361898 },
        { lng: 121.33704, lat: 37.363105 },
        { lng: 121.338258, lat: 37.364403 },
        { lng: 121.338302, lat: 37.364712 },
        { lng: 121.338161, lat: 37.365053 },
        { lng: 121.338228, lat: 37.365317 },
        { lng: 121.339496, lat: 37.367796 },
        { lng: 121.340069, lat: 37.368412 },
        { lng: 121.340596, lat: 37.368649 },
        { lng: 121.340891, lat: 37.369472 },
        { lng: 121.341861, lat: 37.370828 },
        { lng: 121.343041, lat: 37.3721 },
        { lng: 121.343853, lat: 37.373225 },
        { lng: 121.344239, lat: 37.374196 },
        { lng: 121.344711, lat: 37.375934 },
        { lng: 121.345847, lat: 37.377158 },
        { lng: 121.346349, lat: 37.377896 },
        { lng: 121.346554, lat: 37.378469 },
        { lng: 121.346689, lat: 37.380134 },
        { lng: 121.346321, lat: 37.383379 },
        { lng: 121.346333, lat: 37.384755 },
        { lng: 121.346618, lat: 37.385461 },
        { lng: 121.346768, lat: 37.385624 },
        { lng: 121.347355, lat: 37.385722 },
        { lng: 121.347542, lat: 37.385824 },
        { lng: 121.347596, lat: 37.386006 },
        { lng: 121.347591, lat: 37.386247 },
        { lng: 121.347047, lat: 37.38773 },
        { lng: 121.347004, lat: 37.38858 },
        { lng: 121.348015, lat: 37.390962 },
        { lng: 121.348589, lat: 37.391392 },
        { lng: 121.348924, lat: 37.392306 },
        { lng: 121.349352, lat: 37.392951 },
        { lng: 121.349637, lat: 37.393694 },
        { lng: 121.349739, lat: 37.395305 },
        { lng: 121.349866, lat: 37.395659 },
        { lng: 121.350557, lat: 37.396512 },
        { lng: 121.350818, lat: 37.397203 },
        { lng: 121.350636, lat: 37.397441 },
        { lng: 121.351241, lat: 37.398244 },
        { lng: 121.35255, lat: 37.399454 },
        { lng: 121.353508, lat: 37.399658 },
        { lng: 121.353595, lat: 37.399813 },
        { lng: 121.355858, lat: 37.401408 },
        { lng: 121.357609, lat: 37.40258 },
        { lng: 121.358694, lat: 37.403137 },
        { lng: 121.36001, lat: 37.4046 },
        { lng: 121.362266, lat: 37.406473 },
        { lng: 121.364867, lat: 37.408109 },
        { lng: 121.365992, lat: 37.409469 },
        { lng: 121.366214, lat: 37.410193 },
        { lng: 121.366858, lat: 37.411275 },
        { lng: 121.367373, lat: 37.411576 },
        { lng: 121.367314, lat: 37.413594 },
        { lng: 121.366333, lat: 37.414761 },
        { lng: 121.366052, lat: 37.415496 }
      ],

      //详情弹窗
      detailShow: false,
      windowDetail: "",

      //搜索
      location: "新疆",
      keyword: "",

      //element 搜索
      restaurants: [],
      state: "",
      timeout: null,

      //天气json
      weatherData: "",
      mapBorder: false
    };
  },
  components: {
    test1,
    Weather,
    Warn,
    test2,
    right1,
    right2,
    right3,
    left3
  },
  methods: {
    showBorder() {
      console.log(1234567);
      this.fillColor = "rgba(176, 226, 255, 0.3)";

      this.strokeColor = "#90FF71";
    },

    closeBorder() {
      console.log(7654321);
      this.fillColor = "rgba(8, 48, 74, 0)";
      this.strokeColor = "#08304A";
    },

    async getWeather() {
      const url = `https://free-api.heweather.net/s6/weather/now?location=yantai&key=eabd4e5cd7574a27b9d653024a9465f7`;
      try {
        let res = await this.$axios.get(url);
        console.log(res.data.HeWeather6[0].now);
        this.weatherData = res.data.HeWeather6[0].now;
      } catch (err) {
        console.log(err);
      }
    },

    infoWindowClose(id) {
      console.log("关闭定点" + id);
      let marker = this.position.filter(item => {
        return item.id == id;
      });
      if ((marker[0].id = id)) {
        marker[0].show = false;
      }
    },

    infoWindowOpen(id) {
      console.log("打开定点" + id);
      let marker = this.position.filter(item => {
        return item.id == id;
      });
      console.log(marker[0]);
      if ((marker[0].id = id)) {
        console.log(marker[0].value);
        marker[0].show = true;
      }
    },

    showDetail(id, value) {
      //api 拿到当前id的数据渲染
      console.log("show detail");
      this.detailShow = true;
      this.windowDetail = value;
    },

    closeDetail() {
      console.log("close detail");
      this.detailShow = false;
    },

    // 散点图
    pointsClickHandler(e) {
      console.log(e);
      this.infoWindowOpen(e.point.id);
    },

    //element 搜索
    loadAll() {
      return [...this.position];
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      console.log(queryString);
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 500 * Math.random());
    },
    createStateFilter(queryString) {
      console.log("queryString" + queryString);
      return state => {
        console.log(state);
        return state.value.indexOf(queryString) !== -1;
      };
    },
    handleSelect(item) {
      console.log(item);
      this.infoWindowOpen(item.id);
    },

    //散点
    getPosition(data) {
      console.log(data);
      this.position = data;
    },

    //报警散点
    getWarnData(data) {
      console.log(data);
      this.position = data;
    }
  }
};
</script>

<style  scoped>
.Map {
  padding-top: 100px;
  position: relative;
  background: url(../img/bg.png) no-repeat center;
  background-size: 100% 100%;
  box-sizing: border-box;
  width: 100%;
}
</style>

<style scoped>
.el-input__inner {
  background: transparent !important;
  border: 1px solid #29549e !important;
  color: #29549e !important;
}
.bm-view {
  width: 98%;
  height: 99%;
  margin: 0 auto;
  z-index: 0;
}
.Border {
  height: 99%;
}

.cityList {
  background-color: blue;
}

.detail {
  background-color: #ffffff;
  border: 1px solid #0e366e;
  position: absolute;
  top: calc(50% - 40vh);
  left: calc(50% - 45vh);
  /* margin: 0 auto; */
  width: 80vh;
  height: 85vh;
}
.detailContent {
  padding: 1rem;
  text-align: center;
  color: black;
  font-size: 2rem;
  /* font-weight: bold; */
  /* padding: 50px; */
  /* border: 1px solid red; */
}

/* logo隐藏 */
.anchorBL {
  display: none;
}
#mainBox{
  width: 100%;
  height: 100vh;
  /* border: 1px solid red; */
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-content:flex-start;
   justify-content: space-around 
}


#rightBox,#leftBox{
  width: 25%;

}
#centerDiv{
  width: 48%;
}


/* centerbox */
.centerbox {
  width: 100%;
  height: 600px;
  position: relative; 
  overflow: hidden;
   /* top: 90px;
  left: 50%;  */
  /* transform: translateX(-50%); */
  margin-bottom: 10px;
}
.anchorBL {
  display: none !important;
}
/* search */
.searchTool {
  z-index: 999999;
  position: absolute;
  top: 1vh;
  right: 1vh;
  width: 30vh;
  background: transparent !important;
}
.searchTool  .el-input__inner{
  background-color: transparent !important;

}

.test1,.right2,.weather,.test2,.right1 ,.right3,.left3{
 margin-bottom: 10px;
  width: 100%;
}

.warn {
  
  width: 100%;
 
}



.detailTd {

  padding: 10px;
}

.windowClose {
  /* position: absolute;
  top: 20px;
  right: 20px; */
}

/* 表格 */
table {
  border-collapse: collapse;
}
table,
th,
td {
  border: 1px solid black;
  text-align: center;
}
.w8 {
  width: 8%;
  
}

.w10 {
  width: 10%;
}

.w20 {
  width: 20%;
}
.w30 {
  width: 30%;
}
.w40 {
  width: 40%;
}

.w80 {
  width: 80%;
}

.w100 {
  width: 100%;
}

.mt {
  margin-top: 2vh;
}

.border {
  border: 1px solid black;
  padding: 2vh 1.5vh;
}

.paddingBgc {
  /* padding: 1.5vh 1vh; */
  background-color: #f5f5f5;
  text-align: center;
}
</style>
