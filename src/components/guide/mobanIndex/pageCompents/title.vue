<template>
   <div class="visual_title">
     
	<img :src="imgsrc">
	<span>{{txt}}</span>
	</div>	
    
</template>
<script>
export default {
    data(){
        return{
            
        }
    },
    props:["txt",'imgsrc'],
}
</script>
<style lang="scss" scoped>
.visual_box .visual_title {
    background: rgba(25,129,210,0.05);
    line-height: 40px;
    height: 40px;
    position: relative;
    z-index: 3;
    padding-left: 15px;
    display: flex;
    align-items: center;
}
.visual_box .visual_title span{
    color: #7fcdff;
    font-size: 18px;
    display: inline-block;
    padding-left: 8px;
}
.visual_box .visual_title img{
    overflow: hidden;
    border: 0;
    width: 40px;
    height: auto;
    max-width: 100%;
    vertical-align: top;
}
</style>