<template>
	<div>
		<div class="model_topcol">
			<span>寄存取明细</span>
		</div>
		<div class="model_content">
			<div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
				<div class="header_seach_wrap" style="padding: 15px">
					<el-select filterable clearable @change="searchInputClear" v-model="tableParam.shopId" size="small" placeholder="请选择门店">
						<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
					<el-select filterable clearable @change="searchInputClear" v-model="tableParam.depositType" size="small" placeholder="请选择存取类型">
						<el-option key="0" label="寄存" :value="0">
						</el-option>
						<el-option key="1" label="取件" :value="1">
						</el-option>
					</el-select>
					<el-date-picker size="small" v-model="timer" @change="datePickerChangeEvent" value-format="timestamp" type="daterange" :editable="false" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
					<el-input clearable @change="searchInputClear" prefix-icon="el-icon-search" style="width: 294px" size="small" v-model="tableParam.searchStr" placeholder="商品名称/条码"></el-input>
					<el-button type="primary" size="small" @click='searchInputClear'>搜索</el-button>
				</div>
				<el-table
                    :data="tableData"
                    :height="$store.state.home.modelContentHeight - 85"
                    ref="purchaseListTable"
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
					<el-table-column
                        label="时间"
						>
						<template slot-scope='scope'>
							<span>{{scope.row.depositTime | time_s}}</span>
						</template>
                    </el-table-column>
					<el-table-column
                        prop="orderNo"
                        label="销售单号"
                        >
                    </el-table-column>
					<el-table-column
                        prop="memberName"
                        label="会员"
                        >
                    </el-table-column>
					<el-table-column
                        prop="itemMac"
                        label="条码"
                        >
                    </el-table-column>
					<el-table-column
                        prop="itemName"
                        label="商品"
                        >
                    </el-table-column>
					<el-table-column
                        prop="depositNumber"
                        label="数量"
                        >
                    </el-table-column>
					<el-table-column
                        prop="itemUnit"
                        label="单位"
                        >
                    </el-table-column>
					<el-table-column
                        label="存取类型"
						>
						<template slot-scope='scope'>
							<span v-if='scope.row.depositType == 0'>寄存</span>
							<span v-if='scope.row.depositType == 1'>取件</span>
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
				timer:'',
				options:[],
				tableData: [],
				mallList: [],
				totalPage: 0,
				tableParam: {
					searchStr: '',
					shopId:'',
					depositType:'',
					startTime:'',
					endTime:'',
					pageNo: 1,
					pageSize: 15
				}
			}
		},
		computed: {},
		created() {},
		methods: {
			searchInputClear(){
				this.tableParam.pageNo = 1
            	this.getList()
			},
			getList(){
				api.depositChangeDetail(this.tableParam).then((res) => {
					this.tableData = res.data.list
					this.totalPage = res.data.total
				})
			},
			handleSelectionChange(){
			},
			handleSizeChange(val){
				this.tableParam.pageSize = val
            	this.getList()
			},
			handleCurrentChange(val){
				this.tableParam.pageNo = val
            	this.getList()
			},
			//所有供应商
			allShops(){
				api2.allShops().then((res) => {
					this.options = res.data
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
				this.getList()
			}
		},
		activated() {
			this.getList()
			this.allShops()
		},
		mounted() {}
	}
</script>
<style scoped>
	.header_seach_wrap>div {
		margin-right: 10px;
	}
</style>