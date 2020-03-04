<template>
  <div class="footer">
    <div class="footer-logo">
        <div class="logo"></div>
        <p>小米商城</p>
    </div>
    <div class="copyright">
      <div class="footer-nav">
        <a href>小米商城<span>|</span></a>
        <a href>MIUI<span>|</span></a>
        <a href>米家<span>|</span></a>
        <a href>米聊<span>|</span></a>
        <a href>多看<span>|</span></a>
        <a href>游戏<span>|</span></a>
        <a href>政企服务<span>|</span></a>
        <a href>小米天猫店<span>|</span></a>
        <a href>小米集团隐私政策<span>|</span></a>
        <a href>小米公司儿童信息保护规则<span>|</span></a>
        <a href>小米商城隐私政策<span>|</span></a>
        <a href>小米商城用户协议<span>|</span></a>
        <a href>问题反馈<span>|</span></a>
        <a href>Select Location</a>
      </div>
      <div class="footer-nav">
          <p>© mi.com 京ICP证110507号 京ICP备10046444号 京公网安备11010802020134号 京网文[2020]0276-042号</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "nav-footer"
};
</script>

<style lang="scss" scoped>
    @import '.././assets/scss/config.scss';
    @import '.././assets/scss/mixin.scss';
   .footer{
       border-top: 4px solid $colorA;
       background-color: $colorB;
       height: 230px;
       text-align: center;
       box-sizing: border-box;
       .footer-logo{
           .logo{
               display: inline-block;
               @include bgImg(53px,36px,'/imgs/logo-footer.png',contain);
               margin-top: 46px;
            }
           p{
               color:$colorD;
               margin-top: 13px;
               font-size: 14px;
               line-height: 14px;
           }
        }
       .copyright{
           display: inline-block;
           margin-top: 31px;
           .footer-nav{
               a,p{
                   color:$colorD;
                   font-size: 16px;
                   span{
                       margin:0 5px;
                   }
               }
           }
       }
   } 
</style>