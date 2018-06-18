<template>
  <div>
      <div class="navbar-container">
            <navbar></navbar>
        </div>

    <div class="scroll-container">
      <scroll :data="list" class="scroll-inner">
        <div>
          <router-link :to="{path: '/cityList'}" tag="a">点击我跳转到列表页面</router-link>
          <div class="swiper-container-menu">
        <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="item in menuList">
                <p :data-categoryId="item.category_id">{{item.category_name}}</p>
            </swiper-slide>
       </swiper>
       <div class="mask"></div>
      </div>
     
      <div v-infinite-scroll="_getActivityList" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <template v-for="item in list">
          <router-link :to="{path:`/activityDetail/${item.activity_id}`}">
            <activity-card :activity="item"></activity-card>
          </router-link>
        </template>
      </div>

      <div class="more-loading">
            <loading title="加载中" v-show="isLoading"></loading>
        </div>
        </div>
      </scroll>
    </div>
     <toolbar></toolbar>
  </div>
</template>

<script>
  import axios from 'axios'
  import { swiper, swiperSlide } from "vue-awesome-swiper"
  import ActivityCard from '@/components/ActivityCard'
  import navbar from '@/components/navbar'
  import toolbar from '@/components/toolbar'
  import Scroll from '@/components/scroll'
  import Loading from '@/components/Loading'
  export default {
    components: {
      ActivityCard,
      navbar,
      toolbar,
      swiper,
      swiperSlide,
      Scroll,
      Loading
    },
    data() {
      return {
        swiperOption: {
          slidesPerView : 3.4,
          on: {
            click: event => {
              let slides = document.querySelector('.swiper-container-menu').querySelectorAll('.swiper-slide');
              for(let i = 0; i < slides.length; i++){
                slides[i].className = 'swiper-slide'
              }
              let target = event.srcElement
              this.categoryId = target.dataset.categoryid
              target.parentNode.classList += ' swiper-clicked-active'
              this.list = []
              this.page = 1
              this.loadFinished = false
              this._getActivityList()
            }
          }
        },
        list: [],
        page: 1,
        loadFinished: false,
        isLoading: false,
        menuList: [],
        categoryId: 0
      }
    },
    created() {
      this._getActivityList();
      this._getMenuList();
    },
    methods: {
      _getMenuList(){
        let that = this
        axios.get('api/v1/activity/categoryList')
              .then(function(res){
                that.menuList = res.data.list
              })
      },
      _getActivityList() {
        if (this.loadFinished) return;
        if (this.isLoading) return;
        this.isLoading = true;
        let that = this;
        axios.get('api/v1/activity/index', {
            params: {
              pn: that.page,
              ps: 10,
              category_id: this.categoryId
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
            that.isLoading = false;
          })
      },
      changeCategory: function(e){
        $(e.target).addClass('swiper-slide-clicked');
      },
    }

  }

</script>

<style>
  .swiper-container-menu {
    position: relative;
    margin-bottom: 10px;
    height: 40px;
    line-height: 40px;
    font-size: 1.4rem;
    text-align: center;
    background-color: #fff;
  }
  .swiper-slide {
    text-align: center;
  }
  .swiper-clicked-active {
    color: #982424;
  }
  .mask {
    position: absolute;
    z-index: 1;
    right: 0;
    top: 0;
    height: 40px;
    background-image: linear-gradient(to right, rgba(255,255,255,0) 0%, #fff 80%);
    width: 40px;
  }
</style>
