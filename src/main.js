// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


import axiosRequest from './utils/axiosUtils.js'
Vue.prototype.$http = axiosRequest

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import Mint from 'mint-ui';
Vue.use(Mint);
import 'mint-ui/lib/style.css';

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  const flag = to.meta.require;
  if(flag){
    const userFlag = !!window.sessionStorage.getItem('userInfo')
    if(userFlag){
      next();
    }else{
      router.push({ path: '/passport/login', })
    }
  }else{
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
