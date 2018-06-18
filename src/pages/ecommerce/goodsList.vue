<template>
    <scroll ref="goodsList" class="goods-list" :data="goodsList" :pullup="pullup" @scrollToEnd="loadMore">
        <div class="indexProductList">
                <ul>
                    <li v-for="item in goodsList">
                        <product-card :goods="item"></product-card>
                    </li>

                </ul>
            </div>
        <div class="more_loading" v-show="loading">
            <span v-show="loadFinished">已全部加载</span>
        </div>
    </scroll>
</template>

<script>
import {getGoodsList} from '@/api/ecommerce'
import {mapGetters} from 'vuex'
import Scroll from '@/components/scroll'
import ProductCard from '@/components/ProductCard'
import {normalizeGoodsData} from '@/common/js/goods'

export default {
    data(){
        return {
            goodsList:[],
            ps: 10,
            pn: 1,
            pullup: true,
            loadFinished: false,
            loading: false
        }
    },
    components: {
        Scroll,
        ProductCard
    },
    computed: {
        ...mapGetters([
            'goodsCategoryId'
        ]),
    },
    created(){
        this._getGoodsList()
    },
    methods: {
        _getGoodsList(){
            const params = {
                category_id: this.goodsCategoryId
            }
            getGoodsList(this.ps,this.pn,params).then(res => {
                if(res.status){
                    this.goodsList = normalizeGoodsData(res.data.list)
                    this.checkLoadFinished(res.data.list)
                }
            })
        },
        loadMore(){
            if(this.loadFinished) return
            if(this.loading) return
            this.pn++
            const params = {
                category_id: this.goodsCategoryId
            }
            getGoodsList(this.ps,this.pn,params).then(res => {
                if(res.status){
                    this.goodsList = this.goodsList.concat(normalizeGoodsData(res.data.list))
                    this.checkLoadFinished(res.data.list)
                }
            })
        }, 
        checkLoadFinished(list){
            if(list.lenght < this.ps){
                this.loadFinished = true
            }
        }
    }

}
</script>

<style scoped>
    .indexProductList ul{
        overflow: hidden;
    }
    .indexProductList ul li {
            float: left;
            width: 49%;
            padding-bottom: 0.8rem;
            margin-bottom: 0.7rem;
            background-color: #fff;
    }
    .indexProductList ul li:nth-child(2n+1){
        margin-right: 2%;
    }
</style>


