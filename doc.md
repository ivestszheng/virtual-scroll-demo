# 长列表无限下拉的实现

## 分页还是无限下拉？

在正式开始之前，先简单了解一下分页与无限下拉分别适用的场景。

### 分页

> 分页技术是指将内容信息划分成独立的页面来显示。如果你滚到一个页面的底部看到一行数字，这些数字就是当前站点或者应用程序里面的分页。

当用户是在结果列表查找特定的信息而不是仅仅浏览信息流时，分页就是好的选择——用户可以知道结果的准确数量，能够决定在哪里停下或者精读哪些结果，政务类网站以分页显示居多。

### 无限下拉

> 无限下拉加载技术使用户在大量成块的内容面前一直滚动查看。这种方法是在你向下滚动的时候不断加载新内容。虽然听起来比较诱人，但该技术并不是一个面向任何网站或应用程序的通用方案。

当你使用滚动作为发现数据的主要方法时，它可能使你的用户在网页上停留更长时间并提升用户参与度。在门户网站与社交媒体中，无限下拉被大量使用。

相比点击，滚动操作起来也更加容易，对移动设备很友好。

## 无限下拉的两种实现方式

### 懒加载

当页面滚动到底部时，进行下一页内容的查询并将结果添加到结果列表中，这就是懒加载。在这种场景下，列表中的`dom`元素数量是累加的。

### 虚拟滚动

虚拟滚动（也叫虚拟列表），尽管在表现形式上与懒加载相似，但列表中展示的`dom`元素数量实际是固定的。

## 无限下拉之懒加载的实现

### Vue中原生实现

前面说了懒加载的触发条件是**页面滚动到底部**。判断滚动条到底部，需要用到DOM的三个属性值，即`scrollTop`、`clientHeight`、`scrollHeight`。

简单来说，`scrollTop`为滚动条在Y轴上的滚动距离；`clientHeight`为内容可视区域的高度；`scrollHeight`为内容可视区域的高度加上溢出（滚动）的距离。具体如下图所示：
![scrollTop,clientHeight,scrollHeight](https://raw.githubusercontent.com/ivestszheng/images-store/master/img/20220604173029.png)

所以可推得页面滚动到底部的条件为 `Math.floor(scrollHeight - scrollTop) === clientHeight`。

之所以用到向下取整是因为`scrollHeight`可能是小数。在`chrome`中会存在这样一种情况——假设`scrollHeight`为`501`，`clientHeight`为`500`，拖到底部`scrollTop`只有零点几。
![懒加载原生实现](https://raw.githubusercontent.com/ivestszheng/images-store/master/img/%E5%8A%A8%E7%94%BB.gif)
完整代码如下：

```vue
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

```

### Vue中通过插件实现

追求效率可以直接使用饿了么团队出品的[无限滚动/vue-infinite-scroll](https://github.com/ElemeFE/vue-infinite-scroll)，通过自定义指令的方式使用，具体代码如下：

```vue
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

```

### 在element-ui Table组件中的实现

上面的案例都是在自己创建的列表，还有比较常见的是需要组件库中的表格组件实现懒加载，这里以`element-ui`的`table`为例。

大体的思路与上面的实现一致，不过需要需要获取正确的容器——选择器为`.el-table__body-wrapper`的`div`。考虑到复用性，使用了自定义指令，具体代码如下：

```js
const eltableLoad = {
  bind: (el, binding) => {
    const selectWrap = el.querySelector('.el-table__body-wrapper');

    selectWrap.addEventListener('scroll', function () {
      if (Math.floor(this.scrollHeight - this.scrollTop) <= this.clientHeight) {
        binding.value();
      }
    });
  },
};
```

```vue
<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 80%; margin: 0 auto"
      max-height="250"
      v-eltable-load="loadMore"
    >
      <el-table-column prop="id" label="序号" width="100"> </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="readTimes" label="阅读次数"> </el-table-column>
      <el-table-column prop="source" label="来源"> </el-table-column>
      <el-table-column prop="date" label="日期"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { findByPagination } from '@/mock/index';

export default {
  name: 'TableLazyLoadView',
  data() {
    return {
      tableData: [],
      page: {
        pagination: 0,
        pageSize: 5,
      },
      isBusy: false,
    };
  },
  components: {},
  created() {
    this.appendToTable(this.page.pagination, this.page.pageSize);
  },
  methods: {
    loadMore() {
      console.log('load more');
      this.isBusy = true;

      setTimeout(() => {
        this.appendToTable(this.page.pagination, this.page.pageSize);
        this.isBusy = false;
      }, 1000);
    },
    appendToTable(pagination = 0, pageSize = 5) {
      const newData = findByPagination(pagination, pageSize).data.list;
      this.tableData = [...this.tableData, ...newData];
      this.page.pagination += 1;
    },
  },
};
</script>

```

这里的实现比较简单，当`table`到底部时会调用`v-eltable-load`绑定的方法。我其实是想将防抖的操作也以自定义指令的形式来实现，像`vue-infinite-scroll`一样。但我不知道一个指令是如何获得另一个指令的入参的，希望有大佬可以指点一下。

## 无限下拉之虚拟滚动的实现

### 虚拟滚动原理

虚拟滚动原理如下图所示：

![虚拟滚动原理](https://raw.githubusercontent.com/ivestszheng/images-store/master/img/src=http%3A%2F%2Fucc.alicdn.com%2Fpic%2Fdeveloper-ecology%2F9be845dd1e504ecb8fd26573830a0226.jpg&refer=http%3A%2F%2Fucc.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto)

可以看到视口高度是固定的，子元素的高度也是固定的，我们可以推算出一个视口最多可以看到多少个元素。只需改变列表中元素的上下间距即可实现虚拟滚动的效果。



### 实现的整体思路

1. 计算容器最大容积数量
2. 监听滚动事件动态截取数据
3. 动态设置上下空白占位
4. 下拉请求数据

### 计算容器最大容积数量

在列表内容等高的情况下，容器最大容积数量 = Math.floor(容器的高度 / 列表每项内容的高度) + 2。之所以要`+2` 是因为视口中第一项和最后一项可能并不完整，如下图所示：

![计算容器最大容积数量1](https://raw.githubusercontent.com/ivestszheng/images-store/master/img/image-20220605220258304.png)

需要注意的是，假如列表的高度并非固定，而是会随着当视口变化。那么当视口改变时（大小改变或翻转），容器最大容积数量也应发生变化，具体代码如下：

```vue
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
```

### 监听滚动事件动态截取数据

## 无限下拉存在的问题与优化思路

### 懒加载

但是

### 虚拟滚动

## 总结

以上所有代码均已放在仓库 [ivestszheng/virtual-scroll-demo](https://github.com/ivestszheng/virtual-scroll-demo)。

## 参考资料

1. [SegmentFault - 精读《高性能表格》](https://segmentfault.com/a/1190000039808261)
2. [掘金 - 虚拟列表，我真的会了！！！](https://juejin.cn/post/7085941958228574215#comment)
3. [CSDN - element表格组件实现虚拟滚动，解决卡顿问题](https://blog.csdn.net/qq_36733603/article/details/117821184)
4. [GitHub - vxe-table](https://github.com/x-extends/vxe-table)
5. [慕课 - 无限下拉滚动 Vs 分页，究竟该使用哪一个？](https://www.mockplus.cn/blog/post/384)
