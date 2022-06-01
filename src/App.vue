<template>
  <div id="app">
    <nav>
      <router-link to="/vue-infi-scroller">VueInfiniteScroller 实现列表无限滚动</router-link> |
      <router-link to="/table-infi-scroller">自定义指令实现饿了么表格无限滚动</router-link> |
      <router-link to="/my-own-infi-scroller">自已实现列表无限滚动</router-link> |
      <router-link to="/vue-virtual-scroller">VueVirtualScroller 实现虚拟滚动</router-link> |
      <router-link to="/table-virtual-scroller">饿了么表格实现虚拟滚动</router-link> |
      <router-link to="/my-own-virtual-scroller">自己实现虚拟滚动</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
