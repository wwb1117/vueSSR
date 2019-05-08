<template>
    <div>
        <div class="model_topcol">
            <span>店铺信息</span>
        </div>
        <div class="model_content">
            <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
                <div class="header_title">
                    <div style="width: 150px; height: 100%; float: left; text-align: center; line-height: 147px">
						<img src="../../../public/img/setting/mall.png" alt="店铺">
                    </div>
                    <div style="width: 800px; height: 100%; float: left; padding-top: 20px;">
                        <div>
                            <h3>{{shopInfo.shopName}}</h3>
                        </div>
                        <div>
                            <span class="marginR10">注册时间</span><span class="marginR40">{{shopInfo.created | time_m}}</span>
                            <span class="marginR10">过期时间</span><span class="marginR40">{{shopInfo.expireTime | time_m}}</span>
                            <span class="marginR10">授权</span>
                            <el-tag type="success" v-if="shopInfo.shopStatus == 2 || shopInfo.shopStatus == 4">专业版</el-tag>
                            <el-tag v-else type="warning">试用版</el-tag>
                        </div>
                    </div>
                </div>
                <div class="base_setting">
                    <div class="banner">
                        基本设置
                    </div>
                    <div>
                        <el-row style="height: 57px; line-height: 57px; margin-top: 10px">
                            <el-col style="text-align: right; padding-right: 10px" :span="2">登录密码</el-col>
                            <el-col :span="18" style="border-bottom: 1px dashed #e4e8eb;">
                                <span class="color_gray">6-32位字符组成</span>
                            </el-col>
                            <el-col :span="3" style="border-bottom: 1px dashed #e4e8eb; text-align: right;">
                                <el-button v-perss='175' @click="editEvent(1)" style="width: 90px;" type="primary" size="small">编辑</el-button>
                            </el-col>
                        </el-row>
                        <el-row style="height: 57px; line-height: 57px;">
                            <el-col style="text-align: right; padding-right: 10px" :span="2">手机号</el-col>
                            <el-col :span="18" style="border-bottom: 1px dashed #e4e8eb;">
                                <span class="color_gray">找回密码等主要操作需要手机验证</span>
                            </el-col>
                            <el-col :span="3" style="border-bottom: 1px dashed #e4e8eb; text-align: right;">
                                <el-button v-perss='175' @click="editEvent(2)" style="width: 90px; visibility:hidden;" type="primary" size="small">编辑</el-button>
                            </el-col>
                        </el-row>
                        <el-row style="height: 57px; line-height: 57px;">
                            <el-col style="text-align: right; padding-right: 10px" :span="2">所属行业</el-col>
                            <el-col :span="21" style="border-bottom: 1px dashed #e4e8eb;">
                                <span class="color_gray">母婴行业</span>
                            </el-col>
                        </el-row>
                        <el-row style="height: 57px; line-height: 57px;">
                            <el-col style="text-align: right; padding-right: 10px" :span="2">联系地址</el-col>
                            <el-col :span="18" style="border-bottom: 1px dashed #e4e8eb;">
                                <span class="color_gray">填写准确地址，有助于门店推广</span>
                            </el-col>
                            <el-col :span="3" style="border-bottom: 1px dashed #e4e8eb; text-align: right;">
                                <el-button @click="editEvent(3)" style="width: 90px; visibility:hidden;" type="primary" size="small">编辑</el-button>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <div style="margin-top: 50px;">
                    <div class="banner" style="margin-bottom: 30px">
                        其他信息
                    </div>
                    <el-form :inline="true" :model="formParam" label-position="right" size="small" label-width="90px">
                        <el-form-item label="开户名称">
                            <el-input style="width: 294px;" v-model="formParam.bankAccount" placeholder="请输入开户名称"></el-input>
                        </el-form-item>
                        <el-form-item label="开户银行">
                            <el-input style="width: 294px;" v-model="formParam.bankName" placeholder="请输入开户银行"></el-input>
                        </el-form-item>
                        <el-form-item label="银行账号">
                            <el-input @change.native="blankNumber()" @keyup.native="blankNumber()" style="width: 294px;" v-model="formParam.bankCardNo" placeholder="请输入银行账号"></el-input>
                        </el-form-item><br>
                        <el-form-item required label="上传图片">
                            <div style="display: inline-block; margin-right: 20px;">
                                <el-upload :disabled="true" :action="uploadURL" ref="imgLicenseUpload" :data="sendData" :show-file-list="false" list-type="picture-card" :on-success="handleAvatarSuccess1" :before-upload="beforeAvatarUpload">
                                    <img style="width: 140px; height: 140px;" v-if="formParam.imgOutside" :src="formParam.imgOutside" class="avatar">
                                    <i v-if="!formParam.imgOutside" class="el-icon-plus"></i>
                                </el-upload>
                                <div style="text-align: center;">商家门头照</div>
                            </div>
                            <div style="display: inline-block; margin-right: 20px;">
                                <el-upload :disabled="true" :action="uploadURL" ref="imgLicenseUpload" :data="sendData" :show-file-list="false" list-type="picture-card" :on-success="handleAvatarSuccess2" :before-upload="beforeAvatarUpload">
                                    <img style="width: 140px; height: 140px;" v-if="formParam.imgLicense" :src="formParam.imgLicense" class="avatar">
                                    <i v-if="!formParam.imgLicense" class="el-icon-plus"></i>
                                </el-upload>
                                <div style="text-align: center;">营业执照</div>
                            </div>
                            <div style="display: inline-block; margin-right: 20px;">
                                <el-upload :disabled="true" :action="uploadURL" ref="imgLicenseUpload" :data="sendData" :show-file-list="false" list-type="picture-card" :on-success="handleAvatarSuccess3" :before-upload="beforeAvatarUpload">
                                    <img style="width: 140px; height: 140px;" v-if="formParam.imgIdcardA" :src="formParam.imgIdcardA" class="avatar">
                                    <i v-if="!formParam.imgIdcardA" class="el-icon-plus"></i>
                                </el-upload>
                                <div style="text-align: center;">法人身份证(正)</div>
                            </div>
                            <div style="display: inline-block; margin-right: 20px;">
                                <el-upload :disabled="true" :action="uploadURL" ref="imgLicenseUpload" :data="sendData" :show-file-list="false" list-type="picture-card" :on-success="handleAvatarSuccess4" :before-upload="beforeAvatarUpload">
                                    <img style="width: 140px; height: 140px;" v-if="formParam.imgIdcardB" :src="formParam.imgIdcardB" class="avatar">
                                    <i v-if="!formParam.imgIdcardB" class="el-icon-plus"></i>
                                </el-upload>
                                <div style="text-align: center;">法人身份证(反)</div>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>

            </div>
        </div>
        <div class="model_footer">
            <el-button v-perss='175' @click="mallOtherInfoSaveEvent" type="primary" size="small" style="width: 90px; margin-left: 25px;">保存</el-button>
        </div>

        <el-dialog title="重置登录密码" :close-on-click-modal="false" :visible.sync="passwordDialogVisible" width="550px">
            <el-form ref="passWordForm" class="myForm" :inline="true" :model="passWordForm" :rules="passWordFormRules" label-position="right" size="small" label-width="90px">
                <el-form-item prop="originPassword" label="原密码">
                    <el-input type="password" v-model="passWordForm.originPassword" placeholder="请输入原密码"></el-input>
                </el-form-item>
                <br>
                <el-form-item prop="newPassword" label="新密码">
                    <el-input type="password" v-model="passWordForm.newPassword" placeholder="请输入新密码"></el-input>
                </el-form-item>
                <br>
                <el-form-item prop="comfimPass" label="确认密码">
                    <el-input type="password" v-model="passWordForm.comfimPass" placeholder="请输入确认密码"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button class="wid90" size="small" @click="passwordDialogVisible = false">取 消</el-button>
                <el-button class="wid90" size="small" type="primary" @click="editMallPassWordEvent">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="绑定新手机号" :close-on-click-modal="false" @closed="phoneDialogCloseEvent" :visible.sync="phoneDialogVisible" width="600px">
            <div style="margin-bottom: 35px; padding: 0 60px;">
                <el-steps :active="stepActive">
                    <el-step title="验证身份"></el-step>
                    <el-step title="绑定新手机号"></el-step>
                    <el-step title="完成"></el-step>
                </el-steps>
            </div>
            <el-form v-if="stepActive <= 1" ref="phoneForm" class="myForm" :inline="true" :model="phoneForm" :rules="phoneFormRules" label-position="right" size="small" label-width="165px">
                <el-form-item prop="confimPassword" label="账户密码验证">
                    <el-input v-model="passWordForm.confimPassword" placeholder="请输入账户密码进行验证"></el-input>
                </el-form-item>
            </el-form>
            <el-form v-if="stepActive > 1" ref="phoneForm" class="myForm" :inline="true" :model="phoneForm" :rules="phoneFormRules" label-position="right" size="small" label-width="165px">
                <el-form-item prop="newPhone" label="新手机号">
                    <el-input v-model="passWordForm.newPhone" placeholder="请输入新手机号"></el-input>
                    <el-tag class="myCur" style="float: right; margin-top: -31px; margin-left: 15px; position: relative; z-index: 99999">获取验证码</el-tag>
                </el-form-item>
                <el-form-item prop="checkedCode" label="验证码">
                    <el-input v-model="passWordForm.checkedCode" placeholder="请输入验证码"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="phoneFormNext" v-if="stepActive <= 1" class="wid90" size="small">下一步</el-button>
                <el-button @click="phoneFormComit" v-if="stepActive  == 2" class="wid90" size="small" type="primary">提交</el-button>
            </span>
        </el-dialog>

        <el-dialog title="重置联系地址" :close-on-click-modal="false" :visible.sync="addressDialogVisible" width="550px">
            <el-form ref="addressForm" class="myForm" :inline="true" :model="addressForm" :rules="addressFormRules" label-position="right" size="small" label-width="90px">
                <el-form-item prop="address" label="联系地址">
                    <el-input style="width: 390px" type="textarea" :rows="4" v-model="passWordForm.address" placeholder="请输入联系地址"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button class="wid90" size="small" @click="addressDialogVisible = false">取 消</el-button>
                <el-button class="wid90" size="small" type="primary" @click="addressDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import api from 'api/setting'
