<template>
    <div>
        <div class="model_topcol">
            <span>次卡</span>
            <div>
                <el-button v-perss='156' class="wid90" type="primary" size="small" @click='addSecond()'>新增次卡</el-button>
            </div>
        </div>
        <div class="model_content">
            <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
                <div class="header_seach_wrap" style="padding: 15px">
                    <el-select filterable clearable @change="searInputEvent" v-model="tableMember.shopId" size="small" placeholder="全部门店">
                        <el-option v-for="item in mallList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                    <el-input style="width: 294px"  @change="searInputEvent" size="small" v-model="tableMember.cardName" clearable prefix-icon="el-icon-search" placeholder="请输入次卡名称"></el-input>
                    <el-button type="primary" size="small" @click='searInputEvent'>搜索</el-button>
                </div>
                <el-table
                    :data="tableData"
                    height = 'calc(100% - 62px)'
                    ref="purchaseListTable"
                    style="width: 100%;overflow-y: auto">
                    <!-- <el-table-column
                        type="selection"
                        :reserve-selection="true"
                        width="55">
                    </el-table-column> -->
                    <el-table-column
                        prop="shopName"
                        label="门店"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="cardName"
                        label="次卡名称"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="itemName"
                        label="消费商品"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="soldNumber"
                        label="可用次数"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="sellingPrice"
                        label="销售价格"
                        >
                    </el-table-column>
                    <el-table-column
                        width='270'
                        label="有效时间"
                        >
                        <template slot-scope="scope">
                            <div>
                                <span v-if='scope.row.startTime'>{{scope.row.startTime | time_s}} ~ {{scope.row.endTime | time_s}}</span>
                                <span v-else>-</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="dailyLimit"
                        label="使用限制"
                        >
                    </el-table-column>
                    <el-table-column
                        label="限制次数"
                        >
                        <template slot-scope="scope">
                            <span v-if='scope.row.dailyLimit == 0'>不限制</span>
                            <span v-if='scope.row.dailyLimit == 1'>每日限制次数</span>
                            <span v-if='scope.row.dailyLimit == 2'>每周限制次数</span>
                            <span v-if='scope.row.dailyLimit == 3'>每月限制次数</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="已销售数量"
                        >
                        <template slot-scope="scope">
                            <div>
                                <el-button type="text" size='small' @click='checkNums(scope.row.id)'>{{scope.row.soldNumber }}</el-button>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="purchaseOrderNo"
                        label="状态"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="purchaseOrderNo"
                        width="150"
                        label="操作">
                         <template slot-scope="scope">
                            <div v-if="scope">
								<el-button
									v-perss='157'
                                    @click="propEvent(0, scope.row.id)"
                                    type="text"
                                    size="small">
                                    编辑
                                </el-button>
								<el-button
									v-perss='158'
									v-if='scope.row.deleted == false'
                                    @click="propEvent(1, scope.row.id)"
                                    type="text"
                                    size="small">
                                    禁用
								</el-button>
								<el-button
									v-if='scope.row.deleted == true'
                                    @click="propEvent(2, scope.row.id)"
                                    type="text"
                                    size="small">
                                    启用
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
        <el-dialog
            title="销售明细"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            width="55%"
            >
            <div class="dialog_top">
                <el-date-picker
                    clearable 
                    @change="searInputEvent1"
                    style="margin-top:-10px"
                    size='small'
                    v-model="timer"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
                <el-input style="width: 294px" size="small" clearable v-model="tableMember1.customerPhone" placeholder="请输入会员手机号"></el-input>
                <el-button style="margin-right: 20px;" type="primary" size="small"  @click='searInputEvent1'>搜索</el-button>
            </div>
            <el-table
                :data="saleList"
                border
                :height="405"
                ref="purchaseListTable"
                style="width: 100%">
                <el-table-column
                    label="出售日期"
                    >
                    <template slot-scope="scope">
                        <div>
                            <span v-if='scope.row.created'>{{scope.row.created | time_s}}</span>
                            <span v-else>-</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="guiderName"
                    label="导购员"
                    >
                </el-table-column>
                <el-table-column
                    prop="shopName"
                    label="操作门店"
                    >
                </el-table-column>
                <el-table-column
                    prop="customerPhone"
                    label="购买会员(手机号)"
                    >
                </el-table-column>
                <el-table-column
                    prop="totalNumber"
                    label="可用次数"
                    >
                </el-table-column>
                <el-table-column
                    prop="usedNumber"
                    label="已用次数"
                    >
                </el-table-column>
                <el-table-column
                    prop="surplusNumber"
                    label="剩余次数"
                    >
                </el-table-column>
            </el-table>
            <span  class="dialog-footer">
                <el-pagination
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentChange1"
                    :current-page="tableMember1.pageNo"
                    :page-sizes="[15, 30, 50, 100]"
                    :page-size="15"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalPage1">
                </el-pagination>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import api from 'api/member'

    export default {
        data() {
            return {
                dialogVisible:false,
                tableData: [],
                saleList:[],
                mallList: this.$store.state.home.shopList,
                totalPage: 0,
                tableMember: {
                    shopId:'',
                    cardName:'',
                    pageNo: 1,
                    pageSize: 15
                },
                //弹框翻页
                countCardId:'',
                totalPage1: 0,
                timer:[],
                tableMember1:{
                    memberMobile:'',
                    startTime:'',
                    endTime:'',
                    pageNo: 1,
                    pageSize: 15
                }
            }
        },
        computed: {},
        methods: {
            searInputEvent(){
                this.tableMember.pageNo = 1
                this.getList()
            },
            searInputEvent1(){
                this.tableMember1.pageNo = 1
                this.tableMember1.startTime = this.timer[0] / 1000
                this.tableMember1.endTime = this.timer[1] / 1000
                // this.checkNums(this.tableMember1)
            },
            getList(){
                api.countCardList(this.tableMember).then((res)=>{
                    this.tableData = res.data.listData
                    this.totalPage = res.data.totalCount
                })
            },
            checkNums(id){
                this.countCardId = id
                let obj = {
                    countCardId:id,
                    startTime:'',
                    endTime:'',
                    memberMobile:''
                }
                api.countCardSaleList(obj).then((res)=>{
                    this.saleList = res.data.listData
                    this.totalPage1 = res.data.totalCount
                })
                this.dialogVisible = true
            },
            addSecond(){
                this.$router.push({
                    path: 'newSecond'
                })
            },
            propEvent(type, id){
                if (type == 1) { //禁用
                    this.$confirm('你确定要禁用吗?', '禁用确认', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
						api.disableCountCard(id).then((res)=>{
							this.$message({
								showClose: true,
								type: 'success',
								message: '禁用成功!'
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
				if (type == 2) { //启用
                    this.$confirm('你确定启用吗?', '启用确认', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
						api.enableCountCard(id).then((res)=>{
							this.$message({
								showClose: true,
								type: 'success',
								message: '启用成功!'
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
                if (type == 0) { //编辑
                    this.$router.push({
						path: '/newSecond',
						query:{
							id : id
						}
                    })
                }
            },
            handleCurrentChange(val){
                this.tableMember.pageNo = val
                this.getList()
            },
            handleSizeChange(val){
                //选择每页数据
                this.tableMember.pageSize = val
                this.getList()
            },
            handleCurrentChange1(val){
                this.tableMember1.pageNo = val
                this.checkNums()
            },
            handleSizeChange1(val){
                //选择每页数据
                this.tableMember1.pageSize = val
                this.checkNums()
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
    .dialog_top{
        margin-top: -15px; 
        margin-bottom: 15px;
    }
    .dialog_top>div{
        margin-right: 10px;
    }
    .dialog-footer{
        padding: 0 20px;
        height:65px;
        margin-top:-25px;
    }
</style>