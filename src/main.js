import Vue from 'vue'
import App from './App.vue'
import {
	createRouter
} from "./router";
import store from './store'
import 'vue2-animate/dist/vue2-animate.min.css'
import ElementUI from 'element-ui'
import 'jquery'
import directive from './directive/customDirective'

// 引入全局css
import './assets/css/bootstrap.css'
import './assets/css/font-awesome.min.css'
import 'element-ui/lib/theme-chalk/index.css' //引入elementUI主题样式
import './assets/css/app.css' // 自定义公共样式文件

import myBase from './utils/base'
import './utils/allEnumeration'
import * as filters from './utils/filters'
import * as math from 'mathjs'
import Print from './utils/print'

Vue.prototype.myBase = myBase
Vue.prototype.math = math


Vue.use(ElementUI, {
	size: 'small',
	zIndex: 999999
})
Vue.use(directive)
Vue.use(Print)

Vue.config.productionTip = false


// 进入页面重新获取屏幕可视高度
var winheight = document.documentElement.clientHeight;
var winwidth = document.documentElement.clientWidth;

store.commit('setProxyBaseurl'); //全局设置代理根路径
store.commit('setDevice', {
	width: winwidth,
	height: winheight
});
store.commit('setModelContentHeight', winheight - 100);
store.commit('setModelContentWidth', winwidth - 220);

// 定义过滤器
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')



window.onresize = myBase.debounce(myBase.windowSize, 500)

export function createApp() {
	const router = createRouter();
	const app = new Vue({
		router,
		// 根实例简单的渲染应用程序组件。
		render: h => h(App)
	})
	return {
		app,
		router
	}
}