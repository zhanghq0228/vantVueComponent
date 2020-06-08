<template>
  <div class="search-pop">
    <van-search :placeholder="textSearch" background="#F8F8F8" v-model="search.value" @search="searchDepartmentTree" @input="changeInputDepartment" />
  </div>
</template>

<script>
export default {
  name: 'search',
  data() {
    return {
      search: {
        value: ''
      }
    }
  },
  props: {
    textSearch: {
      type: String,
      defalut: '请输入部门名称'
    }
  }
}
</script>

<style lang="less" scoped>
.search-pop{
  .van-search__content{
    background: #fff; 
    border-radius: 0.08rem;
  }
}
.search-pop {
  .van-search .van-cell {
    background: #fff;
    border-radius: 0.08rem;
  }
}
</style>