<template>
    <div class="setGoods">
        <div class="model_topcol">
            <span>导购技师 - 提成设置 - 设置特殊商品</span>
            <div>
                <el-button class="wid90" type="primary" size="small" @click="addGoods">添加商品</el-button>
                <el-button class="wid90" type="primary" size="small" @click="importGoods">导入商品</el-button>
            </div>
        </div>
        <div class="model_content">
            <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
                <el-table
                        @selection-change="handleSelectionChange1"
                        :data="tableData"
                        style="width: 100%;height: calc(100% - 71px)">
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
                    <el-table-column
                            width="150"
                            label="操作">
                        <template slot-scope="scope">
                            <div>
                                <el-button
                                        type="text"
                                        @click="delGuide(scope.row)"
                                        size="small">
                                    删除
                                </el-button>
                            </div>
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
                           @current-change='changePageFn'
                           @size-change="handleSizeChange"
                           :page-sizes="[10, 15, 20]"
                           :page-size="tableParam.pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="totalPage">
            </el-pagination>
        </div>
        <el-dialog
                title="特殊商品导入"
                :visible.sync="dialogVisible"
                width="420px">
            <div class="importGoods">
                <p>1.还没创建过导入数据文件，<el-button type="primary" size="small">下载模板</el-button></p>
                <p>2.已创建好导入数据文件，直接导入：</p>
                <el-upload
                        class="upload-demo"
                        drag
                        style="width: 100%;"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                        将文件拖到此处，或<em>点击上传</em>
                        <p style="margin-bottom: 0;color: #C0C4CC;font-size: 12px">导入文件为.xls的excel的文件，大小不超过3M</p>
                    </div>
                </el-upload>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false" size="small">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import api from 'api/mall'
    export default {
        data() {
            return {
                tableData: [],
                serveItem: '2',
                value: '',
                mallList: [],
                totalPage: 10,
                activeName: '1',
                tableParam: {
                    searchWord: '',
                    purchaseDate: '',
                    mallId: '',
                    pageNo: 1,
                    pageSize: 15
                },
                multipleSelection1: [],
                dialogVisible: false,
                promoteObj1: {},
                postData: {
                    userId: '',
                    specialList: []
                }

            }
        },
        computed: {},
        created() {},
        activated() {
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
            // 获取商品列表
            getTableData() {
                if (this.$route.query.id) {
                    api.getSalesList({categoryId: this.$route.query.id, userId: this.$route.query.userId, pageNo: this.tableParam.pageNo, pageSize: this.tableParam.pageSize}).then((res) => {
                        this.tableData = res.data.listData
                        this.totalPage = res.data.totalCount
                    })
                } else {
                    api.getSalesList({userId: this.$route.query.userId, pageNo: this.tableParam.pageNo, pageSize: this.tableParam.pageSize}).then((res) => {
                        this.tableData = res.data.listData
                        this.totalPage = res.data.totalCount
                    })
                }
            },
            // 删除商品提成
            delGuide(data) {
                this.$confirm('你确定删除该商品吗?', '确定删除', {
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {
                    api.delPromote({id: data.id}).then((res) => {
                        this.$message.success({
                            message: '删除成功！'
                        })
                        this.getTableData()
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            handleSelectionChange1(val) {
                this.multipleSelection1 = val
            },
            // 添加商品
            addGoods() {
                this.$router.push({
                    path: '/addGoods',
                    query: {
                        userId: this.$route.query.userId
                    }
                })
            },
            // 导入商品
            importGoods() {
                this.dialogVisible = true
            },
            // 保存
            save() {
                this.postData.userId = this.$route.query.userId
                if ((this.promoteObj1.type == 0 || this.promoteObj1.type == 1) &&this.promoteObj1.vipPromote && this.promoteObj1.otherPromote) {
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
        mounted() {}
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
<style>
    .setGoods .importGoods .el-upload,.setGoods .importGoods .el-upload-dragger{
        width: 100%;
    }
</style>