<template>
  <div class="VueFab">
    <vue-fab icon="add"
      titleColor="#666"
      fabItemAnimate="default"
      mainBtnColor="#16C2C2">
      <fab-item @clickItem="clickItem" icon="done" :idx="0" title="跳转1">
      </fab-item>
      <fab-item @clickItem="clickItem" icon="toc" :idx="1" title="跳转2">
      </fab-item>
      <fab-item @clickItem="clickItem" icon="add" :idx="2" title="跳转3">
      </fab-item>
    </vue-fab>
  </div>
</template>
<script>
  export default{
    data(){
      return{

      }
    },
    methods: {
      clickItem(item){
        // this.$router.push('/login')
      }
    }
  }
</script>
<style lang="scss" scoped>
.fab-main-container{
  position: fixed;
  right: 7% !important;
  z-index: 9999;
  bottom: 7% !important;
  overflow: initial;
  box-sizing: border-box;
}
</style>
