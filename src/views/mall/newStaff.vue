<template>
    <div>
        <div class="model_topcol">
            <span v-if="!editFlag">员工列表 - 新增员工</span>
            <span v-else>员工列表 - 编辑员工</span>
        </div>
        <div class="model_content">
            <div class="model_content_inner"
                 :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
                <div class='second_header'>基本信息</div>
                <el-form :label-position="labelPosition" size="small" :rules="rules" ref="ruleForm" :model="formData" class="" label-width="100px">
                    <div class='second_inner'>
                        <el-form-item label="所属店铺" prop="shopId">
                            <el-select style="width: 350px" v-model="formData.shopId" placeholder="请选择店铺" @change="chooseShop">
                                <el-option v-for="item in mallList" :key="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="工号" prop="employeeCode">
                            <el-input style="width: 350px" v-model="formData.employeeCode"
                                      placeholder="请输入工号"></el-input>
                        </el-form-item>
                        <el-form-item label="姓名" prop="employeeName">
                            <el-input style="width: 350px" v-model="formData.employeeName"
                                      placeholder="请输入姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="员工手机" prop="cellPhone">
                            <el-input style="width: 350px" v-model="formData.cellPhone"
                                      placeholder="请输入员工手机"></el-input>
                        </el-form-item>
                        <el-form-item label="所属角色" prop="roleId">
                            <el-select style="width: 350px" v-model="formData.roleId" placeholder="收银员" @change="changeRole">
                                <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                            <el-button v-if="roleList.length == 0" icon="el-icon-plus" size="small" type="text"
                                       style="margin-left:10px" @click='addRole()'>新增角色
                            </el-button>
                        </el-form-item>
                        <el-form-item label="备注" prop="remark">
                            <el-input style="width: 350px" v-model="formData.remark" type="textarea"
                                      rows="4"></el-input>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-switch
                                    :active-value="1"
                                    :inactive-value="0"
                                    v-model="formData.enableStatus">
                            </el-switch>
                        </el-form-item>
                    </div>
                    <div class='second_header'>登录密码信息</div>
                    <div class='second_inner'>
                        <el-form-item label="密码" prop="password">
                            <el-input type="password" style="width: 350px" v-model="formData.password"
                                      placeholder="请输入密码"></el-input>
                            <div><i class="el-icon el-icon-warning" style="color: #F6B459;margin-right: 3px"></i><span
                                    style="font-size: 14px;color: #909399;">请输入至少六位数字</span></div>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="password2">
                            <el-input type="password" style="width: 350px" v-model="formData.password2"
                                      placeholder="请再次输入密码"></el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="model_footer">
            <el-button size="small" class='wid90' style="margin:0 15px;" v-RouterBack>取消</el-button>
            <el-button type="primary" class='wid90' size="small" @click='addMember()'>保存</el-button>
        </div>
    </div>
</template>

