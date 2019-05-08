<template>
    <div class="supplier">
        <div class="model_topcol">
            <span class="font600">供应商</span>
            <div>
                <el-button v-perss='97' type="primary" size="small" @click="newS()">新增供应商</el-button>
            </div>
        </div>
        <div class="model_content">
            <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 30 + 'px', overflow: 'auto'}">
                <div class="search">
                    <el-input clearable @clear="search" size="small" style="width:380px;margin-right:10px" placeholder="请输入供应商名称" prefix-icon="el-icon-search" v-model="tableParam.supplierName">
                    </el-input>
                    <el-button size="small" type="primary" @click='search()'>搜索</el-button>
                </div>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="supplierCode" label="供应商编号" width="180">
                    </el-table-column>
                    <el-table-column prop="supplierName" label="供应商名称" width="180">
                    </el-table-column>
                    <el-table-column prop="legalName" label="法定代表人">
                    </el-table-column>
                    <el-table-column prop="contactName" label="联系人" width="180">
                    </el-table-column>
                    <el-table-column prop="contactTel" label="手机号" width="180">
                    </el-table-column>
                    <el-table-column prop="contactEmail" label="邮箱">
                    </el-table-column>
                    <el-table-column prop="contactAddr" label="地址" width="180">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button v-perss='98' type="text" @click="edit(scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
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
            totalPage: 0,
            tableParam: {
                pageNo: 1,
                pageSize: 15,
                supplierName:''
            },
            tableData: [],
            shopType: 0
        }
    },
    computed: {},
    methods: {
        search(){
            this.tableParam.pageNo = 1
            this.getSupplierList()
        },
        // 分页
        handleSizeChange(val){
            this.tableParam.pageSize = val
            this.getSupplierList()
        },
        changePageFn(val) {
            this.tableParam.pageNo = val
            this.getSupplierList()
        },
        //获取列表
        getSupplierList(){
			api.getSupplierList(this.tableParam).then((res) => {
                this.tableData = res.data.listData
                this.totalPage = res.data.totalCount
			})
        },
        newS () {
            this.$router.push({
                path: '/newSupplier'
            })
        },
        edit (val) {
            this.$router.push({
                path: '/newSupplier',
                query: {
                    id: val.id
                }
            })
        }
    },
    created () { },
    activated () {
        this.shopType = this.$store.state.home.currentShop.shopType
        this.getSupplierList()
    },
    mounted () {
    }
}
</script>
<style scoped lang="scss">
.supplier {
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
}
</style>
