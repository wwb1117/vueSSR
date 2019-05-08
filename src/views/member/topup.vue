<template>
    <div>
        <div class="model_topcol">
            <span>充值规则</span>
            <div>
                <el-button v-perss='153' type="primary" size="small" @click='addTopup()'>新增充值规则</el-button>
            </div>
        </div>
        <div class="model_content">
            <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
                <div class="header_seach_wrap" style="padding: 15px">
                    <el-select filterable clearable @change="search" v-model="tableMember.shopId" size="small" placeholder="全部门店">
                        <el-option v-for="item in mallList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <el-table
                    :data="tableData"
                    :span-method="objectSpanMethod"
                    height = 'calc(100% - 62px)'
                    style="width: 100%;overflow-y: auto"
                    ref="purchaseListTable"
                    >
                    <!-- <el-table-column
                        type="selection"
                        :reserve-selection="true"
                        width="55">
                    </el-table-column> -->
                    <el-table-column
                        prop="shopName"
                        label="创建门店"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="purchaseOrderNo"
                        label="使用门店"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="customerLevelName"
                        label="适用会员"
                        >
                    </el-table-column>
                    <el-table-column
                        label="生效日期"
                        >
                        <template slot-scope="scope">
                            <div>
                                <span v-if='scope.row.startTime'>{{scope.row.startTime | time_s}}</span>
                                <span v-else>-</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="截至日期"
                        >
                        <template slot-scope="scope">
                            <div>
                                <span v-if='scope.row.endTime'>{{scope.row.endTime | time_s}}</span>
                                <span v-else>-</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="充值类型"
                        >
                        <template slot-scope="scope">
                            <div>
                                <span v-if='scope.row.rechargeArea == 1'>全场类</span>
                                <span v-if='scope.row.rechargeArea == 2'>服务类</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="rechargeCost"
                        label="充值(元)"
                        >
                    </el-table-column>
                    <el-table-column
                        label="赠送项目"
                        >
                        <template slot-scope="scope">
                            <div>
                                <span v-if='scope.row.givingType == 1'>余额充值</span>
                                <span v-if='scope.row.givingType == 2'>积分充值</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="givingAmount"
                        label="赠送数值"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="purchaseOrderNo"
                        width="150"
                        label="操作">
                         <template slot-scope="scope">
                            <div v-if="scope">
								<el-button
									v-perss='154'
                                    @click="propEvent(1, scope.row.id, scope.$index, tableData)"
                                    type="text"
                                    size="small">
                                    删除
                                </el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="model_footer">
            <el-pagination 
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="tableMember.pageNo"
                :page-sizes="[15, 30, 50, 100]"
                :page-size="tableMember.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalPage">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import api from 'api/member'
    export default {
        data() {
            return {
                tableData: [],
                mallList: this.$store.state.home.shopList,
                totalPage: 0,
                tableMember: {
                    searchWord: '',
                    purchaseDate: '',
                    shopId: '',
                    pageNo: 1,
                    pageSize: 15
                }
            }
        },
        computed: {},
        methods: {
			search(){
				this.tableMember.pageNo = 1
				this.getList()
			},
            getList(){
                api.ruleList(this.tableMember).then((res)=>{
                    console.log(res)
                    this.tableData = res.data.listData
                    this.totalPage = res.data.totalCount
                })
            },
            addTopup(){
                this.$router.push({
                    path: 'newTopup'
                })
            },
            propEvent(type, id, index, rows){
                if (type == 1) {
                    console.log(type, id, index, rows)
                    this.$confirm('你确定要删除吗?', '删除确认', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        api.deleteRule(id).then((res)=>{
                            rows.splice(index, 1);
                            this.$message({
                                showClose: true,
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getList()
                        })
                    }).catch(() => {
                        this.$message({
                            showClose: true,
                            type: 'info',
                            message: '已取消操作'
                        });          
                    });
                }
            },
            objectSpanMethod({ row, column, rowIndex, columnIndex }){
                // console.log(row, column, rowIndex, columnIndex)
                // if (columnIndex === 0) {
                //     if (rowIndex % 2 === 0) {
                //         return {
                //         rowspan: 2,
                //         colspan: 1
                //         };
                //     } else {
                //         return {
                //         rowspan: 0,
                //         colspan: 0
                //         };
                //     }
                // }
            },
            handleCurrentChange(val){
                console.log(val)
                this.tableMember.pageNo = val
                this.getList()
            },
            handleSizeChange(val){
                //选择每页数据
                this.tableMember.pageSize = val
                this.getList()
            }
        },
        created() {},
        activated() {
            this.getList()
        },
        mounted() {}
    }
</script>
<style scoped>
    .header_seach_wrap>div {
        margin-right: 10px;
    }
</style>