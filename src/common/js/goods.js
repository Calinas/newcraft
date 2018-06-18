export default class GoodsCard {
    constructor({avatar,title,price,brand,id}) {
        this.avatar = avatar
        this.title = title
        this.price = price
        this.brand = brand
        this.id = id
    }
}

export function normalizeGoodsData(list){
    let ret = []
    list.forEach((item,index) => {
        let name = item.brand && item.brand.name ? item.brand.name : ''
            ret.push({
                avatar: item.default_image,
                title: item.goods_name,
                brand: name,
                price: item.price,
                id: item.params.goods_id
            })
    })
    return ret
}