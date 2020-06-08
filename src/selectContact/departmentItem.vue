<template>
  <div @click="clickDepartment"
       class="_department-item">
    <div class="lable">{{`${department.departName}(${department.total})`}}</div>
  </div>
</template>

<script>
export default {
  name: "SelectContactDepartmentItem",
  props: {
    department: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    clickDepartment() {
      this.$emit("click", this.department);
    }
  }
};
</script>

<style lang="less" scoped>
._department-item {
  color: #111a34;
  font-size: 0.32rem;
  width: 90%;
  .lable {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>