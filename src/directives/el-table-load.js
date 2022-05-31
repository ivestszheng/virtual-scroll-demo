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

export default eltableLoad;
