/* eslint-disable func-names */
import Vue from 'vue';

Vue.directive('elTableLoad', {
  bind: (el, binding) => {
    const selectWrap = el.querySelector('.el-table__body-wrapper');

    selectWrap.addEventListener('scroll', function () {
      if (this.scrollHeight - this.scrollTop <= this.clientHeight) {
        binding.value();
      }
    });
  },
});
