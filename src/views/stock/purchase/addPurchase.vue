<template>
    <div>
        <div class="model_topcol">
            <span class="font600">采购单</span>
            <span> - 新增采购单</span>
			<div>
				<el-button type="primary" class="wid90" size="small">导入</el-button>
			</div>
        </div>
        <div class="model_content">
            <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
               <div>
					<el-row class="header_tips">
						<el-col :span="3">
							<span class="color_gray">采购门店</span><span v-text="$store.state.home.currentShop.shopName"></span>
						</el-col>
						<el-col :span="4">
							<el-row>
								<el-col :span="6">
									<span class="color_gray">供应商</span>
								</el-col>
								<el-col :span="18">
									<el-select value-key="id" @change="supSelectChange" filterable v-model="supplierData" size="small" placeholder="请选择供应商">
										<el-option v-for="item in suppllerList" :key="item.id" :label="item.supplierName" :value="item">
										</el-option>
									</el-select>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
			   </div>
			   <div>
				   <el-table
                    :data="tableData"
					:height="$store.state.home.modelContentHeight - 132"
                    style="width: 100%">
						<el-table-column
							type="index"
							label="序号"
							width="50">
						</el-table-column>
						<el-table-column
							prop="purchaseOrderNo"
							label="操作"
							>
							<template slot-scope="scope">
								<div>
									<el-button @click="addGoodEvent(scope)" type="text" size="mini" icon="el-icon-plus"></el-button>
									<el-button @click="minuGoodEvent(scope)" type="text" size="mini" icon="el-icon-minus"></el-button>
								</div>
							</template>
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
						<!-- <el-table-column
							prop="purchaseOrderNo"
							label="现有库存"
							>
						</el-table-column> -->
						<el-table-column
							prop="purchasingNumber"
							label="采购数量"
							width="150"
							>
							<template v-if="scope.row.skuId" slot-scope="scope">
								<el-input @change.native="countUnitTatalEvent(scope.row)" @keyup.native="countUnitTatalEvent(scope.row)" v-model="scope.row.purchasingNumber" ></el-input>
							</template>
						</el-table-column>
						<el-table-column
							prop="purchaseUnitPrice"
							label="采购单价（元）"
							>
							<template v-if="scope.row.skuId" slot-scope="scope">
								<el-input @change.native="countUnitPrice(scope.row)" @keyup.native="countUnitPrice(scope.row)" v-model="scope.row.purchaseUnitPrice" ></el-input>
							</template>
						</el-table-column>
						<el-table-column
							prop="purchaseUnitPrice"
							label="参考价（元）"
							>
						</el-table-column>
						<el-table-column
							prop="purchaseTotalPrice"
							label="小计(元)"
							>
						</el-table-column>
					</el-table>
			   </div>
			   <div class="footer_tips">
					<div style="float: right;">
						<span>共</span>
						<span>{{totalPurchaseNum}}</span><span style="margin-right: 10px;">件</span>
						<span style="margin-right: 10px;">总额：</span><span>¥</span><span>{{totalPrice}}</span>
					</div>
				</div>
			   

            </div>
        </div>
        <div class="model_footer">
            <el-button size="small" @click="goBackEvent" style="width: 90px; margin-left: 25px;">返回</el-button>
            <el-button @click="addPurchaseEvent" type="primary" size="small" style="width: 90px; margin-left: 25px;">保存</el-button>
        </div>

		<el-dialog
			title="选择商品"
			:visible.sync="dialogVisible"
			:close-on-click-modal="false"
			width="55%"
			>
				<div class="dialog_top">
					<!-- <el-select filterable v-model="tableParam.catetoryId" size="small" placeholder="全部商品分类">
						<el-option v-for="item in mallList" :key="item.id" :label="item.mallName" :value="item.id">
						</el-option>
					</el-select> -->
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
					<el-select clearable @change="searchGoodBtn" filterable v-model="tableParam.supplierIds" size="small" placeholder="全部供应商">
						<el-option v-for="item in suppllerList" :key="item.id" :label="item.supplierName" :value="item.id">
						</el-option>
					</el-select>
					<el-input clearable @change="searchGoodBtn" style="width: 294px" size="small" v-model="tableParam.combinationStr" placeholder="请输入商品名称/条码"></el-input>
					<el-button @click="searchGoodBtn" style="margin-left: 20px;" type="primary" size="small">搜索</el-button>
				</div>
				<el-table
                    :data="goodsData"
					ref="addPurchaseGoodTable"
					border
                    :height="405"
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
						@size-change="handleSizeChange"
                		@current-change="handleCurrentChange"
						:page-sizes="[15, 30, 50, 100]"
						:page-size="15"
						layout="total, sizes, prev, pager, next, jumper"
						:total="totalPage">
					</el-pagination>
				</div>
			<span slot="footer" class="dialog-footer">
				<el-button class="wid90" size="small" @click="dialogVisible = false">取消</el-button>
				<el-button class="wid90" size="small" type="primary" @click="chooseGoodSureEvent">确定</el-button>
			</span>
		</el-dialog>
    </div>
