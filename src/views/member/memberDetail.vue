<template>
    <div>
        <div class="model_topcol">
            <span>会员资料 - 会员详情</span>
        </div>
        <div class="model_content">
            <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
                <div>
                    <div class='second_header'>会员详情</div>
                    <div class='second_inner'>
                        <img src='../../../public/img/logo.png'>
                        <div class='inner_right'>
                            <div class='right_inner'>
                                <h4 style='font-weight:700'>{{tabelData.customerName}}</h4>
                                <p><span>会员手机</span>{{tabelData.cellPhone}}</p>
                                <p><span>会员等级</span>{{tabelData.levelName}}</p>
                                <p><span>会员卡号</span>{{tabelData.cardNumber}}</p>
                            </div>
                            <div class='right_inner'>
                                <p><span>会员生日</span>{{tabelData.birthday}}</p>
                                <p><span>开卡日期</span>{{tabelData.cardCreateDate | time_s}}</p>
                                <p><span>到期日期</span>{{tabelData.cardEndDate | time_s}}</p>
                                <p><span>注册来源</span>{{tabelData.shopName}}</p>
                            </div>
                            <div class='right_inner'>
                                <p><span>QQ/微信</span>{{tabelData.qq}}{{tabelData.wechat}}</p>
                                <p><span>邮箱</span>{{tabelData.email}}</p>
                                <p><span>地址</span>{{tabelData.addrDetail}}</p>
                                <p><span>备注</span>{{tabelData.remark}}</p>
                            </div>
                        </div>
                    </div>
                    <div class='inner_bottom'>
						<div>
							<p>{{tabelData.cardBalance}}</p>
							<p>全场类余额(元)</p>
							<el-button size="small" class='wid90' @click='goYueDetail()'>对账明细</el-button>
						</div>
						<div>
							<p>{{tabelData.cardBalance}}</p>
							<p>服务类余额(元)</p>
							<el-button size="small" class='wid90' @click='goYueDetail()'>对账明细</el-button>
						</div>
                        <div>
                            <p>{{tabelData.cardIntegral}}</p>
                            <p>积分</p>
                            <el-button size="small" class='wid90' @click='goIntegralDetail()'>对账明细</el-button>
                        </div>
                        <div>
                            <p v-if='tabelData.countCardNumber'>{{tabelData.countCardNumber}}</p>
                            <p v-else>0</p>
                            <p>次卡</p>
                            <el-button size="small" class='wid90' @click='goSecondDetail(tabelData)'>对账明细</el-button>
                        </div>
                    </div>
                    <div class='second_header' style="padding:12px 20px"><span>消费概括</span>
                        <el-button size="small" @click='goShopList()'>购买商品统计</el-button>
                        <el-button size="small" @click='goHistoryList()'>历史消费单据</el-button>
                    </div>
                    <div class='second_inner'>
                        <div class='second_bottom'>
                            <div>
                                <p>11.22</p>
                                <p>今日消费(元)</p>
                            </div>
                            <div>
                                <p>0.00</p>
                                <p>近七日消费(元)</p>
                            </div>
                            <div>
                                <p>0.00</p>
                                <p>本月消费(元)</p>
                            </div>
                            <div>
                                <p>0.00</p>
                                <p>累计总消费(元)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="model_footer">
            <el-button class='wid90' style="margin-left:20px;" size="small" @click='goBack'>返回</el-button>
            <el-button class='wid90' style="margin-left:20px;" type="primary" size="small" @click='goDetail()'>编辑</el-button>
        </div>
    </div>
</template>

<script>
    import api from 'api/member'

    export default {
        data() {
            return {
                tabelData:{
                }
            }
        },
        computed: {},
        methods: {
            getList(){
                api.MemberDetail(this.$store.state.home.pageData).then((res)=>{
                    this.tabelData = res.data
                })
            },
            goYueDetail(){
                this.$router.push({
                    path: '/memberDetail/yueList'
                })
            },
            goIntegralDetail(){
                this.$router.push({
                    path: '/memberDetail/integralDetailList'
                })
            },
            goSecondDetail(data){
                this.$router.push({
					path: '/memberDetail/secondDetailList',
					query:{id : data.id, table : data} 
                })
            },
            goHistoryList(){
                this.$router.push({
                    path: '/memberDetail/historyList'
                })
            },
            goShopList(){
                this.$router.push({
                    path: '/memberDetail/shopList'
                })
            },
            goDetail(){
                this.$router.push({
                    path: 'newMember'
                })
            },
            goBack(){
                this.$router.push({
                    path: 'memberList'
                })
            }
        },
        created() {},
        activated() {
            this.getList()
        },
        mounted() {}
    }
</script>
<style lang='scss' scoped>
    .header_seach_wrap>div {
        margin-right: 10px;
    }
    .second_header{
        padding: 10px 20px;
        background: #F5F5F5;
        font-weight: 700;
        .el-button{
            float: right;
            margin-top:-6px;
            &:nth-child(2){
                margin-left:10px
            }
        }
    }
    .inner_bottom{
        margin: 20px;
        padding:20px 40px;
        background: #F7F7F7;
        border: 1px solid #e4e8eb;
        overflow: hidden;
        div{
            float:left;
            margin-right:40px;
            p{
                font-weight: 700;
                text-align: center
            }
            p:nth-child(1){
                color:#409EFF;
                margin-bottom:0
            }
        }
    }
    .second_inner{
        padding:20px;
        overflow: hidden;
        img{
            width:150px;
            float:left;
            margin-right:20px;
        }
        .inner_right{
            /* float:right; */
            .right_inner{
                float:left;
                margin-right:50px;
                p{
                    line-height: 28px;
                    font-weight: 700;
                    span{
                        color: #909399;
                        margin-right: 10px;
                        display:inline-block;
                        width:60px;
                        text-align:right;
                    }
                }
            }
        }
        .second_bottom{
            border: 1px solid #e4e8eb;
            overflow: hidden;
            
            div{
                float: left;
                width:25%;
                border-right: 1px solid #e4e8eb;
                padding:20px;
                p{
                    text-align: center
                }
                p:nth-child(1){
                    font-size:30px;
                    font-weight: 700
                }
                p:nth-child(2){
                    text-indent: 10px;
                }
            }
        }
    }

</style>