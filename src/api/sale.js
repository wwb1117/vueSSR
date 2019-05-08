import HttpClient from 'utils/HttpClient';

export default {
    //交班记录列表
    getWorkRecordList(data) {
        return HttpClient.get('/shift/list', data);
	},
	//销售单列表
	getSaleList(data){
		return HttpClient.get('/sale/admin/orders', data);
	},
	//销售单明细
	getSaleDetail(orderId){
		return HttpClient.get(`/sale/order/${orderId}`);
	}
}