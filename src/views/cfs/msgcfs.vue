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
                   v-if="permission.msgcfs_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/cfs/msgcfs";
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
              label: "类型",
              prop: "type",
              rules: [{
                required: true,
                message: "请输入类型",
                trigger: "blur"
              }]
            },
            {
              label: "IP地址",
              prop: "ip",
              rules: [{
                required: true,
                message: "请输入IP地址",
                trigger: "blur"
              }]
            },
            {
              label: "发送时间",
              prop: "sendTime",
              rules: [{
                required: true,
                message: "请输入发送时间",
                trigger: "blur"
              }]
            },
            {
              label: "报文内容",
              prop: "content",
              rules: [{
                required: true,
                message: "请输入报文内容",
                trigger: "blur"
              }]
            },
            {
              label: "业务流水号(初始值为0)",
              prop: "serialNo",
              rules: [{
                required: true,
                message: "请输入业务流水号(初始值为0)",
                trigger: "blur"
              }]
            },
            {
              label: "协议版本号(主版本号1、用户版本号)",
              prop: "versionNo",
              rules: [{
                required: true,
                message: "请输入协议版本号(主版本号1、用户版本号)",
                trigger: "blur"
              }]
            },
            {
              label: "时间标签(秒分时日月年)",
              prop: "timeTag",
              rules: [{
                required: true,
                message: "请输入时间标签(秒分时日月年)",
                trigger: "blur"
              }]
            },
            {
              label: "源地址(设备唯一ID)",
              prop: "sourceAddress",
              rules: [{
                required: true,
                message: "请输入源地址(设备唯一ID)",
                trigger: "blur"
              }]
            },
            {
              label: "目标地址(0)",
              prop: "destAddress",
              rules: [{
                required: true,
                message: "请输入目标地址(0)",
                trigger: "blur"
              }]
            },
            {
              label: "应用数据单元长度",
              prop: "detailLength",
              rules: [{
                required: true,
                message: "请输入应用数据单元长度",
                trigger: "blur"
              }]
            },
            {
              label: "命令字节0预留1控制命令2返送数据3确认4请求5应答6否认7其它",
              prop: "commandByte",
              rules: [{
                required: true,
                message: "请输入命令字节0预留1控制命令2返送数据3确认4请求5应答6否认7其它",
                trigger: "blur"
              }]
            },
            {
              label: "应用数据单元，长度不应大于1024",
              prop: "detailContent",
              rules: [{
                required: true,
                message: "请输入应用数据单元，长度不应大于1024",
                trigger: "blur"
              }]
            },
            {
              label: "应用数据单元标识符类型标志",
              prop: "detailType",
              rules: [{
                required: true,
                message: "请输入应用数据单元标识符类型标志",
                trigger: "blur"
              }]
            },
            {
              label: "应用数据单元条数",
              prop: "detailCount",
              rules: [{
                required: true,
                message: "请输入应用数据单元条数",
                trigger: "blur"
              }]
            },
            {
              label: "检验和",
              prop: "checkSum",
              rules: [{
                required: true,
                message: "请输入检验和",
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
          addBtn: this.vaildData(this.permission.msgcfs_add, false),
          viewBtn: this.vaildData(this.permission.msgcfs_view, false),
          delBtn: this.vaildData(this.permission.msgcfs_delete, false),
          editBtn: this.vaildData(this.permission.msgcfs_edit, false)
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
