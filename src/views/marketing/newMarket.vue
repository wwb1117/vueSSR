<template>
        <div class='newMarket'>
            <div class="model_topcol">
                <span>营销-新增促销活动</span>
            </div>
            <div class="model_content">
                <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
                    <div>
                        <div class='second_header'>活动类型</div>
                        <div class='second_inner'>
                            <div  style="margin-bottom:0">
                                <template>
                                    <el-radio-group class='checkedF' v-model="changeType" size='small' @change='changeTableItem'>
                                        <el-radio-button :label="1">满额返现<span v-if='changeType == 1' class='triangle'><span>√</span></span></el-radio-button>
                                        <el-radio-button :label="2">打折促销<span v-if='changeType == 2' class='triangle'><span>√</span></span></el-radio-button>
                                        <el-radio-button :label="3">套餐促销<span v-if='changeType == 3' class='triangle'><span>√</span></span></el-radio-button>
                                    </el-radio-group>
                                </template>
                                
                            </div>
                        </div>
                        <div class='second_header'>促销信息</div>
                        <div class='second_inner'>
                            <!-- 满减返现 -->
                            <div class='change_inner' v-if='changeType == 1'>
                                <el-form label-position="right" :inline="true" size="small" :rules="rules" ref="formData" :model="formData" class="demo-form-inline" label-width="90px">
                                    <el-form-item label="促销门店">
                                        <el-input disabled v-model="shopName" placeholder=""></el-input>
                                    </el-form-item>
                                    <el-form-item label="适用范围">
                                        <template>
                                            <el-checkbox v-model="checked">实体店</el-checkbox>
                                        </template>
                                    </el-form-item>
                                    <br>
                                    <el-form-item prop='activityName' label="促销名称">
                                        <el-input v-model="formData.activityName" placeholder="名称在32个字以内"></el-input>
                                    </el-form-item>
                                    <el-form-item required label="活动日期">
                                        <template>
                                            <el-date-picker
                                                v-model="timer"
                                                type="daterange"
                                                range-separator="至"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期">
                                            </el-date-picker>
                                        </template>
                                    </el-form-item>
                                    <br>
                                    <el-form-item required label="规则设置">
                                        <div class='second_inner_black' v-for='(data, index) in ruleData' :key="index">
                                            <div>
                                                <span>消费金额满<el-input type='tel' size="small" v-model.number="data.fullMoney"></el-input>元&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>减扣金额<el-input type='tel' size="small" v-model="data.reducMoney"></el-input>元</span></span>
                                                <el-button v-if='regIcon == true' size="medium" type="text" @click='removeRule(index)'>删除</el-button>
                                            </div>
                                        </div>
                                        <div class='second_inner_black'>
                                            <el-button  size="medium" type="text" style="margin-left:20px;" @click='addRule()'>+ 添加规则</el-button>
                                        </div>
                                    </el-form-item>
                                    <br>
                                    <el-form-item required label="选择商品">
                                        <template>
                                            <div>
                                                <el-radio v-model="formData.itemRange" :label="1">全场<el-button type='text' class='comment'>全店所有商品参与促销</el-button></el-radio>
                                            </div>
                                            <div>
                                                <el-radio v-model="formData.itemRange" :label="2">分类<el-button type='text' class='comment' @click='chooseClassify()'>选中分类下的商品参与促销</el-button></el-radio>
                                                <span v-if='formData.itemRange == 2'>已选中<span style='color:#409EFF' v-text='formData.CategoryIdList.length'> 0 </span>个分类</span>
                                            </div>
                                            <div>
                                                <el-radio v-model="formData.itemRange" :label="3">商品<el-button type='text' class='comment' @click='chooseGoods()'>选择参与促销的商品</el-button></el-radio>
                                                <span v-if='formData.itemRange == 3'>已选中<span style='color:#409EFF' v-text='multipleSelection1.length'> 0 </span>个商品</span>
                                            </div>
                                        </template>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <!-- 打折促销 -->
                            <div class='change_inner' v-if='changeType == 2'>
                                <el-form :label-position="labelPosition" :inline="true" size="small" :rules="rules" ref="formData" :model="formData" class="myForm" label-width="150px">
                                    <el-form-item label="促销门店">
                                        <el-input disabled v-model="shopName" placeholder=""></el-input>
                                    </el-form-item>
                                    <el-form-item label="适用范围">
                                        <template>
                                            <el-checkbox v-model="checked">实体店</el-checkbox>
                                        </template>
                                    </el-form-item>
                                    <br>
                                    <el-form-item prop='activityName' label="促销名称">
                                        <el-input v-model="formData.activityName" placeholder="名称在32个字以内"></el-input>
                                    </el-form-item>
                                    <el-form-item required label="活动日期">
                                        <template>
											<el-date-picker
                                                v-model="timer"
                                                type="daterange"
                                                range-separator="至"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期">
                                            </el-date-picker>
                                        </template>
                                    </el-form-item>
                                    <br>
                                    <el-form-item required label="选择商品">
                                        <el-button  size="medium" type="text" @click='chooseGoods()'>+ 添加商品</el-button>
                                        &nbsp;&nbsp;&nbsp;&nbsp;已选中<span style='color:#409EFF;margin:0 5px' v-text='formData.chooseGoodsList.length'> 0 </span>个商品
                                    </el-form-item>
                                    <br>
                                    <el-form-item required label="优惠商品最大数量">
                                        <template>
                                            <el-radio v-model="formData.isLimit" :label="0">不限制</el-radio>
                                            <el-radio v-model="formData.isLimit" :label="1">限制</el-radio>
                                        </template>
                                    </el-form-item>
                                </el-form>      
                            </div>
                            <!-- 套餐促销 -->
                            <div class='change_inner spe_inner' v-if='changeType == 3'>
                                <el-form :label-position="labelPosition" size="small" :rules="rules" ref="formData" :model="formData" class="demo-form-inline" label-width="120px">
                                    <el-form-item label="促销门店">
                                        <el-input disabled v-model="shopName" placeholder=""></el-input>
                                    </el-form-item>
                                    <el-form-item prop='activityName' label="套餐名称">
                                        <el-input v-model="formData.activityName" placeholder="名称在32个字以内"></el-input>
									</el-form-item>
									<el-form-item prop='activityName' label="套餐价格">
										<el-input v-model="formData.setmealPrice" placeholder="请填写套餐价格"></el-input>
									</el-form-item>
									<el-form-item required label="活动日期">
										<template>
											<el-date-picker
												style="margin-left:8px;"
												v-model="timer"
												type="daterange"
												range-separator="至"
												start-placeholder="开始日期"
												end-placeholder="结束日期">
											</el-date-picker>
										</template>
									</el-form-item>
                                    <el-form-item required label="适用范围">
                                        <template>
                                            <el-checkbox v-model="checked">实体店</el-checkbox>
                                        </template>
									</el-form-item>
									<el-form-item required label="设置套餐商品">
										<el-button  size="medium" type="text" @click='chooseGoods()'>+ 添加商品</el-button>
										&nbsp;&nbsp;&nbsp;&nbsp;已选中<span style='color:#409EFF;margin:0 5px' v-text='formData.chooseGoodsList.length'> 0 </span>个商品
									</el-form-item>
                                    <!-- <el-form-item required label="设置套餐明细">
                                        <el-button  size="medium" type="text" @click='choosePackage()'>+ 套餐设置</el-button>
                                        &nbsp;&nbsp;&nbsp;&nbsp;已选中<span style='color:#409EFF;margin:0 5px' v-text='mealData.length'> 0 </span>个套餐
                                    </el-form-item> -->
                                </el-form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="model_footer">
                <el-button size="small" class="wid90" style="margin:0 15px;" @click='back()'>取消</el-button>
                <el-button type="primary" class="wid90" size="small" @click='saveMarket'>保存</el-button>
            </div>
            <!-- 选择商品 -->
            <el-dialog
                :title="title"
                :visible.sync="dialogVisibleChoose"
                :close-on-click-modal="false"
                width="55%"
                >
                <el-table
					:data="formData.chooseGoodsList"
					@selection-change="handleSelectionChange1"
                    border
                    :height="405"
                    ref="purchaseListTable"
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
                        label="所需数量"
                        v-if='changeType == 3'
                        >
                        <template slot-scope="scope">
                            <el-input size="small" v-model="scope.row.quantity"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="折扣(%)"
                        v-if='changeType == 2'
                        >
                        <template slot-scope="scope">
                            <el-input size="small" v-model="scope.row.discount"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="特价(元)"
                        v-if='changeType == 2'
                        >
                        <template slot-scope="scope">
                            <el-input size="small" v-model="scope.row.specialPrice"></el-input>
                        </template>
					</el-table-column>
					<el-table-column
                        label="操作"
                        >
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, formData.chooseGoodsList)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="height: 55px; border-top: none;" class="border">
                    <el-pagination
                        :current-page="tableMember.pageNo"
                        :page-sizes="[15, 30, 50, 100]"
                        :page-size="15"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalPage">
                    </el-pagination>
                </div>
                <span slot="footer" class="dialog-footer">
                    <div style='float:left'>
                        <el-button  size="medium" type="text" @click='addGoods()'>+ 添加商品</el-button>
                    </div>
                    <el-button class="wid90" size="small" @click="dialogVisibleChoose = false">取消</el-button>
                    <el-button class="wid90" size="small" type="primary" @click="sureAddGoods()">确定</el-button>
                </span>
            </el-dialog>
            <!-- 选择分类 -->
            <el-dialog
                title="添加商品分类"
                :visible.sync="dialogVisibleClassify"
                :close-on-click-modal="false"
                width="55%"
                >
                <div class="dialog_top">
                    <el-input style="width: 294px" size="small" v-model="categoryMember.categoryName" placeholder="请输入商品分类名称"></el-input>
                    <el-button style="margin-right: 20px;" type="primary" size="small">搜索</el-button>
                </div>
                <el-tree 
                    ref='tree'
                    :data="categoryList"
                    :props="defaultProps" 
                    style="width: 100%;height:400px;overflow: auto"
                    :expand-on-click-node="false"
                    show-checkbox
                    node-key="id"
                    @check-change="handleCheckChange">
                    <ul class="item_box" slot-scope="{ node, data }">
                        <li>{{data.categoryName}}</li>
                    </ul>
                </el-tree>
                <!-- <div style="height: 55px; border-top: none;" class="border">
                    <el-pagination
                        :current-page="categoryMember.pageNo"
                        :page-sizes="[15, 30, 50, 100]"
                        :page-size="15"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="categoryPage">
                    </el-pagination>
                </div> -->
                <span slot="footer" class="dialog-footer">
                    <el-button class="wid90" size="small" @click="dialogVisibleClassify = false">取消</el-button>
                    <el-button class="wid90" size="small" type="primary" @click="getCheckedNodes()">确定</el-button>
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
						:options="categoryList1"
						change-on-select
						:props='categoryOptionProps'
						size='small'>
					</el-cascader>
                    <el-input style="width:40%;margin-left:10px;" clearable @change="search" size="small" v-model="tableMember1.combinationStr" placeholder="请输入商品名称"></el-input>
                    <el-button style="margin-right: 20px;" type="primary" size="small" @click='search()'>搜索</el-button>
                </div>
                <el-table
                    :data="goodsList"
                    border
                    @selection-change="handleSelectionChange"
                    :height="405"
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
                </el-table>
                <div style="height: 55px; border-top: none;" class="border">
                    <el-pagination
                        :current-page="tableMember1.pageNo"
                        :page-sizes="[15, 30, 50, 100]"
                        :page-size="15"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalPage">
                    </el-pagination>
                </div>
                <span slot="footer" class="dialog-footer">
                    <div style='float:left' v-if='changeType == 2'>
                        打折<el-input v-model="discount" size="small" style="width:50px;margin:0 5px"></el-input><span style="margin-right:15px">%</span>
                        特价<el-input v-model="specialPrice" size="small" style="width:50px;margin:0 5px"></el-input><span>元</span>
                    </div>
                    <el-button class="wid90" size="small" @click="dialogVisible = false">取消</el-button>
                    <el-button class="wid90" size="small" type="primary" @click="addGoodsList()">确定</el-button>
                </span>
            </el-dialog>
        </div>
    </template>
    
    <script>
        import api from 'api/marking'
		import api2 from 'api/good'
		import capi from 'api/common'
        export default {
            data() {
                return {
                    changeType: 1,
                    checked: true,
                    shopName: this.$store.state.home.currentShop.shopName,
                    // 显示弹框
                    dialogVisible: false, //通用添加商品
                    dialogVisibleChoose: false, //选择商品
                    dialogVisibleClassify: false, //分类显示
                    dialogVisiblePackage:false, //套餐显示
                    input:'',
                    labelPosition:'right',
                    length:0,
					//选择商品/分类/套餐
					categoryIdArr: [],
					categoryList1: [],
					categoryOptionProps: {
						label:'categoryName',
						value:'id',
						children: 'categoryList'
					},
                    discount:'',
                    specialPrice:'',
                    title:'选择商品',
                    goodsList:[],
                    defaultProps: {
                        children: 'categoryList',
                        label: 'categoryName'
                    },
					indexNumbe: 0,
					multipleSelection:[],
					multipleSelection1:[],
                    //满额返现
                    regIcon:false,
                    categoryList:[],
                    timer:[],
                    formData: {
						rangeType:1,
                        activityName:'',
                        itemRange:1,
                        isLimit:0,
                        chooseGoodsList:[],
                        CategoryIdList:[]
                    },
                    ruleData:[
                        {
                            fullMoney:'',
                            reducMoney:''
                        }
                    ],
                    rules: {
                        activityName: [
                            { required: true, message: '请输入促销活动名称', trigger: 'blur' },
                        ]
                    },
                    totalPage: 0,
                    tableMember: {
                        searchWord: '',
                        purchaseDate: '',
                        mallId: '',
                        pageNo: 1,
                        pageSize: 15
                    },
					totalPage1: 0,
					tableMember1:{
						combinationStr:'',
						categoryIds: '',
						pageNo: 1,
                        pageSize: 15
					},
                    categoryPage: 0,
                    categoryMember:{
                        categoryName:'',
                        pageNo: 1,
                        pageSize: 15
                    }
                }
            },
            computed: {},
            methods: {
                datePicker(val){
                },
                saveMarket(){
                    if(this.formData.activityName == ''){
                        this.$message({
                            type: 'warning',
                            duration: 1500,
                            showClose: true,
                            message: '请填写名称'
                        })
                        return
					}
                    if(this.timer.length == 0){
                        this.$message({
                            type: 'warning',
                            duration: 1500,
                            showClose: true,
                            message: '请填写活动时间'
                        })
                        return
                    } else {
                        this.$set(this.formData, 'startTime', this.timer[0] / 1000)
                        this.$set(this.formData, 'endTime', this.timer[1] / 1000)
                    }
					let arr = this.multipleSelection1.map((item) => {
						let obj = {}
						obj.itemId = item.itemId
						obj.itemTempId = item.itemTempId
						obj.discount = item.discount
						obj.specialPrice = item.specialPrice
						obj.itemBarcode = item.itemBarcode
						obj.quantity = item.quantity
						obj.categoryName = item.categoryName
						obj.sellPrice = item.sellPrice
						return obj
					})
					this.$set(this.formData, 'items' ,arr)
					if(this.changeType == 1){
						this.$set(this.formData, 'reducDetails' ,this.ruleData)
						for (let i in this.formData.reducDetails) {
							if(this.formData.reducDetails[i].fullMoney === "" || this.formData.reducDetails[i].reducMoney === ""){
								this.$message({
									type: 'warning',
									duration: 1500,
									showClose: true,
									message: '请填写规则金额'
								})
								return
							}
						}
						if(this.formData.itemRange == 1){
							this.$set(this.formData, 'items' , [])
						} else if (this.formData.itemRange == 2){
							this.$set(this.formData, 'categoryIds' ,this.formData.CategoryIdList.join(','))
						}
					}
					this.formData.items.forEach(ele => {
						this.$delete(ele, 'specialPrice')
					});
					this.$delete(this.formData, 'chooseGoodsList')
                    this.formData.activityType = this.changeType
                    api.addActivity(this.formData).then((res)=>{
                        this.$message({
                            type: 'success',
                            duration: 1500,
                            showClose: true,
                            message: '新增成功'
                        })
                        this.back()
                    })
                },
                changeTableItem(nums){
					// this.$refs.multipleSelection.clearSelection();
					// this.$refs.multipleSelection1.clearSelection();
					this.$refs.formData.clearValidate()
					//清除勾选
					this.clearAll()
                    if (nums == 2) {
                        this.title='选择打折促销商品'
                    } else {
                        this.title='选择商品'
                    }
                },
                addRule(){
                    let obj = {
                        fullMoney:'',
                        reducMoney:''
                    }
                    this.ruleData.push(obj)
                    this.regIcon = true
                },
                removeRule(index){
                    if (this.ruleData.length > 1){
                        this.ruleData.splice(index, 1)
                        if (this.ruleData.length == 1){
                            this.regIcon = false
                        }
                    }
                },
                //添加分类
                chooseClassify(){
                    this.dialogVisibleClassify = true
                },
                //获取全部分类
                getCategoryList1(){
                    api2.getCategoryList().then((res)=>{
                        this.categoryList = res.data.listData
                    })
                },
                handleCheckChange(data, checked, indeterminate) {
                },
                getCheckedNodes(){
                    this.formData.CategoryIdList = []
                    let obj = this.$refs.tree.getCheckedNodes()
                    console.log(obj,222222)
                    let arr = []
                    obj.forEach(ele => {
                        this.formData.CategoryIdList.push(ele.id)
                    })
                    arr = new Set(this.formData.CategoryIdList)
                    this.formData.CategoryIdList = Array.from(arr)
                    this.dialogVisibleClassify = false
                },
                // 选择商品
                chooseGoods(){
                    this.dialogVisibleChoose = true
                },
                //通用添加商品
                addGoods(index){
                    this.indexNumbe = index
					this.dialogVisible = true
                },
                addGoodsList(val){
                    if(this.multipleSelection === undefined || this.multipleSelection.length == 0 ){
                        this.$message({
                            type: 'warning',
                            duration: 1500,
                            showClose: true,
                            message: '请选择商品'
                        })
                        return
                    }
					let arr = this.formData.chooseGoodsList.concat(this.multipleSelection)
					this.formData.chooseGoodsList = [...new Set(arr)]
					this.formData.chooseGoodsList.forEach(ele => {
						ele.discount = this.discount
						ele.specialPrice = this.specialPrice
						this.$set(ele, 'quantity' ,'')
					})
                    this.dialogVisible = false
                    this.discount = ''
                    this.specialPrice = ''
                },
                sureAddGoods(val){
					if(this.formData.chooseGoodsList.length == 0 || this.multipleSelection1.length == 0){
                        this.$message({
                            type: 'warning',
                            duration: 1500,
                            showClose: true,
                            message: '请选择商品'
                        })
                        return
					}
					if (this.changeType == 2) {
						for (const ele of this.multipleSelection1) {
							if(ele.discount == '' || ele.specialPrice == ''){
								this.$message({
									type: 'warning',
									duration: 1500,
									showClose: true,
									message: '请填写打折折扣'
								})
								return
							}
						}
					} else if (this.changeType == 3){
						for (const ele of this.multipleSelection1) {
							if(ele.quantity == '' ){
								this.$message({
									type: 'warning',
									duration: 1500,
									showClose: true,
									message: '请填写数量'
								})
								return
							}
						}
					}
					this.dialogVisibleChoose = false
                },
                handleSelectionChange(val) {
                    this.multipleSelection = val;
				},
				handleSelectionChange1(val){
					this.multipleSelection1 = val;
				},
				getCategoryList(){
					capi.allCategory().then((response) => {
						this.categoryList1 = response.data
					})
				},
				search(){
					this.tableMember1.pageNo = 1
					this.getGoodsList()
				},
				cateSelectChange(){
					this.tableMember1.categoryIds = this.categoryIdArr.join(',')
					this.tableMember1.pageNo = 1
					this.getGoodsList()
				},
				deleteRow(index, rows){
					rows.splice(index, 1);
				},
				//清除所有
				clearAll(){
					// this.$refs.formData.resetFields()
					this.formData = {
						rangeType:1,
                        activityName: '',
                        itemRange: 1,
                        isLimit: 0,
                        chooseGoodsList: [],
                        CategoryIdList: []
					}
					this.timer = []
					this.multipleSelection = []
					this.multipleSelection1 = []
                    this.ruleData = [
                        {
                            fullMoney:'',
                            reducMoney:''
                        }
                    ]
                    this.mealData = [
                        {
                            groupName:'',
                            groupMoney:'',
                            items:[]
                        }
					]
				},
                //商品列表
                getGoodsList(){
                    api2.getGoodsList(this.tableMember1).then((res)=>{
                        this.goodsList = res.data.listData
                        this.totalPage2 = res.data.totalPage
                    })
                },
                back(){
                    this.$router.push({
                        path: '/marketingList'
                    })
				}
            },
            created() {
            },
            activated() {
				this.changeType = 1
                this.changeTableItem()
                this.getGoodsList()
				this.getCategoryList()
				this.getCategoryList1()
				this.clearAll()
            },
            mounted() {}
        }
    </script>
    <style lang='scss'>
        .newMarket{
            .el-radio-group{
                .el-radio-button {  
                    .el-radio-button__inner {
                        position: relative;
                        font-size:15px;
                        width:150px;
                        height:80px;
                        border-radius: 5px;
                        margin-right: 40px;
                        box-sizing: border-box;
                        line-height:55px;
                    }
                    .el-radio-button__orig-radio:checked+.el-radio-button__inner{
                        color:#409EFF;
                        border-color: #409EFF;
                        background: #fff;
                        
                    }
                    &:nth-child(2),&:nth-child(3){
                        border-left:1px solid #dcdfe6;
                        border-radius: 5px;
                    }
                }
            }
            .el-date-editor el-range-editor el-input__inner el-date-editor--daterange{
                width: 30%;
                margin-left:10px;
            }
            .el-date-editor .el-range-separator{
                padding: 0 5px;
            }
            .el-dialog__body{
                .el-tree-node__content {
                    height: 40px;
                    line-height: 40px;
                    border-bottom: 1px solid #e5e8e8;
                }
                .item_box li:nth-child(1) {
                    width: 300px;
                }
                .el-tree-node__children .item_box li:nth-child(1) {
                    width: 282px;
                }
            }
        }
    </style>
    <style lang='scss' scoped>
        .el-tree{
            border: 1px solid #e4e8eb;
        }
        .dialog_top{
            margin-top: -15px; 
            margin-bottom: 15px;
        }
        .dialog_top>div{
            margin-right: 10px;
        }
        .triangle{
            width: 0;
            height: 0;
            border-bottom: 20px solid #409EFF;
            border-left: 20px solid transparent;
            position: absolute;
            right:0;
            bottom:0;
            span{
                font-size:10px;
                color:#fff;
                position: absolute;
                top:-12px;
                left:-9px;
            }
        }
        .header_seach_wrap>div {
            margin-right: 10px;
        }
        .second_header{
            padding: 10px 20px;
            background: #F5F5F5;
            font-weight: 700;
        }
        .spe_inner{
            .el-input{
                width:25%;
                margin: 0 10px;
            }
        }
        .second_inner{
            padding: 40px;
            div{
                margin-bottom:20px;
            }
            .second_inner_black{
                width:150%;
                margin-bottom:0px;
                padding: 10px 0;
                /* margin-left:70px; */
                background: #F8F8F8;
                span:first-child{
                    margin-left:20px;
                    margin-right:50px;
                    .chooseLength{
                        color: #409EFF;margin:0 5px
                    }
                }
                .el-input{
                    width:90px;
                    margin: 0 10px;
                }
                div{
                    margin-bottom:0px; 
                }
            }
            .second_inner_choose{
                margin-left:70px;
                .el-button--text{margin:0 20px;}
                span{color: #409EFF;margin:0 5px}
            }
            .comment{
                margin-left:10px;
                color:#909399;
            }
        }
        #myFrom{
            border:1px solid #ebeef5;
            border-bottom:none;
            th{
            /* width: 120px;
            height: 26px; */
            }
            .table-head{
                th{
                    padding: 12px 0;
                }
                th:nth-child(4){text-indent: 10px}
                color: #606266;
                font-weight: 500;
                background: #F5F5F5;
                
            }
            .active{
                border-bottom: 1px solid #ebeef5;
                td{
                    /* padding: 10px 0; */
                    /* text-align:center; */
                    .del{
                        color:#409EFF;
                        cursor: pointer;
                    }
                    i{font-size:16px;font-weight:800}
                    i:first-child{margin-right:10px;}
                }
                td:first-child{margin:auto;text-align:center;}
                td:first-child,td:nth-child(2),td:nth-child(3){padding: 10px 0;}
                td:nth-child(3){border-right:1px solid #ebeef5}
                td:nth-child(4){text-indent: 10px;}
                .el-input{
                    width:80%;
                }
            }
        }
    </style>