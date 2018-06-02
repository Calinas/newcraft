import axios from 'axios'
import vue from 'vue'

axios.defaults.baseURL = 'http://webpack.dev.91craft.com'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// // 请求拦截器
// axios.interceptors.request.use(function (config) {
//     return config;
// }, function (error) {
//     return Promise.reject(error);
// })
// // 响应拦截器
// axios.interceptors.response.use(function (response) {
//     return response;
// }, function (error) {
//     return Promise.reject(error);
// })

// // 封装axios的get请求
// export function fetch(url, params) {
//     return new Promise((resolve, reject) => {
//         axios.post(url, params)
//             .then(response => {
//                 resolve(response.data);
//             })
//             .catch((error) => {
//                 reject(error);
//             })
//     })
// }

// export function getData(url, params) {
//     return new Promise((resolve, reject) => {
//         axios.get(url, params)
//             .then(response => {
//                 resolve(response.data);
//             })
//             .catch((error) => {
//                 reject(error);
//             })
//     })
// }

// export default {
//     JH_news(url, params) {
//         return fetch(url, params);
//     },
//     Index_slider(url, params) {
//         return fetch(url, params);
//     },
//     Info_Api(url,params){
//         return fetch(url, params);
//     },
//     Goods_slider(url,params){
//         return fetch(url, params);
//     },
//     Course_slider(url,params){
//         return fetch(url, params);
//     },
//     bannerList(url,params){
//         return fetch(url, params);
//     },
//     goodsMenu(url,params){
//         return fetch(url, params);
//     },
//     indexProductList(url,params){
//         return fetch(url, params);
//     },
//     indexBannerList(url, params){
//         return getData(url, params);
//     }
// }