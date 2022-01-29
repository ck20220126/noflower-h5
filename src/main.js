import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/vant.js';
import isIOSX from './directives/safe-area-inset-bottom/is-ios-x';

// 全局
import './style/common.less';

Vue.config.productionTip = false;
Vue.prototype.$systemInfo = {
  isIOSX,
};

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
