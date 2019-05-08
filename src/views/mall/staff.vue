<template>
    <div>
        <div class="model_topcol">
            <span>员工</span>
            <div>
                <el-button class="wid90" type="primary" size="small" @click="addStaff()" v-perss='69'>新增员工</el-button>
                <el-button class="wid90" type="primary" size="small" @click="linkToStaffRole()" v-perss='71'>角色管理</el-button>
            </div>
        </div>
        <div class="model_content">
            <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
                <div class="header_seach_wrap" style="padding: 15px">
                    <span style="margin-right: 10px">所属门店</span>
                    <el-select clearable filterable @clear="search" v-model="tableParam.shopId" @change="search" size="small" placeholder="请选择门店">
                        <el-option v-for="item in mallList" :key="item.id" :label="item.shopName" :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select clearable filterable v-model="tableParam.enableStatus" size="small" @change="search" placeholder="请选择状态" @clear="search">
                        <el-option :key="0" label="禁用" :value="0">
                        </el-option>
                        <el-option :key="1" label="启用" :value="1">
                        </el-option>
                    </el-select>
                    <el-input prefix-icon="el-icon-search" style="width: 294px" size="small" v-model="tableParam.keyWord" @clear="search" placeholder="请输入工号/姓名/手机号" clearable></el-input>
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
                            prop="employeeCode"
                            label="工号"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="employeeName"
                            label="姓名"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="cellPhone"
                            label="手机号"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="roleName"
                            label="角色"
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
                            prop="purchaseOrderNo"
                            width="150"
                            label="操作">
                        <template slot-scope="scope">
                            <div>
                                <el-button
                                        v-perss='70'
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
                tableData: [],
                mallList: [],
                totalPage: 10,
                tableParam: {
                    keyWord: '',
                    enableStatus: '',
                    shopId: '',
                    pageNo: 1,
                    pageSize: 10,
                    isGuide: 0
                }
            }
        },
        computed: {},
        created() {},
        activated() {
            this.getTableList()
            this.getMallList()
        },
        methods: {
            // 编辑员工
            editStaff(data) {
                this.$router.push({
                    path: '/newStaff',
                    query: {
                        id: data.id
                    }
                })
            },
            addStaff() {
                this.$router.push({
                    path: '/newStaff'
                })
            },
            linkToStaffRole() {
                this.$router.push({
                    path: '/staffRole'
                })
            },
            // 获取店铺列表
            getMallList() {
                api.getMallList({pageSize: 99999}).then((response) => {
                    this.mallList = response.data.listData
                })
            },
            getTableList() {
                api.getStaffList(this.tableParam).then((res) => {
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