<template>
  <div>
    <van-checkbox-group v-model="staff.groupChecked">
        <van-cell v-for="(item,index) in staffList" class="cell_list" :key="item.id" @click="toggleStaff(index, item)">
          <van-checkbox 
                       :name="item.id" 
                       ref="staffCheckbox" 
                       checked-color="#07c160" class="checkbox">
            <StaffItem v-if="staffInfo" :staff="item" />
            <span else>{{item.userName}}</span>
          </van-checkbox>
        </van-cell>
      </van-checkbox-group>
  </div>
</template>

<script>

import StaffItem from "./staffItem.vue";
export default {
  name: 'staff',
  components: {
    StaffItem
  },
  data() {
    return{
      staff: {
        groupChecked: []
      }
    }
  },
  props: {
    staffList: {
      type: Array
    },
    staffInfo: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleStaff(index, item) {
      this.$refs.staffCheckbox[index].toggle();
      this.$emit('toggleStaff', item);
    }
  }
}
</script>