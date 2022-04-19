<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
  watch: {},
  created() {

  },
  methods: {},
  computed: {}
};
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
/* 去掉百度地图log下的文字 */
.BMap_cpyCtrl {
   display: none;
 }
 /* 去掉百度地图log */
.anchorBL {
   display: none;
}

</style>
