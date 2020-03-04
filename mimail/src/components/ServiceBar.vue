<template>
    <div class="serviceBar">
        <ul class="container">
            <li>
                <div class="settings"></div>
                <span>预约维修服务</span>
            </li>
            <li>
                <div class="seven-day"></div>
                <span>七天无理由</span>
            </li>
            <li>
                <div class="fifteen-day"></div>
                <span>15天免费换货</span>
            </li>
            <li>
                <div class="post"></div>
                <span>满15天包邮</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name:"service-bar"
    }
</script>

<style lang="scss" scoped>
    @import '.././assets/scss/mixin.scss';
    @import '.././assets/scss/config.scss';
    .serviceBar{
        .container{
            li{
            display: inline-block;
            width: 24.8%;
            text-align: center;
            font-size: 16px;
            color: $colorC;
            line-height: 16px;
            padding: 23px 0;
            div{
                vertical-align: middle;
                margin-right: 8px;
            }
            .settings{
                display: inline-block;
                @include bgImg(20px,20px,"/imgs/icon-setting.png");
            }
            .seven-day{
                display: inline-block;
                @include bgImg(20px,20px,"/imgs/icon-7day.png");
            }
            .fifteen-day{
                display: inline-block;
                @include bgImg(20px,20px,"/imgs/icon-15day.png")
            }
            .post{
                display: inline-block;
                @include bgImg(20px,20px,"/imgs/icon-post.png")
            }
        }
    }
        
    }
</style>