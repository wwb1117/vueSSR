<template>
    <div>
        <div class="model_topcol">
			<span v-if='this.$route.query.id'>次卡 - 编辑次卡</span>
            <span v-else>次卡 - 新增次卡</span>
        </div>
        <div class="model_content">
            <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
                <div>
                    <div class='second_header'>使用门店</div>
                        <el-form ref="tableData" :rules="rules" size='small' :model="tableData" label-position="right" label-width="110px">
                            <el-form-item label="创建门店">
                                <el-input disabled v-model="tableData.shopName" placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item prop="userId" label="使用门店">
                                <el-select
                                    v-model="tableData.userId"
                                    multiple
                                    collapse-tags
                                    placeholder="请选择使用门店">
                                    <el-option
                                        v-for="item in shopList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <div class='second_header'>次卡信息</div>
                            <el-form-item prop="cardName" label="次卡名称">
                                <el-input v-model="tableData.cardName" placeholder="请输入次卡名称"></el-input>
                            </el-form-item>
                            <el-form-item required label="消费商品">
								<span v-if='purchaseListTable' style="margin-right:10px">已选择1件商品</span>
								<el-button type="text" size='medium' @click='addGoods()'>+ 选择商品</el-button>
                            </el-form-item>
                            <el-form-item prop="soldNumber" label="可用次数">
                                <el-input v-model.number="tableData.soldNumber" placeholder="请输入可用次数"></el-input>
                            </el-form-item>
                            <el-form-item prop="sellingPrice" label="销售价格">
                                <el-input @change.native="giftNumberKeyUp(tableData)" @keyup.native="giftNumberKeyUp(tableData)" v-model="tableData.sellingPrice" placeholder="请输入销售价格"><template slot="suffix">元</template></el-input>
                            </el-form-item>
                            <el-form-item label="有效时间">
                                <el-select v-model="tableData.effectiveTimeType" placeholder="请选择">
                                    <el-option key="0" label="不限制" :value="0"></el-option>
                                    <el-option key="1" label="限制天数" :value="1"></el-option>
                                    <el-option key="2" label="固定日期" :value="2"></el-option>
                                </el-select>
                                <el-input class='anotherBlack' v-if='tableData.effectiveTimeType == 1' v-model="tableData.effectiveDays" placeholder="">
                                    <template slot="suffix">天</template>
                                </el-input>
                                <el-date-picker
                                    v-if='tableData.effectiveTimeType == 2'
                                    style="margin-left:10px"
                                    v-model="timer"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="使用限制">
                                <el-select v-model="tableData.dailyLimit" placeholder="请选择">
                                    <el-option key="0" label="不限制" :value="0"></el-option>
                                    <el-option key="1" label="每日限制次数" :value="1"></el-option>
                                    <el-option key="2" label="每周限制次数" :value="2"></el-option>
                                    <el-option key="3" label="每月限制次数" :value="3"></el-option>
                                </el-select>
                                <el-input class='anotherBlack' v-if='tableData.dailyLimit != 0' v-model="tableData.limitNumber"><template slot="suffix">次</template></el-input>
                            </el-form-item>
                            <el-form-item required label="是否提成">
                                <template>
									<el-radio-group v-model="tableData.promote">
										<el-radio :label="false">不参与提成</el-radio>
										<el-radio :label="true">参与提成</el-radio>
									</el-radio-group>
                                </template>
                            </el-form-item>
                            <el-form-item v-show='tableData.promote'>
                                <template>
                                    <div class='second_inner_black'>
                                        <el-radio v-model="tableData.promoteType" :label="0">销售价 × 导购员提成百分比</el-radio><br/>
										<el-radio v-model="tableData.promoteType" :label="1">
											固定金额 <el-input size='small' v-model="promoteAmount1" placeholder=""></el-input>
										</el-radio>
										<br/>
                                        <el-radio v-model="tableData.promoteType" :label="2">
											销售价 × <el-input size='small' v-model="promoteAmount2" placeholder=""></el-input> %
										</el-radio>
										<br/>
                                        <el-radio v-model="tableData.promoteType" :label="3">
											销售价 × 导购员提成百分比 <el-input size='small' v-model="promoteAmount3" placeholder=""></el-input> %
										</el-radio>
                                    </div> 
                                </template>
                            </el-form-item>
                        </el-form>
                    </div>
            </div>
        </div>
        <div class="model_footer">
            <el-button size="small" class='wid90' style="margin:0 15px;" @click='close()'>取消</el-button>
            <el-button type="primary" class='wid90' size="small" @click='addSecond("tableData")'>保存</el-button>
        </div>
        <el-dialog
            title="选择商品"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            width="55%"
            >
            <div class="dialog_top">
				<el-cascader
					placeholder="请选择商品分类"
					clearable
					@change="cateSelectChange"
					v-model="categoryIdArr"
					:options="categoryList"
					change-on-select
					:props='categoryOptionProps'
					size='small'>
				</el-cascader>
				<el-input style="width:40%;margin-left:10px;" clearable @change="search" size="small" v-model="tableMember.combinationStr" placeholder="请输入商品名称"></el-input>
				<el-button style="margin-right: 20px;" type="primary" size="small" @click='search()'>搜索</el-button>
            </div>
            <el-table
                :data="goodList"
                border
                :height="405"
                highlight-current-row
                @current-change="handleSelectionChange"
                ref="newSecondListTable"
                style="width: 100%">
                <el-table-column
                    type="index"
                    width="50">
                </el-table-column>
                <el-table-column
                    prop="itemName"
                    label="商品名称"
                    >
                </el-table-column>
                <el-table-column
                    prop="itemBarcode"
                    label="条码"
                    >
                </el-table-column>
            </el-table>
            <div style="height: 55px; border-top: none;" class="border">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
                    :current-page="tableMember.pageNo"
                    :page-sizes="[15, 30, 50, 100]"
                    :page-size="15"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalPage">
                </el-pagination>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button class="wid90" size="small" @click="dialogVisible = false">取消</el-button>
                <el-button class="wid90" size="small" type="primary" @click="chooseGoods()">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
    
