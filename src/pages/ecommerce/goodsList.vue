<template>
    <scroll ref="goodsList" class="goods-list" :data="goodsList" :pullup="pullup" @scrollToEnd="loadMore">
        <div class="indexProductList">
                <ul>
                    <li v-for="item in goodsList">
                        <product-card :goods="item"></product-card>
                    </li>

                </ul>
            </div>
        <div class="more-loading">
            <loading title="加载中" v-show="isLoading"></loading>
        </div>
    </scroll>
</template>

<script>
import {getGoodsList} from '@/api/ecommerce'
import {mapGetters} from 'vuex'
import Scroll from '@/components/scroll'
import ProductCard from '@/components/ProductCard'
import {normalizeGoodsData} from '@/common/js/goods'
import Loading from '@/components/Loading'
export default {
    data(){
        return {
            goodsList:[],
            ps: 10,
            pn: 1,
            pullup: true,
            isLoadFinished: false,
            isLoading: false
        }
    },
    components: {
        Scroll,
        ProductCard,
        Loading
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
            this.isLoading = true
            getGoodsList(this.ps,this.pn,params).then(res => {
                if(res.status){
                    this.goodsList = normalizeGoodsData(res.data.list)
                    this.checkLoadFinished(res.data.list)
                    this.isLoading = false
                }
            })
        },
        loadMore(){
            if(this.isLoadFinished) return
            if(this.isLoading) return
            this.isLoading = true
            this.pn++
            const params = {
                category_id: this.goodsCategoryId
            }
            getGoodsList(this.ps,this.pn,params).then(res => {
                if(res.status){
                    this.goodsList = this.goodsList.concat(normalizeGoodsData(res.data.list))
                    this.checkLoadFinished(res.data.list)
                    this.isLoading = false
                }
            })
        }, 
        checkLoadFinished(list){
            if(list.lenght < this.ps){
                this.isloadFinished = true
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


