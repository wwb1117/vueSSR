<template>
    <div>
        <div class="model_topcol">
            <span class="font600">采购单</span>
            <span> - 采购单详情</span>
			<div>
				<el-button class="wid90" size="small">导出</el-button>
				<el-button @click="printEvent" class="wid90" size="small">打印</el-button>
			</div>
        </div>
        <div ref="purchaseDetailWrap" class="model_content">
            <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
               <div>
					<el-row class="header_tips">
						<el-col :span="5">
							<span class="color_gray">采购门店</span><span>{{purchaseData.buyerName}}</span>
						</el-col>
						<el-col :span="5">
							<span class="color_gray">供应商</span><span>{{purchaseData.sellerName}}</span>
						</el-col>
						<el-col :span="12">
							<span class="color_gray">采购备注</span><span>{{purchaseData.purchaseRemark}}</span>
						</el-col>
					</el-row>
			   </div>
			   <div>
				   <el-table
                    :data="tableData"
					:height="$store.state.home.modelContentHeight - 272"
                    ref="purchaseListTable"
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
							prop="itemSkuId"
							label="商品编码"
							>
						</el-table-column>
						<!-- <el-table-column
							prop="purchaseOrderNo"
							label="现有库存"
							>
						</el-table-column> -->
						<el-table-column
							prop="purchasingNumber"
							label="采购数量"
							>
						</el-table-column>
						<el-table-column
							prop="cargoFlowNumber"
							label="入库量"
							>
							<template slot-scope="scope">
								<div v-if="purchaseData.orderStatus == 0">
									<el-input v-if="!scope.row.flowNumDisabled"  @change.native="cargoFlowNumberKeyUp(scope.row)" @keyup.native="cargoFlowNumberKeyUp(scope.row)"  style="width: 100px" size="small" v-model="scope.row.cargoFlowNumber" placeholder="入库量"></el-input>
									<span v-if="scope.row.flowNumDisabled" v-text="scope.row.cargoFlowNumber"></span>
									<i @click="editCargoFlowNumberBtn(scope.row)" style="font-size: 18px; color: #409eff; cursor: pointer; margin-left: 10px;" class="el-icon-edit"></i>
								</div>
								<div v-if="purchaseData.orderStatus != 0">-</div>
							</template>
						</el-table-column>
						<el-table-column
							prop="inStockDif"
							label="入库差异"
							>
						</el-table-column>
						<el-table-column
							prop="purchaseUnitPrice"
							label="采购价"
							>
						</el-table-column>
						<el-table-column
							prop="purchaseTotalPrice"
							label="小计(元)"
							>
						</el-table-column>
					</el-table>
					<div class="footer_tips">
						<div style="float: right;">
							<span>共</span><span v-text="tableData.length"></span><span style="margin-right: 10px;">款商品</span>
							<span v-text="purchaseData.purchasingTotalNumber"></span><span style="margin-right: 10px;">件</span>
							<span style="margin-right: 10px;">总额：</span><span class="color_red">¥</span><span v-text="purchaseData.totalMoney" class="color_red"></span>
						</div>
					</div>
					<div>
						<el-row class="footer_title">
							<el-col :span="24">
								<span>制单时间：</span><span>{{purchaseData.orderTime | time_m}}</span>
							</el-col>
							<el-col :span="24">
								<span>采购单号：</span><span>{{purchaseData.purchaseOrderNo}}</span>
							</el-col>
							<el-col :span="24">
								<span>制单员：</span><span>{{purchaseData.creator}}</span>
							</el-col>
						</el-row>
					</div>
			   </div>
            </div>
        </div>
        <div class="model_footer">
            <el-button size="small" @click="goBackEvent" style="width: 90px; margin-left: 25px;">返回</el-button>
            <el-button v-if="purchaseData.orderStatus == 0" size="small" type="primary" @click="inStockBtnEvent" style="width: 90px; margin-left: 25px;">入库</el-button>
        </div>

		<el-dialog
			title="生产日期与入库量关系"
			:visible.sync="dialogVisible"
			:close-on-click-modal="false"
			class="purchaseDetailDialog"
			width="35%"
			>
			<el-form :inline="true" class="myForm" label-position="right" size="small" label-width="90px">
				<div class="dialog_item" v-for="(item, index) in this.editTableData.cargoFlowNumList" :key="index">
					<el-form-item prop="massage" label="生产日期">
						<el-date-picker
							v-model="item.productionDate"
							value-format="timestamp"
							@change="datePickerChangeEvent(item)"
							type="date"
							placeholder="选择日期">
						</el-date-picker>
					</el-form-item>
					<el-form-item prop="massage" label="对应入库量">
						<el-input @change.native="cargoFlowNumberItemKeyUp(item)" @keyup.native="cargoFlowNumberItemKeyUp(item)" v-model="item.cargoFlowNumber" placeholder="请输入对应入库量"></el-input>
					</el-form-item>
				</div>
				<div style="text-align: center; margin-top: 20px">
					<el-button @click="addCargoItemBtn" icon="el-icon-plus" class="wid90" size="small">添加一行</el-button>
				</div>
				
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button class="wid90" size="small" @click="dialogVisible = false">取消</el-button>
				<el-button class="wid90" size="small" type="primary" @click="inStockSureEvent">确定</el-button>
			</span>
		</el-dialog>
    </div>
