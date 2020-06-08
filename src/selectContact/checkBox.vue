<template>
  <div class="rbox">
    <div v-show="!isChecked"
         class="uncheck"></div>
    <van-icon v-show="isChecked"
              name="checked"
              size="20px"
              color="#4FC6A4" />
  </div>
</template>

<script>
export default {
  name: "SelectContactCheckBox",
  props: {
    isChecked: {
      type: Boolean,
      default() {
        return false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.rbox{
  width: 0.4rem;
  height: 0.4rem;
}
.uncheck {
  width: 0.4rem;
  height: 0.4rem;
  border: 1px solid #c5cad5;
  box-sizing: border-box;
  border-radius: 50%;
}
</style>