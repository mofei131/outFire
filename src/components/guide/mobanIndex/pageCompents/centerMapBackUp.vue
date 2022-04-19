<template>
    <div class="map" id="s-map">
        <div id="chartMap" class="chartGauge" :style="{height:height,width:width}"></div>
    </div>
</template>

<script type="text/ecmascript-6">　　 // 在之前已经单独引入了echarts文件　　 // 在此只需引入需要的地区的json文件
    import xj from 'echarts/map/json/province/xinjiang'

    export default {
        components: {

        },
        data () {
            return {
                font: '10'
            }
        },
        props: {
            width: {
                type: String,
                default: '200px'
            },
            height: {
                type: String,
                default: '400px'
            }
        },
        watch: {},
        methods: {
            drawmap() {
                let chartMap = document.getElementById('chartMap');
                let smap = document.getElementById('s-map');　　　　　　　　　 // 动态修改图表的宽高，达到自适应的效果　
                var resizeWorldMapContainer = function () {
                    chartMap.style.width  = smap.clientWidth +'px';
                    chartMap.style.height = smap.clientHeight + 'px';
                };
                resizeWorldMapContainer();
                // 注册可用的地图
               this.$echarts.registerMap('xinjiang', xj);
                let myChart =this.$echarts.init(chartMap);
                myChart.setOption({
                    roam: false,
                     tooltip : {
                    trigger: 'item',
                    formatter: '{b}'
                   },
                    series: [
                        {
                            name: '',
                            type: 'map',
                            map: 'xinjiang',
                            mapType: '新疆',
                            roam: false,
                            zoom: 1.2,
                            selectedMode : 'single',
                            itemStyle:{
                                normal:{
                                    borderWidth: .5, //区域边框宽度
                                    borderColor: '#215cf7', //区域边框颜色
                                    areaColor: 'transparent',
                                    label:{
                                        show:false,
                                        textStyle: {
                                            color: '#fff',
                                            fontSize: this.font
                                        }
                                    },
                                },
                                emphasis:{
                                    areaColor: 'red',
                                    label:{
                                        show:true,
                                        textStyle: {
                                            borderWidth: .5,
                                            color: '#398def',
                                            fontSize: this.font
                                        }
                                    }

                                }
                            },
             data:[
                {name:'哈密市',
                    itemStyle: {
                        normal: {
                            areaColor: '#2059f7',
                            borderColor: '#edce00'
                        }
                    }
                },
                {name:'乌鲁木齐市',
                    itemStyle: {
                        normal: {
                            areaColor: '#0075C4',
                            borderColor: '#0abcee'
                        }
                    }
                },
                {name:'克拉玛依市',
                    itemStyle: {
                        normal: {
                            areaColor: '#EFA00B',
                            borderColor: '#1ca9f2'
                        }
                    }
                },
                {name:'喀什地区',
                    itemStyle: {
                        normal: {
                            areaColor: '#D65108',
                            borderColor: '#88ddf5',
                        }
                    }
                },
                {name:'和田地区',
                    itemStyle: {
                        normal: {
                            areaColor: '#BF211E',
                            borderColor: '#1ca9f2'
                        }
                    }
                },
                {name:'阿克苏地区',
                    itemStyle: {
                        normal: {
                            areaColor: '#2D20DE',
                            borderColor: '#45b5ef'
                        }
                    }
                },
                {name:'伊犁哈萨克自治州',
                    itemStyle: {
                        normal: {
                            areaColor: '#02427B',
                            borderColor: '#45b5ef',
                        }
                    }
                },
                {name:'塔城地区',
                    itemStyle: {
                        normal: {
                            areaColor: '#CDDB0A',
                            borderColor: '#edce00'
                        }
                    }
                },
                {name:'阿勒泰地区',
                    itemStyle: {
                        normal: {
                            areaColor: '#2364AA',
                            borderColor: '#45b5ef',
                        }
                    }
                },

                {name:'昌吉自治州',
                    itemStyle: {
                        normal: {
                            areaColor: '#FFA400',
                            borderColor: '#edce00'
                        }
                    }
                },
                {name:'吐鲁番市',
                    itemStyle: {
                        normal: {
                            areaColor: '#E49061',
                            borderColor: '#45b5ef',
                        }
                    }
                },
                {name:'博尔塔拉蒙古自治州',
                    itemStyle: {
                        normal: {
                            areaColor: '#13d5ff',
                            borderColor: '#45b5ef'
                        }
                    }
                },
                {name:'巴音郭楞蒙古自治州',
                    itemStyle: {
                        normal: {
                            areaColor: '#65DB0A',
                            borderColor: '#45b5ef',
                        }
                    }
                },
                {name:'昌吉回族自治州',
                    itemStyle: {
                        normal: {
                            areaColor: '#180ADB',
                            borderColor: '#45b5ef',
                        }
                    }
                },
                {name:'克孜勒苏柯尔克孜自治州',
                    itemStyle: {
                        normal: {
                            areaColor: '#0ABFDB',
                            borderColor: '#45b5ef',
                        }
                    }
                },
                ,
            ]
                        }
                    ]
                });
                /*
                // window的方法在一个页面只加载一次，window.onresize只在一个图表中发生一次，因此在一个页面多图时，只有一个图会自适应
                window.onresize = function () {
                    resizeWorldMapContainer();
                    myChart.resize();
                };
                */
                window.addEventListener("resize", function(){
                    resizeWorldMapContainer();
                    myChart.resize();
                })

            }

        },
        filters: {},
        computed: {},
        created () {

        },
        mounted () {
            this.drawmap()
        },
        destroyed () {}
    }
</script>

<style lang="scss" scoped>
    @function px2rem($px) {
        $rem: 75px;
        @return ($px / $rem) + rem;
    }
    #s-map{
        width: 100%;
        height: 80%;
        display: flex;
        align-items: center;
        justify-content: center;
        // color: transparent
    }
</style>
