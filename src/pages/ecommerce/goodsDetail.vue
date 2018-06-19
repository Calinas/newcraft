<template>
    <div class="fix-scroll-out">
        <div class="navbar">
            <a href="">详情</a>
            <a href="">评价</a>
            <router-link :to="{path:'/shoppingcart'}">
                <div class="icon-shop"></div>
            </router-link>
        </div>
        <div class="fix-scroll-inner">
            <div class="goodsDetail">
                <!-- 导航 -->

                <!-- 图片介绍 -->
                <div class="img-intro">
                    <div v-if="goodsInfo.imgs != ''">
                        <div v-for="item in productImg" class="width100">
                            <img v-img:productImg :src="item+'?imageView2/0/h/750'" v-lazy="item">
                        </div>
                    </div>
                    <div v-else>

                        <img :src="goodsInfo.default_image+'?imageView2/0/h/750'"
                             style="width: 100%">
                    </div>
                    <div v-if="goodsInfo.description && goodsInfo.description != ''">
                        <div v-html="goodsInfo.description" class="descriptionBox"></div>
                    </div>
                </div>
                <!-- 商家 -->
                <div class="commonWrapper" style="margin: 15px 0px;">
                    <div class="flag">
                        <div class="flag__item flag__item--middle flag__item--width15">
                            <img src="">
                        </div>
                        <div class="flag__item flag__item--middle flag__item--width60">
                            <p class="font-black" style="font-size: 1.4rem;">weis</p>
                            <p style="font-size: 1.2rem;">在售商品
                                <i class="font-red">31</i>件</p>
                        </div>
                        <div class="flag__item flag__item--middle flag__item--width20">
                            <p class="button button--red">
                                +关注</p>
                        </div>
                    </div>
                </div>
                <!-- 作品留言 -->
                <div class="contentBlock" style="margin-top: 15px;">
                    <div class="contentBlock__title border-1px">
                        <dl>
                            <dt>作品留言(0)</dt>
                            <dd>
                                <i class="iconfont iconfont-global-arrow-right"></i>
                            </dd>
                        </dl>
                    </div>
                    <div class="contentBlock__desc flag-with-border">
                        <div class="button button--big button--green button--width40">去留言
                        </div>
                    </div>
                </div>
                <!-- 商品推荐 -->
                <div class="lineTitle">
                    <line-title :title="title"></line-title>
                </div>
                <div class="contentBlock__desc" style="padding-bottom: 0;">
                    <div class="goodsCard font-black">
                        <ul>
                            <li v-for="item in recommendList" @click="jumpGoodsDetail(item.id)">
                                <product-card :goods="item"></product-card>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- 二维码测试 -->
                <!--<qriously value="https://segmentfault.com/p/1210000008273057" :size="200"/>-->
            </div>
        </div>
        <ul class="fixed-bottom">
            <li class="width20 icon-wrapper" @click="fav" v-show="flag.is_favorite">
                <img src="" alt="" class="btn-icon btn-collect">
                <span class="icon-text">收藏</span>
            </li>
            <li class="width20 icon-wrapper" @click="fav" v-show="!flag.is_favorite">

                <img src="" alt="" class="btn-icon btn-isFav">
                <span class="icon-text">已收藏</span>

            </li>
            <li class="width20 icon-wrapper border">
                <img src="" class="btn-icon btn-service">
                <span class="icon-text">联系客服</span>

            </li>
            <li class="width30 bg-yellow" @click="openPanel">加入购物车</li>
            <li class="width30 bg-red">立即带走</li>
        </ul>
        <div class="mask" v-show="flag.isShowPanel"></div>
        <goods-panel ref="goodspanel" :isShow="flag.isShowPanel" :specList="specList" :activeSpecList="activeSpecList" :currentSpecId="currentSpecId" @mutateQuantity="mutateQuantity" @changeNumber="changeNumber" @closePanel="closePanel" @selectSpec="selectSpec" @clickBuy="clickBuy"></goods-panel>
    </div>

</template>

