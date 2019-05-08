import { MessageBox } from 'element-ui';
import { Message } from 'element-ui';
import store from '../store.js'
import router from '../router.js'
import * as math from 'mathjs'

// noinspection JSAnnotator
export default {
	///////////////////////////////////////////////////////////////////////页面之间跳转方法
	switchRouter(fid, sid){
		/**
		 * param{
		 * 	fid: 一级菜单id
		 * 	sid： 二级菜单id
		 * }
		 */
		$('#firstMenu_ul>li').removeClass('active')
		$('#secondMenu_ul>li').removeClass('active')

		store.state.home.userInfo.resourceList.forEach((item, index) => {
			if (item.id == fid) {
				store.commit("setCurrSlist", item.childMenus)
				store.commit("nextMenuTitle", item.resourceName)
				item.childMenus.forEach((item1, index1) => {
					if (item1.id == sid) {
						router.push({
							path: item1.frontPath
						})
					}
				})
			}
		})
		
		$('#firstMenu_ul>[type=' + fid + ']').addClass('active')
		$('#secondMenu_ul>[type=' + sid + ']').addClass('active')
		store.commit('setNextMenuShow', true)
		store.commit("setCurrFid", fid)
		store.commit("setCurrSid", sid)

	},
    ///////////////////////////////////////////////////////////////////////禁止返回键
    backSpaceBiden(){
        function doKey(e){
            var ev = e || window.event; //获取event对象
            var obj = ev.target || ev.srcElement;//获取事件源
            var t = obj.type || obj.getAttribute('type');//获取事件源类型

            if (ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea"){
                return false;
            }
        }
        //禁止后退键 作用于Firefox、Opera
        document.onkeypress = doKey;

        //禁止后退键  作用于IE、Chrome
        document.onkeydown = doKey;
    },
    //////////////////////////////////////////////////////////////////////是否有权限
    isHasPerssion(id){
		let rqsid = id
		let res = false

		let findId = (arr) => {
			for(let item of arr){
				if (item.id == rqsid) {
					res = true
				} else {
					if (item.childMenus && item.childMenus.length > 0) {
						findId(item.childMenus)
					}
				}
			}
		}
		
		findId(store.state.home.menuSetting.perssionArr)
		
		return res
    },
    //////////////////////////////////////////////////////////////////////验证弹框
    confirm(text, success, cancel){
        MessageBox.confirm(text, '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then( () => {
            if (success){
                success()
            }

        }).catch(() => {
            
            Message.info({
              type: 'info',
              duration: 1500,
              showClose: true,
              message: '已取消操作'
            });
        });
    },
    confirmDelet(text, success, cancel){
        MessageBox.confirm(text, '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then( () => {
            if (success){
                success()
            }
        }).catch(() => {
            
            Message.info({
              type: 'info',
              duration: 1500,
              showClose: true,
              message: '已取消删除'
            });
        });
    },
    //////////////////////////////////////////////////////////////////////深拷贝
    deepCopy(initalObj) {
        var obj = {};
        obj = JSON.parse(JSON.stringify(initalObj));
        return obj;
    },
    //////////////////////////////////////////////////////////////////////随机编码
    MathRand(type, numcount) {
        let sixNum = ''
        let myDate = new Date()
        let monthArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
		let day = myDate.getDate().toString() > 9 ? myDate.getDate() : '0' + myDate.getDate()
		let hour = myDate.getHours().toString() > 9 ? myDate.getHours() : '0' + myDate.getHours()
		let minu = myDate.getMinutes().toString() > 9 ? myDate.getMinutes() : '0' + myDate.getMinutes()
		let seconds = myDate.getSeconds().toString() > 9 ? myDate.getSeconds() : '0' + myDate.getSeconds()

        for (let i = 0; i < numcount; i++) {
            sixNum += Math.floor(Math.random() * 10);
        }
        return type + myDate.getFullYear() + monthArr[myDate.getMonth()] + day + hour + minu + seconds + sixNum
    },
    MathRand2(type){
        let sixNum = ''

        for (let i = 0; i < 7; i++) {
            sixNum += Math.floor(Math.random() * 10);
        }
        return type + '-' + sixNum
    },
    splitUserName(str){
        if (str.length > 7) {
            return str.substring(0, 6) + '...'
        } else {
            return str
        }
    },
    splitText(str, num){
        if (!str) {
            return ""
        }
        if (!num) {
            return str
        } else {
            if (str.length > num) {
                return str.substring(0, num) + '...'
            } else {
                return str
            }
        }
    },
    //////////////////////////////////////////////////////////////////////时间戳计算时间
    computeTime(start, end){
        var contTime = parseFloat(end) - parseFloat(start)
        var day = Math.round(contTime / 86400)
        var reshour = contTime % 86400
        var hour = Math.round(reshour / 3600)
        var resmin = reshour % 3600
        var min = Math.round(resmin / 60)

        if (hour < 10) {
            hour = '0' + hour
        }
        if (min < 10) {
            min = '0' + min
        }
        return day + '天' + hour + '小时' + min + '分'

    },
    //////////////////////////////////////////////////////////////////////时间戳换算成当前时间
    changeTime(num){
        if (!num) {
            return ''
        }
        var date=new Date(num*1000);
        var cc = 'day_min'

        //日期格式化
        var week=['日','一','二','三','四','五','六'];
        var y=date.getFullYear()+'-';
        var m=date.getMonth()+1+'-';
        var d=date.getDate()+'';

        var w='  星期'+week[date.getDay()];

        var h=date.getHours();
        // var am=h>=12?'  下午':'  上午';
        //h=h>12  ?  h-12  :  h;

        d=d<10  ?  '0'+d  :  ''+d;
        h=h<10  ?  '0'+h  :  ''+h ;

        var mi=date.getMinutes();
        mi=mi<10  ?  '0'+mi  :  ''+mi;

        var s=date.getSeconds();
        s=s<10  ?  '0'+s  :  ''+s;

        var str='';

        if(cc=='day'){
            str= y+m+d;
        }else if(cc=='min'){
            str= h+' : '+mi;
        }else if(cc=='day_min'){
            str=y+m+d+' '+h+' : '+mi;
        }else if(cc=='day_min_s'){
            str=y+m+d+' '+h+' : '+mi+' : '+s;
        }
        return str;
    },
    //////////////////////////////////////////////////////////////////////限制输入框只能输入整数,小数,且整数位首位不能为零
    formatNum(value){ //没值返回0
        if (typeof value == 'undefined') {
            return '0'
        }
        if (value == '') {
            return '0'
        }

        var val = String(value)

        val = val.replace(/^0*(0\.|[1-9])/, '$1') //解决粘贴不起作用的问题
        val = val.replace(/[^\d\.]/g, '') //清除“数字”和“.”以外的字符
        val = val.replace(/\.{2,}/g, ".") //只能输入一个小数点
        val = val.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".") //只能输入一个小数点

        if (val.indexOf(".") < 0 && val != "") {  //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
            if (val.substr(0, 1) == '0' && val.length == 2) {
                val = val.substr(1, val.length);
            }
        }
        return val
	},
	//////////////////////////////////////////////////////////////////////限制输入框只能输入整数,小数,且整数位首位不能为零
    formatNum2(value){ //没值返回空字符串
        if (typeof value == 'undefined') {
            return ''
        }

        var val = value

        val = val.replace(/^0*(0\.|[1-9])/, '$1') //解决粘贴不起作用的问题
        val = val.replace(/[^\d\.]/g, '') //清除“数字”和“.”以外的字符
        val = val.replace(/\.{2,}/g, ".") //只能输入一个小数点
        val = val.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".") //只能输入一个小数点

        if (val.indexOf(".") < 0 && val != "") {  //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
            if (val.substr(0, 1) == '0' && val.length == 2) {
                val = val.substr(1, val.length);
            }
        }
        return val
    },
	//////////////////////////////////////////////////////银行数目分割
	formatBlankNumber(value){
		if (typeof value == 'undefined') {
            return ''
        }
        if (value == '') {
            return ''
        }

        var val = value

        val = val.replace(/^0*(0|[1-9])/, '$1') //解决粘贴不起作用的问题
        val = val.replace(/[^\d]/g, '') //清除“数字”以外的字符

		val = val.replace(/[\s]/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");//不换行

		return val
	},
    
    formatFloatTwo(value){ //只能输入俩位小数，空字符返回空字符
        if (typeof value == 'undefined') {
            return ''
        }

        let val = value

        val = val.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
        val = val.replace(/^\./g,""); //验证第一个字符是数字
        val = val.replace(/\.{2,}/g,"."); //只保留第一个, 清除多余的
        val = val.replace(".","$#$").replace(/\./g,"").replace("$#$",".");

        if (val.indexOf(".") < 0 && val != "") {  //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
            if (val.substr(0, 1) == '0' && val.length == 2) {
                val = val.substr(1, val.length);
            }
        }
        val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数

        return val
    },
    formatFloatTwo2(value){ //只能输入俩位小数,空字符返回0
        if (typeof value == 'undefined') {
            return '0'
        }
        if (value == '') {
            return '0'
        }

        let val = value

        val = val.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
        val = val.replace(/^\./g,""); //验证第一个字符是数字
        val = val.replace(/\.{2,}/g,"."); //只保留第一个, 清除多余的
        val = val.replace(".","$#$").replace(/\./g,"").replace("$#$",".");

        if (val.indexOf(".") < 0 && val != "") {  //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
            if (val.substr(0, 1) == '0' && val.length == 2) {
                val = val.substr(1, val.length);
            }
        }
        val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数

        return val
    },
    formatIntNum(value){ //正整数
        if (typeof value == 'undefined') {
            return '0'
        }
        if (value == '') {
            return '0'
        }

        var val = value

        val = val.replace(/^0*(0|[1-9])/, '$1') //解决粘贴不起作用的问题
        val = val.replace(/[^\d]/g, '') //清除“数字”以外的字符

        if (val.indexOf(".") < 0 && val != "") {  //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
            if (val.substr(0, 1) == '0' && val.length == 2) {
                val = val.substr(1, val.length);
            }
        }
        return val
	},
	computeNumFormart(comStr){ //输入字符串计算公式，计算数据，保存俩位小数
		
		//comStr 实例 `${num1} * ${num2}`

		let resStr = math.format(math.eval(comStr), {precision: 14})

		resStr = parseFloat(resStr).toFixed(2)
		return resStr
	},
	//防抖函数
	debounce(func,wait) {
		let timeout

		return function () {
			let context = this;
			let args = arguments;
	
			if (timeout) clearTimeout(timeout);
	
			let callNow = !timeout;
			timeout = setTimeout(() => {
				timeout = null;
			}, wait)
	
			if (callNow) func.apply(context, args)
		}
	},
	windowSize(){
		console.log("123")
		let winheight = document.documentElement.clientHeight
		let winwidth = document.documentElement.clientWidth
		if (winheight < 700){
			winheight = 700
		}
		if (winwidth < 1380){
			winwidth = 1380
		}

		store.commit('setDevice', {width: winwidth, height: winheight})
		store.commit('setModelContentHeight', winheight - 100)
		store.commit('setModelContentWidth', winwidth - 220)
	}

}
