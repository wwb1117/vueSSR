import HttpClient from 'utils/HttpClient';

export default {
    stockSearch(data){ //库存查询列表
        return HttpClient.get('/storage/storage/findByCondition', data);
	},
	stockChangeDetail(id, data){ //库存查询明细
		return HttpClient.get(`/storage/storage/${id}`, data);
	},
	getPurchaseList(data){ //获取采购单列表
		return HttpClient.get('/storage/purchase/findByCondition', data);
	},
	purchaseDetail(id){ //采购单明细
		return HttpClient.get(`/storage/purchase/${id}`);
	},
	cansolePurchase(id){ //取消采购单
		return HttpClient.put(`/storage/purchase/${id}`);
	},
	testGoodList(data){ //测试接口，禁用
		return HttpClient.get('/test/itemList', data);
	},
	addPurchaseOrder(data){ //新增采购单
		return HttpClient.postJSON('/storage/purchase/insertOrder', data);
	},
	purchaseInstock(data){ //采购入库
		return HttpClient.postJSON('/storage/purchase/insertStoreOrder', data);
	},
	stockWarnList(data){ //库存预警
		return HttpClient.get('/storage/storage/warning', data);
	},
	stockWarnDetail(id){ //库存预警明细
		return HttpClient.get(`/storage/storage/warning/${id}`);
	},
	stockChangeDetailList(data){ //库存变动明细列表
		return HttpClient.get('/storage/storage/change', data);
	},
	getLogisticsList(data){ //货流管理列表
		return HttpClient.get('/storage/cargoFlow/findByCondition', data);
	},
	logisticsDetail(id){ //货流管理详情
		return HttpClient.get(`/storage/cargoFlow/${id}`);
	},
	sureInStock(id){ //确认入库
		return HttpClient.put(`/storage/cargoFlow/agree/${id}`);
	},
	rejectInStock(id){ //拒绝入库
		return HttpClient.put(`/storage/cargoFlow/refuse/${id}`);
	},
	addInstockOrder(data){ //进货单，出库单
		return HttpClient.postJSON('/storage/cargoFlow/insertOrder', data);
	},
	addDisstockOrder(data){ //配货，调货
		return HttpClient.postJSON('/storage/cargoFlow/distributionOrder', data);
	},
	agreeBack(id){ //同意退货
		return HttpClient.put(`/storage/cargoFlow/agreeBack/${id}`);
	}
}
