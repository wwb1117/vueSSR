<template>
    <div class="brandList">
        <div class="model_topcol">
            <span class="font600">商品品牌</span>
            <div>
                <el-button v-perss='94' type="primary" size="small" @click="newS()">新增品牌</el-button>
            </div>
        </div>
        <div class="model_content">
            <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 30 + 'px', overflow: 'auto'}">
                <div class="search">
                    <el-input size="small" style="width:380px;margin-right:10px" clearable @clear="serachName" placeholder="请输入品牌名称" prefix-icon="el-icon-search" v-model="tableParam.brandName">
                    </el-input>
                    <el-button size="small" type="primary" @click='serachName()'>搜索</el-button>
                    <span class="tip"><i class="el-icon-warning"></i>温馨提示：商品品牌由总部统一维护，分店只能浏览</span>
                </div>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="brandName" label="品牌分类">
                    </el-table-column>
                    <el-table-column prop="brandImg" label="品牌logo">
                        <template slot-scope="scope">
                            <div class="brand_list_img">
                                <img :src="scope.row.brandImg" alt="">
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button v-perss='95' type="text" @click="edit(scope.row.id)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog :title="titleName" :visible.sync="dialogShow" width="500px" custom-class='dialog' :before-close="handleClose">
            <div class="tabItem">
                <span style="color:#f56c6c;margin-right:2px;font-size:16px;">*</span><span class="lable">
                    品牌名称
                </span>
                <el-input size="small" v-model="newbrandName"></el-input>
            </div>
            <div class="tabItem">
                <span class="lable">
                    品牌logo
                </span>
                <div>
                    <el-upload
                        list-type="picture-card"
                        :action="upDateImgUrl"
                        :data='sendData'
                        :on-remove="handleRemove"
                        :on-success='handleAvatarSuccess'>
                        <img style="width: 140px; height: 140px;" v-if='dialogImageUrl' :src="dialogImageUrl" class="avatar">
                        <i v-if="!dialogImageUrl" class="el-icon-plus"></i>
                    </el-upload>
                    <p>图片格式支持jpg,png,bmp,尺寸为100*100</p>
                </div>

            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogShow = false" size="small" style="width:90px">返回</el-button>
                <el-button v-if="shopType == 0" type="primary" @click="addBrand(valId)" size="small" style="width:90px">保存</el-button>
            </span>
        </el-dialog>
        <div class="model_footer">
            <el-pagination @current-change='changePageFn'  :current-page="tableParam.pageNo" :page-sizes="[15, 30, 50, 100]" :page-size="tableParam.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalPage">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import api from 'api/good'
export default {
    data () {
        return {
            titleName: '新增商品品牌',
            valId:'',
            newbrandName:'',
            dialogShow: false,
            totalPage: 0,
            tableParam: {
                pageNo: 1,
                pageSize: 15,
                brandName:''
            },
            tableData: [],
            value: '',
            options: [],
            fileList: [],
            dialogImageUrl: '',
            dialogVisible: false,
            upDateImgUrl: this.$store.state.home.baseUrl + '/f/upload',
            sendData: {
                file: "",
                uploadType: 'pos-shop'
            },
            shopType: 0
        }
    },
    computed: {},
    mounted () {
        
    },
    activated () {
        this.shopType = this.$store.state.home.currentShop.shopType
        this.getBrandList()
    },
    created () {},
    methods: {
        // 分页
        changePageFn(val) {
            console.log(val)
            this.tableParam.pageNo = val
            this.getBrandList()
        },
        serachName(){
            // this.newbrandName = this.tableParam.brandName
            this.tableParam.pageNo = 1
            this.getBrandList()
        },
        //获取列表
		getBrandList(){
			api.getBrandList(this.tableParam).then((res) => {
                this.$set(this.$data, 'tableData', res.data.listData)
                this.totalPage = res.data.totalCount
			})
        },
        //新增品牌
        newS () {
            this.titleName = '新增商品品牌'
            this.dialogShow = true
            this.newbrandName = ''
            this.dialogImageUrl = ''
        },
        handleClose () {
            this.dialogShow = false
        },
        addBrand(){
            let obj = {
                brandName: this.newbrandName,
                brandImg: this.dialogImageUrl,
                id: this.valId
            }
            if(this.titleName == '新增商品品牌'){
                api.addBrand(obj).then((res)=>{
                    console.log(res.result)
                    if(res.result == 1){
                        this.$message({
                            type: 'success',
                            message: '新增商品品牌成功！'
                        });
                        this.getBrandList()
                        this.dialogShow = false
                    }
                }).catch((error)=>{
                    console.log(error)
                })
            } else {
                api.updataBrand(obj).then((res)=>{
                    if(res.result == 1){
                        this.$message({
                            type: 'success',
                            message: '编辑商品品牌成功！'
                        });
                        this.getBrandList()
                        this.dialogShow = false
                    }
                }).catch((error)=>{
                    console.log(error)
                })
            }
        },
        //编辑品牌
        edit (val) {
            console.log(val)
            this.titleName = '编辑商品品牌',
            this.dialogShow = true
            api.checkBrandId(val).then((res)=>{
                this.newbrandName = res.data.brandName
                this.dialogImageUrl = res.data.brandImg
            })
            this.valId = val
        },
        //上传图片
        handleRemove(file, fileList) {
            this.dialogImageUrl = ''
        },
        handleAvatarSuccess(file, fileList) {
            this.dialogImageUrl = file.data.url
        }
		// getSearBrandList(){
		// 	var obj = {
		// 		pageNo: 1,
		// 		pageSize: 10,
		// 		brandName: ''
		// 	}
		// 	api.getSearBrandList(obj).then((response) => {
		// 		console.log(response)
		// 	})
		// }
    }
}
</script>
<style lang="scss">
    .brandList{
        .el-upload-list--picture-card{
            display: none;
        }
    }
</style>
<style scoped lang="scss">
.brandList {
    .brand_list_img img{
        width: 30px;
        height: 30px;
    }
    .model_topcol {
        display: flex;
        justify-content: space-between;
    }
    .search {
        padding: 15px;
        display: flex;
        .tip {
            line-height: 32px;
            margin-left: 24px;
        }
    }
    .dialog {
        .lable {
            font-size: 14px;
            font-weight: 400;
            color: rgba(96, 98, 102, 1);
            margin-right: 10px;
            width: 70px;
            text-align: left;
        }
        .tabItem {
            line-height: 32px;
            display: flex;
            flex-direction: row;
            margin-bottom: 24px;
            p {
                font-size: 12px;
                font-weight: 400;
                color: rgba(144, 147, 153, 1);
            }
        }
        .el-select {
            width: 360px;
        }
    }
}
</style>
