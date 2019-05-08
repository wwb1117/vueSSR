import HttpClient from 'utils/HttpClient';

export default {
    memberList(data){
        return HttpClient.get('/member/list', data);
    },//会员列表
    addMember(data){
        return HttpClient.postJSON('/member/add', data);
	},//新增会员
	editMember(data){
        return HttpClient.putJSON('/member/update', data);
	},//修改会员
    addMemberbaby(data){
        return HttpClient.postJSON('/member/baby/add', data);
	},//新增会员宝宝
    MemberDetail(id){
        return HttpClient.get(`/member/${id}`);
	},//会员详情
	MemberDetailCountcard(data){
        return HttpClient.get('/member/countcard/detail/list', data);
	},//会员详情次卡详情
    levelList(data){
        return HttpClient.get('/member/level/list', data);
	},//会员等级
	getlevelList(id){
        return HttpClient.get(`/member/level/${id}`);
	},//会员等级详情
    addlevelList(data){
        return HttpClient.postJSON('/member/level/add', data);
    },//新建会员等级
    settinglevelList(data){
        return HttpClient.putJSON('/member/level/setting', data);
    },//会员等级设置
    enableMember(id){
        return HttpClient.put(`/member/level/${id}/enable`);
    },//会员等级启用
    growthRule(data){
        return HttpClient.putJSON('/member/level/growth/rule',data);
	},//成长规则
	getGrowthRule(data){
        return HttpClient.get('/member/level/growth/rule',data);
	},
    disableMember(id){
        return HttpClient.put(`/member/level/${id}/disable`);
    },//会员等级禁用
    ruleList(data){
        return HttpClient.get('/member/recharge/rule/list', data);
    },//充值规则
    addRuleList(data){
        return HttpClient.postJSON('/member/recharge/rule/add', data);
    },//新建充值规则
    deleteRule(id){
        return HttpClient.delete(`/member/recharge/rule/${id}`);
    },//删除充值规则
    integralList(data){
        return HttpClient.get('/member/integral/rule', data);
    },//获取积分
    updatelList(data){
        return HttpClient.putJSON('/member/integral/rule/update', data);
    },//编辑积分
    countCardList(data){
        return HttpClient.get('/member/countcard/list', data);
    },//次卡列表
    countCardSaleList(data){
        return HttpClient.get('/member/countcard/sale/list', data);
    },//次卡列表销售次数
    addCountCard(data){
        return HttpClient.postJSON('/member/countcard/add', data);
	},//新增次卡
	getCountCard(id){
        return HttpClient.get(`/member/countcard/${id}`);
	},//次卡详情
	editCountCard(data){
        return HttpClient.putJSON('/member/countcard/update', data);
	},//编辑次卡
	enableCountCard(id){
        return HttpClient.putJSON(`/member/countcard/${id}/enable`);
	},//次卡禁用
	disableCountCard(id){
        return HttpClient.putJSON(`/member/countcard/${id}/disable`);
    },//次卡启用
}