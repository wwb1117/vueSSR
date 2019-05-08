<template>
    <div>
        <div class="model_topcol">
            <span>促销活动</span>
            <div>
                <el-button v-perss='160' type="primary" size="small" @click='newMarketing'>新增促销活动</el-button>
            </div>
        </div>
        <div class="model_content">
            <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
                <div class="header_seach_wrap" style="padding: 15px">
                    <el-select clearable @change="searInputEvent" filterable v-model="tableMember.shopId" placeholder="全部门店">
                        <el-option v-for="item in shopList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-select clearable @change="searInputEvent" filterable v-model="tableMember.activityType" placeholder="全部促销类型">
                       <el-option v-for="(value, key) in $enum.activityType" :key="key" :label="value" :value="key">
						</el-option>
                    </el-select>
                    <el-select clearable @change="searInputEvent" filterable v-model="tableMember.expiredStatus" placeholder="全部到期状态">
                        <el-option key="0" label="未过期" :value="0"></el-option>
                        <el-option key="1" label="已结束" :value="1"></el-option>
                    </el-select>
                    <el-select clearable @change="searInputEvent" filterable v-model="tableMember.enableStatus" placeholder="全部使用状态">
                        <el-option key="0" label="正常" :value="0"></el-option>
                        <el-option key="1" label="禁用" :value="1"></el-option>
                    </el-select>
                    <el-input clearable @change="searInputEvent" prefix-icon="el-icon-search" style="width: 294px" v-model="tableMember.activityName" placeholder="促销活动名称"></el-input>
                    <el-button @click="searInputEvent" type="primary" size="small">搜索</el-button>
                </div>
                <el-table
                    :data="tableData"
                    ref="purchaseListTable"
                    height = 'calc(100% - 62px)'
                    style="width: 100%;overflow-y: auto">
                    <!-- <el-table-column
                        type="selection"
                        :reserve-selection="true"
                        width="55">
                    </el-table-column> -->
                    <el-table-column
                        prop="activityName"
                        label="活动名称"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="shopName"
                        label="创建门店"
                        >
                    </el-table-column>
                    <el-table-column
                        label="促销类型"
                        >
                        <template slot-scope="scope">
                            <div>
                                <span v-if='scope.row.activityType == 1'>满额返现</span>
                                <span v-if='scope.row.activityType == 2'>打折促销</span>
                                <span v-if='scope.row.activityType == 3'>套餐促销</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="适用范围"
                        >
                        <template slot-scope="scope">
                            <div>
                                <span v-if='scope.row.rangeType == 1'>实体店</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="开始日期"
                        >
                        <template slot-scope="scope">
                            <div>
                                <span v-if='scope.row.startTime'>{{scope.row.startTime | time_s}}</span>
                                <span v-else>-</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="结束日期"
                        >
                        <template slot-scope="scope">
                            <div>
                                <span v-if='scope.row.endTime'>{{scope.row.endTime | time_s}}</span>
                                <span v-else>-</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="到期状态"
                        >
                        <template slot-scope="scope">
                            <div>
                                <span style="color:#67C23A" v-if='scope.row.expiredStatus == 0'>未过期</span>
                                <span v-if='scope.row.expiredStatus == 1'>已结束</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="enableStatus"
                        label="使用状态"
                        >
                        <template slot-scope="scope">
                            <div>
                                <span v-if='scope.row.enableStatus == 0'>禁用</span>
                                <span v-if='scope.row.enableStatus == 1'>启用</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="purchaseOrderNo"
                        width="150"
                        label="操作">
                            <template slot-scope="scope">
                            <div>
                                <el-button
                                    @click="propEvent(2, scope.row.id)"
                                    type="text"
                                    size="small">
                                    编辑
                                </el-button>
                                <el-button
                                    v-if='scope.row.enableStatus == 0'
                                    @click="propEvent(1, scope.row.id)"
                                    type="text"
                                    size="small">
                                    启用
                                </el-button>
                                <el-button
                                    v-if='scope.row.enableStatus == 1'
                                    @click="propEvent(0, scope.row.id)"
                                    type="text"
                                    size="small">
                                    禁用
                                </el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="model_footer">
            <el-pagination 
                @size-change="handleSizeChange"
				@current-change="handleCurrentChange"
                :current-page="tableMember.pageNo"
                :page-sizes="[15, 30, 50, 100]"
                :page-size="tableMember.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalPage">
            </el-pagination>
        </div>
    </div>
</template>
    
    <script>
		import api from 'api/marking'
		import capi from 'api/common'
        export default {
            data() {
                return {
                    tableData: [],
					mallList: [],
					shopList: [],
                    totalPage: 10,
                    tableMember: {
                        activityType: '',
						expiredStatus: '',
						enableStatus: '',
						activityName: '',
                        pageNo: 1,
                        pageSize: 15
                    }
                }
            },
            computed: {},
            methods: {
				searInputEvent(){
					this.tableMember.pageNo = 1
					this.getList()
				},
                getList(){
                    api.activityList(this.tableMember).then((res)=>{
						this.tableData = res.data.listData
						this.totalPage = res.data.totalCount
                    })
                },
                newMarketing(){
                    this.$router.push({
                        path: '/newMarket'
                    })
                },
                propEvent(type, id){
                    if (type == 0) {
                        this.$confirm('你确定要禁用吗?', '禁用确认', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            api.disableActivity({id:id}).then((res)=>{
                                this.$message({
                                    type: 'success',
                                    duration: 1500,
                                    showClose: true,
                                    message: '禁用成功'
                                })
                                this.getList()
                            })
                        }).catch(() => {
                            this.$message({
                                showClose: true,
                                type: 'info',
                                message: '已取消操作'
                            });          
                        });
                    }
                    if (type == 1) {
                        this.$confirm('你确定要启用吗?', '启用确认', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            api.enableActivity({id:id}).then((res)=>{
                                this.$message({
                                    type: 'success',
                                    duration: 1500,
                                    showClose: true,
                                    message: '启用成功'
                                })
                                this.getList()
                            })
                        }).catch(() => {
                            this.$message({
                                showClose: true,
                                type: 'info',
                                message: '已取消操作'
                            });          
                        });
                    }
                    if (type == 2) {
                        this.$store.commit('setPageData', id)
                        this.$router.push({
                            path: '/editMarket'
                        })
                    }
                },
                handleCurrentChange(val){
                    this.tableMember.pageNo = val
                    this.getList()
                },
                handleSizeChange(val){
                    console.log(val)
                    //选择每页数据
                    this.tableMember.pageSize = val
                    this.getList()
                },
                getShopList(){
					capi.allShops().then((res) => {
						this.shopList = res.data
					})
				}
            },
            created() {},
            activated() {
				this.getList()
				this.getShopList()
            },
            mounted() {}
        }
    </script>
    <style scoped>
        .header_seach_wrap>div {
            margin-right: 10px;
        }
    </style>