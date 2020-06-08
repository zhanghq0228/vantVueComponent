<template>
  <div class="breadcrumb-wrap">
    <div @click="clickBreadcrumb(item)"
         v-for="item in breadcrumbList"
         :key="item.id"
         class="link">
      <div class="label">{{item.label}}</div>
      <van-icon class="separator"
                name="arrow"
                size="14" />
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectContactBreadcrumb",
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    breadcrumbList() {
      return [
        {
          label: "联系人",
          value: "contact",
          type: "contact"
        },
        ...this.list
      ];
    }
  },
  methods: {
    clickBreadcrumb(item) {
      this.$emit("click", item);
    }
  }
};
</script>

<style lang="less" scoped>
.breadcrumb-wrap {
  display: flex;
  align-items: center;
  overflow-x: auto;
  padding:0 0.2rem 0.15rem;
}
.link {
  display: flex;
  align-items: center;
  color: #858b9c;
  font-size: 0.28rem;
  line-height: 0.16rem;
  .label {
    flex: 1;
    white-space: nowrap;
  }
  &:first-of-type {
    color: #5878b4;
  }
  &:last-of-type {
    .separator {
      display: none;
    }
  }
}
.separator {
  margin: 0 0.08rem;
}
</style>