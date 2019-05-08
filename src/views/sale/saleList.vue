<template>
    <div>
        <div class="model_topcol">
            <span>销售单</span>
            <div>
                <el-button class="wid90" type="primary" size="small">导出</el-button>
            </div>
        </div>
        <div class="model_content">  
            <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
                <div class="header_seach_wrap header_seach_wrap1" style="padding: 15px">
					<el-select filterable clearable @change="searInput" v-model="tableParam.shopId" placeholder="请选择门店">
						<el-option v-for="item in $store.state.home.shopList" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
                   	<el-select clearable @change="searInput" filterable v-model="tableParam.cashierId" size="small" placeholder="请选择收银员">
						<el-option v-for="item in $store.state.home.cashiers" :key="item.id" :label="item.employeeName" :value="item.id"></el-option>
                    </el-select>
					<el-select clearable @change="searInput" filterable v-model="tableParam.guiderId" size="small" placeholder="请选择导购员">
						<el-option v-for="item in $store.state.home.guideList" :key="item.id" :label="item.employeeName" :value="item.id"></el-option>
                    </el-select>
					<el-select clearable @change="searInput" filterable v-model="tableParam.payType" size="small" placeholder="请选择支付方式">
						<el-option v-for="(value, key) in $enum.payType" :key="key" :label="value" :value="key">
						</el-option>
					</el-select>
                    <el-select clearable @change="searInput" filterable v-model="tableParam.orderStatus" size="small" placeholder="请选择单据状态" style="width:150px;">
                        <el-option v-for="(value, key) in $enum.saleOderStatus" :key="key" :label="value" :value="key">
						</el-option>
                    </el-select>
                    <el-date-picker @change="datePickerChangeEvent" v-model="purchaseDate" value-format="timestamp" type="daterange" :editable="false" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间">
                    </el-date-picker>
                </div>
                <div class="header_seach_wrap" style="padding: 15px">
                    <el-input style="width: 294px" size="small" v-model="tableParam.serialNumber" placeholder="请输入流水号" prefix-icon="el-icon-search" clearable></el-input>
                    <el-button @click="searInput" type="primary" size="small">搜索</el-button>
                </div>
                <el-table :data="tableData" :height="$store.state.home.modelContentHeight - 148" ref="saleListTableWrap" style="width: 100%">
                    <el-table-column prop="shopName" label="所属门店">
                    </el-table-column>
                    <el-table-column width="150" prop="orderNo" label="流水号">
                    </el-table-column>
                    <el-table-column prop="created" label="日期">
						<template slot-scope="scope">
                            <span>{{scope.row.created | time_m}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column width="80" prop="purchaseOrderNo" label="类型">
						<template slot-scope="scope">
                            <span v-if="scope.row.orderType == 1">销售</span>
                            <span v-if="scope.row.orderType == 2">退货</span>
                            <span v-if="scope.row.orderType == 3">挂单</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="收银员">
                        <template slot-scope="scope">
                            <span class="operation" @click="toAchievement">{{scope.row.shopUserName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="会员">
                        <template slot-scope="scope">
                            <span class="operation" @click="toMemberList">{{scope.row.shopCustomerName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column width="120" prop="totalItemNum" label="商品数量">
                    </el-table-column>
					<el-table-column width="120" prop="totalPrice" label="商品金额">
                    </el-table-column>
                    <el-table-column width="120" prop="finalPrice" label="实收金额（元）" min-width="100">
                    </el-table-column>
                    <el-table-column width="120" prop="purchaseOrderNo" label="折让金额（元）" min-width="100">
						<template slot-scope="scope">
                            <span v-text="myBase.computeNumFormart(`${scope.row.totalPrice } - ${scope.row.finalPrice}`)"></span>
                        </template>
                    </el-table-column>
                    <el-table-column width="120" prop="totalProfits" label="利润（元）">
                    </el-table-column>
                    <el-table-column label="导购员">
                        <template slot-scope="scope">
                            <span class="operation" @click="toPerformance">{{scope.row.shopGuiderName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <span v-if="scope" @click="getSaleDetail(scope.row.id)" class="operation">明细</span>
                            <span class="operation" style="margin-left:10px;" @click="salePrint">打印</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="model_footer">
            <!-- <el-button class="wid90" size="small" style="margin-left: 25px;float: left;" @click="back">返回</el-button> -->
            <div class="footer_tatal">
                <span>共单数：<span class="color_red">110</span></span>
                <span>总应收（元）：<span class="color_red">290</span></span>
                <span>总实收（元）：<span class="color_red">200</span></span>
                <span>折让（元）：<span class="color_red">3</span></span>
                <span>总利润（元）：<span class="color_red">40.00</span></span>
            </div>
            <el-pagination :current-page="tableParam.pageNo" :page-sizes="[15, 30, 50, 100]" :page-size="tableParam.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalPage">
            </el-pagination>
        </div>
		<el-dialog
			title="销售单明细"
			:visible.sync="dialogVisible"
			:close-on-click-modal="false"
			width="55%"
			>
				<el-table
                    :data="tableData2"
					border
                    :height="405"
                    style="width: 100%">
					<el-table-column
                        type="index"
						label="序号"
                        width="50">
                    </el-table-column>
					<el-table-column
                        prop="itemName"
                        label="商品名称"
                        >
                    </el-table-column>
					<el-table-column
                        prop="itemNum"
                        label="商品数量"
                        >
                    </el-table-column>
					<el-table-column
                        prop="sellPrice"
                        label="商品金额"
                        >
						<template slot-scope="scope">
                            <span v-text="myBase.computeNumFormart(`${scope.row.sellPrice } * ${scope.row.itemNum}`)"></span>
                        </template>
                    </el-table-column>
					<el-table-column
                        prop="payPrice"
                        label="实收金额"
                        >
                    </el-table-column>
					<el-table-column
                        prop="remainder"
                        label="折让金额"
                        >
						<template slot-scope="scope">
                            <span v-text="myBase.computeNumFormart(`(${scope.row.sellPrice } * ${scope.row.itemNum}) - ${scope.row.payPrice}`)"></span>
                        </template>
                    </el-table-column>
					<el-table-column
                        prop="profits"
                        label="利润"
                        >
                    </el-table-column>
					<el-table-column
                        prop="shopGuiderName"
                        label="导购员"
                        >
                    </el-table-column>
				</el-table>
				<div style="height: 55px; border-top: none; line-height: 55px; padding-right: 20px" class="border">
					<div style="float: right;">
						支付方式：
						<span v-for="item in tableData2Count" :key="item.id">
							<span v-text="item.payTypeName"></span><span style="margin-right: 20px; margin-left: 10px" v-text="item.payPrice"></span>
						</span>
					</div>
				</div>
			<span slot="footer" class="dialog-footer">
				<el-button class="wid90" size="small" type="primary" @click="dialogVisible = false">取消</el-button>
			</span>
		</el-dialog>
    </div>
</template>

<script>
import api from 'api/sale'

export default {
    data () {
        return {
			tableData: [],
			countObj: {
				finalPrice: '',
				saleMoney: '',
				totalItemNum: ''
			},
			tableData2Count: [],
			tableData2: [],
			totalPage: 10,
			purchaseDate: null,
			dialogVisible: false,   
            tableParam: {
                serialNumber: '',
                pageNo: 1,
                pageSize: 15,
                shopId: '',
                cashierId: '',
                guiderId: '',
                payType: '',
                orderStatus: '',
                startTime: '',
                endTime: '',
            }
        }
    },
    computed: {},
    created () { },
    activated () {
        this.getList();
    },
    mounted () { },
    methods: {
		getSaleDetail(id){
			this.dialogVisible = true
			api.getSaleDetail(id).then((response) => {
				this.tableData2 = response.data.orderItemList
				this.tableData2Count = response.data.orderPayDetailList
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
			this.getList()
		},
		searInput(){
			this.tableParam.pageNo = 1
			this.getList()
		},
        getList () {
            api.getSaleList(this.tableParam).then((res) => {
				this.tableData = res.data.listData
				this.totalPage = res.data.totalCount
				this.countObj = res.data.count
            })
        },
        // 跳转收银员业绩
        toAchievement () {
			this.myBase.switchRouter(8, 54)
        },
        // 跳转会员资料
        toMemberList () {
			this.myBase.switchRouter(6, 47)
        },
        // 跳转导购员业绩
        toPerformance () {
			this.myBase.switchRouter(8, 55)
        },
        salePrint () {
            this.$print(this.$refs.saleListTableWrap)
        }
    }
}
</script>
<style scoped>
.header_seach_wrap > div {
    margin-right: 10px;
}
.header_seach_wrap1 {
    white-space: nowrap;
    overflow: hidden;
    border-bottom: 1px solid #e4e7ed;
}
.operation {
    color: #399cff;
    cursor: pointer;
}
.footer_tatal {
    float: left;
    line-height: 50px;
    font-size: 14px;
    font-weight: 400;
    color: #616266;
    margin-left: 25px;
}
.footer_tatal > span {
    margin-right: 30px;
}
</style>