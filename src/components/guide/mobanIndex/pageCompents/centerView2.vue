<template>
  <div  class="visual_conTop zbox">

 <div class="index-data">
 				<div class="box">
 					<h3>当前企业总数</h3>
 					<h1>{{comp}}</h1>
 					<p>日环比：+3%</p>
 					<span>周环比：- 2%</span>
 				</div>
 				<div class="box">
 					<h3>当前巡检总数</h3>
 					<h1>{{check}}</h1>
 					<p>日环比：+3%</p>
 					<span>周环比：-2%</span>
 				</div>
 				<div class="box">
 					<h3>当前巡检完成总数</h3>
 					<h1>{{checkoutfire}}</h1>
 					<p>日环比：+3%</p>
 					<span>周环比：- 2%</span>
 				</div>
 				<div class="box">
 					<h3>当前设备总数</h3>
 					<h1>{{device}}</h1>
 					<p>日环比：+3%</p>
 					<span>周环比：- 2%</span>
 				</div>
 				<div class="box big">
 					<h3>当前警情总数（起）</h3>
 					<h1>{{checkn}}</h1>
 					<p>日环比：+3%</p>
 					<span>周环比：- 2%</span>
 				</div>
 			</div>
  </div>
</template>
<script>
import * as Comp from '../../../../api/comp/comp'
import * as Check from '../../../../api/check/check'
import * as Checkoutfire from '../../../../api/check/checkoutfire'
import * as Device from '../../../../api/device/device'
import * as Checkn from '../../../../api/check/checkn'
export default {
	data(){
		var comp = []
		var check = []
		var checkoutfire = []
		var device = []
		var checkn = []
		Comp.getList(1,99).then(ret=>{
		this.comp = ret.data.data.records.length
	})
		Check.getList(1,99).then(ret=>{
		this.check = ret.data.data.records.length
	})
		Checkoutfire.getList(1,99).then(ret=>{
		this.checkoutfire = ret.data.data.records.length
	})
		Device.getList(1,99).then(ret=>{
		this.device = ret.data.data.records.length
	})
		Checkn.getList(1,99).then(ret=>{
		this.checkn = ret.data.data.length
	})
		return {
			comp:[],
			check:[],
			checkoutfire:[],
			device:[],
			checkn:[]
		}
	}
}
</script>
<style lang="scss" scoped>
*{
    padding: 0;
    margin: 0;
}
 
 .visual_conTop{height:130px;margin-bottom:10px;width: 100%;margin: 50px;}
 .visual_conTop .visual_conTop_box{height:100%;padding:0 3px;}
 .visual_conTop .visual_conTop1{width:20%;height:100%;float:left;}
.visual_conTop .visual_conTop1>div{background:url(../images/ksh40.png) no-repeat;background-size:100% 100%;  border: 1px solid transparent;}
.visual_conTop .visual_conTop2{width:30%;height:100%;float:left;margin-top: 20px;}
 .visual_conTop .visual_conTop2>div{background:url(../images/ksh39.png) no-repeat;background-size:100% 100%; border: 1px solid transparent;}

 .visual_conTop .visual_conTop_box>div{height:100%;}
 .visual_conTop .visual_conTop_box>div h3{color:#fff;font-size:16px;padding:16px 0 0 20px;}
 .visual_conTop .visual_conTop_box>div p{width:33%;float:left;line-height:85px;color:#20dbfd;text-shadow:0 0 25px #00d8ff;font-size:46px;font-family: 'yjsz';text-align:right;}
 .visual_conTop .visual_conTop_box>div .conTop_smil{width:67%;height:60px;float:left;padding-top:23px;}
 .visual_conTop .visual_conTop_box>div .conTop_smil a{display:block;line-height:20px;text-align: left;color:#fff;padding-left:9px;}
 .visual_conTop .visual_conTop_box>div .conTop_smil span{width:32px;display:inline-block;margin-left:3px;}
 .visual_conTop .visual_conTop_box>div .conTop_smil a.sz{color:#fe3e12;}
 .visual_conTop .visual_conTop_box>div .conTop_smil a.xd{color:#12fe81;}
 .visual_conTop .visual_conTop_box>div .conTop_smil a.null{visibility:hidden;}

.zbox{background: url(../images/zb.png) top no-repeat;height: 100%;margin: 0;}
 .index-data{background: url(../images/index_05.png) center no-repeat;width: 597px;height: 458px;
 position: relative;margin: 100px auto 0;top:-80px;}
 .index-data .box{width: 208px;height: 168px;position: absolute;top: 0;left: 0;text-align: center;text-align: center;}
 .index-data .box h3{font-size: 16px;color: #95eefe;padding-top: 30px;}
 .index-data .box h1{font-size: 40px;color: #FFFFFF;font-weight: bold;}
 .index-data .box p{font-size: 14px;color: #ff697a;}
 .index-data .box span{font-size: 14px;color: #70c8a9;}
 .index-data .box:nth-child(2){left: 384px;}
 .index-data .box:nth-child(3){top: 290px;}
 .index-data .box:nth-child(4){top: 290px; left: 384px;}
 .index-data .box.big{width: 368px;height: 295px;top:80px;left: 112px;}
 .index-data .box.big h3{font-size: 24px;padding-top: 70px;}
 .index-data .box.big h1{font-size: 60px;}
 .index-data .box.big p,.index-data .box.big span{font-size: 16px;}
</style>