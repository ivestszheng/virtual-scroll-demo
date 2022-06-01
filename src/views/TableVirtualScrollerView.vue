<template>
  <el-table
    :data="tableData"
    ref="tableRef"
    style="width: 900px;margin: 0 auto;"
    max-height="380"
    border
    stripe
    class="myTable"
  >
    <el-table-column
      prop="date"
      label="必要元素："
      min-width="150"
      align="center"
      fixed="left"
    >
    </el-table-column>
    <el-table-column label="每一行高度必须相同">
      <el-table-column
        prop="name"
        label="class不能为【myTable】"
        min-width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column label="ref不能为【tableRef】">
        <el-table-column
          prop="province"
          label="省份"
          min-width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="city"
          label="市区"
          min-width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          min-width="150"
          align="center"
        >
        </el-table-column>
      </el-table-column>
    </el-table-column>
    <el-table-column label="操作" fixed="right" min-width="160" align="center">
      <template>
        <el-button size="mini">编辑</el-button>
        <el-button size="mini" type="danger">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      saveDATA: [],
      tableRef: null,
      tableWarp: null,
      fixLeft: null,
      fixRight: null,
      tableFixedLeft: null,
      tableFixedRight: null,
      scrollTop: 0,
      num: 0,
      start: 0,
      end: 42, // 3倍的pageList
      starts: 0, // 备份[保持与上一样]
      ends: 42, // 备份[保持与上一样]
      pageList: 14, // 一屏显示
      itemHeight: 41, // 每一行高度
      timeOut: 400, // 延迟
    };
  },
  created() {
    this.init();
  },
  mounted() {
    this.$nextTick(() => {
      this.tableRef = this.$refs.tableRef.bodyWrapper;
      this.tableFixedLeft = document.querySelector(
        '.el-table .el-table__fixed .el-table__fixed-body-wrapper',
      );
      this.tableFixedRight = document.querySelector(
        '.el-table .el-table__fixed-right .el-table__fixed-body-wrapper',
      );
      /**
       * fixed-left | 主体 | fixed-right
       */
      // 主体改造
      const divWarpPar = document.createElement('div');
      divWarpPar.style.height = `${this.saveDATA.length * this.itemHeight}px`;
      const divWarpChild = document.createElement('div');
      divWarpChild.className = 'fix-warp';
      divWarpChild.append(this.tableRef.children[0]);
      divWarpPar.append(divWarpChild);
      this.tableRef.append(divWarpPar);

      // left改造
      const divLeftPar = document.createElement('div');
      divLeftPar.style.height = `${this.saveDATA.length * this.itemHeight}px`;
      const divLeftChild = document.createElement('div');
      divLeftChild.className = 'fix-left';
      // eslint-disable-next-line no-unused-expressions
      this.tableFixedLeft
        && divLeftChild.append(this.tableFixedLeft.children[0]);
      divLeftPar.append(divLeftChild);
      // eslint-disable-next-line no-unused-expressions
      this.tableFixedLeft && this.tableFixedLeft.append(divLeftPar);

      // right改造
      const divRightPar = document.createElement('div');
      divRightPar.style.height = `${this.saveDATA.length * this.itemHeight}px`;
      const divRightChild = document.createElement('div');
      divRightChild.className = 'fix-right';
      // eslint-disable-next-line no-unused-expressions
      this.tableFixedRight
        && divRightChild.append(this.tableFixedRight.children[0]);
      divRightPar.append(divRightChild);
      // eslint-disable-next-line no-unused-expressions
      this.tableFixedRight && this.tableFixedRight.append(divRightPar);

      // 被设置的transform元素
      this.tableWarp = document.querySelector(
        '.el-table .el-table__body-wrapper .fix-warp',
      );
      this.fixLeft = document.querySelector(
        '.el-table .el-table__fixed .el-table__fixed-body-wrapper .fix-left',
      );
      this.fixRight = document.querySelector(
        '.el-table .el-table__fixed-right .el-table__fixed-body-wrapper .fix-right',
      );

      this.tableRef.addEventListener('scroll', this.onScroll);
    });
  },
  methods: {
    init() {
      this.saveDATA = [];
      for (let i = 0; i < 10000; i += 1) {
        this.saveDATA.push({
          date: i,
          name: `王小虎${i}`,
          address: '1518',
          province: 'github:',
          city: 'divcssjs',
          zip: `divcssjs${i}`,
        });
      }
      this.tableData = this.saveDATA.slice(this.start, this.end);
    },
    onScroll() {
      this.scrollTop = this.tableRef.scrollTop;
      this.num = Math.floor(this.scrollTop / (this.itemHeight * this.pageList));
    },
  },
  watch: {
    num(newV) {
      if (newV > 1) {
        this.start = (newV - 1) * this.pageList;
        this.end = (newV + 2) * this.pageList;
        setTimeout(() => {
          this.tableWarp.style.transform = `translateY(${this.start
            * this.itemHeight}px)`;
          if (this.fixLeft) {
            this.fixLeft.style.transform = `translateY(${this.start
              * this.itemHeight}px)`;
          }
          if (this.fixRight) {
            this.fixRight.style.transform = `translateY(${this.start
              * this.itemHeight}px)`;
          }
          this.tableData = this.saveDATA.slice(this.start, this.end);
        }, this.timeOut);
      } else {
        setTimeout(() => {
          this.tableData = this.saveDATA.slice(this.starts, this.ends);
          this.tableWarp.style.transform = 'translateY(0px)';
          if (this.fixLeft) {
            this.fixLeft.style.transform = 'translateY(0px)';
          }
          if (this.fixRight) {
            this.fixRight.style.transform = 'translateY(0px)';
          }
        }, this.timeOut);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.myTable {
  /deep/ td {
    padding: 6px 0 !important;
  }
}

/*滚动条样式*/

/deep/ .el-table__body-wrapper::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 6px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 8px;
}

/deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 2px;
  background: #666;
}

/deep/ .el-table__body-wrapper::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  background: #ccc;
}
</style>
