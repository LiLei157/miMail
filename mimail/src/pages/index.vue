<template>
  <div class="index">
    <div class="container">
      <!-- 轮播图 -->
      <div class="swiper-box">
        <!-- 左侧列表 -->
        <div class="classify-list">
          <ul>
            <li class="classify-item">
              <a href="javascript:;">手机 电话卡</a>
              <div class="children-list"></div>
            </li>
            <li class="classify-item">
              <a href="javascript:;">电视 盒子</a>
              <div class="children-list"></div>
            </li>
            <li class="classify-item">
              <a href="javascript:;">笔记本 平板</a>
              <div class="children-list"></div>
            </li>
            <li class="classify-item">
              <a href="javascript:;">家电 插线板</a>
              <div class="children-list"></div>
            </li>
            <li class="classify-item">
              <a href="javascript:;">出行 穿戴</a>
              <div class="children-list"></div>
            </li>
            <li class="classify-item">
              <a href="javascript:;">智能 路由器</a>
              <div class="children-list"></div>
            </li>
            <li class="classify-item">
              <a href="javascript:;">电源 配件</a>
              <div class="children-list"></div>
            </li>
            <li class="classify-item">
              <a href="javascript:;">生活 箱包</a>
              <div class="children-list"></div>
            </li>
          </ul>
        </div>
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in swiperList" :key="index">
            <a :href="'/#/product/'+item.id">
              <img class="swiper-icon" :src="item.imgUrl" alt />
            </a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <!-- 下面4个广告位 -->
      <div class="ads-box">
        <div class="ads-item" v-for="(item,index) in adsList" :key="index">
          <a :href="'/#/product/'+item.id">
            <img :src="item.url" />
          </a>
        </div>
      </div>
      <!-- 广告位下的banner图 -->
      <div class="banner-box">
        <a :href="'/#/product/'+bannerData.id">
          <img :src="bannerData.url" alt />
        </a>
      </div>
    </div>
    <!-- 商品部分 -->
    <div class="product-box clearfix">
      <div class="container">
        <p class="title">手机</p>
        <div class="product-content">
          <div class="product-left-banner f-left">
            <a href="/#/product/3">
              <img src="/imgs/mix-alpha.jpg" alt />
            </a>
          </div>
          <div class="product-right-list f-right">
            <div class="product-item" v-for="(item,index) in productList" :key="index">
              <img class="product-img" v-lazy="`${item.mainImage}`" />
              <a :href="`#/product/${item.id}`">
                <p class="label">{{item.name}}</p>
                <p class="subtitle">{{item.subtitle}}</p>
              </a>
              <div class="product-price">
                <span class="discount">{{item.price}}元起</span>
                <a class="cart-pro" href="javascript:;" @click="openDialog(item.id)"></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <module
      moduleType="middle"
      dialogTitle="标题"
      btnType="sureBtn"
      :showModule="isShow"
      @closeDialog="closeDialog"
      @sureHandler="sureHandler"
      sureBtn="查看购物车"
    >
      <!-- 往组件中的插槽中插入内容 -->
      <template v-slot:body>
        <p>成功添加至购物车!</p>
      </template>
    </module>
  </div>
</template>

