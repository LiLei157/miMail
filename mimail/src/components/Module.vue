<template>
  <transition name="slide">
    <!-- module组件,用于弹出组件 -->
    <div class="module-box" v-if="showModule">
      <!-- 遮盖层 -->
      <div class="cover"></div>
      <!-- 弹窗 -->
      <div class="dialog">
        <!-- 组件中dialog头 -->
        <div class="dialog-header">
          {{dialogTitle}}
          <div class="icon-close" @click="closeDialog"></div>
        </div>
        <!-- 组件中dialog内容，这里使用插槽，更灵活，比如内容可以是form表单，可以是div等.. -->
        <div class="dialog-content">
          <slot name="body"></slot>
        </div>
        <!-- dialog footer：通常可以是按钮 -->
        <div class="dialog-footer">
          <!-- 确定按钮 -->
          <a
            href="javascript:;"
            class="btn sureBtn small-btn"
            v-if="btnType == 'sureBtn'"
            @click="$emit('sureHandler')"
          >{{sureBtn}}</a>
          <!-- 取消按钮 -->
          <a
            href="javascript:;"
            class="btn cancelBtn small-btn"
            v-if="btnType == 'cancelBtn'"
            @click="cancelHandler"
          >{{cancelBtn}}</a>
          <!-- 有确定和取消按钮的 -->
          <div class="btn-group" v-if="btnType == 'bothBtn'">
            <a href="javascript:;" class="btn sureBtn small-btn">{{sureBtn}}</a>
            <a href="javascript:;" class="btn cancelBtn small-btn">{{cancelBtn}}</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
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
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    sureHandler(){
     
    }
  }
};
</script>

<style lang="scss" scoped>
@import ".././assets/scss/moduleStyle.scss";
</style>