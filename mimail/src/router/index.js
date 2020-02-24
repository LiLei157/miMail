import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/home'
import Index from '../pages/index'  //首页
import Detail from '../pages/detail'  //商品细节
import Product from '../pages/product'  //商品详情
import Order from '../pages/order'  // 订单父容器
import OrderList from '../pages/orderList'  // 订单列表
import OrderPay from '../pages/orderPay'  //订单支付
import OrderConfirm from '../pages/orderConfirm'  //订单确认
import Cart from '../pages/cart'  //购物车
// import Login from '../pages/login'  //登录
import AliPay from '../pages/aliPay'  //支付宝跳转


// Vue.use() 作用是：将VueRouter挂载到vue对象上
Vue.use(VueRouter)

export default new VueRouter({
  // vueRouter路由配置
  routes:[
    // home页面作为整个项目页面的承载，比如
    //1、首页面中home下的子路由：商品首页index，商品细节展示detail,商品详情product
    {
      path:'/', //path路径
      name:'home',  
      component:Home,  // 组件
      // home下的子路由
      children:[  
        //首页路由
        {
          path:'index',
          name:'index',
          component:Index
        },
        {
          path:'product/:id',
          name:'product',
          component:Product
        },
        {
          path:'detail/:id',
          name:'detail',
          component:Detail
        },
      ]
    },
    // 2、订单页order下的子路由：1、订单列表orderList  2、订单确认orderConfirm  3、订单支付orderPay  4、支付宝跳转页 aliPay
    {
      path:'/order',
      name:'order',
      component:Order,
      children:[
        {
          path:'orderList',
          name:'order-list',
          component:OrderList
        },
        {
          path:'orderConfirm/:id',
          name:'order-confirm',
          component:OrderConfirm
        },
        {
          path:'orderPay/:id',
          name:'order-pay',
          component:OrderPay
        },
        {
          path:'aliPay',
          name:'ali-pay',
          component:AliPay
        }
      ]
    },
    //购物车cart,单独的路由，但是在这个路由中复用orderHeader 和 orderFooter组价
    {
      path:'/cart',
      name:'cart',
      component:Cart
    }
  ]
})
