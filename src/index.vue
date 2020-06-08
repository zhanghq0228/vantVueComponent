<template>
  <div>
    
    <van-popup :value="value"
               @close="closeDrawer"
               @click-overlay="closeDrawer"
               position="right"
               class="drawer-wrap"
               :style="{height: '100%', width: '100%'}">
      <div class="contact-drawer">
        <div class="nav-bar-pop">
          <i @click="closeDrawer" class="back">取消</i>
          <span class="pop-txt">{{title}}</span>
          <i class="submit" @click="submitContact">确定</i>
        </div>
        <span @click="test">测试 config</span>
        <SearchInput v-show="isShowSearchInput"
                     v-model="keyword"
                     class="search-wrap" />
        <SearchList v-show="isSearchMode"
                    @toggleStaff="toggleStaff"
                    @cancel="searchListCancel"
                    @confirm="submitContact"
                    :checkedList="checkedList"
                    :keyword="keyword"/>
        <CheckedList v-show="isCheckedListMode"
                     @uncheck="handleUncheckStaff"
                     @clearAll="clearAllCheckedList"
                     @close="closeUncheckStaff"
                     :checkedList="checkedList" />
        <Company v-show="isCompanyMode"
                 @select="handleSelectCompany"/>
        <div v-show="isDepartmentMode">
          <Breadcrumb @click="changeBreadcrumb"
                      :list="breadcrumbList" />
          <Department class="content"
                      @selectDepartment="handleSelectDepartment"
                      @toggleStaff="toggleStaff"
                      @staffSelectAll="staffSelectAll"
                      :checkedList="checkedList"
                      :companyId="currentCompany.compId"
                      :departmentId="currentDepartment.id"
                      :isCheckedbtn="checkedbtn" />
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Breadcrumb from "./selectContact/breadcrumb.vue";
import SearchInput from "./selectContact/searchInput.vue";
import SearchList from "./selectContact/searchList.vue";
import CheckedList from "./selectContact/checkedList.vue";
import Company from "./selectContact/company.vue";
import Department from "./selectContact/departmentList.vue";

export default {
  name: "SelectContact",
  components: {
    Breadcrumb,
    SearchInput,
    SearchList,
    CheckedList,
    Company,
    Department
  },
  props: {
    title: {
      type: String,
      default() {
        return "选择人员";
      }
    },
    max: {
      type: Number,
      default() {
        return 200;
      }
    },
    value: {
      type: Boolean,
      default() {
        return false;
      }
    },

    checked: {                 // 已选列表
      type: Array,
      default() {
        return [];
      }
    },

    checkedbtn: {
      type: Boolean,
      default() {
        return true
      }
    },
  },
  watch: {
    checked(val) {
      if (val) {
        this.checkedList = [...val];
      }
    }
  },
  data() {
    return {
      keyword: "",
      isShowFooter2: true,
      isCheckedListMode: false,
      currentCompany: {},
      currentDepartment: {},
      breadcrumbList: [],
      checkedList: []
    };
  },
  computed: {
    isShowSearchInput() {
      return !this.isCheckedListMode;
    },
    isSearchMode() {
      return !!this.keyword && !this.isCheckedListMode;
    },
    isDepartmentMode() {
      return (
        this.currentCompany.compId &&
        !this.isSearchMode &&
        !this.isCheckedListMode
      );
    },
    isCompanyMode() {
      return (
        !this.currentCompany.compId &&
        !this.isCheckedListMode &&
        !this.isSearchMode
      );
    },
    isShowFooter() {
      return this.isDepartmentMode || this.isCompanyMode || this.isSearchMode;
    }
  },
  mounted() {
    this.checkedList = [...this.checked];
    console.log('测试 config 数据', this.$config)
  },
  methods: {
    test() {
      console.log(this.$config, "测试  test");
      this.$config.getSearchPeople({
        pageNum: 1,
        pageSize: 999,
        keyword: '李'
      }).then(res =>{
        console.log(res, "request")
      })
    },
    handleSelectCompany(company) {
      this.breadcrumbList.push({
        label: company.compName,
        value: company.compId,
        type: "company"
      });
      this.currentCompany = company;
    },
    changeBreadcrumb(breadcrumb) {
      const { type, value } = breadcrumb;
      const targetindex = this.breadcrumbList.findIndex(
        item => item.value === value
      );
      this.breadcrumbList = this.breadcrumbList.filter(
        (item, currentIndex) => currentIndex <= targetindex
      );
      if (type === "contact") {
        this.currentCompany = {};
        this.currentDepartment = {};
      } else if (type === "company") {
        this.currentDepartment = {};
      } else {
        this.currentDepartment = { id: value };
      }
    },
    handleSelectDepartment(department) {
      this.breadcrumbList.push({
        label: department.departName,
        value: department.id,
        type: "department"
      });
      this.currentDepartment = department;
    },
    toggleStaff(item) {
      const targeIndex = this.checkedList.findIndex(
        checked => checked.userId === item.userId
      );
      if (targeIndex > -1) {
        this.checkedList.splice(targeIndex, 1);
      } else {
        this.checkedList.push(item);
      }
    },
    staffSelectAll({ type, payload: list }) {
      this.checkedList = list;
    },
    handleUncheckStaff(staff) {
      this.checkedList = this.checkedList.filter(item => item.userId !== staff.userId);
    },
    closeUncheckStaff() {
      this.isCheckedListMode = false;
      this.submitContact();
    },
    clearAllCheckedList() {
      this.$dialog
        .confirm({
          message: "删除所有选项"
        })
        .then(() => {
          this.checkedList = [];
          this.closeUncheckStaff();
        });
    },
    searchListCancel() {
      this.keyword = "";
    },
    handleOpenChecked() {
      // this.keyword = "";
      this.isCheckedListMode = true;
    },
    closeDrawer() {
      this.$emit("handler-close", false);
    },
    submitContact() {
      if (this.checkedList.length > this.max) {
        this.$toast("最多可以选择200人");
        return;
      }
      this.$emit("handler-submit", [...this.checkedList]);
      this.closeDrawer();
    }
  }
};
</script>

<style lang="less" scoped>
.drawer-wrap {
  background: #ffffff;
}
.contact-drawer {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  background: #ffffff;
  z-index: 999;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.title {
  color: #393939;
  font-size: 0.36rem;
  font-weight: bold;
  margin: 0 0 0.28rem 0.16rem;
}
.search-wrap {
  margin-bottom: 0.24rem;
}
.content {
  overflow-y: auto;
}
.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}

.nav-bar-pop {
  display: flex;
  justify-content: space-between;
  height: 0.96rem;
  align-items: center;
  font-size: 0.36rem;
  border-bottom: 0.01rem solid #eee;
  background: #fff;
  .pop-txt {
    flex:2;
    text-align: center;
  }
  .back {
    width:0.7rem;
    height: 0.5rem;
    flex: 1;
    margin-left: 0.45rem;
    color:#9EABBE;
    font-style:normal;
    font-size:0.32rem;
    .back-ico {
      width: 0.2rem;
    }
  }
  .submit {
    width:0.5rem;
    height:0.5rem;
    flex:1;
    color:#485FDA;
    font-size:0.32rem;
    font-style:normal;
    text-align: right;
    margin-right: 0.32rem;
  }
}
</style>