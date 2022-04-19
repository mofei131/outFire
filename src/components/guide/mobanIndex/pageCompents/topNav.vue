<template>
  <div class="topNav">
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [{
        label: '菜单',
        children: [{
          label: '二级1'
        },{
          label: '二级2'
        },{
          label: '二级3'
        },{
          label: '二级4'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    }
  }
}
</script>
<style scoped lang="sass">
.topNav
  position: fixed
  left: 0px
  z-index: 100
  color: rgba(255,255,255,.5)
  .el-tree
    position: relative
    cursor: default
    background: #061436
    color: #f5f7fa
    .el-tree-node
      .el-tree-node__content:hover
        background-color: #061436
</style>
