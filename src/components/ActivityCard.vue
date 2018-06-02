<template>
    <div class="activityCard">
        <img :src="imageResize(activity.cover,640,360)" class="cover" v-lazy="activity.cover">
        <span class="status going" v-if="activity.activity_status == 20">进行中</span>
        <span class="status over" v-if="activity.activity_status == 30">已结束</span>
        <div class="info">
            <p class="title">{{activity.title}}</p>
            <p class="city">{{activity.area_text}} {{activity.address}}</p>
            <p class="time-wrapper">
                <span class="time">
                    <template v-if="activity.activity_time_type == 0">
                                            {{ActivityInitYear(activity.activity_start_date,activity.activity_end_date)}}
                                            {{ ActivityInitDate(activity.activity_start_date)}} {{
                                            getWeekDay(activity.activity_start_date)}} {{
                                            ActivityInitTime(activity.activity_start_time)}}~{{
                                            ActivityInitTime(activity.activity_end_time)}}
                                        </template>
                                        <!--每天举行-->
                                        <template v-else-if="activity.activity_time_type == 1">
                                            {{ActivityInitYearDate(activity.activity_start_date,activity.activity_end_date)}}
                                            每天 {{ActivityInitTime(activity.activity_start_time)}}~{{ActivityInitTime(activity.activity_end_time)}}
                                        </template>
                                        <!--连续举行-->
                                        <template v-else-if="activity.activity_time_type == 2">
                                            {{ActivityInitYearDate(activity.activity_start_date,activity.activity_end_date)}}
                                            {{ActivityInitTime(activity.activity_start_time)}}~{{ActivityInitTime(activity.activity_end_time)}}
                                        </template>
                                        <!--每周举行-->
                                        <template v-else-if="activity.activity_time_type == 3">
                                            {{ActivityInitYearDate(activity.activity_start_date,activity.activity_end_date)}}
                                            {{ActivityInitWeek(activity.activity_week)}}
                                            {{ActivityInitTime(activity.activity_start_time)}}~{{ActivityInitTime(activity.activity_end_time)}}
                                        </template>
                </span>
                <span class="price">
                    <span v-if="activity.max_price == 0 && activity.min_price == 0">免费</span>
                                        <span v-else>
                                            <template v-if="activity.min_price == activity.max_price">
                                                <span v-if="activity.activity_type == 0" class="min-price">￥{{activity.min_price}}</span>
                                            </template>
                                            <template v-else>
                                                <span>￥{{activity.min_price}}</span>~<span class="max-price">{{activity.max_price}}</span>
                                            </template>
                                        </span>
                </span>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ActivityCard',
        props: {
            activity: Object
        },
        data () {
            return {

            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
    .activityCard {
        position: relative;
        background-color: #fff;
        font-size: 1.4rem;
        margin-bottom: 12px;
        padding: 12px;
        .info {
            position: relative;
            background-color: white;
            color: #1a1a1a;
            font-weight: 400;
            bottom: 0;
            left: 0;
            width: 100%;
            padding-top: 12px;
            box-sizing: border-box;
            z-index: 2;
        }
        .cover {
            width: 100%;
        }
        .status {
            position: absolute;
            top: 12px;
            left: 12px;
            width: 50px;
            height: 20px;
            margin-right: 5px;
            line-height: 20px;
            color: #fff;
            font-size: 13px;
            text-align: center;
            &.going {
                background-color: #982424;
            }
            &.over {
                background-color: #969696;
            }
        }
        .title {
            font-size: 1.5rem;
            margin-bottom: 4px;
            line-height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            font-weight: normal;
        }
        .city {
            overflow: hidden;
            white-space: nowrap;
            -ms-text-overflow: ellipsis;
            text-overflow: ellipsis;
            width: 100%;
            font-size: 1.1rem;
            line-height: 20px;
            font-weight: 300;
            color: #969696;
        }
        .time-wrapper {
            padding-top: 4px;
            display: flex;
            justify-content: space-between;
        }
        .price {
            color: #982424;
        }
        .time {
            font-size: 1.2rem;
            color: #969696;
        }
    }
</style>