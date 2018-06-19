<template>
    <div class="cart">
        <div class="edit">编辑</div>
        <div class="item">
            <!-- <div class="item-uncheck"></div> -->
            <div class="item-check">
                <div class="item-check-inner"></div>
            </div>
            <img src="http://image.91craft.com/post/1523843922989.jpg?imageMogr2/thumbnail/!100x100r/gravity/Center/crop/100x100" class="item-img">
            <div class="item-text">
                <p class="item-title">飞凤飞飞凤飞飞</p>
                <p class="item-desc"><span class="font-red">490</span> x 19</p>
                <quantity @changeNumber="changeNumber(2)"></quantity>
            </div>
        </div>
        <div class="item">
            <!-- <div class="item-uncheck"></div> -->
            <div class="item-check">
                <div class="item-check-inner"></div>
            </div>
            <img src="http://image.91craft.com/post/1523843922989.jpg?imageMogr2/thumbnail/!100x100r/gravity/Center/crop/100x100" class="item-img">
            <div class="item-text">
                <p class="item-title">飞凤飞飞凤飞飞</p>
                <p class="item-desc"><span class="font-red">490</span> x 19</p>
            </div>
        </div>
    </div>
</template>

<script>
import Quantity from '@/components/quantity'
export default {
    components: {
        Quantity
    },
    data(){
        return {
            quantity: 0,
            list:[
                {
                    id: 0,
                    isCheck: true,
                    title:'这是商品的名字啊啊啊',

                }
            ]
        }
    },
    methods: {
        changeNumber(number,index){
            console.log(number,index)
            this.quantity = number
            console.log(number)
        }
    }
}
</script>

<style lang="scss" scoped>
    .edit {
        background-color: #fff;
        padding: 1rem;
        margin-bottom: 10px;
        text-align: right;
    }
    .item {
        display: flex;
        align-items: center;
        background-color: #fff;
        padding: 1rem;
        margin-bottom: 10px;
        &-check {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: 2px solid #982424;
            margin-right: 10px;
            position: relative;
            &-inner {
                position: absolute;
                width: 8px;
                height: 8px;
                left: 50%;
                margin-left: -4px;
                background-color: #982424;
                border-radius: 50%;
                top: 50%;
                margin-top: -4px;
            }
        }
        &-uncheck {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: 2px solid #ccc;
            margin-right: 10px;
        }
        &-img {
            width: 60px;
            margin-right: 10px;
        }
        &-title {
            color: #969696;
        }
        &-text {
            flex: 1;
        }
    }
</style>

