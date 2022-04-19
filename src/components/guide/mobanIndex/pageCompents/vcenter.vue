<template>
	<div class="vcenter">
		<div class="topButton">
			<span class="visual_conTop_box" :class="{'current':type === '1'}" @click="changeType('1')">
				地图显示
			</span>
			<span class="visual_conTop_box" :class="{'current':type === '2'}" @click="changeType('2')">
				数字化展示
			</span>
		</div>
		<centerView1 v-show="type === '1'" ref="centerView1" />
		<centerView2 v-show="type === '2'" />
	</div>
</template>
<script>
import centerView1 from './centerView1'
import centerView2 from './centerView2'
  import echarts from 'echarts'

export default {
     components:{
		 centerView1,
         centerView2,
    },
    data(){
        return {
						type: '1',
						active: 1,
        }
		},
		methods: {
			changeType (type) {
				this.type = type
      	this.$store.commit("SET_ACTIVEBG",type==='1'?false:true);
			},
			showAllData() {
				this.$refs.centerView1.showAllData()
				this.active = 1
			},
			showDevice() {
				this.$refs.centerView1.showDevice()
				this.active = 2
			},
			showArea() {
				this.$refs.centerView1.showArea()
				this.active = 3
			}
		}
}
</script>
<style lang="scss" scoped>
.vcenter{
    width: 100%;
    height: 100%;
}
 .topButton{height:86px;width: 100%;}
 .topButton .visual_conTop_box{
	 
	 	float: left;
		background: url(../images/index_02.png) center no-repeat;
		background-size: 100% 100% ;
		width: 170px;
    height: 40px;
    color: #9ebaef;
    font-size: 28px;
    display: block;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    margin-right: 5%;
 }
 .topButton .visual_conTop_box.current {
		background: url(../images/index_01.png) center no-repeat;
		background-size: 100% 100% ;
    color: #FFFFFF;
}
@media screen and (max-width: 1450px) {
	 .index-slpt {
		flex-direction: column;
		width: 70px !important;
		margin: 0 !important;
		border-bottom: none !important;
	 }
	 .index-slpt label {
    line-height: 25px !important;
    font-size: 14px !important;
	}
}
@media screen and (max-width: 950px) {
	 .index-slpt {
		display: none !important;
	 }
}
.index-slpt{
	float: right;
	margin: 20px 0 0;
	border-bottom: 2px solid #144362;
	display: flex;
	justify-content: space-between;
	width: 278px;
	display: flex;
}
.index-slpt label{
	display: block;
	line-height: 47px;
	color: #0981dd;
	font-size: 16px;
	margin-bottom: 0;
}
.index-slpt label.active{
	background: url(../images/index_03.png) 0 39px no-repeat;
	color: #FFFFFF;
}
</style>
