<template>
  <!-- <el-table
    :data="tableData"
    style="width: 80%; margin: 0 auto"
    max-height="250"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="isBusy"
    infinite-scroll-distance="10"
  >
    <el-table-column prop="id" label="序号" width="100"> </el-table-column>
    <el-table-column prop="title" label="标题"> </el-table-column>
    <el-table-column prop="readTimes" label="阅读次数"> </el-table-column>
    <el-table-column prop="source" label="来源"> </el-table-column>
    <el-table-column prop="date" label="日期"> </el-table-column>
  </el-table> -->
  <div>
    <!-- <div v-for="(item,index) in tableData" :key="index">

    </div> -->
  </div>
</template>

<script>
export default {
  name: 'TableInfiScrollView',
  data() {
    return {
      tableData: [],
      isBusy: false,
    };
  },
  components: {},
  created() {
    console.log(123);
  },
  methods: {

    loadMore() {
      console.log('load more');
      this.isBusy = true;

      setTimeout(() => {
        for (let i = 0, j = 10; i < j; i += 1) {
          this.tableData.push({ id: 111 });
        }
        // this.isBusy = false;
      }, 1000);
    },
  },
};
</script>

<style lang="less" scoped>
</style>
