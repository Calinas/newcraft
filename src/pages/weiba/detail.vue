<template>
    <div>
        <userview-card :userInfo="userview" :avatar="avatar"></userview-card>
        <article class="post">
            <p class="post-title" v-text="info.title"></p>
            <div class="post-content" v-html="info.content"></div>
        </article>
        <div class="loading-container" v-show="!loadFinished">
            <loading ></loading> 
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import userviewCard from '@/components/userviewCard'
    import {mapGetters} from 'vuex'
    import Loading from '@/components/Loading'
    export default {
        components: {
            userviewCard,
            Loading
        },
        computed: {
            ...mapGetters([
                'weiboId'
            ]),
        },
        data () {
            return {
                info:{},
                userview:{},
                avatar: '',
                loadFinished: false
            }
        },
        created () {
            this._postDetail();
        },
        methods: {
            _postDetail: function(){
                if(!this.weiboId){
                    this.$router.push('/weiba')
                    return
                }
                let that = this;
                axios.get('api/v1/weibo/view',{
                    params: {
                        weibo_id: this.weiboId
                    }
                })
                    .then(function (res){
                        that.info = res.data.post
                        that.userview = res.data.user
                        that.avatar = that.userview.avatar.avatar_big
                        that.loadFinished = true
                    })
            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
    .post {
        background-color: #fff;
        padding: 12px;
        &-title {
            font-size: 1.4rem;
            margin-bottom: 15px;
        }
        &-content {
            font-size: 1.3rem;
            line-height: 24px;
           
        }
    }
</style>