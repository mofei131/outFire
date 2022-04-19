<template>
  <div class="visual_table">
     <el-table :max-height="tHeight" ref="table" :data="tableData" class="table table-kingdargen" :row-style="tableRowStyle"
    :header-cell-style="tableHeaderColor">
      <el-table-column :width="cloWidth" prop="id" label="编号" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column :width="cloWidth" prop="name" label="名称" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column :width="cloWidth" prop="userIds" label="巡检人" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column :width="cloWidth" prop="planStart" label="时间" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column :width="cloWidth" prop="path" label="路线" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="详情" width="60px">
      <template slot-scope="scope">
        <el-button @click="deleteRow(scope.row)" type="text" size="small">
          查看
        </el-button>
      </template>
    </el-table-column>
    </el-table>
    <div class="details" v-show="isShow">
      <el-table :data="detailsData" class="table table-kingdargen" height="380px"
      :row-style="getRowClass" :header-row-style="getRowClass" :header-cell-style="getRowClass2">
      <el-table-column prop="checkUser" label="巡检人"></el-table-column>
      <el-table-column prop="content" label="巡检结果"></el-table-column>
      <el-table-column prop="gps" label="巡检位置"></el-table-column>
      <el-table-column prop="isCover" label="铅封是否完好"></el-table-column>
      <el-table-column prop="position" label="巡检路线"></el-table-column>
      <el-table-column prop="status" label="巡检状态"></el-table-column>
    </el-table>
    <i class="el-icon-error closeBtn" @click="isShow = false"></i>
    </div>
  </div>
</template>

<script >
import * as checkPlan from '../../../../api/check/checkplan';
import * as checkoutfire from '../../../../api/check/checkoutfire';
var userids = [];
export default {
  data(){
          return {
            isShow : false,
            tableData:[],
            tHeight: '100%',
            cloWidth: 60,
            detailsData:[]
          }
  },
  mounted () {
    this.getList()
    this.tHeight = this.$refs.table.$el.offsetHeight
    let tWidth = this.$refs.table.$el.offsetWidth
    this.cloWidth = (tWidth - 60) / 5
    window.addEventListener('resize', () => {
      this.$nextTick(() => {
        console.log(this.$refs.table)
        this.tHeight = this.$refs.table.$el.parentNode.offsetHeight 
        let tWidth = this.$refs.table.$el.parentNode.offsetWidth
        this.cloWidth = (tWidth - 60) / 5
      })
    })
  },
  methods: {
    getList () {
      var data = [];
          checkPlan.getList(1, 100).then(ret =>{
            var list = ret.data.data.records;
            for(var i=0; i<list.length; i++){
              data.push({
                id:list[i].id,
                name: list[i].name,
                userIds: list[i].userIds,
                planStart: list[i].planStart,
               path: list[i].path,
              })
            this.userids += list[i].userIds
            }
            this.tableData = data;
            var details = [];
          checkoutfire.getList(1,100).then(ret =>{
            var list = ret.data.data.records;
            for(var i=0;i<list.length;i++){
                if(this.userids.indexOf(list[i].checkUser) != -1){
                details.push({
                checkUser: list[i].checkUser,
                content: list[i].content,
                gps: list[i].gps,
                isCover: list[i].isCover,
                position: list[i].position,
                status: list[i].status,
                })
              }
            }
              this.detailsData = details;
          })
          });
      
    },
     // 修改table tr行的背景色
    tableRowStyle({ row, rowIndex }) {
      return 'background-color: rgba(51,195,236,0.14);color: #fff;'
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: rgba(51,195,236,0.14);color: #9ebaef;'
      }
    },
     deleteRow(row) {
        // console.log("作为一个节点")
        this.isShow="true"
      },
      getRowClass({ row, column, rowIndex, columnIndex }) {
                return "background:rgba(16, 54, 87, 0.5);color:#CAFFFF;";
            },
            getRowClass2({ row, column, rowIndex, columnIndex }) {
                return "background:rgba(16, 54, 87, 0.5);color:#fff;";
            },
  },
}
</script>
<style lang="scss" scoped>
.visual_table{
  height:calc(100% - 40px);
  position: relative;
  z-index: 300;
}
.table-kingdargen{
    text-align: center;
    margin-bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(16, 54, 87, 0.5);
    background: transparent;
    &::before{
      background-color: transparent;
    }
    /deep/ tr{
      background-color: transparent;
    }
    /deep/ thead tr {
      background:rgba(2,23,65,0.8);
      box-shadow:0px 0px 27px 0px rgba(193,208,255,0.35);
    }
    /deep/ thead th.is-leaf {
      background:transparent;
      padding: 8px 0;
      font-size: 12px;
      border-top: 1px solid #00c1ff;
    }
    /deep/ tr:hover {
      background-color: transparent;
      td {
        background-color: transparent;
      }
    }
    /deep/ tr {
      td {
        background-color: transparent;
      }
    }
    /deep/ tr {
      font-size: 12px;
    }
    /deep/ tr.style-row {
      background-color: rgba(0, 0, 0, 0.5);
    }
    /deep/ th.is-leaf, /deep/ td {
      border-bottom: 1px solid transparent;
      padding: 1px 0;
      color: #fff;
    }
    /deep/ .cell{
      line-height: inherit;
    }
    /deep/ .el-table__fixed-right-patch, /deep/ th.gutter{
      background: transparent;
      border-bottom: 0;
    }
    /deep/ .el-table__fixed-right::before, .el-table__fixed::before {
      height: 0;
    }
    /deep/ .el-table__body  tr:nth-child(2n) td {
      background-color: rgba(5, 37, 63, 1);
    }
    /deep/ .el-table__body  tr:nth-child(2n-1) td {
      background-color: transparent;
    }
}
.not-finish .el-table__expand-column .cell{
   display: none;
}
.details {
  position: fixed;
  max-height: 90%;
  overflow: auto;
  background: url(../images/dia.png) center no-repeat;
  background-size: 100% 100%;;
  width: 820px;
  height: 550px;
  top: 105px;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 1000;
  padding: 80px 50px 0;
  .closeBtn {
    background: url(../images/close.png) center no-repeat;
    width: 44px;
    height: 44px;
    display: block;
    cursor: pointer;
    position: absolute;
    top: 15px;
    right: 10px;
    z-index: 1000;
  }
  .el-table {
    // border-radius: 8px;
    background: rgba(16, 54, 87, 0);
  }
  .el-table::before {
    height: 0
  }
  /deep/ .el-table tr th {
    line-height: 29px;
    text-align: center;
    font-weight: bold;
    border-bottom: none;
    font-size: 15px;
    padding: 4px 0;
    border-top: 1px solid #00c1ff;
  }
  /deep/ .el-table tr th.gutter {
    background: rgba(51, 195, 236, 0.14)
  }
  /deep/ .el-table__body tr:hover>td {
    background-color: transparent;
  }
  /deep/ .el-table__body tr>td {
    padding: 6px 0;
    font-size: 14px;
    border-bottom: 0;
  }
  /deep/ .el-table__body  tr:nth-child(2n) td {
    background-color: rgba(5, 37, 63, 1);
  }
  /deep/ .el-table__body  tr:nth-child(2n-1) td {
    background-color: #010e27;
  }
  }
  </style>
