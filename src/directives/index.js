// import Vue from 'vue';

// Vue.directive('elTableLoad', {
//   bind: (el, binding) => {
//     const selectWrap = el.querySelector('.el-table__body-wrapper');

//     selectWrap.addEventListener('scroll', function () {
//       if (this.scrollHeight - this.scrollTop <= this.clientHeight) {
//         binding.value();
//       }
//     });
//   },
// });
import { eltableLoad, eltableVirtualScroll } from './directives';

const directives = {
  eltableLoad,
  eltableVirtualScroll,
};

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key]);
    });
  },
};