<script>
import ServiceBar from "../components/ServiceBar";
import "swiper/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import Module from "../components/Module";
// import log from '../util/LogInfo';
export default {
  name: "index",
  components: {
    swiper,
    swiperSlide,
    ServiceBar,
    Module
  },
  data() {
    return {
      // swiper相关配置
      swiperOption: {
        autoplay: true, //autoplay:开启自动播放
        effect: "fade", //effect:设置切换效果
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      // 轮播图列表数据，这里写死
      swiperList: [
        {
          id: "42",
          imgUrl: "/imgs/slider/slide-1.jpg"
        },
        {
          id: "45",
          imgUrl: "/imgs/slider/slide-2.jpg"
        },
        {
          id: "46",
          imgUrl: "/imgs/slider/slide-3.jpg"
        },
        {
          id: "",
          imgUrl: "/imgs/slider/slide-4.jpg"
        }
      ],
      // 广告位列表数据
      adsList: [
        {
          id: "33",
          url: "/imgs/ads/ads-1.png"
        },
        {
          id: "48",
          url: "/imgs/ads/ads-2.jpg"
        },
        {
          id: "45",
          url: "/imgs/ads/ads-3.png"
        },
        {
          id: "47",
          url: "/imgs/ads/ads-4.jpg"
        }
      ],
      // banner位
      bannerData: {
        id: "30",
        url: "/imgs/banner-1.png"
      },
      //index页下product列表数据
      productList: [],
      isShow: false
    };
  },
  mounted() {
    this.getProductList();
  },
  methods: {
    //获取商品列表并赋值
    getProductList() {
      this.axios
        .get("/products", {
          params: {
            categoryId: 100012,
            pageSize: 8
          }
        })
        .then(res => {
          this.productList = res.list;
          console.log(this.productList);
        });
    },
    // 点击某个商品item时，传递参数id
    openDialog(id) {
      // console.log("商品id：" + id);
      this.axios.post('/carts',{
        productId:id,
        selected:true
      }).then((res) =>{
        this.isShow = true;
        this.$store.dispatch('saveCartCount',res.cartTotalQuantity)
      })
    },
    closeDialog() {
      this.isShow = false;
    },
    sureHandler() {
      console.log("该商品的id是：");
      this.$router.push("/cart");
    }
  }
};
</script>

<style lang="scss" scoped>
@import ".././assets/scss/base.scss";
@import ".././assets/scss/config.scss";
@import ".././assets/scss/mixin.scss";
.index {
  position: relative;
  .container {
    // 轮播图
    .swiper-box {
      position: relative;
      .swiper-container {
        height: 451px;
        .swiper-icon {
          width: 100%;
          height: 100%;
        }
        .swiper-button-prev {
          left: 275px;
        }
      }
      .classify-list {
        width: 264px;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9;
        background: rgba(0, 0, 0, 0.3);
        padding: 26px 0;
        box-sizing: border-box;
        .classify-item {
          a {
            display: inline-block;
            height: 50px;
            width: 100%;
            font-size: 16px;
            line-height: 50px;
            color: $colorG;
            padding-left: 30px;
            box-sizing: border-box;
            position: relative;
            &::after {
              display: inline-block;
              content: " ";
              @include bgImg(
                10px,
                15px,
                "/imgs/icon-arrow.png"
              ); // 替换成我们定义的mixin中的bgImg()函数
              position: absolute;
              right: 30px;
              // 当定位的元素需要设置居中时最好的方法：1、距离父容器50%  2、再移动-50%的自身元素宽度：transform:translateX|Y(-50%):
              top: 50%;
              transform: translateY(-50%);
            }
          }
        }
        .classify-item:hover {
          background: $colorA;
        }
      }
    }
    //4个广告位
    .ads-box {
      @include flex(); // 使用mixin中封装的flex()函数
      // display: flex;
      // justify-content: space-between;
      margin: 14px 0 31px 0;
      a {
        display: inline-block;
        img {
          width: 296px;
          height: 167px;
        }
      }
    }
    //banner
    .banner-box {
      margin-bottom: 50px;
      a {
        height: 130px;
        img {
          width: 100%;
          height: 130px;
        }
      }
    }
  }
  .product-box {
    background: $colorJ;
    .container {
      .title {
        display: inline-block;
        font-size: $fontF;
        color: $colorB;
        margin: 20px 0 30px;
        font-weight: bold;
      }
      .product-content {
        .product-left-banner {
          margin-right: 16px;
          a {
            display: inline-block;
            width: 224px;
            height: 619px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .product-left-banner:hover {
          margin-top: -3px;
          box-shadow: 7px 7px 20px rgba(0, 0, 0, 0.1);
          transition: all 0.7s;
        }
        .product-right-list {
          width: 986px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .product-item {
            width: 236px;
            height: 302px;
            background-color: $colorG;
            text-align: center;
            margin-bottom: 14px;
            transition: all 0.7s;
            .product-img {
              width: 236px;
              height: 195px;
              margin-top: 24px;
              // padding:20px;
              box-sizing: border-box;
            }
            a {
              display: inline-block;
              p:hover {
                color: $colorA;
              }
              .label {
                font-size: $fontJ;
                color: $colorB;
                margin-bottom: 6px;
              }
              .subtitle {
                color: $colorD;
                margin-bottom: 9px;
              }
            }
            .product-price {
              .discount {
                color: $colorA;
                margin-right: 5px;
                font-size: $fontJ;
              }
              .cart-pro {
                display: inline-block;
                @include bgImg(
                  22px,
                  22px,
                  "/imgs/icon-cart-hover.png",
                  contain
                );
                vertical-align: middle;
                margin-left: 15px;
              }
            }
          }
          .product-item:hover {
            margin-top: -3px;
            box-shadow: 7px 7px 20px rgba(0, 0, 0, 0.1);
            transition: all 0.7s;
          }
        }
      }
    }
  }
}
</style>