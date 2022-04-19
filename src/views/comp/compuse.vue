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
  getMaxCid
} from "@/api/comp/comp";
import { getLazyList } from "@/api/area/area";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {},
      query: { isUse: 1, areaId_likeright: "000000" },
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
      treeAreaId: "000000",
      treeData: [],
      treeOption: {
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
                id: "000000",
                label: "全国行政区",
                value: "000000",
                title: "全国行政区"
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
            label: "企业名称",
            prop: "name",
            search: true,
            rules: [
              {
                required: true,
                message: "请输入企业名称",
                trigger: "blur"
              }
            ]
          },
          {
            label: "组织机构代码",
            prop: "organizationCode",
            rules: [
              {
                required: false,
                message: "请输入组织机构代码",
                trigger: "blur"
              }
            ]
          },
          {
            label: "行政区划",
            prop: "areaId",
            type: "tree",
            dicUrl: "/api/area/area/tree",
            props: {
              label: "title",
              value: "value"
            },
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
            value: 3,
            type: "select",
            dicUrl: "/api/blade-system/dict/dictionary?code=comp_property",
            props: {
              label: "dictValue",
              value: "dictKey"
            },
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
            type: "tree",
            dicUrl: "/api/category-type/compcategory/tree",
            props: {
              label: "title",
              value: "value"
            },
            dataType: "number",
            rules: [
              {
                required: true,
                message: "请输入单位类别",
                trigger: "blur"
              }
            ]
          },
          {
            label: "详细地址",
            prop: "address",
            rules: [
              {
                required: true,
                message: "请输入详细地址",
                trigger: "blur"
              }
            ]
          },
          {
            label: "员工人数",
            prop: "employees",
            rules: [
              {
                required: false,
                message: "请输入员工人数",
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
            label: "建筑面积",
            prop: "floorSpace",
            rules: [
              {
                required: false,
                message: "请输入建筑面积",
                trigger: "blur"
              }
            ]
          },
          {
            label: "消防安全负责人",
            prop: "safeLeader",
            rules: [
              {
                required: false,
                message: "请输入消防安全负责人",
                trigger: "blur"
              }
            ]
          },
          {
            label: "责任人联系电话",
            prop: "safeLeaderPhone",
            rules: [
              {
                required: false,
                message: "请输入责任人联系电话",
                trigger: "blur"
              }
            ]
          },
          {
            label: "责任人身份证号",
            prop: "safeLeaderCardNo",
            rules: [
              {
                required: false,
                message: "请输入责任人身份证号",
                trigger: "blur"
              }
            ]
          },
          {
            label: "消防安全管理人",
            prop: "safeManager",
            rules: [
              {
                required: false,
                message: "请输入消防安全管理人",
                trigger: "blur"
              }
            ]
          },
          {
            label: "管理人联系电话",
            prop: "safeManagerPhone",
            rules: [
              {
                required: false,
                message: "请输入管理人联系电话",
                trigger: "blur"
              }
            ]
          },
          {
            label: "管理人身份证号",
            prop: "safeManagerCardNo",
            rules: [
              {
                required: false,
                message: "请输入管理人身份证号",
                trigger: "blur"
              }
            ]
          },
          {
            label: "专兼职消防安全管理人",
            prop: "safePerson",
            rules: [
              {
                required: false,
                message: "请输入专兼职消防安全管理人",
                trigger: "blur"
              }
            ]
          },
          {
            label: "专兼职管理人电话",
            prop: "safePersonPhone",
            rules: [
              {
                required: false,
                message: "请输入专兼职管理人电话",
                trigger: "blur"
              }
            ]
          },
          {
            label: "专兼职管理人身份证号",
            prop: "safePersonCardNo",
            rules: [
              {
                required: false,
                message: "请输入专兼职管理人身份证号",
                trigger: "blur"
              }
            ]
          },
          {
            label: "所属行业",
            prop: "industryId",
            type: "tree",
            dicUrl: "/api/industry-type/compindustry/tree",
            props: {
              label: "title",
              value: "value"
            },
            rules: [
              {
                required: false,
                message: "请输入所属行业",
                trigger: "blur"
              }
            ]
          },
          {
            label: "行业主管部门",
            prop: "departmentId",
            rules: [
              {
                required: false,
                message: "请输入行业主管部门",
                trigger: "blur"
              }
            ]
          },
          {
            label: "消防主管部门",
            prop: "departmentFireId",
            rules: [
              {
                required: false,
                message: "请输入消防主管部门",
                trigger: "blur"
              }
            ]
          },
          {
            label: "消防监督员",
            prop: "supervisor",
            rules: [
              {
                required: false,
                message: "请输入消防监督员",
                trigger: "blur"
              }
            ]
          },
          {
            label: "单位分级",
            prop: "unitLevel",
            rules: [
              {
                required: false,
                message: "请输入单位分级",
                trigger: "blur"
              }
            ]
          },
          {
            label: "是否火灾高位单位",
            prop: "isRisk",
            value: 0,
            rules: [
              {
                required: false,
                message: "请输入是否火灾高位单位",
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
            label: "社区站长",
            prop: "stationmasterId",
            rules: [
              {
                required: false,
                message: "请输入社区站长",
                trigger: "blur"
              }
            ]
          },
          {
            label: "维保单位",
            prop: "maintenanceUnit",
            rules: [
              {
                required: false,
                message: "请输入维保单位",
                trigger: "blur"
              }
            ]
          },
          {
            label: "联系电话",
            prop: "phone",
            rules: [
              {
                required: false,
                message: "请输入联系电话",
                trigger: "blur"
              }
            ]
          },
          {
            label: "是否使用企业",
            prop: "isUse",
            hide: true,
            addDisplay: false,
            editDisplay: false,
            viewDisplay: false,
            type: "radio",
            dicData: [{ label: "是", value: 1 }, { label: "否", value: 0 }],
            value: 1,
            rules: [
              {
                required: true,
                message: "请输入是否使用企业",
                trigger: "blur"
              }
            ]
          },
          {
            label: "是否生产企业",
            prop: "isFacture",
            //hide: true,
            addDisplay: true,
            editDisplay: false,
            viewDisplay: false,
            type: "radio",
            dicData: [{ label: "是", value: 1 }, { label: "否", value: 0 }],
            value: 0,
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
            hide: true,
            addDisplay: false,
            editDisplay: false,
            viewDisplay: false,
            type: "radio",
            dicData: [{ label: "是", value: 1 }, { label: "否", value: 0 }],
            value: 0,
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
            hide: true,
            addDisplay: false,
            editDisplay: false,
            viewDisplay: false,
            type: "radio",
            dicData: [{ label: "是", value: 1 }, { label: "否", value: 0 }],
            value: 0,
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
            hide: true,
            addDisplay: false,
            editDisplay: false,
            viewDisplay: false,
            type: "radio",
            dicData: [{ label: "是", value: 1 }, { label: "否", value: 0 }],
            value: 0,
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
            hide: true,
            addDisplay: false,
            editDisplay: false,
            viewDisplay: false,
            type: "radio",
            dicData: [{ label: "是", value: 1 }, { label: "否", value: 0 }],
            value: 0,
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
            hide: true,
            addDisplay: false,
            editDisplay: false,
            viewDisplay: false,
            type: "radio",
            dicData: [{ label: "是", value: 1 }, { label: "否", value: 0 }],
            value: 0,
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
            hide: true,
            addDisplay: false,
            editDisplay: false,
            viewDisplay: false,
            type: "radio",
            dicData: [{ label: "是", value: 1 }, { label: "否", value: 0 }],
            value: 0,
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
      //console.log("nodeClick:" + data);
      this.treeAreaId = data.id;
      this.query.areaId_likeright = this.treeAreaId.replace(/(00+)$/g, "");
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
        getMaxCid("11").then(ret => {
          var data = ret.data.data;
          this.$refs.crud.value.cid = data;
          // const index2 = this.$refs.crud.findColumnIndex("cid");
          // this.option.column[index2].value = data;
          this.$refs.crud.option.column.filter(item => {
            if (item.prop === "cid") {
              item.value = data;
              //item.addDisabled = true;
            }
          });
        });
        this.$refs.crud.value.areaId = this.treeAreaId;
        this.$refs.crud.option.column.filter(item => {
          if (item.prop === "areaId") {
            item.value = this.treeAreaId;
            //item.addDisabled = true;
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
      this.query = { isUse: 1, areaId: "" };
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
.tree-style{
  max-height: 640px;
  overflow: auto;
}
</style>
