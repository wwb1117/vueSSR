<template>
	<div>
		<div class="model_topcol">
			<span class="font600">商品报损</span>
			<span> - 报损单</span>
			<div>
				<el-button @click="chooseLossEvent" type="primary" size="small">选择报损商品</el-button>
				<el-button class="wid90" type="primary" size="small">导出</el-button>
			</div>
		</div>
		<div class="model_content">
			<div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 21 + 'px', overflow: 'auto'}">
				<div class="header_seach_wrap" style="padding: 15px">
					<span>类型：<span style="margin-right:20px;">报损单</span></span>
					<el-select filterable @change="shopSelectChange" value-key="id" v-model="shopData" placeholder="请选择报损门店">
						<el-option v-for="item in $store.state.home.shopList" :key="item.id" :label="item.name" :value="item"></el-option>
					</el-select>
				</div>
				<el-table
					:data="tableData"
                    :height="$store.state.home.modelContentHeight - 85"
                    style="width: 100%">
					<el-table-column
						label="序号"
						type="index"
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
                        >
                    </el-table-column>
					<el-table-column
                        prop="itemSkuId"
                        label="商品编码"
                        >
                    </el-table-column>
					<el-table-column
                        prop="supplierName"
                        label="供应商"
                        >
                    </el-table-column>
					<el-table-column
                        prop="stockNum"
                        label="当前库存"
                        >
                    </el-table-column>
					<el-table-column
                        label="报损数量"
                        >
						<template slot-scope="scope">
							<el-input @change.native="countUnitTatalEvent(scope.row)" @keyup.native="countUnitTatalEvent(scope.row)" v-model="scope.row.reportLossNumber"></el-input>
						</template>
                    </el-table-column>
					<el-table-column
                        prop="unitName"
                        label="单位"
                        >
                    </el-table-column>
					<el-table-column
                        prop="skuPurchasePrice"
                        label="进货价"
                        >
                    </el-table-column>
					<el-table-column
                        prop="totalPrice"
                        label="小计"
                        >
                    </el-table-column>
					<el-table-column
                        prop="purchaseOrderNo"
                        label="操作"
                        >
						<template slot-scope="scope">
                            <div v-if="scope">
								<el-button
									@click="propEvent(scope.$index, tableData)"
                                    type="text"
                                    size="small">
                                    删除
                                </el-button>
                            </div>
                        </template>
                    </el-table-column>
				</el-table>
			</div>
		</div>
		<div class="model_footer">
			<div style="float: left;">
				<el-button @click="goBackEvent" size="small" style="width: 90px; margin-left: 25px;">返回</el-button>
				<el-button @click="sureReport" type="primary" size="small" style="width: 90px; margin-left: 25px;">确认报损</el-button>
			</div>
			<div class="footer_tips">
				<span>商品种类：<span class="color_black" v-text="tableData.length"></span></span>
				<span>数量：<span class="color_black" v-text="postData.totalNumber"></span></span>
				<span>总金额(元)：<span class="color_black" v-text="postData.totalMoney"></span></span>
			</div>
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
					<el-select filterable clearable @change="searInputGoodData" v-model="tableParam.supplierIds" size="small" placeholder="全部供应商">
						<el-option v-for="item in suppllerList" :key="item.id" :label="item.supplierName" :value="item.id"></el-option>
					</el-select>
					<el-input clearable @change="searInputGoodData" style="width: 294px" size="small" v-model="tableParam.combinationStr" placeholder="请输入商品名称/条码"></el-input>
					<el-button @click="searInputGoodData" style="margin-right: 20px;" type="primary" size="small">搜索</el-button>
				</div>
				<el-table
                    :data="tableData2"
					border
					@selection-change="handleSelectionChange"
                    :height="405"
                    ref="goodLossTable"
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
						@size-change="handleSizeChange2"
						@current-change="handleCurrentChange2"
						:current-page="tableParam.pageNo"
						:page-sizes="[15, 30, 50, 100]"
						:page-size="15"
						layout="total, sizes, prev, pager, next, jumper"
						:total="totalPage">
					</el-pagination>
				</div>
			<span slot="footer" class="dialog-footer">
				<el-button class="wid90" size="small" @click="dialogVisible = false">取消</el-button>
				<el-button class="wid90" size="small" type="primary" @click="chooseGoods()">确定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import api2 from 'api/good'
	import capi from 'api/common'
	import api from 'api/stock2'
	export default {
		data() {
			return {
				shopData: null,
				categoryIdArr: [],
				categoryList: [],
				suppllerList: [],
				categoryOptionProps: {
					label:'categoryName',
					value:'id',
					children: 'categoryList'
				},
				dialogVisible: false,
				isChooseGoodChecked: false,
				tableData: [],
				tableData2: [],
				multipleSelection:[],
				totalPage: 0,
				postData: {
					shopId: '',
					shopName: '',
					totalNumber: '0',
					totalMoney: '0',
					creater: '',
					reportLossRemark: ''
				},
				tableParam: {
					combinationStr: '',
					purchaseDate: '',
					categoryIds: '',
					supplierIds: '',
					pageNo: 1,
					pageSize: 15
				}
			}
		},
		methods: {
			shopSelectChange(){
				if (this.shopData) {
					this.postData.shopId = this.shopData.id
					this.postData.shopName = this.shopData.name
				} else {
					this.postData.shopId = ''
					this.postData.shopName = ''
				}
			},
			countUnitTatalEvent(data){
				data.reportLossNumber = this.myBase.formatIntNum(data.reportLossNumber)
				let totalPrice = this.myBase.computeNumFormart(`${data.reportLossNumber} * ${data.skuPurchasePrice}`)

				this.$set(data, 'totalPrice', totalPrice)
				this.computeTotalPrice()
			},
			computeTotalPrice(){
				let str1 = ''
				let str2 = ''

				this.tableData.forEach((item) => {
					if (item.totalPrice) {
						str1 = this.myBase.computeNumFormart(`${str1} + ${item.totalPrice}`)
					}
					if (item.reportLossNumber) {
						str2 = this.myBase.computeNumFormart(`${str2} + ${item.reportLossNumber}`)
					}
				})

				this.postData.totalMoney = str1
				if (str2 != '') {
					this.postData.totalNumber  = parseInt(str2)
				}
			},
			cateSelectChange(){
				this.tableParam.categoryIds = this.categoryIdArr.join(',')
				this.tableParam.pageNo = 1
				this.getGoodsList()
			},
			searInputGoodData(){
				this.tableParam.pageNo = 1
				this.getGoodsList()
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
			isAddToList(obj){
				let flg = false

				this.tableData.forEach(element => {
					if (element.skuId == obj.skuId) {
						flg = true 
					}
				});

				return flg
			},
			//选择商品
			chooseGoods(){
				this.dialogVisible = false
				this.multipleSelection.forEach(element => {
					if (!this.isAddToList(element)) {
						let res = JSON.parse(JSON.stringify(element))

						res.itemMac = element.skuItemBarcode
						res.itemSkuId = element.skuId
						res.itemTypeId = element.categoryId
						res.itemTypeName = element.categoryName
						res.itemUnit = element.unitName
						this.$set(res, 'reportLossNumber', '1')
						this.$set(res, 'unitPrice', String(element.skuPurchasePrice))
						this.$set(res, 'totalPrice', String(element.skuPurchasePrice))
						
						this.tableData.unshift(res)
					}
				});
				this.computeTotalPrice()
			},
			// 保存保损商品
			sureReport(){
				if (!this.shopData) {
					this.$message({
						type: 'warning',
						duration: 1500,
						showClose: true,
						message: '请选择报损门店！'
					})
					return
				}
				if (this.tableData.length <= 0) {
					this.$message({
						type: 'warning',
						duration: 1500,
						showClose: true,
						message: '请选择商品数据！'
					})
					return
				}
				this.postData.list = this.tableData

				api.stockReportLossAgree(this.postData).then((res) => {
					this.$message({
						type: 'success',
						duration: 1500,
						showClose: true,
						message: '商品报损成功！'
					})
					this.$router.push({
						path: '/goodLoss'
					})
				})
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			//商品列表
			getGoodsList(){
				api2.getSkuGoodsList(this.tableParam).then((res)=>{
					console.log(res)
					this.tableData2 = res.data.listData
					this.totalPage = res.data.totalCount
				})
			},
			propEvent(index, rows){
				rows.splice(index, 1);
			},
			chooseLossEvent(){
				this.dialogVisible = true
				this.getGoodsList()
				this.$nextTick(() => {
					this.$refs.goodLossTable.clearSelection()
				})
			},
			goBackEvent(){
				this.$router.push({
					path: '/goodLoss'
				})
			},
			handleSizeChange2(val){
				this.tableParam.pageSize = val
            	this.getGoodsList()
			},
			handleCurrentChange2(val){
				this.tableParam.pageSize = val
            	this.getGoodsList()
			},
			initData(){
				this.tableData = []
				this.shopData = null
			}
		},
		computed: {},
		created() {},
		activated() {
			this.getCategoryList()
			this.getSupplierList()
		}
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
</style>