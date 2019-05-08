<template>
	<div>
		<div class="model_topcol">
			<span class="font600">货流管理</span>
			<span> - 调货</span>
		</div>
		<div class="model_content">
			<div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
				<div class="header_seach_wrap" style="padding: 15px">
                    <el-select filterable @change="inShopSelectChange" value-key="id" v-model="inShopData" placeholder="请选择进货门店">
						<el-option v-for="item in $store.state.home.shopList" :key="item.id" :label="item.name" :value="item"></el-option>
					</el-select>
					<el-select filterable @change="outShopSelectChange" value-key="id" v-model="outShopData" placeholder="请选择出货门店">
						<el-option v-for="item in $store.state.home.shopList" :key="item.id" :label="item.name" :value="item"></el-option>
					</el-select>
					<el-select filterable v-model="postData.shipStockPriceType" size="small" placeholder="请选择调货价格">
						<el-option v-for="(value, key) in $enum.shipStockPrice" :key="key" :label="value" :value="key">
						</el-option>
					</el-select>
				</div>
				<el-table
                    :data="tableData"
                    :height="$store.state.home.modelContentHeight - 138"
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
                        prop="skuItemBarcode"
                        label="条码"
                        >
                    </el-table-column>
					<el-table-column
                        prop="skuId"
                        label="商品编码"
                        >
                    </el-table-column>
					<el-table-column
                        prop="stockNum"
                        label="库存"
                        >
                    </el-table-column>
					<el-table-column
                        prop="cargoFlowNumber"
                        label="调货量"
                        >
						<template slot-scope="scope">
							<span v-text="scope.row.cargoFlowNumber"></span>
							<i @click="editCargoFlowNumberBtn(scope.row)" style="font-size: 18px; color: #409eff; cursor: pointer; margin-left: 10px;" class="el-icon-edit"></i>
						</template>
                    </el-table-column>
					<el-table-column
                        prop="unitName"
                        label="单位"
                        >
                    </el-table-column>
					<el-table-column
                        prop="unitPrice"
                        label="调货价(元)"
                        >
						<template slot-scope="scope">
							<el-input  @change.native="unitPriceKeyUp(scope.row)" @keyup.native="unitPriceKeyUp(scope.row)"  style="width: 100px" size="small" v-model="scope.row.unitPrice" placeholder="调货价"></el-input>
						</template>
                    </el-table-column>
					<el-table-column
                        prop="myTotal"
                        label="小计(元)"
                        >
                    </el-table-column>
					<el-table-column
                        prop="purchaseOrderNo"
                        width="150"
                        label="操作">
                        <template slot-scope="scope">
							<el-button
								@click="propEvent(scope)"
								type="text"
								size="small">
								删除
							</el-button>
                        </template>
                    </el-table-column>
				</el-table>
				<div class="footer_banner">
					<div style="display: inline-block; margin-right: 20px;">
						<el-upload
							class="upload-demo"
							:data="sendData"
							:action="uploadURL"
							:show-file-list="false"
							:file-list="fileList">
							<el-button size="small" type="primary">导入货单</el-button>
						</el-upload>
					</div>
					<el-button
						style="margin-right: 15px;"
						@click="chooseGoodBtn"
						type="text"
						size="small">
						选择商品
					</el-button>
					<el-input @change="hiddenInputChange" ref="hiddenInput" style="width: 0px; height: 0px; overflow: hidden" size="small" v-model="hiddenInputValue"></el-input>
					<el-checkbox @change="scanChangeEvent" v-model="isScanChecked">扫描模式</el-checkbox>
			</div>
			</div>
		</div>
		<div class="model_footer">
			<el-button @click="goBackEvent" size="small" style="width: 90px; margin-left: 25px;">返回</el-button>
			<el-button @click="sureInstockBtn" type="primary" size="small" style="width: 90px; margin-left: 25px;">确认调货</el-button>
		</div>

		<el-dialog
			title="选择商品"
			:visible.sync="dialogVisible"
			:close-on-click-modal="false"
			width="55%"
			>
				<div class="dialog_top">
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
					<el-select filterable clearable @change="goodSupplierSelectChange" v-model="tableParam.supplierIds" size="small" placeholder="全部供应商">
						<el-option v-for="item in suppllerList" :key="item.id" :label="item.supplierName" :value="item.id"></el-option>
					</el-select>
					<el-input clearable @change="goodSupplierSelectChange" style="width: 294px" size="small" v-model="tableParam.combinationStr" placeholder="请输入商品名称/条码"></el-input>
					<el-button style="margin-right: 20px;" type="primary" size="small">搜索</el-button>
				</div>
				<el-table
                    :data="goodsData"
					border
                    :height="405"
                    ref="outstockGoodTable"
					@selection-change="handleSelectionChange"
                    style="width: 100%">
					<el-table-column
                        type="selection"
                        :reserve-selection="true"
                        width="55">
                    </el-table-column>
					<el-table-column
                        prop="itemName"
						width="250"
                        label="商品名称"
                        >
                    </el-table-column>
					<el-table-column
                        prop="skuId"
                        label="商品编码"
                        >
                    </el-table-column>
					<el-table-column
                        prop="skuItemBarcode"
                        label="条码"
                        >
                    </el-table-column>
					<el-table-column
                        prop="stockNum"
                        label="库存"
                        >
                    </el-table-column>
					<el-table-column
                        prop="unitName"
                        label="单位"
                        >
                    </el-table-column>
				</el-table>
				<div style="height: 55px; border-top: none;" class="border">
					<el-pagination
						:current-page="tableParam.pageNo"
						:page-sizes="[15, 30, 50, 100]"
						:page-size="15"
						@size-change="handleSizeChange"
                		@current-change="handleCurrentChange"
						layout="total, sizes, prev, pager, next, jumper"
						:total="totalPage">
					</el-pagination>
				</div>
			<span slot="footer" class="dialog-footer">
				<el-button class="wid90" size="small" @click="dialogVisible = false">取消</el-button>
				<el-button class="wid90" size="small" type="primary" @click="chooseGoodSureBtn">确定</el-button>
			</span>
		</el-dialog>
		<el-dialog
			title="生产日期与调货量关系"
			:visible.sync="cargoDialogVisible"
			:close-on-click-modal="false"
			class="purchaseDetailDialog"
			width="650px"
			>
			<el-form :inline="true" class="myForm" label-position="right" size="small" label-width="90px">
				<div class="dialog_item" v-for="(item, index) in this.editTableData.cargoFlowNumList" :key="index">
					<el-form-item prop="massage" label="生产日期">
						<el-date-picker
							v-model="item.productionDate"
							value-format="timestamp"
							type="date"
							placeholder="选择日期">
						</el-date-picker>
					</el-form-item>
					<el-form-item prop="massage" label="对应调货量">
						<el-input @change.native="cargoFlowNumberItemKeyUp(item)" @keyup.native="cargoFlowNumberItemKeyUp(item)" v-model="item.cargoFlowNumber" placeholder="请输入对应调货量"></el-input>
					</el-form-item>
				</div>
				<div style="text-align: center; margin-top: 20px">
					<el-button @click="addCargoItemBtn" icon="el-icon-plus" class="wid90" size="small">添加一行</el-button>
				</div>
				
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button class="wid90" size="small" @click="cargoDialogVisible = false">取消</el-button>
				<el-button class="wid90" size="small" type="primary" @click="inStockSureEvent">确定</el-button>
			</span>
		</el-dialog>
		<el-dialog
			title="确认调货"
			:visible.sync="stockDialogVisible"
			:close-on-click-modal="false"
			class="purchaseDetailDialog"
			width="550px"
			>
			<el-form v-model="postData" label-position="right" size="small" label-width="90px">
				<div class="dialog_item">
					<el-form-item prop="cargoFlowRemark" label="备注">
						<el-input type="textarea" :rows="3" v-model="postData.cargoFlowRemark"></el-input>
					</el-form-item>
				</div>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="resinStockSureEvent(0)">通知收银端出库</el-button>
				<el-button size="small" type="primary" @click="resinStockSureEvent(1)">商品直接出库</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import api from 'api/stock'
	import capi from 'api/common'
	import gapi from 'api/good'
	export default {
		data() {
			return {
				isScanChecked: false,
				dialogVisible: false,
				cargoDialogVisible: false,
				stockDialogVisible: false,
				hiddenInputValue: '',
				inShopData: null,
				outShopData: null,
				suppllerList: [],
				tableData: [],
				goodsData: [],
				selectGoodsData: [],
				editTableData: {},
				sendData: {
					file: "",
					uploadType: 'erp'
				},
				uploadURL: this.$store.state.home.baseUrl + '/f/upload',
				fileList: [],
				mallList: [],
				categoryIdArr: [],
				categoryList: [],
				categoryOptionProps: {
					label:'categoryName',
					value:'id',
					children: 'categoryList'
				},
				totalPage: 10,
				tableParam: {
					combinationStr: '',
					purchaseDate: '',
					categoryIds: '',
					supplierIds: '',
					pageNo: 1,
					pageSize: 15
				},
				postData: {
					shipStockPriceType: '0',
					supplierId:'',
					supplierName: '',
					inShopId: '',
					inShopName: '',
					outShopId: '',
					outShopName: '',
					ownerShopId: this.$store.state.home.currentShop.id,
					ownerShopName: this.$store.state.home.currentShop.shopName,
					orderTime: Math.round(Date.parse(new Date()) / 1000),
					orderType: 3,
					totalNumber: '',
					totalMoney: '',
					cargoFlowRemark: ''
				}

			}
		},
		computed: {},
		methods: {
			cateSelectChange(){
				this.tableParam.categoryIds = this.categoryIdArr.join(',')
				this.tableParam.pageNo = 1
				this.getGoodList()
			},
			goodSupplierSelectChange(){
				this.tableParam.pageNo = 1
				this.getGoodList()
			},
			inShopSelectChange(){
				if (this.inShopData) {
					this.postData.inShopId = this.inShopData.id
					this.postData.inShopName = this.inShopData.name
				} else {
					this.postData.inShopId = ''
					this.postData.inShopName = ''
				}
			},
			outShopSelectChange(){
				if (this.outShopData) {
					this.postData.outShopId = this.outShopData.id
					this.postData.outShopName = this.outShopData.name
				} else{
					this.postData.outShopId = ''
					this.postData.outShopName = ''
				}
			},
			propEvent(data){
				this.tableData.splice(data.$index, 1)
				this.computeTotalNumber()
				this.computeTotalMoney()
			},
			getSupplierList(){
				capi.allSupplier().then((response) => {
					this.suppllerList = response.data
				})
			},
			getCategoryList(){
				capi.allCategory().then((response) => {
					this.categoryList = response.data
				})
			},
			unitPriceKeyUp(data){
				data.unitPrice = this.myBase.formatFloatTwo2(data.unitPrice)
				this.computeMyTotal(data)
				this.computeTotalMoney()
			},
			goBackEvent(){
				this.$router.push({
					path: '/logisticsManege'
				})
			},
			sureInstockBtn(){
				if (this.tableData.length <= 0) {
					this.$message({
						type: 'warning',
						duration: 1500,
						showClose: true,
						message: '请选择商品数据调货！'
					})
					return
				}
				
				this.stockDialogVisible = true
			},
			scanChangeEvent(value){
				this.hiddenInputValue = ""
				if (value) {
					this.$refs.hiddenInput.focus()
				} else {
					this.$refs.hiddenInput.blur()
				}
			},
			hiddenInputChange(value){
				if (this.hiddenInputValue != '') {
					this.tableParam.combinationStr = this.hiddenInputValue
					this.chooseGoodBtn()
				}
			},
			chooseGoodBtn(){
				this.dialogVisible = true
				this.getGoodList()
				this.$nextTick(() => {
					this.$refs.outstockGoodTable.clearSelection()
				})
			},
			getGoodList(){
				gapi.getSkuGoodsList(this.tableParam).then((response) => {
					this.goodsData = response.data.listData
					this.totalPage = response.data.totalCount
				})
			},
			handleSizeChange(val){
				this.tableParam.pageSize = val
				this.getGoodList()
			},
			handleCurrentChange(val){
				this.tableParam.pageNo = val
				this.getGoodList()
			},
			handleSelectionChange(val){
				this.selectGoodsData = val
			},
			chooseGoodSureBtn(){
				this.dialogVisible = false
				this.selectGoodsData.forEach((item) => {
					if (!this.isAddgood(item)) {
						this.$set(item, 'cargoFlowNumber', '1')
						this.$set(item, 'itemSkuId', item.skuId)
						this.$set(item, 'itemTypeId', item.categoryId)
						this.$set(item, 'itemTypeName', item.categoryName)
						this.$set(item, 'itemUnit', item.unitName)
						this.$set(item, 'myTotal', item.skuPurchasePrice)
						this.$set(item, 'unitPrice', item.skuPurchasePrice)
						this.tableData.push(item)
					}
				})
				this.computeTotalNumber()
				this.computeTotalMoney()
			},
			isAddgood(data){
				for(let item of this.tableData){
					if (item.skuId == data.skuId) {
						return true
					}
				}
				return false
			},
			editCargoFlowNumberBtn(row){
				this.cargoDialogVisible = true
				this.editTableData = row
				if (!row.cargoFlowNumList) {
					this.$set(row, 'cargoFlowNumList', [{productionDate: '', cargoFlowNumber: ''}])
				}
			},
			cargoFlowNumberItemKeyUp(data){
				data.cargoFlowNumber = this.myBase.formatIntNum(data.cargoFlowNumber)
				// this.computeMyTotal()
			},
			addCargoItemBtn(){
				this.editTableData.cargoFlowNumList.push({productionDate: '', cargoFlowNumber: ''})
			},
			inStockSureEvent(){
				this.editTableData.cargoFlowNumber = 0
				let resArr = this.editTableData.cargoFlowNumList.filter((item) => {
					if (item.cargoFlowNumber!= 0 && item.cargoFlowNumber != '') {
						this.editTableData.cargoFlowNumber = this.myBase.computeNumFormart(`${this.editTableData.cargoFlowNumber} + ${item.cargoFlowNumber}`)
						this.editTableData.cargoFlowNumber = parseInt(this.editTableData.cargoFlowNumber)
						return true
					}   
				})
				this.editTableData.cargoFlowNumList = resArr
				this.cargoDialogVisible = false
				this.computeMyTotal(this.editTableData)
				this.computeTotalNumber()
				this.computeTotalMoney()
			},
			resinStockSureEvent(status){
				let list = []
				this.postData.orderStatus = status
				this.tableData.forEach((item) => {
					if (item.cargoFlowNumList && item.cargoFlowNumList.length > 0) {
						let emptyDataTotalFlowNum = 0  //生产日期为空，合并为一条数据
						let giftFlg = false //赠送数量，只能加一个

						item.cargoFlowNumList.forEach((item1) => {
							//生产日期，入库量都有值
							if (item1.cargoFlowNumber && item1.cargoFlowNumber != '' && item1.cargoFlowNumber != '0' && item1.productionDate != '') {
								let itemdata = JSON.parse(JSON.stringify(item))

								itemdata.productionDate = item1.productionDate
								itemdata.productionDate = Math.round(itemdata.productionDate / 1000)
								itemdata.period = 7776000
								itemdata.cargoFlowNumber = item1.cargoFlowNumber

								itemdata.totalPrice = this.myBase.computeNumFormart(`${itemdata.unitPrice} * ${item1.cargoFlowNumber}`)
								if (giftFlg){
									itemdata.giftNumber = ''
								}
								giftFlg = true
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
							itemdata.totalPrice = this.myBase.computeNumFormart(`${itemdata.unitPrice} * ${emptyDataTotalFlowNum}`)
							if (giftFlg){
								itemdata.giftNumber = ''
							}
							giftFlg = true
							list.push(itemdata)
						}
					} else {
						let itemdata = JSON.parse(JSON.stringify(item))

						itemdata.totalPrice = item.myTotal
						list.push(itemdata)
					}
				})
				this.postData.list = list
				this.postData.orderTime = Math.round(Date.parse(new Date()) / 1000)
				api.addDisstockOrder([this.postData]).then((response) => {
					this.$message({
						type: 'success',
						duration: 1500,
						showClose: true,
						message: '调货成功！'
					})
					this.stockDialogVisible = false
					this.$router.push({
						path: '/logisticsManege'
					})
				})
			},
			computeMyTotal(data){
				data.myTotal = this.myBase.computeNumFormart(`${data.cargoFlowNumber} * ${data.unitPrice}`)
			},
			computeTotalNumber(){
				let totalNum = 0
				this.tableData.forEach((item) => {
					if (item.cargoFlowNumber){
						totalNum = this.myBase.computeNumFormart(`${totalNum} + ${item.cargoFlowNumber}`)
					}
				})
				totalNum = parseInt(totalNum)
				this.postData.totalNumber = totalNum
			},
			computeTotalMoney(){
				let totalMoney = 0
				this.tableData.forEach((item) => {
					if (item.myTotal){
						totalMoney = this.myBase.computeNumFormart(`${totalMoney} + ${item.myTotal}`)
					}
				})
				// totalMoney = parseInt(totalMoney)
				this.postData.totalMoney = totalMoney   
			},
			initData(){
				this.tableData = []
				this.postData.cargoFlowRemark = ''
				this.selectGoodsData = []
				this.inShopData = null
				this.outShopData = null
			}
		},
		created() {},
		activated() {
			this.initData()
			this.getSupplierList()
			this.getCategoryList()
		},
		mounted() {}
	}
</script>
<style scoped>
	.header_seach_wrap>div {
		margin-right: 10px;
	}
	.dialog_top>span {
		margin-right: 10px;
	}
	.dialog_top{
		margin-top: -15px; 
		margin-bottom: 15px;
	}
	.dialog_top>div{
		margin-right: 10px;
	}
	.footer_banner{
		height: 54px;
		background: #f5f5f5;
		line-height: 54px;
		padding-left: 40px;
	}
</style>