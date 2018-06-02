<template>
<div class="container">
  <div class="navbar-container">
    <navbar></navbar>
  </div>
  <div class="scroll-container">
    <scroll :data="list" class="scroll-inner">
      <div>
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="item in slides">
          <img :src="imageResize(item.cover,640,360)" class="slide-img" @load="loadImage">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div v-infinite-scroll="getWaterfall" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <div v-for="item in list">
                <div v-if="item.tpl == 'two-columns-product'" style="overflow: hidden;">
                    <div v-for="item in item.data">
                        <waterfall-goods :goods="item" @jumpGoodsDetail="jumpGoodsDetail"></waterfall-goods>
                    </div>
                </div>
                <div v-if="item.tpl == 'img-with-desc'">
                    <div v-for="item in item.data">
                        <waterfall-banner :article="item" @jumpCourseDetail="jumpCourseDetail" @jumpActivityDetail="jumpActivityDetail" @jumpPostDetail="jumpPostDetail"></waterfall-banner>
                    </div>
                </div>
                <div v-if="item.tpl == 'left-img-tag'">
                    <div v-for="item in item.data">
                        <waterfall-article :article="item" @jumpCourseDetail="jumpCourseDetail" @jumpActivityDetail="jumpActivityDetail" @jumpPostDetail="jumpPostDetail"></waterfall-article>
                    </div>
                </div>
            </div>
        </div>
        <div class="more_loading center">
            <loading v-show="loading && !loadFinished"></loading> 
        </div>
        </div>
  </scroll>
  </div>
  <toolbar></toolbar>
</div>

</template>

<script>
import axios from "axios"
import { swiper, swiperSlide } from "vue-awesome-swiper"
import WaterfallBanner from "@/components/WaterfallBanner"
import WaterfallArticle from "@/components/WaterfallArticle"
import WaterfallGoods from "@/components/WaterfallGoods"
import navbar from "@/components/navbar"
import toolbar from "@/components/Toolbar"
import {reqUrl} from '@/common/js/config.js'
import {mapMutations} from 'vuex'
import Loading from '@/components/Loading'
import Scroll from '@/components/scroll'
export default {
  components: {
    swiper,
    swiperSlide,
    WaterfallGoods,
    WaterfallArticle,
    WaterfallBanner,
    navbar,
    toolbar,
    Loading,
    Scroll
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        autoplay: {
          delay: 3500,
          disableOnInteraction: false
        }
      },
      slides: [],
      page: 1,
      list: [],
      loadFinished: false,
      loading: false,
      checkloaded: false
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  created() {
    this.setSlideApi();
    this.getWaterfall();
  },
  methods: {
    ...mapMutations({
        setWeiboId: 'SET_WEIBOID'
      }),
    setSlideApi: function() {
      let that = this;
      axios.get('/api/v1/index/banner',{
        params: {
          place: "w3g_goods_index_main"
        }
      }).then(function(res){
        that.slides = res.data.list
      })
    },
    getWaterfall() {
      if (this.loadFinished) return;
      if (this.loading) return;
      this.loading = true;
      let that = this;
      axios.get('/api/v1/index/flow',{
        params: {
          pn: that.page
        }
      }).then(function(res){
          if (!res.status || res.data.list.length == 0) {
            that.loadFinished = true;
          } else {
            if (res.data.list.length < 10) {
              that.loadFinished = true;
            }
            that.page = parseInt(that.page) + 1;
            that.list = that.list.concat(res.data.list);
          }
          that.loading = false;
      })
    },
    loadImage() {
        if (!this.checkloaded) {
          this.checkloaded = true
          setTimeout(() => {
            this.$refs.scroll.refresh()
          }, 20)
        }
      },
    jumpGoodsDetail(goodsId){
      this.$router.push({
        path: `/goodsDetail/${goodsId}`
      })
    },
    jumpPostDetail(id){
      //因为weibo详情页面是用的vuex来实现的
      this.setWeiboId(id)
        this.$router.push({
          path:`/weibaDetail/${id}`
        })
    },
    jumpActivityDetail(id){
      this.$router.push({
        path:`/activityDetail/${id}`
      })
    },
    jumpCourseDetail(id){
      this.$router.push({
        path: `/courseDetail/${id}`
      })
    }
  }
};
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
.container {
  background-color: #f1f1f1;
  .navbar-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
}
.slide-img {
  width: 100%;
}

</style>