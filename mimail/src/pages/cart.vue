<template>
  <div class="cart-page">
    <order-header
    largeTitle="我的购物车"
    discribeTitle="温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算"
    ></order-header>
    <!-- cart主体部分 -->
    <div class="content">
      <div class="container">
        <div class="cart-box">
          <ul class="cart-list">
            <!-- 购物车第一行标题 -->
            <li class="first-row">
              <div class="col1">
                <div class="checkbox" :class="{'checked':selectAll}" @click="allSelected"></div>
                <span>全选</span>
              </div>
              <div class="col2">商品名称</div>
              <div class="col3">商品价格</div>
              <div class="col4">商城数量</div>
              <div class="col5">小计</div>
              <div class="col6">操作</div>
            </li>
          </ul>  
            
          <ul class="cart-list">
            <!-- 购物车每一行商品数据 -->
            <li class="item-row" v-for="(item,index) in cartList" :key="index">
              <div class="col1">
                <div
                  class="checkbox"
                  :class="{'checked':item.productSelected}"
                  @click="updateProduct(item)"
                ></div>
              </div>
              <!-- 第二列 -->
              <div class="col2">
                <div class="box">
                  <!-- 左侧图片 -->
                  <div class="img">
                    <img :src="item.productMainImage" alt="">
                  </div>
                  <!-- 右侧文字 -->
                  <p>{{item.productName + item.productSubtitle}}</p>
                </div>
              </div>

              <div class="col3">{{item.productPrice}}</div>
              <div class="col4">
                <div class="box">
                  <div class="reduce" @click="updateProduct(item,'-')">-</div>
                  <div class="num">{{item.quantity}}</div>
                  <div class="add" @click="updateProduct(item,'+')">+</div>
                </div>
              </div>
              <div class="col5">{{item.productTotalPrice}}</div>
              <div class="col6">
                <div class="operation"></div>
              </div>
            </li>
          </ul>  
        </div>
        <div class="cart-footer">
          <div class="left">
            <span>继续购物</span>
            <span class="line">|</span>
            <span>
              共
              <span class="allTotal">{{this.cartLength}}</span>件商品，已选中
              <span class="selectedTotal">{{this.selectedProductTotal}}</span>件
            </span>
          </div>
          <div class="right">
            <span class="sum">
              合计：
              <span>{{this.cartTotalPrice}}</span>元
            </span>
            <span class="btn sureBtn">去结算</span>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <order-footer></order-footer>
  </div>
</template>

<script>
import OrderHeader from "../components/OrderHeader";
import orderFooter from "../components/OrderFooter";
import ServiceBar from "../components/ServiceBar";
export default {
  name: "cart",
  components: {
    OrderHeader,
    orderFooter,
    ServiceBar
  },
  data() {
    return {
      //购物车列表
      cartList: [],
      // 是否全部选中
      selectAll: false,
      //已选中商品总价格
      cartTotalPrice: 0,
      //购物车商品数
      cartLength: 0,
      //已选中产品数
      selectedProductTotal: 0
    };
  },
  created() {
    this.getCartList();
  },
  methods: {
    // 获取购物车列表
    getCartList() {
      this.axios.get("/carts").then(res => {
        console.log(res);
        this.renderData(res);
      });
    },
    // 点击全选和非全选
    allSelected() {
      let path = this.selectAll ? "/carts/unSelectAll" : "/carts/selectAll";
      this.axios.put(path).then(res => {
        this.renderData(res);
      });
    },
    /**
     * updateProduct:
     * item代表当前数据项，type类型：更新当前数据的类型：checked，+，-
     */
    updateProduct(item, type) {
      let quantity = item.quantity; // 接口返回的数量
      let selected = item.productSelected; //接口返回的当前item的选中状态
      if (type == "-") {
        //如果类型是-
        if (quantity == 1) {
          return alert("商品数量最少为1");
        }
        --quantity; // 减一件数量时，肯定是在当前数量上减一次作为参数请求接口
      } else if (type == "+") {
        if (quantity == item.productStock) {
          // 如果当前数量大于等于库存数量时，则不允许在+
          return alert("当前商品数量大于库存数");
        }
        ++quantity; // +一件，肯定是在当前数量 +1 请求接口
      } else {
        // 选中和非选中
        selected = !selected;
      }
      this.axios
        .put(`/carts/${item.productId}`, {
          quantity,
          selected
        })
        .then(res => {
          this.renderData(res);
        });
    },
    // 数据赋值，每一次购物车列表选中和非选中，数量+，-都需要重新渲染一次数据
    renderData(res) {
      this.cartList = res.cartProductVoList || [];
      this.selectAll = res.selectedAll;
      this.cartLength = res.cartProductVoList.length;
      this.cartTotalPrice = res.cartTotalPrice;
      // 已选中商品数通过对商品列表过滤出selectProduct状态为true的新数组的长度
      this.selectedProductTotal = this.cartList.filter(
        item => item.productSelected
      ).length;
    }
  }
};
</script>

