const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
const produceNewsData = function() {
	let articles = [];
	for (let i = 0; i < 100; i++) {
		let newArticleObject = {
			title: Random.csentence(5, 30), //  Random.csentence( min, max )
			thumbnail_pic_s: Random.image('350x250', '#98a17e', '#fff', 'img'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
			author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
			date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
		}
		articles.push(newArticleObject)
	}

	return {
		articles: articles
	}
}

const indexSlider = function() {
	let slides = [];
	for (let i = 0; i < 5; i++) {
		let newSlidesObject = {
			title: Random.csentence(5, 10), //  Random.csentence( min, max )
			cover: Random.image('640x360', '#82ada9', '#e5ffff', '泊物幻灯片' + i), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
		}
		slides.push(newSlidesObject)
	}

	return {
		slides: slides
	}
}

const courseSlider = function() {
    let slides = [];
    for (let i = 0; i < 5; i++) {
        let newSlidesObject = {
            title: Random.csentence(5, 10), //  Random.csentence( min, max )
            cover: Random.image('640x360', '#982424', '#fff', '课程幻灯片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
        }
        slides.push(newSlidesObject)
    }

    return {
        slides: slides
    }
}

const detailPage = function() {
    let detailInfo = {
        title: Random.title(), //  Random.csentence( min, max )
        cover: Random.image('640x360', '#98afff', '#fff', 'img'),
        desc: Random.sentence(10,20),
        readCount: Random.natural(10,1000),
        viewCount: Random.natural(100,3000),
        author: Random.name(true),
        content: Random.paragraph(),
        created_at: Random.datetime()
    }
    return {
        info: detailInfo
    }
}

const indexMenuList = function() {
    let list = [];
    for (let i = 0; i < 8; i++) {
        let menuObject = {
            title: Random.title(1), //  Random.csentence( min, max )
            cover: Random.image('24x24', '#75a478', '#d7ffd9', i),
        }
        list.push(menuObject)
    }
    return {
        list: list
    }
}

const indexProductList = function() {
    let list = [];
    for(let i = 0; i < 10; i++){
        let productObject = {
            cover: Random.image('400x400', '#546e7a', '#819ca9', 'good ' + i),
            title: Random.title(1,3), //  Random.csentence( min, max )
            price: Random.integer(200,5000),
            brand: Random.string(2,5)
        }
        list.push(productObject);
    }
    return {
        list: list
    }
}

const goodsDetailInfo = function () {
    let info = {
        goods_name: Random.title(), //  Random.csentence( min, max )
        goods_cover: Random.image('640x360', '#98afff', '#fff', 'img'),
        desc: Random.sentence(10,20),
        content: Random.paragraph(),
        price: Random.integer(200,5000),
        brand: Random.string(2,5)
    }
}


// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/news/index', 'post', produceNewsData);
Mock.mock('/index/slider','post',indexSlider);
Mock.mock('/index/detail','post',detailPage);
Mock.mock('/goods/slider','post',indexSlider);
Mock.mock('/course/slider','post',courseSlider);
Mock.mock('/goods/menu','post',indexMenuList);
Mock.mock('/goods/indexProductList','post',indexProductList);
Mock.mock('/goods/goodsDetail','post',goodsDetailInfo);