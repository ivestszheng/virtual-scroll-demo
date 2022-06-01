<template>
  <div class="container" ref="container">
    <div class="content" v-for="(item, index) in shownlist" :key="index">
      <div class="content-item">{{ item.id }}</div>
      <div class="content-item">{{ item.title }}</div>
      <div class="content-item">{{ item.readTimes }}</div>
      <div class="content-item">{{ item.source }}</div>
      <div class="content-item">{{ item.date }}</div>
    </div>
  </div>
</template>

<script>
import { generageList } from '@/mock/index';

export default {
  name: 'MyOwnVirtualScrollerView',
  data() {
    return {
      shownlist: [],
    };
  },
  created() {
    this.shownlist = generageList(1000).data;
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
  display: flex;
  align-items: center;
  justify-content: center;
  &-item {
    width: 100%;
  }
}
.loading {
  font-weight: bold;
  font-size: 20px;
  color: grey;
  text-align: center;
}
</style>
