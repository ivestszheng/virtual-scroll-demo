import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/vue-infi-scroller',
  },
  {
    path: '/vue-infi-scroller',
    name: 'VueInfiScroll',
    component: () => import('@/views/VueInfiScrollView.vue'),
  },
  {
    path: '/table-infi-scroller',
    name: 'TableInfiScroller',
    component: () => import('@/views/TableInfiScrollerView.vue'),
  },
  {
    path: '/vue-virtual-scroller',
    name: 'VueVirtualScroller',
    component: () => import('@/views/VueVirtualScrollerView.vue'),
  },
  {
    path: '/table-virtual-scroller',
    name: 'TableVirtualScrollerView',
    component: () => import('@/views/TableVirtualScrollerView.vue'),
  },
  {
    path: '/my-own-infi-scroller',
    name: 'MyOwnInfiScroller',
    component: () => import('@/views/MyOwnInfiScrollerView.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
