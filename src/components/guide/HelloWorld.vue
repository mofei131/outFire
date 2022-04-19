<template>
  <div class="details">
      <el-table :data="tableData" class="weather">
      <el-table-column prop="city" label="城市"></el-table-column>
      <el-table-column prop="SD" label="下雨概率"></el-table-column>
      <el-table-column prop="WD" label="风向"></el-table-column>
      <el-table-column prop="WS" label="风力"></el-table-column>
      <el-table-column prop="AP" label="大气压"></el-table-column>
      <el-table-column prop="time" label="时间"></el-table-column>
    </el-table>
    </div>
</template>

<script>
import * as YanTai from '../../api/weater'
export default {
  data(){
    var data = [];
    YanTai.yanTai(1,1).them(ret =>{
            var list = ret.data.data.records;
            data.push({
                city:list.city,
                SD:list.SD,
                WD:list.WD,
                WS:list.WS,
                AP:list.AP,
                time:list.time,
              })
              this.tableData = data;
              console.log(data);
    });
    return {
      tableData:[]
    }
  }
}
</script>

<style scoped>
.weather{
  height: 200px;
  width: 600px;
}
</style>
