import * as types from './mutation-types'

const mutations = {
    [types.SET_WEIBOID](state,weiboId){
        state.weiboId = weiboId
    },
    [types.SET_USER](state,userInfo){
        state.userInfo = userInfo
    },
    [types.SET_GOODS_CATEGORY_ID](state,goodsCategoryId){
        state.goodsCategoryId = goodsCategoryId
    }
}

export default mutations