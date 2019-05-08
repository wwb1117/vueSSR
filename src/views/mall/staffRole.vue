<template>
    <div>
        <div class="model_topcol">
            <span>员工 - 员工角色</span>
            <div>
                <el-button class="wid90" type="primary" size="small" @click="addRole()" v-perss='72'>新增角色</el-button>
            </div>
        </div>
        <div class="model_content">
            <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
                <div class="header_seach_wrap" style="padding: 15px">
                    <span style="margin-right: 10px">所属门店</span>
                    <el-select clearable filterable v-model="tableParam.shopId" @change="search" size="small" placeholder="请选择门店" @clear="search">
                        <el-option v-for="item in mallList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select clearable filterable @change="search" v-model="tableParam.enableStatus" size="small" placeholder="请选择状态" @clear="search">
                        <el-option :key="0" label="禁用" :value="0">
                        </el-option>
                        <el-option :key="1" label="启用" :value="1">
                        </el-option>
                    </el-select>
                    <el-button type="primary" size="small" @click="search">搜索</el-button>
                </div>
                <el-table
                        :data="tableData"
                        style="width: 100%;height: calc(100% - 62px)">
                    <el-table-column
                            prop="shopName"
                            label="所属门店"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="roleName"
                            label="角色名称"
                    >
                    </el-table-column>
                    <el-table-column
                            label="状态"
                    >
                        <template slot-scope="scope">
                            <div>
                                {{['禁用', '启用'][scope.row.enableStatus]}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="remark"
                            label="备注"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="purchaseOrderNo"
                            width="150"
                            label="操作">
                        <template slot-scope="scope">
                            <div>
                                <el-button
                                        v-perss='73'
                                        type="text"
                                        @click="editStaff(scope.row)"
                                        size="small">
                                    编辑
                                </el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="model_footer">
            <el-button size="small" class='wid90' style="margin:0 15px;position: absolute;left: 220px;bottom: 9px;" v-RouterBack>返回</el-button>
            <el-pagination :current-page="tableParam.pageNo"
                           :page-sizes="[10]"
                           :page-size="tableParam.pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="totalPage">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import api from 'api/mall'
    export default {
        data() {
            return {
                tableData: [{
                    purchaseOrderNo: 'wwbtest'
                }],
                mallList: [],
                totalPage: 10,
                tableParam: {
                    enableStatus: '',
                    shopId: '',
                    pageNo: 1,
                    pageSize: 10
                }
            }
        },
        computed: {},
        created() {},
        activated() {
            this.mallList = this.$store.state.home.shopList
            this.tableParam.shopId = this.$store.state.home.currentShop.id
            this.getTableList()
        },
        methods: {
            // 编辑员工
            editStaff(data) {
                this.$router.push({
                    path: '/newRole',
                    query: {
                        id: data.id
                    }
                })
            },
            addRole() {
                this.$router.push({
                    path: '/newRole'
                })
            },
            getTableList() {
                api.getRoleList(this.tableParam).then((res) => {
                    this.tableData = res.data.listData
                    this.totalPage = res.data.totalCount
                })
            },
            search() {
                this.getTableList()
            }
        },
        mounted() {}
    }
</script>
<style scoped>
    .header_seach_wrap>div {
        margin-right: 10px;
    }
</style>