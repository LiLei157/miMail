<template>
  <div class="header">
    <!-- 顶部导航栏 -->
    <div class="nav-topbar">
      <!-- 容器 -->
      <div class="container">
        <div class="topbar-menu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MIUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="username">{{username}}</a>
          <a href="javascript:;" v-if="!username" @click="toLogin">登录</a>
          <a href="javascript:;">注册</a>
          <a href="javascript:;" class="cart">
            <span class="icon-cart"></span>
            购物车
          </a>
        </div>
      </div>
    </div>
    <!-- 顶部导航栏下面的部分：logo，分类，搜索框 -->
    <div class="nav-header">
      <div class="container">
        <div class="nav-logo">
          <a href="/#/index"></a>
        </div>
        <div class="header-menu">
          <div class="nav-header-item">
            <span>小米手机</span>
            <div class="children">
              <ul>
                <li class="product" v-for="(item,index) in productList" :key="index">
                  <a :href="`/#/product/${item.id}`" target="_blank">
                    <div class="pro-img">
                      <img
                        :src="item.mainImage"
                        :alt="item.subtitle"
                      />
                      <div class="pro-name">{{item.name}}</div>
                      <div class="pro-price">{{item.price | priceFilter}}起</div>
                    </div>
                  </a>
                </li>
                
              </ul>
            </div>
          </div>
          <div class="nav-header-item">
            <span>Redmi红米</span>
            <div class="children"></div>
          </div>
          <div class="nav-header-item">
            <span>电视</span>
            <div class="children"></div>
          </div>
          <div class="nav-header-item">
            <span>电视</span>
            <div class="children"></div>
          </div>
          <div class="nav-header-item">
            <span>电视</span>
            <div class="children"></div>
          </div>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword" />
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "nav-header",
  data() {
    return {
      productList: [],
      username:''
    }
  },
  mounted () {
    this.getProductList()
  },
  methods: {
    //获取商品列表
    getProductList() {
      this.axios.get("/products",{
        params:{
          "categoryId":"100012",
          "pageSize":6
        }
      }).then(res=>{
        // 判断，如果请求数据条数大于6条，就只放6条到productList中
        if(res.list.length >=6){
          this.productList = res.list.splice(0,6)
        }else{
          this.productList = res.list;
        }
      })
    },
    //登录
    toLogin(){
      this.$router.push({path:'/login'})
    }
  },
  //局部的过滤器
  filters: {
    priceFilter: function(value) {
      if(!value)return "0.00";
      // 对小数位进行截取并拼接上符号和单位
      return "￥"+ value.toFixed(2) + '元'
    }
  }
};
</script>

<style lang="scss">
@import ".././assets/scss/base.scss"; //导入scss文件
@import ".././assets/scss/mixin.scss"; //导入mixin
@import ".././assets/scss/config.scss";
.header {
  .nav-topbar {
    height: 39px;
    line-height: 39px;
    background-color: #333;
    .container {
      @include flex();
      a {
        color: #b0b0b0;
        margin-right: 17px;
      }
      .cart {
        display: inline-block;
        width: 110px;
        background-color: #ff6600;
        margin-right: 0;
        text-align: center;
        color: #fff;
        .icon-cart {
          display: inline-block;
          @include bgImg(16px, 12px, "/imgs/icon-cart-checked.png");
          margin-right: 4px;
        }
      }
    }
  }
}

.nav-header {
  .container {
    height: 112px;
    position: relative;
    @include flex();
    .nav-logo {
      width: 55px;
      height: 55px;
      background-color: #ff6600;
      overflow: hidden;
      a {
        display: inline-block;
        width: 110px;
        height: 55px;
        &:before {
          display: inline-block;
          @include bgImg(55px, 55px, "/imgs/mi-logo.png", 55px);
          content: " ";
          transition: margin 0.4s;
        }
        &:after {
          display: inline-block;
          @include bgImg(55px, 55px, "/imgs/mi-home.png", 55px);
          content: " ";
        }
        &:hover:before {
          margin-left: -55px;
          transition: margin 0.4s;
        }
      }
    }
    .header-menu {
      font-size: 16px;
      display: inline-block;
      width: 643px;
      padding-left: 209px;
      .nav-header-item {
        color: #333;
        display: inline-block;
        font-weight: bold;
        margin-right: 20px;
        line-height: 112px;
        &:hover{
            color: #ff6600;
            .children{
                height: 220px;
                opacity: 1;
            }
        }
        span {
          cursor: pointer;
        }
        .children {
          position: absolute;
          width: 1226px;
          height: 0;
          opacity: 0;
          top: 112px;
          left: 0;
          z-index: 10;
          box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
          border-top: 1px solid #E5E5E5;
          transition: all 1s;
          ul {
            height: 220px;
          }
          .product {
            float: left;
            width: 16.6%;
            box-sizing: border-box;
            font-size: 12px;
            line-height: 12px;
            text-align: center;
            position: relative;
            a {
              display: inline-block;
              .pro-img{
                  height: 113px;
              }
              img {
                width: auto;
                height: 111px;
                margin-top: 26px;
              }
              .pro-name{
                  margin-top: 19px;
                  margin-bottom: 8px;
                  color: #333;
              }
              .pro-price{
                  color: #ff6600
              }
            }
            &:before{
                content:' ';    // 伪类一定要使用content:' '占位
                position: absolute;
                height: 99px;
                width: 1px;
                background-color: $colorF;
                right: 0;
                top: 28px;
            }
            &:last-child:before{
                display: none;
            }
          }
        }
      }
    }
    .header-search {
      width: 319px;
      .wrapper {
        height: 50px;
        border: 1px solid #e0e0e0;
        display: flex;
        align-items: center;
        input {
          height: 50px;
          width: 264px;
          box-sizing: border-box;
          border: 0;
          border-right: 1px solid #e0e0e0;
          padding-left: 15px;
        }
        a {
          display: inline-block;
          @include bgImg(18px, 18px, "/imgs/icon-search.png", contain);
          margin-left: 18px;
        }
      }
    }
  }
}
</style>