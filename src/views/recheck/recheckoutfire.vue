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
          v-if="permission.recheckoutfire_delete"
          @click="handleDelete"
        >删 除</el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import {
  getList,
  getDetail,
  add,
  update,
  remove
} from "@/api/recheck/recheckoutfire";
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
            label: "维保记录主键",
            prop: "recheckId",
            type: "select",
            dicUrl: `/api/recheck/recheck/list?size=9999`,
            props: {
              label: "name",
              value: "id",
              res: "data.records"
            },
            rules: [
              {
                required: true,
                message: "请输入维保记录主键",
                trigger: "blur"
              }
            ]
          },
          {
            label: "灭火器主键",
            prop: "deviceOutfireId",
            type: "select",
            dicUrl: `/api/device/device/list?size=9999`,
            props: {
              label: "cid",
              value: "id",
              res: "data.records"
            },
            rules: [
              {
                required: true,
                message: "请输入灭火器主键",
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
          },
          {
            label: "铅封是否完好",
            prop: "isCover",
            type: "select",
            value: 1,
            dicData: [{ label: "否", value: 0 }, { label: "是", value: 1 }],
            rules: [
              {
                required: true,
                message: "请输入铅封是否完好",
                trigger: "blur"
              }
            ]
          },
          {
            label: "附件",
            prop: "files",
            type: "upload",
            dataType: "string",
            span: 24,
            listType: "picture-card",
            value: " ",
            tip: "只能上传jpg/png文件，且不超过500kb",
            action: "/api/iot/putfile?bucketName=iot",
            data: {
              bucketName: "iot"
            },
            propsHttp: {
              url: "link",
              name: "link",
              res: "data"
            },
            rules: [
              {
                required: false,
                message: "请输入附件",
                trigger: "blur"
              }
            ]
          },
          {
            label: "经度",
            prop: "longitude",
            rules: [
              {
                required: false,
                message: "请输入经度",
                trigger: "blur"
              }
            ]
          },
          {
            label: "纬度",
            prop: "latitude",
            rules: [
              {
                required: false,
                message: "请输入纬度",
                trigger: "blur"
              }
            ]
          },
          {
            label: "位置",
            prop: "gps",
            rules: [
              {
                required: false,
                message: "请输入位置",
                trigger: "blur"
              }
            ]
          },
          {
            label: "状态",
            prop: "status",
            type: "select",
            value: 1,
            dicData: [
              { label: "完成", value: 0 },
              { label: "维保中", value: 1 }
            ],
            rules: [
              {
                required: true,
                message: "请输入状态0正常2维保中",
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
        addBtn: this.vaildData(this.permission.recheckoutfire_add, false),
        viewBtn: this.vaildData(this.permission.recheckoutfire_view, false),
        delBtn: this.vaildData(this.permission.recheckoutfire_delete, false),
        editBtn: this.vaildData(this.permission.recheckoutfire_edit, false)
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
