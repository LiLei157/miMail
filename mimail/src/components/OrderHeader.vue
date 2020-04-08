<template>
  <div class="order-header">
    <div class="container">
      <!-- orderHeader头左边部分包括：logo，大标题，小描述 -->
      <div class="left">
        <div class="nav-logo">
          <a href="/#/index"></a>
        </div>
        <div class="title">我的购物车</div>
        <div class="discribe">温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</div>
      </div>
      <div class="right">
        <p>{{username}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "order-header",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      username: state => state.username
    })
  }
};
</script>

<style lang="scss" scoped>
@import ".././assets/scss/base.scss";
@import ".././assets/scss/config.scss";
.order-header {
  height: 112px;
  border-bottom: 2px solid $colorA;
  box-sizing: border-box;
  .container {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-content: center;
    position: relative;
    .left {
      display: flex;
      justify-content: space-between;
    //   .nav-logo {
    //     width: 52px;
    //     height: 52px;
    //     position: absolute;
    //     top: 50%;
    //     transform: translateY(-50%);
    //     a::before{
    //         width: 52px;
    //         height: 52px;
    //         background: url('/imgs/logo-mi.png') no-repeat center;
    //     }
    //     a {
    //       display: inline-block;
    //       width: 104px;
    //       height: 52px;
    //     }
        
    //   }
      .title {
        font-size: $fontC;
        color: $colorB;
        line-height: 112px;
        margin-right: 17px;
      }
      .discribe {
        font-size: $fontJ;
        line-height: 112px;
        color: $colorD;
      }
    }
    .right {
      p {
        font-size: $fontI;
        color: $colorC;
        line-height: 112px;
      }
    }
  }
}
</style>