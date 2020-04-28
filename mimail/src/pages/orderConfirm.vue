<template>
  <div class="orderConfirm">
    <order-header largeTitle="确认订单"></order-header>
    <div class="content">
      <div class="container">
        <div class="address-box">
          <p class="title">收货地址</p>
          <ul class="add-list">
            <li
              class="add-item"
              v-for="(item,index) in addList"
              :key="index"
              :class="checkIndex == index ? 'checked':''"
              @click="clickSelected(item,index)"
            >
              <p class="name">{{item.receiverName}}</p>
              <p class="phone">{{item.receiverMobile}}</p>
              <p class="address">
                <span>{{item.receiverProvince}}</span>
                <span>{{item.receiverCity}}</span>
                <span>{{item.receiverDistrict}}</span>
              </p>
              <div class="bottom-button">
                <i class="el-icon-delete" @click="deleteAddr(item)"></i>
                <i class="el-icon-edit" @click="editAddr(item)"></i>
              </div>
            </li>
            <!-- 添加新地址的div永远是最后一个 -->
            <li class="last-li add-item">
              <div class="box">
                <div class="add" @click="addAddress"></div>
                <p>添加新地址</p>
              </div>
            </li>
          </ul>
          <!-- 已选中商品显示，配送方式，发票等部分 -->
          <div class="cartbox">
            <div class="cart-wraper">
              <p>商品信息</p>
              <ul class="cart-list">
                <li class="cart-item" v-for="(item,index) in cartsList" :key="index">
                  <div class="product-name">
                    <div class="img">
                      <img :src="item.productMainImage" alt />
                    </div>
                    <p>{{item.productName + item.productSubtitle}}</p>
                  </div>
                  <p class="product-price">{{item.productPrice}} x {{item.quantity}}</p>
                  <p class="total-price">{{item.productTotalPrice}}元</p>
                </li>
              </ul>
            </div>
            <div class="first-row">
              <span>配送方式</span>
              <span>包邮</span>
            </div>
            <div class="sec-row">
              <span>发票</span>
              <span>电子发票</span>
              <span>个人</span>
            </div>
            <!-- 商品汇总信息 -->
            <div class="summary">
              <div class="left-summary"></div>
              <div class="right-summary">
                <div class="key">
                  <p>商品件数:</p>
                  <p>商品总价:</p>
                  <p>优惠活动:</p>
                  <p>运费:</p>
                </div>
                <div class="value">
                  <p>{{cartsRes.cartTotalQuantity}}件</p>
                  <p>{{cartsRes.cartTotalPrice}}元</p>
                  <p>0元</p>
                  <p>0元</p>
                </div>
              </div>
            </div>
            <!-- 返回购物车和去结算按钮 -->
            <div class="btn-box clearfix">
              <div class="btn sureBtn f-right" @click="clickPay">去结算</div>
              <div class="btn cancelBtn f-right" @click="backCart">返回购物车</div>
            </div>
          </div>
        </div>
      </div>
      <!-- Module弹出层公共组件 -->
      <module :showModule="isShow" dialogTitle="添加收货地址" @closeDialog="closeDialog">
        <template v-slot:body>
          <Form :form="form" :formList="formList" @transmit="transmit"></Form>
        </template>
      </module>
    </div>
  </div>
</template>

