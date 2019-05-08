<template>
	<div>
		<div class="model_topcol">
			<span class="font600">门店订货</span>
			<span> - 详情</span>
			<div>
				<el-button class="wid90" type="primary" size="small">打印</el-button>
				<el-button class="wid90" type="primary" size="small">导出</el-button>
			</div>
		</div>
		<div class="model_content">
			<div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
				<div v-if='this.allData.orderStatus != 4' style="padding: 15px; border-bottom: 1px solid #e4e8eb; overflow: hidden">
					<step-bar :stepTexts="stepTexts" :currentStep="currentStep"></step-bar>
				</div>
				<div class="header_seach_wrap" style="padding: 15px">
					<div style="display: inline-block;">
						<span>{{allData.outShopName}}</span>
						<span>{{allData.orderTime | time_s}}</span>
					</div>
				</div>
				<el-table
                    :data="tableData"
                    :height="$store.state.home.modelContentHeight - 143"
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
					<el-table-column
                        prop="orderGoodsNumber"
                        label="请求量"
                        >
                    </el-table-column>
					<el-table-column
                        prop="itemUnit"
                        label="单位"
                        >
                    </el-table-column>
					<el-table-column
                        label="配货量"
                        >
						<template slot-scope="scope">
							<div v-if="currentStep != 2">
								<span v-text="scope.row.cargoFlowNumber"></span>
							</div>
							<div v-if="currentStep == 2">
								<el-input @change.native="countUnitTatalEvent(scope.row)" @keyup.native="countUnitTatalEvent(scope.row)" v-model="scope.row.cargoFlowNumber"></el-input>
							</div>
						</template>
                    </el-table-column>
					<el-table-column
                        prop="unitPrice"
                        label="配货价(元)"
                        >
                    </el-table-column>
					<el-table-column
                        prop="totalPrice"
                        label="小计"
						>
						<template slot-scope='scope'>
							<span>{{scope.row.cargoFlowNumber * scope.row.unitPrice}}</span>
						</template>
                    </el-table-column>
					<el-table-column
                        prop="orderGoodsItemRemark"
                        label="备注"
                        >
                    </el-table-column>
				</el-table>
			</div>
		</div>
		<div class="model_footer">
			<el-button @click="goBackEvent" size="small" style="width: 90px; margin-left: 25px; float: left;">返回</el-button>
			<el-button v-perss='131' v-if="currentStep == 1 && allData.orderStatus != 4" type="danger" @click="cancellation" size="small" style="width: 90px; margin-left: 25px; float: left;">作废</el-button>
			<el-button v-perss='132' v-if="currentStep == 1" type="primary" @click="goCheckedEvent" size="small" style="width: 90px; margin-left: 25px; float: left;">审核通过</el-button>
			<el-button v-perss='134' v-if="currentStep == 2" type="primary" @click="goShopEvent()" size="small" style="width: 90px; margin-left: 25px; float: left;">配货</el-button>
			<div class="footer_tips">
				<span>共<span>{{this.tableData.length}}</span>件商品</span>
				<span class="color_gray">件数：<span class="color_red" v-text="allData.totalNumber"></span></span>
				<span class="color_gray">总金额：<span class="color_red" v-text="allData.totalMoney"></span></span>
			</div>
		</div>
		<el-dialog
			title="确认货单"
			:visible.sync="dialogVisible"
			:close-on-click-modal="false"
			width="30%"
			>
				<el-form label-position="right" size="small" label-width="90px">
					<el-form-item prop="massage" label="配送方式">
                        <span>直接为门店进货</span>
                    </el-form-item>
					<el-form-item prop="massage" label="备注">
                        <el-input style="width:90%" maxlength="200" type="textarea" :rows="6" v-model="cargoFlowRemark" placeholder="请输入备注，字数在200以内"></el-input>
                    </el-form-item>
				</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="shopSuccessEvent(0)">通知门店入库</el-button>
				<el-button size="small" type="primary" @click="shopSuccessEvent(1)">商品直接入库</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import stepBar from 'components/stepBar'
	import api from 'api/stock2'
	export default {
		components: {
			stepBar
		},
		data() {
			return {
				allData: null,
				tableData: [],
				dialogVisible: false,
				stepTexts: ['审核', '配货', '完成'],
				currentStep: 1,
				cargoFlowRemark:''
			}
		},
		methods: {
			countUnitTatalEvent(data){
				data.cargoFlowNumber = this.myBase.formatIntNum(data.cargoFlowNumber)

				let totalPrice = this.myBase.computeNumFormart(`${data.cargoFlowNumber} * ${data.unitPrice}`)

				this.$set(data, 'totalPrice', totalPrice)
				this.computeTotal()
			},
			//获取列表
			getList(){
				api.stockOrderGoodsDetail(this.$store.state.home.pageData).then((res) => {
					this.allData = res.data
					this.tableData = res.data.list
					
					if (res.data.orderStatus == 0) {
						this.currentStep = 1
					} else if (res.data.orderStatus == 1){
						this.currentStep = 2
					} else if (res.data.orderStatus == 2) {
						this.currentStep = 3
					}
					this.$delete(this.allData, 'cargoFlowNo')
					this.$set(this.allData, 'orderType', 3)
					this.$set(this.allData, 'orderGoodsId', this.allData.id)
					this.$set(this.allData, 'ownerShopId', this.allData.outShopId)
					this.$set(this.allData, 'ownerShopName', this.allData.outShopName)

					this.allData.list.forEach(element => {
						this.$set(element, 'cargoFlowNumber', element.orderGoodsNumber)
					});
					this.computeTotal()
				})
			},
			computeTotal(){

				let str1 = ''
				let str2 = ''

				this.tableData.forEach((item) => {
					if (item.totalPrice) {
						str1 = this.myBase.computeNumFormart(`${str1} + ${item.totalPrice}`)
					}
					if (item.cargoFlowNumber) {
						str2 = this.myBase.computeNumFormart(`${str2} + ${item.cargoFlowNumber}`)
					}
				})

				this.allData.totalMoney = str1
				if (str2 != '') {
					this.allData.totalNumber  = parseInt(str2)
				}
			},
			//配货
			goShopEvent(){
				this.dialogVisible = true
				this.cargoFlowRemark = ''
			},
			//作废
			cancellation(){
				let obj = {
					id:this.$store.state.home.pageData,
					orderStatus:4
				}
				api.stockOrderGoodsAgree(obj).then((res) => {
					console.log(res)
					this.$message({
						type: 'success',
						duration: 1500,
						showClose: true,
						message: '作废成功'
					})
					this.$router.push({
						path: '/mallOrder'
					})
				})
			},
			// 审核通过
			goCheckedEvent(){
				console.log(this.allData)
				let obj = {
					expectationTime: this.allData.expectationTime, 
					id: this.allData.id, 
					inShopId: this.allData.inShopId, 
					inShopName: this.allData.inShopName, 
					outShopId: this.allData.outShopId, 
					outShopName: this.allData.outShopName, 
					totalMoney: this.allData.totalMoney, 
					totalNumber: this.allData.totalNumber
				}
				let newObj = []
				newObj.push(obj)
				api.stockOrderGoodsBatchUpdate(newObj).then((res) => {
					this.$message({
						type: 'success',
						duration: 1500,
						showClose: true,
						message: '订货单审核成功'
					})
					this.currentStep++
				})
			},
			goBackEvent(){
				this.currentStep = 1
				this.$router.push({
					path: '/mallOrder'
				})
			},
			shopSuccessEvent(val){
				this.$set(this.allData, 'deliver', val)
				this.$set(this.allData, 'cargoFlowRemark', this.cargoFlowRemark)
				api.distributionOrder(this.allData).then((res) => {
					this.$message({
						type: 'success',
						duration: 1500,
						showClose: true,
						message: '配货成功'
					})
					this.currentStep++
					this.dialogVisible = false
					this.goBackEvent()
				})
				
			}
		},
		computed: {},
		created() {},
		activated() {
			this.getList()
			// this.currentStep = 1
		},
		mounted() {}
	}
</script>
<style scoped>
	.header_seach_wrap>div {
		margin-right: 10px;
	}
	.header_seach_wrap>div>span{
		margin-right: 10px;
	}
</style>