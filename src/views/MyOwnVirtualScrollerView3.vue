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
  name: 'MyOwnVirtualScrollerView3',
  data() {
    return {
      dataSource: [], // 数据源
      estimatedHeight: 40, // 列表每项内容的高度
      maxVolume: 0, //  容器的最大容积
      beginIndex: 0, // 当前滚动的第一个元素索引
      page: {
        pagination: 0,
        pageSize: 20,
      },
      isBusy: false, // 是否在请求数据
      isScrolling: false, // 是否正在滚动
      scrollTop: 0, // 记录滚动后距离顶部的距离
      positions: [], // 记录元素的位置
    };
  },
  // 被 keep-alive 缓存的组件激活时调用
  activated() {
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
      return this.dataSource.slice(this.beginIndex, this.endIndex + 1);
    },
    // 计算上下空白占位高度样式
    blankFilledStyle() {
      const beginOffset = this.beginIndex >= 1 ? this.positions[this.beginIndex - 1].bottom : 0;
      const paddingBottom = this.dataSource.length * this.estimatedHeight
- this.positions[this.endIndex].bottom;

      return {
        paddingTop: `${beginOffset}px`,
        paddingBottom: `${paddingBottom}px`,
      };
    },
    // 列表总高度
    listHeight() {
      return this.positions[this.positions.length - 1].bottom;
    },
  },
  created() {
    // this.dataSource = generageList(20).data;
    this.addItemsToDataSource(true);
  },
  mounted() {
    this.getMaxVolume();
  },
  methods: {
    // 计算容器的最大容积
    getMaxVolume() {
      this.maxVolume = Math.floor(this.$refs.container.clientHeight / this.estimatedHeight) + 2;
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
      this.beginIndex = this.getStartIndex(this.scrollTop);
      console.log('scrollTop', this.scrollTop);
      console.log('beiginIndex', this.beginIndex);
      console.log('positions', this.positions);
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
    addItemsToDataSource(isInit) {
      const { data: { list } } = findByPagination2(this.page.pagination, this.page.pageSize);
      this.dataSource = [...this.dataSource, ...list];
      this.addItemsToPositions(list, isInit);
      this.page.pagination += 1;
    },
    addItemsToPositions(list, isInit = false) {
      const items = list.map((item, index) => {
        const newIndex = isInit ? index : this.dataSource.length - this.page.pageSize + index;

        return {
          index: newIndex,
          height: this.estimatedHeight,
          top: newIndex * this.estimatedHeight,
          bottom: (newIndex + 1) * this.estimatedHeight,
        };
      });
      this.positions = [...this.positions, ...items];
    },
    // 获取列表起始索引
    getStartIndex(scrollTop = 0) {
      return this.binarySearch(this.positions, scrollTop);
    },
    // 二分法查找
    binarySearch(list, value) {
      let begin = 0;
      let end = list.length - 1;
      let tempIndex = null;

      while (begin <= end) {
        const midIndex = Math.floor(((begin + end) / 2));
        const midValue = list[midIndex].bottom;

        if (midValue === value) {
          return midIndex + 1;
        } if (midValue < value) {
          begin = midIndex + 1;
        } else if (midValue > value) {
          if (tempIndex === null || tempIndex > midIndex) {
            tempIndex = midIndex;
          }
          end -= 1;
        }
      }
      return tempIndex;
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
