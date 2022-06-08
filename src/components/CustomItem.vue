<template>
  <div class="item">
    <div>{{ item.id }}</div>
    <div>{{ item.title }}</div>
    <div>{{ item.readTimes }}</div>
    <div>{{ item.source }}</div>
    <div>{{ item.date }}</div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => { },
    },
  },
};
</script>
<style lang="less">
.item {
  width: 80%;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    width: 100%;
  }
}
</style>
