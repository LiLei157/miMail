<template>
  <div class="index">
    <div class="container">
      <!-- 轮播图 -->
      <div class="swiper-box">
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
    </div>
    <service-bar></service-bar>
  </div>
</template>

<script>
import ServiceBar from "../components/ServiceBar";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "index",
  components: {
    swiper,
    swiperSlide,
    ServiceBar
  },
  data() {
    return {
      // swiper相关配置
      swiperOption: {
        autoplay: true, //autoplay:开启自动播放
        effect: "cube", //effect:设置切换效果
        loop: true,
        cubeEffect:{
          slideShadow:true,
          shadow: true,
          shadowOffset: 100,
          shadowScale: 0.8
        },
        pagination: {
        el: ".swiper-pagination",
        clickable: true
        },
        navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
        },
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
          id: "47",
          imgUrl: "/imgs/slider/slide-4.jpg"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import ".././assets/scss/base.scss";
.index {
  .container {
    .swiper-box {
      .swiper-container {
        height: 451px;
        .swiper-icon {
          width: 100%;
          height: 100%;
        }
        .swiper-button-prev{
          left: 275px;
        }
      }
    }
  }
}
</style>