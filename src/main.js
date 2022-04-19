import Vue from 'vue';
// import axios from './router/axios';
import VueAxios from 'vue-axios';
import App from './App';
import router from './router/router';
import './permission'; // 权限
import './error'; // 日志
import './cache';//页面缓存
import store from './store';
import {loadStyle} from './util/util'
import * as urls from '@/config/env';
import Element from 'element-ui';
import VCharts from 'v-charts';
import echarts from 'echarts';
import xinjiang from'echarts/map/js/province/xinjiang';
import VueFab from 'vue-float-action-button'
// import $ from 'jquery' ;
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';
import china from 'echarts/map/json/china.json'
echarts.registerMap('china', china);
echarts.registerMap('xinjiang', xinjiang);

import BaiduMap from 'vue-baidu-map'
export default new Vue()

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: '5pqSCAmo6wG4WYucNIdppBE99wi2LW6z'
})

//将echarts绑定到vue的原型上
Vue.prototype.$echarts = echarts;

Vue.use(VCharts);
Vue.use(VueFab, /* {
  ----------------------
  // opitons 可选iconfont图标或MaterialIcons
  iconType: 'MaterialDesign'
  // iconType: 'iconfont'
} */)


import {
  iconfontUrl,
  iconfontVersion
} from '@/config/env';
import i18n from './lang' // Internationalization
import './styles/common.scss';

import basicContainer from './components/basic-container/main'

//bidu
//百度地图
import bmap from 'vue-baidu-map'
Vue.use(bmap,{
  ak:'W5e3cMYUKkpzFKy3bD7Wv4axZiES8RPX'
})

import dataV from '@jiaminghi/data-view'
Vue.use(dataV)

import './assets/normalize.css'

//处理时间
import moment from 'moment'
Vue.prototype.moment = moment

//引入字体
import '../src/common/font/font.css'

//axios
import axios from 'axios';
axios.defaults.timeout = 60000;
Vue.prototype.$axios=axios;
// axios.defaults.withCredentials = true


//无缝滚动
import scroll from 'vue-seamless-scroll'
Vue.use(scroll);
// dibu

import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
Vue.use(Viewer)
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element)
Vue.use(router)
Vue.use(VueAxios, axios)
Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(window.AVUE, {
  i18n: (key, value) => i18n.t(key, value)
})
//注册全局容器
Vue.component('basicContainer', basicContainer)
// 加载相关url地址
Object.keys(urls).forEach(key => {
  Vue.prototype[key] = urls[key];
})

// 动态加载阿里云字体库
iconfontVersion.forEach(ele => {
  loadStyle(iconfontUrl.replace('$key', ele));
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')