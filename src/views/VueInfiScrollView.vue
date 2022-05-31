<template>
  <div
    class="container"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="isBusy"
    infinite-scroll-distance="10"
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
  name: 'VueInfiScrollView',
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
  margin: 0 auto 2% auto;
  height: 18%;
}
.loading {
  font-weight: bold;
  font-size: 20px;
  color: grey;
  text-align: center;
}
</style>
