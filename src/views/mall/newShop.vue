<template>
    <div class="newShop">
        <div class="model_topcol">
            <span v-if="editFlag">店铺列表 - 编辑分店</span>
            <span v-else>店铺列表 - 新增分店</span>
        </div>
        <div class="model_content">
            <div class="model_content_inner"
                 :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
                <div class="pl20">
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="基本信息" name="first"></el-tab-pane>
                        <!--<el-tab-pane label="微信/支付宝设置" name="second"></el-tab-pane>-->
                    </el-tabs>
                </div>
                <!--<div v-show="activeName == 'first'">-->
                <div>
                    <el-form :label-position="labelPosition" :rules="rules" :ref="'firstForm'" size="small"
                             :model="formData" class="" label-width="100px">
                        <div class='second_inner'>
                            <el-form-item label="店铺名称" prop="shopName">
                                <el-input :disabled="editFlag" style="width: 350px" v-model="formData.shopName"
                                          placeholder="请输入店铺名称"></el-input>
                            </el-form-item>
                            <el-form-item label="店铺大小" prop="shopArea">
                                <el-input style="width: 350px" v-model="formData.shopArea"
                                          placeholder="请输入店铺大小">
                                </el-input>
                                <span style="margin-left: 5px">M²</span>
                            </el-form-item>
                            <el-form-item  label="负责人" prop="manager">
                                <el-input :disabled="editFlag" style="width: 350px" v-model="formData.manager"
                                          placeholder="请输入负责人姓名"></el-input>
                            </el-form-item>
                            <el-form-item  label="负责人手机" prop="cellPhone">
                                <el-input :disabled="editFlag" style="width: 350px" v-model="formData.cellPhone"
                                          placeholder="请输入负责人手机"></el-input>
                            </el-form-item>
                            <el-form-item label="座机" prop="landlineNumber">
                                <el-input style="width: 350px" v-model="formData.landlineNumber"
                                          placeholder="请输入分店座机"></el-input>
                            </el-form-item>
                            <el-form-item label="地址" prop="addrDetail">
                                <area-cader :fatherValue="areaArr" :disabled="editFlag" v-on:areaFromChild="areaCallBack"></area-cader>
                                <el-input :disabled="editFlag" style="width: 350px;margin-top: 10px" v-model="formData.addrDetail"
                                          placeholder="请输入详细的街道或门牌号"></el-input>
                            </el-form-item>
                            <el-form-item label="资质信息" required>
                                <div style="display: flex;justify-content: space-between;width: 350px;">
                                    <div>
                                        <el-upload
                                                list-type="picture-card"
                                                :action="upDateImgUrl"
                                                :data='sendData'
                                                :on-success='handleAvatarSuccess1'>
                                            <img style="width: 140px; height: 140px;" v-if='formData.imgOutside' :src="formData.imgOutside" class="avatar">
                                            <i v-if="!formData.imgOutside" class="el-icon-plus"></i>
                                        </el-upload>
                                        <p style="text-align: center"><span style="color: red;">*</span>门店照</p>
                                    </div>
                                    <div>
                                        <el-upload
                                                list-type="picture-card"
                                                :action="upDateImgUrl"
                                                :data='sendData'
                                                :on-success='handleAvatarSuccess2'>
                                            <img style="width: 140px; height: 140px;" v-if='formData.imgLicense' :src="formData.imgLicense" class="avatar">
                                            <i v-if="!formData.imgLicense" class="el-icon-plus"></i>
                                        </el-upload>
                                        <p style="text-align: center"><span style="color: red;">*</span>营业执照</p>
                                    </div>
                                </div>
                            </el-form-item>
                        </div>
                        <div class='second_header'>账号信息</div>
                        <div class='second_inner'>
                            <el-form-item label="店铺账号" required>
                                <el-input style="width: 350px" v-model="formData.cellPhone"
                                          placeholder="请输入店铺账号，建议使用负责人手机号" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input :type="passFlag ? 'password': 'text'" @focus="changeType()" name="txtPassword" style="width: 350px" v-model="formData.password"
                                          placeholder="请输入密码"></el-input>
                                <div><i class="el-icon el-icon-warning"
                                        style="color: #F6B459;margin-right: 3px"></i><span
                                        style="font-size: 14px;color: #909399;">密码至少为六位</span></div>
                            </el-form-item>
                        </div>

                        <div class='second_header'>银行信息</div>
                        <div class='second_inner'>

                            <el-form-item label="开户名称" prop="bankAccount">
                                <el-input style="width: 350px" v-model="formData.bankAccount"
                                          placeholder="请输入开户名称"></el-input>
                            </el-form-item>
                            <el-form-item label="开户银行" prop="bankName">
                                <el-input style="width: 350px" v-model="formData.bankName"
                                          placeholder="请输入开户银行"></el-input>
                            </el-form-item>
                            <el-form-item label="银行账号" prop="bankCardNo">
                                <el-input style="width: 350px" v-model="formData.bankCardNo"
                                          placeholder="请输入银行账号" @keyup.native="formateNumber($event)"></el-input>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
                <div v-show="activeName == 'second'">
                    <div class='second_inner'>
                        <el-form :label-position="labelPosition" size="small" :model="formData" class=""
                                 label-width="150px">
                            <el-form-item label="支付方式">
                                <template>
                                    <el-radio v-model="checked" label="1">微信支付</el-radio>
                                    <el-radio v-model="checked" label="2">支付宝</el-radio>
                                </template>
                            </el-form-item>
                            <el-form-item required label="公众号(APPID)">
                                <el-input style="width: 350px" v-model="formData.user" placeholder="请输入公众号"></el-input>
                            </el-form-item>
                            <el-form-item required label="支付商户号(MCH_ID)" style="white-space: nowrap">
                                <el-input style="width: 350px" v-model="formData.user"
                                          placeholder="请输入支付商户号"></el-input>
                            </el-form-item>
                            <el-form-item required label="支付密钥">
                                <el-input style="width: 350px" v-model="formData.user" placeholder="请输入支付密钥"></el-input>
                            </el-form-item>
                            <el-form-item required label="CERT证书文件">
                                <el-input style="width: 350px" v-model="formData.user" placeholder="上传文件"></el-input>
                                <p style="font-size: 12px;color: #909399;margin-bottom: 0">
                                    下载证书CERT.ZIP中的APICLIENT_CRET.PEM文件</p>
                            </el-form-item>
                            <el-form-item required label="KEY密钥文件">
                                <el-input style="width: 350px" v-model="formData.user" placeholder="上传文件"></el-input>
                                <p style="font-size: 12px;color: #909399;margin-bottom: 0">
                                    下载证书CERT.ZIP中的APICLIENT_KEY.PEM文件</p>
                            </el-form-item>
                            <el-form-item label="ROOT文件">
                                <el-input style="width: 350px" v-model="formData.user" placeholder="上传文件"></el-input>
                                <p style="font-size: 12px;color: #909399;margin-bottom: 0">
                                    下载证书CERT.ZIP中的ROOTCA.PEM文件，新下载证书无需上传此文件</p>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
        <div class="model_footer">
            <el-button size="small" class='wid90' style="margin:0 15px;" v-RouterBack>取消</el-button>
            <el-button type="primary" class='wid90' size="small" @click='addMember("firstForm")'>保存</el-button>
        </div>
    </div>
