<template>
  <div class="Child3">
    <div class="title">{{ChildData.title}}</div>
    {{ChildData}}
    <div class="ChildBorder">
      <table class="table border">
        <tr class="border">
          <td class="border paddingBgc w8">序号</td>
          <td class="border paddingBgc w10">类型</td>
          <td class="border paddingBgc w20">编码</td>
          <td class="border paddingBgc w40">位置</td>
          <td class="border paddingBgc w10">责任人</td>
          <td class="border paddingBgc">责任部门</td>
        </tr>
        <tr>
          <td class="border w8">1111</td>
          <td class="border w10">灭火器</td>
          <td class="border w20">023-01-PLXT-0001</td>
          <td class="border w40">地下一层消防喷淋系统(消防喷淋系统1)</td>
          <td class="border w10">责任人1</td>
          <td class="border">XXXXXXXXXXXXXX公司</td>
        </tr>

       
      </table>
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
  props:{
    ChildData:{
      type:Object,
      required:true,
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
.title {
  font-size: 3vh;
  text-align: center;
  color: black;
}
.Child3 {
  padding: 0vh 15vh 1vh 15vh;
  height:60vh;
}
.border {
  border: 1px solid black;
  padding: 0.3vh 1.5vh;
}

.paddingBgc {
  /* padding: 1.5vh 1vh; */
  background-color: #f5f5f5;
  text-align: center;
}

.table {
  width: 100%;  
  overflow: hidden;
  /* border: 2px solid red; */
}

.ChildBorder {
  border: 2px solid #cccccc;
  padding: 1vh;
  margin-top: 1vh;
 
  overflow:scroll
}

.w8{
  width:8%;
}

.w10{
  width:10%;
}

.w20{
  width:20%;
}
.w30{
  width:30%;
}
.w40{
  width:40%;
}

</style>
