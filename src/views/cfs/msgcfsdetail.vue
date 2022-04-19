<template>
  <basic-container>
    <avue-crud :option="option"
               :table-loading="loading"
               :data="data"
               :page="page"
               :permission="permissionList"
               :before-open="beforeOpen"
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
               @on-load="onLoad">
      <template slot="menuLeft">
        <el-button type="danger"
                   size="small"
                   icon="el-icon-delete"
                   plain
                   v-if="permission.msgcfsdetail_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/cfs/msgcfsdetail";
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
        form: {},
        query: {},
        loading: true,
        page: {
          pageSize: 10,
          currentPage: 1,
          total: 0
        },
        selectionList: [],
        option: {
          height:'auto',
          calcHeight: 350,
          tip: false,
          border: true,
          index: true,
          viewBtn: true,
          selection: true,
          column: [
            {
              label: "主键",
              prop: "id",
              rules: [{
                required: true,
                message: "请输入主键",
                trigger: "blur"
              }]
            },
            {
              label: "表头主键",
              prop: "pid",
              rules: [{
                required: true,
                message: "请输入表头主键",
                trigger: "blur"
              }]
            },
            {
              label: "序号每个报文从1开始",
              prop: "serialNo",
              rules: [{
                required: true,
                message: "请输入序号每个报文从1开始",
                trigger: "blur"
              }]
            },
            {
              label: "系统类型标志",
              prop: "type",
              rules: [{
                required: true,
                message: "请输入系统类型标志",
                trigger: "blur"
              }]
            },
            {
              label: "系统地址",
              prop: "address",
              rules: [{
                required: true,
                message: "请输入系统地址",
                trigger: "blur"
              }]
            },
            {
              label: "系统状态1",
              prop: "status1",
              rules: [{
                required: true,
                message: "请输入系统状态1",
                trigger: "blur"
              }]
            },
            {
              label: "系统状态2",
              prop: "status2",
              rules: [{
                required: true,
                message: "请输入系统状态2",
                trigger: "blur"
              }]
            },
            {
              label: "时间标签",
              prop: "time",
              rules: [{
                required: true,
                message: "请输入时间标签",
                trigger: "blur"
              }]
            },
            {
              label: "报文内容(json格式)",
              prop: "content",
              rules: [{
                required: true,
                message: "请输入报文内容(json格式)",
                trigger: "blur"
              }]
            },
            {
              label: "是否已删除",
              prop: "isDeleted",
              rules: [{
                required: true,
                message: "请输入是否已删除",
                trigger: "blur"
              }]
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
          addBtn: this.vaildData(this.permission.msgcfsdetail_add, false),
          viewBtn: this.vaildData(this.permission.msgcfsdetail_view, false),
          delBtn: this.vaildData(this.permission.msgcfsdetail_delete, false),
          editBtn: this.vaildData(this.permission.msgcfsdetail_edit, false)
        };
      },
      ids() {
        let ids = [];
        this.selectionList.forEach(ele => {
          ids.push(ele.id);
        });
        return ids.join(",");
      }
    },
    methods: {
      rowSave(row, loading, done) {
        add(row).then(() => {
          loading();
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        }, error => {
          done();
          console.log(error);
        });
      },
      rowUpdate(row, index, loading, done) {
        update(row).then(() => {
          loading();
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        }, error => {
          done();
          console.log(error);
        });
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
      currentChange(currentPage){
        this.page.currentPage = currentPage;
      },
      sizeChange(pageSize){
        this.page.pageSize = pageSize;
      },
      onLoad(page, params = {}) {
        this.loading = true;
        getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
          const data = res.data.data;
          this.page.total = data.total;
          this.data = data.records;
          this.loading = false;
          this.selectionClear();
        });
      }
    }
  };
</script>

<style>
</style>
