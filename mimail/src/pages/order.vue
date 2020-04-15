<template>
    <div>
        <router-view></router-view>
        <order-footer></order-footer>
    </div>
</template>

<script>
    import OrderFooter from '../components/OrderFooter'
    export default {
        name:'order',
        components:{
            OrderFooter
        }
    }
</script>

<style lang="scss" scoped>

</style>