<template>
  <!-- module组件,用于弹出组件 -->
  <div class="module-box">
    <!-- 遮盖层 -->
    <div class="cover"></div>
    <!-- 弹窗 -->
    <div class="dialog">
      <!-- 组件中dialog头 -->
      <div class="dialog-header">
        {{dialogTitle}}
        <div class="icon-close"></div>
      </div>
      <!-- 组件中dialog内容，这里使用插槽，更灵活，比如内容可以是form表单，可以是div等.. -->
      <div class="dialog-content">
        <slot name="body"></slot>
      </div>
      <!-- dialog footer：通常可以是按钮 -->
      <div class="dialog-footer">
        <!-- 确定按钮 -->
        <a href="javascript:;" class="btn sureBtn small-btn" v-if="btnType == 'sureBtn'">{{sureBtn}}</a>
        <!-- 取消按钮 -->
        <a
          href="javascript:;"
          class="btn cancelBtn small-btn"
          v-if="btnType == 'cancelBtn'"
        >{{cancelBtn}}</a>
        <!-- 有确定和取消按钮的 -->
        <div class="btn-group" v-if="btnType == 'bothBtn'">
          <a href="javascript:;" class="btn sureBtn small-btn">{{sureBtn}}</a>
          <a href="javascript:;" class="btn cancelBtn small-btn">{{cancelBtn}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "module",
  props: {
    // 弹窗类型：1、小：small   2、中：middle  3、大：large 4、form：表单
    moduleType: {
      type: String,
      default: "form"
    },
    // 弹窗组件标题
    dialogTitle: String,
    //button按钮类型：1、只有一个确定按钮 sure 2、只有一个取消按钮：cancel  3、确定和取消按钮
    btnType: String,
    // 确定按钮文本，默认为确定，在确认订单页面的该组件中，文本为“保存”
    sureBtn: {
      type: String,
      default: "确定"
    },
    cancelBtn: {
      type: String,
      default: "取消"
    },
    showModule: Boolean
  }
};
</script>

<style lang="scss" scoped>
@import ".././assets/scss/config.scss";
@import ".././assets/scss/btnStyle.scss";
@import ".././assets/scss/mixin.scss";
.module-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9998;
  .cover {
    opacity: 0.5;
    background-color: #000;
    width: 100%;
    height: 100%;
  }
  .dialog {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 660px;
    height: auto;
    background-color: #fff;
    .dialog-header {
      height: 60px;
      font-size: 16px;
      line-height: 60px;
      padding: 0 26px;
      background-color: $colorJ;
      position: relative;
      .icon-close{
          @include bgImg(16px,16px,"/imgs/icon-close.png");
          position: absolute;
          top: 50%;
          right: 25px;
          transform: translateY(-50%);
      }
    }
    .dialog-content {
      padding: 40px;
      background-color: #fff;
      font-size: 14px;
    }
    .dialog-footer {
      text-align: center;
      padding: 20px;
      background-color: $colorJ;
      a {
        display: inline-block;
      }
    }
  }
}
</style>