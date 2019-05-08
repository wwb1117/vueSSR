import HttpClient from 'utils/HttpClient';

export default {
    /************************获取区域地区数据****************************** */
    getProviceData(){
        return HttpClient.get('address/province');
    },
    getCityData(id){
        return HttpClient.get(`address/${id}/city`);
    },
    getAreaData(id){
        return HttpClient.get(`address/${id}/area`);
    },
    getUserInfo(){
        return HttpClient.get('/user/info');
    },
    getCustomPhone(){
        return HttpClient.get('/siteSetting/info');
    },
    getUserPerssion(){
        return HttpClient.get('/user/status');
	},
	/************************以上接口此项目暂时不用****************************** */
    allShops(data){
        return HttpClient.get('/option/shops', data);
    },//所有店铺
    getCurrentShop(data){
        return HttpClient.get('/option/currentShop', data);
    },//获取当前店铺
	allSupplier(data){ //所有供应商
		return HttpClient.get('/supplier/queryParentShopId', data);
	},
    allRoles(data) { // 所有角色
        return HttpClient.get('/option/roles', data)
    },
	allCategory(data){ //所有分类
		return HttpClient.get('/item/category/queryParentShopId', data);
	},
	allCashiers(){ //店铺所有收银员
		return HttpClient.get('/option/cashiers');
	},
	allGuides(){ //店铺所有导购员
		return HttpClient.get('/option/guides');
	},
	addressList(){ //省市区接口（省）
		return HttpClient.get('address/province');
	},
	cityList(id){ //省市区接口（市）
		return HttpClient.get(`address/${id}/city`);
	},
	areaList(id){ //省市区接口（区）
		return HttpClient.get(`address/${id}/area`);
	}
}
