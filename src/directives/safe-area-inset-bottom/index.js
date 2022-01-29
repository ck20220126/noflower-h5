/*
 * @Author: 张天昊
 * @Date: 2020-12-04 10:53:56
 * @LastEditors: 张天昊
 * @LastEditTime: 2020-12-04 11:22:06
 * @Description:
 */
import './safe-area-inset-bottom.css';
import isIOSX from './is-ios-x';

class VSafeAreaInsetBottom {
  constructor() {
    this.installed = false;
  }
  install(Vue) {
    if (this.installed) return;
    this.installed = true;
    Vue.directive('safe-area-inset-bottom', {
      bind(el) {
        if (isIOSX) {
          el.setAttribute('safe-area-inset-bottom', '');
        }
      },
    });
  }
}
export default new VSafeAreaInsetBottom();
