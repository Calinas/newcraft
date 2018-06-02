<template>
  <div class="course-detail course">
      <img :src="imageResize(courseInfo.cover,640,360)" class="img100" v-if="courseInfo.cover">
      <ul class="tab flow-course-tab course-tab border-1px course-main-tab" @click="tab($event)">	
            <li v-for="item in tabList" v-text="item.name" :data-tab="item.tab" class="tab__item" :class="{active : activeTab == item.tab}"></li>    	
		</ul>
    <div v-show="activeTab == 'detail'">
        <div class="common-wrapper">
          <p class="font-14 font-bold font-black course-title" v-text="courseInfo.title"></p>
          <div class="flex h-between course-price">
              <div class="font-red">免费</div>
              <div class="flex-wrapper">
                  初级
              </div>
          </div>
          <div class="flex h-around course-info">
              <div><p>总节数</p> <p class="font-black">0节</p></div> 
              <div><p>更新时间</p> <p class="font-black">一次性更新</p></div> 
              <div><p>浏览量</p> <p class="font-black">168</p></div> 
              <div><p>学习人数</p> <p class="font-black">35</p></div>
          </div>
          <div class="tag-wrapper">
            <span v-for="item in courseInfo.tag_list" v-text="'#' + item.name +  '#'"></span>
            </div>
      </div>
      <userview-card :userInfo="teacherInfo" :avatar="avatar"></userview-card>
      <div class="common-wrapper">
          <p class="detail-title font-15-title">课程详情</p>
          <div :class="{fold : isToggle}" class="fold-container">
              <template v-if="courseInfo.content_type == 'json'" v-for="item in courseInfo.content_json">
										<div class="title--underline font-black" v-text="item.title"></div>
										<pre v-html="item.text"></pre>
										<img v-for="img in item.img" class="img100" :src="img"  v-lazy="img"/>
									</template>
									<template v-else>
										<pre v-html="courseInfo.content"></pre>
									</template>
                                    <div class="font-red fold-area" v-show="isToggle" @click="toggle">展开课程详情<i class="icon-triangle icon-triangle-up"></i></div>
                                    <div class="font-red fold-area fold-area-bottom" v-show="!isToggle" style="display: none;" @click="toggle">收起课程详情<i class="icon-triangle"></i></div>
          </div>
      </div>
    <div class="lineTitle">
                    <line-title :title="title"></line-title>
    </div>
    <div class="commonWrapper flex recommend-wrapper">  
        <div v-for="item in recommendCourseList">
            <course-card :course="item"></course-card>
        </div>
    </div>
    </div>
    <div v-show="activeTab == 'catalog'">
        <ul class="accordion">
            <li class="accordion-item" @click="selectCatalog($event)" v-for="item in courseList">
                <div class="flex">
                    <p v-text="item.title"></p>
                    <div class="icon-wrapper"></div>
                </div>
                <div class="inner-content">
                    <p><span class="font-black" v-text="'单节描述' + item.summary"></span></p>
                </div>
            </li>
        </ul>
    </div>
    <div v-show="activeTab == 'message'">
        留言
    </div>
    <div v-show="activeTab == 'comments'">
        评论
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import userviewCard from '@/components/userviewCard'
import LineTitle from '@/components/lineTitle'
import CourseCard from '@/components/CourseCard'
export default {
  components: {
      userviewCard,
      LineTitle,
      CourseCard
  },
  data(){
      return {
          isToggle: true,
          courseId: 0,
          courseInfo:{},
          avatar: '',
          title: '为您推荐',
          recommendCourseList:[],
          courseList:[],
          teacherInfo:{},
          activeTab:'detail',
          tabList:[
              {
                  name: '课程详情',
                  tab: 'detail'
              },
              {
                  name: '课程目录',
                  tab: 'catalog'
              },
              {
                  name: '留言',
                  tab: 'message'
              },
              {
                  name: '评论',
                  tab: 'comments'
              }
          ]
      }
  },
  created(){
      this.courseId = this.$route.params.id
      this._getCourseDetail()
  },
  methods: {
      toggle(){
                this.isToggle = !this.isToggle;
            },
      _getCourseDetail(){
          let that = this
          axios.get('api/v1/course/info',{
              params: {
                  id: this.courseId
              }
          }).then(function(res){
              that.courseInfo = res.data
              that.avatar = res.data.user.avatar.avatar_middle
              that.recommendCourseList = res.data.recommend_course_list
              that.teacherInfo = res.data.user
          })
         axios.get('api/v1/course/lessonList',{
             params: {
                 course_id: this.courseId
             }
         }).then(function(res){
             that.courseList = res.data.list
         })
      },
      tab(e){
          this.activeTab = e.srcElement.dataset.tab
      },
      selectCatalog(e){
          let targetNode = $(e.currentTarget).find('.inner-content')
          if(targetNode.hasClass('active')){
                targetNode.removeClass('active')
          }else {
              targetNode.addClass('active')
          }
      }
  }
}
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
    @import '../../assets/style/_mixins.scss';
    @import '../../assets/style/_import_craftGoods.scss';
    @include title;
    @include flex;
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
    .common-wrapper {
            padding: 15px;
    background-color: #fff;
    color: #969696;
    margin-top: 10px;
    }
    .tab {
        overflow: hidden;
        background-color: #fff;
        font-size: 1.4rem;
        &__item {
            float: left;
            width: 25%;
            padding: 10px 0;
            text-align: center;
            &.active {
                color: #982424;
                position: relative;
                border-bottom: none !important;
                &:after {
                    display: block;
                    content: '';
                    position: absolute;
                    left: 50%;
                    margin-left: -25%;
                    bottom: 0;
                    width: 50%;
                    height: 3px;
                    background-color: #982424;
                    z-index: 4;
                }
            }
        }
    }
    .course {
        &-title {
            font-size: 1.4rem;
            font-weight: bold;
            line-height: 1.5rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
        }
        &-price {
            margin-top: 0.6rem;
            margin-bottom: 1.6rem;
        }
        &-info {
                background: #f2f2f2;
    padding: 15px 6px;
    text-align: center;
        }
    }
    .tag-wrapper {
        margin: 15px 0;
        & > span {
                padding: 2px 12px;
    border-radius: 40px;
    background-color: #f2f2f2;
    margin-right: 8px;
    color: #37363b;
        }
    }
    .recommend-wrapper {
        &.flex {
    & > div {
        width: 48%;
    }
    justify-content: space-between;
    flex-wrap: wrap;
}
    }
    
    .lineTitle {
        padding: 1rem 0;
    }
    .accordion {
        background-color: #fff;
        .flex {
            
            min-height: 44px;
            @include flex;
            justify-content: space-between;
            align-items: center;
            margin: 0 15px;
            border-bottom: 1px solid #f2f2f2;
        }
        .inner-content {
            font-size: 1.2rem;
            display: none;
            padding: 15px;
            background-color: rgb(241, 241, 241);
            color: #969696;
            &.active {
                display: block;
            }
        }
    }
</style>


