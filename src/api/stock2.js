import HttpClient from 'utils/HttpClient';

export default {
    stockClearList(data){
        return HttpClient.get('/storage/clear/findByCondition', data);
    },//供应商结算列表
    stockClearDetail(id, data){
        return HttpClient.get(`/storage/clear/${id}`, data);
    },//供应商结算详情
    stockClearAgree(data){
        return HttpClient.putJSON('/storage/clear/agree', data);
    },//确认对账结算
    stockReportLossList(data){
        return HttpClient.get('/storage/reportLoss/findByCondition', data);
    },//商品保损列表
    stockReportLossDetail(id, data){
        return HttpClient.get(`/storage/reportLoss/${id}`, data);
    },//商品保损列表详情
    stockReportLossAgree(data){
        return HttpClient.postJSON('/storage/reportLoss/insertOrder', data);
    },//新建商品报损
    stockOrderGoodsList(data){
        return HttpClient.get('/storage/orderGoods/findByCondition', data);
    },//门店订货订货列表
    stockOrderGoodsDetail(id, data){
        return HttpClient.get(`/storage/orderGoods/${id}`, data);
    },//门店订货详情
    stockOrderGoodsAgree(data){
        return HttpClient.put('/storage/orderGoods/update', data);
    },//修改订货单状态
    stockOrderGoodsBatchUpdate(data){
        return HttpClient.putJSON('/storage/orderGoods/batchUpdate', data);
    },//批量审核
    distributionOrder(data){
        return HttpClient.postJSON('/storage/cargoFlow/insert/distributionOrder', data);
    },//订货配货
    newOrderGoods(data){
        return HttpClient.post('/storage/orderGoods/insertOrder', data);
    },//新建订货单
    depositList(data){
        return HttpClient.get('/storage/deposit/findByCondition', data);
    },//寄存列表
    depositDetail(data){
        return HttpClient.get('/storage/deposit/details/ByCondition', data);
	},//寄存列表的寄存明细
	depositChangeDetail(data){
		return HttpClient.get('/storage/deposit/change/findByCondition', data);
	},//寄存明细
    changeList(data){
        return HttpClient.get('/storage/deposit/change/ByCondition', data);
    },//寄存存取记录
    newDeposit(data){
        return HttpClient.post('/storage/deposit/insertOrder', data);
    },//新建寄存
    checkList(data){
        return HttpClient.get('/storage/check/findByCondition', data);
    },//盘点单列表
    checkDetail(id, data){
        return HttpClient.get(`/storage/check/${id}`, data);
	},
	//盘点汇总
	checkTotal(data){
		return HttpClient.get('/storage/check/findByIds', data);
	},
	//盘点详情
    newCheck(data){
        return HttpClient.post('/storage/check/insertOrder', data);
    }//新建盘点
}