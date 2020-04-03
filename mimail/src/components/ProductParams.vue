<template>
    <div id="product-navbar" :class="{'is-fixed':isFixed}">
        <div class="container" >
            <p>小米8</p>
            <div class="menu-params">
                <a href="javascript:;">概述</a><span>|</span>
                <a href="javascript:;">参数</a><span>|</span>
                <a href="javascript:;">用户评价</a>
                <!-- 在有的页面中，没有这个button，所以在这个组件中使用插槽，更灵活使用 -->
                <slot name="navbar"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'product-params',
        data() {
            return {
                isFixed: false
            }
        },
        created () {
            // 加载数据之后，注册该滚动监听事件
            window.addEventListener('scroll',this.setHeight);
        },
        methods:{
            // 如果只是单纯定义为方法，只要在调用该方法时，才会获取一次并比较，需要注册监听事件，实时监听滚动高度
            setHeight(){
                // 获取滚动高度
                let height = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
                // 比较滚动高度和组件顶部离浏览器顶部的距离，当滑动到这个距离时，把该组件设置为固定定位
                this.isFixed = height > 223 ? true : false
            }
        },
        destroyed(){
            window.removeEventListener('scroll',this.setHeight)
        }
    }
</script>

<style lang="scss" scoped>
    @import '.././assets/scss/config.scss';
    @import '.././assets/scss/base.scss';
    @import '.././assets/scss/mixin.scss';
    #product-navbar{
        height: 70px;
        line-height: 70px;
        border-top: 1px solid $colorH;
        background-color: #fff;
        transition: position 5s;
        .container{
            @include flex();
            p{
                font-size: $fontH;
                color:$colorB
            }
            .menu-params{
                a{
                    font-size: $fontJ;
                    color:$colorC
                }
                span{
                    margin:  0 10px;
                }
            }
        }
    }
    .is-fixed{
        position: fixed;
        top: 0;
        width: 100%;
        box-shadow: 0 3px 3px #ccc;
        transition: all .6s;
    }
</style>