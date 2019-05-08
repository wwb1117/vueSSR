<template>
    <div>
        <div class="model_topcol">
            <span class="font600">库存查询</span>
            <span> - 变更记录</span>
			<div>
				<el-button class="wid90" type="primary" size="small">导出</el-button>
			</div>
        </div>
        <div class="model_content">
            <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
               <div style="float: left; width: 35%; height: 100%; padding: 10px">
				   <div style="padding: 10px">
					   <h3 style="margin-top: 0" v-text="pageData.itemName"></h3>
					   <div class="left_tip"><span class="left_tip_title">商品条码 </span> <span v-text="pageData.itemMac"></span></div>
					   <div class="left_tip"><span class="left_tip_title">库存数量 </span> <span v-text="pageData.availableInventory"></span></div>
					   <div class="left_tip"><span class="left_tip_title">所属门店 </span> <span v-text="pageData.shopName"></span></div>
					   <div class="left_tip"><span class="left_tip_title">最新库存 </span> <span>{{pageData.updated | time_m}}</span></div>
				   </div>
				   <div class="border" style="border-bottom: none;">
					   <h4 style="margin: 15px">不同生产日期的库存情况</h4>
					   <el-table
						:data="leftTableData"
						:height="$store.state.home.modelContentHeight - 254"
						style="width: 100%">
						<el-table-column
							prop="productionDate"
							label="生产日期"
							>
							<template slot-scope="scope">
								<span>{{scope.row.productionDate | time_m}}</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="period"
							label="保质期(天)"
							>
						</el-table-column>
						<el-table-column
							prop="availableInventory"
							label="库存数"
							>
						</el-table-column>
					   </el-table>
				   </div>
			   </div>

			   <div style="float: left; width: 65%; height: 100%; border-left: 1px solid #e4e8eb">
					<div class="header_seach_wrap">
						<!-- <el-select filterable v-model="tableParam.mallId" size="small" placeholder="请选择门店">
							<el-option v-for="item in mallList" :key="item.id" :label="item.mallName" :value="item.id">
							</el-option>
						</el-select> -->
						<el-date-picker size="small" v-model="timePacker" value-format="timestamp" type="daterange" :editable="false" range-separator="至" 
						start-placeholder="开始日期" end-placeholder="结束日期" @change="datePickerChangeEvent">
						</el-date-picker>
					</div>
					<el-table
						:data="rightTableData"
						:height="$store.state.home.modelContentHeight - 138"
						style="width: 100%">
						<el-table-column
							prop="changeTime"
							label="库存更新时间"
							>
							<template slot-scope="scope">
								<span>{{scope.row.changeTime | time_m}}</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="purchaseOrderNo"
							label="状态"
							>
							<template v-if="scope" slot-scope="scope">
								<span>已完成</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="purchaseOrderNo"
							label="单据"
							>
							<template slot-scope="scope">
								<span>{{$enum.changeType[scope.row.changeType]}}</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="cargoFlowNo"
							label="单号"
							>
							<template slot-scope="scope">
								<el-button
									v-text="scope.row.cargoFlowNo"
									@click="propEvent"
                                    type="text"
                                    size="small">
                                </el-button>
							</template>
						</el-table-column>
						<el-table-column
							prop="changeNumber"
							label="变动数量"
							>
						</el-table-column>
					</el-table>
					<div>
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
			   </div>
            </div>
        </div>
        <div class="model_footer">
            <el-button @click="goBackEvent" size="small" style="width: 90px; margin-left: 25px;">返回</el-button>

			<!-- 底部是分页 -->
        </div>
    </div>
</template>

<script>
import api from 'api/stock'
export default {
    data(){
        return {
			mallList: [],
			leftTableData: [],
			rightTableData: [],
			pageData: {},
			totalPage: 10,
			timePacker: '',
            tableParam:{
				startTime: '',
				endTime: '',
				pageNo: 1,
				pageSize: 15
			}
        }
    },
	computed:{},
	methods: {
		goBackEvent(){
			this.$router.push({
				path: '/stockSearch'
			})
		},
		propEvent(){
			//未设置菜单id，待修改
			this.$router.push({
				path: '/logisticsManege'
			})
		},
		datePickerChangeEvent(val){
			if (val) {
				this.tableParam.startTime = Math.round(val[0] / 1000)
				this.tableParam.endTime = Math.round(val[1] / 1000)
			} else{
				this.tableParam.startTime = ''
				this.tableParam.endTime = ''
			}
			
			this.tableParam.pageNo = 1
			this.getStockChangeData()
		},
		handleSizeChange(val){
			this.tableParam.pageSize = val
			this.getStockChangeData()
		},
		handleCurrentChange(val){
			this.tableParam.pageNo = val
			this.getStockChangeData()
		},
		getStockChangeData(){
			api.stockChangeDetail(this.pageData.id, this.tableParam).then((response) => {
				console.log(response)
				this.leftTableData = response.data.storageItems
				this.rightTableData = response.data.storageRecords
				// this.totalPage = response.data.total
			})
		}
	},
    created(){},
    activated(){
		this.pageData = this.$store.state.home.pageData
		this.getStockChangeData()
    },
    mounted(){
    }
}
</script>
<style scoped>
.left_tip{
	padding: 3px 0;
}
.left_tip_title{
	margin-right: 10px;
}
.header_seach_wrap{
	padding: 15px;
}
.header_seach_wrap>div {
	margin-right: 15px;
}
</style>
