<template>
        <div class='editMarket'>
            <div class="model_topcol">
                <span>营销-编辑促销活动</span>
            </div>
            <div class="model_content">
                <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
                    <div>
                        <div class='second_header'>活动类型</div>
                        <div class='second_inner'>
                            <div  style="margin-bottom:0">
                                <template>
                                    <el-radio-group class='checkedF' v-model="changeType" size='small' @change='changeTableItem'>
                                        <el-radio-button :disabled="isdisabled" :label="1">满额返现<span v-if='changeType == 1' class='triangle'><span>√</span></span></el-radio-button>
                                        <el-radio-button :disabled="isdisabled" :label="2">打折促销<span v-if='changeType == 2' class='triangle'><span>√</span></span></el-radio-button>
                                        <el-radio-button :disabled="isdisabled" :label="3">套餐促销<span v-if='changeType == 3' class='triangle'><span>√</span></span></el-radio-button>
                                    </el-radio-group>
                                </template>
                                
                            </div>
                        </div>
                        <div class='second_header'>促销信息</div>
                        <div class='second_inner'>
                            <!-- 满减返现 -->
                            <div class='change_inner' v-if='changeType == 1'>
                                <el-form label-position="right" :inline="true" size="small" :model="formData" class="demo-form-inline" label-width="90px">
                                    <el-form-item label="促销门店">
                                        <el-input disabled v-model="formData.shopName" placeholder=""></el-input>
                                    </el-form-item>
                                    <el-form-item label="适用范围">
                                        <template>
                                            <el-checkbox v-model="checked">实体店</el-checkbox>
                                        </template>
                                    </el-form-item>
                                    <br>
                                    <el-form-item required label="促销名称">
                                        <el-input v-model="formData.activityName" placeholder="名称在32个字以内"></el-input>
                                    </el-form-item>
                                    <el-form-item required label="活动日期">
                                        <template>
                                            <el-date-picker
                                                @change="datePicker"
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
                                                <span>消费金额满<el-input type='tel' size="small" v-model="data.fullMoney"></el-input>元&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>减扣金额<el-input type='tel' size="small" v-model="data.reducMoney"></el-input>元</span></span>
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
                                                <span v-if='formData.itemRange == 3'>已选中<span style='color:#409EFF' v-text='formData.chooseGoodsList.length'> 0 </span>个商品</span>
                                            </div>
                                        </template>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <!-- 打折促销 -->
                            <div class='change_inner' v-if='changeType == 2'>
                                <el-form :label-position="labelPosition" :inline="true" size="small" :model="formData" class="myForm" label-width="150px">
                                    <el-form-item label="促销门店">
                                        <el-input disabled v-model="formData.shopName" placeholder=""></el-input>
                                    </el-form-item>
                                    <el-form-item label="适用范围">
                                        <template>
                                            <el-checkbox v-model="checked">实体店</el-checkbox>
                                        </template>
                                    </el-form-item>
                                    <br>
                                    <el-form-item required label="促销名称">
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
                                <el-form :label-position="labelPosition" size="small" :model="formData" class="demo-form-inline" label-width="120px">
                                    <el-form-item label="促销门店">
                                        <el-input disabled v-model="formData.shopName" placeholder=""></el-input>
                                    </el-form-item>
                                    <el-form-item required label="套餐名称">
                                        <el-input v-model="formData.activityName" placeholder="名称在32个字以内"></el-input>
                                    </el-form-item>
                                    <el-form-item required label="活动日期">
                                        <el-date-picker
                                            style="margin-left:8px;"
                                            v-model="timer"
                                            type="daterange"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item required label="适用范围">
                                        <template>
                                            <el-checkbox v-model="checked">实体店</el-checkbox>
                                        </template>
                                    </el-form-item>
                                    <el-form-item required label="设置套餐明细">
                                        <el-button  size="medium" type="text" @click='choosePackage()'>+ 套餐设置</el-button>
                                        &nbsp;&nbsp;&nbsp;&nbsp;已选中<span style='color:#409EFF;margin:0 5px' v-text='mealData.length'> 0 </span>个套餐
                                    </el-form-item>
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
                        prop="originalPrice"
                        label="售价"
                        >
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
                    <el-button class="wid90" size="small" type="primary" @click="sureAddGoods">确定</el-button>
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
                <div style="height: 55px; border-top: none;" class="border">
                    <el-pagination
                        :current-page="categoryMember.pageNo"
                        :page-sizes="[15, 30, 50, 100]"
                        :page-size="15"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="categoryPage">
                    </el-pagination>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="wid90" size="small" @click="dialogVisibleClassify = false">取消</el-button>
                    <el-button class="wid90" size="small" type="primary" @click="getCheckedNodes()">确定</el-button>
                </span>
            </el-dialog>
            <!-- 选择套餐 -->
            <el-dialog
                title="设置套餐"
                :visible.sync="dialogVisiblePackage"
                :close-on-click-modal="false"
                width="70%"
                >
                <form action="" id="myFrom">
                    <table cellspacing="1" cellpadding="0">
                     <tbody>
                        <tr class="table-head">
                            <th width='7%'></th>
                            <th width='20%'>套餐名称</th>
                            <th width='10%'>套餐价格(元)</th>
                            <th width='22%'>商品名称</th>
                            <th width='10%'>条码</th>
                            <th width='8%'>分类</th>
                            <th width='10%'>售价(元)</th>
                            <th width='8%'>可选数量</th>
                            <th width='5%'></th>
                        </tr>
                        <tr class="active" v-for='(item, index) in mealData' :key='index'>
                            <td><i class='el-icon-plus' @click='addTd()'></i><i class='el-icon-minus' @click='removeTd(index)'></i></td>
                            <td><template><el-input style="width:80%;" size='small' width='70px' v-model="item.groupName" placeholder=""></el-input></template></td>
                            <td><template><el-input size='small' width='70px' v-model="item.groupMoney" placeholder=""></el-input></template></td>
                            <td colspan="6">
                                <el-row v-for='(item1, index1) in mealData[index].items' :key='index1' style="line-height:52px;border-bottom:1px solid #ebeef5">
                                    <el-col :span='8'>{{item1.itemName}}</el-col>
                                    <el-col :span='4'>{{item1.categoryName}}</el-col>
                                    <el-col :span='3'>{{item1.categoryName}}</el-col>
                                    <el-col :span='3'>{{item1.sellPricce}}</el-col>
                                    <el-col :span='4'><template><el-input size='small' v-model="item1.quantity" placeholder=""></el-input></template></el-col>
                                    <el-col :span='2'>
                                        <el-button type="text" @click='deleteThis(index, index1)'>删除</el-button>
                                    </el-col>
                                </el-row>
                                <el-row style="line-height:52px;">
                                    <el-col :span='24'>
                                        <el-button type="text" @click='addGoods(index)'>+ 添加商品</el-button>
                                    </el-col>
                                </el-row>
                            </td>
                        </tr>
                      </tbody>
                    </table>
               </form>
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
                    <el-button class="wid90" size="small" @click="dialogVisiblePackage = false">取消</el-button>
                    <el-button class="wid90" size="small" type="primary" @click="addPackage">确定</el-button>
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
                    <el-select filterable v-model="tableMember.mallId" size="small" placeholder="全部商品分类">
                        <el-option v-for="item in mallList" :key="item.id" :label="item.mallName" :value="item.id">
                        </el-option>
                    </el-select>
                    <el-input style="width: 294px" size="small" v-model="tableMember.searchWord" placeholder="请输入商品名称"></el-input>
                    <el-button style="margin-right: 20px;" type="primary" size="small">搜索</el-button>
                </div>
                <el-table
                    :data="goodsList"
                    border
                    @selection-change="handleSelectionChange"
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
                        prop="sellPricce"
                        label="售价"
                        >
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
                    <div style='float:left' v-if='changeType == 2'>
                        打折<el-input v-model="discount" size="small" style="width:50px;margin:0 5px"></el-input><span style="margin-right:15px">%</span>
                        特价<el-input v-model="specialPrice" size="small" style="width:50px;margin:0 5px"></el-input><span>元</span>
                    </div>
                    <el-button class="wid90" size="small" @click="dialogVisible = false">取消</el-button>
                    <el-button class="wid90" size="small" type="primary" @click="addGoodsList">确定</el-button>
                </span>
            </el-dialog>
        </div>
    </template>
    
    <script>
        import api from 'api/marking'
        import api2 from 'api/good'
        export default {
            data() {
                return {
                    changeType:1,
                    checked:true,
                    isdisabled:true,
                    // 显示弹框
                    dialogVisible: false, //通用添加商品
                    dialogVisibleChoose: false, //选择商品
                    dialogVisibleClassify: false, //分类显示
                    dialogVisiblePackage:false, //套餐显示
                    input:'',
                    labelPosition:'right',
                    length:0,
                    //选择商品/分类/套餐
                    discount:'',
                    specialPrice:'',
                    title:'选择商品',
                    goodsList:[],
                    defaultProps: {
                        children: 'categoryList',
                        label: 'categoryName'
                    },
					indexNumbe:'',
					multipleSelection:[],
                    //满额返现
                    regIcon:false,
                    categoryList:[],
                    timer:[],
                    formData: {
                        shopName:'',
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
                    //打折
                    //套餐数据
                    activityData:'',
                    mallList: [],
                    //设置套餐弹框数据
                    mealData: [
                        {
                            groupName:'',
                            groupMoney:'',
                            items:[]
                        }
                    ],
                    totalPage: 0,
                    tableMember: {
                        searchWord: '',
                        purchaseDate: '',
                        mallId: '',
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
                getDetail(){
                    api.getActivity(this.$store.state.home.pageData).then((res)=>{
                        this.changeType = res.data.activityType
                        this.formData = res.data
                        this.timer = [(res.data.startTime) * 1000, (res.data.endTime) * 1000]
                        if (res.data.activityType == 1) {
                            if(res.data.categoryIds != ''){
                                this.formData.CategoryIdList = res.data.categoryIds.split(",")

                            } else {
                                this.formData.CategoryIdList = []
                            }
                            this.ruleData = res.data.reducDetails
                            if(res.data.reducDetails.length > 1){
                                this.regIcon = true
                            }
                            this.formData.chooseGoodsList = res.data.items
                        }
                        if(res.data.activityType == 2){
                            this.formData.chooseGoodsList =res.data.items
                        }
                        if(res.data.activityType == 3){
                            this.mealData = res.data.itemGroups
                        }
                        console.log(this.formData,'详情')
                    })  
                },
                datePicker(val){
                },
                saveMarket(){
                    if (this.formData.activityType == 1) { //满额减
                        this.$set(this.formData, 'items' ,this.formData.chooseGoodsList)
                        if(this.formData.itemRange == 1){
                            this.$delete(this.formData, 'categoryIds')
                            this.$set(this.formData, 'items' , [])
                        } else if (this.formData.itemRange == 2){
                            this.$set(this.formData, 'categoryIds' ,this.formData.CategoryIdList.join(','))
                        }
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
                        this.$delete(this.formData, 'chooseGoodsList')
                    } else if(this.formData.activityType == 2){
                        this.$set(this.formData, 'items' ,this.formData.chooseGoodsList)
                    } else if (this.formData.activityType == 3) { //套餐
                        this.$set(this.formData, 'itemGroups' ,this.mealData)
                    }
                    this.formData.startTime = this.timer[0] / 1000
                    this.formData.endTime = this.timer[1] / 1000
                    console.log(this.formData, '提交的数据')
                    api.updateActivity(this.formData).then((res)=>{
                        this.$message({
                            type: 'success',
                            duration: 1500,
                            showClose: true,
                            message: '编辑成功'
                        })
                        this.back()
                    })
                },
                changeTableItem(nums){
                    if (nums == 2) {
                        this.title='选择打折促销商品'
                    } else if (nums == 1) {
                        this.title='选择商品'
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
                getCategoryList(){
                    api2.getCategoryList().then((res)=>{
                        this.categoryList = res.data.listData
                    })
                },
                handleCheckChange(data, checked, indeterminate) {
                },
                getCheckedNodes(){
                    let obj = this.$refs.tree.getCheckedNodes()
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
                // 设置套餐
                choosePackage(){
                    this.dialogVisiblePackage = true
                },
                addTd(){
                    var itemobj = {
                        groupName:'',
                        groupMoney:'',
                        items:[]
                    }
                    this.mealData.push(itemobj)
                },  
                removeTd(index){
                    if (this.mealData.length > 1) {
                        this.mealData.splice(index, 1)
                    }
                },
                deleteThis(index, index1){
                    this.mealData[index].items.splice(index1, 1)
                },
                addPackage(){
                    for (const i in this.mealData) {
                        if (this.mealData[i].groupName === '' || this.mealData[i].groupMoney === ''){
                            this.$message({
                                type: 'warning',
                                duration: 1500,
                                showClose: true,
                                message: '请填写套餐信息'
                            })
                            return
                        }
                        if (this.mealData[i].items.length == 0) {
                            this.$message({
                                type: 'warning',
                                duration: 1500,
                                showClose: true,
                                message: '请选择商品'
                            })
                            return
                        }
                        for (const key in this.mealData[i].items) {
                            if (!this.mealData[i].items[key].quantity) {
                                this.$message({
                                    type: 'warning',
                                    duration: 1500,
                                    showClose: true,
                                    message: '请填写商品数量'
                                })
                                return
                            }
                        }
                    }
                    this.dialogVisiblePackage = false
                },
                //通用添加商品
                addGoods(index){
                    this.indexNumbe = index
                    this.dialogVisible = true
                    //清除勾选
                    // this.$refs.multipleSelection.clearSelection();
                },
                addGoodsList(val){
                    if(this.multipleSelection === undefined){
                        this.$message({
                            type: 'warning',
                            duration: 1500,
                            showClose: true,
                            message: '请选择商品'
                        })
                        return
                    }
                    if(this.changeType == 3){
                        // this.mealData[this.indexNumbe].items = this.multipleSelection
                        let arr = this.mealData[this.indexNumbe].items.concat(this.multipleSelection)
                        this.mealData[this.indexNumbe].items = arr
                    } else {
                        // let arr = [...this.formData.chooseGoodsList,...this.multipleSelection]
                        let arr = this.formData.chooseGoodsList.concat(this.multipleSelection)
                        this.formData.chooseGoodsList = arr
                        this.formData.chooseGoodsList.forEach(ele => {
                            ele.discount = this.discount
                            ele.specialPrice = this.specialPrice
                        })
                    }
                    this.dialogVisible = false
                    this.discount = ''
                    this.specialPrice = ''
                },
                sureAddGoods(val){
                    this.dialogVisibleChoose = false
                },
                handleSelectionChange(val) {
                    this.multipleSelection = val;
                },
                //商品列表
                getGoodsList(){
                    api2.getGoodsList().then((res)=>{
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
                this.getDetail()
                this.getGoodsList()
                this.getCategoryList()
            },
            mounted() {}
        }
    </script>
    <style lang='scss'>
        .editMarket{
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
                        border-left:1px solid #409EFF;
                    }
                    .el-radio-button .el-radio-button--small .is-disabled{
                        border-left: 1px solid #EBEEF5;
                    }
                    .el-radio-button__inner{
                        border-left: 1px solid #EBEEF5;
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
            /* .el-form-item__content{
                margin-left:160px;
            } */
            .el-tree-node__content {
                height: 40px;
                line-height: 40px;
                border-bottom: 1px solid #e5e8e8;
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