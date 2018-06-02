<template>
    <div class="item" @click="jumpDetail(article)">
        <img :src="imageResize(article.cover,640,360)" class="img" v-lazy="article.cover">
        <div class="text">
            <p class="title">{{article.title}}</p>
            <p class="desc">{{article.desc}}</p>
            <div class="detail">
                <span class="tag">{{article.tag}}</span>
                <span>阅读量  {{article.view_count}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'WaterfallBanner',
        props: {
            article: Object
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

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
    .item {
        margin-top: 10px;
        background-color: #fff;
        font-size: 1.4rem;
        .img {
            width: 100%;
        }
        .text {
            padding: 8px 12px;
        }
        .title {
            font-size: 1.4rem;
            margin-bottom: 2px;
            text-justify: inter-ideograph;
            text-align: justify;
            color: #1a1a1a;
        }
        .desc {
            font-size: 1.2rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
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