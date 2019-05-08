<template>
        <div>
            <div class="model_topcol">
				<span v-if='this.$route.query.id'>会员资料 - 编辑会员</span>
                <span v-else>会员资料 - 新增会员</span>
            </div>
            <div class="model_content">
                <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
                    <div>
                        <div class='second_header'>基本信息</div>
                        <div class='second_inner'>
                            <el-form :inline="true" size="small" :rules="rules" ref="formData" :model="formData" class="myForm" label-width="90px">
                                <el-form-item label="开卡门店">
									<el-input disabled v-model="shopName"></el-input>
                                    <!-- <el-select v-model="formData.shopName" placeholder="请选择开卡门店">
                                        <el-option v-for="item in shopList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                    </el-select> -->
                                </el-form-item>
                                <el-form-item label="会员性别" label-width="150px">
                                    <template>
                                        <el-radio v-model="formData.sex" :label="1">男</el-radio>
                                        <el-radio v-model="formData.sex" :label="0">女</el-radio>
                                        <el-radio v-model="formData.sex" :label="2">未知</el-radio>
                                    </template>
                                </el-form-item>
                                <br>
                                <el-form-item prop='cellPhone' label="会员手机">
                                    <el-input v-model="formData.cellPhone" placeholder="请输入会员手机"></el-input>
                                </el-form-item>
                                <el-form-item label="会员生日" label-width="150px">
									<el-date-picker
										v-model="formData.birthday"
										type="date"
										placeholder="请选择会员生日">
									</el-date-picker>
                                </el-form-item>
                                <br>
                                <el-form-item prop='customerName' label="会员姓名">
                                    <el-input v-model="formData.customerName" placeholder="请输入会员姓名"></el-input>
                                </el-form-item>
                                <el-form-item label="邮箱"  prop='email' label-width="150px">
                                    <el-input v-model="formData.email" placeholder="请输入会员联系邮箱"></el-input>
                                </el-form-item>
                                <br>
                                <el-form-item prop='levelName' label="会员等级">
                                    <el-select v-model="formData.levelName" placeholder="请选择">
                                        <el-option
                                            v-for="item in GardeList"
                                            :key="item.id"
                                            :label="item.levelName"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="QQ/微信" label-width="150px">
                                    <el-input v-model="formData.qq" placeholder="请输入会员QQ或者微信号"></el-input>
                                </el-form-item>
                                <br>
                                <el-form-item label="地址">
									<area-cader :fatherValue="addressId" v-on:areaFromChild="areaCallBack"></area-cader>
                                	<el-input class="add_member_address" style="margin-top: 10px" v-model="formData.addrDetail" placeholder="请输入详细的街道或门牌号"></el-input>
                                </el-form-item>
                                <br>
                                <el-form-item label="备注">
                                    <el-input
                                        style='width:290%'
                                        type="textarea"
										:rows="4"
                                        placeholder="请输入内容"
                                        v-model="formData.remark">
                                    </el-input>
                                </el-form-item>
                                <br>
                                <el-form-item label="启用状态">
                                    <el-switch v-model="formData.status"></el-switch>
                                </el-form-item>
                            </el-form> 
                        </div>
                        <div class='second_header'>其他信息</div>
                        <div class='second_inner'>
                            <el-form :inline="true" size="small" :model="formData" class="myForm" label-width="90px">
                                <el-form-item label="会员卡号">
                                    <el-input v-model="formData.cellPhone" disabled placeholder="默认同会员手机号"></el-input>
                                </el-form-item>
                                <el-form-item label="会员余额">
                                    <el-input v-model.number="formData.cardBalance" placeholder="0"><template slot="suffix">元</template></el-input>
                                </el-form-item>
                                <br>
                                <el-form-item label="开卡日期">
									<el-date-picker
										:picker-options="pickerOptions"
                                        v-model="formData.cardCreateDate"
                                        type="date"
                                        placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="会员积分">
                                    <el-input v-model.number="formData.cardIntegral" placeholder="0"><template slot="suffix">分</template></el-input>
                                </el-form-item>
                                <br>
                                <el-form-item label="到期日期">
                                    <el-date-picker
                                        v-model="formData.cardEndDate"
                                        type="date"
                                        placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="model_footer">
                <el-button size="small" class='wid90' style="margin-left:10px;" @click='close()'>取消</el-button>
                <el-button type="primary" class='wid90' style="margin-left:25px;" size="small" @click="addMember('formData')">保存</el-button>
            </div>
        </div>
    </template>
    
    <script>
        import mqn from '../../utils/mqn.js'
        import api from 'api/member'
		import capi from 'api/common'
		import areaCader from '../../components/areaCascader'
        export default {
			components: {
				areaCader
			},
            data() {
                return {
					addressId:[],
					GardeList:[],
					shopName:this.$store.state.home.currentShop.shopName,
                    formData:{
                        shopName:this.$store.state.home.currentShop.shopName,
                        customerName:'',
                        createCardDate:'',
                        levelName:'',
                        babyCount:'',
                        cardNumber:'',
                        cellPhone:'',
                        cardBalance: 0,
                        cardIntegral: 0,
                        countCardNumber:'',
						email:'',
						addrProvinceId:'',
						addrCityId:'',
						addrAreaId:'',
                        addDetail:'',
                        remark:'',
                        cardCreateDate:'',
						cardEndDate:'',
						status:true,
                        sex:1
                    },
                    shopList:[],
                    options: [],
					props: {
						label:'cityName',
						value: 'id',
						children: 'cities'
					},
                    rules: {
                        cellPhone: [
                            { required: true, message: '请输入会员手机', trigger: 'blur' },
                            {message: '请输入正确手机号', validator: mqn.data.validator.tel, trigger: 'blur' }
                        ],
                        customerName: [
                            { required: true, message: '请输入会员姓名', trigger: 'blur' }
                        ],
                        levelName: [
                            { required: true, message: '请输入会员等级', trigger: 'change' }
                        ],
						email: [
      						{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
						]
                    },
					pickerOptions: {
						disabledDate(time) {
							return time.getTime() < Date.now() - 8.64e7;
						}
					}
                }
            },
            computed: {},
            methods: {
				areaCallBack(data){
					this.formData.addrProvinceId = data[0]
					this.formData.addrCityId = data[1]
					this.formData.addrAreaId = data[2]
				},
				getDetail(){
					api.MemberDetail(this.$store.state.home.pageData).then((res)=>{
						this.formData = res.data
						this.formData.birthday = res.data.birthday * 1000
						this.formData.cardCreateDate = res.data.cardCreateDate * 1000
						this.formData.cardEndDate = res.data.cardEndDate * 1000
						this.addressId.push(res.data.addrProvinceId, res.data.addrCityId, res.data.addrAreaId)
						this.formData.levelName = res.data.levelId
						if(res.data.status == 0){
							this.formData.status = true
						} else {
							this.formData.status = false
						}
					})
				},
                addMember(formName) {
					this.$set(this.formData, 'cardNumber', this.formData.cellPhone)
					this.formData.levelId = this.formData.levelName
                    if(this.formData.cardCreateDate != ''){
                        this.$set(this.formData, 'cardCreateDate', this.formData.cardCreateDate / 1000)
                    }
                    if(this.formData.cardEndDate != ''){
                        this.$set(this.formData, 'cardEndDate', this.formData.cardEndDate / 1000)
					}
					this.formData.birthday = this.formData.birthday / 1000
					if(this.formData.status == true){
						this.formData.status = 0
					} else {
						this.formData.status = 1
					}
                    this.$refs[formName].validate((valid) => {
                    if (valid) {
						if(this.$route.query.id){
							api.editMember(this.formData).then((res) => {
								this.$message({
									type: 'success',
									duration: 1500,
									showClose: true,
									message: '修改会员成功'
								})
								this.$router.push({
									path: '/memberList'
								})
							})
						} else {
							api.addMember(this.formData).then((res) => {
								this.$message({
									type: 'success',
									duration: 1500,
									showClose: true,
									message: '新增会员成功'
								})
								this.$router.push({
									path: '/memberList'
								})
							})
						}
                    }
                    });
                },
                close() {
                    this.$router.push({
                        path: '/memberList'
                    })
				},
                //会员等级
                getGardeList(){
                    api.levelList(this.tableMember).then((res)=>{
                        this.GardeList = res.data
                    })
                },
                //所有供应商
                getShopList(){
					capi.allShops().then((res) => {
						this.shopList = res.data
					})
				},
				clearAll(){
					this.formData = {
                        shopName:this.$store.state.home.currentShop.shopName,
                        customerName:'',
                        createCardDate:'',
                        levelName:'',
                        babyCount:'',
                        cardNumber:'',
                        cellPhone:'',
                        cardBalance:'',
                        cardIntegral:'',
                        countCardNumber:'',
						email:'',
						addrProvinceId:'',
						addrCityId:'',
						addrAreaId:'',
                        addDetail:'',
                        remark:'',
                        cardCreateDate:'',
						cardEndDate:'',
						status:true,
                        sex:1
                    }
				}
            },
            created() {},
            activated() {
				this.clearAll()
				this.addressId = []
				if(this.$route.query.id){
					this.getDetail()
				}
				this.$refs.formData.resetFields();
                this.getShopList()
				this.getGardeList()
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
            padding: 40px;
        }
		.add_member_address /deep/ input{
			width: 548px;
		}
    </style>