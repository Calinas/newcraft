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
                    this.goodsList = this._normalizeProductList(res.data.list)
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
                    this.goodsList = this.goodsList.concat(this._normalizeProductList(res.data.list))
                    this.checkLoadFinished(res.data.list)
                }
            })
        }, 
         _normalizeProductList(list){
                let ret = []
                list.forEach((item,index) => {
                    let name = item.brand && item.brand.name ? item.brand.name : ''
                    ret.push({
                        avatar: item.default_image,
                        title: item.goods_name,
                        brand: name,
                        price: item.price,
                        id: item.params.goods_id
                    })
                })
                return ret
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


