<template>
  <div class="Child4">
    <div class="title">{{ChildData.title}}</div>
    {{ChildData}}
    <div class="Child4Content">
      <div
        class="detail"
      >富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染富文本区域渲染</div>

      <div class="ChildBorder">
        <div class="staff">人员配备</div>

        <table class="table border mt">
          <tr class="border">
            <td class="border paddingBgc 10">序号</td>
            <td class="border w20">1</td>
            <td class="border paddingBgc w20">职务</td>
            <td class="border w20">11</td>
            <td rowspan="3" class="w10">
              <div class="avart">
                <img src="../../../../assets/avart.jpg" alt />
              </div>
            </td>
          </tr>
          <tr class="border">
            <td class="border paddingBgc w10">姓名</td>
            <td class="border w20">嘟嘟嘟嘟</td>
            <td class="border paddingBgc w20">性别</td>
            <td class="border w20">的</td>
          </tr>
          <tr class="border">
            <td class="border paddingBgc w10">出生日期</td>
            <td class="border w20">1998年12月12日</td>
            <td class="border paddingBgc w20">联系电话</td>
            <td class="border w20">13345678909</td>
          </tr>
        </table>

        <table class="table border mt">
          <tr class="border">
            <td class="border paddingBgc 10">序号</td>
            <td class="border w20">1</td>
            <td class="border paddingBgc w20">职务</td>
            <td class="border w20">11</td>
            <td rowspan="3" class="w10">
              <div class="avart">
                <img src="../../../../assets/avart.jpg" alt />
              </div>
            </td>
          </tr>
          <tr class="border">
            <td class="border paddingBgc w10">姓名</td>
            <td class="border w20">嘟嘟嘟嘟</td>
            <td class="border paddingBgc w20">性别</td>
            <td class="border w20">的</td>
          </tr>
          <tr class="border">
            <td class="border paddingBgc w10">出生日期</td>
            <td class="border w20">1998年12月12日</td>
            <td class="border paddingBgc w20">联系电话</td>
            <td class="border w20">13345678909</td>
          </tr>
        </table>

        

        <div class="machine">消防器材</div>
        <table class="table border mt">
          <tr class="border">
            <td class="border paddingBgc w10">序号</td>
            <td class="border w20">器材</td>
            <td class="border paddingBgc w20">规格</td>
            <td class="border w20">数量</td>
          </tr>


           <tr class="border">
            <td class="border w10">1</td>
            <td class="border w20">水枪</td>
            <td class="border w20">规格</td>
            <td class="border w20">6</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    };
  },
  props: {
    ChildData: {
      type: Object,
      required: true
    }
  },
  components: {},
  methods: {
    load() {
      this.count += 2;
    }
  }
};
</script>

<style scoped>
.Child4 {
  padding: 0vh 15vh 1vh 15vh;
}
.Child4Content {
  height: 60vh;
  overflow: scroll;
}

.detail {
  border: 2px solid #cccccc;
}

.staff {
  font-size: 3vh;
  color: black;
  text-align: center;
}

.avart {
  /* border: 1px solid red; */
  height: 100%;
  padding: vh 1.5vh;
  text-align: center;
}

.avart img {
  width: 100px;
  height: 100px;
}

.title {
  font-size: 3vh;
  text-align: center;
  color: black;
}

.border {
  border: 1px solid black;
  padding: 2vh 1.5vh;
}

.paddingBgc {
  /* padding: 1.5vh 1vh; */
  background-color: #f5f5f5;
  text-align: center;
}

.table {
  width: 100%;
  overflow: hidden;
}

.ChildBorder {
  border: 2px solid #cccccc;
  padding: 1vh;
  margin-top: 1vh;
  
}

.machine {
  font-size: 3vh;
  text-align: center;
  color: black;
}

.w8 {
  width: 8%;
}

.w10 {
  width: 10%;
}

.w20 {
  width: 20%;
}
.w30 {
  width: 30%;
}
.w40 {
  width: 40%;
}

.w80 {
  width: 80%;
}

.mt {
  margin-top: 2vh;
}
</style>
