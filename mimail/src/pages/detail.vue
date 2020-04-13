<template>
  <div class="detail">
    <product-params></product-params>
    <div class="container clearfix">
      <!-- 左侧轮播图 -->
      <div class="left-swiper f-left">
        <img :src='this.detail.mainImage'>
      </div>
      <!-- 右侧商品详情 -->
      <div class="right-detail f-right">
        <p class="title">{{this.detail.name}}</p>
        <p class="discribe">
          相机全新升级 / 960帧超慢动作 / 手持超级夜景 / 全球首款双频GPS / 骁龙845处理器 / 红
          外人脸解锁 / AI变焦双摄 / 三星 AMOLED 屏
        </p>
        <p>京东自营</p>
        <div class="price-box">
          <!-- 打折价 -->
          <span class="discount" v-if='!detail.detail'>{{this.detail.price}}元</span>
          <!-- 原价 -->
          <span class="price" v-if='detail.detail'>{{detail.price}}元</span>
        </div>
        <div class="hr"></div>
        <!-- 地址模块 -->
        <div class="address-box">
          <span></span>
          <span class="province">北京</span>
          <span class="city">北京市</span>
          <span class="county">昌平区</span>
          <span class="dis-add">北京路33号</span>
          <span class="md-adress" @click="addressHandler">修改地址</span>
          <p class="count">有现货</p>
        </div>
        <!-- 版本 -->
        <div class="version">
          <p>选择版本</p>
          <ul>
            <li v-for="(item,index) in proVersion.configVersion"
             :key='index' 
             @click="configClick(item,index)" 
             :class="configVersionIndex == index ? 'active':''" >
              {{item.type}}
              <span>{{item.price}}元</span>
            </li>
          </ul>
          <p>选择颜色</p>
          <ul>
            <li 
            v-for="(item,index) in proVersion.colorVersion" 
            :key="index"
            @click="colorClick(item,index)"
            :class="colorVersionIndex == index ? 'active': ''"
            >{{item}}</li>
          </ul>
        </div>
        <!-- 汇总 -->
        <div class="summmary">
          <div class="left">
            <span>小米8</span>
            <span>{{this.active.config.type}}</span>
            <span>{{this.active.color}}</span>
          </div>
          <div class="right">
            <!-- <span>{{this.active.config.price}}</span>
            <span v-if="this.active.config.discount">1499</span> -->
          </div>
          <div class="sum-price">
            <span>总计：</span>
            <span>{{this.active.config.price}}</span>
          </div>
        </div>
        <div class="button">
          <button class="btn sureBtn" @click="addCart">加入购物车</button>
          <button class="btn cancelBtn">喜欢</button>
        </div>
      </div>
    </div>
    <!-- 底部说明 -->
    <div class="footer-box">
      <div class="container">
        <p>价格说明</p>
        <div class="bg-img"></div>
      </div>
    </div>
    <service-bar></service-bar>
    <!-- module弹出层 -->
    <module 
    dialogTitle="地址修改"  
    :showModule="isShow"
    @closeDialog="closeDialog">
      <template v-slot:body>
        <Form :form="form" :formList="formList" @transmit="transmit"></Form>
      </template>
    </module>
  </div>
</template>

<script>
// import { Swiper, SwiperSlide } from "vue-awesome-swiper";
// import "swiper/css/swiper.css";
import ProductParams from "../components/ProductParams";
import ServiceBar from '../components/ServiceBar';
import Module from '../components/Module';
import Form from '../components/Form';
export default {
  name: "detail",
  components: {
    // Swiper,
    // SwiperSlide,
    ProductParams,
    ServiceBar,
    Module,
    Form
  },
  data() {
    return {
      id: this.$route.params.id,
      isShow:false,
      // 产品详情
      detail:{},
      // 需要双向绑定的字段
      configVersionIndex:0, // 配置版本号索引，用于设置选中样式
      colorVersionIndex:0,
      addressFormData:{},
      form:{
        name:'',
        phone:'',
        city:'',
        disAddress:'',
        code:''
      },
      // 需要设置的表单字段  style代表输入框的长短类型: 1:较短的长度   2:较长单独一行的输入框
      formList:[
        {
          type:'text',
          placeholder:'请输入姓名',
          model:'name',
          style:1
        },
        {
          type:'text',
          placeholder:'请输入手机号',
          model:'phone',
          style:1
        },
        {
          type:'text',
          placeholder:'请输入省市县地址',
          model:'city',
          sytle:2
        },
        {
          type:'text',
          placeholder:'请输入详细的地址',
          model:'disAddress',
          style:2
        },
        {
          type:'text',
          placeholder:'请输入邮编',
          model:'code',
          style:1
        }
      ],
      // 版本号和颜色
      proVersion:{
        configVersion:[
          {
            type:'6GB+64GB 全网通',
            price:1099
          },
          {
            type:'6GB+128GB 全网通',
            price:1399
          }
        ],
        colorVersion:['珍珠白','闪耀黑','靓丽红','炫酷紫']
      },
      active:{
        config:'',
        color:''
      }
    }
  },
  methods: {
    // 获取商品详情
    getDetail() {
      this.axios.get(`/products/${this.id}`).then(res => {
        // console.log(res);
        this.detail = res
      });
    },
    // 地址修改
    addressHandler(){
      this.isShow = true
    },
    //关闭弹窗
    closeDialog(){
      this.isShow = false
    },
    // 配置版本点击事件主要做了2件事：1、点击选中的时候应用active样式  2、把点击项的值传到data中的变量中
    configClick(item,index){
      this.configVersionIndex = index
      this.active.config = item
    },
    colorClick(item,index){
      this.colorVersionIndex = index
      this.active.color = item
    },
    transmit(val){
      this.addressFormData = val
      this.$store.dispatch('saveAddressForm',this.addressFormData)
      console.log(this.addressFormData)
      // 保存到vuex之后置空
      this.addressFormData = {}
      console.log(this.addressFormData)
      this.isShow = false
    },
    //添加商品至购物车
    addCart(){
      this.axios.post('/carts',{
        productId:this.id,
        selected:true
      }).then(res =>{
        // console.log(res)
        this.$store.dispatch('saveCartCount',res.cartTotalQuantity)
      })
    }
  },
  created() {
    this.getDetail();
  }
};
</script>

