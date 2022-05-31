import Vue from 'vue';
import ElementUI from 'element-ui';
import infiniteScroll from 'vue-infinite-scroll';
import Directives from '@/directives/index';
import VueVirtualScroller from 'vue-virtual-scroller';
import App from './App.vue';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';

Vue.config.productionTip = false;
Vue.use(Directives);
Vue.use(ElementUI);
Vue.use(infiniteScroll);
Vue.use(VueVirtualScroller);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
