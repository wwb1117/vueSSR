import HttpClient from 'utils/HttpClient';

export default {
	getParamSetData(id){ //获取门店参数设置数据
		return HttpClient.get(`/setup/${id}`);
	},
	editParamSet(data){ //编辑门店参数
		return HttpClient.postJSON('/setup/update', data);
	},
	getLogList(data){
		return HttpClient.get('/operationlog/list', data);
	},
	editMallPassWord(data){ //修改店铺密码
		return HttpClient.put('/user/admin/changePassword', data);
	},
	editMallOtherInfo(data){ //修改店铺其他信息
		return HttpClient.put('/user/current/update', data);
	},
	getMallInfo(data){ //获取门店信息
		return HttpClient.get('/user/current/info', data);
	},
	getNoticeList(data){ //获取门店通知列表
		return HttpClient.get('/notice/list', data);
	},
	addNotice(data){ //新增门店通知
		return HttpClient.postJSON('/notice/add', data);
	},
	getPayTypeData(data){ //获取支付方式信息
		return HttpClient.get('/payment/setting/', data);
	},
	setPayTypeData(data){ //设置支付方式信息
		return HttpClient.putJSON('/payment/setting/', data);
	},
	getPayMentData(data){ //获取收银小票信息
		return HttpClient.get('/print/setting/payment', data);
	},
	getChargeMentData(data){ //获取充值小票信息
		return HttpClient.get('/print/setting/recharge', data);
	},
	setPayMentData(data){ //设置小票信息
		return HttpClient.putJSON('/print/setting/', data);
	}
}