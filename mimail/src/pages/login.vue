<template>
  <div class="login-box">
    <!-- 登录页面顶部 -->
    <div class="login-header container">
      <a href="/#/index">
        <img src="/imgs/login-logo.png" alt />
      </a>
    </div>
    <!-- 登录页面中间部分 -->
    <div class="wrap">
      <div class="container">
        <div class="login-form">
          <div class="form-head">
            <span
              v-for="(item,index) in loginList"
              :key="index"
              @click="switchLogin(index)"
              :class="{current:loginIndex == index}"
            >{{item.label}}</span>
            <!-- <span @click="saoToLogin">扫码登录</span> -->
          </div>
          <div class="login-content-box">
            <!-- 账号登录div -->
            <div class="user-to-login" v-show="loginType == '0'">
              <div class="input">
                <input type="text" v-model="loginInfo.username" placeholder="邮箱/手机号码/小米ID" />
                <input type="password" v-model="loginInfo.password" placeholder="密码" />
              </div>
              <!-- 警告框 : 这里使用element-ui提供的图标库 -->
              <div class="warning" v-if="wraningText">
                <i class="el-icon-warning"></i>
                <span>{{wraningText}}</span>
              </div>
              <div class="btn sureBtn" @click="loginHandler">登录</div>
              <!-- 登录按钮下方 -->
              <div class="reg">
                <span @click="phoneHandler">手机短信登录/注册</span>
                <div>
                  <span @click="registerHandler">立即注册</span>
                  <span @click="passwordHandler">忘记密码?</span>
                </div>
              </div>
            </div>
            <!-- 扫码登录div -->
            <div class="saoma-to-login" v-show="loginType == '1'">
              <img src="imgs/download.png" alt />
              <p>
                使用
                <span class="sp1">小米商城app</span>扫一扫
              </p>
              <p>小米手机可打开「设置」>「小米帐号」扫码登录</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 登录页面footer -->
    <div class="login-footer"></div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  name: "login",
  data() {
    return {
      //用户信息，包括用户名和密码
      loginInfo:{
        username:'',
        password:''
      },
      loginList: [
        {
          type: "1",
          label: "账号登录"
        },
        {
          type: "2",
          label: "扫码登录"
        }
      ],
      //登录类型: 1：账号登录   2、扫码登录
      loginType: "0",
      loginIndex: 0,
      isclick: false,
      wraningText: ""
    };
  },
  methods: {
    // 切换登录
    switchLogin(index) {
      switch (index) {
        case 0:
          this.loginType = "0";
          this.loginIndex = index;
          break;
        case 1:
          this.loginType = "1";
          this.loginIndex = index;
          break;
      }
    },
    // 登录处理：包括校检用户名和密码
    loginHandler() {
      // 获取输入框内容并判断，把错误信息赋值给warning中的span
      let {username,password} = this.loginInfo
      console.log(username,password)
      if (username == "") {
        this.wraningText = "请输入账号";
      } else if (password == "") {
        this.wraningText = "请输入密码";
      } else {
        // 如果账号密码都不为空，则发送login请求，根据服务器返回信息渲染warningText
        this.axios
          .post("/user/login", {
            username,
            password
          })
          .then(res => {
            console.log(res)
            //将服务器返回的userId设置到cookie中，每次发送请求就会自动在cookie上加上userId作为身份识别
            this.$cookie.set('userId',res.id,1)
            // 登录成功时vuex事件派发
            console.log('dispatch:',res.username)
            // //1、 通过dispatch()方法可以触发actions,可以通过mapAction的解构赋值简化
            // this.$store.dispatch('saveUserName',res.username)
            this.saveUserName(res.username)
            this.$router.push({ path: "/#/index" });
          })
      }
    },
    ...mapActions(['saveUserName']),
    phoneHandler() {},
    registerHandler() {},
    passwordHandler() {
      console.log("忘记密码??");
    }
  }
};
</script>

<style lang="scss" scoped>
@import ".././assets/scss/config.scss";
@import ".././assets/scss/mixin.scss";
@import ".././assets/scss/base.scss";
@import ".././assets/scss/btnStyle.scss";
.login-box {
  .login-header {
    height: 113px;
    margin: auto auto;
    background-color: &colorG;
    a {
      height: 100%;
      display: inline-block;
      img {
        height: 100%;
      }
    }
  }
  .wrap {
    height: 576px;
    background: url(/imgs/login-bg.jpg) no-repeat 50% center;
    .container {
      height: 100%;
      .login-form {
        width: 410px;
        height: 510px;
        background-color: $colorG;
        float: right;
        padding: 0 31px;
        margin: 36px 0;
        box-sizing: border-box;
        .form-head {
          text-align: center;
          margin: 40px 0 45px 0;
          // display: inline-block;
          .current {
            color: $colorA;
          }
          span {
            font-size: 24px;
            color: $colorC;
            cursor: pointer;
            // &:first-child {
            //   color: $colorA;
            // }
            &:first-child:after {
              content: "|";
              width: 2px;
              height: 25px;
              color: $colorC;
              vertical-align: center;
              margin: 0 35px;
              font-weight: bold;
            }
          }
        }
        .login-content-box {
          .user-to-login {
            input {
              display: inline-block;
              width: 100%;
              height: 48px;
              border: 1px solid #e5e5e5;
              font-size: 14px;
              color: $colorD;
              box-sizing: border-box;
              line-height: 48px;
              padding-left: 18px;
              &:first-child {
                margin-bottom: 20px;
              }
              &:last-child {
                margin-bottom: 20px;
              }
            }
            .warning {
              line-height: 40px;
              .el-icon-warning {
                display: inline-block;
                font-size: 14px;
                color: $colorA;
              }
              span {
                margin-left: 5px;
                font-size: 14px;
                color: $colorA;
              }
            }
            .btn {
              height: 50px;
              line-height: 50px;
              font-size: 16px;
              margin-bottom: 14px;
              cursor: pointer;
            }
            .reg {
              display: flex;
              justify-content: space-between;
              span {
                font-size: 14px;
                color: $colorD;
                cursor: pointer;
              }
              & > span {
                color: $colorA;
              }
              div span:hover {
                color: $colorA;
              }
              div span:first-child::after {
                content: "|";
                margin: 0 7px;
                vertical-align: middle;
              }
            }
          }
          .saoma-to-login {
            width: 100%;
            height: 306px;
            // border: 1px dashed #999;
            box-sizing: border-box;
            text-align: center;
            img {
              margin: 30px 0 20px;
            }
            p {
              color: $colorD;
              font-size: 14px;
              &:first-child {
                margin-bottom: 5px;
              }
            }
            .sp1 {
              color: $colorA;
            }
          }
        }
      }
    }
  }
}
</style>