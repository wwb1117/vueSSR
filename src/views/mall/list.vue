<template>
    <div>
        <div class="model_topcol">
            <span>店铺列表</span>
            <div>
                <el-button v-perss='9' class="wid90" type="primary" size="small" @click="addShop()">新增分店</el-button>
            </div>
        </div>
        <div class="model_content">
            <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight + 32 + 'px', overflow: 'auto'}">
                <div class="header_seach_wrap" style="padding: 15px">
                    <el-input style="width: 380px" size="small" prefix-icon="el-icon-search" v-model="tableParam.shopName" placeholder="请输入店铺名称" clearable @clear="clear"></el-input>
                    <el-button type="primary" size="small" @click="search">查询</el-button>
                </div>
                <ul class="mallListWap">
                    <li v-for="(item, index) in tableData" :key="index">
                        <div v-if="item.shopType !== 0" class="greenFlag flag">
                            <span>分店</span>
                        </div>
                        <div v-else class="redFlag flag">
                            <span>总店</span>
                        </div>
                        <h3>{{item.shopName}}</h3>
                        <div class="top">
                            <dl v-if="item.shopStatus!= 4">
                                <dt>创建时期</dt>
                                <dd style="line-height: 20px;height: 20px;">{{item.created | time}}</dd>
                            </dl>
                            <dl v-if="item.shopStatus!= 4">
                                <dt>到期时期</dt>
                                <dd style="line-height: 20px;height: 20px;">{{item.expireTime | time}}</dd>
                            </dl>
                        </div>
                        <div class="clearfix bottom">
                            <div class="fl">
                                {{item.cityName}}：{{item.shopArea}}㎡
                            </div>
                            <div class="fr" style="line-height: 32px">
                                <span v-if="item.auditStatus == 0">审核中</span>
                                <span v-else-if="item.auditStatus == 1">正常</span>
                                <span v-else-if="item.auditStatus == 2">未通过</span>
                                <!--<el-button v-if="item.auditStatus == 2 && item.shopType !== 0" size="small" @click="edit(item)" style="margin-left: 10px">编辑</el-button>-->
                                <el-button v-if="item.auditStatus != 0" size="small" @click="edit(item)" style="margin-left: 10px">编辑</el-button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
	import api from 'api/mall'
    export default {
        data() {
            return {
                tableData: [],
                mallList: [],
                totalPage: 10,
                tableParam: {
                    shopName: '',
                    pageNo: 1,
                    pageSize: 10000
                }
            }
        },
        computed: {},
        created() {},
        activated() {
			this.getMallList()
        },
        methods: {
			getMallList(){
				api.getMallList(this.tableParam).then((response) => {
				    this.tableData = response.data.listData
				})
			},
            addShop() {
                this.$router.push({
                    path: '/newShop'
                })
            },
            edit(data) {
                this.$router.push({
                    name: '新增分店',
                    query: {
                        id: data.id
                    }
                })
            },
            search() {
                this.getMallList()
            },
            clear() {
                this.getMallList()
            }
        },
        mounted() {
		}
    }
</script>
<style scoped>
    .header_seach_wrap>div {
        margin-right: 10px;
    }
    .mallListWap{
        font-family: "Microsoft YaHei";
        overflow: hidden;
        padding: 0 15px;
    }
    .mallListWap li{
        border: 1px solid #DCDFE6;
        position: relative;
        overflow: hidden;
        width: 24.4%;
        float: left;
        margin-right: .8%;
        margin-bottom: .8%;
    }
    .mallListWap li:nth-child(4n){
        margin-right: 0;
    }
    .mallListWap li .flag{
        position: absolute;
        left: -35px;
        top: -35px;
        width: 70px;
        height: 70px;
        text-align: center;
        line-height: 115px;
        transform: rotate(-45deg);
        font-size: 12px;
        color: #fff;
    }
    .mallListWap li .greenFlag{
        background: #67C239;
    }
    .mallListWap li .redFlag{
        background: #F56B6B;
    }
    .mallListWap li h3{
        margin: 20px 0;
        font-size: 14px;
        font-weight: bold;
        text-align: center;
    }
    .mallListWap li dl{
        margin: 0;
    }
    .mallListWap li dt{
        font-weight: normal;
        font-size: 14px;
        line-height: 24px;
    }
    .mallListWap li dd{
        color: #909399;
    }
    .mallListWap li .top{
        padding: 15px;
        display: flex;
        justify-content: space-between;
    }
    .mallListWap li .bottom{
        background: #F5F5F5;
        padding: 10px 15px;
    }
    .mallListWap li .bottom .fl{
        line-height: 32px;
    }
</style>