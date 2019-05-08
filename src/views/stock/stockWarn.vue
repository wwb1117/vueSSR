<template>
	<div>
		<div class="model_topcol">
			<span>库存预警</span>
			<div>
				<el-button v-perss='106' class="wid90" type="primary" size="small">导出</el-button>
			</div>
		</div>
		<div class="model_content">
			<div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
				<div class="header_seach_wrap" style="padding: 15px">
					<el-select filterable clearable @change="serchGetTableData" v-model="tableParam.shopId" size="small" placeholder="请选择门店">
						<el-option v-for="item in shopList" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
					<el-cascader
						placeholder="请选择商品分类"
						clearable
						@change="cateSelectChange"
						v-model="categoryIdArr"
						:options="categoryList"
						change-on-select
						:props='categoryOptionProps'
						size='small'>
					</el-cascader>
					<el-date-picker size="small" v-model="purchaseDate" value-format="timestamp" type="daterange" :editable="false" range-separator="至" start-placeholder="开始日期" @change="datePickerChangeEvent" end-placeholder="结束日期">
					</el-date-picker>
					<el-input @change="serchGetTableData" prefix-icon="el-icon-search" clearable style="width: 294px" size="small" v-model="tableParam.searchStr" placeholder="请输入商品名称/条码"></el-input>
					<el-button @click="serchGetTableData" type="primary" size="small">搜索</el-button>
				</div>
				<el-table
                    :data="tableData"
                    :height="$store.state.home.modelContentHeight - 85"
                    ref="purchaseListTable"
                    style="width: 100%">
					<el-table-column
                        prop="shopName"
                        label="所属门店"
                        >
                    </el-table-column>
					<el-table-column
                        prop="itemName"
                        label="商品名称"
                        >
                    </el-table-column>
					<el-table-column
                        prop="itemMac"
                        label="条码"
                        >
                    </el-table-column>
					<el-table-column
                        prop="itemTypeName"
                        label="商品分类"
                        >
                    </el-table-column>
					<el-table-column
                        prop="itemUnit"
                        label="单位"
                        >
                    </el-table-column>
					<el-table-column
                        prop="availableInventory"
                        label="现有库存"
                        >
						<template slot-scope="scope">
							<el-button
								v-text="scope.row.availableInventory"
								@click="propEvent(scope.row)"
								type="text"
								size="small">
							</el-button>
						</template>
                    </el-table-column>
					<el-table-column
                        prop="depositInventory"
                        label="寄存数量"
                        >
                    </el-table-column>
					<el-table-column
                        prop="inventoryUpperLimit"
                        label="库存上限"
                        >
                    </el-table-column>
					<el-table-column
                        prop="inventoryLowerLimit"
                        label="库存下限"
                        >
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

		<el-dialog
			:title="dialogTitle + '商品生产日期与库存明细'"
			:visible.sync="dialogVisible"
			:close-on-click-modal="false"
			width="650px"
			>
				<el-table
                    :data="tableData2"
					border
                    :height="345"
                    ref="purchaseListTable"
                    style="width: 100%">
					<el-table-column
                        prop="productionDate"
                        label="生产日期"
                        >
						<template slot-scope="scope">
							<span>{{scope.row.productionDate | time_m}}</span>
						</template>
                    </el-table-column>
					<el-table-column
                        prop="periodDate"
                        label="到期日期"
                        >
						<template slot-scope="scope">
							<span>{{scope.row.periodDate | time_m}}</span>
						</template>
                    </el-table-column>
					<el-table-column
                        prop="period"
                        label="保质期(天)"
                        >
                    </el-table-column>
					<el-table-column
                        prop="availableInventory"
                        label="库存数"
                        >
                    </el-table-column>
				</el-table>
				<!-- <div style="height: 55px; border-top: none;" class="border">
					<el-pagination
						:current-page="tableParam.pageNo"
						:page-sizes="[15, 30, 50, 100]"
						:page-size="15"
						layout="total, sizes, prev, pager, next, jumper"
						:total="totalPage">
					</el-pagination>
				</div> -->
			<span slot="footer" class="dialog-footer">
				<el-button class="wid90" size="small" type="primary" @click="dialogVisible = false">取消</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import capi from 'api/common'
	import api from 'api/stock'
	export default {
		data() {
			return {
				dialogVisible: false,
				dialogTitle: '',
				tableData: [],
				tableData2: [],
				mallList: [],
				shopList: [],
				categoryList: [],
				categoryIdArr: [],
				categoryOptionProps: {
					label:'categoryName',
					value:'id',
					children: 'categoryList'
				},
				totalPage: 10,
				purchaseDate: [],
				tableParam: {
					itemTypeId: '',
					searchStr: '',
					startTime: '',
					endTime: '',
					shopId: this.$store.state.home.currentShop.id,
					pageNo: 1,
					pageSize: 15
				}
			}
		},
		methods: {
			handleSizeChange(val){
				this.tableParam.pageSize = val
				this.getTableData()
			},
			handleCurrentChange(val){
				this.tableParam.pageNo = val
				this.getTableData()
			},
			propEvent(row){
				this.dialogVisible = true
				this.dialogTitle = '【' + row.itemName + '】'
				this.getStockDetail(row.id)
			},
			cateSelectChange(val){
				this.tableParam.itemTypeId = val[val.length-1]
				this.serchGetTableData()
			},
			serchGetTableData(){
				this.tableParam.pageNo = 1
				this.getTableData()
			},
			getTableData(){
				api.stockWarnList(this.tableParam).then((response) => {
					this.tableData = response.data.list
					this.totalPage = response.data.total
				})
			},
			getStockDetail(id){
				api.stockWarnDetail(id).then((response) => {
					this.tableData2 = response.data
				})
			},
			getCategoryList(){
				capi.allCategory().then((response) => {
					this.categoryList = response.data
				})
			},
			getShopList(){
				capi.allShops().then((res) => {
					this.shopList = res.data
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
				
				this.serchGetTableData()
			}
		},
		computed: {},
		created() {},
		activated() {
			this.getCategoryList()
			this.getTableData()
			this.getShopList()
		},
		mounted() {}
	}
</script>
<style scoped>
	.header_seach_wrap>div {
		margin-right: 10px;
	}
	.header_seach_wrap>span {
		margin-right: 10px;
	}
</style>   