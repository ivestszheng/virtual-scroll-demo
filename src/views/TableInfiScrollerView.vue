<template>
  <div>
    <el-table
    ref="table"
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
  mounted() {
    console.log(this.$refs.table);
  },
  methods: {
    loadMore() {
      if (!this.isBusy) {
        console.log('load more');
        this.isBusy = true;

        setTimeout(() => {
          this.appendToTable(this.page.pagination, this.page.pageSize);
          this.isBusy = false;
        }, 500);
      }
    },
    appendToTable(pagination = 0, pageSize = 5) {
      const newData = findByPagination(pagination, pageSize).data.list;
      this.tableData = [...this.tableData, ...newData];
      this.page.pagination += 1;
    },
  },
};
</script>
