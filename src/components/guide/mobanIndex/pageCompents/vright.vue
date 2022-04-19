<template>
  <div class="rightbox">
    <div class="visual_box">
      <vtitle :txt="txt1" :imgsrc="require('../images/icon4.png')" />
      <rightTop/>
    </div>
    <div class="visual_box visualSfzsfl">
      <vtitle :txt="txt2" :imgsrc="require('../images/icon5.png')" />
      <rightMiddle/>
    </div>
    <div class="visual_box">
      <vtitle :txt="txt3" :imgsrc="require('../images/icon6.png')" />
      <rightBottom/>
    </div>
  </div>
</template>
<script>
import vtitle from './title'
import rightTop from './rightTop'
import rightMiddle from './rightMiddle'
import rightBottom from './rightBottom'
export default {
    data(){
      return{
          txt1:"地区报警数量统计",
          txt2:"按设备类型统计",
          txt3:"公告通知"
      }
    },
    components:{
        vtitle,
        rightTop,
        rightMiddle,
        rightBottom
    }
}
</script>
<style lang="scss" scoped>
.rightbox{
    width: 100%;
    height: 100%;
}
.visual_box {
  height: calc(33.333% - 10px);
  position: relative;
  margin-bottom: 10px;
  z-index: 1;
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
.visual_box .visual_chart{
  height: calc(100% - 40px);
  background: rgba(49,151,255,0.1);
  position: relative;
  z-index: 3;
}
</style>
