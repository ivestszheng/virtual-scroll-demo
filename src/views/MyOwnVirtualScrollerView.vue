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
      itemHeight: 80, // 列表每项内容的高度
      maxVolume: 0, //  容器的最大容积
    };
  },
  created() {
    this.shownlist = generageList(1000).data;
  },
  mounted() {
    this.getMaxVolume();
    // 如果列表的高度并非固定，而是会随着当视口变化，需要增加监听事件
    // window.onresize = () => this.getMaxVolume();
    // window.orientationchange = () => this.getMaxVolume();
  },
  methods: {
    // 计算容器的最大容积
    getMaxVolume() {
      this.maxVolume = Math.floor(this.$refs.container.clientHeight / this.itemHeight) + 2;
      console.log(this.maxVolume);
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
  margin: 0 auto;
  height: 80px;
  box-sizing: border-box;
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
