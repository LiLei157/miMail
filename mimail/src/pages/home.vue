<template>
    <div>
        <nav-header></nav-header>
        <router-view></router-view>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
    import NavHeader from '../components/NavHeader'
    import NavFooter from '../components/NavFooter'
    export default {
        name:'home',    // name属性：非必选项
        components:{
            NavHeader,
            NavFooter
        }
    }
</script>

<style lang="scss" scoped>

</style>