<style lang="scss" scoped>
@import ".././assets/scss/base.scss";
@import ".././assets/scss/btnStyle.scss";
@import ".././assets/scss/config.scss";
.detail {
  .container {
    .left-swiper {
      width: 642px;
      
      img{
        width:100%;
      }
    }
    // 右侧详情
    .right-detail {
      width: 584px;
      .title {
        font-size: $fontC;
        color: $colorB;
        margin-bottom: 16px;
      }
      .discribe {
        font-size: $fontJ;
        color: $colorD;
        margin-bottom: 26px;
      }
      p:nth-child(3) {
        color: $colorA;
        margin-bottom: 16px;
        font-weight: bold;
      }
      .price-box {
        .discount {
          color: $colorA;
          font-size: $fontG;
          margin-right: 10px;
        }
        .price {
          display: inline-block;
          color: $colorD;
          font-size: $fontJ;
          text-decoration: line-through;
        }
      }
      .hr {
        width: 100%;
        height: 1px;
        background-color: #e5e5e5;
        margin: 25px 0 28px 0;
      }
      .address-box {
        width: 100%;
        height: 108px;
        box-sizing: border-box;
        border: 1px solid #e5e5e5;
        background-color: #fafafa;
        padding: 27px 0 0 34px;
        position: relative;
        span {
          margin-right: 10px;
          font-size: 16px;
          color: $colorB;
        }
        span:first-child {
          display: inline-block;
          width: 20px;
          height: 22px;
          background: url("/imgs/detail/icon-loc.png") center;
          background-size: contain;
          vertical-align: middle;
        }
        .md-adress {
          color: $colorA;
          position: absolute;
          top: 28px;
          right: 20px;
          cursor: pointer;
        }
        .count {
          color: $colorA;
          font-size: 16px;
          margin-top: 16px;
        }
      }
      .version {
        width: 584px;
        p {
          font-size: $fontH;
          margin: 20px 0 30px 0;
          color: $colorB;
        }
        ul {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          width: 584px;
          .active {
            border: 1px solid $colorA;
          }
          li {
            display: block;
            width: 287px;
            height: 50px;
            border: 1px solid #e5e5e5;
            outline: none;
            font-size: $fontI;
            line-height: 50px;
            padding-left: 34px;
            box-sizing: border-box;
            cursor: pointer;
            margin-bottom: 15px;
          }
        }
      }
      .summmary {
        width: 100%;
        height: 108px;
        box-sizing: border-box;
        background-color: #fafafa;
        margin: 35px 0 30px 0;
        padding: 24px 33px 29px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        span {
          margin-right: 10px;
          font-size: 16px;
        }
        .right {
          span:last-child {
            margin-right: 0;
            color: $colorC;
            text-decoration: line-through;
          }
        }
        .sum-price {
          width: 100%;
          margin-top: 20px;
          span {
            color: $colorA;
            font-size: 28px;
          }
        }
      }
      .button{
        height: 54px;
        margin-bottom: 50px;
        cursor:pointer;
        .sureBtn{
          width: 300px;
          height: 100%;
          font-size: 16px;
        }
        .cancelBtn{
          width: 142px;
          height: 100%;
          font-size: 16px;
          margin-left: 20px;
        }
      }
    }
  }
  .footer-box{
    background-color: #F3F3F3;
    height: 340px;
    box-sizing: border-box;
    padding-top: 38px;
    .container{
      p{
        font-size: $fontE;
        color: $colorB;
      }
      .bg-img{
        margin-top: 30px;
        width:100%;
        height: 189px;
        background:url('/imgs/detail/item-price.jpeg') no-repeat;
      }
    }
  }
}
</style>
