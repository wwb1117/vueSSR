<template>
    <div class="category">
        <div class="model_topcol">
            <span class="font600">商品分类</span>
            <div>
                <el-button v-perss='89' type="primary" size="small" @click="newS()">新增分类</el-button>
            </div>
        </div>
        <div class="model_content">
            <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
                <div class="search">
                    <el-input clearable @clear="search" size="small" style="width:380px;margin-right:10px" placeholder="请输入分类名称" prefix-icon="el-icon-search" v-model="tableParam.categoryName">
                    </el-input>
                    <el-button size="small" type="primary" @click='search()'>搜索</el-button>
                    <span class="tip"><i class="el-icon-warning"></i> 温馨提示：商品类目由总部统一维护，分店只能浏览</span>
                </div>
                <ul class="form_title">
                    <li style="width:300px;">分类名称</li>
                    <li style="width:180px;">分类图片</li>
                    <li style="width:180px;">是否显示</li>
                    <li style="width:110px;">排序</li>
                    <li style="width:170px">操作</li>
                </ul>
                <div class="form_body">
                    <el-tree 
                        :data="dataList" 
                        :props="defaultProps" 
                        :expand-on-click-node="false">
                        <ul class="item_box" slot-scope="{ node, data }">
                            <li>{{data.categoryName}}</li>
                            <li style="width:180px;">
                                <img :src="data.img" alt="">
                            </li>
                            <li style="width:180px;">
								<el-switch 
									v-perss='91'
                                    v-model="data.isShow"
                                    @change="change(data.isShow, data.id)">
                                </el-switch>
                            </li>
                            <li style="width:110px;">{{data.sort}}</li>
                            <li style="width:170px;">
                                <el-button type='text' @click="addconfim(data.id, node)">新增下级</el-button>
                                <el-button type='text' v-perss='90' @click="editconfim(data.id)">编辑</el-button>
                            </li>
                        </ul>
                    </el-tree>
                </div>

            </div>
        </div>
        <el-dialog :title="title" :visible.sync="dialogShow" width="30%" :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item v-if="this.title == '新增下级'" label="父类" prop="">
                    <el-input disabled v-model="ruleForm.parent" size="small"></el-input>
                </el-form-item>
                <el-form-item label="分类名称" size="small" prop="" required>
                    <el-input v-model="ruleForm.categoryName" size="small"></el-input>
                </el-form-item>
                <el-form-item label="分类图片" size="small" prop="">
                    <el-upload 
                        :action="upDateImgUrl"
                        :data='sendData' 
                        list-type="picture-card"
                        :on-success="handleAvatarSuccess"
                        :on-remove="handleRemove">
                            <img style="width: 140px; height: 140px;" v-if='dialogImageUrl' :src="dialogImageUrl" class="avatar">
                            <i v-if='!dialogImageUrl' class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="排序" required>
                    <el-input v-model="ruleForm.sort" size="small"></el-input>
                </el-form-item>
                <el-form-item label="是否显示" required>
                    <el-switch v-model="ruleForm.isShow">
                    </el-switch>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose" size="small" style="width:90px">返 回</el-button>
                <el-button type="primary" @click="addCategory()" v-if="shopType == 0" size="small" style="width:90px">保 存</el-button>
            </span>
        </el-dialog>
        <div class="model_footer">
                <el-pagination 
                    @size-change="handleSizeChange"
                    @current-change='changePageFn'  
                    :current-page="tableParam.pageNo" 
                    :page-sizes="[15, 30, 50, 100]" 
                    :page-size="tableParam.pageSize" 
                    layout="total, sizes, prev, pager, next, jumper" 
                    :total="totalPage">
                </el-pagination>
        </div>
    </div>
</template>

