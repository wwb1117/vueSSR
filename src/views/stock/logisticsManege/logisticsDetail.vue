<template>
	<div>
		<div class="model_topcol">
			<span class="font600">货流管理</span>
            <span> - 详情</span>
			<div>
				<!-- <el-button v-perss='115' v-if="(logDetailData.orderType == 0 && logDetailData.orderStatus == 0) || (logDetailData.orderType == 1 && logDetailData.orderStatus == 0)" type="primary" class="wid90" size="small">编辑进货</el-button> -->
				<!-- <el-button v-if="logDetailData.orderType == 0" type="primary" class="wid90" size="small">通知</el-button> -->
				<el-button v-perss='122' type="primary" class="wid90" size="small">打印</el-button>
				<el-button type="primary" class="wid90" size="small">导出</el-button>
			</div>
		</div>
		<div class="model_content">
			<div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
				<div class="header_seach_wrap" style="padding: 15px">
					<span>{{$enum.logisticsType[logDetailData.orderType]}}</span>
					<label style="margin-left: 20px">{{logDetailData.ownerShopName}}</label>
				</div>
				<el-table
                    :data="tableData"
                    :height="$store.state.home.modelContentHeight - 72"
                    style="width: 100%">
					<el-table-column
                        type="index"
                        label="序号"
                        >
                    </el-table-column>
					<el-table-column
                        prop="itemName"
                        label="商品名称"
                        >
                    </el-table-column>
					<el-table-column
                        prop="itemMac"
                        label="条码"
						width="200"
                        >
                    </el-table-column>
					<el-table-column
                        prop="itemSkuId"
                        label="供应商"
                        >
                    </el-table-column>
					<el-table-column
                        prop="itemSkuId"
                        label="商品编码"
                        >
                    </el-table-column>
					<el-table-column
                        prop="itemUnit"
                        label="单位"
                        >
                    </el-table-column>
					<el-table-column
                        prop="cargoFlowNumber"
                        label="进货量"
                        >
                    </el-table-column>
					<el-table-column
                        prop="giftNumber"
                        label="赠送量"
                        >
                    </el-table-column>
					<el-table-column
                        prop="cargoFlowNumber"
                        label="实收量"
                        >
                    </el-table-column>
					<el-table-column
                        prop="unitPrice"
                        label="进货价(元)"
                        >
                    </el-table-column>
					<el-table-column
                        prop="totalPrice"
                        label="小计(元)"
                        >
                    </el-table-column>
					
				</el-table>
			</div>
		</div>
		<div class="model_footer">
			<el-button size="small" @click="goBackEvent" style="width: 90px; margin-left: 25px;">返回</el-button>
            <el-button v-perss='114' @click="rejectInstockEvent" v-if="logDetailData.orderType == 1 && logDetailData.orderStatus == 0" style="width: 90px; margin-left: 25px;">拒绝进货</el-button>

            <el-button @click="sureInstockEvent" v-if="(logDetailData.orderType == 0 && logDetailData.orderStatus == 0) || (logDetailData.orderType == 1 && logDetailData.orderStatus == 0)" type="primary" style="width: 90px; margin-left: 25px;">确认进货</el-button>
            <el-button v-perss='116' @click="sureInstockEvent" v-if="(logDetailData.orderType != 0 && logDetailData.orderType != 1 && logDetailData.orderStatus == 0)" type="primary" style="width: 90px; margin-left: 25px;">确认出货</el-button>
			 <el-button v-perss='118' @click="sureRejectEvent" v-if="logDetailData.orderType == 5 && logDetailData.orderStatus == 1" type="primary" style="width: 90px; margin-left: 25px;">接收退货</el-button>

		</div>
	</div>
</template>

<script>
	import api from 'api/stock'
	export default {
		data() {
			return {
				tableData: [],
				logDetailData: {}
			}
		},
		computed: {},
		methods: {
			
			propEvent(type){

			},
			
			goBackEvent(){
				this.$router.push({
					path: '/logisticsManege'
				})
			},
			getDetail(){
				api.logisticsDetail(this.$store.state.home.pageData.id).then((response) => {
					this.tableData = response.data.list
					this.logDetailData = response.data
				})
			},
			sureInstockEvent(){
				api.sureInStock(this.$store.state.home.pageData.id).then((response) => {
					this.$message({
						type: 'success',
						duration: 1500,
						showClose: true,
						message: '确认进货成功！'
					})
					this.$router.push({
						path: '/logisticsManege'
					})
				})
			},
			sureRejectEvent(){
				api.agreeBack(this.$store.state.home.pageData.id).then((response) => {
					this.$message({
						type: 'success',
						duration: 1500,
						showClose: true,
						message: '接收退货成功！'
					})
					this.$router.push({
						path: '/logisticsManege'
					})
				})
			},
			rejectInstockEvent(){
				api.rejectInStock(this.$store.state.home.pageData.id).then((response) => {
					this.$message({
						type: 'success',
						duration: 1500,
						showClose: true,
						message: '拒绝进货成功！'
					})
					this.$router.push({
						path: '/logisticsManege'
					})
				})
			}

		},
		created() {},
		activated() {
			this.getDetail()
		},
		mounted() {}
	}
</script>
<style scoped>
	.header_seach_wrap>div {
		margin-right: 10px;
	}
</style>