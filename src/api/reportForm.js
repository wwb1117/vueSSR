import HttpClient from 'utils/HttpClient';

export default {
    todayAchievement(data) {
        return HttpClient.get('/activity/find/', data);
    }, //当日业绩
    cashier(data) {
        return HttpClient.postJSON('/activity/add', data);
    }, //收银员业绩
    guide(data) {
        return HttpClient.postJSON('/activity/update', data);
    }, //导购员业绩
    payType(id, data) {
        return HttpClient.get(`/activity/get/${id}`, data);
    }, //付款方式
    supplierSeletment(data) {
        return HttpClient.post('/activity/disable', data);
    }, //供应商结算
    goodsStock(data) {
        return HttpClient.post('/activity/enable', data);
    }, //商品库存
    goodsSale(data) {
        return HttpClient.post('/activity/enable', data);
    }, //商品销售
    member(data) {
        return HttpClient.post('/activity/enable', data);
    }, //会员充值
    memberBalance(data) {
        return HttpClient.post('/activity/enable', data);
    }, //会员余额
}