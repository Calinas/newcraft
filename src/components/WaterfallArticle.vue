<template>
    <div class="item" @click="jumpDetail(article)">
        <img :src="imageResize(article.cover,375,210)" alt="" class="img" v-lazy="article.cover">
        <div class="text">
            <p class="title">{{article.title}}</p>
            <div class="detail">
                <span class="tag">{{article.tag}}</span>
                <span>阅读量  {{article.view_count}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'WaterfallArticle',
        props: {
            article: {}
        },
        data () {
            return {

            }
        },
        methods: {
            jumpDetail(article){
                switch (article.action){
                    case 'courseView':
                        this.$emit('jumpCourseDetail',article.params.cid)
                        break;
                    case 'weiboView':
                        this.$emit('jumpPostDetail',article.params.weibo_id)
                        break;
                    case 'activityView':
                        this.$emit('jumpActivityDetail',article.params.activity_id)
                        break;
                    default:
                        break;

                }
            }
        }
    }
</script>

<style scoped lang="scss" type="text/css" rel="stylesheet/scss">
    .item {
        padding: 10px;
        background-color: white;
        clear: both;
        display: inline-table;
        overflow: hidden;
        width: 100%;
        margin-top: 10px;
        .img {
            width: 34%;
            float: left;
        }
        .text {
            padding-left: 10px;
            width: calc(66% - 10px);
            float: left;
        }
        .title {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            font-size: 1.4rem;
            height: 3.4rem;
            line-height: 1.7rem;
            color: #1a1a1a;
        }
        .tag {
            color: #67bcaf;
            border: 1px solid #67bcaf;
            padding: 0 6px;
            border-radius: 6px;
            margin-right: 10px;
        }
        .detail {
            font-size: 12px;
            color: #969696;
        }
    }
</style>