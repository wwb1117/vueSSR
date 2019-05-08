<template>
        <div class='secondCards'>
            <div class="model_topcol">
                <span>会员资料 - 会员详情 - 次卡对账明细</span>
            </div>
            <div class="model_content">
                <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
                    <div class="header_seach_wrap" style="padding: 15px">
						<el-date-picker
							@change='datePickerChangeEvent'
                            size="small"
                            v-model="timer"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                        <el-button type="primary" size="small" @click='search()'>搜索</el-button>
                        <el-button class='wid90' size="small" style="float:right;">导出</el-button>
                    </div>
                    <el-table
                        :data="tableData"
                        height = 'calc(100% - 140px)'
						ref="purchaseListTable"
						row-key="id"
                        >
                        <el-table-column
                            prop="countCardName"
                            label="次卡名称"
                            >
                        </el-table-column>
                        <el-table-column
                            label="购买时间"
                            >
                            <template slot-scope="scope">
                                <div>
                                    <p v-if='scope.row.created'>{{scope.row.created | time_s}}</p>
                                    <p v-else>-</p>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="guiderName"
                            label="导购员"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="totalNumber"
                            label="总次数"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="usedNumber"
                            label="剩余次数"
                            >
                        </el-table-column>
                        <el-table-column
                            label="操作时间"
                            >
                        </el-table-column>
                        <el-table-column
                            label="操作门店"
                            >
                        </el-table-column>
                        <el-table-column
                            label="变动次数"
                            >
                        </el-table-column>
                        <el-table-column
                            label="备注"
                            >
                        </el-table-column>
                        <el-table-column
							label="次卡明细"
							type='expand'
							width='50px'
                            >
                            <template slot-scope="scope">
                                <el-table :data="scope.row.details" class='inline-table'>
                                    <el-table-column></el-table-column>
                                    <el-table-column></el-table-column>
                                    <el-table-column></el-table-column>
                                    <el-table-column></el-table-column>
                                    <el-table-column></el-table-column>
									<el-table-column prop="created">
										<template slot-scope="scope">
											<div>
												<span v-if='scope.row.created'>{{scope.row.created | time_s}}</span>
												<span v-else>-</span>
											</div>
										</template>
									</el-table-column>
									<el-table-column prop="shopName"></el-table-column>
									<el-table-column prop="changeNumber"></el-table-column>
									<el-table-column prop="remark"></el-table-column>
									<el-table-column width='50px'></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class='bottom-card'>
                        <p>
                            <span class='first-span'>会员卡号<span>{{table.cardNumber}}</span></span>
                            <span class='first-span'>会员等级<span>{{table.levelName}}</span></span>
                            <span class='first-span'>开卡日期<span>{{table.createCardDate | time_s}}</span></span>
                            <span class='first-span'>余额<span>{{table.cardBalance}}</span></span>
                            <span class='first-span'>次卡张数<span style="font-weight:800;color:#F56C6C">{{table.countCardNumber}}</span></span>
                        </p>
                        <p>
                            <span class='first-span'>会员姓名<span>{{table.customerName}}</span></span>
                            <span class='first-span'>会员电话<span>{{table.cellPhone}}</span></span>
                            <span class='first-span'>会员生日<span>{{table.birthDate | time_s}}</span></span>
                            <span class='first-span'>积分<span>{{table.cardIntegral}}</span></span>
                            <span class='first-span'>消费次数<span style="font-weight:800;color:#F56C6C">5</span></span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="model_footer">
                <el-button class='wid90' style="margin-left:20px;" size="small" @click='goBack'>返回</el-button>
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
                    totalPage: 0,
                    tableMember: {
                        memberId:this.$route.query.id,
						startTime : '',
						endTime : '',
                        pageNo: 1,
                        pageSize: 15
					},
					timer:[],
					table:[],
                    mallList: []
                }
            },
            computed: {},
            methods: {
				datePickerChangeEvent(val){
					if (val) {
						this.tableMember.startTime = Math.round(val[0] / 1000)
						this.tableMember.endTime = Math.round(val[1] / 1000)
					} else{
						this.tableMember.startTime = ''
						this.tableMember.endTime = ''
					}
					this.getList()
				},
				search(){
					this.tableMember.pageNo = 1
					this.tableMember.startTime = this.timer[0] / 1000
					this.tableMember.endTime = this.timer[1] / 1000
					this.getList()
				},
				getList(){
					api.MemberDetailCountcard(this.tableMember).then((res)=>{
						this.tableData = res.data.listData
						this.totalPage = res.data.totalCount
					})
				},
                propEvent(){

                },
                goBack(){
                    this.$router.push({
                        path: '/memberDetail'
                    })
                },
				handleSizeChange(val){
					this.tableMember.pageNo = val
                    this.getList()
				},
				handleCurrentChange(val){
					this.tableMember.pageNo = val
                    this.getList()
				},
            },
            created() {},
            activated() {
				this.timer = []
				this.table = this.$route.query.table
				this.getList()
            },
            mounted() {}
        }
    </script>
    <style lang='scss'>
        .secondCards td.el-table__expanded-cell{
            padding:0
        }
        .secondCards .inline-table{
            .has-gutter{
                display: none
            }
            td{
                border:none;
            }
        }
        .secondCards .el-table::before{
            height:0
        }
    </style>
    <style scoped lang='scss'>
        .demo-table-expand {
            font-size: 0;
        }
        .demo-table-expand label {
            width: 90px;
            color: #99a9bf;
        }
        .demo-table-expand .el-form-item {
            margin-right: 0;
            margin-bottom: 0;
            width: 10%;
        }
        .header_seach_wrap>div {
            margin-right: 10px;
        }
        .bottom-card {
            padding:10px 10px 17px 10px;
            background:#F8F8F8;
            p{
                .first-span{
                    display: inline-block;
                    width: 20%;
                    color: #909399;
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