export default {
    data () {
		var validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入确认密码'));
			} else if (value !== this.passWordForm.newPassword) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
        return {
            totalPage: 10,
            stepActive: 1,
            passwordDialogVisible: false,
            phoneDialogVisible: false,
            addressDialogVisible: false,
            formParam: {
                imgLicense: '',
                imgOutside: '',
                imgIdcardA: '',
                imgIdcardB: '',
                bankName: '',
                bankCardNo: '',
                bankAccount: ''
            },
            passWordForm: {
                originPassword: '',
                newPassword: '',
                comfimPass: ''
            },
            phoneForm: {
                confimPassword: '',
                newPhone: '',
                checkedCode: ''
            },
            addressForm: {
                address: ''
            },
            phoneFormRules: {
                confimPassword: [
                    { required: true, message: '请输入账户密码', trigger: 'blur' }
                ],
                newPhone: [
                    { required: true, message: '请输入新手机号', trigger: 'blur' }
                ],
                checkedCode: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ]
            },
            addressFormRules: {
                address: [
                    { required: true, message: '请输入联系地址', trigger: 'blur' }
                ]
            },
            passWordFormRules: {
                originPassword: [
                    { required: true, message: '请输入原密码', trigger: 'blur' }
                ],
                newPassword: [
                    { required: true, message: '请输入新密码', trigger: 'blur' }
                ],
                comfimPass: [
					{ required: true, message: '请输入确认密码', trigger: 'blur' },
                    { validator: validatePass2, trigger: 'blur' }
                ]
            },
            uploadURL: this.$store.state.home.baseUrl + '/f/upload',
            sendData: {
                file: "",
                uploadType: 'pos-shop'
			},
			shopInfo: null
            
        }
    },
    computed: {},
    methods: {
		editMallPassWordEvent(){
			api.editMallPassWord(this.passWordForm).then((response) => {
				this.$message({
					type: 'success',
					duration: 1500,
					showClose: true,
					message: '修改密码成功！'
				})
				this.passwordDialogVisible = false
			})
		},
		mallOtherInfoSaveEvent(){
			if (this.formParam.imgLicense == '' || this.formParam.imgOutside == '' || this.formParam.imgIdcardA == '' || this.formParam.imgIdcardB == '') {
				this.$message({
					type: 'warning',
					duration: 1500,
					showClose: true,
					message: '请上传完整的图片信息！'
				})
			}
			api.editMallOtherInfo(this.formParam).then((response) => {
				this.$message({
					type: 'success',
					duration: 1500,
					showClose: true,
					message: '店铺信息修改成功！'
				})
			})
		},
		blankNumber(){
			this.formParam.bankCardNo = this.myBase.formatBlankNumber(this.formParam.bankCardNo)
		},
        handleAvatarSuccess1 (res, file) {
            this.formParam.imgOutside = res.data.url
            // this.imageUrl3 = URL.createObjectURL(file.raw);
		},  
		handleAvatarSuccess2 (res, file) {
            this.formParam.imgLicense = res.data.url
            // this.imageUrl3 = URL.createObjectURL(file.raw);
		},  
		handleAvatarSuccess3 (res, file) {
            this.formParam.imgIdcardA = res.data.url
            // this.imageUrl3 = URL.createObjectURL(file.raw);
		},
		handleAvatarSuccess4 (res, file) {
            this.formParam.imgIdcardB = res.data.url
            // this.imageUrl3 = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload () {

        },
        editEvent (type) {
            if (type == 1) {
                this.passwordDialogVisible = true
                this.$refs.passWordForm.resetFields()
            }
            if (type == 2) {
                this.phoneDialogVisible = true
                this.$refs.phoneForm.resetFields()
            }
            if (type == 3) {
                this.addressDialogVisible = true
                this.$refs.addressForm.resetFields()
            }
        },
        phoneDialogCloseEvent () {
            this.stepActive = 1
            this.$refs.phoneForm.resetFields()
        },
        phoneFormComit () {
            this.stepActive++
            setTimeout(() => {
                this.phoneDialogVisible = false
            }, 1500)
        },
        phoneFormNext () {
            this.stepActive++
		},
		getMallInfo(){
			api.getMallInfo().then((response) => {
				this.shopInfo = response.data
				this.formParam.bankAccount = this.shopInfo.bankAccount
				this.formParam.bankCardNo = this.shopInfo.bankCardNo
				this.formParam.bankName = this.shopInfo.bankName
				this.formParam.imgOutside = this.shopInfo.imgOutside
				this.formParam.imgLicense = this.shopInfo.imgLicense
				this.formParam.imgIdcardA = this.shopInfo.imgIdcardA
				this.formParam.imgIdcardB = this.shopInfo.imgIdcardB
			})
		}
		
    },
    created () { },
    activated () {
		this.getMallInfo()
    },
    mounted () { }
}
</script>
<style scoped>
.header_title {
    height: 137px;
}

.marginR10 {
    margin-right: 10px;
}

.marginR40 {
    margin-right: 40px;
}

.banner {
    height: 37px;
    font-weight: 600;
    color: #333;
    background: #f5f5f5;
    line-height: 37px;
    padding-left: 15px;
}
</style>