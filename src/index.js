import Vue from 'vue';
import {Cell, Checkbox, CheckboxGroup, Toast} from 'vant';
Vue.use(Checkbox)
   .use(CheckboxGroup)
   .use(Cell)
   .use(Toast)


import DepartmentStaff from './index.vue'
const VueDepartmentStaff = {
  install: function (Vue, options = {}) {
    console.log(options, 'options 测试')
    Vue.prototype.$config = options;
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
    }
    Vue.component('VueDepartmentStaff', DepartmentStaff)
  }
}
export default VueDepartmentStaff;