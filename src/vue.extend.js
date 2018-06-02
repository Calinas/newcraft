import Vue from 'vue'

/**
 * 毫秒转换友好的显示格式
 *
 * @param stime  转化时间
 * @param ctime 系统时间
 * @return
 */
Vue.prototype.friendlyDate = function (stime, ctime) {
    var da = new Date(ctime * 1000);
    var sda = new Date(stime * 1000);
    var time2 = da.getTime();
    var time1 = stime * 1000;
    var time = 0;
    if (time1 > time2) {
        time = time1 - time2;
        sda = da;
    } else {
        time = time2 - time1;
    }
    if (time < 1000) return "刚刚";
    time = parseInt(time / 1000);
    if (time > 86400) {
        var day = parseInt(time / (24 * 60 * 60));
        if (day == 1) {
            return "昨天 " + sda.getHours() + ":" + sda.getMinutes();
        } else if (day > 1 && day < 365) {
            var month = sda.getMonth() + 1;
            var date = sda.getDate();
            if (month <= 9) {
                month = '0' + month;
            }
            if (date <= 9) {
                date = '0' + date;
            }

            return month + "-" + date;
        } else {
            var month = sda.getMonth() + 1;
            var date = sda.getDate();
            if (month <= 9) {
                month = '0' + month;
            }
            if (date <= 9) {
                date = '0' + date;
            }
            return sda.getFullYear() + '-' + month + "-" + date;
        }
        ;
    } else if (time > 3600) {
        var hour = parseInt(time / (60 * 60));
        return hour + "小时前";
    } else if (time > 60) {
        var hour = parseInt(time / 60);
        return hour + "分钟前";
    } else {
        return time + "秒前";
    }
}
/**
 * 制造url
 * @param url url地址
 * @param params 参数
 */
Vue.prototype.makeUrl = function (url, params) {
    var website = SITE_URL + '/index.php';
    url = url.split('/');
    if (url[0] == '' || url[0] == '@')
        url[0] = APPNAME;
    if (!url[1])
        url[1] = 'Index';
    if (!url[2])
        url[2] = 'index';
    website = website + '?app=' + url[0] + '&mod=' + url[1] + '&act=' + url[2];
    if (params) {
        //params = params.join('&');
        website = website + '&' + params;
    }
    return website;
}

/**
 * 图片大小裁切
 * @param imgurl 图片原始地址
 * @param width 裁切宽度
 * @param height 裁切高度
 */
Vue.prototype.imageResize = function (imgurl, width, height) {
    if (imgurl == undefined || imgurl == null) {
        imgurl = '';
    }
    if (imgurl.indexOf('thumbnail') >= 0) {
        return imgurl;
    }
    if (width && height) {
        imgurl += "?imageMogr2/thumbnail/!" + width + "x" + height + "r";
        imgurl += "/gravity/Center/crop/" + width + "x" + height;
    } else if (width) {
        imgurl += "?imageMogr2/thumbnail/" + width + "x";
    } else {
        imgurl += "?imageMogr2/thumbnail/x" + height;
    }
    return imgurl;
}

/**
 * 检测是否登陆
 */
Vue.prototype.checkLogin = function () {
    if (!MID || MID == 0 || MID == '') {
        openLogin();
        return false;
    }
    return true;
}

Vue.prototype.checkPasswd = function (s) {
    var patrn = /^(\w){6,20}$/;
    if (!patrn.exec(s)) return false;
    return true;
}

Vue.prototype.checkPaymentPasswd = function (s) {
    var patrn = /^(\d){6}$/;
    if (!patrn.exec(s)) return false;
    return true;
}

Vue.prototype.checkMobile = function (s) {
    var patrn = /^[1][34578]\d{9}$/;
    if (!patrn.exec(s)) return false;
    return true;
}

/**
 * 客户端检查
 */
Vue.prototype.checkClient = function () {
    var client = '';
    var ua = window.navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        client = 'mobile';
    } else if (ua.match(/craftapp/i) == 'craftapp' || ua.match(/craftnative/i) == 'craftnative') {
        client = 'App';
    } else if (navigator.platform.indexOf('Win32') == -1) {
        client = 'mobile';
    } else {
        client = 'Pc';
    }
    return client;
}

