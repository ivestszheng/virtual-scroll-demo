import Vue from 'vue';
import ElementUI from 'element-ui';
import infiniteScroll from 'vue-infinite-scroll';
import Directives from '@/directives/index';
import App from './App.vue';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';

Vue.config.productionTip = false;
Vue.use(Directives);
Vue.use(ElementUI);
Vue.use(infiniteScroll);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