<script>
    import api from 'api/member'
	import api2 from 'api/good'
	import capi from 'api/common'
	import mqn from '../../utils/mqn.js'
    export default {
        data() {
            return {
                dialogVisible:false,
                totalPage:'',
                tableMember: {
					combinationStr:'',
					categoryIds: '',
                    pageNo: 1,
                    pageSize: 15
				},  
				categoryIdArr: [],
				categoryList: [],
				categoryOptionProps: {
					label:'categoryName',
					value:'id',
					children: 'categoryList'
				},
                timer:[],
                purchaseListTable:'',
                mallList:[],
				goodList:[],
				promoteAmount1:'',
				promoteAmount2:'',
				promoteAmount3:'',
                tableData:{
                    shopName:this.$store.state.home.currentShop.shopName,
                    shopId:this.$store.state.home.currentShop.id,
                    userId:[],
                    cardName:'',
                    sellingPrice:'',
                    effectiveTimeType:'',
                    effectiveDays:'',
                    soldNumber:'',
                    startTime:'',
                    endTime:'',
                    itemId:'',
                    itemName:'',
					limitNumber:'',
					dailyLimit:'',
					promote:true,
					promoteType:0,
					promoteAmount:''
                },
                shopList:this.$store.state.home.shopList,
                rules:{
                    userId: [
                        { required: true, message: '请选择使用门店', trigger: 'change' },
                    ],
                    cardName: [
                        {required: true, message: '请输入次卡名称', trigger: 'blur' },
                    ],
                    soldNumber: [
                        {required: true, message: '请输入可用次数', trigger: 'blur' },
                        { type: 'number', message: '可用次数必须为数字值'}
                    ],
                    sellingPrice: [
                        {required: true, message: '请输入销售价格', trigger: 'blur' },
                        // { type: 'number', message: '销售价格必须为数字值'}
                    ]
                }
            }
        },
        computed: {},
        methods: {
			getDetail(){
				api.getCountCard(this.$route.query.id).then((res)=>{
					this.tableData = res.data
					this.tableData.userId = res.data.userIds.split(",").map(Number)
					this.purchaseListTable = {
						itemName:res.data.itemName,
						itemId:res.data.itemId
					}
					if(this.tableData.promoteType == 1){
						this.promoteAmount1 = res.data.promoteAmount
					} else if (this.tableData.promoteType == 2){
						this.promoteAmount2 = res.data.promoteAmount
					} else if (this.tableData.promoteType == 3){
						this.promoteAmount3 = res.data.promoteAmount
					}
				})
			},
            addSecond(formName){
                if(this.purchaseListTable == ''){
                    this.$message({
                        type: 'warning',
                        duration: 1500,
                        showClose: true,
                        message: '请选择消费商品'
                    })
                    return
                }
                if(this.tableData.effectiveTimeType == 2){
                    if(this.timer.length == 0){
                        this.tableData.startTime = ''
                        this.tableData.endTime = ''
                    } else {
                        this.tableData.startTime = this.timer[0] / 1000
                        this.tableData.endTime = this.timer[1] / 1000
                    }
				}
				if(this.tableData.promoteType == 1){
					this.tableData.promoteAmount = this.promoteAmount1
				} else if (this.tableData.promoteType == 2){
					this.tableData.promoteAmount = this.promoteAmount2
				} else if (this.tableData.promoteType == 3){
					this.tableData.promoteAmount = this.promoteAmount3
				}
				if(this.tableData.promoteAmount == ''){
                    this.$message({
                        type: 'warning',
                        duration: 1500,
                        showClose: true,
                        message: '请添加提成设置'
                    })
                    return
                }
				if(this.tableData.promote == false){
					this.$delete(this.tableData, 'promoteAmount')
					this.$delete(this.tableData, 'promoteType')
				}
                this.tableData.userIds = this.tableData.userId.join()
                this.tableData.itemName = this.purchaseListTable.itemName
                this.tableData.itemId = this.purchaseListTable.itemId
                this.$refs[formName].validate((valid) => {
                    if (valid) {
						if(this.$route.query.id){
							api.editCountCard(this.tableData).then((res)=>{
								this.$message({
									type: 'success',
									duration: 1500,
									showClose: true,
									message: '编辑次卡成功'
								})
								this.close()
							})
						} else {
							api.addCountCard(this.tableData).then((res)=>{
								this.$message({
									type: 'success',
									duration: 1500,
									showClose: true,
									message: '添加次卡成功'
								})
								this.close()
							})
						}
                    } else {
                        return false;
                    }
                });
			},
			giftNumberKeyUp(data){
				data.sellingPrice = this.myBase.formatFloatTwo(data.sellingPrice)
			},
            addGoods(){
                this.dialogVisible = true
			},
			chooseGoods(){
				if(this.purchaseListTable.length == 0){
                    this.$message({
                        type: 'warning',
                        duration: 1500,
                        showClose: true,
                        message: '请选择消费商品'
                    })
                    return
				}
				this.dialogVisible = false
			},
            handleSelectionChange(val){
				this.purchaseListTable = val
            },   
            getGoodsList(){
                api2.getGoodsList(this.tableMember).then((res)=>{
                    this.goodList = res.data.listData
                    this.totalPage = res.data.totalCount
                })
            },
            close(){
                this.$router.push({
                    path: '/secondCardList'
                }) 
            },
            handleCurrentChange(val){
                this.tableMember.pageNo = val
                this.getGoodsList()
            },
            handleSizeChange(val){
                //选择每页数据
                this.tableMember.pageSize = val
                this.getGoodsList()
			},
			search(){
				this.tableMember.pageNo = 1
				this.getGoodsList()
			},
			cateSelectChange(){
				this.tableMember.categoryIds = this.categoryIdArr.join(',')
				this.tableMember.pageNo = 1
				this.getGoodsList()
			},
			getCategoryList(){
				capi.allCategory().then((response) => {
					this.categoryList = response.data
				})
			},
			clearAll(){
				this.purchaseListTable = ''
				this.promoteAmount1 = ''
				this.promoteAmount2 = ''
				this.promoteAmount3 = ''
				this.tableData = {
                    shopName:this.$store.state.home.currentShop.shopName,
                    shopId:this.$store.state.home.currentShop.id,
                    userId:[],
                    cardName:'',
                    sellingPrice:'',
                    effectiveTimeType:'',
                    effectiveDays:'',
                    soldNumber:'',
                    startTime:'',
                    endTime:'',
                    itemId:'',
                    itemName:'',
					limitNumber:'',
					dailyLimit:'',
					ispromote:1,
					promoteType:0,
					promoteAmount:''
                }
			}
        },
        created() {},
        activated() {
			if (this.$route.query.id) {
				this.getDetail()
			}
            this.$refs.tableData.resetFields();
			this.getGoodsList()
			this.getCategoryList()
			this.clearAll()
        },
        mounted() {}
    }
</script>
<style lang='scss' scoped>
    .el-form-item{
        padding: 10px 0;
    }
    .header_seach_wrap>div {
        margin-right: 10px;
    }
    .dialog_top{
        margin-top: -15px; 
        margin-bottom: 15px;
    }
    .dialog_top>div{
        margin-right: 10px;
    }
    .second_header{
        padding: 10px 20px;
        margin-bottom: 20px;
        background: #F5F5F5;
        font-weight: 700;
    }
    /* div{
        margin-bottom:20px;
    } */
    .el-input{
        width:20%;
    }
    .el-select{
        width:20%;
    }
    .second_inner_black{
        margin-bottom:10px;
        margin-left:-10px;
        padding: 10px;
        background: #F8F8F8;
        span:first-child{
            margin-left:20px;
            margin-right:50px;
            .chooseLength{
                color: #409EFF;margin:0 5px
            }
        }
        .el-input{
            margin-left:10px;
            width:100px
        }
        .el-radio{
            margin-bottom: 10px
        }
    }
    .anotherBlack{
        margin-left:10px;
        width:100px
    }
    .second_inner_choose{
        margin-left:70px;
        .el-button--text{margin:0 20px;}
        span{color: #409EFF;margin:0 5px}
    }
</style>