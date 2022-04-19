<template>
  <basic-container>
    <div style="display:flex;">
      <el-button type="primary" @click="handleGet">导出</el-button>

      <div style="width:20px;"></div>
      <el-upload
        :show-file-list="false"
        action="#"
        :drag="false"
        :on-change="handleChange"
        :on-success="handleUpload"
        :on-error="handleUpload"
      >
      </el-upload>
    </div>
    <br />
    <avue-crud
      :option="option"
      :table-loading="loading"
      :data="data"
      :page="page"
      :permission="permissionList"
      :before-open="beforeOpen"
      :upload-after="uploadAfter"
      v-model="form"
      ref="crud"
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
          v-if="permission.device_delete"
          @click="handleDelete"
        >删 除</el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import { getList,remove } from "@/api/check/checkn";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      //user: null,
      form: {},
      query: { cid: "1" },
      loading: true,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      selectionList: [],
      option: {
        height: "auto",
        calcHeight: 350,
        tip: false,
        border: true,
        index: true,
        viewBtn: true,
        selection: true,
        column: [
          {
            label: "单位名称",
            prop: "name",
            search: true,
          },
          {
            label: "单位地址",
            prop: "address",
          },
          {
            label: "设备卡号",
            prop: "cid",
            search: true,
          },
          {
            label: "报警原因",
            prop: "checktag",
          },
          {
            label: "报警时间",
            prop: "ftime"
          },
          {
            label: "单位联系人",
            prop: "safe_leader",
          },
          {
            label: "单位联系人电话",
            prop: "safe_leader_phone",
          },
        ]
      },
      data: []
    };
  },
  computed: {
    ...mapGetters(["permission"]),
    permissionList() {
      return {
        delBtn: this.vaildData(this.permission.device_delete, false),
        data:[]
      };
    },
    // cid() {
    //   let cid = [];
    //   this.selectionList.forEach(ele => {
    //     cid.push(ele.id);
    //   });
    //   return cid.join(",");
    // }
  },
  methods: {
    rowSave(row, loading, done) {
      row.destrotFile = row.destrotFile.join(",");
      console.log("row->", row);
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
          var cid = row.id
          return remove(cid);
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
          var cid = this.id
          return remove(cid);
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
      } else {
        setTimeout(() => {
          this.user = JSON.parse(
            localStorage.getItem("saber-userInfo")
          ).content;
          this.form.compId = this.user.comp_id;
        }, 0);
      }
      done();
    },
    searchReset() {
      this.query = {};
      this.onLoad(this.page);
    },
    searchChange(params) {
      this.query = params;
      this.page.currentPage = 1;
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
      this.loading = true;
      var data = []
      getList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query)
      ).then(res => {
        const list = res.data.data;
        console.log(list)
        for(var i=0;i<list.length;i++){
          if(list[i].isDeleted == 0)
          data.push({
            name:list[i].name,
            address:list[i].address,
            cid:list[i].cid,
            checktag:list[i].checktag,
            ftime:list[i].ftime,
            safe_leader:list[i].safe_leader,
            safe_leader_phone:list[i].safe_leader_phone,
            id:list[i].id
          })
        }
        this.data = data;
        this.page.total = data.length;
        this.loading = false;
        this.selectionClear();
      });
    },
    handleGet() {
      window.open("/cdn/excel/device.xlsx");
    },
    handleUpload(res, file, fileLis) {
      console.log(file);
      var that = this;
      this.$export.xlsx(file.raw).then(data => {
        var list = data.results;
        for (var i = 0; i < list.length; i++) {
          console.log(list[i]);
          add(list[i]).then(
            () => {
              that.onLoad(this.page);
              that.$message({
                type: "success",
                message: "导入成功!"
              });
            },
            error => {
              console.log(error);
            }
          );
        }
      });
    },
    handleChange(file, fileLis) {
      return;
    },
    uploadAfter(res, done) {
      var data = res.fileName;
      console.log(res, done, data);
      done();
    }
  }
};
</script>

<style >
input[type="file"] {
  display: none;
}
</style>
