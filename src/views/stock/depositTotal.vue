<template>
	<div>
		<div class="model_topcol">
			<span>寄存统计</span>
		</div>
		<div class="model_content">
			<div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 21 + 'px', overflow: 'auto'}">
				<div class="header_seach_wrap" style="padding: 15px">
					<el-select filterable clearable @change="searInputTable" v-model="tableParam.shopId" size="small" placeholder="请选择门店">
						<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
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
					<el-input clearable @change="searInputTable" prefix-icon="el-icon-search" style="width: 294px" size="small" v-model="tableParam.searchStr" placeholder="条码/品名/拼音码"></el-input>
					<el-button @click="searInputTable" type="primary" size="small">搜索</el-button>
				</div>
				<el-table
                    :data="tableData"
                    :height="$store.state.home.modelContentHeight - 85"
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
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
                        prop="availableInventory"
                        label="现有库存"
                        >
                    </el-table-column>
					<el-table-column
                        label="寄存数量"
                        >
						<template slot-scope="scope">
							<el-button
								v-text="scope.row.depositInventory"
								@click="propEvent(scope.row.id)"
								type="text"
								size="small">
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

		<el-dialog
			title="会员寄存明细"
			:visible.sync="dialogVisible"
			:close-on-click-modal="false"
			width="55%"
			>
				<el-table
                    :data="tableData2"
					border
                    :height="405"
                    style="width: 100%">
					<el-table-column
                        type="index"
						label="序号"
                        width="50">
                    </el-table-column>
					<el-table-column
                        prop="memberName"
                        label="姓名"
                        >
                    </el-table-column>
					<el-table-column
                        prop="memberId"
                        label="编号"
                        >
                    </el-table-column>
					<el-table-column
                        prop="cellPhone"
                        label="电话"
                        >
                    </el-table-column>
					<el-table-column
                        prop="memberLevel"
                        label="等级"
                        >
                    </el-table-column>
					<el-table-column
                        prop="remainder"
                        label="余额"
                        >
                    </el-table-column>
					<el-table-column
                        prop="credit"
                        label="积分"
                        >
                    </el-table-column>
					<el-table-column
                        prop="totalNumber"
                        label="寄存数量"
                        >
                    </el-table-column>
				</el-table>
				<div style="height: 55px; border-top: none;" class="border">
					<el-pagination
						@size-change="handleSizeChange2"
						@current-change="handleCurrentChange2"
						:current-page="tableParam2.pageNo"
						:page-sizes="[15, 30, 50, 100]"
						:page-size="15"
						layout="total, sizes, prev, pager, next, jumper"
						:total="totalPage2">
					</el-pagination>
				</div>
			<span slot="footer" class="dialog-footer">
				<el-button class="wid90" size="small" type="primary" @click="dialogVisible = false">取消</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import api from 'api/stock2'
	import api2 from 'api/common'
	export default {
		data() {
			return {
				options:[],
				tableData: [],
				tableData2: [],
				categoryIdArr: [],
				categoryList: [],
				categoryOptionProps: {
					label:'categoryName',
					value:'id',
					children: 'categoryList'
				},
				dialogVisible: false,
				mallList: [],
				totalPage: 0,
				totalPage2:0,
				tableParam: {
					searchStr: '',
					mallId: '',
					shopId:'',
					pageNo: 1,
					pageSize: 15
				},
				tableParam2:{
					pageNo: 1,
					pageSize: 15
				}
			}
		},
		methods: {
			getList(){
				api.depositList(this.tableParam).then((res) => {
					this.tableData = res.data.list
					this.totalPage = res.data.total
				})
			},
			searInputTable(){
				this.tableParam.pageNo = 1
				this.getList()
			},
			cateSelectChange(){
				if (this.categoryIdArr.length > 0) {
					this.tableParam.itemTypeId = this.categoryIdArr[this.categoryIdArr.length - 1]
				} else {
					this.tableParam.itemTypeId = ''
				}
				
				this.tableParam.pageNo = 1
				this.getList()
			},
			getCategoryList(){
				api2.allCategory().then((response) => {
					this.categoryList = response.data
				})
			},
			propEvent(id){
				this.dialogVisible = true
				api.depositDetail({id: id}).then((res) => {
					console.log(res)
					this.tableData2 = res.data.list
					this.totalPage2 = res.data.total
				})
			},
			handleSelectionChange(){
			},
			handleSizeChange(val){
				//选择每页数据
				this.tableParam.pageSize = val
            	this.getList()
			},
			handleCurrentChange(val){
				this.tableParam.pageNo = val
            	this.getList()
			},
			handleSizeChange2(val){
				//选择每页数据
				this.tableParam2.pageSize = val
            	this.propEvent()
			},
			handleCurrentChange2(val){
				this.tableParam2.pageNo = val
            	this.propEvent()
			},
			//所有供应商
			allShops(){
				api2.allShops().then((res) => {
					this.options = res.data
				})
			}
		},
		computed: {},
		created() {},
		activated() {
			this.getList()
			this.allShops()
			this.getCategoryList()
		},
		mounted() {}
	}
</script>
<style scoped>
	.header_seach_wrap>div,span {
		margin-right: 10px;
	}
</style>