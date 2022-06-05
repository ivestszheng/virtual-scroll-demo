<template>
  <div
    class="container"
    ref="container"
  >
    <div class="content" v-for="(item,index) in shownlist" :key="index">
      <div style="width: 100%;height: 1rem;">{{item.id}}</div>
    </div>
    <div class="loading" v-show="isBusy">loading.....</div>
  </div>
</template>

<script>
import { findByPagination } from '@/mock/index';

export default {
  name: 'MyOwnInfiScrollerView',
  data() {
    return {
      shownlist: [],
      isBusy: false,
      page: {
        pagination: 0,
        pageSize: 5,
      },
    };
  },
  created() {
    this.appedToShownList(this.page.pagination, this.page.pageSize);
  },
  mounted() {
    const obj = this.$refs.container;
    const that = this;

    // eslint-disable-next-line func-names
    obj.addEventListener('scroll', function () {
      console.log('scrollHeight', this.scrollHeight);
      console.log('scrollTop', this.scrollTop);
      console.log('clientHeight', this.clientHeight);
      // 向下取整，解决chrome中scrollTop可以为小数的问题
      if (Math.floor(this.scrollHeight - this.scrollTop) === this.clientHeight
      && that.isBusy === false) {
        // isBusy 实现防抖
        console.log('到底部了');
        that.isBusy = true;

        setTimeout(() => {
          that.appedToShownList(that.page.pagination, that.page.pageSize);
          that.isBusy = false;
        }, 1000);
      }
    });
  },
  methods: {
    loadMore() {
      this.isBusy = true;
      console.log(`loading... ${new Date()}`);

      setTimeout(() => {
        console.log(`end... ${new Date()}`);
        this.appedToShownList(this.page.pagination, this.page.pageSize);
        this.isBusy = false;
      }, 500);
    },
    appedToShownList(pagination = 0, pageSize = 5) {
      const newData = findByPagination(pagination, pageSize).data.list;
      this.shownlist = [...this.shownlist, ...newData];
      this.page.pagination += 1;
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  height: 500px;
  border: 1px solid gray;
  width: 600px;
  margin: 0 auto;
  overflow: auto;
}
.content {
  border: 1px solid orange;
  width: 80%;
  margin: 0 auto 8.1px auto;
  height: 18%;
}
.loading {
  font-weight: bold;
  font-size: 20px;
  color: grey;
  text-align: center;
}
</style>
