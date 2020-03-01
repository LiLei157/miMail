<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name:"app",
  data() {
    return {
      res: []
    }
  },
  mounted () {
    this.axios.get('/list').then(res =>{
      console.log(res)
      this.res = res
    }).catch(error =>{
      console.log(error)
    });
    console.log(this.res)
  },
}
</script>
<style>

</style>
