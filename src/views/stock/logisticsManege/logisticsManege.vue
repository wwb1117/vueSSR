<template>
	<div>
		<div class="model_topcol">
			<span>货流管理</span>
			<div>
				<el-button v-perss='113' type="primary" @click="propEvent(2)" class="wid90" size="small">进货</el-button>
				<el-button v-perss='117' type="primary" @click="propEvent(3)" class="wid90" size="small">出库</el-button>
				<el-button v-perss='119' type="primary" @click="propEvent(4)" class="wid90" size="small">调货</el-button>
				<el-button v-perss='120' type="primary" @click="propEvent(5)" class="wid90" size="small">配货</el-button>
				<el-button v-perss='121' type="primary" @click="propEvent(6)" class="wid90" size="small">导出</el-button>
			</div>
		</div>
		<div class="model_content">
			<div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
				<div class="header_seach_wrap" style="padding: 15px">
					<el-select clearable @change="searchEvent" filterable v-model="tableParam.shopId" size="small" placeholder="请选择门店">
						<el-option v-for="item in shopList" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
					<el-select clearable @change="searchEvent" filterable v-model="tableParam.supplierId" size="small" placeholder="请选择供应商">
						<el-option v-for="item in suppllerList" :key="item.id" :label="item.supplierName" :value="item.id"></el-option>
					</el-select>
					<el-select clearable @change="searchEvent" filterable v-model="tableParam.orderType" size="small" placeholder="请选择货单类型">
						<el-option v-for="(value, key) in $enum.logisticsType" :key="key" :label="value" :value="key">
						</el-option>
					</el-select>
					<el-date-picker clearable size="small" @change="datePickerChangeEvent" v-model="purchaseDate" value-format="timestamp" type="daterange" :editable="false" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
					<el-input prefix-icon="el-icon-search" @change="searchEvent" clearable style="width: 294px" size="small" v-model="tableParam.cargoFlowNo" placeholder="请输入货流单号"></el-input>
					<el-button type="primary" @click="searchEvent" size="small">搜索</el-button>
				</div>
				<el-table
                    :data="tableData"
                    :height="$store.state.home.modelContentHeight - 85"
                    style="width: 100%">
					<el-table-column
                        prop="ownerShopName"
                        label="所属门店"
                        >
                    </el-table-column>
					<el-table-column
                        prop="cargoFlowNo"
                        label="货流单号"
						width="200"
                        >
                    </el-table-column>
					<el-table-column
                        prop="orderTime"
                        label="下单时间"
                        >
						<template slot-scope="scope">
							<span>{{scope.row.orderTime | time_m}}</span>
						</template>
                    </el-table-column>
					<el-table-column
                        prop="orderType"
                        label="货单类型"
                        >
						<template slot-scope="scope">
							<span>{{$enum.logisticsType[scope.row.orderType]}}</span>
						</template>
                    </el-table-column>
					<el-table-column
                        prop="supplierName"
                        label="供应商"
                        >
                    </el-table-column>
					<el-table-column
                        prop="outShopName"
                        label="出货方"
                        >
                    </el-table-column>
					<el-table-column
                        prop="inShopName"
                        label="进货方"
                        >
                    </el-table-column>
					<el-table-column
                        prop="purchaseOrderNo"
                        label="状态"
						width="80"
                        >
						<template slot-scope="scope">
							<span>{{$enum.logisticsStatus[scope.row.orderStatus]}}</span>
						</template>
                    </el-table-column>
					<el-table-column
                        prop="totalNumber"
                        label="货流量"
						width="80"
                        >
                    </el-table-column>
					<el-table-column
                        prop="totalMoney"
                        label="总价(元)"
						width="80"
                        >
                    </el-table-column>
					<el-table-column
                        prop="prepayMoney"
                        label="预付款(元)"
						width="80"
                        >
                    </el-table-column>
					<el-table-column
                        prop="cargoFlowRemark"
                        label="备注"
                        >
                    </el-table-column>
					<el-table-column
                        prop="purchaseOrderNo"
                        label="操作"
                        >
						<template slot-scope="scope">
							<div v-if="scope">
                                <el-button
									@click="propEvent(1, scope.row)"
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
				tableData: [
					
				],
				mallList: [],
				shopList: [],
				suppllerList: [],
				totalPage: 10,
				purchaseDate: '',
				tableParam: {
					cargoFlowNo: '',
					orderType: '',
					startTime: '',
					endTime: '',
					shopId: '',
					pageNo: 1,
					pageSize: 15
				}
			}
		},
		computed: {},
		methods: {
			handleSizeChange(val){
				this.tableParam.pageSize = val
				this.getTableList()
			},
			handleCurrentChange(val){
				this.tableParam.pageNo = val
				this.getTableList()
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
				if (type == 1) {
					this.$store.commit('setPageData', data)
					this.$router.push({
						path: '/logisticsDetail'
					})
				}
				if (type == 2) { //进货
					this.$router.push({
						path: '/logisticsManege/inStock'
					})
				}
				if (type == 3) { //出库
					this.$router.push({
						path: '/logisticsManege/outStock'
					})
				}
				if (type == 4) { //调货
					this.$router.push({
						path: '/logisticsManege/shipOrder'
					})
				}
				if (type == 5) { //配货
					this.$router.push({
						path: '/logisticsManege/prepare'
					})
				}
			},
			getTableList(){
				api.getLogisticsList(this.tableParam).then((response) => {
					this.tableData = response.data.list
					this.totalPage = response.data.total
				})
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
				this.getTableList()
			},
			searchEvent(){
				this.tableParam.pageNo = 1
				this.getTableList()
			}

		},
		created() {},
		activated() {
			if (this.$store.state.home.pageData.routerType == 'detail') { //变动明细跳转
				this.tableParam.cargoFlowNo = this.$store.state.home.pageData.data
			}
			this.getTableList()
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