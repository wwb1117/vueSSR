<template>
    <div>
        <div class="model_topcol">
            <span>导购技师</span>
            <div>
                <el-button class="wid90" type="primary" size="small" @click="addGuide()" v-perss='75'>新增导购</el-button>
                <el-button class="wid90" type="primary" size="small" @click="edittec()" v-perss='78'>提成设置</el-button>
            </div>
        </div>
        <div class="model_content">
            <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
                <div class="header_seach_wrap" style="padding: 15px">
                    <span style="margin-right: 10px">所属门店</span>
                    <el-select clearable filterable @change="search" v-model="tableParam.shopId" size="small" @clear="search" placeholder="妈妈去哪儿总部">
                        <el-option v-for="item in mallList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select clearable @change="search" filterable v-model="tableParam.enableStatus" size="small" placeholder="请选择状态" @clear="search">
                        <el-option :key="0" label="禁用" :value="0">
                        </el-option>
                        <el-option :key="1" label="启用" :value="1">
                        </el-option>
                    </el-select>
                    <el-input prefix-icon="el-icon-search" style="width: 294px" size="small" v-model="tableParam.keyWord" placeholder="请输入工号/手机号/姓名" clearable @clear="search"></el-input>
                    <el-button type="primary" size="small" @click="search">搜索</el-button>
                </div>
                <el-table
                        :data="tableData"
                        style="width: 100%;height: calc(100% - 62px)">
                    <el-table-column
                            prop="shopName"
                            label="所属门店"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="employeeCode"
                            label="工号"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="employeeName"
                            label="姓名"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="cellPhone"
                            label="手机号"
                    >
                    </el-table-column>

                    <el-table-column
                            label="状态"
                    >
                        <template slot-scope="scope">
                            <div>
                                {{['禁用', '启用'][scope.row.enableStatus]}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="创建日期"
                    >
                        <template slot-scope="scope">
                            <div>
                                {{scope.row.created | time}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="purchaseOrderNo"
                            width="150"
                            label="操作">
                        <template slot-scope="scope">
                            <div>
                                <el-button
                                        v-perss='76'
                                        type="text"
                                        @click="editGuide(scope.row)"
                                        size="small">
                                    编辑
                                </el-button>
                                <el-button
                                        v-perss='77'
                                        type="text"
                                        @click="transferSet(scope.row)"
                                        size="small">
                                    设置提成
                                </el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="model_footer">
            <el-pagination :current-page="tableParam.pageNo"
                           :page-sizes="[10]"
                           :page-size="tableParam.pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="totalPage">
            </el-pagination>
        </div>
        <!-- 提成设置弹框 -->
        <el-dialog
        title="提成规则设置"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        width="500px"
        label-position='right'
        >
        <el-form ref="form" :model="promoteRule" label-width="180px">
            <el-form-item label="提成计算法规则 ">
                <el-radio-group v-model="promoteRule.calcRule">
                    <el-radio :label="1" >按实际成交售价</el-radio>
                    <el-radio :label="0">按商品维护售价</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否扣除成本(商品)">
                <el-radio-group v-model="promoteRule.itemDeductCost">
                    <el-radio style="margin-right:45px" :label="1">扣除</el-radio>
                    <el-radio :label="0">不扣除</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否扣除成本(服务)">
                <el-radio-group v-model="promoteRule.serviceDeductCost">
                    <el-radio style="margin-right:45px" :label="1">扣除</el-radio>
                    <el-radio :label="0">不扣除</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button class="wid90" size="small" @click="dialogVisible = false">取消</el-button>
            <el-button class="wid90" size="small" type="primary" @click="savePromote">确定</el-button>
        </span>
    </el-dialog>
    </div>
</template>

<script>
    import api from 'api/mall'
    export default {
        data() {
            return {
                form: {
                    radio:'',
                    radio1:'',
                    resource: '',
                },
                dialogVisible:false,
                tableData: [{
                    purchaseOrderNo: 'wwbtest'
                }],
                mallList: [],
                totalPage: 10,
                tableParam: {
                    keyWord: '',
                    enableStatus: '',
                    shopId: '',
                    pageNo: 1,
                    pageSize: 10,
                    isGuide: 1
                },
                promoteRule: {
                    calcRule: 0,
                    itemDeductCost: 0,
                    serviceDeductCost: 0
                }
            }
        },
        computed: {},
        created() {},
        activated() {
            this.getTableList()
            this.getPromte()
            this.mallList = this.$store.state.home.shopList
        },
        methods: {
            // 编辑员工
            editGuide(data) {
                this.$router.push({
                    path: '/newGuide',
                    query: {
                        id: data.id
                    }
                })
            },
            addGuide() {
                this.$router.push({
                    path: '/newGuide'
                })
            },
            // 提成设置
            edittec(){
                this.dialogVisible = true
            },
            transferSet(data) {
                this.$router.push({
                    path: '/transfer',
                    query: {
                        id: data.id,
                        code: data.employeeCode,
                        name: data.employeeName
                    }
                })
            },
            getTableList() {
                api.getStaffList(this.tableParam).then((res) => {
                    this.tableData = res.data.listData
                    this.totalPage = res.data.totalCount
                })
            },
            getPromte() {
                api.getPromoteRule().then((res) => {
                    this.promoteRule.calcRule = res.data.calcRule
                    this.promoteRule.itemDeductCost = res.data.itemDeductCost
                    this.promoteRule.serviceDeductCost = res.data.serviceDeductCost
                })
            },
            search() {
                this.getTableList()
            },
            savePromote() {
                api.updatePromoteRule(this.promoteRule).then((res) => {
                    this.dialogVisible = false
                    this.$message.success({
                        message: '修改成功！'
                    })
                })
            }
        },
        mounted() {}
    }
</script>
<style scoped>
    .header_seach_wrap>div {
        margin-right: 10px;
    }
</style>