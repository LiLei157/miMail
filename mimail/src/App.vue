<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>

export default {
  name:"app",
  mounted () {
    this.getUser();
    this.getCartCount()
  },
  methods: {
    // 当加载根元素的时候，即每次刷新页面时,就向服务器发送请求拉取用户信息
    getUser() {
      this.axios.get('/user').then(res=>{
        this.$store.dispatch('saveUserName',res.username)
      })
    },
    getCartCount(){
      this.axios.get('/carts/products/sum').then(res =>{
        // res ? this.$store.dispatch('saveCartCount',res) : this.$store.dispatch('saveCartCount',0)
        this.$store.dispatch('saveCartCount',res)
      })
    }
  },
}
</script>
<style lang="scss">
  @import './assets/scss/reset.scss';
</style>
