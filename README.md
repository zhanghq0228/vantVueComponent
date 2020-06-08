# vue-department-staff

### Install
```
npm install vue-department-staff
```

### How to use
在 **main.js** 中引用如下
```
import Vue from 'vue';
import vueDepartmentStaff from 'vue-department-staff';
// 接口API
const apiRes = {
  getSearchPeople: 'aaa',
  getCompanys: 'bb',
  getDepartmentTree: 'ccc',
  sortDepartmentStaffInfo: 'vdd',
  getAllDepartmentInfo: 'rrrr'
};
Vue.use(vueDepartmentStaff, apiRes);
```

### 组件中使用
```
<VueDepartmentStaff 
          v-model="show" 
          :checked="selectList"
          @handler-close="" 
          @handler-submit="submitContact"/>
```

### 参数说明
**title**弹框标题<br />
**max**选人最大单位<br />
**checked**已选成员列表<br />

```
<VueDepartmentStaff 
          v-model="show"
          :title='测试'
          :checked="selectList"
          @handler-close="show = false" 
          @handler-submit="submitContact"/>
<script>
export default {
  data() {
    return {
      show: false,
      selectList: []
    }
  },
  methods: {
    /**
     * 已选人员确认，SelectContact组件数据传输
     * @params: {Array} data 已先人员
     */
    submitContact(data) {
      selectList = data;
    },
  }
}
</script>          
```