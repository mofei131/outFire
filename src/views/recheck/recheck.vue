<template>
  <basic-container>
    <avue-crud
      :option="option"
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
      @on-load="onLoad"
    >
      <template slot="menuLeft">
        <el-button
          type="danger"
          size="small"
          icon="el-icon-delete"
          plain
          v-if="permission.recheck_delete"
          @click="handleDelete"
        >删 除</el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import { getList, getDetail, add, update, remove } from "@/api/recheck/recheck";
import { mapGetters } from "vuex";

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
        height: "auto",
        calcHeight: 350,
        tip: false,
        border: true,
        index: true,
        viewBtn: true,
        selection: true,
        column: [
          {
            label: "名称",
            prop: "name",
            rules: [
              {
                required: true,
                message: "请输入名称",
                trigger: "blur"
              }
            ]
          },
          {
            label: "编号",
            prop: "cid",
            rules: [
              {
                required: true,
                message: "请输入编号",
                trigger: "blur"
              }
            ]
          },
          {
            label: "类型",
            prop: "type",
            type: "select",
            value: 0,
            dicData: [
              { label: "一般维保", value: 0 },
              { label: "其它维保", value: 1 }
            ],
            rules: [
              {
                required: true,
                message: "请输入类型",
                trigger: "blur"
              }
            ]
          },
          {
            label: "所属企业",
            prop: "compId",
            type: "select",
            dicUrl: "/api/comp/comp/list?isUse=1&size=9999",
            props: {
              label: "name",
              value: "id",
              res: "data.records"
            },
            rules: [
              {
                required: true,
                message: "请输入所属企业",
                trigger: "blur"
              }
            ]
          },
          {
            label: "维保企业",
            prop: "recompId",
            type: "select",
            dicUrl: "/api/comp/comp/list?isRecheck=1&size=9999",
            props: {
              label: "name",
              value: "id",
              res: "data.records"
            },
            rules: [
              {
                required: true,
                message: "请输入维保企业",
                trigger: "blur"
              }
            ]
          },
          {
            label: "维保人员",
            prop: "userId",
            type: "select",
            dicUrl: `/api/blade-user/list?size=9999`,
            props: {
              label: "name",
              value: "id",
              res: "data.records"
            },
            rules: [
              {
                required: true,
                message: "请输入维保人员",
                trigger: "blur"
              }
            ]
          },
          {
            label: "开始时间",
            prop: "startTime",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            rules: [
              {
                required: true,
                message: "请输入开始时间",
                trigger: "blur"
              }
            ]
          },
          {
            label: "结束时间",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            prop: "endTime",
            rules: [
              {
                required: false,
                message: "请输入结束时间",
                trigger: "blur"
              }
            ]
          },
          {
            label: "维保内容",
            prop: "content",
            rules: [
              {
                required: true,
                message: "请输入维保内容",
                trigger: "blur"
              }
            ]
          }
        ]
      },
      data: []
    };
  },
  computed: {
    ...mapGetters(["permission"]),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permission.recheck_add, false),
        viewBtn: this.vaildData(this.permission.recheck_view, false),
        delBtn: this.vaildData(this.permission.recheck_delete, false),
        editBtn: this.vaildData(this.permission.recheck_edit, false)
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
      getList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query)
      ).then(res => {
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
