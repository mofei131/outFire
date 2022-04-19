<template>
  <div class="visual">
    <div class="visual_left">
      <vleft/>
    </div>
    <div class="visual_con">
      <vcenter/>
    </div>
    <div class="visual_right">
      <vright/>
      <!-- <centerMap/> -->
    </div>
    <div class="clear"></div>

    <!-- VueFab 悬浮菜单 -->
    <!-- <vue-fab /> -->

  </div>
</template>

<script>
import vleft from './pageCompents/vleft'
import vright from './pageCompents/vright'
import vcenter from './pageCompents/vcenter'
// import centerMap from './pageCompents/centerMap';
// import vueFab from './pageCompents/vueFab'

export default {
  data () {
    return {

    }
  },
  components:{
    vleft,
    vright,
    vcenter,
    // vueFab
  }
}
</script>
<style lang="scss" scoped>
@font-face{
	font-family: yjsz;
	src:url('./fonts/yjsz.TTF'),
		// url('../fonts/yjsz.eot'); /* IE9+,可以是具体的实际链接 */
	}

 .visual{height:calc(100vh - 108px)}

.visual_box{height:33.3%;}
.visual_box .visual_title{position:relative;height:35px;margin:5px 0;}
.visual_box .visual_title span{color:#fff;font-size:18px;line-height:35px;}
.visual_box .visual_title img{width:100%;position:absolute;left:0;bottom:0;}
.visual_box .visual_chart{height:calc(100% - 35px);}

.visual_left{padding-left:0.5%;width:25%;height:100%;float:left;}
.visual_right{padding-right:0.5%;width:25%;height:100%;float:right;}
.visual_con{width:50%;height:100%;float:left;padding:0 0.8%;}
// .visualSssf_left{width:40%;float:left;color:#fff;padding:10px 20px 0 20px;}
// .visualSfzsfl{position:relative;}
// .visualSssf_right{width:60%;height:100%;float:left;}

</style>
