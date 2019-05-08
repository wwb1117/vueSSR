<template>
    <div>
        <div class="model_topcol">
            <span>导购技师 - 基本信息</span>
        </div>
        <div class="model_content">
            <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
                <div class='second_header'>基本信息</div>
                <div class='second_inner'>
                    <el-form :label-position="labelPosition" size="small" :model="formData" :rules="rules" ref="ruleForm" class="" label-width="100px">
                        <el-form-item label="所属店铺" prop="shopId">
                            <el-select style="width: 350px" v-model="formData.shopId" placeholder="请选择店铺">
                                <el-option v-for="item in mallList" :key="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="工号" prop="employeeCode">
                            <el-input style="width: 350px" v-model="formData.employeeCode" placeholder="请输入工号"></el-input>
                        </el-form-item>
                        <el-form-item label="姓名" prop="employeeName">
                            <el-input style="width: 350px" v-model="formData.employeeName" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="员工手机" prop="cellPhone">
                            <el-input style="width: 350px" v-model="formData.cellPhone" placeholder="请输入员工手机"></el-input>
                        </el-form-item>
                        <el-form-item label="备注" prop="remark">
                            <el-input style="width: 350px" v-model="formData.remark" type="textarea" rows="4"></el-input>
                        </el-form-item>
                        <el-form-item label="状态" prop="enableStatus">
                            <el-switch
                                    :active-value="1"
                                    :inactive-value="0"
                                    v-model="formData.enableStatus">
                            </el-switch>
                        </el-form-item>
                    </el-form>
                </div>
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
                activeName: 'first',
                checked:'1',
                labelPosition: 'right',
                formData: {
                    shopId: '',
                    employeeCode: '',
                    employeeName: '',
                    cellPhone: '',
                    roleId: 4,
                    enableStatus: 1,
                    isGuide: 1,
                    remark: ''
                },
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
                    ]
                },
                postData: {},
                mallList: []
            }
        },
        computed: {},
        methods: {
            addMember() {
                this.postData = JSON.parse(JSON.stringify(this.formData))
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        if (this.$route.query.id) {
                            api.editStaff(this.postData).then((res) => {
                                this.$message.success({
                                    message: '编辑成功！'
                                })
                                this.$router.push({
                                    path: '/technicalList'
                                })
                            })
                        } else {
                            api.addStaff(this.postData).then((res) => {
                                this.$message.success({
                                    message: '新增成功！'
                                })
                                this.$router.push({
                                    path: '/technicalList'
                                })
                            })
                        }
                    } else {
                        return false
                    }
                })
            },
            getDetail() {
                api.getStaffDetail(this.$route.query.id).then((res) => {
                    this.formData = res.data
                    console.log(res.data)
                })
            }
        },
        created() {},
        activated() {
            this.$refs.ruleForm.resetFields()
            this.mallList = this.$store.state.home.shopList
            if (this.$route.query.id) {
                this.getDetail()
            }
        },
        mounted() {}
    }
</script>
<style lang='scss' scoped>
    .header_seach_wrap>div {
        margin-right: 10px;
    }
    .second_header{
        padding: 10px 20px;
        background: #F5F5F5;
        font-weight: 700;
    }
    .second_inner{
        padding: 20px 0 20px 40px;
    }
</style>