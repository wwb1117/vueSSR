<template>
	<div>
		<div class="model_topcol">
			<span class="font600">货流管理</span>
			<span> - 配货</span>
		</div>
		<div class="model_content">
			<div class="model_content_inner"
				:style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
				<div class="header_seach_wrap" style="padding: 15px">
					<label style="margin-right: 15px" v-text="$store.state.home.currentShop.shopName"></label>
					<!-- <el-select filterable @change="outShopSelectChange" value-key="id" v-model="outShopData" placeholder="请选择出货门店">
						<el-option v-for="item in $store.state.home.shopList" :key="item.id" :label="item.name" :value="item"></el-option>
					</el-select> -->
					<el-select filterable v-model="postData.shipStockPriceType" size="small" placeholder="请选择配货价格">
						<el-option v-for="(value, key) in $enum.shipStockPrice" :key="key" :label="value" :value="key">
						</el-option>
					</el-select>
				</div>
				<div class="tableTitle">
					<table>
						<tr style="padding-left: 10px">
							<td class="ta_col_01">序号</td>
							<td class="ta_col_02">商品名称</td>
							<td class="ta_col_03">条码</td>
							<td class="ta_col_04">商品编码</td>
							<td class="ta_col_05">供应商</td>
							<td class="ta_col_06">库存</td>
							<td class="ta_col_07">配货量</td>
							<td class="ta_col_08">单位</td>
							<td class="ta_col_09">配货价(元)</td>
							<td class="ta_col_10">小计(元)</td>
							<td class="ta_col_11">操作</td>
						</tr>
					</table>
				</div>
				<div class="waitMergeContent"
					:style="{height: $store.state.home.modelContentHeight - 178 + 'px', overflow: 'auto'}">
					<div class="waitMergeContent_wrap">
						<div class="positio_center" v-if="tableData.length == 0">
							暂无数据
						</div>
						<table v-for="(item1, index1) in tableData" :key="index1" class="waitMergeContent_item">
							<colgroup>
								<col class="ta_col_01">
								<col class="ta_col_02">
								<col class="ta_col_03">
								<col class="ta_col_04">
								<col class="ta_col_05">
								<col class="ta_col_06">
								<col class="ta_col_07">
								<col class="ta_col_08">
								<col class="ta_col_09">
								<col class="ta_col_10">
								<col class="ta_col_11">
							</colgroup>
							<tr class="table_item_title bder_bot">
								<td colspan="11">
									<div style="float: left">
										{{item1.name}}
									</div>
									<div style="float: right">
										商品种类:
										<span style="margin-right: 10px" v-text="item1.list.length"></span>
										数量:
										<span style="margin-right: 10px" v-text="item1.totalNumber"></span>
										总金额:
										<span style="margin-right: 10px" v-text="item1.totalMoney"></span>
									</div>
								</td>
							</tr>
							<tr v-for="(item2, index2) in item1.list" :key="index2" class="table_item_goods">
								<td class="bder_bot center">
									<div style="padding-left: 10px" v-text="index2 + 1"></div>
								</td>
								<td class="maxWord bder_bot center">
									<div class="maxWord" v-text="item2.itemName"></div>
								</td>
								<td class="bder_bot center">
									<div v-text="item2.skuItemBarcode"></div>
								</td>
								<td class="bder_bot center">
									<div v-text="item2.skuId"></div>
								</td>
								<td class="bder_bot center">
									<div v-text="item2.supplierName"></div>
								</td>
								<td class="bder_bot center">
									<div v-text="item2.stockNum"></div>
								</td>
								<td class="bder_bot center">
									<div>
										<el-input @change.native="cargoFlowNumberTableKeyUp(item2)" @keyup.native="cargoFlowNumberTableKeyUp(item2)" v-model="item2.cargoFlowNumber"></el-input>
									</div>
								</td>
								<td class="bder_bot center">
									<div v-text="item2.unitName"></div>
								</td>
								<td class="bder_bot center">
									<div>
										<el-input  @change.native="unitPriceTableKeyUp(item2)" @keyup.native="unitPriceTableKeyUp(item2)" v-model="item2.unitPrice"></el-input>
									</div>
								</td>
								<td class="bder_bot center">
									<div v-text="item2.totalPrice"></div>
								</td>
								<td class="bder_bot center">
									<el-button @click="preTableDelete(index1, index2)" type="text">删除</el-button>
								</td>
							</tr>
						</table>
					</div>

				</div>
				<div class="footer_banner">
					<div style="display: inline-block; margin-right: 20px;">
						<el-upload class="upload-demo" :data="sendData" :action="uploadURL" :show-file-list="false"
							:file-list="fileList">
							<el-button size="small" type="primary">导入货单</el-button>
						</el-upload>
					</div>
					<el-button style="margin-right: 15px;" @click="chooseGoodBtn" type="text" size="small">
						选择商品
					</el-button>
					<el-input @change="hiddenInputChange" ref="hiddenInput"
						style="width: 0px; height: 0px; overflow: hidden" size="small" v-model="hiddenInputValue">
					</el-input>
					<el-checkbox @change="scanChangeEvent" v-model="isScanChecked">扫描模式</el-checkbox>
				</div>
			</div>
		</div>
		<div class="model_footer">
			<el-button @click="goBackEvent" size="small" style="width: 90px; margin-left: 25px;">返回</el-button>
			<el-button @click="sureInstockBtn" type="primary" size="small" style="width: 90px; margin-left: 25px;">确认配货
			</el-button>
		</div>

		<el-dialog title="选择商品" :visible.sync="dialogVisible" :close-on-click-modal="false" width="55%">
			<div class="dialog_top">
				<el-cascader placeholder="请选择商品分类" clearable @change="cateSelectChange" v-model="categoryIdArr"
					:options="categoryList" change-on-select :props='categoryOptionProps' size='small'>
				</el-cascader>
				<el-select filterable clearable @change="goodSupplierSelectChange" v-model="tableParam.supplierIds"
					size="small" placeholder="全部供应商">
					<el-option v-for="item in suppllerList" :key="item.id" :label="item.supplierName"
						:value="item.id"></el-option>
				</el-select>
				<el-input clearable @change="goodSupplierSelectChange" style="width: 294px" size="small"
					v-model="tableParam.combinationStr" placeholder="请输入商品名称/条码"></el-input>
				<el-button @click="goodSupplierSelectChange" style="margin-right: 20px;" type="primary" size="small">搜索
				</el-button>
			</div>
			<el-table :data="goodsData" border :height="405" ref="instockGoodTable" style="width: 100%">
				<el-table-column prop="itemName" width="250" label="商品名称">
				</el-table-column>
				<el-table-column prop="skuId" label="商品编码">
				</el-table-column>
				<el-table-column prop="skuItemBarcode" label="条码">
				</el-table-column>
				<el-table-column prop="stockNum" label="库存">
				</el-table-column>
				<el-table-column prop="unitName" label="单位">
				</el-table-column>
				<el-table-column prop="prop" label="操作" width="70">
					<template slot-scope="scope">
						<el-button @click="goodTablePropEvent(scope.row)" type="text" size="small">
							配货
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div style="height: 55px; border-top: none;" class="border">
				<el-pagination :current-page="tableParam.pageNo" :page-sizes="[15, 30, 50, 100]" :page-size="15"
					@size-change="handleSizeChange" @current-change="handleCurrentChange"
					layout="total, sizes, prev, pager, next, jumper" :total="totalPage">
				</el-pagination>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button class="wid90" size="small" @click="dialogVisible = false">取消</el-button>
				<el-button class="wid90" size="small" type="primary" @click="dialogVisible = false">确定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="生产日期与配货量关系" :visible.sync="cargoDialogVisible" :close-on-click-modal="false"
			class="purchaseDetailDialog" width="650px">
			<el-form :inline="true" class="myForm" label-position="right" size="small" label-width="90px">
				<div class="dialog_item" v-for="(item, index) in this.editTableData.cargoFlowNumList" :key="index">
					<el-form-item prop="massage" label="生产日期">
						<el-date-picker v-model="item.productionDate" value-format="timestamp" type="date"
							placeholder="选择日期">
						</el-date-picker>
					</el-form-item>
					<el-form-item prop="massage" label="对应配货量">
						<el-input @change.native="cargoFlowNumberItemKeyUp(item)"
							@keyup.native="cargoFlowNumberItemKeyUp(item)" v-model="item.cargoFlowNumber"
							placeholder="请输入对应配货量"></el-input>
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

		<el-dialog title="确认配货" :visible.sync="stockDialogVisible" :close-on-click-modal="false"
			class="purchaseDetailDialog" width="550px">
			<div style="border-bottom: 1px dashed #e4e8eb" v-for="(item, index) in tableData" :key="index">
				<p v-text="item.name"></p>
				<p>
					商品种类: <span style="margin-right: 10px" v-text="item.list.length"></span>
					数量: <span style="margin-right: 10px" v-text="item.totalNumber"></span>
					总金额: <span style="margin-right: 10px" v-text="item.totalMoney"></span>
				</p>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="resinStockSureEvent(0)">通知收银端入库</el-button>
				<el-button size="small" type="primary" @click="resinStockSureEvent(1)">商品直接入库</el-button>
			</span>
		</el-dialog>
		<el-dialog title="配货操作" :visible.sync="preShopDialogVisible" :close-on-click-modal="false" width="55%">
			<div class="dialog_top">
				<el-input clearable @change="getShopsTableData" style="width: 294px" size="small"
					v-model="tableParam.combinationStr" placeholder="请输入门店关键字筛选门店"></el-input>
				<el-button @click="getShopsTableData" style="margin-right: 20px;" type="primary" size="small">搜索
				</el-button>
			</div>
			<el-table :data="shopsData" border :height="405" style="width: 100%">
				<el-table-column prop="name" width="250" label="店铺名称">
				</el-table-column>
				<el-table-column prop="itemNo" label="现有库存">
				</el-table-column>
				<el-table-column prop="cargoFlowNumber" label="配货量">
					<template slot-scope="scope">
						<el-input @change.native="countUnitNumEvent(scope.row)"
							@keyup.native="countUnitNumEvent(scope.row)" v-model="scope.row.cargoFlowNumber">
						</el-input>
					</template>
				</el-table-column>
				<el-table-column prop="unitPrice" label="配货价">
					<template slot-scope="scope">
						<el-input @change.native="preUnitPriceKeyUp(scope.row)"
							@keyup.native="preUnitPriceKeyUp(scope.row)" style="width: 100px" size="small"
							v-model="scope.row.unitPrice" placeholder="配货价"></el-input>
					</template>
				</el-table-column>
			</el-table>
			<span slot="footer" class="dialog-footer">
				<el-button class="wid90" size="small" @click="preShopDialogVisible = false">取消</el-button>
				<el-button class="wid90" size="small" type="primary" @click="preToShopsBtn">加入</el-button>
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
				preShopDialogVisible: false,
				hiddenInputValue: '',
				suppllerList: [],
				outShopData: null,
				shopsData: [],
				shopList: [],
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
					label: 'categoryName',
					value: 'id',
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
				perGoodData: {},
				postData: {
					shipStockPriceType: '',
					outShopId: this.$store.state.home.currentShop.id,
					outShopName: this.$store.state.home.currentShop.shopName,
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
			cargoFlowNumberTableKeyUp(data){
				data.cargoFlowNumber = this.myBase.formatIntNum(data.cargoFlowNumber)
				this.computeTableTotal()
			},
			unitPriceTableKeyUp(data){
				data.unitPrice = this.myBase.formatFloatTwo2(data.unitPrice)
				this.computeTableTotal()
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
			preTableDelete(index1, index2){
				this.tableData[index1].list.splice(index2, 1)
				this.computeTableTotal()
			},
			countUnitNumEvent(data) {
				let res = this.myBase.formatIntNum(data.cargoFlowNumber)
				this.$set(data, 'cargoFlowNumber', res)
			},
			preUnitPriceKeyUp(data) {
				let res = this.myBase.formatFloatTwo2(data.unitPrice)
				this.$set(data, 'unitPrice', res)
			},
			computeTableTotal(){
				this.tableData.forEach((item, index) => {
					let totalNumber = ''
					let totalMoney = ''
					if (item.list && item.list.length > 0){
						item.list.forEach((item1, index1) => {
							totalNumber = this.myBase.computeNumFormart(`${totalNumber} + ${item1.cargoFlowNumber}`)
							let total = this.myBase.computeNumFormart(`${item1.cargoFlowNumber} * ${item1.unitPrice}`)

							totalMoney = this.myBase.computeNumFormart(`${totalMoney} + ${total}`)
							this.$set(item1, 'totalPrice', total)
						})
					}
					this.$set(item, 'totalNumber', parseInt(totalNumber))
					this.$set(item, 'totalMoney', totalMoney)
				})
			},
			preToShopsBtn() {
				this.shopsData.forEach((item, index) => {
					let flg1 = item.cargoFlowNumber && item.cargoFlowNumber != '0'
					let flg2 = item.unitPrice && item.unitPrice != '0'
					let perGoodData = JSON.parse(JSON.stringify(this.perGoodData))

					if (flg1 && flg2) {
						this.$set(perGoodData, 'cargoFlowNumber', item.cargoFlowNumber)
						this.$set(perGoodData, 'unitPrice', item.unitPrice)
						let obj = JSON.parse(JSON.stringify(item))
						let shopData = this.isAddShops(obj)

						if (shopData) { //门店是否已加入
							let goodData = this.isAddGood(shopData, perGoodData)
							if (goodData) { //商品是否已加入
								console.log("yijiaru")
							} else {
								shopData.list.push(perGoodData)
							}
						} else {
							let arr = [perGoodData]
							this.$set(obj, 'list', arr)
							this.tableData.push(obj)
						}
					}
				})
				this.computeTableTotal()
				console.log(this.tableData)
				this.preShopDialogVisible = false
			},
			isAddShops(shopData) {
				for (let item of this.tableData) {
					if (item.id == shopData.id) {
						return item
					}
				}
				return false
			},
			isAddGood(shopData, goodData) {
				if (shopData.list) {
					for (let item of shopData.list) {
						if (item.skuId == goodData.skuId) {
							return item
						}
					}
					return false
				}
			},
			getShopList() {
				capi.allShops().then((res) => {
					this.shopList = res.data
				})
			},
			getShopsTableData() {
				capi.allShops().then((res) => {
					this.shopsData = res.data
					this.shopsData.forEach((item) => {
						this.$set(item, 'unitPrice', this.perGoodData.skuPurchasePrice)
						this.$set(item, 'cargoFlowNumber', '')
					})
				})
			},
			goodTablePropEvent(row) {
				this.perGoodData = row
				this.preShopDialogVisible = true
				this.getShopsTableData()
			},
			cateSelectChange() {
				this.tableParam.categoryIds = this.categoryIdArr.join(',')
				this.tableParam.pageNo = 1
				this.getGoodList()
			},
			goodSupplierSelectChange() {
				this.tableParam.pageNo = 1
				this.getGoodList()
			},
			getSupplierList() {
				capi.allSupplier().then((response) => {
					this.suppllerList = response.data
				})
			},
			getCategoryList() {
				capi.allCategory().then((response) => {
					this.categoryList = response.data
				})
			},
			goBackEvent() {
				this.$router.push({
					path: '/logisticsManege'
				})
			},
			sureInstockBtn() {
				if (this.tableData.length <= 0) {
					this.$message({
						type: 'warning',
						duration: 1500,
						showClose: true,
						message: '请选择商品数据配货！'
					})
					return
				}
				this.stockDialogVisible = true
			},
			scanChangeEvent(value) {
				this.hiddenInputValue = ""
				if (value) {
					this.$refs.hiddenInput.focus()
				} else {
					this.$refs.hiddenInput.blur()
				}
			},
			hiddenInputChange(value) {
				if (this.hiddenInputValue != '') {
					this.tableParam.combinationStr = this.hiddenInputValue
					this.chooseGoodBtn()
				}
			},
			chooseGoodBtn() {
				this.dialogVisible = true
				this.getGoodList()
			},
			getGoodList() {
				gapi.getSkuGoodsList(this.tableParam).then((response) => {
					this.goodsData = response.data.listData
					this.totalPage = response.data.totalCount
				})
			},
			handleSizeChange(val) {
				this.tableParam.pageSize = val
				this.getGoodList()
			},
			handleCurrentChange(val) {
				this.tableParam.pageNo = val
				this.getGoodList()
			},
			isAddgood(data) {
				for (let item of this.tableData) {
					if (item.itemSkuId == data.itemSkuId) {
						return true
					}
				}
				return false
			},
			cargoFlowNumberItemKeyUp(data) {
				data.cargoFlowNumber = this.myBase.formatIntNum(data.cargoFlowNumber)
				// this.computeMyTotal()
			},
			addCargoItemBtn() {
				this.editTableData.cargoFlowNumList.push({
					productionDate: '',
					cargoFlowNumber: ''
				})
			},
			inStockSureEvent() {
				this.editTableData.cargoFlowNumber = 0
				let resArr = this.editTableData.cargoFlowNumList.filter((item) => {
					if (item.cargoFlowNumber != 0 && item.cargoFlowNumber != '') {
						this.editTableData.cargoFlowNumber = this.myBase.computeNumFormart(
							`${this.editTableData.cargoFlowNumber} + ${item.cargoFlowNumber}`)
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
			resinStockSureEvent(status) {
				let list = []
				this.postData.orderStatus = status
				this.postData.orderTime = Math.round(Date.parse(new Date()) / 1000)
				this.tableData.forEach((item) => {
					let postData = JSON.parse(JSON.stringify(this.postData))
					let itemdata = JSON.parse(JSON.stringify(item))

					// postData.ownerShopId = itemdata.id
					// postData.ownerShopName = itemdata.name
					postData.inShopId = itemdata.id
					postData.inShopName = itemdata.name
					postData.totalNumber = itemdata.totalNumber
					postData.totalMoney = itemdata.totalMoney
					if (itemdata.list && itemdata.list.length > 0) {
						itemdata.list.forEach((item, index) => {
							this.$set(item, 'itemSkuId', item.skuId)
							this.$set(item, 'itemTypeId', item.categoryId)
							this.$set(item, 'itemTypeName', item.categoryName)
							this.$set(item, 'itemUnit', item.unitName)
						})
					}
					postData.list = itemdata.list
					
					list.push(postData)
				})
				// this.postData.list = list
				
				api.addDisstockOrder(list).then((response) => {
					this.$message({
						type: 'success',
						duration: 1500,
						showClose: true,
						message: '配货成功！'
					})
					this.stockDialogVisible = false
					this.$router.push({
						path: '/logisticsManege'
					})
				})
			},
			computeMyTotal(data) {
				data.myTotal = this.myBase.computeNumFormart(`${data.cargoFlowNumber} * ${data.unitPrice}`)
			},
			computeTotalNumber() {
				let totalNum = 0
				this.tableData.forEach((item) => {
					if (item.cargoFlowNumber) {
						totalNum = this.myBase.computeNumFormart(`${totalNum} + ${item.cargoFlowNumber}`)
					}
				})
				totalNum = parseInt(totalNum)
				this.postData.totalNumber = totalNum
			},
			computeTotalMoney() {
				let totalMoney = 0
				this.tableData.forEach((item) => {
					if (item.myTotal) {
						totalMoney = this.myBase.computeNumFormart(`${totalMoney} + ${item.myTotal}`)
					}
				})
				// totalMoney = parseInt(totalMoney)
				this.postData.totalMoney = totalMoney
			},
			initData() {
				this.tableData = []
				this.postData.cargoFlowRemark = ''
				this.postData.prepayMoney = ''
				this.outShopData = null
			}
		},
		created() {},
		activated() {
			this.initData()
			this.getSupplierList()
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

	.dialog_top>span {
		margin-right: 10px;
	}

	.dialog_top {
		margin-top: -15px;
		margin-bottom: 15px;
	}

	.dialog_top>div {
		margin-right: 10px;
	}

	.footer_banner {
		height: 54px;
		background: #f5f5f5;
		line-height: 54px;
		padding-left: 40px;
	}

	.tableTitle {
		font-weight: bold;
		font-size: 12px;
		color: #606266;
		background: #F5F5F5;
		height: 40px;
		line-height: 40px;
		padding: 0 10px;
		padding-right: 30px;
	}

	.tableTitle .el-col {
		padding: 0 20px;
	}

	.waitMergeContent {
		padding: 10px;
	}

	.waitMergeContent_wrap {
		font-size: 12px;
		position: relative;
		height: 100%;
	}

	.waitMergeContent_item {
		width: 100%;
		margin-bottom: 10px;
		border: 1px solid #DCDFE6;
		table-layout: fixed;
	}

	.ta_col_01 {
		width: 3%;
		text-align: center;
	}

	.ta_col_02 {
		width: 14%;
		text-align: center;
	}

	.ta_col_03 {
		width: 10%;
		text-align: center;
	}

	.ta_col_04 {
		width: 10%;
		text-align: center;
	}

	.ta_col_05 {
		width: 6%;
		text-align: center;
	}

	.ta_col_06 {
		width: 6%;
		text-align: center;
	}

	.ta_col_07 {
		width: 6%;
		text-align: center;
	}

	.ta_col_08 {
		width: 6%;
		text-align: center;
	}

	.ta_col_09 {
		width: 6%;
		text-align: center;
	}

	.ta_col_10 {
		width: 6%;
		text-align: center;
	}

	.ta_col_11 {
		width: 6%;
		text-align: center;
	}

	.border_all {
		border: 1px solid #DCDFE6;
	}

	.bder_bot {
		border-bottom: 1px solid #DCDFE6;
	}

	.bder_top {
		border-top: 1px solid #DCDFE6;
	}

	.bder_left {
		border-left: 1px solid #DCDFE6;
	}

	.bder_right {
		border-left: 1px solid #DCDFE6;
	}

	.center {
		text-align: center;
	}

	.tableTitle .el-col {
		padding: 0 20px;
	}

	.tableTitle table {
		width: 100%;
	}

	.positio_center {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		width: 100px;
		height: 100px;
		color: #909399;
	}

	.table_item_title td {
		font-size: 14px;
		background: #F5F5F5;
		height: 40px;
		padding: 0 10px;
	}
	.table_item_goods td{
		padding: 8px 0;
	}
</style>