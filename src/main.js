// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Mint from 'mint-ui';
import VueQriously from 'vue-qriously'
import store from './store'
Vue.config.productionTip = false
import 'swiper/dist/css/swiper.css'
import 'mint-ui/lib/style.css'
require('./axios/api.js')
require('./vue.extend.js')

import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);
Vue.use(VueQriously)

// import VuePreview from 'vue-preview'
// Vue.use(VuePreview)
import VueImg from 'v-img';
Vue.use(VueImg);


import { Lazyload } from 'mint-ui';
Vue.use(Lazyload);

import { Spinner } from 'mint-ui';
Vue.component(Spinner.name, Spinner);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
})


