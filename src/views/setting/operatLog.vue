<template>
	<div>
		<div class="model_topcol">
			<span>操作日志</span>
		</div>
		<div class="model_content">
			<div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
				<div class="header_seach_wrap" style="padding: 15px">
					<el-select filterable clearable @change="searInput" v-model="tableParam.shopId" placeholder="请选择门店">
						<el-option v-for="item in $store.state.home.shopList" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
					<el-select filterable v-model="tableParam.mallId" size="small" placeholder="云端后端操作日志">
						<el-option v-for="item in mallList" :key="item.id" :label="item.mallName" :value="item.id">
						</el-option>
					</el-select>
					<el-date-picker size="small" v-model="tableParam.purchaseDate" value-format="timestamp" type="daterange" :editable="false" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</div>
				<el-table
                    :data="tableData"
                    :height="$store.state.home.modelContentHeight - 85"
                    ref="purchaseListTable"
                    style="width: 100%">
					<el-table-column
                        type="index"
						label="序号"
                        width="50">
                    </el-table-column>
					<el-table-column
                        prop="purchaseOrderNo"
                        label="操作人"
                        >
                    </el-table-column>
					<el-table-column
                        prop="purchaseOrderNo"
                        label="操作时间"
                        >
                    </el-table-column>
					<el-table-column
                        prop="purchaseOrderNo"
                        label="操作类型"
                        >
                    </el-table-column>
					<el-table-column
                        prop="purchaseOrderNo"
                        label="影响门店"
                        >
                    </el-table-column>
					<el-table-column
                        prop="purchaseOrderNo"
                        label="日志内容"
                        >
                    </el-table-column>
				</el-table>
			</div>
		</div>
		<div class="model_footer">
			<el-pagination :current-page="tableParam.pageNo"
				:page-sizes="[15, 30, 50, 100]"
				:page-size="tableParam.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="totalPage">
			</el-pagination>
		</div>

		
	</div>
</template>

<script>
	import api from 'api/setting'
	export default {
		data() {
			return {
				tableData: [
					{purchaseOrderNo: 'wwbtest'},
					{purchaseOrderNo: 'wwbtest'}
				],
				tableData2: [
					{purchaseOrderNo: 'wwbtest'},
					{purchaseOrderNo: 'wwbtest'}
				],
				mallList: [],
				totalPage: 10,
				tableParam: {
					searchWord: '',
					purchaseDate: '',
					shopId: '',
					pageNo: 1,
					pageSize: 15
				}
			}
		},
		methods: {
			searInput(){
				this.getLogList()
			},
			getLogList(){
				api.getLogList(this.tableParam).then((response) => {
					
				})
			}
		},
		computed: {},
		created() {},
		activated() {
			this.getLogList()
		},
		mounted() {}
	}
</script>
<style scoped>
	.header_seach_wrap>div {
		margin-right: 10px;
	}
</style>