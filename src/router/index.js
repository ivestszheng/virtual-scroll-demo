import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/list-lazy-load',
    name: 'ListLazyLoad',
    component: () => import('@/views/ListLazyLoad.vue'),
  },
  {
    path: '/table-infinite-scroll',
    name: 'TableInfiniteScroll',
    component: () => import('@/views/TableInfiScrollView.vue'),
  },
  {
    path: '/vue-infi-scroll',
    name: 'VueInfiScroll',
    component: () => import('@/views/VueInfiScrollView.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
