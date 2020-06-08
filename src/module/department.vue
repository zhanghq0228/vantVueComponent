<template>
  <div>
    <van-checkbox-group v-model="department.groupChecked">
      <van-cell v-for="(item) in departmentList" class="cell_list" :key="item.id">
        <van-checkbox :name="item.id" ref="checkboxes" checked-color="#07c160" class="checkbox" @click="toggleDepartment(item)">{{ item.departName }}</van-checkbox>
        <i class="next" @click="$emit('on-select-department', item)">下级</i>
      </van-cell>
    </van-checkbox-group>
  </div>
</template>

<script>

export default {
  name: 'department',
  data() {
    return {
      department: {
        groupChecked: []
      }
    }
  },
  props: {
    departmentList: {
      type: Array
    }
  },
  methods: {
    toggleDepartment(index, item) {
      let result = this.department.groupChecked
			const arr = []
			this.departmentList.map(item => {
				result.map(ritem => {
					if (item.id === ritem) {
						arr.push(item)
						return arr
					}
				})
			})
      console.log(item, 'plugin')
      this.$emit('on-toggle-department', arr);
    }
  }
}
</script>

<style lang="less" scoped>
.next {
  width: 1.4rem;
  height: 0.6rem;
  padding-left: 0.5rem;
  position: absolute;
  right: 0;
  top: 13%;
  background: url('../img/next.png') no-repeat left top;
  background-size: 0.44rem;
  display: block;
  font-style: normal;
  font-size: 0.3rem;
  line-height: 0.5rem;
}
.cell_list {
  padding: 0;
}
.van-cell__value {
 position: relative;
}
.van-checkbox {
  display: inline;
}
</style>