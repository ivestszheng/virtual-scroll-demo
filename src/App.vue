<template>
  <div id="app">
    <nav>
      <router-link to="/vue-infi-scroll">vue-infinite-scroll 实现列表懒加载</router-link> |
      <router-link to="/table-lazyload">自定义指令实现饿了么表格懒加载</router-link> |
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
