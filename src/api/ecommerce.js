import axios from 'axios'

export function getGoodsList(ps,pn,params){
    const url ='/api/v1/goods/indexGoodsList'
    const data = Object.assign({},params,{
        ps: ps,
        pn: pn
    })

    return axios.get(url,{
        params: data
    }).then(res => {
        return Promise.resolve(res)
    })
}