<template>

        <a href="" class="nav__item">
            <img :src="menuData.cover" alt="">
            <span class="text">{{menuData.title}}</span>
        </a>

</template>

<script>
    export default {
        name: 'IndexMenu',
        props: {
            menuData: Object
        },
        data () {
            return {

            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">

        .nav__item {
             display: block;
             text-align: center;
             margin: 1.1rem 0px;
             font-size: 1.2rem;
             line-height: 1.4rem;
         }
         img {
             width: 2rem;
             display: block;
             margin: 0px auto 6px;
             border-radius: 50%;
         }
         .text {
             color: #000;
         }

</style>