/**
 * 获取url地址栏参数
 *
 * @param string $name
 * @return string
 */
Vue.prototype.getQueryString = function (name, frame) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = '';
    if (frame == 'framework7') {
        var url = window.location.href;
        url = url.substr(url.indexOf('#!/') + 3, url.length - 1);
        r = url.substr(1).match(reg);
    } else {
        r = window.location.search.substr(1).match(reg);
    }
    if (r != null) return unescape(r[2]);
    return null;
}

/**
 * 获取url字符串url中参数
 */
Vue.prototype.getUrlStringParams = function (url, name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = url.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

/**
 * 手机号中间几位隐藏为*代替
 */
Vue.prototype.hideMobile = function (mobile) {
    return mobile.substr(0, 3) + '****' + mobile.substr(7);
}

/**
 * 身份证中间几位隐藏为*代替
 */
Vue.prototype.hideId = function (mobile) {
    return mobile.substr(0, 3) + '************' + mobile.substr(14);
}

/**
 * 姓名最后一个字用*号代替
 */
Vue.prototype.hidePersonName = function (mobile) {
    return mobile.replace(/.(?=.)/g, '*');
}

/**
 * 获取指定日期星期
 */
Vue.prototype.getWeekDay = function (date) {
    var week;
    var date = new Date(date);
    if (date.getDay() == 0) week = "周日";
    if (date.getDay() == 1) week = "周一";
    if (date.getDay() == 2) week = "周二";
    if (date.getDay() == 3) week = "周三";
    if (date.getDay() == 4) week = "周四";
    if (date.getDay() == 5) week = "周五";
    if (date.getDay() == 6) week = "周六";
    return week;
}
/**
 * 活动格式化年
 */
Vue.prototype.ActivityInitYear = function (a, b) {
    var beginDate = new Date(a.substr(0, 10)),
        endDate = new Date(b.substr(0, 10)),
        resultDate;
    if (a && b) {
        var firstYear = beginDate.getFullYear(),
            secondYear = beginDate.getFullYear();
        if (firstYear == secondYear) {
            resultDate = firstYear + '年';
        } else {
            resultDate = firstYear + '~' + secondYear + '年';
        }
        return resultDate;
    }
}
/**
 * 活动格式化年月日
 */
Vue.prototype.ActivityInitYearDate = function (a, b) {
    var beginDate = new Date(a.substr(0, 10)),
        endDate = new Date(b.substr(0, 10)),
        resultDate;
    if (a && b) {
        var firstYear = beginDate.getFullYear(),
            secondYear = endDate.getFullYear(),
            firstMonth = beginDate.getMonth() + 1,
            secondMonth = endDate.getMonth() + 1,
            firstDate = beginDate.getDate(),
            secondDate = endDate.getDate();
        if (firstYear != secondYear) {
            //不同年 2016年9月20日-2019年9月22日；
            resultDate = firstYear + '年' + firstMonth + '月' + firstDate + '日' + '~' + secondYear + '年' + secondMonth + '月' + secondDate + '日';
        } else if (firstYear == secondYear && firstMonth != secondMonth) {
            //同年不同月 2016年9月20日-10月22日
            resultDate = firstYear + '年' + firstMonth + '月' + firstDate + '日' + '~' + secondMonth + '月' + secondDate + '日';
        } else if (firstYear == secondYear && firstMonth == secondMonth && firstDate != secondDate) {
            // 同年同月不同日 2016年9月20日-21日
            resultDate = firstYear + '年' + firstMonth + '月' + firstDate + '日' + '~' + secondDate + '日';
        }
        return resultDate;
    }
}
/**
 * 活动格式化日期 如 5月1日
 */
Vue.prototype.ActivityInitDate = function (date) {
    if (date) {
        var time = date.substr(0, 10);
        var date = new Date(time);
        return (date.getMonth() + 1) + '月' + date.getDate() + '日';
    }
}

/**
 * 活动格式化日期 如 8:00
 */
Vue.prototype.ActivityInitTime = function (time) {
    return time.substr(0, 5);
}

/**
 * 把时间戳类型转为字符串类型时间
 */
Vue.prototype.initStrTime = function (time) {
    var date = new Date(time * 1000);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
}

/**
 * 活动格式化星期
 */
Vue.prototype.ActivityInitWeek = function (str) {
    var weekStr = '每周';
    var strs = new Array();
    strs = str.split(',');
    for (var i = 0; i < strs.length; i++) {
        switch (strs[i]) {
            case '1':
                strs[i] = '一';
                break;
            case '2':
                strs[i] = '二';
                break;
            case '3':
                strs[i] = '三';
                break;
            case '4':
                strs[i] = '四';
                break;
            case '5':
                strs[i] = '五';
                break;
            case '6':
                strs[i] = '六';
                break;
            case '7':
                strs[i] = '日';
                break;
        }
        weekStr += strs[i] + '、';
    }
    return weekStr.substr(0, weekStr.length - 1);
}

/**
 * 跳转用户详情页通用方法
 * 只针对framework7有效
 */
Vue.prototype.userInfoView = function (uid,type) {
    mainView.router.loadPage(this.makeUrl('w3g/Shop/craft_myspace', 'store_id=' + uid + '&type=' + type));
}

/**
 * 判断是否浮点型
 */
Vue.prototype.isFloat = function () {
    var reg = /^(-|\+)?\d+\.\d*$/;
    return reg.test(str);
}

/**
 * 跳转消息对话中心 只针对framework7有效
 *
 * @param integer $uid
 * @return string
 */
Vue.prototype.jumpMsgDetail = function (uid) {
    mainView.router.loadPage(this.makeUrl('w3g/Message/detail', 'from_uid=' + uid));
}

/**
 * 获取地理位置
 *
 * @return city
 */
Vue.prototype.getLocation = function (page) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                //  百度转换经纬度为城市名
                var latlon = position.coords.latitude + ',' + position.coords.longitude;
                var url = "http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=" + latlon + "&output=json&pois=1&ak=9MPZcOCUmbQiTuYEbWO0BWMzVuH7vNxx";
                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: url,
                    async: false,
                    beforeSend: function () {
                        $("#baidu_geo").html('正在定位...');
                    },
                    success: function (json) {
                        if (json.status == 0) {
                            page.find("#baidu_geo").html(json.result.addressComponent.city);
                            BAIDU_GEO_CITY = json.result.addressComponent.city;
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        $("#baidu_geo").html(latlon + "地址位置获取失败");
                    }
                });
            },
            function (error) {
                //  错误提示
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        alert('定位失败,用户拒绝请求地理定位');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert('定位失败,位置信息是不可用');
                        break;
                    case error.TIMEOUT:
                        alert('定位失败,请求获取用户位置超时');
                        break;
                    default:
                        alert('定位失败,定位系统失效');
                }
            });

    } else {
        alert('浏览器不支持地理定位。');
    }
}

