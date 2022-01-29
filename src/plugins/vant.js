import Vue from 'vue';
import { Icon, Button, Tabbar, TabbarItem, Toast, Popup } from 'vant';

[Icon, Button, Tabbar, TabbarItem, Toast, Popup].forEach(item => Vue.use(item));
