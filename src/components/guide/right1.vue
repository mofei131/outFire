<template>
  <div class="right1Page">
    <dv-border-box-8 class="right1Border">
      <dv-capsule-chart :config="config" style="height:30vh" />
    </dv-border-box-8>
  </div>
</template>

<script>
export default {
  data() {
    return {
      config: {
        data: [
          {
            id: 1,
            name: "乌鲁木齐",
            value: 100
          },
          {
            id: 2,
            name: "阿克苏",
            value: 200
          },
          {
            id: 3,
            name: "阿勒泰",
            value: 100
          },
          {
            id: 4,
            name: "昌吉",
            value: 200
          },
          {
            id: 5,
            name: "克拉玛依",
            value: 50
          },
          {
            id: 6,
            name: "石河子",
            value: 100
          },
          {
            id: 7,
            name: "库尔勒",
            value: 200
          },
          {
            id: 8,
            name: "伊犁",
            value: 100
          },
          {
            id: 9,
            name: "塔城",
            value: 200
          },
          {
            id: 10,
            name: "喀什",
            value: 50
          }
        ]
      }
    };
  },
  components: {}
};
</script>

<style scoped >
.right1Page {
  /* padding: 10px; */
}

.right1Border {
}
</style>
