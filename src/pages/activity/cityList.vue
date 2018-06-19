<template>
<div class="city-list">
    <div class="scroll-container">
        <scroll class="scroll-inner"
                :data="list"  
                :probeType = "probeType"
                ref="cityList"
                :listenScroll="listenScroll"
                @scroll="scroll"
                >
            <div>
                <ul>
            <li v-for="item in list" ref="listGroup">
                <h2 class="title">{{item.title}}</h2>
                <ul>
                    <li v-for="address in item.items" class="item">
                        <span>{{address.title}}</span>
                    </li>
                </ul>
            </li>
        </ul>
            </div>
        </scroll>
    </div>
    <ul class="capital-list">
        <li v-for="(item,index) in capitalList" :data-index="index" @touchstart="onShortcutTouchStart" :class="{'active': currentIndex == index}">
            {{item}}
        </li>
    </ul>
</div>
    
</template>

<script>
import Scroll from '@/components/scroll'
import axios from "axios"
export default {
    data(){
        return {
            list: [],
            scrollY: -1,
            currentIndex: 0,
            listHeight:[]
        }
       
    },
    components: {
        Scroll
    },
    created(){
        this._getList()
        this.listenScroll =true
        this.listHeight = []
        this.probeType = 3
    },
    computed:{
        capitalList(){
            return this.list.map( item => {
                return item.title
            })
        }
    },
    watch: {
        list(){
            setTimeout(() => {
                this.calculHeight()
            },20)
        },
        scrollY(newY){
            const listHeight = this.listHeight
            for(let i = 0;i < listHeight.length;i++){
                let height1 = listHeight[i]
                let height2 = listHeight[i+1]
                if(!height2 || (-newY > height1 && -newY < height2)){
                    this.currentIndex = i
                    return
                }
            }
            this.currentIndex = 0
        }
    },
    methods: {
        onShortcutTouchStart(e){
            let anchorIndex = e.currentTarget.dataset.index
            this.$refs.cityList.scrollToElement(this.$refs.listGroup[anchorIndex],0)
            this.currentIndex = anchorIndex
        },
        scroll(pos){
            this.scrollY = pos.y
        },
        calculHeight(){
            this.listHeight = []
            const list = this.$refs.listGroup
            let height = 0
            this.listHeight.push(height)
            for(let i = 0; i < list.length; i++){
                let item = list[i]
                height += item.clientHeight
                this.listHeight.push(height)
            }
        },
        _getList(){
            let that = this;
            axios.get('/api/v1/common/cityList',{
                params: {
                    is_hot: 0
                }
            }).then(res => {
                that.list = that._normalizeList(res.data.list)
            })
        },
        _normalizeList(list){
            let ret = []
            let map = []
            list.forEach(item => {
                var key = item.first_letter
                if(!map[key]){
                    map[key] = {
                        title:key,
                        items:[]
                    }
                }
                map[key].items.push(item)
            })
            for(var i in map){
                ret.push(map[i])
            }
            return ret
        }
    }
}

</script>

<style scoped>
    .item {
        border-bottom: 1px solid #f2f2f2;
        padding-bottom: 8px;
        margin-bottom: 8px;
    }
    .title {
        padding-bottom: 1rem;
        font-weight: bold;
    }
    .capital-list {
        position: absolute;
        z-index: 30;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        text-align: center;
        font-family: Helvetica;
    }
    .capital-list li {
        padding-bottom: 1rem;
        line-height: 1;
        color: #000;
        font-size: 1.4rem;
    }
    .capital-list li.active {
        color: #982424;
        font-weight: bold;
    }
    .scroll-container {
        top: 0;
        bottom: 0;
        background-color: #fff;
        padding: 1rem;
        padding-bottom: 0;
    }
</style>


