<template>
    <div>
        <div class="model_topcol">
            <span>会员充值</span>
        </div>
        <div class="model_content">
            <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
                <div class="header_seach_wrap header_seach_wrap1" style="padding: 15px">
                    <el-select filterable v-model="tableParam.mallId" size="small" placeholder="妈妈去哪儿总部">
                        <el-option v-for="item in mallList" :key="item.id" :label="item.mallName" :value="item.id">
                        </el-option>
                    </el-select>
                    <el-date-picker size="small" v-model="tableParam.purchaseDate" value-format="timestamp" type="daterange" :editable="false" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间">
                    </el-date-picker>
                    <el-input style="width: 294px" size="small" v-model="tableParam.searchWord" placeholder="会员号/手机/会员名称" prefix-icon="el-icon-search" clearable></el-input>
                    <el-button type="primary" size="small">搜索</el-button>
                </div>
                <div class="header_seach_wrap header_seach_wrap2" style="padding: 15px">
                    <div>
                        <span>
                            <m>￥</m>1200.00
                        </span>
                        <span>总充值金额</span>
                    </div>
                    <div>
                        <span>
                            <m>￥</m>10000.00
                        </span>
                        <span>总支付金额</span>
                    </div>
                    <div>
                        <span>
                            <m>￥</m>80.00
                        </span>
                        <span>总赠送金额</span>
                    </div>
                </div>
                <!--  :height="$store.state.home.modelContentHeight - 85"  这边先不给表格高度，给了总计会在最下方-->
                <el-table :data="tableData" ref="purchaseListTable" @selection-change="handleSelectionChange" style="width: 100%" show-summary :summary-method="getSummaries" class="formTotal">
                    <el-table-column label="序号" type="index">
                    </el-table-column>
                    <el-table-column prop="purchaseOrderNo" label="日期">
                    </el-table-column>
                    <el-table-column prop="purchaseOrderNo" label="会员名">
                    </el-table-column>
                    <el-table-column prop="purchaseOrderNo" label="会员号">
                    </el-table-column>
                    <el-table-column prop="purchaseOrderNo" label="手机号">
                    </el-table-column>
                    <el-table-column prop="purchaseOrderNo" label="充值类型">
                    </el-table-column>
                    <el-table-column prop="purchaseOrderNo1" label="充值金额">
                    </el-table-column>
                    <el-table-column prop="purchaseOrderNo1" label="支付金额">
                    </el-table-column>
                    <el-table-column prop="purchaseOrderNo1" label="赠送余额">
                    </el-table-column>
                    <el-table-column prop="purchaseOrderNo" label="操作员">
                    </el-table-column>
                    <el-table-column prop="purchaseOrderNo" label="导购员">
                    </el-table-column>
                    <el-table-column prop="purchaseOrderNo" label="发生店铺">
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="model_footer">
            <el-pagination :current-page="tableParam.pageNo" :page-sizes="[15, 30, 50, 100]" :page-size="tableParam.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalPage">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            tableData: [
                {
                    purchaseOrderNo: '冰淇淋',
                    purchaseOrderNo1: '1'
                },
                {
                    purchaseOrderNo: '冰淇淋',
                    purchaseOrderNo1: '2'
                }
            ],
            mallList: [],
            totalPage: 10,
            tableParam: {
                searchWord: '',
                purchaseDate: '',
                mallId: '',
                pageNo: 1,
                pageSize: 15
            }
        }
    },
    computed: {},
    created () { },
    activated () {

    },
    mounted () { },
    methods: {
        getSummaries (param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '小计';
                    return;
                }
                if (index === 1) {
                    sums[index] = '-';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                } else {
                    sums[index] = '-';
                }
            });
            return sums;
        }
    }
}
</script>
<style scoped>
.header_seach_wrap > div {
    margin-right: 10px;
}
.header_seach_wrap1 {
    /* white-space: nowrap; */
    /* overflow: hidden;  */
    border-bottom: 1px solid #e4e7ed;
}
.header_seach_wrap2 > div {
    width: 360px;
    height: 88px;
    border-radius: 4px;
    margin-right: 20px;
    display: inline-block;
}
.header_seach_wrap2 > div:nth-of-type(1) {
    background: #64c42d;
}
.header_seach_wrap2 > div:nth-of-type(2) {
    background: #399cff;
}
.header_seach_wrap2 > div:nth-of-type(3) {
    background: #f56c6c;
}
.header_seach_wrap2 > div > span {
    text-align: center;
    display: block;
    color: #fff;
}
.header_seach_wrap2 m {
    font-size: 28px;
}
.header_seach_wrap2 > div > span:nth-of-type(1) {
    font-size: 32px;
    font-weight: bold;
    margin-top: 6px;
    /* height: 26px; */
}
.header_seach_wrap2 > div > span:nth-of-type(2) {
    font-size: 18px;
    font-weight: 400;
    /* height: 18px; */
}
</style>