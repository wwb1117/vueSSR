<template>
	<div>
		<div class="model_topcol">
			<span>供应商结算</span>
		</div>
		<div class="model_content">
			<div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
				<div class="header_seach_wrap" style="padding: 15px; border-bottom: 1px solid #e4e8eb;">
					<el-select clearable @change="searchInputClear" filterable v-model="tableParam.shopId" size="small" placeholder="请选择门店">
						<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
					<el-select clearable @change="searchInputClear" filterable v-model="tableParam.supplierId" size="small" placeholder="请选择供应商">
						<el-option v-for="item in suppllerList" :key="item.id" :label="item.supplierName" :value="item.id"></el-option>
					</el-select>
					<el-select filterable  clearable @change="searchInputClear" v-model="tableParam.clearStatus" size="small" placeholder="请选择货单状态">
						<el-option v-for="(value, key) in $enum.supplierSumStaus" :key="key" :label="value" :value="key">
						</el-option>
					</el-select>
					<el-date-picker size="small" clearable @change="datePickerChangeEvent" v-model="timer" value-format="timestamp" type="daterange" :editable="false" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
					<el-input prefix-icon="el-icon-search" @change="searchInputClear" clearable style="width: 294px" size="small" v-model="tableParam.cargoFlowNo" placeholder="货流单号"></el-input>
					<el-button type="primary" size="small" @click="searchInputClear">搜索</el-button>
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
                            <el-button v-perss='124' @click="sureCheckEvent" type="primary" class="wid90" size="small">确认对账</el-button>
                            <el-button v-perss='125' @click="sureCheckTotalEvent" type="primary" class="wid90" size="small">确认结算</el-button>
                        </li>
                    </ul>
                </div>
				<el-table
                    :data="tableData"
					ref="supplierSummaryTable"
                    :height="tableHeight"
					@selection-change="handleSelectionChange"
                    style="width: 100%">
					<el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
					<el-table-column
                        prop="supplierName"
                        label="供应商"
                        >
                    </el-table-column>
					<el-table-column
                        prop="shopName"
                        label="门店"
                        >
                    </el-table-column>
					<el-table-column
                        prop="cargoFlowNo"
                        label="货流单号"
                        >
                    </el-table-column>
					<el-table-column
                        label="下单时间"
						>
						<template slot-scope="scope">
							<span>{{scope.row.orderTime | time_m}}</span>
						</template>
                    </el-table-column>
					<el-table-column
                        label="货单类型"
						>
						<template slot-scope="scope">
							<span v-if='scope.row.orderType == 0'>进货</span>
							<span v-if='scope.row.orderType == 1'>退货</span>
						</template>
                    </el-table-column>
					<el-table-column
                        prop="totalNumber"
                        label="货流量"
                        >
                    </el-table-column>
					<el-table-column
                        prop="totalPrice"
                        label="总价(元)"
                        >
                    </el-table-column>
					<el-table-column
                        prop="prepayMoney"
                        label="预付款(元)"
                        >
                    </el-table-column>
					<el-table-column
                        label="状态"
						>
						<template slot-scope="scope">
							<span v-if='scope.row.clearStatus == 0'>未成功货单</span>
							<span v-if='scope.row.clearStatus == 1'>待对账货单</span>
							<span v-if='scope.row.clearStatus == 2'>待结算货单</span>
							<span v-if='scope.row.clearStatus == 3'>已结算货单</span>
						</template>
                    </el-table-column>
					<el-table-column
                        prop="clearRemark"
                        label="备注"
                        >
                    </el-table-column>
					<el-table-column
                        label="操作"
                        >
						<template slot-scope="scope">
							<el-button
								@click="propEvent(scope.row.cargoFlowNo)"
								type="text"
								size="small">
								详情
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
			title="货单明细"
			:visible.sync="dialogVisible"
			:close-on-click-modal="false"
			width="55%"
			>
				<el-table
                    :data="tableData2"
					border
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
                        label="商品名称"
                        >
                    </el-table-column>
					<el-table-column
                        prop="itemMac"
						label="条码"
						width='130'
                        >
                    </el-table-column>
					<el-table-column
                        prop="itemUnit"
                        label="单位"
                        >
                    </el-table-column>
					<el-table-column
                        prop="cargoFlowNumber"
                        label="货流量"
                        >
                    </el-table-column>
					<el-table-column
                        prop="cargoFlowNumber"
                        label="实收量"
                        >
					</el-table-column>
					<el-table-column
                        prop="unitPrice"
                        label="单价(元)"
                        >
					</el-table-column>
					<el-table-column
                        prop="totalPrice"
                        label="小计(元)"
                        >
                    </el-table-column>
				</el-table>
			<span slot="footer" class="dialog-footer">
				<el-button class="wid90" size="small" type="primary" @click="dialogVisible = false">确定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="确认对账" :visible.sync="sureCheckVisible" :close-on-click-modal="false"
			class="purchaseDetailDialog" width="30%">
			<div style="border-bottom: 1px dashed #e4e8eb; margin-bottom: 20px">
				<p>
					货单数: <span style="margin-right: 10px" v-text="checkData.caflowNum"></span>
					商品种类: <span style="margin-right: 10px" v-text="checkData.goodNum"></span>
					总价: <span style="margin-right: 10px" v-text="checkData.total"></span>
				</p>
			</div>
			<label>备注：</label>
			<el-input
				type="textarea"
				:rows="3"
				placeholder="请输入备注内容"
				v-model="checkData.clearRemark">
			</el-input>
			<span slot="footer" class="dialog-footer">
				<el-button class="wid90" size="small" @click="sureCheckVisible = false">取消</el-button>
				<el-button @click="resSureCheckEvent" size="small" type="primary">确认对账</el-button>
			</span>
		</el-dialog>
		<el-dialog title="确认结算" :visible.sync="sureCheckTotalVisible" :close-on-click-modal="false"
			class="purchaseDetailDialog" width="30%">
			<div style="border-bottom: 1px dashed #e4e8eb; margin-bottom: 20px">
				<p>
					货单数: <span style="margin-right: 10px" v-text="checkData.caflowNum"></span>
					商品种类: <span style="margin-right: 10px" v-text="checkData.goodNum"></span>
					总价: <span style="margin-right: 10px" v-text="checkData.total"></span>
				</p>
			</div>
			<el-input
				type="text"
				@change.native="unitResTotalKeyUp(checkData)" @keyup.native="unitResTotalKeyUp(checkData)"
				:rows="3"
				placeholder="实付"
				v-model="checkData.resTotal">
				<template slot="prepend">实付：</template>
			</el-input>
			<label style="margin: 10px 0">备注：</label>
			<el-input
				type="textarea"
				:rows="3"
				placeholder="请输入备注内容"
				v-model="checkData.clearRemark">
			</el-input>
			<span slot="footer" class="dialog-footer">
				<el-button class="wid90" size="small" @click="sureCheckTotalVisible = false">取消</el-button>
				<el-button @click="resSureCheckTotalEvent" size="small" type="primary">确认结算</el-button>
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
				dialogVisible:false,
				sureCheckVisible: false,
				sureCheckTotalVisible: false,
				checkData: {
					caflowNum: '',
					goodNum: '',
					total: '',
					preTotal: '',
					resTotal: '',
					clearRemark: ''
				},
				tableData2:[],
				tableData: [],
				tableHeight: this.$store.state.home.modelContentHeight - 86,
				options:[],
				selectTableData: [],
				suppllerList: [],
				totalPage: 10,
				isTableChecked: false,
				timer:[],
				tableParam: {
					cargoFlowNo:'',
					shopId: '',
					supplierId: '',
					clearStatus:'',
					pageNo: 1,
					pageSize: 15
				}
			}
		},
		methods: {
			unitResTotalKeyUp(data){
				data.resTotal = this.myBase.formatFloatTwo2(data.resTotal)
			},
			resSureCheckEvent(){
				let resArr = []

				this.selectTableData.forEach((item) => {
					let obj = {}
					obj.id = item.id
					obj.clearStatus = 2
					obj.clearRemark = this.checkData.clearRemark
					resArr.push(obj)
				})

				api.stockClearAgree(resArr).then((response) => {
					this.$message({
						type: 'success',
						duration: 1500,
						showClose: true,
						message: '对账成功！'
					})
					this.sureCheckVisible = false
					this.$refs.supplierSummaryTable.clearSelection()
				})
			},
			resSureCheckTotalEvent(){
				let resArr = []

				this.selectTableData.forEach((item) => {
					let obj = {}
					obj.id = item.id
					obj.clearStatus = 3
					obj.clearRemark = this.checkData.clearRemark
					if (this.checkData.resTotal != '') {
						obj.receivedPrice = this.myBase.computeNumFormart(`${this.checkData.resTotal} / ${this.selectTableData.length}`)
					} else{
						obj.receivedPrice = ''
					}
					resArr.push(obj)
				})

				api.stockClearAgree(resArr).then((response) => {
					this.$message({
						type: 'success',
						duration: 1500,
						showClose: true,
						message: '结算成功！'
					})
					this.sureCheckTotalVisible = false
					this.$refs.supplierSummaryTable.clearSelection()
				})
			},
			sureCheckEvent(){
				if (this.isCheckStatus(1)) {
					this.computeCheckTable()
					this.sureCheckVisible = true
				} else {
					this.$message({
						type: 'warning',
						duration: 1500,
						showClose: true,
						message: '请选择待对账货单进行操作！'
					})
				}
			},
			sureCheckTotalEvent(){
				if (this.isCheckStatus(2)) {
					this.computeCheckTable()
					this.sureCheckTotalVisible = true
				} else {
					this.$message({
						type: 'warning',
						duration: 1500,
						showClose: true,
						message: '请选择待结算货单进行操作！'
					})
				}
			},
			computeCheckTable(){
				this.checkData.caflowNum = this.selectTableData.length
				let goodNum = ''
				let total = ''
				let preTotal = ''
				let resTotal = ''
				this.selectTableData.forEach((item) => {
					goodNum = this.myBase.computeNumFormart(`${goodNum} + ${item.totalNumber}`)
					total = this.myBase.computeNumFormart(`${total} + ${item.totalPrice}`)
					preTotal = this.myBase.computeNumFormart(`${preTotal} + ${item.prepayMoney}`)
				})
				goodNum = parseInt(goodNum)
				resTotal = this.myBase.computeNumFormart(`${total} - ${preTotal}`)

				this.checkData.goodNum = goodNum
				this.checkData.total = total
				this.checkData.preTotal = preTotal
				this.checkData.resTotal = resTotal
				this.checkData.clearRemark = ''
			},
			isCheckStatus(type){
				let flg = true
				this.selectTableData.forEach((item) => {
					if (item.clearStatus != type) {
						flg = false
					}
				})
				return flg
			},
			//所有门店
			allShops(){
				api2.allShops().then((res) => {
					this.options = res.data
				})
			},
			getSupplierSelectList(){
				api2.allSupplier().then((response) => {
					this.suppllerList = response.data
				})
			},
			searchInputClear(){
				this.tableParam.pageNo = 1
            	this.getSupplierList()
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
				this.getSupplierList()
			},
			getSupplierList(){
				api.stockClearList(this.tableParam).then((res) => {
					this.tableData = res.data.list
					this.totalPage = res.data.total
				})
			},
			propEvent(id){
				console.log(id)
				this.dialogVisible = true
				api.stockClearDetail(id).then((res) => {
					this.tableData2 = res.data.list
				})
			},
			handleSelectionChange(arr){
				this.selectTableData = arr
				if (arr.length > 0) {
					this.isTableChecked = true
					this.tableHeight = this.$store.state.home.modelContentHeight - 149
				} else {
					this.isTableChecked = false
					this.tableHeight = this.$store.state.home.modelContentHeight - 86
				}
			},
			closeExportWrap(){
				this.isTableChecked = false
            	this.$refs.supplierSummaryTable.clearSelection()
			},
			handleSizeChange(val){
				this.tableParam.pageSize = val
            	this.getSupplierList()
			},
			handleCurrentChange(val){
				this.tableParam.pageNo = val
            	this.getSupplierList()
			},
			getSummaries(param) {
				const { columns, data } = param;
				const sums = [];
				columns.forEach((column, index) => {
				if (index === 0) {
					sums[index] = '合计';
					return;
				}
				const values = data.map(item => Number(item[column.property]));
				if(index === 6 || index === 7 || index === 4  || index === 5){
					if(!values.every(value => isNaN(value))){
						sums[index] = values.reduce((prev, curr) => {
						const value = Number(curr);
						if (!isNaN(value)) {
							// return prev + curr;
							return this.myBase.computeNumFormart(`${prev} + ${curr}`)
						} else {
							return prev;
						}
						}, 0);
						// sums[index] += ' 元';
					} else {
						sums[index] = '-';
					}
				} else {
					sums[index] = '-';
				}
				});
				return sums;
			}
		},
		computed: {},
		created() {},
		activated() {
			this.getSupplierList()
			this.allShops()
			this.getSupplierSelectList()
		},
		mounted() {}
	}
</script>
<style scoped>
	.header_seach_wrap>div {
		margin-right: 10px;
	}
	.title_tips_wrap{
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