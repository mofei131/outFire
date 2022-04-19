<template>
  <el-row>
    <el-col :span="5">
      <basic-container class="tree-style">
        <avue-tree :option="treeOption" :data="treeData" @node-click="nodeClick" />
      </basic-container>
    </el-col>
    <el-col :span="19">
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
              v-if="permission.comp_delete"
              @click="handleDelete"
            >删 除</el-button>
          </template>
        </avue-crud>
      </basic-container>
    </el-col>
  </el-row>
</template>

<script>
import {
  getList,
  getDetail,
  add,
  update,
  remove,
  getAreaTree,
  getLazyList
} from "@/api/area/area";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {},
      query: { pid: "650000" },
      loading: true,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      selectionList: [],
      init: {
        AreaTree: []
      },
      treeAreaId: "650000",
      treeData: [],
      treeOption: {
        defaultSort: {
          prop: "cid",
          order: "descending"
        },
        lazy: true,
        tree: true,
        expandAll: false,
        nodeKey: "value",
        addBtn: false,
        menu: false,
        size: "small",
        props: {
          labelText: "标题",
          label: "title",
          value: "value",
          children: "children"
        },
        treeLoad: function(node, resolve) {
          if (node.level === 0) {
            return resolve([
              {
                id: "650000",
                label: "新疆维吾尔自治区",
                value: "650000",
                title: "新疆维吾尔自治区"
              }
            ]);
          }
          if (node.level >= 1) {
            this.treeAreaId = node.data.id;
            getLazyList(this.treeAreaId).then(res => {
              resolve(
                res.data.data.map(item => {
                  return {
                    ...item,
                    leaf: !item.hasChildren
                  };
                })
              );
            });
          }
        }
      },
      option: {
        defaultSort: {
          prop: "cid",
          order: "descending"
        },
        height: "auto",
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
            rules: [
              {
                required: true,
                message: "请输入",
                trigger: "blur"
              }
            ]
          },
          {
            label: "名字",
            prop: "name",
            rules: [
              {
                required: true,
                message: "请输入",
                trigger: "blur"
              }
            ]
          },
          {
            label: "父级编码",
            prop: "pid",
            rules: [
              {
                required: true,
                message: "请输入",
                trigger: "blur"
              }
            ]
          },
          {
            label: "描述",
            prop: "contact",
            rules: [
              {
                required: true,
                message: "请输入",
                trigger: "blur"
              }
            ]
          },
          {
            label: "电话",
            prop: "phone",
            rules: [
              {
                required: true,
                message: "请输入",
                trigger: "blur"
              }
            ]
          },
          {
            label: "是否已删除",
            prop: "isDeleted",
            type: "radio",
            dicData: [
              {
                label: "是",
                value: 1
              },
              {
                label: "否",
                value: 0
              }
            ],
            rules: [
              {
                required: true,
                message: "请输入",
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
        addBtn: this.vaildData(this.permission.comp_add, false),
        viewBtn: this.vaildData(this.permission.comp_view, false),
        delBtn: this.vaildData(this.permission.comp_delete, false),
        editBtn: this.vaildData(this.permission.comp_edit, false)
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
    nodeClick(data) {
      this.treeAreaId = data.id;
      this.treeAreaId = data.id;
      this.query.pid = this.treeAreaId;
      this.page.currentPage = 1;
      this.onLoad(this.page);
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
      if ("add" == type) {
        this.$refs.crud.value.areaId = this.treeAreaId;
        this.$refs.crud.option.column.filter(item => {
          if (item.prop === "areaId") {
            item.value = this.treeAreaId;
          }
        });
        done();
      } else if (["edit", "view"].includes(type)) {
        getDetail(this.form.id).then(res => {
          this.form = res.data.data;
        });
        done();
      }
    },
    searchReset() {
      this.query = { isUse: 1, pid: "650000" };
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
      console.log(this.query);
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

<style scoped>
.tree-style {
  max-height: 640px;
  overflow: auto;
}
</style>
