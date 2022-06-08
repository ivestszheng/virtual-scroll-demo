<template>
  <div class="container">
    <VirtualList :listData="data" :estimatedItemSize="100" v-slot="slotProps">
      <Item :item="slotProps.item" />
    </VirtualList>
  </div>
</template>

<script>
import { findByPagination2 } from '@/mock/index';
import VirtualList from '@/components/VirtualList.vue';
import Item from '@/components/CustomItem.vue';

export default {
  name: 'MyOwnVirtualScrollerView2',
  data() {
    return {
      data: [],
    };
  },
  created() {
    const { data: { list } } = findByPagination2(0, 1000);
    this.data = list;
  },
  components: {
    VirtualList,
    Item,
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
</style>
