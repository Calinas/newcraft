<template>
    <div>
        <transition name="fade">
            <div class="popupWrapper popupWrapper__goods goods_detail" style="height: 370px;" v-show="isShow">
                <div class="commonWrapper border-1px">
                    <div class="flag">
                        <div class="flag__item flag__item--middle flag__item--width20">
                            <img :src="imageResize(activeSpecList.spec_image,200,200)">
                        </div>
                        <div class="flag__item flag__item--middle flag__item--width60" style="padding-left: 10px;"><span
                                class="font-red" style="font-size: 1.5rem;">￥{{activeSpecList.price}}</span>
                            <p class="font-black choose-spec-text" style="font-size: 1.4rem;">
                                剩余{{activeSpecList.number}}件
                            </p>
                        </div>
                        <div class="flag__item flag__item--middle flag__item--width20 close-popup" @click="closePanel">
                            <img src="http://www.91craft.com/apps/w3g/_static/img/craft_goods_detail_close.png" class="clost-btn">
                        </div>
                    </div>
                </div>
                <input type="hidden" id="goods_specinfo_id">
                <div id="goods_specs_wrap" class="goods-section clearfix">
                    <!-- 款式 -->
                    <div class="border-1px" v-if="specList && specList.length > 0">
                        <div class="goods-field">款式</div> 
                        <div class="goods-value">
                            <span v-for="item in specList" :data-specid="item.spec_id" class="goods-spec" @click="selectSpec($event)" :class="{'active':item.spec_id === currentSpecId}">{{item.spec}}</span>
                            </div>
                        </div>
                    <!-- 购买数量 -->
                    <div id="goods_number_wrap" class="goods-section clearfix">
                        <div class="goods-field">购买数量</div>
                        <div class="goods-value">
                            <button class="goods-number-op" @click="mutateQuantity('minus')">-</button>
                            <input id="goods_number" name="goods_number" type="number" v-model="number">
                            <button class="goods-number-op" @click="mutateQuantity('add')">+</button>
                        </div>
                    </div>
                </div>
                <div class="button button-red button--noborder" @click="clickBuy">
                    确定
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'GoodsPanel',
        props: {
            isShow: false,
            specList:Array,
            activeSpecList:{},
            currentSpecId: 0
        },
        data () {
            return {
                number: 0 
            }
        },
        watch: {
            number() {
                this.$emit('changeNumber',this.number)
            }
        },
        methods: {
            closePanel(){
                this.$emit('closePanel');
            },
            selectSpec(e){
                var currentSpecId = $(e.currentTarget).data('specid');
                this.$emit('selectSpec',currentSpecId);
            },
            mutateQuantity(type){
                this.$emit('mutateQuantity',type)
            },
            clickBuy(){
                this.$emit('clickBuy')
            },
            setQuantity(q){
                this.number = q
            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
    @import '../assets/style/_import_craftGoods.scss';
    .popupWrapper {
        position: absolute;
        bottom: 0;
        left: 0;
        background: #fff;
        width: 100%;
        .goods-section {
            width: 100%;
            line-height: 2em;
            min-height: 2em;
            font-size: 1em;
            position: relative;
            margin-bottom: 1em;
        }
        #goods_number_wrap {
            position: relative;
            display: -webkit-box;
            display: -moz-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            -webkit-justify-content: space-between;
            justify-content: space-between;
            margin-bottom: 0;
            padding-top: 14px;
        }
        .goods-field {
            position: initial;
            padding-left: 12px;
            padding-top: 4px;
            margin: 0px;
            width: 100%;
            overflow: hidden;
            text-align: left;
            font-size: 1.5rem;
        }
        .goods-spec {
            font-size: 0.8em;
            margin: 8px 10px 6px 0px;
            float: left;
            padding: 4px 12px;
            line-height: 1.5em;
            border-radius: 6px;
            background-color: #f1f1f1;
            border: none;
            color: #7e7e7e;
            &.active {
                background-color: $color-red;
                color: #fff;
            }
        }
        .goods-value {
            padding-bottom: 10px;
            max-height: 100px;
            overflow: auto;
            margin-left: 0px;
            width: 100%;
            text-align: center;
            padding: 0px 12px;
            width: 17rem;
            padding-top: 5px;
        }
        .goods-number-op {
            float: left;
            width: 2em;
            height: 2em;
            line-height: 1em;
            font-size: 1em;
            text-align: center;
            border: 1px solid #ccc;
            padding: 0;
            background: none;
            color: #969696;
            margin-top: 0;
        }
        #goods_number {
            width: 2em;
            text-align: center;
            line-height: 1.5em;
            /* margin-top: 0.5em; */
            float: left;
            margin: 0.5em 0.3em;
            border: 1px solid #ccc;
            font-size: 1em;
            padding: 0px;
            height: 2em;
            margin: 0px;
            border-left: 0px;
            border-right: 0px;
            border-radius: 0 !important;
        }

        .button-red {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 50px;
            line-height: 50px;
            text-align: center;
            background-color: #982424;
            color: #fff;
            font-size: 15px;
            border-radius: 0;
            z-index:2;
        }
    }
    .fade-enter-active, .fade-leave-active {
        opacity: 1;
        transition: all .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    .flag img.clost-btn {
        display: block; 
        width: 15px; 
        height: 15px;
    }
    @include flag;
</style>