import Vue from 'vue'
import Router from 'vue-router'
// import EcommerceIndex from '@/pages/ecommerce/EcommerceIndex'
// import GoodsDetailPage from '@/pages/ecommerce/goodsDetail'
// import Index from '@/pages/index'
// import ActivityIndex from '@/pages/activity/ActivityIndex'
// import WeibaIndex from '@/pages/weiba/WeibaIndex'
// import WeibaDetail from '@/pages/weiba/detail'
// import ActivityDetail from '@/pages/activity/detail'
// import CourseIndex from '@/pages/course/index'
// import CourseDetail from '@/pages/course/detail'
// import CityList from '@/pages/activity/cityList'
// import ShoppingCart from '@/pages/ecommerce/shoppingcart'
// import Login from '@/pages/user/login'
// import GoodsList from '@/pages/ecommerce/goodsList'


Vue.use(Router)

const EcommerceIndex = () => import('@/pages/ecommerce/EcommerceIndex')
const GoodsDetailPage = () => import('@/pages/ecommerce/goodsDetail')
const Index = () => import('@/pages/index')
const ActivityIndex = () => import('@/pages/activity/ActivityIndex')
const WeibaIndex = () => import('@/pages/weiba/WeibaIndex')
const WeibaDetail = () => import('@/pages/weiba/detail')
const ActivityDetail = () => import('@/pages/activity/detail')
const CourseIndex = () => import('@/pages/course/index')
const CourseDetail = () => import('@/pages/course/detail')
const CityList = () => import('@/pages/activity/cityList')
const ShoppingCart = () => import('@/pages/ecommerce/shoppingcart')
const Login = () => import('@/pages/user/login')
const GoodsList = () => import('@/pages/ecommerce/goodsList')



export default new Router({
    mode:'history',
    routes: [
        {
            path: '/goodsDetail/:id',
            name: 'GoodsDetail',
            component: GoodsDetailPage
        },
        {
            path: '/weibaDetail/:id',
            name: 'WeibaDetail',
            component: WeibaDetail
        },
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/activity',
            name: 'ActivityIndex',
            component: ActivityIndex
        },
        {
            path: '/activityDetail/:id',
            name: 'ActivityDetail',
            component: ActivityDetail
        },
        {
            path: '/weiba',
            name: 'WeibaIndex',
            component: WeibaIndex
        },
        {
            path: '/ecommerce',
            name: 'EcommerceIndex',
            component: EcommerceIndex
        },
        {
            path: '/course',
            name: 'CourseIndex',
            component: CourseIndex
        },
        {
            path: '/courseDetail/:id',
            name: 'CourseDetail',
            component: CourseDetail
        },
        {
            path: '/cityList/',
            name: 'CityList',
            component: CityList
        },
        {
            path: '/shoppingcart/',
            name: 'ShoppingCart',
            component: ShoppingCart
        },
        {
            path: '/login/',
            name: 'login',
            component: Login
        },
        {
            path: '/goodslist/',
            name: 'goodslist',
            component: GoodsList
        }
    ],
})