<script>
import api from 'api/good'
export default {
    data () {
        return {
            dialogShow: false,
            dialogImageUrl: '',
            upDateImgUrl: this.$store.state.home.baseUrl + '/f/upload',
            sendData: {
                file: "",
                uploadType: 'pos-shop'
            },
            dialogVisible: false,
            value: '',
            options: [],
            rules: {},
            ruleForm: {},
            value2: false,
            title: '',
            theParentId:0,
            dataList: [],
            defaultProps: {
                children: 'categoryList',
                label: 'categoryName'
            },
            totalPage: 0,
            tableParam: {
                pageNo: 1,
                pageSize: 15,
                categoryName:''
            },
            shopType: 0
        }
    },
    computed: {},
    methods: {
        //搜索
        search(){
            this.tableParam.pageNo = 1
            this.getCategoryList()
        },
        // 分页
        changePageFn(val) {
            this.tableParam.pageNo = val
            this.getCategoryList()
        },
        handleSizeChange(val){
            this.tableParam.pageSize = val
            this.getCategoryList()
        },
        //分类列表
        getCategoryList(){
			api.getCategoryList(this.tableParam).then((res) => {
                this.dataList = res.data.listData
                this.totalPage = res.data.totalCount
                for (var i in this.dataList){
                    if (this.dataList[i].isShow == 1){
                        this.dataList[i].isShow = true
                    } else {
                        this.dataList[i].isShow = false
                    }
                    for (var k in this.dataList[i].categoryList){
                        if (this.dataList[i].categoryList[k].isShow == 1){
                            this.dataList[i].categoryList[k].isShow = true
                        } else {
                            this.dataList[i].categoryList[k].isShow = false
                        }
                        for (var y in this.dataList[i].categoryList[k].categoryList){
                            if (this.dataList[i].categoryList[k].categoryList[y].isShow == 1){
                                this.dataList[i].categoryList[k].categoryList[y].isShow = true
                            } else {
                                this.dataList[i].categoryList[k].categoryList[y].isShow = false
                            }
                        }
                    }
                }
			})
        },
        //是否显示
        change(data, item){
            // nextCategory
            api.showCategory(item).then((res) => {
                console.log(res)
            })
        },
        //新增分类保存三种情况
        addCategory(){
            if (this.ruleForm.isShow == true){
                this.ruleForm.isShow = 1
            } else {
                this.ruleForm.isShow = 0
            }
            let obj = {
                categoryName:this.ruleForm.categoryName,
                isShow:this.ruleForm.isShow,
                sort:this.ruleForm.sort,
                categoryImg:this.dialogImageUrl,
                parentId:this.theParentId
            }
            if(this.title == '新增分类'){
                api.addCategory(obj).then((res) => {
                    if(res.result == 1){
                        this.$message({
                            type: 'success',
                            message: '新增商品分类成功！'
                        });
                        this.getCategoryList()
                        this.dialogShow = false
                        this.ruleForm = {}
                        this.dialogImageUrl = ''
                    }
                })
            } else if (this.title == '编辑分类'){
                obj.id = this.ruleForm.id
                api.editCategory(obj).then((res) => {
                    if(res.result == 1){
                        this.$message({
                            type: 'success',
                            message: '编辑商品分类成功！'
                        });
                        this.getCategoryList()
                        this.ruleForm = {}
                        this.dialogImageUrl = ''
                        this.dialogShow = false
                    }
                })
            } else {
                api.addCategory(obj).then((res) => {
                    if(res.result == 1){
                        this.$message({
                            type: 'success',
                            message: '新增下级成功！'
                        });
                        this.getCategoryList()
                        this.dialogShow = false
                        this.ruleForm = {}
                        this.dialogImageUrl = ''
                    }
                })
            }
        },
        //编辑分类
        editconfim(id){
            this.dialogShow = true
            this.title = '编辑分类'
            this.ruleForm.id = id
            api.checkCategory(id).then((res) => {
                this.ruleForm = res.data
                if (this.ruleForm.isShow == 1){
                    this.ruleForm.isShow = true
                } else {
                    this.ruleForm.isShow = false
                }
                this.dialogImageUrl = this.ruleForm.categoryImg
            })
            
        },
        addconfim (id, item) {
            this.dialogShow = true
            this.title = '新增下级'
            this.dialogImageUrl = ''
            this.theParentId = id
            if(item.parent.id == 0){
                this.ruleForm.parent = item.label
            } else {
                this.ruleForm.parent = item.parent.label
            }
            console.log(this.dialogImageUrl)
        },
        newS () {
            this.dialogShow = true
            this.title = '新增分类'
            this.dialogImageUrl = ''
        },
        handleClose () {
            this.dialogShow = false
            this.ruleForm = {}
        },
        handleRemove (file, fileList) {
            this.dialogImageUrl = ''
        },
        handleAvatarSuccess(file, fileList) {
            this.dialogImageUrl = file.data.url
        }
    },
    created () { },
    activated () {
        this.shopType = this.$store.state.home.currentShop.shopType
        this.getCategoryList()
    },
    mounted () {
    }
}
</script>
<style lang="scss">
    .category {
        .form_body .el-tree-node__content {
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
        .el-upload-list--picture-card{
            display: none;
        }
    }
</style>

<style scoped lang="scss">
.category {
    ul {
        margin: 0;
        padding: 0;
    }
    .search {
        padding: 15px;
        display: flex;
        .tip {
            line-height: 32px;
            margin-left: 24px;
        }
    }

    .form_title {
        display: flex;
        justify-content: space-between;
        height: 40px;
        line-height: 40px;
        padding-left: 40px;
        background: rgba(245, 245, 245, 1);
    }
    .item_box {
        width: 100%;
        display: flex;
        justify-content: space-between;
        height: 40px;
        line-height: 40px;
    }
    .el-input {
        width: 100%;
    }
}
</style>
