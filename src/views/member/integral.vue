<template>
    <div>
        <div class="model_topcol">
            <span>积分规则</span>
        </div>
        <div class="model_content">
            <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
				<div class="header_seach_wrap" style="padding: 15px">
					<el-input v-model="shopName" style="width:20%" disabled></el-input>
                    <!-- <el-select filterable  multiple v-model="shopIdArr" size="small" placeholder="请选择规格适用门店">
                        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
					</el-select> -->
                </div>
                <div>
                    <div class='second_header'>积分累计规则</div>
                    <div class='second_inner'>
                        <div>
                            <span style="margin-right:10px;">累计方式</span>
                            <template>
                                <el-radio v-model="radio" label="1">按金额积分</el-radio>
                          </template>
                        </div>
                        <div class='second_inner_black'>
                            <span>每消费<el-input type='tel' size="small" v-model.number="integralData.monetary"></el-input>元,积1分</span>
                            <template>
                                <!-- `checked` 为 true 或 false -->
                                <el-checkbox v-model="integralData.isRounding">积分取整</el-checkbox>
                                <el-checkbox v-model="integralData.isIntegral">无码商品参与积分</el-checkbox>
                            </template>
                        </div>
                        <div class='second_inner_choose'>
                            <el-button type="text" @click='chooseGoods(1)'>设置不积分商品</el-button>已设置礼品<span v-text='multipleSelection2.length'> 0 </span>种
                        </div>
                    </div>
                    <div class='second_header'>积分兑换规则</div>
                    <div class='second_inner'>
                        <div>
							<span style="margin-right:10px;">兑换方式</span>
							<template>
								<el-radio-group style="margin-bottom:0" v-model="integralData.exchangeType">
									<el-radio :label="1">兑换礼品</el-radio>
									<!-- <el-radio :label="2">抵扣现金</el-radio> -->
									<el-radio :label="3">无</el-radio>
								</el-radio-group>
							</template>
                        </div>
                        <div class='change_inner' v-show='integralData.exchangeType == 1'>
                            <div class='second_inner_black' style='margin-bottom:0' v-for='(data, index) in ruleData' :key="index">
                                <span>可用<el-input type='tel' size="small" v-model.number="data.integralValue"></el-input>分兑换一个礼品,已设置礼品<span class='chooseLength' v-text='ruleData[index].list.length'> 0 </span>种</span>
                                <el-button type="text" @click='chooseGoods(2, index)'>设置可兑换礼品</el-button>
                                <el-button type="text" v-if='regIcon == true' @click='removeRule(index)'>删除</el-button>
                            </div>
                            <el-button type="text" style="margin-left:70px;" @click='addRule()'>+ 添加兑换规则</el-button>
                        </div>
                        <!-- <div class='change_inner' v-show='integralData.exchangeType == 2'>
                            <div class='second_inner_black'>
                                <span>可用<el-input type='tel' size="small" v-model.number="integralData.integral"></el-input>分,<span>兑换1元</span></span>
                            </div>       
                        </div> -->
                        <div>
                            <span style="margin-right:10px;">清空积分</span>
                            <template>
                                <el-checkbox v-model="integralData.isClean">在每年的1月1号凌晨,充值会员的积分为0</el-checkbox>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="model_footer">
            <!-- <el-button size="small" style="margin:0 15px;" class="wid90">取消</el-button> -->
            <el-button style="margin-left: 25px;" type="primary" size="small" class="wid90" @click='saveintegralData()'>保存</el-button>
        </div>
        <!-- 选择商品 -->
        <el-dialog
            :title = chooseNum
            :visible.sync="dialogVisibleChoose"
            :close-on-click-modal="false"
            width="55%"
            >
            <el-table
                v-if = "chooseNum == '设置不积分商品'"
                :data="chooseGoodsList"
                border
                :height="405"
                @selection-change="handleSelectionChange2"
                ref="multipleSelection"
                style="width: 100%">
                <el-table-column
                    type="selection"
                    :reserve-selection="true"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="itemName"
                    width="250"
                    label="商品名称"
                    >
                </el-table-column>
                <el-table-column
                    prop="itemBarcode"
                    label="条码"
                    >
                </el-table-column>
                <el-table-column
                    prop="categoryName"
                    label="分类"
                    >
                </el-table-column>
                <el-table-column
                    prop="skuSellPrice"
                    label="售价"
                    >
				</el-table-column>
				<el-table-column
					label="操作"
					>
					<template slot-scope="scope">
						<el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, chooseGoodsList)">删除</el-button>
					</template>
				</el-table-column>
            </el-table>
            <el-table
                v-if = "chooseNum == '设置可兑换商品'"
                :data="chooseGoodsList1"
                border
                :height="405"
                @selection-change="handleSelectionChange2"
                ref="multipleSelection"
                style="width: 100%">
                <el-table-column
                    type="selection"
                    :reserve-selection="true"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="itemName"
                    width="250"
                    label="商品名称"
                    >
                </el-table-column>
                <el-table-column
                    prop="itemBarcode"
                    label="条码"
                    >
                </el-table-column>
                <el-table-column
                    prop="categoryName"
                    label="分类"
                    >
                </el-table-column>
                <el-table-column
                    prop="skuSellPrice"
                    label="售价"
                    >
				</el-table-column>
				<el-table-column
					label="操作"
					>
					<template slot-scope="scope">
						<el-button type="text" size="small" @click.native.prevent="deleteRow1(scope.$index, chooseGoodsList1)">删除</el-button>
					</template>
				</el-table-column>
            </el-table>
            <div style="height: 55px; border-top: none;" class="border">
                <el-pagination
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentChange1"
                    :current-page="tableMember1.pageNo"
                    :page-sizes="[15, 30, 50, 100]"
                    :page-size="15"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalPage1">
                </el-pagination>
            </div>
            <span slot="footer" class="dialog-footer">
                <div style='float:left'>
                    <el-button  size="medium" type="text" @click='addGoods()'>+ 添加商品</el-button>
                </div>
                <el-button class="wid90" size="small" @click="dialogVisibleChoose = false">取消</el-button>
                <el-button class="wid90" size="small" type="primary" @click="goodsChoose">确定</el-button>
            </span>
        </el-dialog>
        <!-- 添加商品 -->
        <el-dialog
            title="添加商品"
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
                    :data="goodsList"
                    border
                    @selection-change="handleSelectionChange"
                    :height="405"
                    ref="multipleSelection2"
                    style="width: 100%">
                    <el-table-column
                        type="selection"
                        :reserve-selection="true"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        prop="itemName"
                        width="250"
                        label="商品名称"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="itemBarcode"
                        label="条码"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="categoryName"
                        label="分类"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="skuSellPrice"
                        label="售价"
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
                <el-button v-perss='151' class="wid90" size="small" type="primary" @click="addGoodsList">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import api from 'api/member'
    import api2 from 'api/common'
    import api3 from 'api/good'
    export default {
        data() {
            return {
                integralData:{
					shopId: this.$store.state.home.currentShop.id,
                    shopName: this.$store.state.home.currentShop.shopName,
                    exchangeType:1,
                    monetary:'',
                    isRounding:'',     
                    isIntegral:'',  
                    integral:'',      
                    isClean:'',
                },
				shopName:this.$store.state.home.currentShop.shopName,
                options:this.$store.state.home.shopList,
                input:'',
                chooseNum:'',
                dialogVisibleChoose: false,
                dialogVisible: false,
                chooseGoodsList:[],
                chooseGoodsList1:[],
                goodsList:[],
                ruleData:[
                    {
                        integralValue:'',
                        list:[]
                    }
                ],
                changeNum: null,
                regIcon:true,
                radio: '1',
                length:0,
                multipleSelection2:[],
                multipleSelection:[],
                mallList: [],
                //添加商品弹窗
                totalPage: 0,
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
                //选择商品弹框翻页
                totalPage1: 0,
                tableMember1: {
                    searchWord: '',
                    purchaseDate: '',
                    mallId: '',
                    pageNo: 1,
                    pageSize: 15
                },
            }
        },
        computed: {},
        methods: {
            getList(){
                api.integralList().then((res)=>{
                    this.integralData = res.data
                })
            },
            saveintegralData(){
                if(this.integralData.exchangeType == 1){
					this.ruleData.forEach(ele => {
						let obj = []
						ele.list.forEach(vlu => {
							obj.push(vlu.itemId)
						})
						this.$set(ele, 'lists', obj)
						this.$delete(ele, 'list')
					});
                    this.$set(this.integralData, 'giftExchanges', this.ruleData)
                } else if (this.integralData.exchangeType == 2){
					if(this.integralData.integral == ''){
						this.$message({
							type: 'warning',
							duration: 1500,
							showClose: true,
							message: '请填写抵扣现金积分'
						})
						return
					}
				}
				// v-perss='151'
                api.updatelList(this.integralData).then((res)=>{
                    this.$message({
                        type: 'success',
						duration: 1500,
						showClose: true,
						message: '修改积分规则成功'
                    })
                    this.getList()
                })
            },
            addRule(){
                let obj = {
					integralValue:'',
					list:[]
                }
                this.ruleData.push(obj)
            },
            removeRule(index){
                this.ruleData.splice(index, 1)
            },
            chooseGoods(num, index){
                if(num == 1){
                    this.chooseNum  = '设置不积分商品'
                } else {
                    this.chooseNum  = '设置可兑换商品'
                    this.changeNum = this.ruleData[index]
                    this.chooseGoodsList1 = this.changeNum.list
                }
				this.dialogVisibleChoose = true
				console.log(this.ruleData, 'this.ruleData')
				console.log(this.chooseGoodsList1, 'this.chooseGoodsList1')
            },
            //选择商品
            goodsChoose(){
                if (this.chooseNum  == '设置不积分商品') {
                    if(this.chooseGoodsList.length == 0 || this.multipleSelection2.length == 0){
                        this.$message({
                            type: 'warning',
                            duration: 1500,
                            showClose: true,
                            message: '请选择商品'
                        })
                        return
                    }
                    let itemIds = []
                    this.multipleSelection2.forEach(ele => {
                        itemIds.push(ele.itemId)
                    });
                    this.$set(this.integralData, 'itemIds', itemIds.join())
                } else if (this.chooseNum  == '设置可兑换商品') {
                    if(this.chooseGoodsList1.length == 0 || this.multipleSelection2.length == 0){
                        this.$message({
                            type: 'warning',
                            duration: 1500,
                            showClose: true,
                            message: '请选择商品'
                        })
                        return
                    } 
                }
                this.dialogVisibleChoose = false
            },
			deleteRow(index, rows){
				rows.splice(index, 1);
			},
			deleteRow1(index, rows){
				rows.splice(index, 1);
			},
            //添加商品
            addGoodsList(){
                if(this.multipleSelection.length == 0){
                    this.$message({
                        type: 'warning',
                        duration: 1500,
                        showClose: true,
                        message: '请选择商品'
                    })
                    return
                }
                if (this.chooseNum == '设置不积分商品') {
                    this.chooseGoodsList = this.multipleSelection
                } else {
                    this.chooseGoodsList1 = this.multipleSelection
                    this.changeNum.list = this.chooseGoodsList1
                }
                this.dialogVisible = false
            },
            addGoods(){
                this.dialogVisible = true
                this.$refs.multipleSelection2.clearSelection();
            },
            handleSelectionChange2(val) {
                this.multipleSelection2 = val;
                
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            getGoodsList(){
                api3.getGoodsList(this.tableMember).then((res)=>{
                    this.goodsList = res.data.listData
                    this.totalPage = res.data.totalCount
                })
            },
            //添加商品弹框翻页
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
				api2.allCategory().then((response) => {
					this.categoryList = response.data
				})
			},
            //选择商品弹框翻页
            handleCurrentChange1(val){
                this.tableMember1.pageNo = val
                // this.getGoodsList()
            },
            handleSizeChange1(val){
                //选择每页数据
                this.tableMember1.pageSize = val
                // this.getGoodsList()
            }
        },
        created() {},
        activated() {
			this.getCategoryList()
            this.getList()
            this.getGoodsList()
        },
        mounted() {}
    }
</script>
<style lang='scss' scoped>
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
        background: #F5F5F5;
        font-weight: 700;
    }
    .delete{
        padding-top:17px;
        margin-left:15px 
    }
    .second_inner{
        padding: 40px;
        div{
            margin-bottom:20px;
        }
        .el-input{
            width:70px;
            margin: 0 10px;
        }
        .second_inner_black{
            margin-bottom:10px;
            padding: 10px 0;
            margin-left:70px;
            background: #F8F8F8;
            span:first-child{
                margin-left:20px;
                margin-right:50px;
                .chooseLength{
                    color: #409EFF;margin:0 5px
                }
            }
        }
        .second_inner_choose{
            margin-left:70px;
            .el-button--text{margin:0 20px;}
            span{color: #409EFF;margin:0 5px}
        }
    }
</style>