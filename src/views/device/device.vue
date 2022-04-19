<template>
  <basic-container>
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
import { getList, getDetail, add, update, remove } from "@/api/device/device";
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
          // {
          //   label: "区域",
          //   prop: "areaId",
          //   disabled: true,
          //   search: true,
          //   rules: [
          //     {
          //       required: true,
          //       message: "请输入区域",
          //       trigger: "blur"
          //     }
          //   ]
          // },
          {
            label: "名称",
            prop: "name",
            search: true,
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
            search: true,
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
            label: "父级主键",
            prop: "pid",
            rules: [
              {
                required: false,
                message: "请输入父级主键",
                trigger: "blur"
              }
            ]
          },
          {
            label: "种类",
            prop: "typeId",
            value: 1,
            type: "select",
            dicUrl: "/api/device-type/devicetype/list?grade=1&size=100",
            props: {
              label: "name",
              value: "id",
              res: "data.records"
            },
            rules: [
              {
                required: true,
                message: "请输入种类",
                trigger: "blur"
              }
            ]
          },
          {
            label: "型号分类",
            prop: "type2Id",
            type: "select",
            dicUrl: "/api/device-type/devicetype/list?grade=2&size=100",
            props: {
              label: "name",
              value: "id",
              res: "data.records"
            },
            rules: [
              {
                required: true,
                message: "请输入型号分类",
                trigger: "blur"
              }
            ]
          },
          {
            label: "卡号",
            prop: "cardNo",
            search: true,
            rules: [
              {
                required: false,
                message: "请输入卡号",
                trigger: "blur"
              }
            ]
          },
          {
            label: "品牌",
            prop: "brand",
            rules: [
              {
                required: false,
                message: "请输入品牌",
                trigger: "blur"
              }
            ]
          },
          {
            label: "型号",
            prop: "model",
            rules: [
              {
                required: false,
                message: "请输入型号",
                trigger: "blur"
              }
            ]
          },
          {
            label: "所属企业",
            prop: "compId",
            type: "select",
            //value: user.comp_id,
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
            label: "存放位置",
            prop: "position",
            rules: [
              {
                required: false,
                message: "请输入存放位置",
                trigger: "blur"
              }
            ]
          },
          {
            label: "存放位置1",
            prop: "position1",
            rules: [
              {
                required: false,
                message: "请输入存放位置1",
                trigger: "blur"
              }
            ]
          },
          {
            label: "存放位置2",
            prop: "position2",
            rules: [
              {
                required: false,
                message: "请输入存放位置2",
                trigger: "blur"
              }
            ]
          },
          {
            label: "存放位置3",
            prop: "position3",
            rules: [
              {
                required: false,
                message: "请输入存放位置3",
                trigger: "blur"
              }
            ]
          },
          {
            label: "开始日期",
            prop: "startTime",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            search: true,
            rules: [
              {
                required: false,
                message: "请输入开始日期",
                trigger: "blur"
              }
            ]
          },
          {
            label: "有效时间",
            prop: "endTime",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            rules: [
              {
                required: false,
                message: "请输入有效时间",
                trigger: "blur"
              }
            ]
          },
          {
            label: "复检周期(年)",
            prop: "recheckTerm",
            rules: [
              {
                required: false,
                message: "请输入复检周期(年)",
                trigger: "blur"
              }
            ]
          },
          {
            label: "销毁期限(年)",
            prop: "destroyTerm",
            rules: [
              {
                required: false,
                message: "请输入销毁期限(年)",
                trigger: "blur"
              }
            ]
          },
          {
            label: "生产厂家",
            prop: "factureId",
            type: "select",
            dicUrl: "/api/comp/comp/list?isFacture=1&size=9999",
            props: {
              label: "name",
              value: "id",
              res: "data.records"
            },
            rules: [
              {
                required: false,
                message: "请输入生产厂家",
                trigger: "blur"
              }
            ]
          },
          {
            label: "出厂时间",
            prop: "factureTime",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            rules: [
              {
                required: false,
                message: "请输入出厂时间",
                trigger: "blur"
              }
            ]
          },
          {
            label: "经销企业",
            prop: "partnerId",
            type: "select",
            dicUrl: "/api/comp/comp/list?isPartner=1&size=9999",
            props: {
              label: "name",
              value: "id",
              res: "data.records"
            },
            rules: [
              {
                required: false,
                message: "请输入经销企业",
                trigger: "blur"
              }
            ]
          },
          {
            label: "入库时间",
            prop: "partnerTime",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            rules: [
              {
                required: false,
                message: "请输入入库时间",
                trigger: "blur"
              }
            ]
          },
          {
            label: "安装厂家",
            prop: "installId",
            type: "select",
            dicUrl: "/api/comp/comp/list?isInstall=1&size=9999",
            props: {
              label: "name",
              value: "id",
              res: "data.records"
            },
            rules: [
              {
                required: false,
                message: "请输入安装厂家",
                trigger: "blur"
              }
            ]
          },
          {
            label: "安装时间",
            prop: "installTime",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            rules: [
              {
                required: false,
                message: "请输入安装时间",
                trigger: "blur"
              }
            ]
          },
          {
            label: "报废企业",
            prop: "destroyId",
            type: "select",
            dicUrl: "/api/comp/comp/list?isDestroy=1&size=9999",
            props: {
              label: "name",
              value: "id",
              res: "data.records"
            },
            rules: [
              {
                required: false,
                message: "请输入报废企业",
                trigger: "blur"
              }
            ]
          },
          {
            label: "报废时间",
            prop: "destrotTime",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            rules: [
              {
                required: false,
                message: "请输入报废时间",
                trigger: "blur"
              }
            ]
          },
          {
            label: "报废内容",
            prop: "destrotContent",
            rules: [
              {
                required: false,
                message: "请输入报废内容",
                trigger: "blur"
              }
            ]
          },
          {
            label: "报废附件",
            prop: "destrotFile",
            type: "upload",
            dataType: "string",
            span: 24,
            listType: "picture-card",
            value: [],
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
                message: "请输入报废附件",
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
        addBtn: this.vaildData(this.permission.device_add, false),
        viewBtn: this.vaildData(this.permission.device_view, false),
        delBtn: this.vaildData(this.permission.device_delete, false),
        editBtn: this.vaildData(this.permission.device_edit, false)
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
      this.userInfo = JSON.parse(
        localStorage.getItem("saber-userInfo")
      ).content;
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
