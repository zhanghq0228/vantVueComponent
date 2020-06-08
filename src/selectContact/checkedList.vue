<template>
  <div>
    <div v-show="checkedList.length"
         class="checked-list">
      <div @click="uncheck(item)"
           class="checked-item"
           v-for="item in checkedList"
           :key="item.id">
        <StaffItem :staff="item" />
      </div>
    </div>
    <no-data-tips v-show="!checkedList.length" />
    <div class="checked-footer">
      <div v-show="checkedList.length"
           @click="clearAll"
           class="clear-btn">清除</div>
      <div @click="handleClose"
           class="close-btn">确定</div>
    </div>
  </div>
</template>

<script>
import StaffItem from "./staffItem.vue";
import NoDataTips from "./noDataTips.vue";

export default {
  name: "SelectContactCheckedList",
  components: {
    NoDataTips,
    StaffItem
  },
  props: {
    checkedList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    uncheck(item) {
      this.$emit("uncheck", item);
    },
    handleClose() {
      this.$emit("close");
    },
    clearAll() {
      this.$emit("clearAll");
    }
  }
};
</script>

<style lang="less" scoped>
.checked-list {
  height: calc(100vh - 140px);
  overflow-y: auto;
  padding-bottom: 88px;
}

.icon-clear {
  width: 40px;
  height: 40px;
}

.checked-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 32px;
}

.checked-footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 88px;
  line-height: 88px;
  font-size: 36px;
  border-top: 1px solid #e2e4ea;
  background: #ffffff;
  text-align: center;
  display: flex;
  justify-content: space-between;

  .clear-btn {
    color: #ff575d;
    flex: 1;
  }

  .close-btn {
    color: #2f86f6;
    flex: 1;
  }
}
</style>