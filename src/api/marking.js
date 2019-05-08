import HttpClient from 'utils/HttpClient';

export default {
    activityList(data){
        return HttpClient.get('/activity/find/', data);
    },//促销列表
    addActivity(data){
        return HttpClient.postJSON('/activity/add', data);
    },//新增促销
    updateActivity(data){
        return HttpClient.postJSON('/activity/update', data);
    },//修改促销
    getActivity(id, data){
        return HttpClient.get(`/activity/get/${id}`, data);
    },//详情
    disableActivity(data){
        return HttpClient.post('/activity/disable', data);
    },//禁用
    enableActivity(data){
        return HttpClient.post('/activity/enable', data);
    },//启用
}