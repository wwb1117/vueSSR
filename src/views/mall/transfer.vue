<template>
    <div class="transfer">
        <div class="model_topcol">
            <span>导购技师 - 提成设置</span>
        </div>
        <div class="model_content">
            <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
                <div class="transfer-header">
                    当前导购技师 <strong style="font-size:16px;margin-left:10px">{{employeeInfo.name}}({{employeeInfo.code}})</strong>
                    <el-button type="primary" size="small" style="float: right;" @click="copyCommission">复制提成</el-button>
                </div>
                <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-bottom: -15px">
                    <el-tab-pane label="商品提成" name="1"></el-tab-pane>
                    <!--<el-tab-pane label="服务提成" name="2"></el-tab-pane>-->
                    <el-tab-pane label="次卡提成" name="3"></el-tab-pane>
                    <!-- <el-tab-pane label="购物卡提成" name="4"></el-tab-pane> -->
                    <el-tab-pane label="余额充值提成" name="5"></el-tab-pane>
                </el-tabs>
                <!--商品提成-->
                <div style="height: calc(100% - 100px)" v-show="activeName == '1'">
                    <div class="pl20" style="line-height: 50px">
                        <el-button type="primary" size="small" @click="setGoods">
                            设置特殊产品
                        </el-button>
                        <span style="color: #A3A2A7;margin-left: 15px"><i class="el-icon el-icon-warning" style="color: #F6B459;margin-right: 5px"></i>当子类未设置提成时，默认继承父类提成</span>
                    </div>
                    <el-table
                            :data="tableData1"
							 @selection-change="handleSelectionChange1"
                            style="width: 100%;height: calc(100% - 121px);overflow: auto">
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                prop="categoryName"
                                label="产品分类"
                        >
                        </el-table-column>
                        <el-table-column
                                label="提成方式"
                        >
                            <template slot-scope="scope">
                                <div>{{['比例提成', '固定提成'][scope.row.type]}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="会员提成"
                        >
                            <template slot-scope="scope">
                                <div>{{scope.row.vipPromote}}%</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="散客提成"
                        >
                            <template slot-scope="scope">
                                <div>{{scope.row.otherPromote}}%</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="purchaseOrderNo"
                                width="150"
                                label="操作">
                            <template slot-scope="scope">
                                <div>
                                    <el-button
                                            type="text"
                                            @click="editGuide(scope.row)"
                                            size="small">
                                        设置特殊商品({{scope.row.specialCount}})
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
                <!--服务提成-->
                <!--<div style="height: calc(100% - 100px)" v-show="activeName == '2'">-->
                    <!--<div class="pl20" style="line-height: 50px">-->
                        <!--<el-radio-group v-model="serveItem" @change='serveChange' style='width:100%' size="small">-->
                            <!--<el-radio-button label="1">销售提成</el-radio-button>-->
                            <!--<el-radio-button label="2">劳动提成</el-radio-button>-->
                        <!--</el-radio-group>-->
                    <!--</div>-->
                    <!--<el-table-->
                            <!--@selection-change="handleSelectionChange2"-->
                            <!--:data="tableData"-->
                            <!--style="width: 100%;height: calc(100% - 121px)">-->
                        <!--<el-table-column-->
                                <!--type="selection"-->
                                <!--width="55">-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                                <!--prop="purchaseOrderNo"-->
                                <!--label="产品分类"-->
                        <!--&gt;-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                                <!--prop="purchaseOrderNo"-->
                                <!--label="提成方式"-->
                        <!--&gt;-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                                <!--prop="purchaseOrderNo"-->
                                <!--label="会员提成"-->
                        <!--&gt;-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                                <!--prop="purchaseOrderNo"-->
                                <!--label="散客提成"-->
                        <!--&gt;-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                                <!--prop="purchaseOrderNo"-->
                                <!--width="150"-->
                                <!--label="操作">-->
                            <!--<template slot-scope="scope">-->
                                <!--<div>-->
                                    <!--<el-button-->
                                            <!--type="text"-->
                                            <!--@click="editGuide(scope)"-->
                                            <!--size="small">-->
                                        <!--设置特殊商品-->
                                    <!--</el-button>-->
                                <!--</div>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                    <!--</el-table>-->
                    <!--<div class="transfer-select">-->
                        <!--已选中 <span style="color: #606266;">{{multipleSelection2.length}}</span> 项-->
                        <!--<el-select :disabled="multipleSelection2.length == 0" v-model="value" style="width: 200px;margin-left: 15px" size="small" placeholder="请选择提成类型">-->
                            <!--<el-option-->
                                    <!--v-for="item in options"-->
                                    <!--:key="item.value"-->
                                    <!--:label="item.label"-->
                                    <!--:value="item.value">-->
                            <!--</el-option>-->
                        <!--</el-select>-->
                        <!--<el-input :disabled="multipleSelection2.length == 0" size="small" v-model="value" style="width: 200px;margin-left: 30px"></el-input> %-->
                        <!--<el-input :disabled="multipleSelection2.length == 0" size="small" v-model="value" style="width: 200px;margin-left: 30px"></el-input> %-->
                    <!--</div>-->
                <!--</div>-->
                <!---->
                <!--次卡提成-->
                <div style="height: calc(100% - 100px)" v-show="activeName == '3'">
                    <el-table
                            @selection-change="handleSelectionChange3"
                            :data="tableData3"
                            style="width: 100%;height: calc(100% - 71px)">
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                prop="cardName"
                                label="次卡名称"
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
                                prop="promote"
                                label="提成"
                        >
                            <template slot-scope="scope">
                                <div>{{scope.row.promote}} %</div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="transfer-select">
                        已选中 <span style="color: #606266;">{{multipleSelection3.length}}</span> 项
                        <el-select :disabled="multipleSelection3.length == 0" v-model="promoteObj3.type" style="width: 200px;margin-left: 15px" size="small" placeholder="请选择提成类型">
                            <el-option :key="0" label="比例提成" :value="0"></el-option>
                            <el-option :key="1" label="固定提成" :value="1"></el-option>
                        </el-select>
                        <el-input-number :disabled="multipleSelection3.length == 0" :min="0" :controls="false" placeholder="提成" size="small" v-model="promoteObj3.promote" style="width: 200px;margin-left: 30px"></el-input-number> %
                    </div>
                </div>
                <!--购物卡提成-->
                <div style="height: calc(100% - 100px)" v-show="activeName == '4'">
                    <el-table
                            @selection-change="handleSelectionChange4"
                            :data="tableData"
                            style="width: 100%;height: calc(100% - 71px)">
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                prop="purchaseOrderNo"
                                label="购物卡名称"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="purchaseOrderNo"
                                label="提成方式"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="purchaseOrderNo"
                                label="提成"
                        >
                        </el-table-column>
                    </el-table>
                    <div class="transfer-select">
                        已选中 <span style="color: #606266;">{{multipleSelection4.length}}</span> 项
                        <el-select :disabled="multipleSelection4.length == 0" v-model="value" style="width: 200px;margin-left: 15px" size="small" placeholder="请选择提成类型">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-input :disabled="multipleSelection4.length == 0" size="small" v-model="value" style="width: 200px;margin-left: 30px"></el-input> %
                        <el-input :disabled="multipleSelection4.length == 0" size="small" v-model="value" style="width: 200px;margin-left: 30px"></el-input> %
                    </div>
                </div>
                <!--余额充值提成-->
                <div style="height: calc(100% - 100px)" v-show="activeName == '5'">
                    <el-table
                            :data="tableData5"
                            style="width: 100%;height: calc(100%)">
                        <el-table-column
                                prop="purchaseOrderNo"
                                label="业绩区间"
                        >
                            <template slot-scope="scope">
                                <div v-show="!editRechargeFlag" style="line-height: 32px">{{scope.row.startRange}} - {{scope.row.endRange}}</div>
                                <div v-show="editRechargeFlag" style="white-space: nowrap">
                                    <el-input-number :controls="false" :min="0" style="width: 100px" v-model="scope.row.startRange" type="small"></el-input-number> -
                                    <el-input-number :controls="false" :min="scope.row.startRange + 1" style="width: 100px" v-model="scope.row.endRange" type="small"></el-input-number>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="提成方式"
                        >
                            <template slot-scope="scope">
                                <div v-show="!editRechargeFlag">{{['比例提成', '固定提成'][scope.row.type]}}</div>
                                <div v-show="editRechargeFlag">
                                    <el-select v-model="scope.row.type" style="width: 200px;" size="small" placeholder="请选择提成类型">
                                        <el-option :key="0" label="比例提成" :value="0"></el-option>
                                        <el-option :key="1" label="固定提成" :value="1"></el-option>
                                    </el-select>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="提成"
                        >
                            <template slot-scope="scope">
                                <div v-show="!editRechargeFlag" style="line-height: 32px">{{scope.row.promote}} %</div>
                                <div v-show="editRechargeFlag" style="white-space: nowrap">
                                    <el-input-number :controls="false" :min="0" style="width: 100px" v-model="scope.row.promote" type="small"></el-input-number> %
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                v-if="editRechargeFlag"
                                label="操作"
                        >
                            <template slot-scope="scope">
                                <div style="line-height: 32px">
                                    <span style="color: #409EFF;cursor: pointer" @click="addRecharge(scope.row)">新增</span>
                                    <span v-if="!scope.row.id" style="color: #409EFF;cursor: pointer;margin-left: 20px" @click="delRecharge(scope.$index)">删除</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <div class="model_footer" v-show="activeName != 5">
            <el-button size="small" class='wid90' style="margin:0 15px;" v-RouterBack>取消</el-button>
            <el-button type="primary" class='wid90' size="small" @click="save">保存</el-button>
        </div>
        <div class="model_footer" v-show="activeName == 5">
            <el-button type="primary" class='wid90' style="margin-left: 15px;" size="small" @click="editRecharge" v-if="!editRechargeFlag">编辑</el-button>
            <el-button size="small" class='wid90' style="margin:0 15px;" v-if="editRechargeFlag" @click="cancelRechargeFlag">取消</el-button>
            <el-button type="primary" class='wid90' size="small" @click="save" v-if="editRechargeFlag">保存</el-button>
        </div>
        <el-dialog
                title="复制提成规则"
                :visible.sync="dialogVisible"
                width="540px">
            <div class="dialogSearch">
                <el-input size="small" clearable style="width: 422px;margin-right: 15px" prefix-icon="el-icon-search" placeholder="搜索导购关键字"></el-input>
                <el-button type="primary" size="small" style="width: 60px">搜索</el-button>
            </div>
            <div class="dialogCheckbox">
                <el-checkbox-group v-model="checkedNames" @change="handleCheckedNamesChange">
                    <el-checkbox v-for="name in staffNames" :label="name" :key="name">{{name}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-checkbox style="float: left" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <el-button class="wid90" @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button class="wid90" type="primary" @click="dialogVisible = false" size="small">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import api from 'api/mall'
    export default {
        data() {
            return {
                employeeInfo: {
                    id: '',
                    name: '',
                    code: ''
                },
                editRechargeFlag: false,
                promoteObj1: {
                    type: ''
                },
                promoteObj3: {
                    type: ''
                },
                tableData1: [],
                tableData5: [],
                tableData3: [],
                tableDataCopy5: [],
                tableData: [{
                    purchaseOrderNo: 'wwbtest'
                }],
                serveItem: '2',
                options: [],
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
                multipleSelection2: [],
                multipleSelection3: [],
                multipleSelection4: [],
                dialogVisible: false,
                checkedNames: [],  // 复制提成设置姓名
                staffNames: ["张三(1001)", "李四(1002)", "王五(1003)", "赵六(1004)"],
                isIndeterminate: false,
                checkAll: false
            }
        },
        computed: {},
        created() {},
        activated() {
            this.employeeInfo.id = this.$route.query.id
            this.employeeInfo.code = this.$route.query.code
            this.employeeInfo.name = this.$route.query.name
            this.getTableList1()
            this.getTableList5()
            this.getTableList3()
        },
        methods: {
            // 获取表格数据
            getTableList1() {
                // 商品分类提成列表
                api.getPromoteCateList({userId: this.employeeInfo.id, pageSize: 999}).then((res) => {
                    this.tableData1 = res.data.listData
                })
            },
            getTableList5(){
                // 充值提成列表
                api.getPrompteCharList({userId: this.employeeInfo.id, pageSize: 999}).then((res) => {
                    this.tableData5 = res.data.listData
                    this.tableDataCopy5 = JSON.parse(JSON.stringify(res.data.listData))
                })
            },
            getTableList3(){
                // 次卡提成列表
                api.getCountCardList({userId: this.employeeInfo.id, pageSize: 999}).then((res) => {
                    this.tableData3 = res.data.listData
                })
            },
            // 设置特殊商品
            editGuide(data) {
                this.$router.push({
                    path: '/setGoods',
                    query: {
                        id: data.categoryId,
                        userId: this.employeeInfo.id
                    }
                })
            },
            // 新增特殊商品
            setGoods() {
                this.$router.push({
                    path: '/setGoods',
                    query: {
                        userId: this.employeeInfo.id
                    }
                })
            },
            // 余额充值编辑
            editRecharge() {
                this.editRechargeFlag = true
            },
            // 取消编辑  将空选项清空
            cancelRechargeFlag() {
                for (let i = this.tableData5.length - 1; i >= 0 ; i--) {
                    if (!this.tableData5[i].id) {
                        this.tableData5.splice(i, 1)
                    }
                }
                this.editRechargeFlag = false
            },
            // 新增余额充值
            addRecharge() {
                this.tableData5.push({
                    endRange: null,
                    promote: null,
                    startRange: this.tableData5[this.tableData5.length -1].endRange + 1,
                    type: null,
                    userId: this.employeeInfo.id,
                })
            },
            // 删除余额充值
            delRecharge(index) {
                this.tableData5.splice(index, 1)
            },
            // tab 切换
            handleClick() {

            },
            // 判断区间不重叠函数
            hasOverlap(arr1, arr2) { // max(A.start,B.start)<=min(A.end,B.end)，即重复
                let startArr = [arr1.startRange, arr2.startRange]
                let endArr = [arr1.endRange, arr2.endRange]
                if(Math.max.apply(null, startArr)<= Math.min.apply(null, endArr)){
                    return true // 有重复
                } else {
                    return false
                }
            },
            // 判断两个对象是否相同
            objEqual(obj1, obj2) {
                let flag = true
                for (let key in obj1) {
                    if (obj1[key] !== obj2[key]) {
                        flag = false
                    }
                }
                return flag
            },
            handleSelectionChange1(val) {
                this.multipleSelection1 = val
            },
            handleSelectionChange2(val) {
                this.multipleSelection2 = val
            },
            handleSelectionChange3(val) {
                this.multipleSelection3 = val
            },
            handleSelectionChange4(val) {
                this.multipleSelection4 = val
            },
            // 服务提成切换
            serveChange() {

            },
            // 复制提成
            copyCommission() {
                this.dialogVisible = true
            },
            // 选择员工
            handleCheckedNamesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.staffNames.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.staffNames.length;
            },
            handleCheckAllChange(val) {
                this.checkedNames = val ? this.staffNames : []
                this.isIndeterminate = false
            },
            // 保存设置
            save() {
                if (this.activeName == 1) {
                    // 商品提成
                    let post = {
                        categoryList: [],
                        userId: this.employeeInfo.id
                    }
                    this.multipleSelection1.forEach((obj) => {
                        this.promoteObj1.id = obj.id
                        this.promoteObj1.categoryId = obj.categoryId
                        post.categoryList.push(this.promoteObj1)
                        this.$set(obj, 'otherPromote', this.promoteObj1.otherPromote)
                        this.$set(obj, 'vipPromote', this.promoteObj1.vipPromote)
                    })
                    api.editPromoteList(post).then((res) => {
                        this.$message.success({
                            message: '修改成功！'
                        })
                        this.getTableList1()
                    })
                } else if (this.activeName == 5) {
                    // 区间判断去空
                    for (let i = 0; i < this.tableData5.length; i++) {
                        for (let j = i + 1; j < this.tableData5.length; j++) {
                            if (this.hasOverlap(this.tableData5[i], this.tableData5[j])) {
                                this.$message.warning({
                                    message: '区间有重复，请重新输入！'
                                })
                                return
                            }
                        }
                    }
                    // 余额充值提成,判空限制
                    let errNum = 0
                    try {
                        this.tableData5.forEach((obj) => {
                            if (obj.startRange > obj.endRange) {
                                errNum++
                                throw new Error("开始区间要小于结束区间!");
                            }
                            if (obj.type === null) {
                                errNum++
                                throw new Error("请选择提成方式!");
                            }
                        })
                    } catch (e) {
                        this.$message.warning({
                            message: e.message
                        })
                    }
                    if (errNum == 0) {
                        this.tableData5.forEach((obj, index) => {
                            if (!obj.id) { // 新增的
                                api.addPrompteChar(obj).then((res) => {
                                    this.$message.success({
                                        message: '新增成功！'
                                    })
                                    this.editRechargeFlag = false
                                    this.getTableList5()
                                })
                            } else {
                                if (this.tableDataCopy5[index] && !this.objEqual(this.tableDataCopy5[index], obj)) {
                                    api.editPrompteChar(obj).then((res) => {
                                        this.$message.success({
                                            message: '编辑成功！'
                                        })
                                        this.editRechargeFlag = false
                                        this.getTableList5()
                                    })
                                }
                            }
                        })
                    }
                } else if (this.activeName == 3) { // 次卡提成
                    let post = {
                        userId: this.employeeInfo.id,
                        countCardList: []
                    }
                    this.multipleSelection3.forEach((obj) => {
                        this.promoteObj3.id = obj.id
                        this.promoteObj3.countCardId = obj.countCardId
                        post.countCardList.push(this.promoteObj3)
                        this.$set(obj, 'promote', this.promoteObj3.promote)
                    })
                    api.updateCountCard(post).then((res) => {
                        if (res.result == 1) {
                            this.$message.success({
                                message: '修改成功！'
                            })
                            this.getTableList3()
                            delete this.promoteObj3.promote
                            this.promoteObj3.type = ''
                        }
                    })
                }
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
<style>
    .transfer .el-tabs__item{
        color: #606266;
        line-height: 50px;
        height: 50px;
    }
    .transfer .el-radio-button .el-radio-button__inner {
        border: 1px solid #dcdfe6;
        border-radius: 5px;
        margin-right: 10px;
        box-sizing: border-box;
    }
    .transfer .el-radio-button.is-active .el-radio-button__inner{
        border: 1px solid #409EFF;
    }
    .transfer .el-tabs__nav-wrap{
        padding-left: 20px;
    }
    .transfer .dialogCheckbox{
        height: 373px;
        border: 1px solid #dcdfe6;
        margin: 15px 0 0 0;
    }
    .transfer .dialogCheckbox .el-checkbox{
        margin-right: 0;
        display: block;
        line-height: 49px;
        border-bottom: 1px solid #dcdfe6;
        padding: 0 15px;
    }
</style>