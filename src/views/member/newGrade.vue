<template>
        <div>
            <div class="model_topcol">
				<span v-if='this.$route.query.id'>等级管理 - 编辑等级</span>
				<span v-else>等级管理 - 新增等级</span>
            </div>
            <div class="model_content">
                <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}"><div>
                    <div class='second_header'>基本信息</div>
                        <el-form size='small' :rules="rules" ref="tableData" :model="tableData" label-position="right" label-width="170px">
                            <el-form-item prop='levelName' label="身份称谓">
                                <el-input class='inlineinp' v-model="tableData.levelName" placeholder="请输入等级名称，如普通会员"></el-input>
                            </el-form-item>
                            <el-form-item required label="成长值范围">
                                <el-col :span="4">
                                    <el-form-item prop="amountStart">
                                        <el-input v-model.number="tableData.amountStart" placeholder="请输入最小值"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="0.5">&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;</el-col>
                                <el-col :span="4">
                                    <el-form-item prop="amountEnd">
                                        <el-input v-model.number="tableData.amountEnd" placeholder="请输入最大值"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="1">
                                    <template>
                                        <el-popover
                                            placement="right"
                                            title="成长值说明"
                                            width="530"
                                            trigger="hover"
                                            >
                                            <div>
                                                <p>1、成长值大小是会员等级高低的体现，值越大，等级也就越高。</p>
                                                <p>2、每个会员等级对应一个成长值范围。成长值在该范围内的会员都属于该等级。</p>
                                                <p>3、成长值范围的划定，尽量根据实际消费情况来设置。</p>
                                                <p style="text-indent:20px;">举例说明：如果购物频次比较高的，可以将每个区间范围扩大些。</p>
                                                <p style="text-indent:20px;">如：普通会员，设置为0-3000，即3000以内的成长值会员，全部属于普通会员。</p>                                          
                                            </div>
                                            <i slot="reference" class='el-icon-question'></i>
                                        </el-popover>
                                    </template>
                                </el-col>
                            </el-form-item>
                            <div class='second_header'>会员权益</div>
                            <el-form-item prop="levelDiscount" label="优惠折扣">
                                <el-input class='inlineinp' v-model.number="tableData.levelDiscount" placeholder="如7.8折则填写78"></el-input>
                            </el-form-item>
                            <el-form-item required label="是否享有积分">
                                <template>
                                    <el-switch
                                        v-model="tableData.isIntegral">
                                    </el-switch>
                                </template>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
            <div class="model_footer">
                <el-button class='wid90' size="small" style="margin:0 15px;" @click='close()'>取消</el-button>
                <el-button class='wid90' type="primary" size="small" @click="addGrade('tableData')">保存</el-button>
            </div>
        </div>
    </template>
    
    <script>
        import api from 'api/member'
        export default {
            data() {
                return {
                    tableData:{
                        levelName:'',
                        amountStart:'',
                        amountEnd:'',
                        levelDiscount:'',
                        checked:true
                    },
                    rules: {
                        levelName: [
                            { required: true, message: '请输入身份称谓', trigger: 'blur' },
                        ],
                        amountStart: [
                            { required: true, message: '请输入成长最小值', trigger: 'blur' },
                            { type: 'number', message: '成长最小值必须为数字值'}
                        ],
                        amountEnd: [
                            { required: true, message: '请输入成长最大值', trigger: 'blur' },
                            { type: 'number', message: '成长最大值必须为数字值'}
                        ],
                        levelDiscount: [
                            { required: true, message: '请输入优惠折扣', trigger: 'blur' },
							{ type: 'number', message: '优惠折扣必须为数字值'}
                        ]
                    }
                }
            },
            computed: {},
            methods: {
                getDetail(){
                    api.getlevelList(this.$route.query.id).then((res)=>{
						this.tableData = res.data
                    })
                },
                addGrade(formName) {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
							if(this.$route.query.id){
								api.settinglevelList(this.tableData).then((res)=>{
									this.$message({
										type: 'success',
										duration: 1500,
										showClose: true,
										message: '修改等级成功'
									})
									this.$router.push({
										path: '/gradeList'
									})
								})
							} else {
								api.addlevelList(this.tableData).then((res)=>{
									this.$message({
										type: 'success',
										duration: 1500,
										showClose: true,
										message: '新建等级成功'
									})
									this.$router.push({
										path: '/gradeList'
									})
								})
							}
                        } else {
                            return false;
                        }
                    });
                },
                close() {
                    this.$router.push({
                        path: '/gradeList'
                    })
                }
            },
            created() {},
            activated() {
                this.$refs.tableData.resetFields();
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
            margin-bottom: 40px;
            background: #F5F5F5;
            font-weight: 700;
        }
        .inlineinp{
            width: 35%
        }
        .el-icon-question{
            font-size: 20px;
            line-height: 34px;
            margin-left:5px;
            margin-top:2px;
        }
    </style>