<template>
    <div class="transfer">
        <div class="model_topcol">
            <span>导购技师 - 提成设置 - 设置特殊商品</span>
        </div>
        <div class="model_content">
            <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
                <div class="header_seach_wrap" style="padding: 15px">
                    <el-cascader
                            style="width: 215px;margin-right: 8px"
                            :options="categoryList"
                            v-model="categoryIdArr"
                            clearable
                            @clear="search"
                            :show-all-levels="false"
                            :props="{
                                    value: 'id',
                                    label: 'categoryName',
                                    children: 'categoryList'
                                }"
                            @change="categoryChange"
                    >
                    </el-cascader>
                    <el-select v-model="tableParam.brandId" clearable size="small" placeholder="请选择商品品牌" @clear="search">
                        <el-option v-for="item in brandList" :key="item.id" :label="item.brandName"
                                   :value="item.id">
                        </el-option>
                    </el-select>
                    <el-input prefix-icon="el-icon-search" style="width: 294px" size="small" v-model="tableParam.keyWord" placeholder="请输入条码、名称、拼音码搜索"></el-input>
                    <el-button type="primary" size="small" @click="search">搜索</el-button>
                </div>
                <el-table
                        @selection-change="handleSelectionChange1"
                        :data="tableData"
                        style="width: 100%;height: calc(100% - 133px)">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            prop="skuItemBarcode"
                            label="条码"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="itemName"
                            label="产品名称"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="categoryName"
                            label="所属分类"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="type"
                            label="提成方式"
                    >
                        <template slot-scope="scope">
                            <div>{{['比例提成', '固定提成'][scope.row.type]}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="vipPromote"
                            label="会员提成点"
                    >
                        <template slot-scope="scope">
                            <div>{{scope.row.vipPromote}}%</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="otherPromote"
                            label="散客提成点"
                    >
                        <template slot-scope="scope">
                            <div>{{scope.row.otherPromote}}%</div>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="transfer-select">
                    已选中 <span style="color: #606266;">{{multipleSelection1.length}}</span> 项
                    <el-select :disabled="multipleSelection1.length == 0" v-model="promoteObj1.type" style="width: 200px;margin-left: 15px" size="small" placeholder="请选择提成类型">
                        <el-option :key="0" label="比例提成" :value="0"></el-option>
                        <el-option :key="1" label="固定提成" :value="1"></el-option>
                    </el-select>
                    <el-input-number :disabled="multipleSelection1.length == 0" :min="0" :controls="false" placeholder="会员提成" size="small" v-model="promoteObj1.vipPromote" style="width: 200px;margin-left: 30px"></el-input-number> %
                    <el-input-number :disabled="multipleSelection1.length == 0" :min="0" :controls="false" placeholder="散客提成" size="small" v-model="promoteObj1.otherPromote" style="width: 200px;margin-left: 30px"></el-input-number> %
                </div>
            </div>
        </div>
        <div class="model_footer">
            <el-button size="small" class='wid90' style="margin:0 15px;" v-RouterBack>取消</el-button>
            <el-button type="primary" class='wid90' size="small" @click="save" :disabled="multipleSelection1.length == 0">保存</el-button>
            <el-pagination :current-page="tableParam.pageNo"
                           :page-sizes="[10, 15, 20]"
                           :page-size="tableParam.pageSize"
                           @current-change='changePageFn'
                           @size-change="handleSizeChange"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="totalPage">
            </el-pagination>
        </div>
        <el-dialog
                title="特殊商品导入"
                :visible.sync="dialogVisible"
                width="540px">
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false" size="small">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import api from 'api/mall'
    import apiGood from 'api/good'
    export default {
        data() {
            return {
                tableData: [],
                serveItem: '2',
                options: [],
                value: '',
                categoryList: [],
                brandList: [],
                totalPage: 10,
                activeName: '1',
                tableParam: {
                    keyWord: '',
                    categoryId: '',
                    brandId: '',
                    pageNo: 1,
                    pageSize: 15,
                    userId: ''
                },
                categoryIdArr: [],
                multipleSelection1: [],
                dialogVisible: false,
                promoteObj1: {
                },
                postData: {
                    userId: '',
                    specialList: []
                }

            }
        },
        computed: {},
        created() {},
        activated() {
            this.getBrandList()
            this.getCategoryList()
            this.promoteObj1 = {}
            this.getTableData()
        },
        methods: {
            changePageFn(val) {
                this.tableParam.pageNo = val
                this.getTableData()
            },
            handleSizeChange(val){
                this.tableParam.pageSize = val
                this.getTableData()
            },
            getBrandList() {
                apiGood.getBrandList({pageSize: 999}).then((res) => {
                    this.brandList = res.data.listData
                })
            },
            getCategoryList() {
                apiGood.getCategoryList({pageSize: 999}).then((res) => {
                    this.categoryList = res.data.listData
                })
            },
            categoryChange() {
                if (this.categoryIdArr.length > 0) {
                    this.tableParam.categoryId = this.categoryIdArr[this.categoryIdArr.length - 1]
                } else {
                    this.tableParam.categoryId = ''
                }
            },
            // 获取商品列表
            getTableData() {
                this.tableParam.userId = this.$route.query.userId
                api.getAllSalesList(this.tableParam).then((res) => {
                    this.tableData = res.data.listData
                    this.totalPage = res.data.totalCount
                })
            },
            search() {
                this.getTableData()
            },
            handleSelectionChange1(val) {
                this.multipleSelection1 = val
            },
            save() {
                this.postData.userId = this.$route.query.userId
                if ((this.promoteObj1.type == 0 || this.promoteObj1.type == 1) &&this.promoteObj1.vipPromote && this.promoteObj1.otherPromote) {
                    this.postData.specialList = []
                    this.multipleSelection1.forEach((item) => {
                        this.postData.specialList.push({
                            id: item.id,
                            categoryId: item.categoryId,
                            categoryName: item.categoryName,
                            itemName: item.itemName,
                            itemId: item.itemId,
                            type: this.promoteObj1.type,
                            otherPromote: this.promoteObj1.otherPromote,
                            vipPromote: this.promoteObj1.vipPromote
                        })
                    })
                } else {
                    this.$message.warning({
                        message: '编辑列表不能为空！'
                    })
                    return
                }
                api.editPromoteDetail(this.postData).then((res) => {
                    this.postData.specialList = []
                    this.$message.success({
                        message: '编辑成功！'
                    })
                    this.multipleSelection1 = []
                    this.promoteObj1 = {}
                    this.getTableData()
                })
            }
        },
        mounted() {

        }
    }
</script>
<style scoped>
    .header_seach_wrap>div {
        margin-right: 10px;
    }
    .transfer-header{
        font-size: 14px;
        padding: 9px 17px;
        line-height: 32px;
        border-bottom: 1px solid #E4E7ED;
    }
    .transfer-select{
        line-height: 32px;
        padding: 19px 17px;
        background: #F9F9F9;
        color: #909399;
    }
</style>