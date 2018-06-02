import axios from 'axios'

export function getBannerList(){
    const url = '/api/v1/index/banner'
    const data = Object.assign({},{
        place: "w3g_goods_index_main"
    })

    return axios.get(url,{
        params: data
    }).then(res => {
        return Promise.resolve(res)
    })
}

export function getIndexWaterfall(page){
    const url = '/api/v1/index/flow'
    const data = Object.assign({},{
        page: page
    })

    return axios.get(url,{
        params: data
    }).then(res => {
        return Promise.resolve(res)
    })
}