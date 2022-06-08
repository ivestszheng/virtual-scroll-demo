<template>
  <!-- .passive 会告诉浏览器你不想阻止事件的默认行为,以提高性能 -->
  <div class="container" ref="container" @scroll.passive="handleScroll">
    <!-- 注意：增加 padding 需要给列表再包一层，不能直接加在容器上，避免改变容器的 clientHeight -->
    <div :style="blankFilledStyle" class="group">
      <div class="item" v-for="(item, index) in shownList" :key="index">
        <div>{{ item.id }}</div>
        <div>{{ item.title }}</div>
        <div>{{ item.readTimes }}</div>
        <div>{{ item.source }}</div>
        <div>{{ item.date }}</div>
      </div>
      <div class="loading" v-show="isBusy">loading.....</div>
    </div>
  </div>
</template>

<script>
// import { generageList } from '@/mock/index';
import { findByPagination2 } from '@/mock/index';

export default {
  name: 'MyOwnVirtualScrollerView',
  data() {
    return {
      dataSource: [], // 数据源
      itemHeight: 50, // 列表每项内容的高度
      maxVolume: 0, //  容器的最大容积
      beginIndex: 0, // 当前滚动的第一个元素索引
      page: {
        pagination: 0,
        pageSize: 20,
      },
      isBusy: false, // 是否在请求数据
      isScrolling: false, // 是否正在滚动
      scrollTop: 0, // 记录滚动后距离顶部的距离
    };
  },
  // 被 keep-alive 缓存的组件激活时调用
  activated() {
    console.log('scrollTop', this.scrollTop);
    this.$nextTick(() => {
      this.$refs.container.scrollTop = this.scrollTop;
    });
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
      let beginIndex = 0;
      beginIndex = this.beginIndex <= this.maxVolume ? 0 : this.beginIndex - this.maxVolume;
      // return this.dataSource.slice(this.beginIndex, this.endIndex + 1);
      return this.dataSource.slice(beginIndex, this.endIndex + 1);
    },
    // 计算上下空白占位高度样式
    blankFilledStyle() {
      let beginIndex = 0;
      beginIndex = this.beginIndex <= this.maxVolume ? 0 : this.beginIndex - this.maxVolume;

      return {
        paddingTop: `${beginIndex * this.itemHeight}px`,
        paddingBottom: `${(this.dataSource.length - this.endIndex - 1) * this.itemHeight}px`,
      };
    },
  },
  created() {
    // this.dataSource = generageList(20).data;
    this.addItemsToDataSource();
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
    },
    // 滚动行为事件,记录滚动的第一个元素索引
    handleScroll() {
      if (!this.isScrolling) {
        this.isScrolling = true;
        // 时间间隔 30 ms,比较合适，太大会有很明显的白屏
        const scrollerTimer = setTimeout(() => {
          this.isScrolling = false;
          clearTimeout(scrollerTimer);
        }, 30);
        console.log('触发滚动事件');

        this.setDataBeginIndex();
      }
    },
    // 执行数据设置的相关任务，滚动事件的具体行为
    setDataBeginIndex() {
      this.scrollTop = this.$refs.container.scrollTop;
      this.beginIndex = Math.floor(this.$refs.container.scrollTop / this.itemHeight);
      if (this.beginIndex + this.maxVolume > this.dataSource.length - 1 && !this.isBusy) {
        console.log('滚动到底部了');
        // 追加请求新的数据
        this.isBusy = true;
        // setTimeout 模拟异步,本来想直接在 mockjs 直接返回 promise 的,但是好像不行
        setTimeout(() => {
          this.addItemsToDataSource();
          this.isBusy = false;
        }, 500);
      }
    },
    addItemsToDataSource() {
      const { data: { list } } = findByPagination2(this.page.pagination, this.page.pageSize);
      this.dataSource = [...this.dataSource, ...list];
      this.page.pagination += 1;
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  height: 500px;
  box-sizing: border-box;
  border: 1px solid gray;
  width: 600px;
  margin: 0 auto;
  overflow-y: auto;
}
.item {
  border: 1px solid orange;
  width: 80%;
  margin: 0 auto;
  height: auto;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
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
