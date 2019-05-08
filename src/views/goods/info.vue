<template>
    <div class="info">
        <div class="window_mask" v-show="searchShow"></div>
        <div class="model_topcol">
            <span class="font600">商品资料</span>
            <div>
                <el-button type="primary" size="small" @click="newS()" v-perss='80'>新增商品</el-button>
                <el-button type="primary" style="width:90px" size="small">导入</el-button>
                <el-button type="primary" style="width:90px" size="small">导出</el-button>
            </div>
        </div>
        <div class="model_content">
            <div class="model_content_inner"
                 :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
                <div class="search">
                    <span class="lab">全部分类</span>
                    <el-cascader
                            style="width: 215px;margin-right: 8px"
                            :options="categoryList"
                            v-model="categoryIds2"
                            clearable
                            @clear="search"
                            :show-all-levels="false"
                            :props="{
                                    value: 'id',
                                    label: 'categoryName',
                                    children: 'categoryList'
                                }">
                    </el-cascader>
                    <el-input clearable @clear="search" size="small" style="width:380px;margin-right:10px" placeholder="条码/品名/拼音码"
                              prefix-icon="el-icon-search" v-model="tableParam.combinationStr">
                    </el-input>
                    <el-button size="small" type="primary" @click="search">搜索</el-button>
                    <el-popover
                            placement="bottom"
                            title="过期商品查询"
                            v-model="expriceShow"
                            width="450"
                            style="margin: 0 10px"
                            trigger="click"
                    >
                        <div style="padding: 40px 0 20px 0">
                            <el-form :model="tableParam" :rules="rules" label-position="right" label-width='100px'
                                     size="small">
                                <el-form-item prop="expirationNum" label="过期天数">
                                    <el-input v-model="tableParam.expirationNum" style="width:280px" size="small"
                                              placeholder="请输入过期天数"></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div style="text-align: right">
                            <el-button @click="expriceShow = false" class="wid90" size="small">取消</el-button>
                            <el-button @click="expriceSure" class="wid90" size="small" type="primary">确定</el-button>
                        </div>
                        <el-button slot="reference" size="small" type="primary">搜索过期商品</el-button>
                    </el-popover>
                    <el-button size="small" type="text" @click="searchShow = true">高级搜索</el-button>
                    <el-card v-show="searchShow" class="box_card">
                        <div slot="header" class="clearfix">
                            <span :style="{fontSize: '16px'}">高级搜索</span>
                            <i class="el-icon-close" @click="searchShow = false"
                               style="float: right; padding: 3px 0; cursor: pointer"></i>
                        </div>
                        <el-form :model="tableParam" label-position="right" label-width='100px' size="small">
                            <el-form-item label="商品编码">
                                <el-input v-model="tableParam.itemNo" style="width:280px" size="small"
                                          placeholder="请输入商品编码"></el-input>
                            </el-form-item>
                            <el-form-item label="商品分类">
                                <el-button v-if="categoryTreeNode.length == 0" style="font-size:14px" type="text">不限分类
                                </el-button>
                                <span v-if="categoryTreeNode.length != 0">已选择个<i
                                        style="font-size:14px;color:#399CFF;font-style:normal;margin:0 3px"
                                        v-text="categoryTreeNode.length"></i> 分类</span>
                                <el-button @click="chooseCategoryEvent" type="text"
                                           style="margin-left:24px;font-size:14px">选择分类
                                </el-button>
                            </el-form-item>
                            <el-form-item label="商品品牌">
                                <el-select collapse-tags multiple v-model="brandIds" clearable style="width:280px" size="small" placeholder="请选择商品品牌">
                                    <el-option v-for="item in brandList" :key="item.id" :label="item.brandName"
                                               :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="供应商">
                                <el-select collapse-tags multiple clearable filterable v-model="supplierIds" style="width:280px" size="small"
                                           placeholder="请选择供应商">
                                    <el-option v-for="item in supplierList" :key="item.id" :label="item.supplierName"
                                               :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="商品状态">
                                <el-radio-group v-model="tableParam.enableStatus">
                                    <el-radio :label="1">启用</el-radio>
                                    <el-radio :label="0">禁用</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="创建时间">
                                <el-date-picker style="width:280px" v-model="timeRange" type="daterange"
                                                range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="进价区间">
                                <div class="numRange">
                                    <el-input-number :controls="false" :min="0" style="width: 100px" v-model="tableParam.skuPurchasePriceStart" type="small"></el-input-number>
                                    <span>至</span>
                                    <el-input-number :controls="false" :min="0" style="width: 100px" v-model="tableParam.skuPurchasePriceEnd" type="small"></el-input-number>
                                </div>
                            </el-form-item>
                            <el-form-item label="库存区间">
                                <div class="numRange">
                                    <el-input-number :controls="false" :min="0" style="width: 100px" v-model="tableParam.stockNumStart" type="small"></el-input-number>
                                    <span>至</span>
                                    <el-input-number :controls="false" :min="0" style="width: 100px" v-model="tableParam.stockNumEnd" type="small"></el-input-number>
                                </div>
                            </el-form-item>
                            <el-form-item>
                                <el-button @click="search" style="width: 90px;margin-left: -68px;"
                                           type="primary">确定
                                </el-button>
                                <el-button @click="searchShow = false" style="width: 90px">取消</el-button>
                                <el-button class="color_hover" @click="clearAll" type="text"
                                           style="width: 40px; color: #636365">清空
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </el-card>
                </div>
                <div class="tip" v-show='false'>
                    <i class="el-icon-close" @click="clear" style="cursor:pointer"></i> 已选{{pickNum}}项 <span
                        class="line">|</span>
                    <el-button size="small" style="width:90px" @click="operate">操作</el-button>
                </div>
                <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
                          @selection-change="handleSelectionChange">
                    <el-table-column width="55">
                        <template slot="header" slot-scope="scope">
                            <el-popover placement="bottom" popper-class='popoverBox' width="240" trigger="manual"
                                        v-model="visible">
                                <el-checkbox-group v-model="labelArr">
                                    <el-checkbox v-for="item in labelAll" :label="item.prop" :key="item.prop"
                                                 style="width：50%;">{{item.label}}
                                    </el-checkbox>
                                </el-checkbox-group>
                                <div style="text-align: center; margin: 0">
                                    <el-button size="mini" @click="cancelPick" style="width:90px">取消</el-button>
                                    <el-button type="primary" size="mini" style="width:90px" @click="savePick">保存
                                    </el-button>
                                </div>
                                <span v-if="scope" slot="reference"
                                      style="font-weight:bold;color:#409EFF;cursor:pointer;" @click="pick">筛选</span>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <template v-for="item in labelList">
                        <el-table-column v-if="item.type==='normal'" :key='item.prop' :prop="item.prop"
                                         :label="item.label">
                            <template slot-scope="scope">
                                <!-- <el-input v-model="scope.row[item.prop]" size="small" style="width:90px"></el-input> -->
                                <span>{{scope.row[item.prop]}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column v-if="item.type==='sort'" :key='item.prop' sortable :prop="item.prop"
                                         :label="item.label">
                            <template slot-scope="scope">
                                <!-- <el-input v-model="scope.row[item.prop]" size="small" style="width:90px"></el-input> -->
                                <span>{{scope.row[item.prop]}}</span>
                                <i v-if="item.prop === 'stockNum'" @click="editCargoFlowNumberBtn(scope.row)" style="font-size: 18px; color: #409eff; cursor: pointer; margin-left: 10px;" class="el-icon-edit"></i>
                            </template>
                        </el-table-column>
                        <el-table-column v-if="item.type==='sortnum'" :key='item.prop' sortable :prop="item.prop"
                                         :label="item.label">
                            <template slot-scope="scope">
                                <!-- <el-input v-model="scope.row[item.prop]" size="small" style="width:90px"></el-input> -->
                                <span>{{scope.row[item.prop] | numFormat}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column v-if="item.type==='fomate'" :key='item.prop' :prop="item.prop"
                                         :label="item.label">
                            <template slot-scope="scope">
                                <span>{{scope.row[item.prop] | time_s}}</span>
                            </template>
                        </el-table-column>
                    </template>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="edit(scope.row)" v-perss='81'>编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog title="批量导入" custom-class='dialog' :visible.sync="dialogVisible" width="30%"
                   :before-close="handleClose">
            <div class="top">
                <p>1.还没创建过导入数据文件，
                    <el-button type="primary" size="small" style="width:90px">下载模板</el-button>
                </p>
                <p>2.已创建好导入数据文件，直接导入：</p>
            </div>
            <div class="radioArr">
                <el-radio-group v-model="radio2">
                    <el-radio :label="3">自动创建Excel中新的商品分类</el-radio>
                    <el-radio :label="6">自动创建Excel中新的商品单位</el-radio>
                    <el-radio :label="9">自动创建Excel中新的商品品牌</el-radio>
                </el-radio-group>
            </div>
            <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="small" style="width:90px">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false" size="small" style="width:90px">确 定</el-button>
            </span>
        </el-dialog>
        <div class="model_footer">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change='changePageFn'
                    :current-page="tableParam.pageNo" :page-sizes="[15, 30, 50, 100]"
                    :page-size="tableParam.pageSize" layout="total, sizes, prev, pager, next, jumper"
                    :total="totalPage">
            </el-pagination>
        </div>
        <!-- 高级搜索选择分类 -->
        <el-dialog
                title="选择分类"
                :visible.sync="categoryVisible"
                width="30%"
        >
            <el-tree ref="chooseCategoryTree"
                     :data="categoryList" show-checkbox node-key="id" :expand-on-click-node="false"
                     :props="{
                        value: 'id',
                        label: 'categoryName',
                        children: 'categoryList'
                    }">
				<span style="width: 100%" class="item_box" slot-scope="{ node, data }">
					<span>{{data.categoryName}}</span>
					<span style="float: right" v-if="data.parentId == 0 && data.categoryList">{{'('+data.categoryList.length+')'}}</span>
                    <!-- <li style="width:110px;">{{data.sort}}</li> -->
				</span>
            </el-tree>
            <span slot="footer" class="dialog-footer">
				<el-button class="wid90" size="small" @click="categoryCansole">取 消</el-button>
				<el-button class="wid90" size="small" type="primary" @click="categorySure">确 定</el-button>
			</span>
        </el-dialog>
        <el-dialog
                title="生产日期与进货量关系"
                :visible.sync="cargoDialogVisible"
                :close-on-click-modal="false"
                class="purchaseDetailDialog"
                width="650px"
        >
            <el-form :inline="true" class="myForm" label-position="right" size="small" label-width="90px">
                <div class="dialog_item" v-for="(item, index) in editStock.stockList" :key="index">
                    <el-form-item prop="massage" label="生产日期">
                        <el-date-picker
                                v-model="item.productionDate"
                                value-format="timestamp"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="massage" label="对应库存">
                        <el-input v-model="item.availableInventory" @change.native="cargoFlowNumberItemKeyUp(item)" @keyup.native="cargoFlowNumberItemKeyUp(item)" placeholder="请输入对应库存"></el-input>
                    </el-form-item>
                </div>
                <div style="text-align: center; margin-top: 20px">
                    <el-button @click="addCargoItemBtn" icon="el-icon-plus" class="wid90" size="small">添加一行</el-button>
                </div>

            </el-form>
            <span slot="footer" class="dialog-footer">
				<el-button class="wid90" size="small" @click="cargoDialogVisible = false">取消</el-button>
				<el-button class="wid90" size="small" type="primary" @click="inStockSureEvent">确定</el-button>
			</span>
        </el-dialog>
    </div>
</template>

<script>
    import api from 'api/good'

    export default {
        data() {
            return {
                cargoDialogVisible: false,
                radio2: '',
                searchShow: false,
                dialogVisible: false,
                expriceShow: false,
                categoryVisible: false,
                categoryTreeNode: [],
                rules: {
                    expirationNum: [
                        {required: true, message: '请输入过期天数', trigger: 'blur'}
                    ]
                },
                categoryList: [
                ],
                categoryIds: [],
                categoryIds2: [],
                brandList: [],
                brandIds: [],
                supplierList: [],
                supplierIds: [],
                pickNum: '',
                tipShow: false,
                labelArr: [],
                labelList: [
                    {label: "商品名称", prop: "itemName", type: "sort"},
                    {label: "条码", prop: "itemBarcode", type: "normal"},
                    {label: "商品编码", prop: "itemNo", type: "normal"},
                    {label: "规格", prop: "spec", type: "normal"},
                    {label: "分类", prop: "categoryName", type: "normal"},
                    {label: "库存", prop: "stockNum", type: "sort"},
                    {label: "单位", prop: "unitName", type: "normal"},
                    {label: "进价(元)", prop: "skuPurchasePrice", type: "sortnum"},
                    {label: "零售价(元)", prop: "sellPricce", type: "sortnum"},
                    {label: "保质期(天)", prop: "expirationNum", type: "normal"},
                    {label: "更新时间", prop: "updated", type: "fomate"}
                ],
                visible: false,
                input8: '',
                value: '',
                options: [],
                totalPage: 10,
                tableParam: {
                    //高级搜索
                    pageNo: 1,
                    pageSize: 15,
                    combinationStr: ''
                },
                labelAll: [
                    {label: "商品名称", prop: "itemName", type: "sort"},
                    {label: "条码", prop: "itemBarcode", type: "normal"},
                    {label: "商品编码", prop: "itemNo", type: "normal"},
                    {label: "规格", prop: "spec", type: "normal"},
                    {label: "分类", prop: "categoryName", type: "normal"},
                    {label: "库存", prop: "stockNum", type: "sort"},
                    {label: "单位", prop: "unitName", type: "normal"},
                    {label: "进价(元)", prop: "skuPurchasePrice", type: "sortnum"},
                    {label: "零售价(元)", prop: "sellPricce", type: "sortnum"},
                    {label: "保质期(天)", prop: "expirationNum", type: "normal"},
                    {label: "更新时间", prop: "updated", type: "normal"}
                ],
                tableData: [],
                timeRange: [], // 创建时间
                editStock: {
                    stockList: [
                    ],
                    stockItem: {}
                }

            }
        },
        computed: {},
        watch: {
            brandIds: {
                handler(val){
                    if (val.length > 0) {
                        this.tableParam.brandIds = val.join(',')
                    } else {
                        delete this.tableParam.brandIds
                    }
                }
            },
            categoryIds: {
                handler(val){
                    if (val.length > 0) {
                        this.tableParam.categoryIds = val.join(',')
                    } else {
                        delete this.tableParam.categoryIds
                    }
                }
            },
            categoryIds2: {
                handler(val){
                    if (val.length > 0) {
                        this.tableParam.categoryId = val[val.length - 1]
                        this.search()
                    } else {
                        delete this.tableParam.categoryId
                        this.search()
                    }
                }
            },
            supplierIds: {
                handler(val){
                    if (val.length > 0) {
                        this.tableParam.supplierIds = val.join(',')
                    } else {
                        delete this.tableParam.supplierIds
                    }
                }
            },
            timeRange: {
                handler(val){
                    if (val) {
                        this.tableParam.createStartTime = Date.parse(val[0]) / 1000
                        this.tableParam.createEndTime = Date.parse(val[1]) / 1000
                    } else {
                        delete this.tableParam.createStartTime
                        delete this.tableParam.createEndTime
                    }
                }
            }
        },
        methods: {
            // 库存确认
            inStockSureEvent() {
                let postData = JSON.parse(JSON.stringify(this.editStock.stockList))
                postData.forEach((data) => {
                    data.productionDate = data.productionDate / 1000
                    data.availableInventory = parseInt(data.availableInventory)
                })
                api.editStorageItem(postData).then((res) => {
                    if (res.result == 1) {
                        this.$message.success({
                            message: '修改成功！'
                        })
                    }
                    this.cargoDialogVisible = false
                })
            },
            // 修改库存
            editCargoFlowNumberBtn(data) {
                this.cargoDialogVisible = true
                this.editStock.stockItem = data
                api.getStorageItem({shopId: data.shopId, itemSkuId: 1}).then((res) => {
                    this.editStock.stockList = res.data
                    this.editStock.stockList.forEach((item) => {
                        this.$set(item, 'productionDate', item.productionDate * 1000)
                        this.$set(item, 'unitPrice', this.editStock.stockItem.skuPurchasePrice)
                    })
                })
            },
            cargoFlowNumberItemKeyUp(data){
                data.availableInventory = this.myBase.formatIntNum(data.availableInventory)
            },
            // 库存保存
            addCargoItemBtn() {
                this.editStock.stockList.push({
                    productionDate: null, availableInventory: null, unitPrice: this.editStock.stockItem.skuPurchasePrice,
                    period: this.editStock.stockItem.expirationNum * 24 * 3600 || 0, itemSkuId: 1, shopId: this.editStock.stockItem.shopId
                })
            },
            // 分页
            handleSizeChange(val){
                this.tableParam.pageSize = val
                this.getGoodsList()
            },
            changePageFn(val) {
                this.tableParam.pageNo = val
                this.getGoodsList()
            },
            getGoodsList() {
                api.getGoodsList(this.tableParam).then((res) => {
                    this.tableData = res.data.listData
                    this.totalPage = res.data.totalCount
                })
            },
            // 商品类目
            getCategoryList() {
                api.getCategoryList({pageSize: 999}).then((res) => {
                    this.categoryList = res.data.listData
                })
            },
            // 商品品牌
            getBrandList() {
                api.getBrandList({pageSize: 999}).then((res) => {
                    this.brandList = res.data.listData
                })
            },
            // 供应商列表
            getSupplierList() {
                api.getSupplierList({pageSize: 999}).then((res) => {
                    this.supplierList = res.data.listData
                })
            },
            categorySure() {
                this.categoryTreeNode = this.$refs.chooseCategoryTree.getCheckedNodes(true, false)
                this.categoryIds = this.$refs.chooseCategoryTree.getCheckedKeys(true)
                this.categoryVisible = false
            },
            categoryCansole() {
                this.categoryVisible = false
            },
            chooseCategoryEvent() {
                this.categoryVisible = true
            },
            expriceSure() {
                this.expriceShow = false
                this.search()
            },
            //创建新商品
            newS() {
                this.$router.push({
                    path: '/newGood',
                    query: {
                        state: '1'
                    }
                })
            },
            // 清空高级搜索
            clearAll() {
                this.$refs.multipleTable.clearSelection();
                this.$refs.chooseCategoryTree.setCheckedNodes([])
                this.timeRange = null
                this.supplierIds = []
                this.categoryIds = []
                this.brandIds = []
                this.categoryTreeNode = []
                for (let key in this.tableParam) {
                    if (key !== 'pageNo' && key!== 'pageSize') {
                        this.tableParam[key] = ''
                    }
                }
                delete this.tableParam.skuPurchasePriceStart
                delete this.tableParam.skuPurchasePriceEnd
                delete this.tableParam.stockNumStart
                delete this.tableParam.stockNumEnd
            },
            // 搜索
            search() {
                this.searchShow = false
                this.getGoodsList()
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                this.pickNum = this.multipleSelection.length
                if (this.pickNum > 0) {
                    this.tipShow = true
                } else {
                    this.tipShow = false
                }
            },
            //清空多选
            clear() {
                this.$refs.multipleTable.clearSelection();
                this.pickNum = 0;
                this.tipShow = false;
            },
            //编辑
            edit(val) {
                console.log(val)
                this.$router.push({
                    path: 'newGood',
                    query: {
                        state: '2',
                        id: val.itemId
                    }
                })
            },
            //筛选按钮
            pick() {
                this.visible = !this.visible
                var temp = []
                this.labelList.forEach(obj => {
                    temp.push(obj.prop)
                })
                this.labelArr = temp
            },
            //保存筛选按钮
            savePick() {
                let temp = [];
                this.labelArr.forEach(item => {
                    this.labelAll.forEach(obj => {
                        if (item === obj.prop) {
                            temp.push(obj)
                        }
                    })
                })
                this.labelList = temp;
                this.visible = false;
            },
            //取消筛选
            cancelPick() {
                this.labelArr = [];
                this.visible = false;
            },
            // 操作按钮
            operate() {
                this.dialogVisible = true
            },
            //批量弹窗关闭
            handleClose() {
                this.dialogVisible = false
            }
        },
        created() {
        },
        activated() {
            this.getGoodsList()
            this.getCategoryList()
            this.getBrandList()
            this.getSupplierList()
        },
        mounted() {

        }
    }
</script>
<style>
    .popoverBox {
        padding: 24px;
        top: 165px !important;
        left: 215px !important;
    }

    .popoverBox .popper__arrow {
        left: 20px !important;
    }

    .popoverBox .el-checkbox {
        width: 50%;
        margin-right: 0px;
        margin-bottom: 24px;
        color: #606266;
    }
</style>

<style lang="scss">
    .info {
        .el-date-editor .el-range-separator {
            width: 10%;
        }
        .search {
            padding: 15px;
            display: flex;
            position: relative;
            .lab {
                line-height: 32px;
                margin-right: 10px;
            }
        }
        .box_card {
            position: fixed;
            left: 210px;
            top: 40px;
            width: 85%;
            background: #fff;
            z-index: 300;
            line-height: 22px;
            .firstLine {
                display: flex;
                justify-content: space-between;
                .el-form-item--small.el-form-item {
                    margin-bottom: 0px;
                }
            }
            .numRange {
                width: 280px;
                height: 32px;
                background: rgba(255, 255, 255, 1);
                border: 1px solid rgba(228, 231, 237, 1);
                border-radius: 4px;
                display: flex;
                justify-content: space-between;
                input {
                    border: none;
                    outline: none;
                    height: 100%;
                    text-align: center;
                }
            }
        }
        .window_mask {
            position: absolute;
            width: 112%;
            height: 100%;
            background: #000;
            opacity: 0.5;
            z-index: 10;
            left: -12%;
            top: 0%;
        }
        .tip {
            height: 50px;
            line-height: 50px;
            border-top: 1px solid #ebeef5;
            padding-left: 20px;
            .line {
                margin-left: 10px;
                margin-right: 10px;
                color: #ebeef5;
            }
        }
        .dialog {
            .el-dialog__body {
                padding: 30px;
            }
            .top {
                border-bottom: 1px solid #ebeef5;
            }
            .el-radio-group {
                display: flex;
                flex-direction: column;
                label {
                    margin-top: 20px;
                    margin-bottom: 20px;
                }
            }
        }
    }

    .el-tree-node__content {
        border-bottom: 1px solid #ebeef5;
        height: 36px;
    }
</style>
