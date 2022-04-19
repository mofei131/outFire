<template>
  <div id="mapChart" class="map"></div>
</template>

<script>
import echarts from 'echarts'
import {cityMap} from '../china-main-city-map.js'
export default {
  name: 'chart-map',
  data () {
    return {
      geoCoordMap: [{
        100000: {
          name: '中国',
          arr: {
            "陕西": [109.1162, 34.2004],
            "甘肃": [103.5901, 36.3043],
            "宁夏": [106.3586, 38.1775],
            "青海": [101.4038, 36.8207],
          }
        },
        610000: {
          name: '陕西',
          arr: {
            "西安市": [108.948024, 34.263161],
            "宝鸡市": [107.14487, 34.369315],
          }
        },
        610100: {
          name: '西安市',
          arr: {
            "雁塔区": [108.926593, 34.213389],
            "莲湖区": [108.933194, 34.2656],
          }
        },
      }],
      data: [
        {
          id:100000,
          name: "中国",
          arrv:[
            {
                name: "陕西",
                value: 80
              },
              {
                name: "甘肃",
                value: 56
              },
              {
                name: "青海",
                value: 10
              },
              {
                name: "宁夏",
                value: 18
              }
          ] 
        },
        {
          id:610000,
          name: "陕西",
          arrv:[
            {
                name: "西安市",
                value: 80
              },
              {
                name: "宝鸡市",
                value: 56
              }
          ]
        },
        {
          id:610100,
          name: "西安市",
          arrv:[
            {
                name: "雁塔区",
                value: 80
              },
              {
                name: "莲湖区",
                value: 56
              }
          ]
        }
      ],
      //中国地图（第一级地图）的ID、Name、Json数据
      chinaId: 100000,
      chinaName: 'china',
      chinaJson: null,
      //记录父级ID、Name
      mapStack:  [],
      parentId: null,
      parentName:  null,
      //Echarts地图全局变量，主要是在返回上级地图的方法中会用到
      myChart: null,
    }
  },
  mounted () {
    this.mapChart('mapChart')
  },
  methods: {
    mapChart(divid) {
      let mapJson = require('../asset/json/map/' + this.chinaId + '.json')
      this.chinaJson = mapJson;
      this.myChart = echarts.init(document.getElementById(divid));
      this.registerAndsetOption(this.myChart, this.chinaId, this.chinaName, mapJson, false)
      this.parentId = this.chinaId;
      this.parentName = 'china'
      this.myChart.on('click', (param) => {
        var cityId = cityMap[param.name]
        if (cityId) { //代表有下级地图
          let mapJson = require('../asset/json/map/' + cityId + '.json')
          this.registerAndsetOption(this.myChart, cityId, param.name, mapJson, true)
        } else {
          //没有下级地图，回到一级中国地图，并将mapStack清空
          this.registerAndsetOption(this.myChart, this.chinaId, this.chinaName, this.chinaJson, false)
          this.mapStack = []
          this.parentId = this.chinaId;
          this.parentName = this.chinaName;
        }
      });
      window.addEventListener("resize", () => {
        this.myChart.resize();
      });
    },
    registerAndsetOption(myChart, id, name, mapJson, flag) {
      echarts.registerMap(name, mapJson);
      this.myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            if (typeof(params.value)[2] == "undefined") {
              return params.name + ' : ' + params.value;
            } else {
              return params.name + ' : ' + params.value[2];
            }
          }
        },
        geo: {
          map: name,
          show: true,
          roam: true,
          zoom: 1.2,
          label: {
            normal: {
              show: true,
              textStyle: {
                color: '#046e8a' //默认时显示的名称颜色
              }
            },
            emphasis: {
              show: false,
              textStyle: {
                color: '#fff' //鼠标经过时显示的颜色
              }
            }
          },
          itemStyle: {
            normal: {
              areaColor: 'transparent',
              borderColor: '#02a9ab', //线
              shadowColor: '#02a9ab', //外发光
              shadowBlur: 20
            },
            emphasis: {
              areaColor: '#02a9ab', //悬浮区背景
            }
          }
        },
        series: [
          {
            name: name,
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'pin',
            symbolSize: [50, 50],
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#fff',
                  fontSize: 12,
                },
                formatter(value) {
                  return value.data.value[2]
                }
              }
            },
            itemStyle: {
              normal: {
                color: '#ff697a', //标志颜色
              }
            },
            //data: convertData(data),
            data: this.convertData(id),
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            zlevel: 1
          },
        ]
      },true);

      if (flag) { //往mapStack里添加parentId，parentName,返回上一级使用
        this.mapStack.push({
          mapId: this.parentId,
          mapName: this.parentName
        });
        this.parentId = id;
        this.parentName = name;
      }
    },
    back() {
      if (this.mapStack.length != 0) { //如果有上级目录则执行
        var map = mapStack.pop();
        $.get('../asset/json/map/' + map.mapId + '.json', function(mapJson) {

          this.registerAndsetOption(myChart, map.mapId, map.mapName, mapJson, false)

          //返回上一级后，父级的ID、Name随之改变
          this.parentId = map.mapId;
          this.parentName = map.mapName;

        })

      }

    },
    initMapData(mapJson) {
      var mapData = [];
      for (var i = 0; i < mapJson.features.length; i++) {
        mapData.push({
          name: mapJson.features[i].properties.name,
          //id:mapJson.features[i].id
        })
      }
      return mapData;
    },
    convertData(id) {
      var res = [];
      for (var i = 0; i < this.data.length; i++) {
        for (var j = 0; j < this.data[i].arrv.length; j++) {
          if(this.data[i].id==id){
            console.log(this.data[i].arrv[j].name);
            console.log(this.data[i].arrv[j].value);
            var geoCoord = this.geoCoordMap[0][id].arr[this.data[i].arrv[j].name];
            if (geoCoord) {
              res.push({
                name: this.data[i].arrv[j].name,
                value: geoCoord.concat(this.data[i].arrv[j].value)
              });
            }
          }
          
        }
      }
      return res;
    }
  }
}
</script>