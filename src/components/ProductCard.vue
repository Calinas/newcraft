<template>
    <a href="javascript:;" class="goodsCard">
        <div class="goodsCard__imgWrapper">
           <img :src="imageResize(goods.avatar,400,400)" class="goodsCard__img" v-lazy="goods.avatar">
        </div>
        <p class="goodsCard__title">{{goods.title}}</p>
        <dl>
            <dt class="goodsCard__price font-14">￥{{goods.price}}</dt>
            <dd class="goodsCard__brand">{{goods.brand}}</dd>
        </dl>
    </a>
</template>

<script>
    export default {
        name: 'ProductCard',
        props: {
            goods: Object
        },
        data () {
            return {

            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
    .goodsCard {
        width: 100%;
        display: block;
        &__imgWrapper {
             width: 100%;
             img {
                 width: 100%;
             }
         }
        &__title {
             overflow: hidden;
             white-space: nowrap;
             -ms-text-overflow: ellipsis;
             text-overflow: ellipsis;
             padding-top: 10px;
             font-size: 1.4rem;
             color: #1a1a1a;
             padding-bottom: 6px;
             text-align: left;
             padding-left: 1rem;
         }
         &__price {
              color: #982424;
              font-size: 13px;
          }
          &__brand {
               font-size: 12px;
               color: #969696;
               width: 40%;
               white-space: nowrap;
               overflow: hidden;
               -ms-text-overflow: ellipsis;
               text-overflow: ellipsis;
               text-align: right;
           }
         dl {
             padding: 0 10px;
             overflow: hidden;
         }
         dt {
             float: left;
         }
         dd {
             float: right;
         }
    }
</style>