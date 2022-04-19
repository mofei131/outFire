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
          v-if="permission.organize_delete"
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
  remove,
  getMaxCid
} from "@/api/organize/organize";
import { getAreaTree } from "@/api/area/area";
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
            label: "编号",
            prop: "cid",
            editDisabled: true,
            search: true,
            rules: [
              {
                required: true,
                message: "请输入编号",
                trigger: "blur"
              }
            ]
          },
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
            label: "组织机构代码",
            prop: "organizationCode",
            rules: [
              {
                required: true,
                message: "请输入组织机构代码",
                trigger: "blur"
              }
            ]
          },
          {
            label: "行政区划",
            prop: "areaId",
            type: "select",
            rules: [
              {
                required: true,
                message: "请输入行政区划",
                trigger: "blur"
              }
            ]
          },
          {
            label: "单位性质",
            prop: "propertyId",
            rules: [
              {
                required: true,
                message: "请输入单位性质",
                trigger: "blur"
              }
            ]
          },
          {
            label: "单位类别",
            prop: "categoryId",
            rules: [
              {
                required: true,
                message: "请输入单位类别",
                trigger: "blur"
              }
            ]
          },
          {
            label: "地址",
            prop: "address",
            rules: [
              {
                required: true,
                message: "请输入地址",
                trigger: "blur"
              }
            ]
          },
          {
            label: "员工人数",
            prop: "employees",
            rules: [
              {
                required: true,
                message: "请输入员工人数",
                trigger: "blur"
              }
            ]
          },
          {
            label: "所属行业",
            prop: "industryCid",
            rules: [
              {
                required: true,
                message: "请输入所属行业",
                trigger: "blur"
              }
            ]
          },
          {
            label: "联系人",
            prop: "linkman",
            rules: [
              {
                required: true,
                message: "请输入联系人",
                trigger: "blur"
              }
            ]
          },
          {
            label: "联系电话",
            prop: "phone",
            rules: [
              {
                required: true,
                message: "请输入联系电话",
                trigger: "blur"
              }
            ]
          },
          {
            label: "经度",
            prop: "longitude",
            rules: [
              {
                required: true,
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
                required: true,
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
                required: true,
                message: "请输入位置",
                trigger: "blur"
              }
            ]
          },
          {
            label: "是否生产企业",
            prop: "isFacture",
            type: "radio",
            dicData: [
              { label: "是", value: true },
              { label: "否", value: false }
            ],
            value: false,
            rules: [
              {
                required: true,
                message: "请输入是否生产企业",
                trigger: "blur"
              }
            ]
          },
          {
            label: "是否经销商",
            prop: "isPartner",
            type: "radio",
            dicData: [
              { label: "是", value: true },
              { label: "否", value: false }
            ],
            value: false,
            rules: [
              {
                required: true,
                message: "请输入是否经销商",
                trigger: "blur"
              }
            ]
          },
          {
            label: "是否安装企业",
            prop: "isInstall",
            type: "radio",
            dicData: [
              { label: "是", value: true },
              { label: "否", value: false }
            ],
            value: false,
            rules: [
              {
                required: true,
                message: "请输入是否安装企业",
                trigger: "blur"
              }
            ]
          },
          {
            label: "是否维保企业",
            prop: "isRecheck",
            type: "radio",
            dicData: [
              { label: "是", value: true },
              { label: "否", value: false }
            ],
            value: false,
            rules: [
              {
                required: true,
                message: "请输入是否维保企业",
                trigger: "blur"
              }
            ]
          },
          {
            label: "是否报废企业",
            prop: "isDestroy",
            type: "radio",
            dicData: [
              { label: "是", value: true },
              { label: "否", value: false }
            ],
            value: false,
            rules: [
              {
                required: true,
                message: "请输入是否报废企业",
                trigger: "blur"
              }
            ]
          },
          {
            label: "是否政府部门",
            prop: "isDepartment",
            type: "radio",
            dicData: [
              { label: "是", value: true },
              { label: "否", value: false }
            ],
            value: false,
            rules: [
              {
                required: true,
                message: "请输入是否政府部门",
                trigger: "blur"
              }
            ]
          },
          {
            label: "是否消防大队",
            prop: "isFirebrigade",
            type: "radio",
            dicData: [
              { label: "是", value: true },
              { label: "否", value: false }
            ],
            value: false,
            rules: [
              {
                required: true,
                message: "请输入是否消防大队",
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
        addBtn: this.vaildData(this.permission.organize_add, false),
        viewBtn: this.vaildData(this.permission.organize_view, false),
        delBtn: this.vaildData(this.permission.organize_delete, false),
        editBtn: this.vaildData(this.permission.organize_edit, false)
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
      if ("add" == type) {
        getMaxCid("11").then(ret => {
          console.log(ret);
          var data = ret.data.data;
          const index2 = this.$refs.crud.findColumnIndex("cid");
          this.option.column[index2].value = data;
          done();
        });
      } else if (["edit", "view"].includes(type)) {
        getDetail(this.form.id).then(res => {
          this.form = res.data.data;
        });
        done();
      }
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
      getAreaTree().then(res => {
        const data = res.data.data;
        const index = this.$refs.crud.findColumnIndex("areaId");
        this.option.column[index].dicData = data;
      });
    }
  }
};
</script>

<style>
</style>
