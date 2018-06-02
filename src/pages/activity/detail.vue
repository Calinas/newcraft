<template>
    <div class="activityDetail">
        <img :src="imageResize(activityInfo.cover,640,360)" class="cover" v-if="activityInfo.cover">
        <div class="common-wrapper">
            <p class="activity-title" v-text="activityInfo.title"></p>
            <p class="activity-summary" v-text="activityInfo.description"></p>
            <p class="activity-price border-1px">
                <span v-if="activityInfo.max_price == 0 && activityInfo.min_price == 0">免费</span>
                <span v-else>
                        <template v-if="activityInfo.min_price == activityInfo.max_price">
                            <span v-if="activityInfo.activity_type == 0" class="min-price" v-cloak>￥{{activityInfo.min_price}}</span>
                        </template>
                        <template v-else>
                            <span>￥{{activityInfo.min_price}}</span>~<span class="max-price" v-cloak>{{activityInfo.max_price}}</span>
                        </template>
                </span>
            </p>
            <div class="activity-address font-black">
                <div>
                    <p>
                                        <!--当天举行活动-->
                                        <template v-if="activityInfo.activity_time_type == 0">
                                            {{ActivityInitYear(activityInfo.activity_start_date,activityInfo.activity_end_date)}} {{ ActivityInitDate(activityInfo.activity_start_date)}} {{ getWeekDay(activityInfo.activity_start_date)}} {{ ActivityInitTime(activityInfo.activity_start_time)}}~{{ ActivityInitTime(activityInfo.activity_end_time)}}
                                        </template>
                                        <!--每天举行-->
                                        <template v-else-if="activityInfo.activity_time_type == 1">
                                            {{ActivityInitYear(activityInfo.activity_start_date,activityInfo.activity_end_date)}} {{ ActivityInitDate(activityInfo.activity_start_date)}}~{{ ActivityInitDate(activityInfo.activity_end_date)}} 每天 {{ ActivityInitTime(activityInfo.activity_start_time)}}~{{ ActivityInitTime(activityInfo.activity_end_time)}}
                                        </template>
                                        <!--连续举行-->
                                        <template v-else-if="activityInfo.activity_time_type == 2">
                                            {{ActivityInitYearDate(activityInfo.activity_start_date,activityInfo.activity_end_date)}} {{ActivityInitTime(activityInfo.activity_start_time)}}~{{ActivityInitTime(activityInfo.activity_end_time)}}
                                        </template>
                                        <!--每周举行-->
                                        <template v-else-if="activityInfo.activity_time_type == 3">
                                            {{ActivityInitYearDate(activityInfo.activity_start_date,activityInfo.activity_end_date)}} {{ActivityInitWeek(activityInfo.activity_week)}} {{ActivityInitTime(activityInfo.activity_start_time)}}~{{ActivityInitTime(activityInfo.activity_end_time)}}
                                        </template>
                    </p>
                    <p v-text="activityInfo.area_text+' '+activityInfo.address"></p>
                </div>
                <div>电话</div>
            </div>
        </div>
        <userview-card :userInfo="userInfo" :avatar="avatar"></userview-card>
        <div class="common-wrapper">
            <p class="detail-title font-15-title">活动须知</p>
            <div style="margin-bottom: 20px;">
                                    <div class="activity-remind" v-for="item in activityInfo.notice">
                                        <dl>
                                            <dt><span class="red-dot"></span></dt>
                                            <dd class="font-bold" v-text="item.name"></dd>
                                        </dl>
                                        <dl>
                                            <dt></dt>
                                            <dd>
                                                <pre v-html="item.value"></pre>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
            <p class="detail-title font-15-title">活动详情</p>
                         
                                <div class="fold-container post" id="js-fold-container" :class="{fold : isToggle}">
                                    <template v-if="activityInfo.content_type=='html'">
                                        <div v-html="activityInfo.content_html"></div>
                                    </template>
                                    <template v-else>
                                        <template v-for="content in activityInfo.content">
                                            <p class="subtitle"><pre>{{ content.text}}</pre></p>
                                            <template v-for="img in content.images">
                                                <img :src="img" alt="">
                                            </template>
                                        </template>
                                    </template>
                                    <div class="font-red fold-area" v-show="isToggle" @click="toggle">展开活动详情<i class="icon-triangle icon-triangle-up"></i></div>
                                    <div class="font-red fold-area fold-area-bottom" v-show="!isToggle" style="display: none;" @click="toggle">收起活动详情<i class="icon-triangle"></i></div>
                                </div>
                          
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import userviewCard from '@/components/userviewCard'
    import {mapGetters} from 'vuex'
    export default {
        components: {
            userviewCard
        },
        computed: {
            
        },
        data () {
            return {
               isToggle: true,
               userInfo:{},
               activityInfo: {},
               avatar:'',
               activityId: 0
            }
        },
        created () {
            this.activityId = this.$route.params.id
            this._activityDetail();
        },
        methods: {
            toggle(){
                this.isToggle = !this.isToggle;
            },
            _activityDetail: function(){
                let that = this
               axios.get('api/v1/activity/view',{
                   params: {
                            activity_id: this.activityId
                        }
               }).then(function(res){
                   that.activityInfo = res.data
                   that.userInfo = res.data.user
                   that.avatar = res.data.user.avatar.avatar_middle
               })
            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
    .fold-container {
        position: relative;
        padding-bottom: 40px;
    }
    .fold-area {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 33px;
      line-height: 33px;
      text-align: center;
      background: #fff;
        opacity: .9;
        color: #982424;
    }
    .icon-triangle {
        height: 0;
    width: 0;
    border-bottom: 8px solid #982424;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    margin-left: 4px;
    &-up {
            -webkit-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
    }
    }
    .fold {
         overflow: hidden;
         height: 30vh;
    }
            .detail-title {
                    padding-bottom: 10px;
                        font-size: 15px;
    font-weight: bold;
    color: #333;
            }
            .font-bold {
                font-weight: 700;
            }
            .activityDetail {
                color: #808080;
            }
            .activity-title {
                font-size: 17px;
                font-weight: bold;
            }
            .activity-summary {
                font-size: 1.2rem;
                color: #808080;
                padding-top: 10px;
                padding-bottom: 6px;
            }
            .activity-price {
                padding-bottom: 10px;
                margin-bottom: 10px;
                font-size: 1.6rem;
                color: #982424;
                font-weight: 500;
            }
           .activity-address {
                display: -ms-flexbox;
                display: -webkit-flex;
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: #969696;
                font-size: 1.2rem;
            }
            .activity-remind {
                dl {
                    overflow: hidden;
                    line-height: 30px;
                }
                dt {
                    float: left;
                    width: 20px;
                    height: 20px;
                }
                dd {
                    font-size: 13px;
                    width: calc(100% - 20px);
                    float: right;
                }
            }
            .red-dot {
                display: inline-block;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background-color: #982424;
                vertical-align: middle;
            }
       
    .cover {
        width: 100%;
    }
    .common-wrapper {
        background-color: #fff;
        padding: 12px;
    }
</style>