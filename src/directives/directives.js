/* eslint-disable func-names */
const eltableLoad = {
  bind: (el, binding) => {
    const selectWrap = el.querySelector('.el-table__body-wrapper');

    selectWrap.addEventListener('scroll', function () {
      if (this.scrollHeight - this.scrollTop <= this.clientHeight) {
        binding.value();
      }
    });
  },
};

const eltableVirtualScroll = {
  bind: (el) => {
    const selectWrap = el.querySelector('.el-table__body-wrapper');

    selectWrap.addEventListener('scroll', function () {
      console.log('virtual scroll', el);
      console.log(this.scrollTop);
    });
  },
};

export { eltableLoad, eltableVirtualScroll };
