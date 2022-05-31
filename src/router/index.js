import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/vue-infi-scroll',
  },
  {
    path: '/vue-infi-scroll',
    name: 'VueInfiScroll',
    component: () => import('@/views/VueInfiScrollView.vue'),
  },
  {
    path: '/table-lazyload',
    name: 'TableLazyLoad',
    component: () => import('@/views/TableLazyLoadView.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
