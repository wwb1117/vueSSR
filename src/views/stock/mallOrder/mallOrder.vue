<template>
	<div>
		<div class="model_topcol">
			<span> 门店订货</span>
		</div>
		<div class="model_content">
			<div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
				<div class="header_seach_wrap" style="padding: 15px">
					<el-select filterable clearable @change="searchInputClear" v-model="tableParam.shopId" size="small" placeholder="请选择门店">
						<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
					<el-select filterable clearable @change="searchInputClear" v-model="tableParam.orderStatus" size="small" placeholder="请选择状态">
						<el-option key="0" label="待审核" :value="0">
						</el-option>
						<el-option key="1" label="配货中" :value="1">
						</el-option>
						<el-option key="2" label="已配货" :value="2">
						</el-option>
						<el-option key="3" label="拒绝 " :value="3">
						</el-option>
						<el-option key="4" label="作废" :value="4">
						</el-option>
					</el-select>
					<el-select filterable clearable @change="searchInputClear" v-model="tableParam.timeType" size="small" placeholder="请选择时间类型">
						<el-option key="0" label="订货时间" :value="0">
						</el-option>
						<el-option key="1" label="发货时间" :value="1">
						</el-option>
					</el-select>
					<el-date-picker clearable @change="datePickerChangeEvent" v-model="timer" value-format="timestamp" type="daterange" :editable="false" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
					<el-input prefix-icon="el-icon-search" @change="datePickerChangeEvent" clearable style="width: 294px" size="small" v-model="tableParam.cargoFlowNo" placeholder="请输入订货单号"></el-input>
					<el-button type="primary" size="small" @click='searchInputClear'>搜索</el-button>
				</div>
				<div v-show="isTableChecked" class="title_tips_wrap">
                    <ul>
                        <li :style="{borderRight: '1px solid #E4E7ED', fontSize: '12px', color: '#757577'}">
                            <span :style="{fontSize: '18px', verticalAlign: 'middle', marginRight: '10px'}" class="el-icon-close myCur" @click="closeExportWrap"></span>
                            <span>已选择</span>
                            <span v-text="selectTableData.length"> 0 </span>
                            <span>项</span>
                        </li>
                        <li :style="{paddingLeft: '20px'}">
                            <el-button class="wid90" size="small" @click='checkDetailAll(selectTableData)'>批量审核</el-button>
                            <el-button class="wid90" size="small">汇总导出</el-button>
                        </li>
                    </ul>
                </div>
				<el-table
                    :data="tableData"
                    :height="tableHeight"
                    ref="mallOrderTable"
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
					<el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
					<el-table-column
                        prop="orderGoodsNo"
                        label="订货单号"
                        >
                    </el-table-column>
					<el-table-column
                        prop="orderTime"
                        label="订货时间"
                        >
                    </el-table-column>
					<el-table-column
                        label="期望发货时间"
						>
						<template slot-scope="scope">
							<span>{{scope.row.expectationTime | time_m}}</span>
						</template>
                    </el-table-column>
					<el-table-column
                        prop="orderUser"
                        label="订货员"
                        >
                    </el-table-column>
					<el-table-column
                        prop="inShopName"
                        label="订货门店"
                        >
                    </el-table-column>
					<el-table-column
                        prop="outShopName"
                        label="配货门店"
                        >
                    </el-table-column>
					<el-table-column
                        prop="totalMoney"
                        label="付款金额(元)"
                        >
                    </el-table-column>
					<el-table-column
                        prop="orderStatus"
                        label="状态"
                        >
						<template slot-scope="scope">
							<span v-if="scope.row.orderStatus == 0">待审核</span>
							<span v-if="scope.row.orderStatus == 1">配货中</span>
							<span v-if="scope.row.orderStatus == 2">已配货</span>
							<span v-if="scope.row.orderStatus == 3">拒绝</span>
							<span v-if="scope.row.orderStatus == 4">作废</span>
						</template>
                    </el-table-column>
					<el-table-column
                        prop="cargoFlowNo"
                        label="配货单号"
                        >
                    </el-table-column>
					<el-table-column
                        prop="orderGoodsRemark"
                        label="备注"
                        >
                    </el-table-column>
					<el-table-column
                        prop="purchaseOrderNo"
                        label="操作"
                        >
						<template slot-scope="scope">
							<el-button
								v-if="scope.row.orderStatus == 0"
								v-perss='132'
								@click="checkDetail(scope.row)"
								type="text"
								size="small">
								审核
							</el-button>
							<el-button
								v-if="scope"
								@click="propEvent(scope.row.id)"
								type="text"
								size="small">
								详情
							</el-button>
							<el-button
								v-perss='133'
								v-if="scope.row.orderStatus == 4"
								@click="recover(scope.row.id)"
								type="text"
								size="small">
								恢复
							</el-button>
						</template>
                    </el-table-column>
				</el-table>
			</div>
		</div>
		<div class="model_footer">
			<el-pagination 
				@size-change="handleSizeChange"
                @current-change="handleCurrentChange"
				:current-page="tableParam.pageNo"
				:page-sizes="[15, 30, 50, 100]"
				:page-size="tableParam.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="totalPage">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import api from 'api/stock2'
	import api2 from 'api/common'
	export default {
		data() {
			return {
				timer:[],
				tableData: [],
				selectTableData: [],
				options:[],
				tableHeight: this.$store.state.home.modelContentHeight - 85,
				isTableChecked: false,
				mallList: [],
				totalPage: 0,
				tableParam: {
					shopId: '',
					orderStatus:'',
					timeType:'',
					cargoFlowNo:'',
					startTime:'',
					endTime:'',
					pageNo: 1,
					pageSize: 15
				}
			}
		},
		methods: {
			searchInputClear(){
				this.tableParam.pageNo = 1
            	this.getGoodLossList()
			},
			getGoodLossList(){
				api.stockOrderGoodsList(this.tableParam).then((res) => {
					this.tableData = res.data.list
					this.totalPage = res.data.total
				})
			},
			handleSelectionChange(arr){
				this.selectTableData = arr
				if (arr.length > 0) {
					this.isTableChecked = true
					this.tableHeight = this.$store.state.home.modelContentHeight - 148
				} else {
					this.isTableChecked = false
					this.tableHeight = this.$store.state.home.modelContentHeight - 85
				}
			},
			closeExportWrap(){
				this.isTableChecked = false
            	this.$refs.mallOrderTable.clearSelection()
			},
			//审核
			checkDetail(val){
				console.log(val)
				let obj = {
					expectationTime: val.expectationTime, 
					id: val.id, 
					inShopId: val.inShopId, 
					inShopName: val.inShopName, 
					outShopId: val.outShopId, 
					outShopName: val.outShopName, 
					totalMoney: val.totalMoney, 
					totalNumber: val.totalNumber
				}
				let newObj = []
				newObj.push(obj)
				api.stockOrderGoodsBatchUpdate(newObj).then((res) => {
					this.$message({
						type: 'success',
						duration: 1500,
						showClose: true,
						message: '订货单审核成功'
					})
					this.getGoodLossList()
				})
			},
			checkDetailAll(val){
				let newObj = []
				val.forEach(ele => {
					let obj = {
						expectationTime: ele.expectationTime, 
						id: ele.id, 
						inShopId: ele.inShopId, 
						inShopName: ele.inShopName, 
						outShopId: ele.outShopId, 
						outShopName: ele.outShopName, 
						totalMoney: ele.totalMoney, 
						totalNumber: ele.totalNumber
					}
					newObj.push(obj)
				})
				api.stockOrderGoodsBatchUpdate(newObj).then((res) => {
					this.$message({
						type: 'success',
						duration: 1500,
						showClose: true,
						message: '订货单修改成功'
					})
					this.getGoodLossList()
				})
			},
			//详情
			propEvent(id){
				this.$store.commit('setPageData', id)
				this.$router.push({
					path: '/mallOrder/mallOrderDetail'
				})
			},
			//恢复
			recover(ids){
				let obj = {
					id:ids,
					orderStatus:0
				}
				api.stockOrderGoodsAgree(obj).then((res) => {
					console.log(res)
					this.$message({
						type: 'success',
						duration: 1500,
						showClose: true,
						message: '恢复成功'
					})
					this.getGoodLossList()
				})
			},
			//所有供应商
			allShops(){
				api2.allShops().then((res) => {
					this.options = res.data
				})
			},
			handleSizeChange(val){
				this.tableParam.pageSize = val
            	this.getGoodLossList()
			},
			handleCurrentChange(val){
				this.tableParam.pageNo = val
            	this.getGoodLossList()
			},
			datePickerChangeEvent(val){
				if (val) {
					this.tableParam.startTime = Math.round(val[0] / 1000)
					this.tableParam.endTime = Math.round(val[1] / 1000)
				} else {
					this.tableParam.startTime = ''
					this.tableParam.endTime = ''
				}
				this.tableParam.pageNo = 1
				this.getGoodLossList()
			}
		},
		computed: {},
		created() {},
		activated() {
			this.getGoodLossList()
			this.allShops()
		},
		mounted() {}
	}
</script>
<style scoped>
	.header_seach_wrap>div {
		margin-right: 10px;
	}
	.title_tips_wrap{
		border-top: 1px solid #E4E7ED;
		height: 63px;
		padding-top: 15px;
	}
	.title_tips_wrap>ul{
		overflow: hidden;
		padding-left: 0;
	}
	.title_tips_wrap>ul>li{
		float: left;
		padding: 0 20px;
		height: 33px;
		line-height: 32px;
	}	
</style>