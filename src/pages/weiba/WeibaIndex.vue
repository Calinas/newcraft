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
            <img :src="imageResize(item.cover,640,360)" class="slide-img">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>

        <div class="lineTitle">
          <line-title :title="title"></line-title>
        </div>

        <div v-infinite-scroll="getWaterfall" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
          <template v-for="item in list">
            <template v-if="item.tpl == 'left-img-tag'">
              <template v-for="item in item.data">
                <div @click="jumpDetail(item.params.weibo_id)">
                  <waterfall-article :article="item"></waterfall-article>
                </div>
              </template>
            </template>
          </template>
        </div>
        </div>
    </scroll>
    </div>
    <toolbar></toolbar>
  </div>

</template>

<script>
  import axios from "axios"
  import LineTitle from "@/components/lineTitle"
  import {
    swiper,
    swiperSlide
  } from "vue-awesome-swiper"
  import WaterfallArticle from "@/components/WaterfallArticle"
  import navbar from "@/components/navbar"
  import toolbar from '@/components/toolbar'
  import {mapMutations} from 'vuex'
  import Scroll from '@/components/scroll'
  export default {
    components: {
      swiper,
      swiperSlide,
      LineTitle,
      WaterfallArticle,
      navbar,
      toolbar,
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
        indexMenuList: [],
        title: "精选推荐",
        page: 1,
        size: 10,
        list: [],
        loadFinished: false,
        loading: false
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
      jumpDetail: function(weibo_id){
        this.setWeiboId(weibo_id)
        this.$router.push({
          path:`/weibaDetail/${weibo_id}`
        })
       
      },
      setSlideApi: function () {
        let that = this;
        axios
          .get("api/v1/index/banner", {
            params: {
              place: "w3g_collection_featured"
            }
          })
          .then(function (res) {
            that.slides = res.data.list;
          });
      },
      getWaterfall() {
        if (this.loadFinished) return;
        if (this.loading) return;
        this.loading = true;
        let that = this;
        axios
          .get("api/v1/index/flow", {
            params: {
              pn: that.page,
              ps: that.size,
              place:'collection'
            }
          })
          .then(function (res) {
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
          });
      }
    }
  };

</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  .slide-img { width: 100%; } .weiba-index { background-color: #f1f1f1; height: 100%; } .goods-nav { display: -ms-flexbox;
  display: -webkit-flex; display: flex; background-color: white; -ms-flex-wrap: wrap; -webkit-flex-wrap: wrap; flex-wrap:
  wrap; -webkit-justify-content: space-around; justify-content: space-around; padding: 10px 0px; .nav-item { width: 25%;
  img { display: inline-block; border-radius: 50%; } } } .lineTitle { padding: 14px 0; }
</style>