<script>
import OrderHeader from "../components/OrderHeader";
import Module from "../components/Module";
import Form from "../components/Form";
export default {
  name: "order-confirm",
  components: {
    OrderHeader,
    Module,
    Form
  },
  data() {
    return {
      // 地址列表
      addList: [],
      //已选中商品列表
      cartsList: [],
      //请求购物车返回的数据对象
      cartsRes: {},
      //地址索引，用于设置点击选中样式
      checkIndex:0,
      addressId:0,  // 地址id号，结算时需要添加一个query参数
      // 用于存储已选中的地址项
      selectedAddress:{},
      // 弹出层显示状态，默认不显示
      isShow: false,
      form: {
        receiverName: "",
        receiverPhone: "",
        receiverMobile: "",
        receiverProvince: "",
        receiverCity: "",
        receiverDistrict: "",
        receiverAddress: "",
        receiverZip: ""
      },
      formList: [
        {
          type: "text",
          placeholder: "请输入姓名",
          model: "receiverName",
          style: 1
        },
        {
          type: "text",
          placeholder: "请输入phone",
          model: "receiverPhone",
          style: 1
        },
        {
          type: "text",
          placeholder: "请输入手机号",
          model: "receiverMobile",
          style: 1
        },
        // 省级
        {
          type: "text",
          placeholder: "请输入省份",
          model: "receiverProvince",
          style: 0
        },
        // 市级
        {
          type: "text",
          placeholder: "请输入城市",
          model: "receiverCity",
          style: 0
        },
        // 县级
        {
          type: "text",
          placeholder: "请输入县级城市",
          model: "receiverDistrict",
          style: 0
        },
        {
          type: "text",
          placeholder: "请输入详细地址",
          model: "receiverAddress",
          style: 2
        },
        {
          type: "text",
          placeholder: "请输入邮编",
          model: "receiverZip",
          style: 2
        }
      ]
    };
  },
  mounted() {
    this.getAddressList();
    this.getSelectedList();
  },
  methods: {
    // 获取地址列表
    getAddressList() {
      this.axios.get("/shippings").then(res => {
        this.addList = res.list;
        console.log(this.addList)
      });
    },
    //获取已选中商品列表：只需要筛选当前购物车列表中每一项item的选中状态为true
    getSelectedList() {
      this.axios.get("/carts").then(res => {
        this.cartsRes = res;
        this.cartsList = res.cartProductVoList.filter(
          item => item.productSelected
        );
        console.log(res);
      });
    },
    //删除地址
    deleteAddr(item) {
      let id = item.id;
      this.axios.delete(`/shippings/${id}`).then(() => {
        this.getAddressList();
      });
    },
    //新增地址
    addAddress() {
      this.isShow = true;
    },
    // 点击选中
    clickSelected(item,index){
      this.checkIndex = index
      this.addressId = item.id
      console.log(index,item)
      this.axios.get(`/shippings/${item.id}`).then((res)=>{
        this.selectedAddress = res
      })
    },
  //更新地址：未完成
    editAddr(item) {
      this.form = item;
      this.isShow = true;
      //   this.transmit()
    },
    //关闭对话框
    closeDialog() {
      this.isShow = false;
    },
    // 返回购物车
    backCart(){
      this.$router.push({name:'cart'})
    },
    // 跳转到支付页面结算，跳转时会把当前选中的address地址作为参数传递到下个页面
    clickPay(){
      // 点击结算创建订单,把订单号作为query查询参数传给下个页面
      console.log(this.addressId)
      this.axios('/orders',{params:{
        shippingId:this.addressId
      }}).then(()=>{
        this.$router.push({path:'orderPay',query:{shippingId:this.addressId}})
      })
    },
    //对子组件Form传递的数据进行处理
    transmit(form) {
      console.log(form);
      this.closeDialog();
      this.axios
        .post("/shippings", {
          receiverName: form.receiverName,
          receiverPhone: form.receiverPhone,
          receiverMobile: form.receiverMobile,
          receiverProvince: form.receiverProvince,
          receiverCity: form.receiverCity,
          receiverDistrict: form.receiverDistrict,
          receiverAddress: form.receiverAddress,
          receiverZip: form.receiverZip
        })
        .then(() => {
          this.getAddressList();
          this.form = {};
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import ".././assets/scss/base.scss";
@import ".././assets/scss/config.scss";
@import ".././assets/scss/btnStyle.scss";
.orderConfirm {
  .content {
    width: 100%;
    background-color: $colorJ;
    padding: 30px 0 84px 0;
    .container {
      .address-box {
        background-color: $colorG;
        box-sizing: border-box;
        padding: 38px 30px 0 63px;
        .title {
          font-size: 20px;
          color: $colorB;
          margin-bottom: 20px;
          font-weight: 200;
        }
        .add-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          //选中地址
          .add-item {
            width: 270px;
            height: 180px;
            position: relative;
            box-sizing: border-box;
            border: 1px solid $colorH;
            padding: 20px 30px;
            cursor: pointer;
            margin-bottom: 10px;
            margin-right: 10px;
            .name {
              font-size: 20px;
              margin-bottom: 10px;
            }
            .phone {
              font-size: 12px;
              margin-bottom: 10px;
            }
            .address {
              font-size: 14px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              span {
                margin-right: 3px;
              }
            }
            .bottom-button {
              height: 50px;
              position: absolute;
              bottom: 10px;
              left: 30px;
              right: 30px;
              display: flex;
              justify-content: space-between;
              i {
                font-size: 20px;
                line-height: 50px;
              }
              i:hover {
                color: $colorA;
              }
            }
            &.checked {
              border: 1px solid $colorA;
            }
          }
          .last-li {
            position: relative;

            .add {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background: $colorH url("/imgs/icon-add.png") no-repeat center;
              background-size: 14px;
              transition: all 0.3s;
            }
            .add:hover {
              background-color: $colorA;
              transition: all 0.3s;
            }
            p {
              position: absolute;
              top: 65%;
              left: 50%;
              transform: translateX(-50%);
              font-size: $fontJ;
              color: $colorD;
            }
          }
        }
        .cartbox {
          width: 100%;
          margin-top: 34px;
          // border-top: 1px solid $colorH;
          .cart-wraper {
            & > p {
              font-size: 18px;
              font-weight: 200;
              margin-bottom: 10px;
            }
            .cart-list {
              .cart-item {
                display: flex;
                font-size: 16px;
                padding: 20px 0;
                .product-name {
                  flex: 3;
                  display: flex;
                  .img {
                    width: 30px;
                    height: 30px;
                    img {
                      width: 30px;
                      flex: 1;
                      vertical-align: middle;
                    }
                  }
                  p {
                    flex: 2;
                  }
                }
                .product-price {
                  flex: 2;
                }
                .total-price {
                  flex: 1;
                  color: $colorA;
                }
                &:last-child {
                  border-bottom: 1px solid $colorH;
                }
              }
            }
          }
          .first-row span:first-child,
          .sec-row span:first-child {
            display: inline-block;
            width: 300px;
            font-size: 18px;
            color: #000;
          }
          .first-row {
            font-size: 20px;
            color: $colorB;
            margin: 30px 0;
            span {
              color: $colorA;
              font-size: $fontI;
            }
          }
          .sec-row {
            font-size: 16px;
            span {
              font-size: 14px;
              color: $colorA;
            }
          }
          .summary {
            display: flex;
            justify-content: space-between;
            padding: 30px 0;
            border-bottom: 1px solid $colorH;
            .left-summary {
              flex: 4;
            }
            .right-summary {
              flex: 1;
              display: flex;
              .key {
                flex: 1;
                p {
                  font-size: 14px;
                  margin-bottom: 10px;
                  color: $colorC;
                }
              }
              .value {
                flex: 1;
                p {
                  font-size: 14px;
                  margin-bottom: 10px;
                  color: $colorA;
                }
              }
            }
          }
          .btn-box {
            padding: 30px 0;
            .btn {
              width: 202px;
              height: 50px;
              line-height: 50px;
              cursor: pointer;
            }
            .cancelBtn {
              margin-right: 10px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>