/**
 * 检查是否空的对象
 *
 * @param object object
 * @return boolean
 */
Vue.prototype.isEmptyObject = function (object) {
    for (var item in object) {
        return true;
    }
    return false;
}

/**
 * 检查是否合法url
 *
 * @param string url
 * @return boolean
 */
Vue.prototype.checkUrl = function (url) {
    var str = url;
    //判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
    //下面的代码中应用了转义字符"\"输出一个字符"/"
    var Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
    var objExp = new RegExp(Expression);
    if (objExp.test(str) == true) {
        return true;
    } else {
        return false;
    }
}

/**
 * 检查是否合法邮箱
 *
 * @param string email
 * @return boolean
 */
Vue.prototype.isEmail = function (email) {
    var Expression = /^\w+(?:[-+.\']\w+)*@\w+(?:[-.]\w+)*\.\w+(?:[-.]\w+)*$/;
    var objExp = new RegExp(Expression);
    if (objExp.test(email)) {
        return true;
    } else {
        return false;
    }
}

/**
 * 判断数组元素是否存在
 */
Vue.prototype.inArray = function (arr, val) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === val) {
            return true;
        }
    }
    return false;
}

/**
 * 删除数组内指定元素
 */
Vue.prototype.removeByValue = function (arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            arr.splice(i, 1);
            return arr;
        }
    }
}

/**
 * 获取客户权限
 *
 * @param integer activity
 * @return array
 */
