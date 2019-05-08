<template>
	<div>
		<div class="model_topcol">
			<span>变动明细</span>
			<div>
				<el-button v-perss='108' class="wid90" type="primary" size="small">导出</el-button>
			</div>
		</div>
		<div class="model_content">
			<div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
				<div class="header_seach_wrap" style="padding: 15px">
					<el-select filterable clearable @change="searchInputClear" v-model="tableParam.shopId" size="small" placeholder="请选择门店">
						<el-option v-for="item in shopList" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
					<el-select filterable clearable @change="searchInputClear" v-model="tableParam.changeType" size="small" placeholder="请选择变动类型">
						<el-option v-for="(value, key) in $enum.changeType" :key="key" :label="value" :value="key">
						</el-option>
					</el-select>
					<el-date-picker clearable @change="datePickerChangeEvent" v-model="tableParam.purchaseDate" value-format="timestamp" type="daterange" :editable="false" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
					<el-select :remote-method="getRemoteGood" filterable remote value-key="skuId" clearable @change="searchInputClear" v-model="selectGood" size="small" placeholder="请输入关键字查询商品数据">
						<el-option v-for="item in goodList" :key="item.skuId" :label="item.itemName" :value="item">
						</el-option>
					</el-select>
					<!-- <el-input prefix-icon="el-icon-search" @change="searchInputClear" clearable style="width: 294px" size="small" v-model="tableParam.searchStr" placeholder="请输入商品名称/条码"></el-input> -->
					<el-button @click="searchInputClear" type="primary" size="small">搜索</el-button>
				</div>
				<el-table
                    :data="tableData"
					empty-text="请输入商品名称或条码进行查询！"
                    :height="$store.state.home.modelContentHeight - 165"
					:row-class-name="tableRowClassName"
                    style="width: 100%">
					<el-table-column
                        prop="shopName"
                        label="所属门店"
                        >
                    </el-table-column>
					<el-table-column
                        prop="changeTime"
                        label="操作时间"
                        >
						<template slot-scope="scope">
							<span>{{scope.row.changeTime | time_m}}</span>
						</template>
                    </el-table-column>
					<el-table-column
                        prop="changeType"
                        label="变动类型"
                        >
						<template slot-scope="scope">
							<span>{{$enum.changeType[scope.row.changeType]}}</span>
						</template>
                    </el-table-column>
					<el-table-column
                        prop="changeNumber"
                        label="库存变动"
                        >
                    </el-table-column>
					<!-- <el-table-column
                        prop="totalChangeTypeN"
                        label="校正库存"
                        >
                    </el-table-column> -->
					<el-table-column
                        prop="changeRemark"
                        label="备注"
                        >
                    </el-table-column>
					<el-table-column
                        prop="purchaseOrderNo"
                        label="操作"
						width="100"
                        >
						<template slot-scope="scope">
							<el-button
								v-if="scope"
								@click="propEvent(scope.row)"
								type="text"
								size="small">
								明细
							</el-button>
						</template>
                    </el-table-column>
				</el-table>
				<div>
					<el-row>
						<el-col class="footer_tips" :span="4">
							<div>
								<span class="color_gray">商品名称</span>
								<span v-if="selectGood" v-text="selectGood.itemName"></span>
							</div>
							<div>
								<span class="color_gray">商品条码</span>
								<span v-if="selectGood" v-text="selectGood.skuItemBarcode"></span>
							</div>
						</el-col>
						<el-col class="footer_tips" :span="4">
							<div>
								<span class="color_gray">现有库存</span><span v-text="stockChangeData.totalStorage"></span>
							</div>
							<div>
								<span class="color_gray">商品报损</span><span v-text="stockChangeData.totalChangeType9"></span>
							</div>
						</el-col>
						<el-col class="footer_tips" :span="4">
							<div>
								<span class="color_gray">货流出库</span><span v-text="stockChangeData.totalChangeType2"></span>
							</div>
							<div>
								<span class="color_gray">客户退货</span><span v-text="stockChangeData.totalChangeType11"></span>
							</div>
						</el-col>
						<el-col class="footer_tips" :span="4">
							<div>
								<span class="color_gray">货流进货</span><span v-text="stockChangeData.totalChangeType0"></span>
							</div>
							<div>
								<span class="color_gray">货流调出</span><span v-text="stockChangeData.totalChangeType3"></span>
							</div>
						</el-col>
						<el-col class="footer_tips" :span="4">
							<div>
								<span class="color_gray">会员存件</span><span v-text="stockChangeData.totalChangeType6"></span>
							</div>
							<div>
								<span class="color_gray">会员取件</span><span v-text="stockChangeData.totalChangeType7"></span>
							</div>
						</el-col>
						<el-col class="footer_tips" :span="4">
							<div>
								<span class="color_gray">货流退货</span><span v-text="stockChangeData.totalChangeType4"></span>
							</div>
							
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
		<div class="model_footer">
			<el-pagination :current-page="tableParam.pageNo"
				@size-change="handleSizeChange"
                @current-change="handleCurrentChange"
				:page-sizes="[15, 30, 50, 100]"
				:page-size="tableParam.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="totalPage">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import capi from 'api/common'
	import api from 'api/stock'
	import gapi from 'api/good'
	export default {
		data() {
			return {
				tableData: [],
				mallList: [],
				goodList: [],
				shopList: [],
				totalPage: 10,
				stockChangeData: {},
				selectGood: null,
				tableParam: {
					itemSkuId: '',
					searchStr: '',
					changeType: '',
					purchaseDate: '',
					startTime: '',
					endTime: '',
					shopId: this.$store.state.home.currentShop.id,
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
			propEvent(data){
				this.$store.commit('setPageData', {routerType: 'detail', data: data.cargoFlowNo ? data.cargoFlowNo : ''})
				this.$store.commit("setCurrSid", 40)
				this.$router.push({
					path: '/logisticsManege'
				})
			},
			searchInputClear(data){
				this.tableParam.pageNo = 1
				
				this.getTableData()
				console.log(data)
			},
			getShopList(){
				capi.allShops().then((res) => {
					this.shopList = res.data
				})
			},
			getTableData(){
				if (!this.selectGood.skuId) {
					this.$message({
						type: 'warning',
						duration: 1500,
						showClose: true,
						message: '请输入商品名称或条码进行查询！'
					})
				} else {
					this.tableParam.itemSkuId = this.selectGood.skuId
					
					api.stockChangeDetailList(this.tableParam).then((response) => {
						this.stockChangeData = response.data
						this.tableData = response.data.list
						this.totalPage = response.data.total
					})
				}
			},
			getGoodData(){
				gapi.getSkuGoodsList({pageNo:1, pageSize: 1000}).then((response) => {
					this.goodList = response.data.listData
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
				this.searchInputClear()
			},
			tableRowClassName({row, index}){
				if (row.changeType == 8) {
					return 'green_row'
				} else if(row.changeType == 10){
					return 'green_red'
				}
				return ''
			},
			getRemoteGood(query){
				gapi.getSkuGoodsList({pageNo:1, pageSize: 1000, combinationStr: query}).then((response) => {
					this.goodList = response.data.listData
				})
			},
			initData(){
				this.selectGood = null
			}
		},
		created() {},
		activated() {
			this.initData()
			this.getShopList()
			this.getGoodData()
		},
		mounted() {}
	}
</script>
<style scoped>
	.header_seach_wrap>div {
		margin-right: 10px;
	}
	.footer_tips{
		padding-top: 10px;
		padding-left: 20px;
	}
	.footer_tips>div{
		padding: 5px 0;
	}
	.footer_tips>div>span{
		margin-left: 10px;
	}
	.el-table>>> .green_row {
		background: #f0f9eb;
	}
	.el-table>>> .green_red {
		background: oldlace;
	}
</style>