</template>

<script>
import api from 'api/stock'
import gapi from 'api/good'
import capi from 'api/common'
export default {
    data(){
        return {
			tableData: [{}],
			totalPurchaseNum: 0,
			mallList: [],
			suppllerList: [],
			supplierData: null,
			categoryList: [],
			categoryOptionProps: {
                label:'categoryName',
                value:'id',
                children: 'categoryList'
            },
			goodsData: [],
			selectTableData: [],
			dialogVisible: false,
			totalPage: 10,
			totalPrice: '',
			addForm: {
				buyerId: this.$store.state.home.currentShop.id,
				buyerName: this.$store.state.home.currentShop.shopName,
				purchaseOrderNo: this.myBase.MathRand('CG', 2),
				sellerId: '',
				sellerName: '',
				creatorId: this.$store.state.home.currentShop.id,
				creator: this.$store.state.home.currentShop.shopName,
				orderTime: Math.round(Date.parse(new Date()) / 1000),
				purchaseRemark: '',
				totalMoney: '',
				purchasingTotalNumber: ''
			},
			categoryIdArr: [],
            tableParam: {
				pageNo: 1,
				pageSize: 15,
				categoryIds: '',
				supplierIds: '',
				combinationStr: ''
			}
        }
    },
	computed:{},
	methods: {
		supSelectChange(){
			if(this.supplierData){
				this.addForm.sellerId = this.supplierData.id
				this.addForm.sellerName = this.supplierData.supplierName
			} else {
				this.addForm.sellerId = ''
				this.addForm.sellerName = ''
			}
		},
		searchGoodBtn(){
			this.tableParam.pageNo = 1
            this.getGoodData()
		},
		handleCurrentChange(val){
			this.tableParam.pageNo = val
            this.getGoodData()
		},
		handleSizeChange(val){
			this.tableParam.pageSize = val
            this.getGoodData()
		},
		goBackEvent(){
			this.$router.push({
				path: '/purchaseList'
			})
		},
		addGoodEvent(scope){
			this.dialogVisible = true
			this.getGoodData()
			this.$nextTick(() => {
				this.$refs.addPurchaseGoodTable.clearSelection()
			})
			
		},
		cateSelectChange(){
			this.tableParam.categoryIds = this.categoryIdArr.join(',')
			this.tableParam.pageNo = 1
			this.getGoodData()
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
		countUnitPrice(data){
			data.purchaseUnitPrice = this.myBase.formatFloatTwo2(data.purchaseUnitPrice)
			let purchaseTotalPrice = this.myBase.computeNumFormart(`${data.purchasingNumber} * ${data.purchaseUnitPrice}`)

			this.$set(data, 'purchaseTotalPrice', purchaseTotalPrice)
			this.computeTotalPrice()
		},
		countUnitTatalEvent(data){
			data.purchasingNumber = this.myBase.formatIntNum(data.purchasingNumber)

			let purchaseTotalPrice = this.myBase.computeNumFormart(`${data.purchasingNumber} * ${data.purchaseUnitPrice}`)

			this.$set(data, 'purchaseTotalPrice', purchaseTotalPrice)
			this.computeTotalPrice()
		},
		computeTotalPrice(){
			let str1 = ''
			let str2 = ''

			this.tableData.forEach((item) => {
				if (item.purchaseTotalPrice) {
					str1 = this.myBase.computeNumFormart(`${str1} + ${item.purchaseTotalPrice}`)
				}
				if (item.purchasingNumber) {
					str2 = this.myBase.computeNumFormart(`${str2} + ${item.purchasingNumber}`)
				}
			})

			this.totalPrice = str1
			this.totalPurchaseNum = str2
			if (this.totalPurchaseNum != '') {
				this.totalPurchaseNum = parseInt(this.totalPurchaseNum)
			}
		},
		handleSelectionChange(arr){
			this.selectTableData = arr
		},
		chooseGoodSureEvent(){
			this.dialogVisible = false

			this.selectTableData.forEach(element => {
				if (!this.isAddToList(element)) {
					let res = JSON.parse(JSON.stringify(element))

					res.purchasingNumber = '1'
					res.itemSkuId = element.skuId
					res.itemTypeId = element.categoryId
					res.itemTypeName = element.categoryName
					res.itemUnit = element.unitName
					
					this.$set(res, 'purchaseUnitPrice', String(element.skuPurchasePrice))
					this.$set(res, 'purchaseTotalPrice', String(element.skuPurchasePrice))
					
					this.tableData.unshift(res)
				}
			});
			this.removeTableLast()
			this.computeTotalPrice()
		},
		removeTableLast(){
			let lastobj = this.tableData[this.tableData.length - 1]

			if (!lastobj.itemId) {
				this.tableData.pop()
			}
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
		isPurchaseEmpty(){
			let flg = false

			this.tableData.forEach(element => {
				if (element.purchasingNumber == '' || element.purchasingNumber == '0') {
					flg = true 
				}
			});

			return flg
		},
		minuGoodEvent(scope){
			if (this.tableData.length > 1) {
				this.tableData.splice(scope.$index, 1)
			} else{
				this.tableData = [{}]
			}
		},
		getGoodData(){
			gapi.getSkuGoodsList(this.tableParam).then((response) => {
				this.goodsData = response.data.listData
				this.totalPage = response.data.totalCount
			})
		},
		addPurchaseEvent(){
			if (this.tableData.length == 1 && !this.tableData[0].itemId) {
				this.$message({
					type: 'warning',
					duration: 1500,
					showClose: true,
					message: '请选择商品数据！'
				})
				return
			}

			if (this.isPurchaseEmpty()) {
				this.$message({
					type: 'warning',
					duration: 1500,
					showClose: true,
					message: '商品采购数量不能零或空！'
				})
				return
			}

			this.addForm.totalMoney = this.totalPrice
			this.addForm.purchasingTotalNumber = this.totalPurchaseNum
			this.addForm.list = this.tableData
			this.addForm.orderTime = Math.round(Date.parse(new Date()) / 1000)

			api.addPurchaseOrder(this.addForm).then((response) => {
				this.$message({
					type: 'success',
					duration: 1500,
					showClose: true,
					message: '新增采购单成功！'
				})
				this.$router.push({
					path: '/purchaseList'
				})
			})
		},
		initData(){
			this.supplierData = null
			this.totalPurchaseNum = 0
			this.tableData = [{}]
			this.totalPrice = '0.00'
			this.addForm.purchaseOrderNo = this.myBase.MathRand('CG', 2)
		}
	},
    created(){},
    activated(){
		this.initData()
		this.getGoodData()
		this.getSupplierList()
		this.getCategoryList()
		console.log(this.$store.state.home.currentShop, '1223')
    },
    mounted(){
    }
}
</script>
<style scoped>
.header_tips{
	padding: 15px 0;
	padding-left: 20px;
	line-height: 32px;
}
.header_tips span{
	margin-left: 10px;
}
.footer_tips{
	width: 100%; 
	height: 47px; 
	line-height: 47px; 
	font-size: 12px;
	padding-right: 20px;
}
.dialog_top{
	margin-top: -15px; 
	margin-bottom: 15px;
}
.dialog_top>div{
	margin-left: 10px;
}
</style>
