<template>
  <div class="maskFather">
    {{dialog2Data}}
    <component :is="currentView" :ChildData="dialog2Data"></component>
  </div>
</template>

<script>
import Child1 from "./maskChild/Child1";
import Child2 from "./maskChild/Child2";
import Child3 from "./maskChild/Child3";
import Child4 from "./maskChild/Child4";
import Child5 from "./maskChild/Child5.vue";


export default {
  data() {
    return {};
  },

  props: {
    dialog2Data: {
      type: Object,
      required: true
    }
  },
  components: {
    Child1,
    Child2,
    Child4,
    Child5
  },
  computed: {
    currentView() {
      const { id } = this.dialog2Data;
      switch (id) {
        case 1:
          return Child1;
        case 2:
          return Child2;
        case 3:
          return Child3;
        case 4:
          return Child4;
        case 5:
          return Child5;
      }
    }
  }
};
</script>

<style scoped>
</style>
