<template>
  <div class="Child1">
    <div class="title">{{ChildData.title}}</div>
    {{ChildData}}
    <div class="ChildBorder">
      <table class="table border">
        <tr class="border">
          <td class="border paddingBgc">单位性质</td>
          <td class="border">2</td>
          <td class="border paddingBgc">组织机构代码</td>
          <td class="border">4</td>
        </tr>
        <tr>
          <td class="border paddingBgc">单位名称</td>
          <td class="border">5</td>
        </tr>
        <tr>
          <td class="border paddingBgc">单位类别</td>
          <td class="border">8</td>
        </tr>
        <tr>
          <td class="border paddingBgc">行政区划</td>
          <td class="border">5</td>
        </tr>
        <tr>
          <td class="border paddingBgc">详细地址</td>
          <td class="border">8</td>
        </tr>
        <tr class="border">
          <td class="border paddingBgc">建筑面积</td>
          <td class="border">2</td>
          <td class="border paddingBgc">员工人数</td>
          <td class="border">4</td>
        </tr>
        <tr class="border">
          <td class="border paddingBgc">消防安全责任人</td>
          <td class="border">2</td>
          <td class="border paddingBgc">责任人联系电话</td>
          <td class="border">4</td>
        </tr>
        <tr class="border">
          <td class="border paddingBgc">消防安全管理人</td>
          <td class="border">2</td>
          <td class="border paddingBgc">管理人联系电话</td>
          <td class="border">4</td>
        </tr>
        <tr class="border">
          <td class="border paddingBgc">所属行业</td>
          <td class="border">2</td>
          <td class="border paddingBgc">行业主管部门</td>
          <td class="border">4</td>
        </tr>

        <tr>
          <td class="border paddingBgc">消防主管部门</td>
          <td class="border">8</td>
        </tr>
        <tr class="border">
          <td class="border paddingBgc">单位分级</td>
          <td class="border">2</td>
          <td class="border paddingBgc">维保单位</td>
          <td class="border">4</td>
        </tr>
        <tr>
          <td class="border paddingBgc">消防监督员</td>
          <td class="border">8</td>
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
.Child1 {
  padding: 0vh 15vh 1vh 15vh;
  height:60vh;
}
.border {
  border: 1px solid black;
}

.paddingBgc {
  padding: 1.5vh 1vh;
  background-color: #f5f5f5;
  text-align: center;
  width: 20%;
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
</style>
