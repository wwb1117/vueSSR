<template>
    <div class="newSupplier">
        <div class="model_topcol">
            <span class="font600">供应商</span>-<span v-if="editFlag">编辑供应商</span><span v-else>新增供应商</span>
        </div>
        <div class="model_content">
            <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
                <el-form :model="formLabelAlign" :rules="rules" ref="ruleForm" class="demoForm" label-width="122px">
                    <div class="title">
                        基本信息
                    </div>
                    <el-form-item style="margin-left:-122px">
                        <div style="display:flex">
                            <el-form-item label="供应商编号" prop='supplierCode'>
                                <el-input size="small" readonly placeholder="请点击生成供应商编号" v-model="formLabelAlign.supplierCode"></el-input>
                            </el-form-item>
                            <span style="margin-left:10px;">
                                <el-button type="primary" size="small" @click='addCode()' v-if='this.showNum == 0'>生成</el-button>
                                <el-tooltip v-if='this.showNum == 1' class="item" effect="light" content="编号是供应商信息的唯一标识，由不超过6位的数字、字母、下划线组成。
                                    连锁店之间相同的编号，系统识别为同一个供应商。"
                                    placement="bottom">
                                    <i class='el-icon-warning' style="font-size:16px" v-if='this.showNum == 1'></i>
                                </el-tooltip>
                            </span>
                        </div>
                    </el-form-item>
                    <el-form-item style="margin-left:-122px" prop="supplierName">
                        <div style="display:flex">
                            <el-form-item label="供应商名称" prop='supplierName'>
                                <el-input @blur="judgeSupplier" size="small" placeholder="请输入供应商名称" v-model="formLabelAlign.supplierName"></el-input>
                            </el-form-item>
                            <el-form-item label="联系人">
                                <el-input size="small" placeholder="请输入联系人" v-model="formLabelAlign.contactName"></el-input>
                            </el-form-item>
                        </div>
                    </el-form-item>
                    <el-form-item style="margin-left:-122px">
                        <div style="display:flex">
                            <el-form-item label="法定代表人">
                                <el-input size="small" placeholder="请输入法定代表人" v-model="formLabelAlign.legalName"></el-input>
                            </el-form-item>
                            <el-form-item label="联系人手机" prop="contactTel">
                                <el-input size="small" placeholder="请输入联系人手机" @keyup.native="formateNumber1($event, formLabelAlign.contactTel)" v-model="formLabelAlign.contactTel"></el-input>
                            </el-form-item>
                        </div>
                    </el-form-item>
                    <el-form-item style="margin-left:-122px">
                        <div style="display:flex">
                            <el-form-item label="座机">
                                <el-input size="small" placeholder="请输入座机号" @keyup.native="formateNumber1($event, formLabelAlign.landlineNumber)" v-model="formLabelAlign.landlineNumber"></el-input>
                            </el-form-item>
                            <el-form-item label="结算方式">
                                <el-select placeholder="请选择" v-model="formLabelAlign.settleType" size="small" style="width:360px">
                                    <el-option key="1" label="现结" :value="1">
                                    </el-option>
                                    <el-option key="2" label="月结" :value="2">
                                    </el-option>
                                    <el-option key="3" label="季结" :value="3">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-form-item>
                    <el-form-item style="margin-left:-122px">
                        <div style="display:flex">
                            <el-form-item label="邮箱">
                                <el-input size="small" placeholder="请输入联系邮箱" v-model="formLabelAlign.contactEmail"></el-input>
                            </el-form-item>
                            <el-form-item label="地址">
                                <el-input size="small" placeholder="请输入地址" v-model="formLabelAlign.contactAddr"></el-input>
                            </el-form-item>
                        </div>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input style="width: 360px" v-model="formLabelAlign.remark" type="textarea"
                                  rows="4"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-switch
                                :active-value="1"
                                :inactive-value="0"
                                v-model="formLabelAlign.enableStatus">
                        </el-switch>
                    </el-form-item>
                    <div class="title">
                        期初款项设置
                    </div>
                    <el-form-item style="margin-left:-122px">
                        <div style="display:flex">
                            <el-form-item label="期初应付款">
                                <el-input size="small" placeholder="请输入期初应付款" v-model="formLabelAlign.shouldPay"></el-input>
                            </el-form-item>
                            <el-form-item label="期初预付款">
                                <el-input size="small" placeholder="请输入期初预付款" v-model="formLabelAlign.advancePay"></el-input>
                            </el-form-item>
                        </div>
                    </el-form-item>
                    <div class="title">
                        银行账号信息
                    </div>
                    <el-form-item label="开户银行">
                        <el-input size="small" v-model="formLabelAlign.bankName"></el-input>
                    </el-form-item>
                    <el-form-item label="银行账户">
                        <el-input size="small" v-model="formLabelAlign.bankAccount" @keyup.native="formateNumber($event)"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="model_footer">
            <el-button size="small" @click="goBackEvent" style="width: 90px; margin-left: 25px;">返回</el-button>
            <el-button type="primary" v-perss='98' size="small" style="width: 90px; margin-left: 25px;" v-if="shopType == 0" @click="addsupplier('ruleForm')">保存</el-button>
        </div>
    </div>
