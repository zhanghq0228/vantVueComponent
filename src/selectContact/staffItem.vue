<template>
  <div class="user-item">
    <img :src="staff.avatar || defaultAvatar" class="avatar" />
    <div class="user-info">
      <div class="name" v-html="userNameHtml"></div>
      <div
        class="position"
      >
      {{staff.departmentName}}{{staff.positionName?"-"+staff.positionName:''}} {{staff.phoneNumber}}</div>
    </div>
  </div>
</template>

<script>
import defaultAvatar from "../img/people_role.png"
export default {
  name: "SelectContactStaff",
  props: {
    staff: {
      type: Object,
      default() {
        return {};
      }
    },
    highLight: {
      type: Boolean,
      default() {
        return false;
      }
    },
    keyword: {
      type: String,
      default() {
        return "";
      }
    }
  },
  data() {
    return {
      defaultAvatar
    };
  },
  computed: {
    userNameHtml() {
      const { staff, highLight, keyword } = this;
      let name = staff.userName || "";
      if (highLight && keyword) {
        // 匹配关键字正则
        const replaceReg = new RegExp(keyword, "g");
        // 高亮替换v-html值
        const replaceString = `<span style="color: #EF8860">${keyword}</span>`;
        // 开始替换
        name = name.replace(replaceReg, replaceString);
      }
      return name;
    }
  }
};
</script>

<style lang="less" scoped>
.user-item {
  display: flex;
  padding-left:0.2rem;
  align-items: center;
  width: 100%;
}
.avatar {
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 0.2rem;
  border-radius: 50%;
}
.user-info {
  max-width: 3.6rem;
}
.name {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.name {
  color: #111a34;
  font-size: 0.32rem;
  height: 0.44rem;
  line-height: 0.44rem;
}
.position {
  color: #858b9c;
  font-size: 0.24rem;
  height: 0.34rem;
  line-height: 0.34rem;
}
</style>