<style lang="scss" scoped>
@import ".././assets/scss/base.scss";
@import ".././assets/scss/config.scss";
@import ".././assets/scss/btnStyle.scss";
.cart-page {
  .content {
    background-color: $colorJ;
    padding: 30px 0 114px 0;
    box-sizing: border-box;
    .container {
      .cart-box {
        padding: 0 43px;
        box-sizing: border-box;
        background-color: #fff;
        font-size: 14px;
        .cart-list {
          .first-row,.item-row{
            border-bottom: 1px solid $colorH;
          }
          .col1,
          .col3,
          .col5,
          .col6 {
            flex: 1;
          }
          .col2 {
            flex: 4;
          }
          .col4 {
            flex: 2;
          }
          .col2,
          .col3,
          .col4,
          .col5,
          .col6 {
            text-align: center;
          }
          .checkbox {
            display: inline-block;
            width: 22px;
            height: 22px;
            vertical-align: middle;
            margin-right: 15px;
            box-sizing: border-box;
            border: 1px solid $colorH;
            &.checked {
              background: $colorA url("/imgs/icon-gou.png") no-repeat center;
              background-size: 16px 12px;
            }
          }
          .first-row {
            width: 100%;
            height: 79px;
            line-height: 79px;
            display: flex;
            justify-content: space-between;
          }
          .item-row {
            height: 124px;
            line-height: 124px;
            display: flex;
            .col2 {
              position: relative;
              .box{
                width: 100%;
                height: 80px;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                // background-color: skyblue;
                display: flex;
                .img{
                  flex: 1;
                  width: 80px;
                  height: 80px;
                  vertical-align: middle;
                  img{
                    width: 80px;
                  }
                }
                p{
                  line-height: 80px;
                  flex:2;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
              }
            }

            .col4 {
              .box {
                display: inline-block;
                width: 150px;
                height: 40px;
                line-height: 40px;
                border: 1px solid #e5e5e5;
                font-size: 14px;
                .reduce,
                .num,
                .add {
                  display: inline-block;
                }
                .reduce,
                .add {
                  cursor: pointer;
                }
                .num {
                  margin: 0 46px;
                }
              }
            }
            .col6 {
              position: relative;
              .operation {
                width: 20px;
                height: 20px;
                background: url("/imgs/icon-close.png") no-repeat center;
                background-size: contain;
                position: absolute;
                top: 50%;
                right: 50%;
                transform: translate(50%, -50%);
                cursor: pointer;
              }
            }
          }
        }
      }
      .cart-footer {
        font-size: 14px;
        padding-top: 36px;
        display: flex;
        justify-content: space-between;
        .left {
          line-height: 50px;
          .line {
            margin: 36px 18px;
          }
          .allTotal,
          .selectedTotal {
            margin: 0 5px;
            color: $colorA;
          }
        }

        .right {
          .sum {
            color: $colorA;
            span {
              font-size: 18px;
              font-weight: bold;
            }
          }
          .btn {
            display: inline-block;
            width: 202px;
            height: 50px;
            line-height: 50px;
            margin-left: 36px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>