</template>

<script>
    import mqn from 'utils/mqn'
    import api from 'api/good'
    import base from 'utils/base'
    export default {
        data() {
            return {
                showNum: 0,
                totalPage: 10,
                tableParam: {
                    pageNo: 1,
                    pageSize: 15
                },
                rules: {
                    supplierName: [{
                        required: true,
                        message: '请输入供应商名称',
                        trigger: 'blur'
                    }],
                    supplierCode: [{
                        required: true,
                        message: '请输入供应商编码',
                        trigger: 'blur'
                    }]
                },
                formLabelAlign: {
					supplierName: '',
					supplierCode: '',
                    contactTel: '',
                    bankAccount: '',
                    bankName: '',
                    settleType: ''
				},
                supplierList: [],
                supplierNames: [],
                editFlag: false,
                editSupplierName: '',
                shopType: 0
            }
        },
        computed: {},
        methods: {
            // 验证手机号格式
            judgeTel() {
                if(this.formLabelAlign.contactTel) {
                    return mqn.data.validator.tel(this.formLabelAlign.contactTel)
                } else {
                    return true
                }
            },
            // 过滤掉非数字
            formateNumber1(e, parmary) {
                parmary = this.base.formatIntNum(e.target.value)
            },
            // 判断供应商不重复
            judgeSupplier() {
                if (this.supplierNames.indexOf(this.formLabelAlign.supplierName) >= 0 && this.formLabelAlign.supplierName != this.editSupplierName) {
                    this.$message.warning({
                        message: '供应商名字不能重复，请重新输入！'
                    })
                    this.formLabelAlign.supplierName = ''
                    return
                }
            },
            //生产编码
            addCode() {
                api.newCode().then((res) => {
                    this.$set(this.formLabelAlign, 'supplierCode', res.data)
                    this.showNum = 1
                })
            },
            getSupplierDetail() {
                api.getSupplierDetail(this.$route.query.id).then((res) => {
                    this.$set(this.$data, 'formLabelAlign', res.data)
                    if(this.formLabelAlign.settleType == 0) {
                        this.formLabelAlign.settleType = ''
                    }
                    this.editSupplierName = res.data.supplierName
                })
            },
            getSupplierList() {
                api.getSupplierList({pageNo: 1,pageSize: 999}).then((res) => {
                    this.$set(this.$data, 'supplierList', res.data.listData)
                    this.supplierList.forEach((item) => {
                        this.supplierNames.push(item.supplierName)
                    })
                })
            },
            //添加
            addsupplier(formName) {
                // 验证数据格式
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.editFlag) {
                            // 编辑
                            api.editSupplier(this.formLabelAlign).then((res) => {
                                this.$message({
                                    type: 'success',
                                    duration: 1500,
                                    showClose: true,
                                    message: '编辑成功！'
                                })
                                this.goBackEvent()
                            })
                        } else {
                            this.judgeSupplier()
                            // 新增
                            api.addSupplier(this.formLabelAlign).then((res) => {
                                this.$message({
                                    type: 'success',
                                    duration: 1500,
                                    showClose: true,
                                    message: '添加成功！'
                                })
                                this.goBackEvent()
                            })
                        }
                    } else {
                        return
                    }
                });
            },
            // 银行账号分割
            formateNumber(e) {
                this.formLabelAlign.bankAccount = base.formatBlankNumber(e.target.value)
            },
            goBackEvent() {
                this.showNum = 0
                this.$router.push({
                    path: '/supplier'
                })
			}
        },
        created() {},
        activated() {
            this.showNum = 0
            this.getSupplierList()
			this.$refs.ruleForm.resetFields()
            this.shopType = this.$store.state.home.currentShop.shopType
            if (this.$route.query.id) {
                this.editFlag = true
                this.getSupplierDetail()
            } else {
                this.editFlag = false
            }
        },
        mounted() {
            this.$refs.ruleForm.resetFields()
        }
    }
</script>
<style scoped lang="scss">
    .newSupplier {
        .demoForm {
            .title {
                height: 40px;
                line-height: 40px;
                padding-left: 16px;
                background: #f5f5f5;
                font-weight: bold;
                margin-bottom: 22px;
            }

            .el-input {
                width: 360px;
            }
        }

        .model_footer {

            // margin-left: 24px;
            .el-button {
                width: 90px;
            }
        }
    }
</style>