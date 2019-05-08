<template>
	<div>
		<div class="model_topcol">
			<span class="font600">商品报损</span>
			<span> - 报损明细</span>
			<div>
				<el-button type="primary" size="small" class="wid90">导出</el-button>
			</div>
		</div>
		<div class="model_content">
			<div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
				<el-table
                    :data="tableData"
                    :height="$store.state.home.modelContentHeight - 22"
                    style="width: 100%">
					<el-table-column
                        type="index"
						label="序号"
                        width="55">
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
                        prop="reportLossNumber"
                        label="数量"
                        >
                    </el-table-column>
					<el-table-column
                        prop="totalPrice"
                        label="金额"
                        >
                    </el-table-column>
					<el-table-column
                        prop="reportLossItemRemark"
                        label="报损原因"
                        >
                    </el-table-column>
				</el-table>

			</div>
		</div>
		<div class="model_footer">
			<el-button @click="goBackEvent" size="small" style="width: 90px; margin-left: 25px;">返回</el-button>
		</div>
	</div>
</template>

<script>
	import api from 'api/stock2'
	export default {
		data() {
			return {
				totalPage: 10,
				tableData: [],
				tableParam: {
					pageNo: 1,

				}
			}
		},
		methods: {
			getGoodLossList(){
				api.stockReportLossDetail(this.$store.state.home.pageData).then((res) => {
					console.log(res)	
					this.tableData = res.data.list
					this.totalPage = res.data.total
					
				})
			},
			goBackEvent(){
				this.$router.push({
					path: '/goodLoss'
				})
			}
		},
		computed: {},
		created() {},
		activated() {
			this.getGoodLossList()
		},
		mounted() {}
	}
</script>
<style scoped>

</style>