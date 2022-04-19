<template>
  <div>
    <!-- <top-nav /> -->
    <div class="head_top">
      <div class="head-set">
        <!-- <img class="img-responsive" src="./images/jcdsj_logo.gif"> -->
        <a @click="gotoWel">
          <img src="./images/set.png" alt="">
        </a>
        <a @click="gotoGuide">
          <img src="./images/all.png" alt="">
        </a>
      </div>
    </div>
  </div>
</template>
<script>
// import topNav from './pageCompents/topNav'

export default {
  data() {
    return {};
  },
  components: {
    // topNav
  },
  methods: {
    gotoWel(){
      this.$router.push({ path: "/" });
    },
    gotoGuide(){
      if(this.$router.history.current.path == "/guidefull"){
        this.$router.push({ path: "/" });
      }else{
        this.$router.push({ path: "/guidefull" });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.head_top {
  background: url(./images/head.png) no-repeat center;
  width: 100%;
  height: 108px;
  .head-set{
    float: right;
    padding: 22px 34px 0 0;
    a {
      display: inline-block;
      margin-left: 30px;
    }
    img {
      overflow: hidden;
      border: 0;
      max-width: 100%;
      vertical-align: top;
    }
  }
}
// .head_top img{width:90%;margin:auto;}
// .head_top p{width:100%;text-align:center;color:#55bfff;position:absolute;bottom: -18px;left: -10px;}
// .head_top p span{font-family:'yjsz';font-size:20px;}
</style>
