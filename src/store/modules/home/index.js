export default {
    state: {
        version: '1.0',
        baseUrl: '',
        menuSetting: {
            isNextMenuShow: false, //二级菜单是否显示
            currFid: 1,
            currSid: null,
            currSlist: [],
            currRoutUrl: '/main',
			perssionArr: [],
			nextMenuTitle: ''
        },
        device: {
            width: null,
            height: null
        },
        modelContentHeight: null,
        modelContentWidth: null,
        pageData: '',
		userInfo: null,
		shopList: null,
		currentShop: null,
		cashiers: null,
		roleList: null,
		guideList: null
        
    },
    mutations: {
		setProxyBaseurl(state, value){
			if (process.env.VUE_APP_MYENV == 'development') {
				state.baseUrl = '/api'
			} else {
				state.baseUrl = ''
			}
		},
		//屏幕宽度和菜单项设置
        setDevice(state, value){
            state.device.width = value.width
            state.device.height = value.height
        },
        setModelContentHeight(state, value){
            state.modelContentHeight = value
        },
        setModelContentWidth(state, value){
            state.modelContentWidth = value
        },
        setPageData(state, value){
            state.pageData = value
        },
        setUserInfo(state, value){
            state.userInfo = value
        },
        setCurrFid(state, value){
            state.menuSetting.currFid = value
        },
        setCurrSid(state, value){
            state.menuSetting.currSid = value
        },
        setCurrSlist(state, value){
            state.menuSetting.currSlist = value
        },
        setCurrRoutUrl(state, value){
            state.menuSetting.currRoutUrl = value
        },
        setNextMenuShow(state, value){
            state.menuSetting.isNextMenuShow = value
		},
		nextMenuTitle(state, value){
            state.menuSetting.nextMenuTitle = value
        },
        setMenuSetting(state, value){
            state.menuSetting = value
        },
        setPerssionArr(state, value){
            state.menuSetting.perssionArr = value
		},
		setOwnerShopList(state, value){
			state.shopList = value
		},
        setOwnerRoleList(state, value){
            state.roleList = value
        },
		setCurrentShop(state, value){
			state.currentShop = value
		},
		setOwnerCashiers(state, value){
			state.cashiers = value
		},
		setOwnerGuides(state, value){
			state.guideList = value
		}
    }
};
