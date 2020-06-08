<template>
  <div>
    <div class="_company-list">
      <div @click="clickCompany(item)"
           class="list-item"
           v-for="item in companyList"
           :key="item.id">{{item.compName}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectContactCompany",
  data() {
    return {
      companyList: [],
      userComp: []
    };
  },
  mounted() {
    this.getCompany()
  },
  methods: {
    async getCompany() {
      let params = {};
      let result = await this.$config.getCompanys(params);
      console.log(result, "-222-测试，getCompanys接口--")
      if (result.data.code == 10200 && result.data.data) {
        let companys = result.data.data.map(item => {
          return {
            compId: item.id,
            compName: item.name
          }
        })
        this.companyList = companys;
      }
    },
    clickCompany(item) {
      this.$emit("select", item);
    }
  }
};
</script>

<style lang="less" scoped>
._company-list {
  padding:0 0.2rem;
  height: calc(100vh - 1.64rem);
  overflow-y: auto;
  .list-item {
    color: #111a34;
    font-size: 0.32rem;
    height: 0.8rem;
    line-height: 0.8rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    border-bottom: 0.01rem solid #e2e4ea;
  }
}
</style>