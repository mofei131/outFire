<template data-spy="scroll">
    <div style="background: rgba(49,151,255,0.1);height: calc(100% - 40px);overflow-y:auto">
             <ul class="hottop">
            <li v-for="(item, index) in list" :key="item.id" @click="clickHandler(item)">
                <span>{{index + 1}}</span>
                <p :title="item.title">{{item.title}}</p>
                <a href="#">{{item.releaseTime}}</a>
            </li>
        </ul>
        <div class="notice-frame" v-show="isShow">
            <div class="notice-data">
                <h3 style="text-align: center;">{{title}}</h3>
                <hr>
                <p style="margin: 10px;" v-html='content'></p>
            </div>
            <i class="el-icon-error closeBtn" @click="isShow = false"></i>
        </div>
    </div>
</template>
<script>
import * as Notice from '../../../../api/desk/notice';
export default {
    data(){
        return{
            list: [],
            isShow: false,
            title: '标题',
            content: '<p>aa</p>'
        }
    },
    mounted(){
        Notice.getList(1, 5, null).then(ret =>{
            var list = ret.data.data.records;
            this.list = list;
        });
    },
    methods:{
        clickHandler: function(item){
            this.isShow = true;
            this.title = item.title;
            this.content = item.content;
        },
    }
}
</script>

<style lang="scss" scoped>
ul{
    list-style: none;
    width: 100%;
    margin: 0%;
    padding: 0%;
}
.notice-frame {
  background: url(../images/dia.png) center no-repeat;
  position:fixed;
  z-index: 1000;
  width: 40%;
  left: 30%;
  top: 30%;
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
  .notice-data {
    padding: 3px;
    border-radius: 8px;
    background: #041129;
    color:#fff;
  }
}

.hottop {
    padding: 10px 15px 0;
}
.hottop li{
    height: 43px;
    line-height: 43px;
    border-bottom: 1px solid #113551;
    cursor: pointer;
    margin-top: 8px;
}
.hottop li:nth-last-child(1){
    border-bottom: none;
}
.hottop li span{
    display: block;
    margin-top: 11px;
    float: left;
    color: #a5acc3;
    font-size: 14px;
    font-family: arial;
    background: #253a79;
    width: 20px;
    height: 20px;
    line-height: 20px;
    border-radius: 100%;
    text-align: center;
    cursor: pointer;
}
.hottop li:nth-of-type(1) span{
    background: #ff697a;
    color: #FFFFFF;
}
.hottop li:nth-of-type(2) span{
    background: #f89b02;
    color: #FFFFFF;
}
.hottop li p{
    display: block;
    float: left;
    white-space: nowrap; 
    width: calc(100% - 170px);; 
    overflow: hidden;
    text-overflow:ellipsis;
    color: #FFFFFF;
    font-size: 16px;
    padding-left: 10px;
    margin: 0;
}
.hottop li a{
    color: #82869f;
    display: block;
    width: 150px;

    float: right;
    font-size: 14px;
    font-style: normal;
    text-decoration: none;
}
</style>