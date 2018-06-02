<template>
    <div class="item" @click="jumpGoodsDetail(goods)">
        <img :src="imageResize(goods.cover,300,300)" alt="" class="img" v-lazy="goods.cover">
        <div class="text">
            <p class="title">{{goods.title}}</p>
            <p class="price">￥{{goods.price}}<span class="del-price" v-if="goods.market_price">{{goods.market_price}}</span></p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'WaterfallGoods',
        props: {
            goods: Object
        },
        data () {
            return {

            }
        },
        methods: {
            jumpGoodsDetail(goods){
                this.$emit('jumpGoodsDetail',goods.params.goods_id)
            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
    .item {
        float: left;
        width: calc(50% - 5px);
        margin-top: 10px;
        background-color: #fff;
        &:nth-child(2n + 1) {
            margin-right: 5px;
        }
        .img {
            display: block;
            width: 100%;
        }
        .text {
            padding: 012px;
            height: 80px;
            text-align: center;
            .title {
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                text-align: center;
                font-weight: normal;
                height: 32px;
                line-height: 32px;
                font-size: 1.4rem;
            }
            .price {
                height: 24px;
                line-height: 24px;
                color: #982424;
                font-size: 1.3rem;
            }
            .del-price {
                text-decoration: line-through;
                font-size: 12px;
                color: #969696;
                padding-left: 6px;
            }
        }
    }
</style>