<template>
	<div>
		<div class="model_topcol">
			<span>采购单</span>
			<div>
				<el-button v-perss='110' @click="addPurchaseEvent" class="wid90" type="primary" size="small">新增采购单</el-button>
				<el-button v-perss='112' class="wid90" type="primary" size="small">导出</el-button>
			</div>
		</div>
		<div class="model_content">
			<div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
				<div class="header_seach_wrap" style="padding: 15px">
					<el-select clearable @change="searchInputClear" filterable v-model="tableParam.buyerId" size="small" placeholder="请选择采购门店">
						<el-option v-for="item in shopList" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
					<el-select clearable @change="searchInputClear" filterable v-model="tableParam.sellerId" size="small" placeholder="请选择供应商">
						<el-option v-for="item in suppllerList" :key="item.id" :label="item.supplierName" :value="item.id"></el-option>
					</el-select>
					<el-select clearable @change="searchInputClear" filterable v-model="tableParam.orderStatus" size="small" placeholder="请选择状态">
						<el-option v-for="(value, key) in $enum.orderStatus" :key="key" :label="value" :value="key">
						</el-option>
					</el-select>
					<el-date-picker clearable @change="datePickerChangeEvent" v-model="purchaseDate" value-format="timestamp" type="daterange" :editable="false" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
					<el-input clearable  @change="searchInputClear" prefix-icon="el-icon-search" style="width: 294px" size="small" v-model="tableParam.purchaseOrderNo" placeholder="请输入采购单号"></el-input>
					<el-button @click="searchInputClear" type="primary" size="small">搜索</el-button>
				</div>
				<el-table
                    :data="tableData"
                    :height="$store.state.home.modelContentHeight - 85"
                    style="width: 100%">
					<el-table-column
                        prop="purchaseOrderNo"
                        label="单号"
                        >
                    </el-table-column>
					<el-table-column
                        prop="buyerName"
                        label="采购门店"
                        >
                    </el-table-column>
					<el-table-column
                        prop="orderTime"
                        label="制单时间"
                        >
						<template slot-scope="scope">
                            <span>{{scope.row.orderTime | time_m}}</span>
                        </template>
                    </el-table-column>
					<el-table-column
                        prop="sellerName"
                        label="供应商"
                        >
                    </el-table-column>
					<el-table-column
                        prop="totalMoney"
                        label="采购金额(元)"
                        >
                    </el-table-column>
					<el-table-column
                        prop="creator"
                        label="制单员"
                        >
                    </el-table-column>
					<el-table-column
                        prop="orderStatus"
                        label="采购状态"
                        >
						<template slot-scope="scope">
							<span>{{$enum.orderStatus[scope.row.orderStatus]}}</span>
						</template>
                    </el-table-column>
					<el-table-column
                        prop="cargoFlowNo"
                        label="进货单号"
                        >
                    </el-table-column>
					<el-table-column
                        prop="purchaseRemark"
                        label="备注"
                        >
                    </el-table-column>
					<el-table-column
                        prop="purchaseOrderNo"
                        width="150"
                        label="操作">
                        <template slot-scope="scope">
                            <div>
                                <el-button
									v-if="scope.row.orderStatus == 0"
									v-perss='111'
									@click="propEvent(1, scope.row)"
                                    type="text"
                                    size="small">
                                    作废
                                </el-button>
								<el-button
									@click="propEvent(2, scope.row)"
                                    type="text"
                                    size="small">
                                    详情
                                </el-button>
                            </div>
                        </template>
                    </el-table-column>
				</el-table>
			</div>
		</div>
		<div class="model_footer">
			<el-pagination :current-page="tableParam.pageNo"
				:page-sizes="[15, 30, 50, 100]"
				:page-size="tableParam.pageSize"
				@size-change="handleSizeChange"
                @current-change="handleCurrentChange"
				layout="total, sizes, prev, pager, next, jumper"
				:total="totalPage">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import api from 'api/stock'
	import capi from 'api/common'
	export default {
		data() {
			return {
				tableData: [],
				mallList: [],
				shopList: [],
				suppllerList: [],
				totalPage: 10,
				purchaseDate: '',
				tableParam: {
					purchaseOrderNo: '',
					startTime: '',
					endTime: '',
					sellerId: '',
					orderStatus: '',
					buyerId: '',
					pageNo: 1,
					pageSize: 15
				}
			}
		},
		computed: {},
		methods: {
			handleSizeChange(val){
				this.tableParam.pageSize = val
				this.getTableData()
			},
			handleCurrentChange(val){
				this.tableParam.pageNo = val
				this.getTableData()
			},
			getShopList(){
				capi.allShops().then((res) => {
					this.shopList = res.data
				})
			},
			getSupplierList(){
				capi.allSupplier().then((response) => {
					this.suppllerList = response.data
				})
			},
			propEvent(type, data){
				this.$store.commit('setPageData', data)
				if (type == 1) { //作废
					this.$confirm('你确定要作废该单据吗?', '作废确认', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						api.cansolePurchase(data.id).then((response) => {
							this.$message({
								showClose: true,
								type: 'success',
								message: '作废成功!'
							});
							this.searchInputClear()
						})
					}).catch(() => {
						this.$message({
							showClose: true,
							type: 'info',
							message: '已取消操作'
						});          
					});
				}
				if (type == 2) { //详细
					this.$router.push({
						path: '/purchase/purchaseDetail'
					})
				}
			},
			searchInputClear(){
				this.tableParam.pageNo = 1
            	this.getTableData()
			},
			datePickerChangeEvent(val){
				if (val) {
					this.tableParam.startTime = Math.round(val[0] / 1000)
					this.tableParam.endTime = Math.round(val[1] / 1000)
				} else{
					this.tableParam.startTime = ''
					this.tableParam.endTime = ''
				}
				
				this.tableParam.pageNo = 1
				this.getTableData()
			},
			addPurchaseEvent(){
				this.$router.push({
					path: '/addPurchase'
				})
			},
			getTableData(){
				api.getPurchaseList(this.tableParam).then((response) => {
					this.tableData = response.data.list
					this.totalPage = response.data.total
				})
			}
		},
		created() {},
		activated() {
			this.getTableData()
			this.getShopList()
			this.getSupplierList()
		},
		mounted() {}
	}
</script>
<style scoped>
	.header_seach_wrap>div {
		margin-right: 10px;
	}
</style>