<template>
    <div>
        <div class="model_topcol">
            <span>实时报表</span>
        </div>
        <div class="model_content">
            <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
                <div class="header_seach_wrap header_seach_wrap1" style="padding: 15px">
                    <el-select filterable v-model="tableParam.mallId" size="small" placeholder="妈妈去哪儿总部">
                        <el-option v-for="item in mallList" :key="item.id" :label="item.mallName" :value="item.id">
                        </el-option>
                    </el-select>
                    <el-button type="primary" size="small">搜索</el-button>
                </div>
                <div class="header_seach_wrap header_seach_wrap2" style="padding: 15px">
                    <div>
                        <span>
                            <m>￥</m>1200.00
                        </span>
                        <span>销售额</span>
                    </div>
                    <div>
                        <span>
                            <m>￥</m>10000.00
                        </span>
                        <span>会员充值金额</span>
                    </div>
                    <div>
                        <span>
                            <m>￥</m>80.00
                        </span>
                        <span>销售利润</span>
                    </div>
                </div>
                <el-table :data="tableData" :height="$store.state.home.modelContentHeight - 203" ref="purchaseListTable" @selection-change="handleSelectionChange" style="width: 100%">
                    <el-table-column prop="purchaseOrderNo" label="序号">
                    </el-table-column>
                    <el-table-column prop="purchaseOrderNo" label="店铺">
                    </el-table-column>
                    <el-table-column prop="purchaseOrderNo" label="来源">
                    </el-table-column>
                    <el-table-column prop="purchaseOrderNo" label="商品销售(元)">
                    </el-table-column>
                    <el-table-column prop="purchaseOrderNo" label="会员充值(元)">
                    </el-table-column>
                    <el-table-column prop="purchaseOrderNo" label="小计(元)">
                    </el-table-column>
                    <el-table-column prop="purchaseOrderNo" label="利润(元)">
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

import api from 'api/reportForm'

export default {

    data () {
        return {
            tableData: [],
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
    methods: {
        getList () {
            api.todayAchievement(this.tableParam).then((res) => {
                console.log(res)
                this.tableData = res.data.listData
            })
        },
        clearAll () {

        },
        goSecondCard () {
            this.$router.push({
                path: '/secondCardList'
            })
        },
        goLead () {
            this.$router.push({
                path: '/leadTable'
            })
        },
        showBaby () {
            this.dialogVisible = true
        },
        addMember () {
            this.$router.push({
                path: '/newMember'
            })
        },
        propEvent (type) {
            if (type == 1) { //作废
                this.$confirm('你确定要作废该单据吗?', '作废确认', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        showClose: true,
                        type: 'success',
                        message: '作废成功!'
                    });
                }).catch(() => {
                    this.$message({
                        showClose: true,
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            }
            if (type == 2) { // 操作
                this.$router.push({
                    path: '/memberDetail'
                })
            }
        },
        handleSelectionChange () {

        }
    },
    created () { },
    activated () {
        this.getList()
    },
    mounted () { }
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