<script>
    import mqn from 'utils/mqn'
    import api from 'api/mall'
    export default {
        data() {
            return {
                editFlag: false,
                activeName: 'first',
                checked: '1',
                open: true,
                value1: '',
                value: '',
                flag: true,
                labelPosition: 'right',
                formData: {
                    shopId: '',
                    employeeCode: '',
                    employeeName: '',
                    cellPhone: '',
                    roleId: '',
                    password: '',
                    password2: '',
                    enableStatus: 1,
                    isGuide: 0,
                    remark: ''
                },
                mallList: [],
                roleList: [],
                rules: {
                    shopId: [
                        {required: true, message: '请选择店铺', trigger: 'blur'}
                    ],
                    employeeCode: [
                        {required: true, message: '请输入工号', trigger: 'blur'},
                        {message: '请输入正确工号', validator: mqn.data.validator.num, trigger: 'blur' }
                    ],
                    employeeName: [
                        {required: true, message: '请输入员工姓名', trigger: 'blur'},
                    ],
                    cellPhone: [
                        {required: true, message: '请输入员工手机', trigger: 'blur'},
                        {message: '请输入正确手机号', validator: mqn.data.validator.tel, trigger: 'blur' }
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, message: '密码至少为六位', trigger: 'blur'}
                    ],
                    password2: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                    roleId: [
                        {required: true, message: '请选择角色', trigger: 'blur'}
                    ]
                },
                postData: {}
            }
        },
        computed: {},
        methods: {
            addRole() {
                this.$router.push({
                    path: '/newRole'
                })
            },
            // 根据角色判断是否密码必填
            changeRole() {
                if (this.formData.roleId === 4) {
                    this.rules.password = [
                        {required: false, trigger: 'blur'}
                    ]
                    this.rules.password2 = [
                        {required: false, trigger: 'blur'}
                    ]
                } else {
                    this.rules.password = [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, message: '密码至少为六位', trigger: 'blur'}
                    ]
                    this.rules.password2 = [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                }
            },
            addMember() {
                // 判断密码是否相等
                if(!this.editFlag && this.formData.password.length < 6) {
                    this.$message.error({
                        message: '密码不少于六位数字！'
                    })
                    return
                }
                if (this.editFlag) {
                    if (this.formData.password && this.formData.password.length > 0 && this.formData.password.length < 6) {
                        this.$message.error({
                            message: '密码不少于六位数字！'
                        })
                        return
                    }
                }
                if (this.formData.password !== this.formData.password2) {
                   this.$message.error({
                       message: '密码不一致，请重试！'
                   })
                    return
                }
                // 判断是否为导购
                this.postData = JSON.parse(JSON.stringify(this.formData))
                if(this.formData.roleId === 4) {
                    this.postData.isGuide = 1
                    delete this.postData.password
                } else {
                    this.postData.isGuide = 0
                }
                delete this.postData.password2
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        if (this.$route.query.id) {
                            if (!this.postData.password) {
                                delete this.postData.password
                            }
                            api.editStaff(this.postData).then((res) => {
                                this.$message.success({
                                    message: '编辑成功！'
                                })
                                this.$router.push({
                                    path: '/staffList'
                                })
                            })
                        } else {
                            api.addStaff(this.postData).then((res) => {
                                this.$message.success({
                                    message: '新增成功！'
                                })
                                this.$router.push({
                                    path: '/staffList'
                                })
                            })
                        }
                    } else {
                        return false
                    }
                })

            },
            close() {
                this.$router.push({
                    path: '/staffList'
                })
            },
            getDetail() {
                api.getStaffDetail(this.$route.query.id).then((res) => {
                    this.formData = res.data
                    this.chooseShop()
                })
            },
            chooseShop() {
                api.getRoleByShop({shopId: this.formData.shopId}).then((res) => {
                    this.roleList = res.data
                })
            }
        },
        created() {
        },
        activated() {
            this.$refs.ruleForm.resetFields()
            this.mallList = this.$store.state.home.shopList
            // this.roleList = this.$store.state.home.roleList
            if (this.$route.query.id) {
                this.editFlag = true
                this.getDetail()
                this.rules.password = [
                    {required: false, trigger: 'blur'}
                ]
                this.rules.password2 = [
                    {required: false, trigger: 'blur'}
                ]
            } else {
                this.editFlag = false
                this.rules.password = [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                    {min: 6, message: '密码至少为六位', trigger: 'blur'}
                ]
                this.rules.password2 = [
                    {required: true, message: '请输入密码', trigger: 'blur'}
                ]
            }
        },
        mounted() {
        }
    }
</script>
<style lang='scss' scoped>
    .header_seach_wrap > div {
        margin-right: 10px;
    }

    .second_header {
        padding: 10px 20px;
        background: #F5F5F5;
        font-weight: 700;
    }

    .second_inner {
        padding: 20px 0 20px 40px;
    }
</style>