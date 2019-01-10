import Vue from 'vue'
import index from './404.vue'
import axios from 'axios' 
import FastClick from 'fastclick'
import Api from '../../api/api'
import config from '../../config/config'
import '../../assets/js/rem'  //導入rem，不需要接收，直接執行
import '../../style/base.less'

Vue.prototype.$http = axios;
Vue.prototype.$Api = Api;
Vue.prototype.$config = config;
FastClick.attach(document.body)

Vue.config.productionTip = false
//这里主要设置默认路由，跳转到index这个页面
new Vue({
  el:'#app',
  render: h => h(index)
})