Vue.prototype.getCustomerServiceAuth = function (activity) {
    var data = {};
    var params = {};
    data.method = '/api/v1/activity/customerServiceAuth';
    data.requestType = 'get';
    params.activity_id = activity;
    data.params = params;
    var resReturn = [];
    $.ajax({
        url: U('api/FrontendApi/api'),
        type: 'post',
        dataType: 'json',
        data: data,
        async: false,
        success: function (res) {
            resReturn = res;
        }
    });
    return resReturn;
}

/**
 * 时间戳转日期格式  2017-07-24 15:15:16
 *
 * @param string format 日期格式
 * @param integer timestamp 时间戳
 * @return string
 */
Vue.prototype.formatDate = function (format, timestamp) {
    var a, jsdate = ((timestamp) ? new Date(timestamp * 1000) : new Date());
    var pad = function (n, c) {
        if ((n = n + "").length < c) {
            return new Array(++c - n.length).join("0") + n;
        } else {
            return n;
        }
    };
    var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var txt_ordin = {1: "st", 2: "nd", 3: "rd", 21: "st", 22: "nd", 23: "rd", 31: "st"};
    var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var f = {
        // Day
        d: function () {
            return pad(f.j(), 2)
        },
        D: function () {
            return f.l().substr(0, 3)
        },
        j: function () {
            return jsdate.getDate()
        },
        l: function () {
            return txt_weekdays[f.w()]
        },
        N: function () {
            return f.w() + 1
        },
        S: function () {
            return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'
        },
        w: function () {
            return jsdate.getDay()
        },
        z: function () {
            return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0
        },

        // Week
        W: function () {
            var a = f.z(), b = 364 + f.L() - a;
            var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
            if (b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b) {
                return 1;
            } else {
                if (a <= 2 && nd >= 4 && a >= (6 - nd)) {
                    nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
                    return date("W", Math.round(nd2.getTime() / 1000));
                } else {
                    return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);
                }
            }
        },

        // Month
        F: function () {
            return txt_months[f.n()]
        },
        m: function () {
            return pad(f.n(), 2)
        },
        M: function () {
            return f.F().substr(0, 3)
        },
        n: function () {
            return jsdate.getMonth() + 1
        },
        t: function () {
            var n;
            if ((n = jsdate.getMonth() + 1) == 2) {
                return 28 + f.L();
            } else {
                if (n & 1 && n < 8 || !(n & 1) && n > 7) {
                    return 31;
                } else {
                    return 30;
                }
            }
        },

        // Year
        L: function () {
            var y = f.Y();
            return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0
        },
        //o not supported yet
        Y: function () {
            return jsdate.getFullYear()
        },
        y: function () {
            return (jsdate.getFullYear() + "").slice(2)
        },

        // Time
        a: function () {
            return jsdate.getHours() > 11 ? "pm" : "am"
        },
        A: function () {
            return f.a().toUpperCase()
        },
        B: function () {
            // peter paul koch:
            var off = (jsdate.getTimezoneOffset() + 60) * 60;
            var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off;
            var beat = Math.floor(theSeconds / 86.4);
            if (beat > 1000) beat -= 1000;
            if (beat < 0) beat += 1000;
            if ((String(beat)).length == 1) beat = "00" + beat;
            if ((String(beat)).length == 2) beat = "0" + beat;
            return beat;
        },
        g: function () {
            return jsdate.getHours() % 12 || 12
        },
        G: function () {
            return jsdate.getHours()
        },
        h: function () {
            return pad(f.g(), 2)
        },
        H: function () {
            return pad(jsdate.getHours(), 2)
        },
        i: function () {
            return pad(jsdate.getMinutes(), 2)
        },
        s: function () {
            return pad(jsdate.getSeconds(), 2)
        },
        //u not supported yet

        // Timezone
        //e not supported yet
        //I not supported yet
        O: function () {
            var t = pad(Math.abs(jsdate.getTimezoneOffset() / 60 * 100), 4);
            if (jsdate.getTimezoneOffset() > 0) t = "-" + t; else t = "+" + t;
            return t;
        },
        P: function () {
            var O = f.O();
            return (O.substr(0, 3) + ":" + O.substr(3, 2))
        },
        //T not supported yet
        //Z not supported yet

        // Full Date/Time
        c: function () {
            return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P()
        },
        //r not supported yet
        U: function () {
            return Math.round(jsdate.getTime() / 1000)
        }
    };

    return format.replace(/[\\]?([a-zA-Z])/g, function (t, s) {
        if (t != s) {
            // escaped
            ret = s;
        } else if (f[s]) {
            // a date function exists
            ret = f[s]();
        } else {
            // nothing special
            ret = s;
        }
        return ret;
    });
}

