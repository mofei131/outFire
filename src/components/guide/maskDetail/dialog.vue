<template>
  <el-dialog :visible="show">
    aa
  </el-dialog>
</template>

<script>
  export default {
    props: {
      value: {
        type: Boolean,
        required: true
      }
    },
    computed: {
      show: {
        get(){
          return this.value
        },
        set() {
          this.$emit('input', false)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>