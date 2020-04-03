<template>
  <div class="product">
    <product-params>
      <!-- 通过<template></template>标签中使用v-slot:插槽类名指令  来往插槽内填内容 -->
      <template v-slot:navbar>
        <button class="btn sureBtn">立即购买</button>
      </template>
    </product-params>
    <div class="content">
      <div class="product-bgImg1">
        <p>小米 8</p>
        <p>8周年旗舰版</p>
        <span>全球首款GPS双频</span>
        <span>晓龙845</span>
        <span>AI变焦双摄</span>
        <span>红外人脸识别</span>
        <div class="price">
          <p>￥2599</p>
          <p>￥2999</p>
        </div>
      </div>
      <div class="product-bgImg2 container"></div>
      <div class="product-bgImg3"></div>
      <!-- 轮播图 -->
      <div class="item-swiper">
        <swiper class="swiper-container" :options="swiperOption">
          <swiper-slide class="swiper-slide" v-for="item in banners" :key="item">
            <img :src="item" alt />
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import ProductParams from "../components/ProductParams";
import "swiper/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "product",
  components: {
    ProductParams,
    swiper,
    swiperSlide
  },
  data() {
    return {
      //轮播图数据
      banners: [
        "/imgs/product/gallery-2.png",
        "/imgs/product/gallery-3.png",
        "/imgs/product/gallery-4.png",
        "/imgs/product/gallery-5.jpg",
        "/imgs/product/gallery-6.jpg"
      ],
      //轮播图配置
      swiperOption: {
          autoplay:true,
          loop:true,
          slidesPerView:3,
          spaceBetween: 30,
          freeMode: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
@import ".././assets/scss/base.scss";
@import ".././assets/scss/btnStyle.scss";
@import ".././assets/scss/mixin.scss";
.product {
  .btn {
    width: 110px;
    height: 30px;
    margin-left: 10px;
  }
  .content {
    width: 100%;
    .product-bgImg1 {
      @include bgImg(100%, 718px, "/imgs/product/product-bg-1.png", container);
      text-align: center;
      margin-bottom: 38px;
      p:first-child {
        display: inline-block;
        font-size: 80px;
        margin-top: 55px;
      }
      & p:nth-child(2) {
        font-size: 24px;
        margin: 13px 0 20px;
      }
      span {
        font-size: 16px;
        margin-bottom: 40px;
      }
      span::after {
        content: "|";
        margin: 0 15px;
      }
      span:last-child::after {
        content: "";
      }
      .price {
        p {
          display: inline;
        }
        p:nth-child(1) {
          font-size: 38px;
          margin-right: 11px;
        }
        p:nth-child(2) {
          font-size: 26px;
          text-decoration: line-through;
        }
      }
    }
    .product-bgImg2 {
      @include bgImg(1224px, 397px, "/imgs/product/product-bg-2.png");
      border: 1px solid #ccc;
    }
    .product-bgImg3 {
      @include bgImg(100%, 638px, "/imgs/product/product-bg-3.png");
    }
    .item-swiper{
        // margin:36px auto 52px;
        .desc{
          font-size:18px;
          color:#333333;
          text-align:center;
        }
        img{
          width:100%;
        }
      }
  }
}
</style>