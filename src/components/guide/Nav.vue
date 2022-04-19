<template>
  <div class="Nav">
    <el-row class="row-bg HomeNav">
      <el-col :span="4"></el-col>
      <el-col :span="14">
        <!-- <dv-border-box-8> -->
        <div class="HomeNavTitle">灭火器大数据综合管理平台</div>
        <!-- </dv-border-box-8> -->
      </el-col>
      <el-col :span="2">
        <div class="HomeNavTime">{{time}}</div>
      </el-col>

      <el-col :span="2">
        <div class="HomeNavLogin" @click="gotoLogin">
          <span>
            <dv-decoration-7 style="width:100%;height:100%;">&nbsp;&nbsp;后台管理&nbsp;&nbsp;</dv-decoration-7>
          </span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: ""
    };
  },

  mounted() {
    // this.time =  this.moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    setInterval(() => {
      this.time = this.moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    }, 1000);
  },

  components: {},
  computed: {
    newDate() {
      return 1;
    }
  },
  methods: {
    gotoLogin() {
      this.$router.push({ path: "wel/index" });
    }
  }
};
</script>

<style scoped lang="scss">
.Nav {
  position: fixed;
  /* width: 100%; */
  z-index: 9999999;
  width: 100%;
  right: 0;
  // background: #293c55;
}

.HomeNav {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: url(../img/top.png) no-repeat center;
  background-size: 100% 100%;
  height: 7vh;
  opacity: 1;
  //  background-color:rgba(0, 0, 0, 0.5) ;
  box-shadow: 0px 0px 10px 3px #38598b;
}

.HomeNavTitle {
  /* background-color: #0D1D8E; */
  text-align: center;
  height: 7vh;
  line-height: 7vh;
  color: #ffffff;
  // font-weight: bold;
  font-family: "微软雅黑";
  font-size: 1.4rem;
  text-align: center;
}

.HomeNavTime {
  /* text-align: center; */
  line-height: 7vh;

  font-weight: bold;
  font-family: DS-DIGI;
  color: #1dc1f5;
  font-size: 1.1rem;
  /* background-color: red; */
  position: absolute;
  left: 20px;
}

.HomeNavLogin {
  text-align: center;
  height: 7vh;
  line-height: 7vh;
  color: #ffffff;
  // font-weight: bold;
}

.HomeNavLogin span {
  // padding: 0.5vh 1.5vh;
  // border-radius: 4px;
  cursor: pointer;
  // border:1px solid #ffffff;
  // background-color: #1f3c88;
  font-size: 1rem;
  display: block;
}
</style>
