<template>
    <div>
        orderPay
    </div>
</template>

<script>
    export default {
        name:'orderPay',
        data() {
            return {
                // 上个页面传递过来的地址对象,用于本页面渲染地址
                checkAdd: {}
            }
        },
        mounted () {
            // console.log(this.$route.params.selectedAdd);
            this.checkAdd = this.$route.params.selectedAdd
        },
    }
</script>

<style lang="scss" scoped>

</style>