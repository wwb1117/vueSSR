<template>
    <div>
        <div class="model_topcol">
            <span>导购技师绩效</span>
            <div>
                <el-button class="wid90" type="primary" size="small">导出</el-button>
            </div>
        </div>
        <div class="model_content  formSpecial">
            <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
                <div class="header_seach_wrap header_seach_wrap1" style="padding: 15px">
                    <el-select filterable v-model="tableParam.mallId" size="small" placeholder="妈妈去哪儿总部" style="width:150px;">
                        <el-option v-for="item in mallList" :key="item.id" :label="item.mallName" :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select filterable v-model="tableParam.mallId" size="small" placeholder="全部导购员" style="width:150px;">
                        <el-option v-for="item in mallList" :key="item.id" :label="item.mallName" :value="item.id">
                        </el-option>
                    </el-select>
                    <!-- <el-select filterable v-model="tableParam.mallId" size="small" placeholder="全部分类" style="width:150px;">
                        <el-option v-for="item in mallList" :key="item.id" :label="item.mallName" :value="item.id">
                        </el-option>
                    </el-select> -->
                    <el-date-picker size="small" v-model="tableParam.purchaseDate" value-format="timestamp" type="daterange" :editable="false" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间">
                    </el-date-picker>
                    <el-button type="primary" size="small">搜索</el-button>
                </div>
                <!--  :height="$store.state.home.modelContentHeight - 85"  这边先不给表格高度，给了总计会在最下方-->
                <el-table :data="tableData" ref="purchaseListTable" style="width: 100%" show-summary :summary-method="getSummaries" class="formTotal">
                    <el-table-column label="" header-align="center">
                        <el-table-column prop="purchaseOrderNo1" label="排名">
                        </el-table-column>
                        <el-table-column prop="purchaseOrderNo2" label="工号">
                        </el-table-column>
                        <el-table-column prop="purchaseOrderNo3" label="导购员">
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="商品提成" header-align="center">
                        <el-table-column prop="purchaseOrderNo4" label="数量">
                        </el-table-column>
                        <el-table-column prop="purchaseOrderNo5" label="实收">
                        </el-table-column>
                        <el-table-column prop="purchaseOrderNo6" label="提成">
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="服务销售提成" header-align="center">
                        <el-table-column prop="purchaseOrderNo7" label="数量">
                        </el-table-column>
                        <el-table-column prop="purchaseOrderNo8" label="实收">
                        </el-table-column>
                        <el-table-column prop="purchaseOrderNo9" label="提成">
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="次卡提成" header-align="center">
                        <el-table-column prop="purchaseOrderNo10" label="数量">
                        </el-table-column>
                        <el-table-column prop="purchaseOrderNo11" label="实收">
                        </el-table-column>
                        <el-table-column prop="purchaseOrderNo12" label="提成">
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="余额充值提成" header-align="center">
                        <el-table-column prop="purchaseOrderNo13" label="数量">
                        </el-table-column>
                        <el-table-column prop="purchaseOrderNo14" label="实收">
                        </el-table-column>
                        <el-table-column prop="purchaseOrderNo15" label="提成">
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="购物卡提成" header-align="center">
                        <el-table-column prop="purchaseOrderNo16" label="数量">
                        </el-table-column>
                        <el-table-column prop="purchaseOrderNo17" label="实收">
                        </el-table-column>
                        <el-table-column prop="purchaseOrderNo18" label="提成">
                        </el-table-column>
                    </el-table-column>
                    <el-table-column prop="purchaseOrderNo" label="总实收">
                    </el-table-column>
                    <el-table-column prop="purchaseOrderNo" label="总提成">
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="model_footer">
            <!-- <el-pagination :current-page="tableParam.pageNo" :page-sizes="[15, 30, 50, 100]" :page-size="tableParam.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalPage">
            </el-pagination> -->
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
                    purchaseOrderNo1: '1',
                    purchaseOrderNo2: 1002,
                    purchaseOrderNo3: '张三',
                    purchaseOrderNo4: '120.00',
                    purchaseOrderNo5: '120.00',
                    purchaseOrderNo6: '1',
                    purchaseOrderNo7: '120.00',
                    purchaseOrderNo8: '120.00',
                    purchaseOrderNo9: '1',
                    purchaseOrderNo10: '120.00',
                    purchaseOrderNo11: '120.00',
                    purchaseOrderNo12: '1',
                    purchaseOrderNo13: '120.00',
                    purchaseOrderNo14: '120.00',
                    purchaseOrderNo15: '1',
                    purchaseOrderNo16: '120.00',
                    purchaseOrderNo17: '120.00',
                    purchaseOrderNo18: '1'
                },
                {
                    purchaseOrderNo: '冰淇淋',
                    purchaseOrderNo1: '2',
                    purchaseOrderNo2: 1002,
                    purchaseOrderNo3: '张三',
                    purchaseOrderNo4: '120.00',
                    purchaseOrderNo5: '120.00',
                    purchaseOrderNo6: '1',
                    purchaseOrderNo7: '120.00',
                    purchaseOrderNo8: '120.00',
                    purchaseOrderNo9: '1',
                    purchaseOrderNo10: '120.00',
                    purchaseOrderNo11: '120.00',
                    purchaseOrderNo12: '1',
                    purchaseOrderNo13: '120.00',
                    purchaseOrderNo14: '120.00',
                    purchaseOrderNo15: '1',
                    purchaseOrderNo16: '120.00',
                    purchaseOrderNo17: '120.00',
                    purchaseOrderNo18: '1'
                }
            ],
            mallList: [],
            // totalPage: 10,
            tableParam: {
                searchWord: '',
                purchaseDate: '',
                mallId: ''
                // pageNo: 1,
                // pageSize: 15
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
                    sums[index] = '总计';
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
/* .header_seach_wrap1 {
    border-bottom: 1px solid #e4e7ed;
} */
</style>