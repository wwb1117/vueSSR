import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login/login'
import store from './store.js'
import {
	Message
} from 'element-ui'

Vue.use(Router)

export function createRouter(){
	var router = new Router({
		base: process.env.BASE_URL,
		mode: 'history', //一定要是history模式
		routes: [
			{
				path: '/',
				name: 'home',
				component: () => import( /* webpackChunkName: "about" */ './views/home/home.vue'),
				children: [{
						name: "首页",
						path: '/main',
						component: () => import('@/views/home/main')
					},
					/*************************** 仓库模块*************************************/
					{
						name: "库存查询",
						path: '/stockSearch',
						component: () => import('@/views/stock/stockSearch/stockSearch')
					},
					{
						name: "库存查询",
						path: '/stockSearch/changeRecord',
						component: () => import('@/views/stock/stockSearch/changeRecord')
					},
					{
						name: "库存预警",
						path: '/stockWarn',
						component: () => import('@/views/stock/stockWarn')
					},
					{
						name: "变动明细",
						path: '/changeDetail',
						component: () => import('@/views/stock/changeDetail')
					},
					{
						name: "采购单",
						path: '/purchaseList',
						component: () => import('@/views/stock/purchase/purchaseList')
					},
					{
						name: "新增采购单",
						path: '/addPurchase',
						component: () => import('@/views/stock/purchase/addPurchase')
					},
					{
						name: "采购单详情",
						path: '/purchase/purchaseDetail',
						component: () => import('@/views/stock/purchase/purchaseDetail')
					},
					{
						name: "物流管理",
						path: '/logisticsManege',
						component: () => import('@/views/stock/logisticsManege/logisticsManege')
					},
					{
						name: "物流管理-详情",
						path: '/logisticsDetail',
						component: () => import('@/views/stock/logisticsManege/logisticsDetail')
					},
					{
						name: "物流管理-进货",
						path: '/logisticsManege/inStock',
						component: () => import('@/views/stock/logisticsManege/inStock')
					},
					{
						name: "物流管理-出库",
						path: '/logisticsManege/outStock',
						component: () => import('@/views/stock/logisticsManege/outStock')
					},
					{
						name: "物流管理-调货单",
						path: '/logisticsManege/shipOrder',
						component: () => import('@/views/stock/logisticsManege/shipOrder')
					},
					{
						name: "物流管理-配货",
						path: '/logisticsManege/prepare',
						component: () => import('@/views/stock/logisticsManege/prepare')
					},
					{
						name: "供应商结算",
						path: '/supplierSummary',
						component: () => import('@/views/stock/supplierSummary')
					},
					{
						name: "商品报损",
						path: '/goodLoss',
						component: () => import('@/views/stock/goodLoss/goodLoss')
					},
					{
						name: "商品报损-报损单",
						path: '/goodLoss/goodLossOrder',
						component: () => import('@/views/stock/goodLoss/goodLossOrder')
					},
					{
						name: "商品报损-报损明细",
						path: '/goodLoss/goodLossDetail',
						component: () => import('@/views/stock/goodLoss/goodLossDetail')
					},
					{
						name: "门店订货",
						path: '/mallOrder',
						component: () => import('@/views/stock/mallOrder/mallOrder')
					},
					{
						name: "门店订货-详情",
						path: '/mallOrder/mallOrderDetail',
						component: () => import('@/views/stock/mallOrder/mallOrderDetail')
					},
					{
						name: "寄存统计",
						path: '/depositTotal',
						component: () => import('@/views/stock/depositTotal')
					},
					{
						name: "寄存取明细",
						path: '/depositDetail',
						component: () => import('@/views/stock/depositDetail')
					},
					{
						name: "盘点",
						path: '/check',
						component: () => import('@/views/stock/check')
					},
					/*************************** 店铺模块*************************************/
					{
						name: "店铺列表",
						path: '/mallList',
						component: () => import('@/views/mall/list')
					},
					{
						name: "新增分店",
						path: '/newShop',
						component: () => import('@/views/mall/newShop')
					},
					{
						name: "员工列表",
						path: '/staffList',
						component: () => import('@/views/mall/staff')
					},
					{
						name: "员工角色",
						path: '/staffRole',
						component: () => import('@/views/mall/staffRole')
					},
					{
						name: "新增角色",
						path: '/newRole',
						component: () => import('@/views/mall/newRole')
					},
					{
						name: "新增员工",
						path: '/newStaff',
						component: () => import('@/views/mall/newStaff')
					},
					{
						name: "导购技师",
						path: '/technicalList',
						component: () => import('@/views/mall/technical')
					},
					{
						name: "新增导购",
						path: '/newGuide',
						component: () => import('@/views/mall/newGuide')
					},
					{
						name: "提成设置",
						path: '/transfer',
						component: () => import('@/views/mall/transfer')
					},
					{
						name: "设置特殊商品",
						path: '/setGoods',
						component: () => import('@/views/mall/setGoods')
					},
					{
						name: "添加商品",
						path: '/addGoods',
						component: () => import('@/views/mall/addGoods')
					},
					/*************************** 会员模块*************************************/
					{
						name: "会员资料列表",
						path: '/memberList',
						component: () => import('@/views/member/list')
					},
					{
						name: "导入会员/宝宝资料",
						path: '/leadTable',
						component: () => import('@/views/member/leadTable')
					},
					{
						name: "会员资料详情",
						path: '/memberDetail',
						component: () => import('@/views/member/memberDetail')
					},
					/******** 会员资料内账单*******/
					{
						name: "余额对账明细",
						path: '/memberDetail/yueList',
						component: () => import('@/views/member/detail/yueDetail.vue')
					},
					{
						name: "积分对账明细",
						path: '/memberDetail/integralDetailList',
						component: () => import('@/views/member/detail/integralDetail.vue')
					},
					{
						name: "次卡对账明细",
						path: '/memberDetail/secondDetailList',
						component: () => import('@/views/member/detail/secondDetail.vue')
					},
					{
						name: "历史消费单据",
						path: '/memberDetail/historyList',
						component: () => import('@/views/member/detail/historyDetail.vue')
					},
					{
						name: "购买商品统计",
						path: '/memberDetail/shopList',
						component: () => import('@/views/member/detail/shopDeatil.vue')
					},
					{
						name: "新增会员",
						path: '/newMember',
						component: () => import('@/views/member/newMember')
					},
					{
						name: "等级管理",
						path: '/gradeList',
						component: () => import('@/views/member/grade')
					},
					{
						name: "新增等级",
						path: '/newGrade',
						component: () => import('@/views/member/newGrade')
					},
					{
						name: "积分规则",
						path: '/integralList',
						component: () => import('@/views/member/integral')
					},
					{
						name: "充值规则",
						path: '/topupList',
						component: () => import('@/views/member/topup')
					},
					{
						name: "新增充值规则",
						path: '/newTopup',
						component: () => import('@/views/member/newTopup')
					},
					{
						name: "次卡",
						path: '/secondCardList',
						component: () => import('@/views/member/secondCard')
					},
					{
						name: "新增次卡",
						path: '/newSecond',
						component: () => import('@/views/member/newSecond')
					},
					/*************************** 营销模块*************************************/
					{
						name: "促销活动",
						path: '/marketingList',
						component: () => import('@/views/marketing/list')
					},
					{
						name: "新增促销活动",
						path: '/newMarket',
						component: () => import('@/views/marketing/newMarket')
					},
					{
						name: "编辑促销活动",
						path: '/editMarket',
						component: () => import('@/views/marketing/editMarket')
					},
					/*************************** 商品模块*************************************/
					{
						name: "商品资料",
						path: '/info',
						component: () => import('@/views/goods/info')
					},
					{
						name: "新增商品",
						path: '/newGood',
						component: () => import('@/views/goods/newGood')
					},
					{
						name: "商品分类",
						path: '/category',
						component: () => import('@/views/goods/category')
					},
					{
						name: "商品品牌",
						path: '/brand',
						component: () => import('@/views/goods/brand')
					},
					{
						name: "供应商",
						path: '/supplier',
						component: () => import('@/views/goods/supplier')
					},
					{
						name: "新增供应商",
						path: '/newSupplier',
						component: () => import('@/views/goods/newSupplier')
					},
					/*************************** 设置模块*************************************/
					{
						name: "店铺信息",
						path: '/mallInfo',
						component: () => import('@/views/setting/mallInfo')
					},
					{
						name: "门店通知",
						path: '/mallMessage',
						component: () => import('@/views/setting/mallMessage')
					},
					{
						name: "收银设置",
						path: '/cashSet',
						component: () => import('@/views/setting/cashSet/cashSet')
					},
					{
						name: "收银设置-新手指引",
						path: '/cashSet/help',
						component: () => import('@/views/setting/cashSet/cashSetHelp')
					},
					{
						name: "参数设置",
						path: '/paramSet',
						component: () => import('@/views/setting/paramSet')
					},
					{
						name: "操作日志",
						path: '/operatLog',
						component: () => import('@/views/setting/operatLog')
					},
					{
						name: "打印设置",
						path: '/printSet',
						component: () => import('@/views/setting/printSet/printSet')
					},
					{
						name: "打印设置-收银",
						path: '/printSet/editCash',
						component: () => import('@/views/setting/printSet/editCashPrint')
					},
					{
						name: "打印设置-充值",
						path: '/printSet/editRecharge',
						component: () => import('@/views/setting/printSet/editRechargePrint')
					},
					/*************************** 销售模块*************************************/
					{
						name: "销售单",
						path: '/saleList',
						component: () => import('@/views/sale/saleList')
					},
					{
						name: "交班记录",
						path: '/workRecord',
						component: () => import('@/views/sale/workRecord')
					},
					/*************************** 报表模块*************************************/
					{
						name: "当日营业额",
						path: '/realTime',
						component: () => import('@/views/form/realTime')
					},
					{
						name: "收银员业绩",
						path: '/achievement',
						component: () => import('@/views/form/achievement')
					},
					{
						name: "导购员绩效",
						path: '/performance',
						component: () => import('@/views/form/performance')
					},
					{
						name: "付款方式",
						path: '/payWay',
						component: () => import('@/views/form/payWay')
					},
					{
						name: "供应商结算",
						path: '/jieSuan',
						component: () => import('@/views/form/jieSuan')
					},
					{
						name: "商品库存",
						path: '/inventory',
						component: () => import('@/views/form/inventory')
					},
					{
						name: "商品销售",
						path: '/sale',
						component: () => import('@/views/form/sale')
					},
					{
						name: "会员充值",
						path: '/recharge',
						component: () => import('@/views/form/recharge')
					},
					{
						name: "会员余额",
						path: '/balance',
						component: () => import('@/views/form/balance')
					}
				]
			},
			{
				path: '/login',
				name: 'login',
				component: login
			}
		]
	})

	router.beforeEach((to, from, next) => {
		// 登录拦截
		if (to.fullPath == '/') {
			if (sessionStorage.getItem('user')) {
				next({
					path: '/main'
				})
				return
			} else {
				Message({
					message: '会话已过期,请重新登录!',
					showClose: true,
					type: 'warning'
				});

				next({
					path: '/login'
				})
				return
			}
		} else if (to.fullPath == '/login') {
			next();
			return
		} else if (to.fullPath == '/main') {
			//从其他页面跳转到首页相关操作
			store.commit('setNextMenuShow', false)
			next();
			return
		} else {
			if (sessionStorage.getItem('user')) {
				next();
				return
			} else {
				Message({
					message: '会话已过期,请重新登录!',
					showClose: true,
					type: 'warning'
				});

				next({
					path: '/login'
				})
				return
			}
		}
	})

	router.afterEach((to) => {
		store.commit('setCurrRoutUrl', to.fullPath)
	})
	return router
}
