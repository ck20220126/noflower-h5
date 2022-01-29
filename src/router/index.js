import Vue from 'vue';
import VueRouter from 'vue-router';
import { constantRouterMap } from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: constantRouterMap,
});

router.afterEach(to => {
  if (to.meta.title) window.document.title = to.meta.title;
});

export default router;
