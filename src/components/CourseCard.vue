<template>
    <div class="goodsCard">
        <router-link :to="{path: `/courseDetail/${course.id}`}">
            <div class="goodsCard__imgWrapper">
            <img :src="imageResize(course.cover,640,360)">
        </div>
        <p class="goodsCard__title nopadding-bottom" v-text="course.title"></p>
        <dl>
            <dt class="goodsCard__brand goodsCard__brand--course" v-if="course.user && course.user.uname" v-text="course.user.uname"></dt> 
            <dd class="starWrapper">
                <template v-for="i in 4">
                    <template v-if="i <= course.level">
                        <span class="iconfont iconfont-star"></span>
                    </template>
                    <template v-else>
                        <span class="icon-unstar"></span>
                    </template>
                </template>
            </dd>
        </dl>
        <dl class="font-bold">
            <dt class="font-14 font-red" v-if="course.price > 0">{{formatMoney(course.price)}}</dt>
            <dd class="font-14 font-red" v-else>免费</dd>
        </dl>
        </router-link>
    </div>
</template>

<script>
export default {
  name: "CourseCard",
  props: {
    course: Object
  },
  data() {
      return{

      }
  }
};
</script>


<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
    .goodsCard {
            padding-bottom: 0.8rem;
    margin-bottom: 0.7rem;
        &__title {
                overflow: hidden;
    white-space: nowrap;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
    padding-top: 10px;
    font-size: 1.4rem;
    color: #1a1a1a;
    padding-bottom: 6px;
    text-align: left;
        }
        &__brand {
                font-size: 12px;
    color: #969696;
        }
        
    }
</style>
