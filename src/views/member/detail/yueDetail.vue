<template>
    <div>
        <div class="model_topcol">
            <span>会员资料 - 会员详情 - 余额对账明细</span>
        </div>
        <div class="model_content">
            <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
                <div class="header_seach_wrap" style="padding: 15px">
                    <el-select filterable v-model="tableMember.mallId" size="small" placeholder="通用余额对账">
                        <el-option v-for="item in mallList" :key="item.id" :label="item.mallName" :value="item.id">
                        </el-option>
                    </el-select>
                    <el-date-picker
                        size="small"
                        v-model="timer"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                    <el-button type="primary" size="small">搜索</el-button>
                    <el-button class='wid90' size="small" style="float:right;">导出</el-button>
                </div>
                <el-table
                    :data="tableData"
                    height = 'calc(100% - 140px)'
                    ref="purchaseListTable"
                    style="width: 100%;overflow-y: auto">
                    <!-- <el-table-column
                        type="selection"
                        :reserve-selection="true"
                        width="55">
                    </el-table-column> -->
                    <el-table-column
                        label="操作时间"
                        >
                        <template slot-scope="scope">
                            <div>
                                <span v-if='scope.row.purchaseOrderNo'>{{scope.row.purchaseOrderNo | time_s}}</span>
                                <span v-else>-</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="purchaseOrderNo"
                        label="操作门店"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="purchaseOrderNo"
                        label="操作类型"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="purchaseOrderNo"
                        label="变动金额"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="purchaseOrderNo"
                        label="变动后金额"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="purchaseOrderNo"
                        label="备注"
                        >
                    </el-table-column>
                </el-table>
                <div class='bottom-card'>
                    <p>
                        <span>会员卡号<span>{{number}}</span></span>
                        <span>会员等级<span>{{number}}</span></span>
                        <span>开卡日期<span>{{number}}</span></span>
                        <span>余额<span>{{number}}</span></span>
                        <span>余额充值<span style="font-weight:800;color:#F56C6C">{{number}}</span></span>
                    </p>
                    <p>
                        <span>会员姓名<span>{{number}}</span></span>
                        <span>会员电话<span>{{number}}</span></span>
                        <span>会员生日<span>{{number}}</span></span>
                        <span>积分<span>{{number}}</span></span>
                        <span>余额消费<span style="font-weight:800;color:#F56C6C">{{number}}</span></span>
                    </p>
                </div>
            </div>
        </div>
        <div class="model_footer">
            <el-button class='wid90' style="margin-left:20px;" size="small" @click='goBack'>返回</el-button>
            <el-pagination :current-page="tableMember.pageNo"
                :page-sizes="[15, 30, 50, 100]"
                :page-size="tableMember.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalPage">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [
                    {purchaseOrderNo: '123'},
                    {purchaseOrderNo: '345'},
                    {purchaseOrderNo: '345'},
                    {purchaseOrderNo: '345'},
                    {purchaseOrderNo: '234'}
                ],
                totalPage: 10,
                tableMember: {
                    mallId:'',
                    pageNo: 1,
                    pageSize: 15
                },
                timer:'',
                number:'1546464464',
                mallList: []
            }
        },
        computed: {},
        methods: {
            goBack(){
                this.$router.push({
                    path: '/memberDetail'
                })
            },
        },
        created() {},
        activated() {

        },
        mounted() {}
    }
</script>
<style scoped lang='scss'>
    .header_seach_wrap>div {
        margin-right: 10px;
    }
    .bottom-card {
        padding:10px 10px 17px 10px;
        background:#F8F8F8;
        p{
            span{
                display:inline-block;
                width:20%;
                color:#909399;
                    span{
                        color:#5f5f60;
                        margin-left:10px;
                    }
            }
            &:last-child{
                margin-bottom: 0
            }
        }
    }
</style>