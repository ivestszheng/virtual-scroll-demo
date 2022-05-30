<template>
    <el-table
      :data="tableData"
      style="width: 80%;margin: 0 auto;"
      max-height="250"
      >
      <el-table-column
        prop="id"
        label="序号"
        width="100"
     >
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        >
      </el-table-column>
      <el-table-column
        prop="readTimes"
        label="阅读次数"
        >
      </el-table-column>
      <el-table-column
        prop="source"
        label="来源"
        >
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期">
      </el-table-column>
    </el-table>
</template>

<script>
import { findAll } from '@/mock/index';

export default {
  name: 'TableInfiScrollView',
  data() {
    return {
      tableData: [],
    };
  },
  components: {},
  created() {
    this.renderTable();
  },
  methods: {
    renderTable() {
      const { data: { list } } = findAll(1000);
      this.tableData = list;
    },
  },
};
</script>

<style lang="less" scoped>
</style>