<script>
    import axios from 'axios'
    import LineTitle from '@/components/lineTitle'
    import {Toast} from 'mint-ui'
    import ProductCard from '@/components/ProductCard'
    import GoodsPanel from '@/components/GoodsPanel'
    import {reqUrl} from '@/common/js/config.js'
    import GoodsCard from '@/common/js/goods'
    export default {
        components: {
            LineTitle,
            ProductCard,
            GoodsPanel
        },
        data() {
            return {
                title: '为您推荐',
                goodsInfo: {},
                productImg: [],
                recommendList: [],
                store: [],
                goodsId: 0,
                flag: {
                    is_favorite: false,
                    isShowPanel: false
                },
                specList:[],
                activeSpecList:{},
                quantity: 1,
                maxQuantity: 0,
                currentSpecId: 0
            }
        },
        created () {
            this.goodsId = this.$route.params.id
            this.getGoodsInfo()
        },
        watch: {
            $route(to,from){
                this.goodsId = this.$route.params.id
                this.getGoodsInfo()
            }
        },
        methods: {
            getGoodsInfo () {
                let that = this;
                axios.get('api/v1/goods/info', {
                    params: {
                        goods_id: that.goodsId,
                        type: 'all'
                    }
                }).then(function (res) {
                    that.goodsInfo = res.data
                    that.productImg = res.data.imgs
                    that.store = res.data.store
                    that.flag.is_favorite = res.data.is_favorite
                    that.specList = res.data.spec_list
                    if(that.specList && that.specList.length > 0){
                        that.activeSpecList = that.specList[0]
                    }else if(that.specList && that.specList.length === 0){
                        that.activeSpecList = {
                            'price': that.goodsInfo.price,
                            'number': that.goodsInfo.goods_number,
                            'spec_image':that.goodsInfo.thumbnails
                        }
                        that.maxQuantity = that.activeSpecList.goods_number
                        
                    }
                    that.currentSpecId = that.activeSpecList.spec_id
                    that.maxQuantity = that.activeSpecList.number
                });
                axios.get('api/v1/goods/recommendList', {
                    params: {
                        goods_id: that.goodsId
                    }
                }).then(function (res) {
                    that.recommendList = that._normalizeGoods(res.data.list)
                })
            },
            _normalizeGoods(list){
                let ret = [];
                list.forEach((item,index) => {
                    let name = item.brand && item.brand.name ? item.brand.name : ''
                    ret.push(new GoodsCard({
                        avatar: item.default_image,
                        title: item.goods_name,
                        brand: name,
                        price: item.price,
                        id: item.params.goods_id
                    }))
                })
                return ret;
            },
            fav () {
                this.flag.is_favorite = !this.flag.is_favorite
                Toast({
                    message: '操作成功',
                    position: 'middle',
                    duration: 1000
                });
            },
            jumpGoodsDetail(itemId) {
                this.$router.push({ path: `/goodsDetail/${itemId}` })
            },
            closePanel(){
                this.flag.isShowPanel = false
            },
            openPanel(){
                this.flag.isShowPanel = true
            },
            selectSpec(currentSpecId){
                for(var i in this.specList){
                    if(this.specList[i].spec_id == currentSpecId){
                        this.activeSpecList = this.specList[i]
                        this.maxQuantity = this.specList[i].number
                    }
                }
            },
            mutateQuantity(type){
                if(type === 'minus'){
                    this.quantity = this.quantity - 1 > 0 ? this.quantity - 1 : this.quantity;
                }
                if(type === 'add'){
                    this.quantity = this.quantity + 1 < this.maxQuantity ? this.quantity + 1 : this.maxQuantity
                }
                this.$refs.goodspanel.setQuantity(this.quantity)
            },
            changeNumber(data){
                this.quantity = parseInt(data)
            },
            clickBuy(){
                let _this = this;
                axios.post('/api/v1/goods/addCart',{
                    uid: 1,
                    user_token: 'B0B8C3F4614090BA31744AC1568B3783',
                    goods_number: _this.quantity,
                    goods_id: _this.goodsId
                }).then((res) => {
                    if(res.data.success){
                        Toast({
                            message: '成功加入购物车',
                            position: 'middle',
                            duration: 1000
                        });
                        _this.closePanel()
                    } 
                })
            }
        }
    }

</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
    @import '../../assets/style/_import_craftGoods.scss';
    @include contentBlock;
    @include flag;
    @include commentBgText;
    @include tab;
    @include title;
    @include fixedBottom;
    @include orderDetail;
    @include button;
    @include bannerCard;
    @include border-1px($color-divider);
    @include lineTitle;
    @include goodsCard;
    .mask {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.6);
    }
    .fix-scroll-out {
        background-color: #f1f1f1;
    }
    .descriptionBox {
        img {
            display: block;
            width: 100%;
        }
    }
    .fix-scroll-inner {
        padding-top: 40px;
        padding-bottom: 60px;
    }

    .width100 {
        img {
            width: 100%;
        }
    }

    .navbar {
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
        background-color: #37363b;
        color: #fff;
        font-size: 1.4rem;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 12px 15px;
        padding-left: 10%;
        a {
            color: #fff;
            text-decoration: none;
        }
        .icon-shop {
            height: 18px;
            width: 18px;
            background: url(../../assets/home_shopping.png);
            background-size: 100% 100%;
        }
    }

    .goodsDetail {
        position: relative;
    }

    .fixed-bottom {
        position: absolute;
        text-align: center;
        font-size: 1.4rem;
        width: 100%;
        display: block;
        background-color: #fff;
        height: 50px;
        line-height: 50px;
        overflow: hidden;
        top: calc(100vh - 50px);
        left: 0;
        z-index: 1;
        li {
            float: left;
            text-align: center;
            height: 100%;
            font-size: 1.4rem;
            &.bg-red {
                background-color: #982424;
                color: #fff;
            }
            &.width20 {
                width: 20%;
                font-size: 12px;
            }
            &.width30 {
                width: 30%;
            }
            &.bg-yellow {
                background-color: #c5934b;
                color: #fff;
            }
            &.icon-wrapper {
                border-top: 1px solid #d9d9d9;
                &.border {
                    border-left: 1px solid rgb(217, 217, 217);
                }
            }
            .btn-icon {
                height: 15px;
                width: 15px;
                display: block;
                margin: 0 auto;
                margin-top: 5px;
            }
            .btn-collect {
                background: url(../../assets/collect-grey.png);
                background-size: 100% 100%;
            }
            .btn-isFav {
                background: url(../../assets/isFav.png);
                background-size: 100% 100%;
            }
            .btn-service {
                background: url(../../assets/icon-contact.png);
                background-size: 100% 100%;
            }
            .icon-text {
                display: block;
                height: 30px;
                line-height: 30px;
                color: #000;
            }
        }
    }
</style>
