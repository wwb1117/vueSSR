<template>
    <div>
        <div class="model_topcol">
            <span>收银员业绩</span>
            <div>
                <el-button class="wid90" type="primary" size="small">导出</el-button>
            </div>
        </div>
        <div class="model_content">
            <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
                <div class="header_seach_wrap header_seach_wrap1" style="padding: 15px">
                    <el-select filterable v-model="tableParam.mallId" size="small" placeholder="妈妈去哪儿总部" style="width:150px;">
                        <el-option v-for="item in mallList" :key="item.id" :label="item.mallName" :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select filterable v-model="tableParam.mallId" size="small" placeholder="全部收银员" style="width:150px;">
                        <el-option v-for="item in mallList" :key="item.id" :label="item.mallName" :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select filterable v-model="tableParam.mallId" size="small" placeholder="全部分类" style="width:150px;">
                        <el-option v-for="item in mallList" :key="item.id" :label="item.mallName" :value="item.id">
                        </el-option>
                    </el-select>
                    <el-date-picker size="small" v-model="tableParam.purchaseDate" value-format="timestamp" type="daterange" :editable="false" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间">
                    </el-date-picker>
                    <el-button type="primary" size="small">搜索</el-button>
                </div>
                <el-table :data="tableData" :height="$store.state.home.modelContentHeight - 86" ref="purchaseListTable" style="width: 100%">
                    <el-table-column prop="purchaseOrderNo" label="所属门店">
                    </el-table-column>
                    <el-table-column prop="purchaseOrderNo" label="日期">
                    </el-table-column>
                    <el-table-column prop="purchaseOrderNo" label="收银员">
                    </el-table-column>
                    <el-table-column prop="purchaseOrderNo" label="商品名称">
                    </el-table-column>
                    <el-table-column prop="purchaseOrderNo" label="销售额">
                    </el-table-column>
                    <el-table-column prop="purchaseOrderNo" label="数量">
                    </el-table-column>
                    <el-table-column prop="purchaseOrderNo" label="总价">
                    </el-table-column>
                    <el-table-column prop="purchaseOrderNo" label="实收">
                    </el-table-column>
                    <el-table-column prop="purchaseOrderNo" label="利润">
                    </el-table-column>
                    <el-table-column prop="purchaseOrderNo" label="类型">
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="model_footer">
            <div class="footer_tatal">
                <span>共有记录：<span class="color_red">4</span></span>
                <span>总应收：<span class="color_red">290</span></span>
                <span>总实收：<span class="color_red">200</span></span>
                <span>总数量：<span class="color_red">3</span></span>
                <span>总利润：<span class="color_red">40.00</span></span>
            </div>
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
                    purchaseOrderNo: '冰淇淋'
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
    mounted () { }
}
</script>
<style scoped>
.header_seach_wrap > div {
    margin-right: 10px;
}
.header_seach_wrap1 {
    border-bottom: 1px solid #e4e7ed;
}
.footer_tatal {
    float: left;
    line-height: 50px;
    font-size: 14px;
    font-weight: 400;
    color: #616266;
    margin-left: 50px;
}
.footer_tatal > span {
    margin-right: 10px;
}
</style>