<template>
        <div>
            <div class="model_topcol">
                <span>充值规则 - 新增充值规则</span>
            </div>
            <div class="model_content">
                <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
                    <div>
                        <div class='second_header'>使用门店</div>
                        <el-form ref="tableData" size='small' :model="tableData" label-position="right" label-width="110px">
                            <el-form-item label="创建门店">
                                <el-input disabled v-model="tableData.shopName"></el-input>
                            </el-form-item>
                            <el-form-item required multiple label="使用门店">
                                <el-select
                                    v-model="tableData.userids"
                                    multiple
                                    collapse-tags                                    
                                    placeholder="请选择使用门店">
                                    <el-option 
                                        v-for="item in shopList" 
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="适用会员">
                                <el-select v-model="tableData.customerLevelId" @change='seeData' placeholder="请选择适用会员">
                                    <el-option
                                        v-for="item in GardeList"
                                        :key="item.id"
                                        :label="item.levelNo"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <div class='second_header'>充值信息</div>
                            <el-form-item prop="rechargeArea" label="充值类型">
                                <template>
                                    <el-radio v-model="tableData.rechargeArea" :label="1">全场(服务类 + 实物类)</el-radio>
                                    <el-radio v-model="tableData.rechargeArea" :label="2">服务类(仅限服务类)</el-radio>
                                </template>
                            </el-form-item>
                            <el-form-item>
                                <div class='second_inner_black' v-for='(data, index) in ruleData' :key="index">
                                    <div>
                                        <span>
                                            充值<el-input type='tel' size="small"  v-model.number="data.rechargeCost"></el-input>元&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>
                                            赠送&nbsp;&nbsp;<el-select v-model="data.givingType" placeholder="请选择">
													<el-option
														v-for="item in classList"
														:key="item.value"
														:label="item.label"
														:value="item.value">
													</el-option>
                                                </el-select>
                                                <span v-if="data.givingType == 1"><el-input type='tel' size="small" v-model.number="data.givingAmount"></el-input>积分</span>
                                                <span v-if="data.givingType == 2"><el-input type='tel' size="small" v-model.number="data.givingAmount"></el-input>元</span>
                                            </span>
                                        </span>
                                        <el-button v-if='regIcon == true' size="medium" type="text" @click='removeRule(index)'>删除</el-button>
                                    </div>
                                </div>
                                <div class='second_inner_black'>
                                    <el-button  size="medium" type="text" style="margin-left:20px;" @click='addRule()'>+ 添加充值规则</el-button>
                                </div>
                            </el-form-item>
                            <el-form-item label="生效日期">
                                <template>
                                    <div class="block">
                                        <el-date-picker
                                        v-model="tableData.effectTime"
                                        type="date"
                                        placeholder="选择日期">
                                        </el-date-picker>
                                        <span>&nbsp;( 不填情况下，该规则立即生效。)</span>
                                    </div>
                                </template>
                            </el-form-item>
                            <el-form-item label="截至日期">
                                <template>
                                    <div class="block">
                                        <el-date-picker
                                        v-model="tableData.endTime"
                                        type="date"
                                        placeholder="选择日期">
                                        </el-date-picker>
                                        <span>&nbsp;( 不填情况下，该规则永久有效。)</span>
                                    </div>
                                </template>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
            <div class="model_footer">
                <el-button class='wid90' size="small" style="margin:0 15px;" @click='close()'>取消</el-button>
                <el-button class='wid90' type="primary" size="small" @click='addGrade()'>保存</el-button>
            </div>
        </div>
    </template>
    
    <script>
        import api from 'api/member'
        import capi from 'api/common'
        export default {
            data() {
                return {
                    value:'',
                    regIcon:false,
                    tableData:{
                        shopId:this.$store.state.home.currentShop.id,
                        shopName:this.$store.state.home.currentShop.shopName,
                        userids:[],
                        customerLevelName:'',
                        customerLevelId:'',
                        rechargeArea:1,
                        effectTime:'',
                        endTime:''
                    },
                    shopList:this.$store.state.home.shopList,
                    GardeList:[],
                    classList:[{
                        value: 1,
                        label: '会员积分'
                    },{
                        value: 2,
                        label: '通用余额'
                    }],
                    ruleData:[
                        {
                            rechargeCost:'',
                            givingType:'',
                            givingAmount:''
                        }
                    ],
					rules:{
						givingAmount:[
							{ type: 'number', message: '只能输入数字', trigger: 'blur' },
						],
        			}
                }
            },
            computed: {},
            methods: {
                addGrade() {
                    if(this.tableData.userids.length == 0){
                        this.$message({
                            type: 'warning',
                            duration: 1500,
                            showClose: true,
                            message: '请选择使用门店'
                        })
                        return
                    }
                    for (const ele of this.ruleData) {
                        if (ele.givingAmount == '' || ele.givingType == '' || ele.rechargeCost == '') {
                            this.$message({
                                type: 'warning',
                                duration: 1500,
                                showClose: true,
                                message: '请填写充值规则'
                            })
                            return
                        }
                    }
                    if(this.tableData.effectTime == undefined || this.tableData.effectTime === null || this.tableData.effectTime === ''){
                        this.tableData.effectTime = ''
                    } else {
                        this.tableData.effectTime = this.tableData.effectTime / 1000
                    }
                    if(this.tableData.endTime == undefined || this.tableData.endTime === null || this.tableData.endTime === ''){
                        this.tableData.endTime = ''
                    } else {
                        this.tableData.endTime = this.tableData.endTime / 1000
                    }
                    this.tableData.userids = this.tableData.userids.join() 
                    this.tableData.rules = this.ruleData
                    api.addRuleList(this.tableData).then((res)=>{
                        this.$message({
                            type: 'success',
                            duration: 1500,
                            showClose: true,
                            message: '新增充值规则成功'
                        })
                        this.$router.push({
                            path: '/topupList'
                        })
                    })
                },
                seeData(vId){
                    console.log(vId)
                    let obj = {};
                    obj = this.GardeList.find((item)=>{
                        return item.id === vId;
                    });
                    this.tableData.customerLevelName = obj.levelName
                },
                close() {
                    this.$router.push({
                        path: '/topupList'
                    })
                },
                addRule(){
                    let obj = {
                        rechargeCost:'',
                        givingType:'',
                        givingAmount:''
                    }
                    this.ruleData.push(obj)
                    this.regIcon = true
                },
                removeRule(index){
                    if (this.ruleData.length > 1){
                        this.ruleData.splice(index, 1)
                        if (this.ruleData.length == 1){
                            this.regIcon = false
                        }
                    }
                },
				clearAll(){
					this.tableData = {
                        shopId:this.$store.state.home.currentShop.id,
                        shopName:this.$store.state.home.currentShop.shopName,
                        userids:[],
                        customerLevelName:'',
                        customerLevelId:'',
                        rechargeArea:1,
                        effectTime:'',
                        endTime:''
                    }
					this.ruleData = [
                        {
                            rechargeCost:'',
                            givingType:'',
                            givingAmount:''
                        }
                    ]
				},
                getGardeList(){
                    api.levelList(this.tableMember).then((res)=>{
                        this.GardeList = res.data
                    })
                }
            },
            created() {},
            activated() {
				this.clearAll()
                this.$refs.tableData.resetFields();
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
            margin-bottom: 20px
        }
        .second_inner_black{
            margin-bottom:0px;
            padding: 10px 0;
            /* margin-left:70px; */
            background: #F8F8F8;
            span:first-child{
                margin-left:20px;
                margin-right:50px;
                .chooseLength{
                    color: #409EFF;margin:0 5px
                }
            }
            .el-select{
                width:150px;
            }
            .el-input{
                width:90px;
                margin: 0 10px;
            }
        }
        .el-input{
            width:20%;
        }
        .el-select{
            width:20%;
        }
    </style>