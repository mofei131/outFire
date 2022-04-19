<template>
  <div>
    <!-- <el-container>
      <el-aside width="200px">
        <avue-tree :option="treeOption" :data="treeData" @node-click="nodeClick"></avue-tree>
      </el-aside>
      <el-main>
        <avue-crud
          :option="option"
          :table-loading="loading"
          :data="data"
          :page="page"
          :before-open="beforeOpen"
          v-model="form"
          ref="crud"
          @row-dblclick="showDialog"
          @row-update="rowUpdate"
          @row-save="rowSave"
          @row-del="rowDel"
          @search-change="searchChange"
          @search-reset="searchReset"
          @selection-change="selectionChange"
          @current-change="currentChange"
          @size-change="sizeChange"
          @on-load="onLoad"
        >
          <template slot="menuLeft">
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              plain
              v-if="permission.nocopy_delete"
              @click="handleDelete"
            >删 除</el-button>
          </template>
        </avue-crud>
      </el-main>
    </el-container>
     -->
    <MaskDetail
      v-if="companyDataSingle"
      v-model="outerVisible"
      :companyDataSingle="companyDataSingle"
    />


  </div>
</template>

<script>
import {
  getList,
  getTreeData,
  getAllComp,
  getDetail,
  getSingleComp,
  getAreaComp,
  add,
  update,
  remove
} from "@/api/wel/index";
import { mapGetters } from "vuex";

//弹窗
import MaskDetail from "../components/guide/maskDetail/maskDetail";
import Dailog from "../components/guide/maskDetail/dialog";

