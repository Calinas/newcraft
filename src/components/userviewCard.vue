<template>
    <div class="userview flex">
        <div class="avatar">
            <img :src="imageResize(avatar,100,100)" alt="">
        </div>
        <p class="title" v-text="userInfo.uname"></p>
        <button class="button button-add-fav" v-if="!userInfo.is_follow">+关注</button>
        <button class="button button-is-fav" v-else>已关注</button>
    </div>
</template>

<script>
    export default {
        name: 'userviewCard',
        props: {
            userInfo: Object,
            avatar: ''
        },
        data () {
            return {

            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
    @import "../assets/style/_mixins.scss";
    @include flex;
    .userview {
        background-color: #fff;
        padding: 12px;
        margin: 10px 0;
        align-items: center;
        font-size: 1.4rem;
    }
    .avatar {
        width: 12%;
        margin-right: 10px;
        & > img {
            width: 100%;
            border-radius: 50%;
        }
    }
    .title {
        flex: 1;
    }
    .button {
        border: none;
        padding: 6px 0;
        background: #fff;
        width: 20%;
        border-radius: 6px;
        &-is-fav {
            box-shadow: inset 0 0 1px #982424, inset 0 0 1px 0 #982424;
            color: #982424;
        }
        &-add-fav {
            box-shadow: inset 0 0 1px #969696, inset 0 0 1px 0 #969696;
            color: #969696;
        }
    }
</style>
