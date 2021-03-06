import Vue from 'vue'
import router from './router'
import store from './store/index'
import axios from 'axios'
import VueAxios from 'vue-axios'  // 对axios进行处理，将axios挂载到Vue对象上
import VueLazyload from 'vue-lazyload'
import vueCookie from 'vue-cookie'  //vue-cookie插件：用于存储cookie
import ElementUI from 'element-ui'  //Element-Ui框架，可按需加载
import 'element-ui/lib/theme-chalk/index.css';  //element-ui框架样式库

import App from './App.vue'

const mock = false;
if(mock){
  require("./mock/api")
}
axios.defaults.baseURL = "/api" // 根据前端跨域方案的不同，而选择不同的写法
axios.defaults.timeout = 8000;  // 设置超时时间
// axios响应拦截，对服务器返回的接口数据进行处理
axios.interceptors.response.use(function(response){
  let res = response.data;
  if(res.status == 0){
    return res.data;
  }else if(res.status == 10){
    window.location.href = '/#/login';
    return Promise.reject(res);
  }else{
    // Message.warning(res.msg);
    return Promise.reject(res);
  }
},(error)=>{
  // let res = error.response;
  // Message.error(res.data.message);
  return Promise.reject(error);
});


Vue.use(vueCookie)
Vue.use(ElementUI)
//全局使用axios
Vue.use(VueAxios,axios)
//全局使用vue-lazyload，并设置配置项
Vue.use(VueLazyload,{
  loading:'/imgs/loading-svg/loading-bars.svg'
})
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
