<template>
<!-- .passive 会告诉浏览器你不想阻止事件的默认行为,以提高性能 -->
  <div class="container" ref="container" @scroll.passive="handleScroll">
    <div class="content" v-for="(item, index) in shownList" :key="index">
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
      dataSource: [], // 数据源
      itemHeight: 80, // 列表每项内容的高度
      maxVolume: 0, //  容器的最大容积
      beginIndex: 0, // 当前滚动的第一个元素索引
    };
  },
  computed: {
    // 当前滚动的最后一个元素索引
    endIndex() {
      let endIndex = this.beginIndex + this.maxVolume;
      if (!this.dataSource[endIndex]) {
        endIndex = this.dataSource.length - 1;
      }
      return endIndex;
    },
    // 列表中要展示的元素集合
    shownList() {
      return this.dataSource.slice(this.beginIndex, this.endIndex);
    },
  },
  created() {
    this.dataSource = generageList(1000).data;
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
    // 滚动行为事件,记录滚动的第一个元素索引
    handleScroll() {
      this.beginIndex = Math.floor(this.$refs.container.scrollTop / this.itemHeight);
      console.log('benginIndex', this.beginIndex);
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
