<template>
  <div class="Child2">
    <div class="title">{{ChildData.title}}</div>
    {{ChildData}}
    <div class="ChildBorder">
      <table class="table border">
        <tr class="border">
          <td class="border paddingBgc">文件名称</td>
          <td class="border">消防行政审批</td>
        </tr>
        <tr class="border">
          <td class="border paddingBgc">附件</td>
          <td class="border">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </td>
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
  props: {
    ChildData: {
      type: Object,
      required: true
    }
  },
  components: {},
  methods: {
    handleRemove(file) {
      console.log(file);
    },
    handlePreview(file) {
      console.log(file);
      console.log('点击了文件');
      // window.open("https://mp.csdn.net/postedit/static/xxx.xlsx")

    },
   
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
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
.Child2 {
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
 
  overflow: scroll;
}
</style>
