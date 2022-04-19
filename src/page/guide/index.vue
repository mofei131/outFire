<template>
  <div class="home" :class="{'active':active}">
    <!-- <NavPage/>
    <MapPage/> -->
    <Top/>
    <Context/>
  </div>
</template>

<script>

import NavPage from '@/components/guide/Nav'
import MapPage from '@/components/guide/Map'
import Top from '@/components/guide/mobanIndex/Top'
import Context from '@/components/guide/mobanIndex/context'


export default {
  data(){
    return{

    }
  },
  name: 'home',
  components: {
    NavPage,
    MapPage,
    Top,
    Context
  },
  computed: {
    active () {
      return this.$store.getters.activeBg
    }
  }
}
</script>
<style lang="scss" scoped>
//  .home{
//     background: url(../../components/img/bg.png) no-repeat center;
//     background-size: 100% 100%;
//      height: 100vh;
//   }
a,p,h1,h2,h3,h4,h5,h6,body,span,label,div{padding:0;margin:0;font-family:'微软雅黑';}
div{font-family:'微软雅黑';}
ul{padding:0;margin:0;}
a{text-decoration:none !important;}
.clear{clear:both;}
html, body, form{overflow-y:auto;height:100%;}
/* 滚动条样式 */
::-webkit-scrollbar {width:1px;height:4px;}
::-webkit-scrollbar-track {-webkit-box-shadow:inset 0 0 6px rgba(255,255,255,0.9);border-radius: 10px;}
::-webkit-scrollbar-thumb {border-radius:5px; background: rgba(66,66,66,1);
-webkit-box-shadow:inset 0 0 6px rgba(227,227,227,87.5);}
::-webkit-scrollbar-thumb:window-inactive {background: rgba(227,227,227,0.5);}




.home{
  height:100%;background:url(../../components/guide/mobanIndex/images/bg.jpg) no-repeat ;
  background-size:100% 100%;
  overflow:hidden;
  position:relative;
}
.home.active{
  height:100%;background:url(../../components/guide/mobanIndex/images/bg2.jpg) no-repeat ;
  background-size:100% 100%;
}

</style>
