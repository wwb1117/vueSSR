<template>
    <div class="selectTemp">
        <div class="model_topcol">
            <span>选择商品模板</span>
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
                        ref="singleTable"
                        highlight-current-row
                        @selection-change="handleSelectionChange1"
                        @current-change="handleCurrentChange"
                        :data="tableData"
                        style="width: 100%;height: calc(100% - 62px);overflow: auto">
                    <el-table-column
                            type="index"
                            width="50">
                    </el-table-column>
                    <el-table-column
                            prop="code"
                            label="编码"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="title"
                            label="商品名称"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="categoryName"
                            label="所属分类"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="brandName"
                            label="品牌名称"
                    >
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="model_footer">
            <el-button size="small" class='wid90' style="margin-left: 25px;" @click="cancel">取消</el-button>
            <el-button type="primary" class='wid90' size="small" style="margin-left: 25px" @click="save" >保存</el-button>
            <el-pagination :current-page="tableParam.pageNo"
                           :page-sizes="[10, 15, 20]"
                           :page-size="tableParam.pageSize"
                           @current-change='changePageFn'
                           @size-change="handleSizeChange"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="totalPage">
            </el-pagination>
        </div>
    </div>
</template>

<script>
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
                    pageSize: 15
                },
                categoryIdArr: [],
                multipleSelection1: [],
                dialogVisible: false,
                currentRow: ''
            }
        },
        computed: {},
        created() {},
        activated() {
            this.getBrandList()
            this.getCategoryList()
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
                apiGood.getTempList(this.tableParam).then((res) => {
                    this.tableData = res.data.itemCenterTemplateResponseList
                    this.totalPage = res.data.total
                })
            },
            search() {
                this.getTableData()
            },
            handleSelectionChange1(val) {
                this.multipleSelection1 = val
            },
            // 选中行
            handleCurrentChange(val) {
                this.currentRow = val
            },
            save() {
                this.$emit('chooseValue', this.currentRow)
                this.cancel()
            },
            cancel() {
                this.$emit('hide')
            }
        },
        mounted() {

        }
    }
</script>
<style lang="scss">
    .selectTemp{
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 9999;
    }
</style>
<style scoped>
    .header_seach_wrap>div {
        margin-right: 10px;
    }
</style>