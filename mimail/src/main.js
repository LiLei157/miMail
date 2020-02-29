import Vue from 'vue'
import './plugins/axios'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'  // 对axios进行处理，将axios挂载到Vue对象上

import App from './App.vue'

axios.defaults.baseURL = "/api" // 根据前端跨域方案的不同，而选择不同的写法
axios.defaults.timeout = 8000;  // 设置超时时间
// axios响应拦截，对服务器返回的接口数据进行处理
axios.interceptors.response.use(function(response){
  let res = response.data
  // res.status请求状态码与后台一起定义
  if(res.status == 0){
    // 请求成功，返回请求数据data
    return res.data
  }else if(res.status == 10){
    // 代码10：表示未登录
    window.location.href = "/#/login"
  }
})
//全局使用axios
Vue.use(VueAxios,axios)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
