<template>
        <div class='memberList-details'>
            <div class="window_mask" v-show="searchShow"></div>
            <div class="model_topcol">
                <span>会员资料</span>
                <div>
                    <el-button v-perss='140' class="wid90" type="primary" size="small" @click='addMember()'>新增会员</el-button>
                    <el-button v-perss='143' type="primary" class='wid90' size="small">导出</el-button>
                    <el-button v-perss='142' size="small" type="primary" class='wid90' @click='goLead()'>导入</el-button>
                </div>
            </div>
            <div class="model_content">
                <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
                    <div class="header_seach_wrap" style="padding: 15px">
                        <el-select filterable clearable @change="search" v-model="tableMember.shopId" size="small" placeholder="开卡门店">
                            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                        <el-select filterable clearable @change="search" v-model="tableMember.levelIds" size="small" placeholder="全部等级">
                            <el-option v-for="item in mallList" :key="item.id" :label="item.levelName" :value="item.id">
                            </el-option>
                        </el-select>
                        <el-input clearable @change="search" prefix-icon="el-icon-search" style="width: 294px" size="small" v-model="tableMember.keyWord" placeholder="请输入卡号/姓名/手机号"></el-input>
                        <el-button type="primary" size="small" @click='search()'>搜索</el-button>
                        <el-button type='text' style='font-size: 14px;margin-left:10px;cursor: pointer;' @click="searchShow = true">高级搜索</el-button>
                        <el-card v-show="searchShow" class="box_card">
                            <div slot="header" class="clearfix">
                                <span :style="{fontSize: '16px'}">高级搜索</span>
                                <i class="el-icon-close" @click="searchShow = false" style="float: right; padding: 3px 0; cursor: pointer"></i>
                            </div>
                            <el-form :model="tableMember" label-position="right" label-width='100px' size="small" >
                                <el-form-item label="会员状态">
                                    <el-radio v-model="tableMember.status" label="" border>不限</el-radio>
                                    <el-radio v-model="tableMember.status" label="0" border>启用</el-radio>
                                    <el-radio v-model="tableMember.status" label="1" border>禁用</el-radio>
                                </el-form-item>   
                                <el-form-item label="开卡日期">
                                    <el-radio v-model="tableMember.createCardDate" label="" border>不限</el-radio>
                                    <el-radio v-model="tableMember.createCardDate" label="2" border>一周内</el-radio>
                                    <el-radio v-model="tableMember.createCardDate" label="3" border>一月内</el-radio>
                                    <el-radio v-model="tableMember.createCardDate" label="4" border>三月内</el-radio>
                                    <el-radio v-model="tableMember.createCardDate" label="5" border>今年内</el-radio>
                                    <el-radio v-model="tableMember.createCardDate" label="6" border>自定义</el-radio>
                                    <el-date-picker
                                    v-if='tableMember.createCardDate == 6'
                                        v-model="timer"
                                        type="daterange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                    </el-date-picker>
                                </el-form-item>   
                                <el-form-item label="会员性别">
                                    <el-radio v-model="tableMember.sex" label="" border>不限</el-radio>
                                    <el-radio v-model="tableMember.sex" label="0" border>男</el-radio>
                                    <el-radio v-model="tableMember.sex" label="1" border>女</el-radio>
                                    <el-radio v-model="tableMember.sex" label="2" border>未知</el-radio>
                                </el-form-item>   
                                <el-form-item label="会员年龄">
                                    <el-radio v-model="tableMember.ages" label="" border>不限</el-radio>
                                    <el-radio v-model="tableMember.ages" label="2" border>10岁以下</el-radio>
                                    <el-radio v-model="tableMember.ages" label="3" border>11-20岁</el-radio>
                                    <el-radio v-model="tableMember.ages" label="4" border>21-30岁</el-radio>
                                    <el-radio v-model="tableMember.ages" label="5" border>31-40岁</el-radio>
                                    <el-radio v-model="tableMember.ages" label="6" border>41-50岁</el-radio>
                                    <el-radio v-model="tableMember.ages" label="7" border>自定义</el-radio>
                                    <el-input v-if='tableMember.ages == 7' v-model="tableMember.searchWord" style="width:75px"><template slot="suffix">岁</template></el-input> <span v-if='radio == 7'> -  </span>
                                    <el-input v-if='tableMember.ages == 7' v-model="tableMember.searchWord" style="width:75px"><template slot="suffix">岁</template></el-input>
                                </el-form-item>   
                                <el-form-item>
                                    <el-button @click="search()" style="width: 90px;margin-left: -68px;" type="primary">确定</el-button>
                                    <el-button @click="searchShow = false" style="width: 90px">取消</el-button>
                                    <el-button class="color_hover" @click="clearAll" type="text" style="width: 40px; color: #636365">清空</el-button>
                                </el-form-item>
                            </el-form>
                        </el-card>
                    </div>
                    <el-table
                        :data="tableData"
                        height = 'calc(100% - 70px)'
                        style="width: 100%;overflow-y: auto"
                        ref="purchaseListTable"
                        @selection-change="handleSelectionChange">
                        <!-- <el-table-column
                            type="selection"
                            :reserve-selection="true"
                            width="55">
                        </el-table-column> -->
                        <el-table-column
                            prop="cardNumber"
                            label="会员号"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="customerName"
                            label="姓名"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="cellPhone"
                            label="手机号"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="levelName"
                            label="会员等级"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="cardBalance"
                            label="余额"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="cardIntegral"
                            label="积分"
                            >
                        </el-table-column>
                        <el-table-column
                            label="宝宝"
                            >
                            <template slot-scope="scope">
                                <div>
									<span v-if='scope.row.babyCount == 0' type="text" size='small' style='color:#000'>{{scope.row.babyCount}}</span>
									<el-button v-else type="text" size='small' @click='showBaby(scope.row.babys, scope.row.babyCount)'>{{scope.row.babyCount}}</el-button>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="次卡"
                            >
                            <template slot-scope="scope">
                                <div>
                                    <el-button type="text" size='small' @click='goSecondCard()'>{{scope.row.countCardNumber}}</el-button>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="guiderName"
                            label="导购员"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="shopName"
                            label="开卡门店"
                            >
                        </el-table-column>
                        <el-table-column
                            label="开卡日期"
                            >
                            <template slot-scope="scope">
                                <div>
                                    <span v-if='scope.row.cardCreateDate'>{{scope.row.cardCreateDate | time_s}}</span>
                                    <span v-else>-</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="purchaseOrderNo"
                            width="150"
                            label="操作">
                             <template slot-scope="scope">
                                <div v-if="scope">
									<el-button
										v-perss='141'
                                        @click="propEvent(1, scope.row.id)"
                                        type="text"
                                        size="small">
                                        编辑
                                    </el-button>
                                    <el-button
                                        @click="propEvent(2, scope.row.id)"
                                        type="text"
                                        size="small">
                                        操作
                                    </el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="model_footer">
                <div class="footer_tips">
                    <span>会员数：<span class="color_red">13545</span></span>
                    <span>充值余额：<span class="color_red">31843</span></span>
                    <span>总积分：<span class="color_red">31843</span></span>
                </div>
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
            <!-- 宝宝资料 -->
            <el-dialog
                :title="titles"
                :visible.sync="dialogVisible"
				:close-on-click-modal="false"
                width="55%"
                >
                <el-table
					:data="babyData"
					height = "200px"
                	style = "width: 100%;overflow: auto"
                    border
                    ref="purchaseListTable"
                    >
                    <el-table-column
                        prop="babyName"
                        label="宝宝名称"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="sex"
                        label="性别"
                        >
                        <template slot-scope="scope">
                            <span v-if='scope.row.sex == 0'>女</span>
                            <span v-if='scope.row.sex == 1'>男</span>
                            <span v-if='scope.row.sex == 2'>未知</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="出生日期"
                        >
                        <template slot-scope="scope">
                            <div>
                                <span v-if='scope.row.purchaseOrderNo'>{{scope.row.birthDate | time_s}}</span>
                                <span v-else>-</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="birthMode"
                        label="出生方式"
                        >
                    </el-table-column><el-table-column
                        prop="remark"
                        label="备注"
                        >
                    </el-table-column>
                </el-table>
                <span slot="footer" class="dialog-footer">
                    <el-button class="wid90" size="small" @click="dialogVisible = false">取消</el-button>
                    <el-button class="wid90" size="small" type="primary" @click="dialogVisible = false">确定</el-button>
                </span>
            </el-dialog>
        </div>
    </template>
    
    <script>
        import api from 'api/member'
	    import api2 from 'api/common'
        export default {
            data() {
                return {
                    //高级搜索
                    timer:'',
                    radio:'1',
                    titles:'',
                    babyData:[],
                    searchShow:false,
                    dialogVisible: false,
                    tableData: [],
                    mallList: [],
				    options:[],
                    totalPage: 0,
                    tableMember: {
                        shopId:'',
                        levelIds:'',
                        ages:'',
                        sex:'',
                        status:'',
                        createCardDate:'',
                        keyWord:'',
                        purchaseDate: '',
                        pageNo: 1,
                        pageSize: 15
                    }
                }
            },
            computed: {},
            methods: {
                search(){
                    this.tableMember.pageNo = 1
                    this.searchShow = false
                    this.getList()
                },
                getList(){
                    api.memberList(this.tableMember).then((res)=>{
                        console.log(res)
                        this.tableData = res.data.listData
                        this.totalPage = res.data.totalCount
                    })
                },
                clearAll() {
                    this.tableMember = {
                        shopId:'',
                        levelIds:'',
                        ages:'',
                        sex:'',
                        status:'',
                        createCardDate:'',
                        keyWord:'',
                        purchaseDate: '',
                        pageNo: 1,
                        pageSize: 15
                    }
                    this.getList()
                },
                goSecondCard(){
                    this.$router.push({
                        path: '/secondCardList'
                    })
                },
                goLead(){
                    this.$router.push({
                        path: '/leadTable'
                    })
                },
                showBaby(val, title){
                    this.babyData = val
                    this.titles = title + '的宝宝'
                    this.dialogVisible = true
                    
                    console.log(val,'babhy')
                },
                addMember(){
                    this.$router.push({
                        path: '/newMember'
                    })
                },
                propEvent(type, id){
                    if (type == 1) { //编辑
                        this.$store.commit('setPageData', id)
                        this.$router.push({
							path: '/newMember',
							query: {
								id: id
							}
                        })
                    }
                    if (type == 2) { // 操作
                        this.$store.commit('setPageData', id)
                        this.$router.push({
                            path: '/memberDetail'
                        })
                    }
                },
                handleSelectionChange(){
                },
                handleCurrentChange(val){
                    this.tableMember.pageNo = val
                    this.getList()
                },
                handleSizeChange(val){
                    //选择每页数据
                    this.tableMember.pageSize = val
                    this.getList()
                },
                //所有供应商
                allShops(){
                    api2.allShops().then((res) => {
                        this.options = res.data
                    })
                },
                //所有会员等级
                allLevel(){
                    api.levelList().then((res) => {
                        this.mallList = res.data
                    })
                }
            },
            created() {},
            activated() {
                this.allShops()
                this.getList()
                this.allLevel()
            },
            mounted() {}
        }
    </script>
    <style>
        .memberList-details .el-radio__input{display: none;}
        .memberList-details .el-radio__label{padding-left:3px}
        .memberList-details .el-radio{margin-right:15px}
    </style>
    <style scoped>
        .header_seach_wrap>div {
            margin-right: 10px;
        }
        .box_card{
            position: fixed;
            left: 210px;
            top: 40px;
            width: 85%;
            background: #FFF;
            z-index: 11;
            line-height: 22px;
        }
        .window_mask{
            position: absolute;
            width: 112%;
            height: 100%;
            background: #000;
            opacity: 0.5;
            z-index: 10;
            left: -12%;
            top: 0%;
        }
    </style>