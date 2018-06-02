<template>
    <div class="container fix-scroll-out">
        <div class="navbar-container">
            <navbar></navbar>
        </div>
        <div class="fix-scroll-inner">
             <swiper :options="swiperOption" ref="mySwiper">
                <swiper-slide v-for="item in slides">
                    <img :src="imageResize(item.cover,640,360)" class="slide-img">
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>

            <div class="goods-nav">
                <div v-for="item in indexMenuList" class="nav-item">
                    <index-menu :menuData="item"></index-menu>
                </div>
            </div>

            <div class="lineTitle">
                <line-title :title="title"></line-title>
            </div>

            <div class="indexProductList">
                <ul v-infinite-scroll="getProductList" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                    <li v-for="item in indexProductList" @click="handleClick(item.id)">
                        <product-card :goods="item"></product-card>
                    </li>

                </ul>
                <div class="more_loading" v-show="loading">
                    <mt-spinner type="fading-circle" color="#fff" :size="50" v-show="loading && ! loadFinished"></mt-spinner>
                    <span v-show="loadFinished">已全部加载</span>
                </div>
            </div>
        </div>
        <toolbar></toolbar>
           
    </div>
</template>

<script>
    import axios from 'axios'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import { Toast } from 'mint-ui'
    import { InfiniteScroll } from 'mint-ui'
    import api from '@/axios/api'
    import navbar from '@/components/navbar'
    import IndexMenu from '@/components/IndexMenu'
    import LineTitle from '@/components/lineTitle'
    import ProductCard from '@/components/ProductCard'
    import toolbar from '@/components/toolbar'
    import GoodsCard from '@/common/js/goods'
    export default {
        components: {
            navbar,
            swiper,
            swiperSlide,
            IndexMenu,
            LineTitle,
            ProductCard,
            toolbar
        },
        data() {
            return {
                swiperOption: {
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    autoplay: {
                        delay: 3500,
                        disableOnInteraction: false
                    }
                },
                slides: [],
                indexMenuList:[],
                title:'好物甄选',
                indexProductList:[],
                page: 1,
                loadFinished: false,
                loading: false
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        created () {
            this.setSlideApi();
            this.getProductList();
        },
        methods: {
            setSlideApi(){
                let that = this;
                axios
                    .get('api/v1/goods/bannerList',{
                        params: {
                            place: 'w3g_goods_index_main'
                        }
                    })
                    .then(function (res){
                        that.slides = res.data.list;
                    })

                axios.get('api/v1/goods/index/layout',{
                    params: {
                        platform: 'mobile'
                    }
                })
                    .then(function (res){
                        that.indexMenuList = res.data.list;
                    })
            },
            handleClick(itemId) {
                let initMsg = Toast({
                    message: '页面跳转还没完成哦',
                    position: 'middle',
                    duration: 2000
                });
                this.$router.push({ path: `/goodsDetail/${itemId}` })
            },
            _normalizeProductList(list){
                let ret = []
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
                return ret
            },
            getProductList() {
                if (this.loadFinished) return;
                if (this.loading) return;
                this.loading = true;
                let that = this;
                axios.get('api/v1/goods/indexGoodsList',{
                    params: {
                        pn: that.page,
                        ps: 10
                    }
                })
                    .then(function (res){
                        if(!res.status || res.data.list.length == 0){
                            that.loadFinished = true;
                        }else {
                            if(res.data.list.length < 10){
                                that.loadFinished = true;
                            }
                            that.page = parseInt(that.page) + 1;
                            that.indexProductList = that.indexProductList.concat(that._normalizeProductList(res.data.list));
                        }
                        that.loading = false;
                    })
            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
    .more-loading {
        text-align: center;
    }
    .navbar-container {
        position: absolute;
        width: 100%;
        display: block;
        overflow: hidden;
        top: 0;
        left: 0;
        z-index: 6;
    }
    .container {
        background-color: #eaeaea;
    }
    .slide-img {
        width: 100%;
    }
    .goods-nav {
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        background-color: white;
        -ms-flex-wrap: wrap;
        -webkit-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-justify-content: space-around;
        justify-content: space-around;
        padding: 10px 0px;
        .nav-item {
            width: 25%;
            img {
                display: inline-block;
                border-radius: 50%;
            }
        }
    }
    .lineTitle {
        margin: 1.5rem 0;
    }
    .indexProductList {
        ul {
            overflow: hidden;
        }
        li {
            float: left;
            width: 49%;
            padding-bottom: 0.8rem;
            margin-bottom: 0.7rem;
            background-color: #fff;
            &:nth-child(2n+1){
                margin-right: 2%;
            }
        }
    }
</style>