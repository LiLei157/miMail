<template>
    <div>
        <order-header></order-header>
        cart
        <order-footer></order-footer>
    </div>
</template>

<script>
    import OrderHeader from '../components/OrderHeader'
    import orderFooter from '../components/OrderFooter'
    export default {
        name:'cart',
        components:{
            OrderHeader,
            orderFooter
        }
    }
</script>

<style lang="scss" scoped>

</style>