/**
 * 图片转为base64编码
 *
 * @params string img 图片路径
 * @return string
 */
Vue.prototype.getBase64Image = function (img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
    var dataURL = canvas.toDataURL("image/" + ext);
    return dataURL;
}

/**
 * 格式化数据金额，比如￥110.00
 *
 */
Vue.prototype.formatMoney = function (money) {
    return "￥" + parseFloat(money).toFixed(2);
}

/**
 * 今天,昨天
 *
 */
Vue.prototype.isToday = function (str) {
    var dd = new Date();
    var thisTime = new Date(str).getTime();
    dd.setDate(dd.getDate()); //获取AddDayCount天后的日期 
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1; //获取当前月份的日期 
    var d = dd.getDate();
    var nowDate = y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
    var theDate = Vue.prototype.formatDate('Y-m-d', str).replace(/\-/g, '');
    if (theDate == (y + "-" + (m < 10 ? "0" + m : m) + "-" + ((d - 1) < 10 ? "0" + d - 1 : d - 1)).replace(/\-/g, '')) {
        return '昨天 ';
    } else if (theDate == (y + "-" + (m < 10 ? "0" + m : m) + "-" + ((d - 2) < 10 ? "0" + d - 2 : d - 2)).replace(/\-/g, '')) {
        return '前天 ';
    } else if (theDate == (y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d)).replace(/\-/g, '')) {
        return '今天 ';
    } else if (theDate == (y + "-" + (m < 10 ? "0" + m : m) + "-" + ((d + 1) < 10 ? "0" + d : d + 1)).replace(/\-/g, '')) {
        return '明天 ';
    } else if (theDate == (y + "-" + (m < 10 ? "0" + m : m) + "-" + ((d + 2) < 10 ? "0" + d : d + 2)).replace(/\-/g, '')) {
        return '后天 ';
    } else {
        return Vue.prototype.formatDate('m.d', str) + ' '
    }
}

/**
 * 把时间戳类型转只有年月日
 */
Vue.prototype.formatOnlyDate = function (time,style) {
    var str = style?style:'-';
    var date = new Date(time * 1000);
    return date.getFullYear() + str + (date.getMonth() + 1) + str + date.getDate();
}

/**
 ** 加法函数，用来得到精确的加法结果
 ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 ** 调用：accAdd(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/


/**
 * 格式化折扣率
 *
 * @params string number 折扣
 * @return string
 */
Vue.prototype.formatDiscount = function (number) {
    if (!isNaN(number)) {
        var number = number.toFixed(3);
        number = number.substring(0, number.lastIndexOf('.') + 3);
        if (number >= 1) {
            return '1折';
        }
        return Vue.prototype.accMul(number, 10) + '折';
    }
    return '';
}

/**
 * 返回上一页，模拟f7
 *
 */
Vue.prototype.goPreviousPage = function () {
    mainView.router.back();
}

/**
 * 格式化日期 2014-8-12 9:10:00
 *
 */
Vue.prototype.formatTime = function (ns) {
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    var data = ns * 1000;
    var time = new Date(data);
    var y = time.getFullYear(); //年
    var m = time.getMonth() + 1; //月
    var d = time.getDate(); //日
    var h = time.getHours(); //时
    var mm = time.getMinutes(); //分
    mm = checkTime(mm);
    return y + "-" + m + "-" + d + " " + h + ":" + mm;
}


/**
 * TalkingData自定义事件
 * @param EventId
 * @param Label
 * @param KvString "key1=val1&key2=val2"
 * @param referer
 */
Vue.prototype.onEvent = function (EventId, Label, KvString, referer) {
    KvString = KvString || '';
    referer = referer || false;
    TDAPPOnEvent(EventId, Label, KvString, referer);
}
