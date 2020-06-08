<template>
  <div class="search-list-wrap">
    <div v-show="computedList.length"
         class="search-list">
      <div @click="selectStaff(item)"
           v-for="item in computedList"
           :key="item.id"
           class="staff-item">
        <div class="icon-check">
          <CheckBox :isChecked="item.checked" />
        </div>   
        <StaffItem :staff="item"
                   highLight
                   :keyword="keyword" />
      </div>
    </div>
    <div v-show="!computedList.length">
      <no-data-tips></no-data-tips>
    </div>
  </div>
</template>

<script>
function debounce(func, timeout) {
  var timeoutID = null
  return function() {
      clearTimeout(timeoutID)
      var args = arguments
      var that = this
      timeoutID = setTimeout(function() {
          func.apply(that, args)
      }, timeout)
  }
}
import StaffItem from "./staffItem.vue";
import CheckBox from "./checkBox.vue";
import noDataTips from "./noDataTips.vue";

export default {
  name: "SelectContactSearchList",
  components: {
    noDataTips,
    StaffItem,
    CheckBox
  },
  props: {
    keyword: {
      type: String,
      default() {
        return "";
      }
    },
    checkedList: {
      type: Array,
      default() {
        return [];
      }
    },
    // getSearchPeopleURL: {
    //   type: Function,
    //    default: (res) => {
    //     return res
    //   }
    // }
  },
  data() {
    return {
      list: []
    };
  },
  computed: {
    computedList() {
      const { checkedList, list } = this;
      const checkedIds = checkedList.map(item => item.id);
      return list.map(item => ({item,
        checked: checkedIds.includes(item.id)
      }));
    }
  },
  watch: {
    keyword(val) {
      console.log(val)
      this.searchStaff();
    }
  },
  methods: {
    searchStaff: debounce(function () {
      if (!this.keyword) {
        return;
      }
      const params = {
        userId: sessionStorage["staffId"],
        keyword: this.keyword,
        isNotLeft: 1,
        pageNum: 1,
        pageSize: 9999
      };
      this.getPeople(1, 9999)
    }, 600),
    async getPeople(num, total) {
      let params = {
        pageNum: num,
        pageSize: total,
        keyword: this.keyword
      };

      let result = await this.$config.getSearchPeople(params)
      if (result && result.data) {
        this.$nextTick(() => {
          this.list = result.data.data.data;
        });
      }
    },
    selectStaff(item) {
      this.$emit("toggleStaff", item);
    },
    handleBack() {
      this.$emit("cancel");
    },
    handleConfirm() {
      this.$emit("confirm");
    }
  }
};
</script>

<style lang="less" scoped>
.search-list {
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  top: 2.36rem;
  left: 0;
  right: 0;
  bottom: 0.96rem;
}
.staff-item {
  display: flex;
  align-items: center;
  margin:0 0.2rem;
  padding:0.2rem 0;
  justify-content: space-between;
  border-bottom: 0.01rem solid #e2e4ea;
  &:last-of-type {
    border-bottom: none;
  }
}
.search-footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0.88rem;
  line-height: 0.88rem;
  display: flex;
  justify-content: space-between;
  border-top: 0.01rem solid #e2e4ea;
  color: #666f83;
  font-size: 0.36rem;
  background: #ffffff;
  padding: 0 1.12rem;
  .confirm {
    color: #2f86f6;
    font-weight: bold;
  }
}
</style>