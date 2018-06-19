<template>
    <div class="nav_bar">
        <a href="/cityList" class="nav_post"></a>
        <input type="text" placeholder="请输入关键字搜索">
        <a href="#0" class="nav_cart"></a>
        <a href="#0" class="nav_cart nav_message"></a>
        <a href="/login" class="nav_personal"></a>
        <!-- <router-link :to="{path: '/cityList'}" tag="a" class="nav_post">点击我跳转到列表页面</router-link> -->
    </div>
</template>

<script>
    export default {
        name: 'navbar',
        methods: {
        }
    }
</script>

<style scoped lang="scss">
    .nav_bar {
        background-color: #37363b;
        padding: 2px 8px;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        align-items: center;
        -webkit-align-items: center;
        height: 44px;
        a {
            background-size: 76% 76%;
            background-repeat: no-repeat;
            background-position: center center;
            display: block;
            height: 30px;
            width: 30px;
            flex-shrink: 0;
            -webkit-flex-shrink: 0;
            margin: 0px 6px;
        }
        input {
            width: 100%;
            display: block;
            color: white;
            height: 24px;
            border: none;
            outline: none;
            font-size: 1.2rem;
            border-bottom: 1px white solid;
            text-indent: 1.4rem;
            background: url(../assets/nav_seach.png) no-repeat left center;
            background-size: 1.2rem;
            appearance: none;
            -webkit-appearance: none;
            border-radius: 0px;
        }
        .nav_post {
            background-image: url(../assets/nav_post.png);
            margin-right: 14px;
            position: relative;
        }
        .nav_cart {
            background-image: url(../assets/nav_cart.png);
            margin-left: 14px;
            position: relative;
        }
        .nav_message {
            background-image: url(../assets/nav_message.png);
        }
        .nav_personal {
            background-image: url(../assets/nav_personal.png);
        }
    }
</style>