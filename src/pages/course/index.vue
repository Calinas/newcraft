<template>
<div class="container">
    <div class="navbar-container">
        <navbar></navbar>
    </div>
    <div class="scroll-container">
        <scroll :data="indexCourseList" class="scroll-inner">
            <div>
                 <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="item in slides">
                <img :src="imageResize(item.cover,640,360)" class="slide-img">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <div class="goods-nav">
                <div v-for="item in indexMenuList" class="nav-item">
                    <index-menu :menuData="item"></index-menu>
                </div>
        </div>
        <div class="commonWrapper" style="margin-bottom: 0.9rem;">
                        <div class="font-bold font-black font-15 text-center">在线讲堂</div>
                        <div class="font-grey text-center">各手工艺系统视频课程在线开班</div>
                        <div class="contentBlock__desc" style="padding-bottom: 0;">
                            <div class="goodsCard goodsCard--course">
                                <ul>
                                        <li v-for="item in onlineCourseList">
                                            <course-card :course="item"></course-card>
                                        </li>
                                </ul>
                            </div>
                        </div>
                        <p class="font-black text-center"><a>查看更多课程</a></p>
                    </div>
        <div class="lineTitle">
                <line-title :title="title"></line-title>
            </div>
        <div class="commonWrapper">
            <div class="flex" v-infinite-scroll="_getCourseList" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                <div v-for="item in indexCourseList" class="">
                    <course-card :course="item"></course-card>
                </div>
            </div>
            <div class="more_loading" v-show="loading">
                    <mt-spinner type="fading-circle" color="#fff" :size="50" v-show="loading && ! loadFinished"></mt-spinner>
                    <span v-show="loadFinished">已全部加载</span>
                </div>
        </div>
            </div>
        </scroll>
    </div>
    <toolbar></toolbar>
</div>
</template>

<script>
import axios from 'axios'
import {swiper,swiperSlide} from 'vue-awesome-swiper'
import {InfiniteScroll} from 'mint-ui'
import navbar from '@/components/navbar'
import toolbar from '@/components/toolbar'
import IndexMenu from '@/components/IndexMenu'
import CourseCard from '@/components/CourseCard'
import LineTitle from '@/components/lineTitle'
import Scroll from '@/components/scroll'
export default {
  components: {
    navbar,
    swiper,
    swiperSlide,
    toolbar,
    IndexMenu,
    CourseCard,
    LineTitle,
    Scroll
  },
  data() {
    return {
      swiperOption: {
          pagination: {
              el: '.swiper-pagination',
              clickable: true
          },
          autoplay: {
                delay: 3500,
                disableOnInteraction: false
            }
      },
      slides: [],
      page: 1,
      ps: 10,
      loadFinished: false,
      loading: false,
      indexMenuList:[],
      onlineCourseList:[],
      indexCourseList:[],
      title: '精选课程'
    }
  },
  computed: {
    swiper(){
        return this.$refs.mySwiper.swiper
    }
  },
  created() {
    this._api()
    this._getCourseList()
  },
  methods: {
    _api(){
        let that = this
        axios.get('/api/v1/course/bannerList',{
            params: {
                place: 'w3g_course_index_main'
            }
        }).then(function(res){
            that.slides = res.data.list
        })

        axios.get('api/v1/course/index/layout',{
                    params: {
                        platform: 'mobile'
                    }
                })
                    .then(function (res){
                        that.indexMenuList = res.data.list;
                    })

        axios.get('api/v1/course/courseList',{
                    params: {
                        is_online: 1,
                        pn: 1,
                        ps: 2
                    }
                })
                    .then(function (res){
                        that.onlineCourseList = res.data.list;
                    })
    },
    _getCourseList(){
        if(this.loadFinished) return
        if(this.loading) return
        this.loading = true
        let that = this
        axios.get('api/v1/course/courseList',{
            params: {
                pn: that.page,
                ps: 10
            }
        }).then(function(res){
            if(!res.status || res.data.list.length == 0){
                that.loadFinished = true
            }else {
                if(res.data.list.length < 10){
                    that.loadFinished = true
                }
                that.page = parseInt(that.page) + 1
                that.indexCourseList = that.indexCourseList.concat(res.data.list)
            }
            that.loading = false
        })
    }
  }
};
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
@import '../../assets/style/_import_craftGoods.scss';
@import '../../assets/style/_mixins.scss';
    @include contentBlock;
    @include flag;
    @include commentBgText;
    @include tab;
    @include title;
    @include fixedBottom;
    @include orderDetail;
    @include button;
    @include bannerCard;
    @include border-1px($color-divider);
    @include goodsCard;
    @include double-ellipsis;
    @include flex;
.fix-scroll-inner {
  padding-top: 0;
  padding-bottom: 100px;
}
.container {
  background-color: #f1f1f1;
}
.slide-img {
  width: 100%;
}
.goods-nav {
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        background-color: white;
        -ms-flex-wrap: wrap;
        -webkit-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-justify-content: space-around;
        justify-content: space-around;
        padding: 10px 0px;
        .nav-item {
            width: 20%;
            img {
                display: inline-block;
                border-radius: 50%;
            }
        }
    }
.commonWrapper {
    padding: 12px;
    background-color: #fff;
    color: #969696;
     margin-top: 10px;
}
.desc {
    font-size: 1.3rem;
    padding-top: 4px;
}
.flex {
    & > div {
        width: 48%;
    }
    justify-content: space-between;
    flex-wrap: wrap;
}
</style>