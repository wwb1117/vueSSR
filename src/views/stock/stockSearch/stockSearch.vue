<template>
	<div>
		<div class="model_topcol">
			<span>库存查询</span>
			<div>
				<el-button v-perss='104' class="wid90" type="primary" size="small">导出</el-button>
			</div>
		</div>
		<div class="model_content">
			<div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
				<div class="header_seach_wrap" style="padding: 15px">
					<el-select filterable clearable @change="searchInputClear" v-model="tableParam.shopId" size="small" placeholder="请选择门店">
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
					<el-input  @change="searchInputClear" prefix-icon="el-icon-search" clearable style="width: 294px" size="small" v-model="tableParam.searchStr" placeholder="请输入条码/商品名称"></el-input>
					<el-button @click="searchInputClear" type="primary" size="small">搜索</el-button>
				</div>
				<el-table
                    :data="tableData"
                    :height="$store.state.home.modelContentHeight - 84"
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
                        prop="id"
                        label="商品编码"
                        >
                    </el-table-column>
					<el-table-column
                        prop="itemTypeName "
                        label="分类"
                        >
                    </el-table-column>
					<el-table-column
                        prop="itemUnit"
                        label="单位"
                        >
                    </el-table-column>
					<el-table-column
                        prop="availableInventory"
                        label="库存数量"
                        >
                    </el-table-column>
					<el-table-column
                        prop="inventoryLowerLimit"
                        label="库存下限"
                        >
                    </el-table-column>
					<el-table-column
                        prop="inventoryUpperLimit"
                        label="库存上限"
                        >
                    </el-table-column>
					<el-table-column
                        prop="totalPrice"
                        label="进货价(元)"
                        >
                    </el-table-column>
					<!-- <el-table-column
                        prop="sellPrice"
                        label="销售价(元)"
                        >
                    </el-table-column> -->
					<el-table-column
                        prop="updated"
                        label="库存变更时间"
                        >
						<template slot-scope="scope">
                            <span>{{scope.row.updated | time_m}}</span>
                        </template>
                    </el-table-column>
					<el-table-column
                        prop="purchaseOrderNo"
                        width="150"
                        label="操作">
                         <template slot-scope="scope">
							<el-button
								v-perss='103'
								@click="propEvent(scope.row)"
								type="text"
								size="small">
								查看变更记录
							</el-button>
                        </template>
                    </el-table-column>
				</el-table>
			</div>
		</div>
		<div class="model_footer">
			<div class="footer_tips">
				<span>共 <span class="color_red">{{statisticalSku}}</span> 种商品</span>
				<span>库存总量：<span class="color_red">{{statisticalNumber}}</span></span>
				<span>总进价（元）：<span class="color_red">{{statisticalPrice}}</span></span>
				<!-- <span>总售价（元）：<span class="color_red">{{statisticalSell}}</span></span> -->
			</div>
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
	import api from 'api/stock'
	import capi from 'api/common'
	export default {
		data() {
			return {
				tableData: [],
				mallList: [],
				categoryIdArr: [],
				categoryList: [],
				shopList: [],
				categoryOptionProps: {
					label:'categoryName',
					value:'id',
					children: 'categoryList'
				},
				totalPage: 10,
				statisticalSku: '',
				statisticalSell: '',
				statisticalNumber: '',
				statisticalPrice: '',
				tableParam: {
					searchStr: '',
					itemTypeId: '',
					startTime: '',
					endTime: '',
					shopId: this.$store.state.home.currentShop.id,
					pageNo: 1,
					pageSize: 15
				}
			}
		},
		methods:{
			propEvent(row){
				this.$store.commit('setPageData', row)
				this.$router.push({
					path: '/stockSearch/changeRecord'
				})
			},
			handleSizeChange(val){
				this.tableParam.pageSize = val
            	this.getTableList()
			},
			handleCurrentChange(val){
				this.tableParam.pageNo = val
            	this.getTableList()
			},
			searchInputClear(){
				this.tableParam.pageNo = 1
            	this.getTableList()
			},
			getTableList(){
				api.stockSearch(this.tableParam).then((response) => {
					this.totalPage = response.data.total
					this.tableData = response.data.list
					this.statisticalSku = response.data.statisticalSku
					this.statisticalSell = response.data.statisticalSell
					this.statisticalNumber = response.data.statisticalNumber
					this.statisticalPrice = response.data.statisticalPrice

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
			cateSelectChange(val){
				if (val.length > 0) {
					this.tableParam.itemTypeId = val[val.length - 1]
				} else{
					this.tableParam.itemTypeId = ''
				}
				this.searchInputClear()
			}	
		},
		computed: {},
		created() {},
		activated() {
			this.getTableList()
			this.getCategoryList()
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