export default {
  created() {
    getTreeData().then(res => {
      console.log(res.data.data);
      this.treeData = res.data.data;
    });

    // getAllComp().then(res=>{
    //   console.log(res.data.data.records);
    //   this.data0 =  res.data.data.records

    //   this.data0 =  this.data;
    // })
  },

  mounted() {},

  data() {
    return {
      //详情弹窗
      outerVisible: false,
      // innerVisible: false,

      query: {},
      loading: true,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      selectionList: [],
      form: {},
      treeData: [],
      treeOption: {
        nodeKey: "id",
        addBtn: false,
        menu: false,
        expandAll: false,
        size: "small",
        formOption: {
          labelWidth: 100,
          column: [
            {
              label: "自定义项",
              prop: "test"
            }
          ]
        },
        props: {
          labelText: "标题",
          label: "title",
          value: "value",
          children: "children"
        }
      },
      data: [],
      data0: [],
      data1: [
        {
          name: "测试公司1",
          id: 1,
          area: "莱山区",
          tel: 13254547878,
          part: "测试部门",
          firePart: "消防测试部门",
          points: 23,
          companyData: [
            {
              id: 1,
              title: "单位基本信息",
              text: "单位基本信息页面"
            },
            {
              id: 2,
              title: "消防合法文书",
              text: "消防合法文书页面"
            },
            {
              id: 3,
              title: "消防设施",
              text: "消防设施页面"
            },
            {
              id: 4,
              title: "微型消防站",
              text: "微型消防站页面"
            },
            {
              id: 5,
              title: "消防平面图",
              text: "消防平面图页面"
            },
            {
              id: 6,
              title: "消防预案",
              text: "消防预案页面"
            },
            {
              id: 7,
              title: "检查计划",
              text: "检查计划页面"
            },
            {
              id: 8,
              title: "隐患记录",
              text: "隐患记录页面"
            },
            {
              id: 9,
              title: "规章制度",
              text: "规章制度页面"
            },
            {
              id: 10,
              title: "消防培训",
              text: "消防培训页面"
            },
            {
              id: 11,
              title: "重点部位",
              text: "重点部位页面"
            },
            {
              id: 12,
              title: "检查痕迹",
              text: "检查痕迹页面"
            },
            {
              id: 134,
              title: "火灾报警系统联网",
              text: "火灾报警系统联网页面"
            },
            {
              id: 14,
              title: "建筑消防用水检测",
              text: "建筑消防用水检测页面"
            },
            {
              id: 15,
              title: "重点部位视频监管",
              text: "重点部位视频监管页面"
            },
            {
              id: 16,
              title: "智慧用电检测",
              text: "智慧用电检测页面"
            },
            {
              id: 17,
              title: "独立烟感",
              text: "独立烟感页面"
            },

            {
              id: 18,
              title: "燃气检测器",
              text: "燃气检测器页面"
            }
          ]
        },
        {
          name: "测试公司2",
          id: 2,
          area: "莱山区",
          tel: 13254547878,
          part: "测试部门",
          firePart: "消防测试部门",
          points: 23,
          companyData: [
            {
              id: 1,
              title: "单位基本信息",
              text: "单位基本信息页面"
            },
            {
              id: 2,
              title: "消防合法文书",
              text: "消防合法文书页面"
            },
            {
              id: 3,
              title: "消防设施",
              text: "消防设施页面"
            },
            {
              id: 4,
              title: "微型消防站",
              text: "微型消防站页面"
            },
            {
              id: 5,
              title: "消防平面图",
              text: "消防平面图页面"
            },
            {
              id: 6,
              title: "消防预案",
              text: "消防预案页面"
            },
            {
              id: 7,
              title: "检查计划",
              text: "检查计划页面"
            },
            {
              id: 8,
              title: "隐患记录",
              text: "隐患记录页面"
            },
            {
              id: 9,
              title: "规章制度",
              text: "规章制度页面"
            },
            {
              id: 10,
              title: "消防培训",
              text: "消防培训页面"
            },
            {
              id: 11,
              title: "重点部位",
              text: "重点部位页面"
            },
            {
              id: 12,
              title: "检查痕迹",
              text: "检查痕迹页面"
            },
            {
              id: 134,
              title: "火灾报警系统联网",
              text: "火灾报警系统联网页面"
            },
            {
              id: 14,
              title: "建筑消防用水检测",
              text: "建筑消防用水检测页面"
            },
            {
              id: 15,
              title: "重点部位视频监管",
              text: "重点部位视频监管页面"
            },
            {
              id: 16,
              title: "智慧用电检测",
              text: "智慧用电检测页面"
            },
            {
              id: 17,
              title: "独立烟感",
              text: "独立烟感页面"
            },

            {
              id: 18,
              title: "燃气检测器",
              text: "燃气检测器页面"
            }
          ]
        }
      ],
      companyDataSingle: "",

      option: {
        defaultSort: {
          prop: "name",
          order: "descending" //ascending 表示升序，descending 表示降序
        },
        border: true,
        headerAlign: "center",
        align: "center",
        column: [
          {
            sortable: true, //排序
            label: "单位名称",
            prop: "name"
          },
          {
            label: "所属区域",
            prop: "quhua"
          },

          {
            label: "联系电话",
            prop: "phone"
          },
          {
            label: "行业主管部门",
            prop: "hyzg"
          },
          {
            label: "消防主管部门",
            prop: "xfzg"
          }
          // {
          //   label: "巡查点数",
          //   prop: "points"
          // }
        ]
      }
    };
  },

  components: {
    MaskDetail,
    Dailog
  },

  computed: {
    ...mapGetters(["permission"]),
    // permissionList() {
    //   return {
    //     addBtn: this.vaildData(this.permission.nocopy_add, false),
    //     viewBtn: this.vaildData(this.permission.nocopy_view, false),
    //     delBtn: this.vaildData(this.permission.nocopy_delete, false),
    //     editBtn: this.vaildData(this.permission.nocopy_edit, false)
    //   };
    // },
    ids() {
      let ids = [];
      this.selectionList.forEach(ele => {
        ids.push(ele.id);
      });
      return ids.join(",");
    }
  },
  methods: {
    nodeClick(data) {
      if (data.id == 0) {
        this.data = this.data0;
      } else if (data.id == 1) {
        this.data = this.data1;
      }
      console.log("选中了区");
      console.log(data);
      getAreaComp(data.id).then(res => {
        console.log(res);
        const data = res.data.data;
        this.page.total = data.total;
        this.data = data.records;
        this.data0 = this.data;
        this.loading = false;
        this.selectionClear();
      });
      // this.$message.success(JSON.stringify(data));
    },

    rowSave(row, loading, done) {
      add(row).then(
        () => {
          loading();
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        },
        error => {
          done();
          console.log(error);
        }
      );
    },
    rowUpdate(row, index, loading, done) {
      update(row).then(
        () => {
          loading();
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        },
        error => {
          done();
          console.log(error);
        }
      );
    },
    rowDel(row) {
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return remove(row.id);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        });
    },
    handleDelete() {
      if (this.selectionList.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return remove(this.ids);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          this.$refs.crud.toggleSelection();
        });
    },
    beforeOpen(done, type) {
      if (["edit", "view"].includes(type)) {
        getDetail(this.form.id).then(res => {
          this.form = res.data.data;
        });
      }
      done();
    },
    searchReset() {
      this.query = {};
      this.onLoad(this.page);
    },
    searchChange(params) {
      this.query = params;
      this.onLoad(this.page, params);
    },
    selectionChange(list) {
      this.selectionList = list;
    },
    selectionClear() {
      this.selectionList = [];
      this.$refs.crud.toggleSelection();
    },
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    onLoad(page, params = {}) {
      this.loading = false;

      this.loading = true;
      getList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query)
      ).then(res => {
        const data = res.data.data;
        this.page.total = data.total;
        this.data = data.records;
        this.data0 = this.data;
        this.loading = false;
        this.selectionClear();
      });
    },

    //弹窗
    showDialog(e) {
      console.log("弹窗");
      console.log(e);
      getSingleComp(e.id).then(res => {
        console.log(res);
      });
      this.companyDataSingle = this.data0.filter(item => {
        return item.id * 1 == e.id * 1;
      });
      this.outerVisible = true;
    }
  }
};
</script>
