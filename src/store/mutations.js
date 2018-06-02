import * as types from './mutation-types'

const mutations = {
    [types.SET_WEIBOID](state,weiboId){
        state.weiboId = weiboId
    }
}

export default mutations