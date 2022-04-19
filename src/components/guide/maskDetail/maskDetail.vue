<template>
  <div class="maskGroup">
    <!-- <el-button type="text" @click="outerVisible = true">点击打开外层 Dialog</el-button> -->
    <el-dialog :visible.sync="outDialog" append-to-body width="60%" top="5vh"  :lock-scroll="true">
      <!-- 内层内容 -->
      <el-dialog width="60%" :visible.sync="innerVisible" append-to-body top="5vh" :lock-scroll="true">
      
       <MaskFather :dialog2Data="dialog2Data"/>
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">返 回</el-button>
        </div>
      </el-dialog>
      <!-- 内层内容 -->
      <!-- 外层内容 -->
      <div class="outerDialog">
        <div>{{maskData.name}}</div>
        <div class="outerDialogTitle">公司详情</div>
        <div class="outerDialogContent">
          <div
            class="goDetailBorder"
            @click="showCompanyDetail(item.id)"
            v-for="item in maskData.companyData"
            :key="item.id"
          >
            <div class="goDetail" @click="innerVisible = true">{{item.text}}</div>
          </div>
        </div>
      </div>

      <!-- 外层内容 -->

      <div slot="footer" class="dialog-footer">
        <el-button @click="outDialog = false">取 消</el-button>
        <!-- <el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MaskFather from '../maskFather/maskFather'

export default {
  data() {
    return {
      innerVisible: false,
      // outerVisible: false,
      dialogHide: false,
      falgId: "",

      dialogDetail:"",
      dialog2Data:'',
    };
  },

  props: {
    value: {
      type: Boolean,
      required: true
    },

    companyDataSingle: {
      tyep: Array,
      required: true
    }
  },
  components: {
    MaskFather
  },
  computed: {
    outDialog: {
      get() {
        //回调函数 当需要读取当前属性值是执行，根据相关数据计算并返回当前属性的值
        return this.value;
      },
      set(val) {
        //监视当前属性值的变化，当属性值发生变化时执行，更新相关的属性数据

        console.log(val);
        this.$emit("input", false);
        this.falgId = "";
      }
    },

    maskData(){
      return this.companyDataSingle[0]
    }
  },
  methods: {
    showCompanyDetail(id) {
       console.log(this.maskData);
      this.falgId == id;
     this.dialogDetail =  this.maskData.companyData.filter(item=>{
        return item.id == id
      })
      console.log(this.dialogDetail[0]);
     this.dialog2Data = this.dialogDetail[0]
    }
  },

  mounted() {
    console.log(this.companyDataSingle)
  },
  
};
</script>

<style scoped>
.outerDialog {
}

.outerDialogTitle {
}

.outerDialogContent {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}

.goDetailBorder {
  width: 20%;
  padding: 1vh 2vh;
  cursor: pointer;
}

.goDetail {
  padding: 2vh 2vh;
  color: #ffffff;
  text-align: center;
  background-color: #66b1ff;
  border-radius: 5px;
}
</style>
