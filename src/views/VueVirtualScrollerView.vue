<template>
  <RecycleScroller
    class="scroller"
    :items="list"
    :item-size="32"
    key-field="id"
    v-slot="{ item }"
  >
    <div class="user">
      {{item.id}}
      {{ item.title }}
    </div>
  </RecycleScroller>
</template>

<script>
import { generageList } from '@/mock/index';

export default {
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.list = generageList(1000).data;
  },
  computed: {
    virtualList() {
      return [];
    },
  },
};
</script>

<style scoped>
.scroller {
  height: 500px;
  width: fit-content;
  margin: 0 auto;
  overflow-y: scroll;
}

.user {
  height: 32%;
  padding: 0 12px;
  display: flex;
  align-items: center;
}
</style>