</template>

<script>
import api from 'api/stock'
export default {
    data(){
        return {
			purchaseData: {},
			editTableData: {},
			dialogVisible: false,
			pageData: {},
			tableData: []
        }
    },
	computed:{},
	methods: {
		goBackEvent(){
			this.$router.push({
				path: '/purchaseList'
			})
		},
		getPurchaseDetail(){
			api.purchaseDetail(this.$store.state.home.pageData.id).then((response) => {
				this.purchaseData = response.data
				this.tableData = response.data.list
				this.tableData.forEach((item) => {
					this.$set(item, 'cargoFlowNumber', item.purchasingNumber)
					this.$set(item, 'inStockDif', '0')
					this.$set(item, 'flowNumDisabled', false)
				})
			})
		},
		printEvent(){
			this.$print(this.$refs.purchaseDetailWrap)
		},      
		inStockSureEvent(){
			this.editTableData.flowNumDisabled = true
			this.editTableData.cargoFlowNumber = 0
			let resArr = this.editTableData.cargoFlowNumList.filter((item) => {
				if (item.cargoFlowNumber!= 0 && item.cargoFlowNumber != '') {
					this.editTableData.cargoFlowNumber = this.myBase.computeNumFormart(`${this.editTableData.cargoFlowNumber} + ${item.cargoFlowNumber}`)
					this.editTableData.cargoFlowNumber = parseInt(this.editTableData.cargoFlowNumber)
					return true
				}   
			})
			this.editTableData.inStockDif = this.myBase.computeNumFormart(`${this.editTableData.purchasingNumber} - ${this.editTableData.cargoFlowNumber}`)
			this.editTableData.inStockDif = parseInt(this.editTableData.inStockDif)
			this.editTableData.cargoFlowNumList = resArr
			this.dialogVisible = false
			this.computeTotalPrice(this.editTableData)
			this.computeTotalIntockNum()
			this.computeTotalMoney()

		},
		inStockBtnEvent(){
			this.$confirm('您确定要商品入库操作吗？入库后，库存将发生变化。', '入库确认', {
				cancelButtonText: '取消',
				confirmButtonText: '确定',
				type: 'warning'
			}).then(() => {
				this.inStockEvent()
			}).catch(() => {
				this.$message({
					type: 'info',
					duration: 1500,
					showClose: true,
					message: '已取消'
				});
			});
		},
		inStockEvent(){
			let paramObj = JSON.parse(JSON.stringify(this.purchaseData))
			paramObj.supplierId = paramObj.sellerId
			paramObj.supplierName = paramObj.sellerName
			paramObj.ownerShopId = paramObj.buyerId
			paramObj.inShopId = paramObj.buyerId
			paramObj.inShopName = paramObj.buyerName
			paramObj.ownerShopName = paramObj.buyerName
			paramObj.orderType = 0
			let list = []
			let totalNumber = 0

			this.tableData.forEach((item) => {
				if (item.cargoFlowNumList && item.cargoFlowNumList.length > 0) {
					let emptyDataTotalFlowNum = 0  //生产日期为空，合并为一条数据

					item.cargoFlowNumList.forEach((item1) => {
						//生产日期，入库量都有值
						if (item1.cargoFlowNumber && item1.cargoFlowNumber != '' && item1.cargoFlowNumber != '0' && item1.productionDate != '') {
							let itemdata = JSON.parse(JSON.stringify(item))

							itemdata.productionDate = item1.productionDate
							itemdata.productionDate = Math.round(itemdata.productionDate / 1000)
							itemdata.period = 7776000
							itemdata.cargoFlowNumber = item1.cargoFlowNumber

							itemdata.unitPrice = item.purchaseUnitPrice
							itemdata.totalPrice = this.myBase.computeNumFormart(`${itemdata.unitPrice} * ${item1.cargoFlowNumber}`)

							list.push(itemdata)
						} 
						//生产日期无值，入库量有值
						if (item1.cargoFlowNumber && item1.cargoFlowNumber != '' && item1.cargoFlowNumber != '0' && item1.productionDate == '') {
							emptyDataTotalFlowNum = this.myBase.computeNumFormart(`${emptyDataTotalFlowNum} + ${item1.cargoFlowNumber}`)
							emptyDataTotalFlowNum = parseInt(emptyDataTotalFlowNum)
						}

					})

					if (emptyDataTotalFlowNum != 0) {
						let itemdata = JSON.parse(JSON.stringify(item))

						itemdata.cargoFlowNumber = emptyDataTotalFlowNum
						itemdata.unitPrice = item.purchaseUnitPrice
						itemdata.totalPrice = this.myBase.computeNumFormart(`${itemdata.unitPrice} * ${emptyDataTotalFlowNum}`)
						list.push(itemdata)
					}
				} else {
					let itemdata = JSON.parse(JSON.stringify(item))

					itemdata.unitPrice = item.purchaseUnitPrice
					itemdata.totalPrice = item.purchaseTotalPrice
					list.push(itemdata)
				}

				totalNumber = this.myBase.computeNumFormart(`${totalNumber} + ${item.cargoFlowNumber}`)
				totalNumber = parseInt(totalNumber)
			})

			paramObj.totalNumber = totalNumber
			paramObj.totalMoney = this.purchaseData.totalMoney
			paramObj.list = list

			api.purchaseInstock(paramObj).then((response) => {
				this.$message({
					type: 'success',
					duration: 1500,
					showClose: true,
					message: '入库成功！'
				})
				this.$router.push({
					path: '/purchaseList'
				})
			})

		},
		editCargoFlowNumberBtn(row){
			this.dialogVisible = true
			this.editTableData = row
			if (!row.cargoFlowNumList) {
				this.$set(row, 'cargoFlowNumList', [{productionDate: '', cargoFlowNumber: ''}])
			}
		},
		cargoFlowNumberKeyUp(data){
			data.cargoFlowNumber = this.myBase.formatIntNum(data.cargoFlowNumber)
			data.inStockDif = data.purchasingNumber - data.cargoFlowNumber
			this.computeTotalPrice(data)
			this.computeTotalIntockNum()
			this.computeTotalMoney()
		},
		computeTotalPrice(data){ //动态计算小计
			data.purchaseTotalPrice = this.myBase.computeNumFormart(`${data.cargoFlowNumber} * ${data.purchaseUnitPrice}`)
		},
		computeTotalIntockNum(){ //动态计算入库总数量
			let totalNumber = 0
			this.tableData.forEach((item) => {
				totalNumber = this.myBase.computeNumFormart(`${totalNumber} + ${item.cargoFlowNumber}`)
			})
			totalNumber = parseInt(totalNumber)
			this.$set(this.purchaseData, 'purchasingTotalNumber', totalNumber)
		},
		computeTotalMoney(){
			let totalMoney = 0
			this.tableData.forEach((item) => {
				totalMoney = this.myBase.computeNumFormart(`${totalMoney} + ${item.purchaseTotalPrice}`)
			})

			this.$set(this.purchaseData, 'totalMoney', totalMoney)
		},
		cargoFlowNumberItemKeyUp(data){
			data.cargoFlowNumber = this.myBase.formatIntNum(data.cargoFlowNumber)
		},
		addCargoItemBtn(){
			this.editTableData.cargoFlowNumList.push({productionDate: '', cargoFlowNumber: ''})
		},
		datePickerChangeEvent(data){
			
		}
	},
    created(){},
    activated(){
		this.pageData = this.$store.state.home.pageData
        this.getPurchaseDetail()
    },
    mounted(){
    }
}
</script>
<style scoped>
.header_tips{
	padding: 15px 0;
	padding-left: 20px;
}
.header_tips span{
	margin-left: 10px;
}
.footer_tips{
	width: 100%; 
	height: 47px; 
	line-height: 47px; 
	border-bottom: 1px solid #e4e8eb;
	font-size: 12px;
	padding-right: 20px;
}
.footer_title{
	padding: 15px 0;
	padding-left: 20px;
	height: 153px;
	background: #f5f5f5;
}
.footer_title span{
	line-height: 37px;
}
.purchaseDetailDialog >>> .el-dialog__body{
	padding: 0;
}
.dialog_item{
	padding-top: 17px;
	border-bottom: 1px solid #E4E7ED; 
}
</style>
