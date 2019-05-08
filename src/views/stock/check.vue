<template>
	<div>
		<div class="model_topcol">
			<span>盘点</span>
		</div>
		<div class="model_content">
			<div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
				<div class="header_seach_wrap" style="padding: 15px">
					<el-select filterable clearable @change="searchInput" v-model="tableParam.shopId" size="small" placeholder="请选择门店">
						<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
					<el-date-picker clearable size="small" @change="datePickerChangeEvent" v-model="timer" value-format="timestamp" type="daterange" :editable="false" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</div>
				<div v-show="isTableChecked" class="title_tips_wrap">
                    <ul>
                        <li :style="{borderRight: '1px solid #E4E7ED', fontSize: '12px', color: '#757577'}">
                            <span :style="{fontSize: '18px', verticalAlign: 'middle', marginRight: '10px'}" class="el-icon-close myCur" @click="closeExportWrap"></span>
                            <span>已选择</span>
                            <span v-text="selectTableData.length"> 2 </span>
                            <span>项</span>
                        </li>
                        <li :style="{paddingLeft: '20px'}">
                            <el-button @click="checkTotalEvent" size="small">盘点盈亏汇总</el-button>
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
                        prop="orderTime"
                        label="盘点时间"
                        >
						<template slot-scope='scope'>
							<span>{{scope.row.orderTime | time_s}}</span>
						</template>
                    </el-table-column>
					<el-table-column
                        prop="checkType"
                        label="盘点类型"
                        >
                    </el-table-column>
					<el-table-column
                        prop="shopName"
                        label="盘点门店"
                        >
                    </el-table-column>
					<el-table-column
                        prop="creator"
                        label="盘点人"
                        >
                    </el-table-column>
					<el-table-column
                        prop="checkType"
                        label="盘点方式"
                        >
                    </el-table-column>
					<el-table-column
                        prop="checkRemark"
                        label="备注"
                        >
                    </el-table-column>
					<el-table-column
                        prop="purchaseOrderNo"
                        label="操作"
                        >
						<template slot-scope="scope">
							<el-button
								@click="propEvent(scope.row.id)"
								type="text"
								size="small">
								明细
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
			title="盘点明细"
			custom-class="checkModelDialog"
			:visible.sync="dialogVisible"
			:close-on-click-modal="false"
			width="55%"
			>
				<div ref="checkedPrintWrap">
					<div class="dialog_top">
						<span style="margin-right: 15px">盘点时间</span><span style="margin-right: 15px">{{orderTime | time_s}}</span>
						<span style="margin-right: 15px">盘点人</span><span>{{creator}}</span>
					</div>
					<el-table
						:data="tableData2"
						border
						:height="405"
						ref="purchaseListTable"
						style="width: 100%">
						<el-table-column
							type="index"
							label="序号"
							width="50">
						</el-table-column>
						<el-table-column
							prop="itemName"
							width="250"
							label="商品名称"
							>
						</el-table-column>
						<el-table-column
							prop="itemMac"
							label="商品条码"
							>
						</el-table-column>
						<el-table-column
							prop="itemSkuId"
							label="商品编码"
							>
						</el-table-column>
						<el-table-column
							prop="totalNumber"
							label="原库存"
							>
						</el-table-column>
						<el-table-column
							prop="checkNumber"
							label="盘点库存"
							>
						</el-table-column>
						<!-- <el-table-column
							prop="itemUnit"
							label="盘点库存金额"
							>
						</el-table-column> -->
						<el-table-column
							prop="profitNumber"
							label="差异库存"
							>
						</el-table-column>
						<el-table-column
							prop="profitPrice"
							label="盈亏金额"
							>
						</el-table-column>
					</el-table>
				</div>
			<span slot="footer" class="dialog-footer">
				<el-button class="wid90" size="small" type="primary" @click="printEvent">打印</el-button>
			</span>
		</el-dialog>
		<el-dialog
			title="盘点盈亏汇总"
			:visible.sync="checkTotalDialogVisible"
			:close-on-click-modal="false"
			width="55%"
			>
				<div ref="checkedPrintWrap">
					<el-table
						:data="tableData3"
						border
						:height="405"
						:summary-method="getSummaries"
    					show-summary
						style="width: 100%">
						<el-table-column
							type="index"
							label="序号"
							width="50">
						</el-table-column>
						<el-table-column
							prop="itemName"
							width="250"
							label="商品名称"
							>
						</el-table-column>
						<el-table-column
							prop="itemMac"
							label="商品条码"
							>
						</el-table-column>
						<el-table-column
							prop="profitNumber"
							label="差异库存"
							>
						</el-table-column>
						<el-table-column
							prop="profitPrice"
							label="盈亏金额"
							>
						</el-table-column>
					</el-table>
				</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="totalDialogClose" class="wid90" size="small" type="primary">取消</el-button>
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
				timer:'',
				options:[],
				orderTime:0,
				creator:'',
				tableData: [],
				tableData2: [],
				tableData3: [],
				dialogVisible: false,
				checkTotalDialogVisible: false,
				selectTableData: [],
				tableHeight: this.$store.state.home.modelContentHeight - 85,
				isTableChecked: false,
				mallList: [],
				totalPage: 0,
				totalPage2:0,
				tableParam: {
					shopId:'',
					startTime:'',
					endTime:'',
					pageNo: 1,
					pageSize: 15
				}
			}
		},
		methods: {
			getSummaries(param){
				const { columns, data } = param;
				const sums = [];
				columns.forEach((column, index) => {
					if (index === 0) {
						sums[index] = '合计';
						return;
					}
					const values = data.map(item => Number(item[column.property]));
					if(index === 3 || index === 4){
						if(!values.every(value => isNaN(value))){
							sums[index] = values.reduce((prev, curr) => {
							const value = Number(curr);
							if (!isNaN(value)) {
								return prev + curr;
							} else {
								return prev;
							}
							}, 0);
						} else {
							sums[index] = '-';
						}
					} else {
						sums[index] = '-';
					}
				});
				return sums;
			},
			totalDialogClose(){
				this.checkTotalDialogVisible = false
			},
			checkTotalEvent(){
				var arr = []
				this.selectTableData.forEach((item) => {
					arr.push(item.id)
				})
				var paramobj = {
					ids: arr.join(',')
				}

				api.checkTotal(paramobj).then((response) => {
					this.checkTotalDialogVisible = true
					this.tableData3 = response.data.list
				})
			},
			selectChange(){
				this.tableParam.pageNo = 1
				this.getList()
			},
			searchInput(){
				this.tableParam.pageNo = 1
				this.getList()
			},
			getList(){
				api.checkList(this.tableParam).then((res) => {
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
			propEvent(id){
				this.dialogVisible = true
				api.checkDetail(id).then((res) => {
					console.log(res)
					this.tableData2 = res.data.list
					this.totalPage2 = res.data.total
					this.orderTime = res.data.orderTime
					this.creator = res.data.creator
				})
			},
			printEvent(){
				this.$print(this.$refs.checkedPrintWrap)
			},
			handleSizeChange(val){
				this.tableParam.pageSize = val
            	this.getList()
			},
			handleCurrentChange(val){
				this.tableParam.pageSize = val
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
		computed: {},
		created() {},
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
	.dialog_top{
		height: 57px;
		line-height: 57px;
	}
</style>