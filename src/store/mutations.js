import * as types from './mutation-types'

const mutations = {
    [types.SET_WEIBOID](state,weiboId){
        state.weiboId = weiboId
    },
    [types.SET_USER](state,userInfo){
        state.userInfo = userInfo
    }
}

export default mutations