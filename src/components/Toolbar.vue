<template>
  <ul class="fixed-bottom">
            <router-link tag="li" v-for="item in routes" :kye="item.id" :to="{path: item.path}" active-class="activeLink">
                <i class="icon" :class="'icon-' + item.className"></i>
                <span>{{item.title}}</span>
            </router-link>
        </ul>
</template>

<script>
export default {
    name: 'toolbar',
    data () {
        return {
            routes: [
                    {
                        path: '/',
                        title: '首页',
                        className: 'index',
                        id: 0
                    },
                    {
                        path: '/weiba',
                        title: '拾艺',
                        className: 'chat',
                        id: 1
                    },
                    {
                        path: '/course',
                        title: '学艺',
                        className: 'course',
                        id: 2
                    },
                    {
                        path: '/activity',
                        title: '乐活',
                        className: 'activity',
                        id: 3
                    },
                    {
                        path: '/ecommerce',
                        title: '泊物',
                        className: 'ecommerce',
                        id: 4
                    }
                ]
        }
    }
}
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
    .router-link-exact-active span {
        color: #982424;
    }
    .fixed-bottom {
        position: absolute;
        text-align: center;
        font-size: 1.4rem;
        width: 100%;
        display: block;
        background-color: #fff;
        height: 50px;
        line-height: 50px;
        overflow: hidden;
        top: calc(100vh - 50px);
        left: 0;
        z-index: 6;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -ms-flex-wrap: wrap;
        -webkit-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-justify-content: space-around;
        justify-content: space-around;
        border-top: 1px solid #eaeaea;
        li {
            text-align: center;
            padding-top: 6px;
            color: #969696;
            span {
                font-size: 1.2rem;
                line-height: 24px;
                display: block;
            }
            .icon {
                display: block;
                width: 1.6rem;
                height: 1.6rem;
                margin: 0 auto;
                &-index {
                    background: url(../assets/craft_foot_index.png);
                    background-size: 100%;
                }
                &-chat {
                    background: url(../assets/craft_foot_chat.png);
                    background-size: 100%;
                }
                &-activity {
                    background: url(../assets/craft_foot_activity.png);
                    background-size: 100%;
                }
                &-ecommerce {
                    background: url(../assets/craft_foot_goods.png);
                    background-size: 100%;
                }
                &-course {
                    background: url(../assets/craft_foot_learn.png);
                    background-size: 100%;
                }
            }
        }
    }
</style>


