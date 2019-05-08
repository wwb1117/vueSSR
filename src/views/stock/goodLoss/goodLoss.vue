<template>
	<div>
		<div class="model_topcol">
			<span>商品报损</span>
			<div>
				<el-button v-perss='128' @click="goodLossEvent" class="wid90" type="primary" size="small">商品报损</el-button>
				<el-button v-perss='129' class="wid90" type="primary" size="small">导出</el-button>
			</div>
		</div>
		<div class="model_content">
			<div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 21 + 'px', overflow: 'auto'}">
				<div class="header_seach_wrap" style="padding: 15px">
					<label v-text="$store.state.home.currentShop.shopName" style="margin-right: 15px"></label>
					<el-date-picker @change="datePickerChangeEvent" size="small" v-model="timer" value-format="timestamp" type="daterange" :editable="false" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</div>
				<el-table
                    :data="tableData"
                    :height="$store.state.home.modelContentHeight - 85"
                    style="width: 100%">
					<el-table-column
                        prop="reportLossNo"
                        label="单号"
                        >
                    </el-table-column>
					<el-table-column
                        prop="orderTime"
                        label="报损时间"
                        >
                    </el-table-column>
					<el-table-column
                        prop="shopName"
                        label="报损门店"
                        >
                    </el-table-column>
					<el-table-column
                        prop="totalMoney"
                        label="报损金额(元)"
                        >
                    </el-table-column>
					<el-table-column
                        prop="creater"
                        label="报损人"
                        >
                    </el-table-column>
					<el-table-column
                        prop="reportLossRemark"
                        label="备注"
                        >
                    </el-table-column>
					<el-table-column
                        prop="purchaseOrderNo"
                        label="操作"
                        >
						<template slot-scope="scope">
                            <div v-if="scope">
								<el-button
									@click="propEvent(scope.row.id)"
                                    type="text"
                                    size="small">
                                    明细
                                </el-button>
                            </div>
                        </template>
                    </el-table-column>
				</el-table>
			</div>
		</div>
		<div class="model_footer">
			<div class="footer_tips">
				<span>共有记录：<span class="color_red">{{totalnumber}}</span></span>
				<span>报损金额：<span class="color_red">{{totalPrice}}</span></span>
			</div>
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
	</div>
</template>

<script>
	import api from 'api/stock2'
	export default {
		data() {
			return {
				timer:[],
				tableData: [],
				mallList: [],
				totalnumber:0,
				totalPrice:0,
				totalPage: 0,
				tableParam: {
					searchWord: '',
					mallId: '',
					startTime:'',
					endTime:'',
					pageNo: 1,
					pageSize: 15
				}
			}
		},
		methods: {
			getGoodLossList(){
				api.stockReportLossList(this.tableParam).then((res) => {
					this.tableData = res.data.list
					this.totalPage = res.data.total
					this.totalnumber = res.data.total
					this.totalPrice = res.data.totalPrice
				})
			},
			goodLossEvent(){
				this.$router.push({
					path: '/goodLoss/goodLossOrder'
				})
			},
			propEvent(id){
				this.$store.commit('setPageData', id)
				this.$router.push({
					path: '/goodLoss/goodLossDetail'
				})
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
				this.getGoodLossList()
			},
			handleSizeChange(val){
				this.tableParam.pageSize = val
            	this.getGoodLossList()
			},
			handleCurrentChange(val){
				this.tableParam.pageNo = val
            	this.getGoodLossList()
			},
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
	.header_seach_wrap>div {
		margin-right: 10px;
	}
</style>