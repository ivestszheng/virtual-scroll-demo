<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 80%; margin: 0 auto"
      max-height="500"
      v-eltableVirtualScroll
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
import { generageList } from '@/mock/index';

export default {
  name: 'TableVirtualScrollerView',
  data() {
    return {
      tableData: [],
    };
  },
  components: {},
  created() {
    this.tableData = generageList(100).data;
  },
  methods: {
  },
};
</script>

<style lang="less" scoped>
/deep/.el-table__row{
  height: 100px;
}
</style>
