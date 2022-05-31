/* eslint-disable prefer-arrow-callback */
const eltableVirtualScroller = {
  bind: (el) => {
    const selectWrap = el.querySelector('.el-table__body-wrapper');

    selectWrap.addEventListener('scroll', function () {
      console.log('virtual scroll', el);
      console.log(this.scrollTop);
    });
  },
};

export default eltableVirtualScroller;
