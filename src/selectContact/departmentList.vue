<template>
  <div class="list">
    <div v-show="isShowSelectAllButton"         
         class="select-all">
      <div @click="toggleSelectAll" class="all-item">   
        <CheckBox :isChecked="isSelectAll" />  
        <div class="all-txt">全选</div>
      </div>
    </div>
    
    <div class="department-item"
         v-for="item in computedDepartmentList"
         :key="item.id">
      <div class="items" @click="toggleDepartment(item.id)">
        <CheckBox :isChecked="item.checked" />
        <DepartmentItem :department="item" />
      </div>
      <div class="item_right" @click="selectDepartment(item)">
        <i class="next">下级</i>
      </div>
    </div>
    <div>
      <div @click="selectStaff(item)"
           v-for="item in computedStaffList "
           :key="item.id"
           class="staff-item">
        <CheckBox :isChecked="item.checked" />
        <StaffItem :staff="item" />
      </div>
    </div>
  </div>
</template>

<script>

import DepartmentItem from "./departmentItem.vue";
import StaffItem from "./staffItem.vue";
import CheckBox from "./checkBox.vue";

export default {
  name: "SelectContactDepartmentList",
  components: { CheckBox, DepartmentItem, StaffItem },
  props: {
    isCheckedbtn: {
      type: Boolean,
      default() {
        return true
      }
    },
    companyId: {
      type: String,
      default() {
        return "";
      }
    },
    departmentId: {
      type: String,
      default() {
        return "";
      }
    },
    checkedList: {                    // 已选人员列表
      type: Array,
      default() {
        return [];
      }
    },
    API: {
      type: Object
    },
  },
  data() {
    return {
      isSelectAll: false,
      departmentList: [],
      checkedDepartmentList: [],
      checkedStaffList: [],
      staffList: []
    };
  },
  computed: {
    isShowSelectAllButton() {
      return (
        this.computedStaffList.length || this.computedDepartmentList.length
      );
    },
    computedDepartmentList() {
      const { checkedDepartmentList, departmentList } = this;
      const idChecked = [];
      const newList = [];
      const list = departmentList.map(item => {
        if (checkedDepartmentList.includes(item.id)) {
          idChecked.push(item.id); // 记录已选
        }
        newList.push({
          item,
          checked: checkedDepartmentList.includes(item.id)    // 检索已选部门是否包含部门列表项，是-则勾
        })
      })
      
      if (departmentList.length >0) { // 当部门列表有数据时
        if (idChecked.length != departmentList.length) { // 已选列表等于部门列表时把全选勾上
          this.isSelectAll = false;
        } else {
          this.isSelectAll = true;
        }
      }

      return newList;
    },
    computedStaffList() {
      const { checkedStaffList, staffList } = this;

      const checkedIds = checkedStaffList.map(item => item.userId);

      const idChecked = [];
      const newList = [];
      
      const list = staffList.map(item => {
        if (checkedIds.includes(item.userId)) {
          idChecked.push(item.userId);
        }
        newList.push({
          item,
          checked: checkedIds.includes(item.userId)
        })
      })

      if (staffList.length >0) {
        if (idChecked.length != staffList.length) {
          this.isSelectAll = false;
        } else {
          this.isSelectAll = true;
        }
      }

      return newList;
    }
  },
  watch: {
    companyId(val) {
      console.log(val, "index ompanyId")
      this.fetchPageData();
    },
    departmentId() {
      this.fetchPageData();
    },
    checkedList(val) {
      if (!val.length) {
        this.checkedDepartmentList = [];
      }
      this.checkedStaffList = val;
    }
  },
  mounted() {
    this.fetchPageData();
  },
  methods: {
    /**
     * 部门切换
     */
    toggleDepartment(id) {
      const targetIndex = this.checkedDepartmentList.indexOf(id);
      if (targetIndex > -1) {
        // 已存在
        this.checkedDepartmentList.splice(targetIndex, 1);
      } else {
        this.checkedDepartmentList.push(id);
      }

      this.getInfo(this.checkedDepartmentList).then(staffList => {
        const type = targetIndex > -1 ? "cancle" : "select";
        this.emitToggleSelectAll({
          type,
          payload: staffList
        });
      });
    },
    async getInfo(departmentIds = []) {
      const params = {
        departmentIds: departmentIds
      };
      const resultList = await this.$config.getAllDepartmentInfo(params)
        .then(res => {
          if (res.data.code !== 10200) {
            Toast(res.data.message);
            return [];
          }
          const staffList = res.data.data;
          return staffList;
        })
        .catch(() => {
          return [];
        });
      return resultList;
    },
    /**
     * 全选切换
     */
    toggleSelectAll() {
      // 设置部门已选
      this.checkedDepartmentList = [];

      let departmentIds =[...this.departmentList.map(item => item.id)];
      departmentIds = this.departmentId ? [...this.departmentList.map(item => item.id),this.departmentId] : departmentIds;

      this.isSelectAll = !this.isSelectAll;
      if (this.isSelectAll) {
        this.checkedDepartmentList = Array.from([
          ...this.checkedDepartmentList,
          ...departmentIds
        ]);
      } else {
        departmentIds = [];
        this.checkedStaffList = [];
      }
      this.getInfo(this.checkedDepartmentList).then(staffList => {
        const type = this.isSelectAll ? "select" : "cancle";
        this.emitToggleSelectAll({
          type,
          payload: staffList
        });
      });
    },

    /**
     * 部门选择、全选切换数据传输
     */
    emitToggleSelectAll({ type, payload }) {
      this.$emit("staffSelectAll", {
        type,
        payload
      });
    },

    /**
     * 部门&人员面包屑切换时并行请求
     */
    fetchPageData() {
      this.fetchDepartmentList();
      this.fetchStaffList();
    },
    /**
     * 部门数据请求
     */
    fetchDepartmentList() {
      const { companyId, departmentId } = this;
      if (!companyId) {
        return;
      }
      const departmentParams = {
        compId: companyId,
        parentId: departmentId
      };
      console.log(departmentParams, "departmentParams");
      this.$config.getDepartmentTree(departmentParams).then(res => {
        if (res.data.code !== 10200) {
          Toast(res.data.message);
          return;
        }
        
        if (!res.data.data.length) {
          this.departmentList = [];
          return;
        };
        const filterDepartment = [];
        res.data.data.map(item => {
          if (item.total > 0) {
            filterDepartment.push(item)
          }
        });
        this.departmentList = filterDepartment;
        this.staffAllCheckedToDepartment(this.departmentList);
      });
      
    },

    /**
     * 人员全部勾选回到部门列表，当前部门勾上
     * @param: {Array} 部门列表数据
     */
    staffAllCheckedToDepartment(department) {
      const checkedStaffList = this.checkedStaffList;
      
      if(this.checkedStaffList && this.checkedStaffList.length) {
        department.map(item =>{
          const arr = [];
          checkedStaffList.map(staff =>{
            if (staff.departmentId === item.id) {  // 直接点“下级”（部门没勾上），把全部成员勾上时，又回到部门
              arr.push(staff.departmentId);
            }
          });
          
          if(arr.length === item.total) {            
            return this.checkedDepartmentList.push(item.id);
          } else {
            const targeIndex = this.checkedDepartmentList.findIndex(checked => checked === arr[0]);
            return this.checkedDepartmentList.splice(targeIndex, 1);
          }
        });
      }
    },

    /**
     * 成员列表请求
     */
    fetchStaffList() {
      const { companyId, departmentId } = this;
      if (!companyId) {
        return;
      }
      
      const staffParams = {
        compId: companyId,
        departmentId: departmentId,
        isNotLeft: 1,
        pageSize: 150
      };
      this.sortDepartmentStaffInfo(staffParams).then(res => {
        if (res.data.code !== 10200) {
          Toast(res.data.message);
          return;
        }
        this.staffList = res.data.data.data;
      });
    },

    /**
     * 部门选择切换
     */
    selectDepartment(item) {
      this.isSelectAll = item.checked;
      this.$emit("selectDepartment", item);
    },

    /**
     * 成员选择切换
     */
    selectStaff(item) {
      this.$emit("toggleStaff", item);
    }

  }
};
</script>

<style lang="less" scoped>
.all-item {
  display: flex;
}
.staff-item,
.department-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  border-bottom: 0.01rem solid #e2e4ea;
  .items {
    flex: 1;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-right: 32px;
    &:last-of-type {
      border-bottom: none;
    }
  }
}
.staff-item {
  padding:0.2rem 0;
}
.select-all {
  display: flex;
  align-items: center;
  padding: 0.2rem 0;
  color: #111a34;
  font-size: 0.32rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  border-bottom: 1px solid #e2e4ea;
  .all-txt {
    margin-left: 0.2rem;
  }
}
.list {
  padding:0 0.2rem;
}
.item_right{
  text-align: right;
  color: #5878B4;  
}
.next{
  display: inline-block;
  padding-left: 0.5rem;
  height: 0.6rem;
  background: url('../img/next.png') no-repeat left center;
  background-size: 0.44rem;
  font-style: normal;
  font-size: 0.3rem;
  line-height: 0.6rem;
}
.icon-check {
  margin-top:-0.05rem;
}
</style>