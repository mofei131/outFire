<template>
  <div class="Weather">
    <dv-border-box-10>
      <div class="weatherBorder">
        <div class="weatherGroup">
          <div class="weatherStatus">{{weatherData.cond_txt}}</div>
          <div class="wind">
            <div class="windText">{{weatherData.wind_dir}}</div>
            <div class="windNumber">{{weatherData.wind_sc}}</div>
            <div class="windFooter">级</div>
          </div>
          <div class="tmp">
            <div class="tmpText">温度</div>
            <div class="tmpNumberGroup">
              <div class="tmpNumber">{{weatherData.tmp}}</div>
              <div class="tmpFooter">℃</div>
            </div>
          </div>
          <div class="hum">
            <div class="humText">湿度</div>
            <div class="humNumberGroup">
              <div class="humNumber">{{weatherData.hum}}</div>
              <div class="humFooter">％</div>
            </div>
          </div>
        </div>
      </div>
    </dv-border-box-10>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["weatherData"],
  components: {}
};
</script>

<style scoped>
.weatherBorder {
  padding: 0.2vh;
}
.weatherGroup {
  /* opacity: .8; */
  background-color: rgba(17, 57, 125, 0.3);
  /* height: 80px; */
  /* font-size: 30px; */
  color: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1vh 1.5vh;
  justify-content: space-around;
}

.weatherStatus {
  width: 4.5vh;
  height: 4.5vh;
  padding: 1.6vh;
  line-height: 4.5vh;
  text-align: center;
  font-size: 0.9rem;
  font-weight: bold;
  border: 2px solid #ffffff;
  border-radius: 50%;
  margin-right: 1vh;
}

.wind {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.windText {
  font-size: 1.5rem;
}

.windNumber {
  margin: 0 0.5vh;
  font-family: DS-DIGI;
  font-size: 3rem;
  color: #d8de5f;
}

.windFooter {
  font-size: 1.3rem;
}

.tmp {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 0.5vh;
  border-left: 1.5px solid #ffffff;
}

.tmpNumberGroup {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.tmpText {
  font-size: 1.5rem;
}

.tmpNumber {
  margin: 0 5px;
  font-family: DS-DIGI;
  font-size: 3rem;
  color: #d8de5f;
}

.tmpFooter {
  font-size: 1.5rem;
}

.hum {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 0.5vh;
  border-left: 1.5px solid #ffffff;
}

.humNumberGroup {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.humText {
  font-size: 1.5rem;
}

.humNumber {
  margin: 0 0.5vh;
  font-family: DS-DIGI;
  font-size: 3rem;
  color: #d8de5f;
}

.humFooter {
  font-size: 1.3rem;
}
</style>