</template>

<script>
    import mqn from 'utils/mqn'
    import api from 'api/mall'
    import base from 'utils/base'
    import areaCader from '../../components/areaCascader'

    export default {
        components: {
            areaCader
        },
        data() {
            return {
                passFlag: false,
                areaArr: [],
                upDateImgUrl: this.$store.state.home.baseUrl + '/f/upload',
                sendData: {
                    file: "",
                    uploadType: 'pos-shop'
                },
                editFlag: false,
                activeName: 'first',
                checked: '1',
                labelPosition: 'right',
                formData: {
                    addrProvinceId: '',
                    addrCityId: '',
                    addrAreaId: '',
                    shopSource: 0,
                    shopName: '',
                    manager: '',
                    cellPhone: '',
                    password: '',
                    account: '',
                    shopArea: '',
                    landlineNumber: '',
                    addrDetail: '',
                    bankAccount: '',
                    bankName: '',
                    bankCardNo: '',
                    imgOutside: '',
                    imgLicense: ''
                },
                postData: {},
                rules: {
                    shopName: [
                        {required: true, message: '请输入店铺名称', trigger: 'blur'}
                    ],
                    manager: [
                        {required: true, message: '请输入负责人姓名', trigger: 'blur'}
                    ],
                    cellPhone: [
                        {required: true, message: '请输入负责人手机', trigger: 'blur'},
                        {message: '请输入正确手机号', validator: mqn.data.validator.tel, trigger: 'blur' }
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, message: '密码至少为六位', trigger: 'blur'}
                    ],
                    shopArea: [
                        {required: false, trigger: 'blur'},
                        {validator: mqn.data.validator.num, message: '请输入数字', trigger: 'blur'}
                    ],
                    addrDetail: [
                        {required: true, message: '请输入地址', trigger: 'blur'}
                    ]
                }
            }
        },
        computed: {},
        methods: {
            // 修改类型
            changeType() {
                this.passFlag = true
            },
            addMember(form) {
                this.postData = JSON.parse(JSON.stringify(this.formData))
                this.postData.account = this.formData.cellPhone
                if (!this.postData.imgOutside) {
                    this.$message.warning({
                        message: '门店照不能为空！'
                    })
                    return
                }
                if (!this.postData.imgLicense) {
                    this.$message.warning({
                        message: '营业执照不能为空！'
                    })
                    return
                }
                this.$refs.firstForm.validate((valid) => {
                    if (valid) {
                        if (this.$route.query.id) {
                            if (!this.postData.password) { // 将密码为空的过滤掉
                                delete this.postData.password
                            }
                            api.editMall(this.postData).then((res) => {
                                this.$message.success({
                                    message: '修改成功！'
                                })
                                this.$router.push({
                                    path: '/mallList'
                                })
                            })
                        } else {
                            api.addMall(this.postData).then((res) => {
                                this.$message.success({
                                    message: '添加成功！'
                                })
                                this.$router.push({
                                    path: '/mallList'
                                })
                            })
                        }

                    } else {
                        return false;
                    }
                })
            },
            close() {
                this.$router.push({
                    path: '/mallList'
                })
            },
            // 获取详情
            getForm() {
                api.getMallDetail(this.$route.query.id).then((res) => {
                    this.formData = res.data
                    this.areaArr.push(res.data.addrProvinceId)
                    this.areaArr.push(res.data.addrCityId)
                    this.areaArr.push(res.data.addrAreaId)
                })
            },
            handleAvatarSuccess1(file, fileList) {
                this.$set(this.formData, 'imgOutside', file.data.url)
            },
            handleAvatarSuccess2(file, fileList) {
                this.$set(this.formData, 'imgLicense', file.data.url)
            },
            // 银行账号分割
            formateNumber(e) {
                this.formData.bankCardNo = base.formatBlankNumber(e.target.value)
            },
            areaCallBack(data) {
				this.formData.addrProvinceId = data[0]
				this.formData.addrCityId = data[1]
				this.formData.addrAreaId = data[2]
            }
        },
        created() {
        },
        activated() {
            this.$refs.firstForm.resetFields()
            this.formData.imgLicense = ''
            this.formData.imgOutside = ''
            this.areaArr = []
            if (this.$route.query.id) {
                this.editFlag = true
                this.getForm()
                // 去掉密码必填项
                this.rules.password = [
                    {required: false, trigger: 'blur'},
                    {min: 6, message: '密码至少为六位', trigger: 'blur'}
                ]
            } else {
                this.editFlag = false
                this.rules.password = [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                    {min: 6, message: '密码至少为六位', trigger: 'blur'}
                ]
            }

        },
        mounted() {

        }
    }
</script>
<style lang="scss">
    .newShop{
        .el-upload-list--picture-card{
            display: none;
        }
    }
</style>
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