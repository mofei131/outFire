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
          v-if="permission.checkplan_delete"
          @click="handleDelete"
        >删 除</el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import { getUserInfo } from "@/api/system/user";
import { getList, getDetail, add, update, remove } from "@/api/check/checkplan";
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
            label: "巡检内容",
            prop: "content",
            rules: [
              {
                required: true,
                message: "请输入巡检内容",
                trigger: "blur"
              }
            ]
          },
          {
            label: "周期类型",
            prop: "type",
            type: "select",
            value: 0,
            dicData: [
              { label: "周", value: 0 },
              { label: "月", value: 1 },
              { label: "年", value: 2 }
            ],
            rules: [
              {
                required: true,
                message: "请输入周期类型",
                trigger: "blur"
              }
            ]
          },
          {
            label: "所属企业",
            prop: "compId",
            //value: this.form.compId,
            type: "select",
            cascaderItem: ["userIds"],
            dicUrl: "/api/comp/comp/list?isUse=1&size=9999",
            props: {
              label: "name",
              value: "id",
              res: "data.records"
            },
            rules: [
              {
                required: false,
                message: "请输入所属企业",
                trigger: "blur"
              }
            ]
          },
          {
            label: "巡检人",
            prop: "userIds",
            type: "select",
            dicFlag: false,
            multiple: true,
            slot: true,
            dicUrl: `/api/blade-user/list?compId={{key}}&size=9999`,
            props: {
              label: "name",
              value: "id",
              res: "data.records"
            },
            rules: [
              {
                required: false,
                message: "请输入巡检人",
                trigger: "blur"
              }
            ]
          },
          {
            label: "灭火器",
            prop: "deviceIds",
            type: "select",
            multiple: true,
            slot: true,
            dicUrl: `/api/device/device/list?size=9999`,
            props: {
              label: "cid",
              value: "id",
              res: "data.records"
            },
            rules: [
              {
                required: false,
                message: "请输入灭火器",
                trigger: "blur"
              }
            ]
          },
          {
            label: "计划开始时间",
            prop: "planStart",
            type: "datetime",
            format: "yyyy-MM-dd hh:mm:ss",
            valueFormat: "yyyy-MM-dd hh:mm:ss",
            rules: [
              {
                required: true,
                message: "请输入计划开始时间",
                trigger: "blur"
              }
            ]
          },
          {
            label: "计划结束时间",
            prop: "planEnd",
            type: "datetime",
            format: "yyyy-MM-dd hh:mm:ss",
            valueFormat: "yyyy-MM-dd hh:mm:ss",
            rules: [
              {
                required: true,
                message: "请输入计划结束时间",
                trigger: "blur"
              }
            ]
          },
          {
            label: "周一",
            prop: "week1",
            type: "radio",
            dicData: [
              { label: "是", value: 1 },
              { label: "否", value: 0 }
            ],
            value: 0,
            rules: [
              {
                required: true,
                message: "请输入周一",
                trigger: "blur"
              }
            ]
          },
          {
            label: "周二",
            prop: "week2",
            type: "radio",
            dicData: [
              { label: "是", value: 1 },
              { label: "否", value: 0 }
            ],
            value: 0,
            rules: [
              {
                required: false,
                message: "请输入周二",
                trigger: "blur"
              }
            ]
          },
          {
            label: "周三",
            prop: "week3",
            type: "radio",
            dicData: [
              { label: "是", value: 1 },
              { label: "否", value: 0 }
            ],
            value: 0,
            rules: [
              {
                required: true,
                message: "请输入周三",
                trigger: "blur"
              }
            ]
          },
          {
            label: "周四",
            type: "radio",
            dicData: [
              { label: "是", value: 1 },
              { label: "否", value: 0 }
            ],
            value: 0,
            prop: "week4",
            rules: [
              {
                required: true,
                message: "请输入周四",
                trigger: "blur"
              }
            ]
          },
          {
            label: "周五",
            type: "radio",
            dicData: [
              { label: "是", value: 1 },
              { label: "否", value: 0 }
            ],
            value: 0,
            prop: "week5",
            rules: [
              {
                required: true,
                message: "请输入周五",
                trigger: "blur"
              }
            ]
          },
          {
            label: "周六",
            type: "radio",
            dicData: [
              { label: "是", value: 1 },
              { label: "否", value: 0 }
            ],
            value: 0,
            prop: "week6",
            rules: [
              {
                required: true,
                message: "请输入周六",
                trigger: "blur"
              }
            ]
          },
          {
            label: "周日",
            type: "radio",
            dicData: [
              { label: "是", value: 1 },
              { label: "否", value: 0 }
            ],
            value: 0,
            prop: "week7",
            rules: [
              {
                required: true,
                message: "请输入周日",
                trigger: "blur"
              }
            ]
          },
          {
            label: "巡检路线",
            prop: "path",
            rules: [
              {
                required: false,
                message: "请输入巡检路线",
                trigger: "blur"
              }
            ]
          },
          {
            label: "其它信息",
            prop: "other",
            rules: [
              {
                required: false,
                message: "请输入其它信息",
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
        addBtn: this.vaildData(this.permission.checkplan_add, false),
        viewBtn: this.vaildData(this.permission.checkplan_view, false),
        delBtn: this.vaildData(this.permission.checkplan_delete, false),
        editBtn: this.vaildData(this.permission.checkplan_edit, false)
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
      row.userIds = row.userIds.join(",");
      row.deviceIds = row.deviceIds.join(",");
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
      row.userIds = row.userIds.join(",");
      row.deviceIds = row.deviceIds.join(",");
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
      this.userInfo = JSON.parse(localStorage.getItem("saber-userInfo")).content;
      if (1 === this.userInfo.is_use) {
        this.query.compId = this.userInfo.comp_id;
      } else {
        this.query = {};
      }
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

      // getUserInfo().then(res => {
      //   const user = res.data.data;
      //   this.form = {
      //     id: user.id,
      //     compId: user.compId,
      //     avatar: user.avatar,
      //     name: user.name,
      //     realName: user.realName,
      //     phone: user.phone,
      //     email: user.email
      //   };
      // });
    }
  }
};
</script>

<style>
</style>
