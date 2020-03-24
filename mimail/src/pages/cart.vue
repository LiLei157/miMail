<template>
    <div>
        <order-header></order-header>
        <h1>cart</h1>
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