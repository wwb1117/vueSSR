import HttpClient from 'utils/HttpClient';

export default {
    addBrand(data){
        return HttpClient.post('/item/brand/add', data);
	},
	// 店铺列表
	getMallList(data){
        return HttpClient.get('/user/list', data);
	},
	getSearBrandList(data){
		return HttpClient.get('/item/brand/queryParentShopId', data);
	},
	// 店铺详情
	getMallDetail(id) {
    	return HttpClient.get(`/user/${id}`)
	},
	// 添加店铺
	addMall(data) {
        return HttpClient.post('/user/add', data)
	},
	// 修改店铺
	editMall(data) {
        return HttpClient.put('/user/update', data)
	},
	// 获取员工列表
	getStaffList(data) {
        return HttpClient.get(`/user/son/list`, data)
	},
	// 获取员工详情
	getStaffDetail(id) {
        return HttpClient.get(`/user/son/${id}`)
	},
	// 新增员工
	addStaff(data) {
        return HttpClient.post(`/user/son/add`, data)
	},
	// 修改员工
	editStaff(data) {
        return HttpClient.put(`/user/son/update`, data)
	},
	// 获取角色列表
	getRoleList(data) {
    	return HttpClient.get('/role/list', data)
	},
	// 新增角色
	addRole(data) {
    	return HttpClient.postJSON('/role/add', data)
	},
	// 更新角色
	editRole(data) {
        return HttpClient.putJSON('/role/update', data)
	},
	// 删除角色
	deleteRole(id) {
        return HttpClient.delete(`/role/delete${id}`)
	},
	// 获取角色详情
	getRoleDetail(data) {
        return HttpClient.get('/role/detail', data)
	},
	// 获取店铺角色列表
	getRoleByShop(data) {
    	return HttpClient.get('/option/roles', data)
	},
	// 资源列表
	getResourceList(data) {
    	return HttpClient.get('/resource/list', data)
	},
	// 获取提成规则
	getPromoteRule(data) {
    	return HttpClient.get('/promote/rule', data)
	},
	// 修改提成设置
	updatePromoteRule(data) {
        return HttpClient.put('/promote/rule', data)
	},
	// 商品分类下提成列表
	getPromoteCateList(data) {
    	return HttpClient.get(`/promote/item/category`, data)
	},
	// 商品分类提成编辑
	editPromoteList(data) {
        return HttpClient.postJSON(`/promote/item/category`, data)
	},
    // 商品分类提成删除
    delPromote(data) {
        return HttpClient.delete(`/promote/special/delete`, data)
    },
	// 特殊商品提成设置
	editPromoteDetail(data) {
        return HttpClient.postJSON(`promote/special/update`, data)
	},
	// 充值配置列表
	getPrompteCharList(data) {
        return HttpClient.get(`/promote/recharge`, data)
	},
	// 新增充值配置
	addPrompteChar(data) {
        return HttpClient.post(`promote/recharge/add`, data)
	},
	// 编辑充值配置
	editPrompteChar(data) {
        return HttpClient.put(`promote/recharge/update`, data)
	},
	// 次卡提成列表
	getCountCardList(data) {
        return HttpClient.get(`/promote/countCard/list`, data)
	},
	// 次卡提成配置编辑
	updateCountCard(data) {
    	return HttpClient.postJSON('/promote/countCard/update', data)
	},
	// 获取商品列表
	getSalesList(data) {
    	return HttpClient.get('/promote/special/list', data)
	},
    getAllSalesList(data) {
        return HttpClient.get('/promote/special/itemList', data)
    }

}
