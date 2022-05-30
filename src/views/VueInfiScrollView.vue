<template>
  <div
    class="container"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="busy"
    infinite-scroll-distance="10"
  >
    <div class="content" v-for="(item,index) in shownlist" :key="index">
      <div style="width: 100%;height: 1rem;">{{item.id}}</div>
    </div>
    <div class="loading" v-show="busy">loading.....</div>
  </div>
</template>

<script>
import generageList from '@/mock/index';

export default {
  name: 'TableInfiScrollView',
  data() {
    return {
      dataSource: [],
      shownlist: [],
      busy: false,
      page: {
        pagination: 0,
        pageSize: 10,
      },
    };
  },
  created() {
    this.dataSource = generageList(100).data.list;
    this.appedToShownList(this.page.pagination, this.page.pageSize);
  },
  methods: {
    loadMore() {
      this.busy = true;
      console.log(`loading... ${new Date()}`);

      setTimeout(() => {
        console.log(`end... ${new Date()}`);
        this.appedToShownList(this.page.pagination, this.page.pageSize);
        this.busy = false;
      }, 500);
    },
    appedToShownList(pagination = 0, pageSize = 5) {
      const beginIndex = pagination * pageSize;
      const endIndex = beginIndex + pageSize;

      if (endIndex > this.dataSource.length) {
        const { data: { list } } = generageList(100, this.dataSource.length + 1);
        this.dataSource = [...this.dataSource, ...list];
      }
      const targetList = this.dataSource.slice(beginIndex, endIndex);

      targetList.forEach((item) => {
        this.shownlist.push(item);
      });
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
