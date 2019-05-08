<template>
    <div>
        <div class="model_topcol">
            <span>交班记录</span>
            <div>
                <el-button class="wid90" type="primary" size="small">导出</el-button>
            </div>
        </div>
        <div class="model_content">
            <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
                <div class="header_seach_wrap" style="padding: 15px">
                    <el-select clearable @change="searchInputClear" filterable v-model="tableParam.shopId" size="small" placeholder="请选择门店">
                       <el-option v-for="item in shopList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-select clearable @change="searchInputClear" filterable v-model="tableParam.shopUserId" size="small" placeholder="全部收银员">
						<el-option v-for="item in $store.state.home.cashiers" :key="item.id" :label="item.employeeName" :value="item.id"></el-option>
                    </el-select>
                    <el-date-picker size="small" @change="datePickerChangeEvent" v-model="purchaseDate" value-format="timestamp" type="daterange" :editable="false" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间">
                    </el-date-picker>
                    <el-button @click="searchInputClear" type="primary" size="small">搜索</el-button>
                </div>
                <el-table :data="tableData" :height="$store.state.home.modelContentHeight - 85" ref="purchaseListTable" @selection-change="handleSelectionChange" style="width: 100%">
                    <el-table-column prop="shopName" label="所属门店">
                    </el-table-column>
                    <el-table-column prop="shopUserName" label="收银员">
                    </el-table-column>
                    <el-table-column prop="startTime" label="登录时间">
						<template slot-scope="scope">
							<span>{{scope.row.startTime | time_m}}</span>
						</template>
                    </el-table-column>
                    <el-table-column prop="endTime" label="登出时间">
						<template slot-scope="scope">
							<span>{{scope.row.endTime | time_m}}</span>
						</template>
                    </el-table-column>
                    <el-table-column prop="payCash" label="现金支付">
                    </el-table-column>
                    <el-table-column prop="payBankcard" label="银联支付">
                    </el-table-column>
                    <el-table-column prop="purchaseOrderNo" label="储蓄卡支付">
                    </el-table-column>
                    <el-table-column prop="purchaseOrderNo" label="次卡支付">
                    </el-table-column>
                    <el-table-column prop="otherPettycash" label="备用金">
                    </el-table-column>
                    <el-table-column prop="otherIn" label="非营业收支">
                    </el-table-column>
                    <el-table-column prop="saleMoney" label="总额">
                    </el-table-column>
                    <el-table-column prop="created" label="创建时间">
						<template slot-scope="scope">
							<span>{{scope.row.created | time_m}}</span>
						</template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="model_footer">
            <el-pagination :current-page="tableParam.pageNo" :page-sizes="[15, 30, 50, 100]" :page-size="tableParam.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalPage">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import capi from 'api/common'
import api from 'api/sale'
export default {
    data () {
        return {
            tableData: [
                { purchaseOrderNo: '冰淇淋' }
            ],
			mallList: [],
			shopList: [],
			totalPage: 10,
			purchaseDate: '',
            tableParam: {
				shopId: '',
				shopUserId: '',
				startTime: '',
				endTime: '',
                searchWord: '',
                mallId: '',
                pageNo: 1,
                pageSize: 15
            }
        }
    },
	computed: {},
	methods: {
		getShopList(){
			capi.allShops().then((res) => {
				this.shopList = res.data
			})
		},
		searchInputClear(){
			this.tableParam.pageNo = 1
			this.getTableData()
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
			this.getTableData()
		},
		getTableData(){
			api.getWorkRecordList(this.tableParam).then((response) => {
				this.tableData = response.data.listData
				this.totalPage = response.data.totalCount
			})
		},
		handleSelectionChange(){

		}
	},
    created () { },
    activated () {
		this.getShopList()
		this.getTableData()
    },
    mounted () { }
}
</script>
<style scoped>
.header_seach_wrap > div {
    margin-right: 10px;
}
</style>