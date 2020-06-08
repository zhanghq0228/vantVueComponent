<template>
  <div class="search-box">    
    <div class="search-input-wrap">
      <input :value="value"
            @input="$emit('input', $event.target.value)"
            @focus="hideF"
            @blur="showF"
            class="search-input" />
      <img src="../img/global_ic_search@2x.png"
          class="icon-search" />
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectContactSearchInput",
  props: ["value"],
  mounted() {

  },
  methods: {
    hideF() {
      // console.log(123)
      // this.$emit("hideFooter")
    },
    showF() {
      // console.log(456)
      // this.$emit("showFooter")
    }
  }
};
</script>

<style lang="less" scoped>
.search-input-wrap {
  box-sizing: border-box;
  width: 100%;
  position: relative;
  
}
.search-input {
  box-sizing: border-box;
  padding: 0.08rem 0.24rem 0.08rem 0.6rem;
  outline: none;
  -webkit-appearance: none;
  background: #f9fafb;
  border: 1px solid #c5cad5;
  border-radius: 0.08rem;
  height: 0.6rem;
  display: inline-block;
  width: 100%;
}
.icon-search {
  position: absolute;
  left: 0.24rem;
  top: 0.16rem;
  width: 0.26rem;
  height: 0.26rem;
}
.search-box {
  background:#f8f8f8;
  padding:0.2rem;
}

</style>