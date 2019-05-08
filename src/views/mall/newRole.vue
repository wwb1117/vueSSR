<template>
    <div class="newRole">
        <div class="model_topcol">
            <span>角色 - 新建角色</span>
        </div>
        <div class="model_content">
            <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
                <div class='second_header'>基本信息</div>
                <div class='second_inner'>
                    <el-form :label-position="labelPosition" size="small" ref="ruleForm" :model="formData" :rules="rules" label-width="100px">
                        <el-form-item label="所属店铺" prop="shopId">
                            <el-select style="width: 350px" v-model="formData.shopId" placeholder="请选择店铺">
                                <el-option v-for="item in mallList" :key="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="角色名称" prop="roleName">
                            <el-input style="width: 350px" v-model="formData.roleName" placeholder="请输入角色名称"></el-input>
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
                <div class='second_header'>权限信息</div>
                <div class='second_inner'>
                    <ul class="permission">
                        <li>
                            <strong>后端权限</strong>
                            <div class="border">
                                <el-tree
                                    :data="data1"
                                    :ref="'posTree1'"
                                    show-checkbox
                                    node-key="id"
                                    :props="defaultProps">
                                </el-tree>
                            </div>
                        </li>
                        <li>
                            <strong>收银端权限</strong>
                            <div class="border">
                                <el-tree
                                        :data="data2"
                                        :ref="'posTree2'"
                                        show-checkbox
                                        node-key="id"
                                        :props="defaultProps">
                                </el-tree>
                            </div>
                        </li>
                        <!--<li>-->
                            <!--<strong>手机端权限</strong>-->
                            <!--<div class="border">-->
                                <!--<el-tree-->
                                        <!--:data="data3"-->
                                        <!--show-checkbox-->
                                        <!--node-key="id"-->
                                        <!--:props="defaultProps">-->
                                <!--</el-tree>-->
                            <!--</div>-->
                        <!--</li>-->
                    </ul>
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
    import api from 'api/mall'
    export default {
        data() {
            return {
                labelPosition: 'right',
                editFlag: false,
                formData: {
                    roleName: '',
                    shopId: '',
                    shopName: '',
                    remark: '',
                    enableStatus: 1,
                    resourcesIds: '',
                    posResourceMap: {
                        'back': [],
                        'cash': []
                    }
                },
                mallList: [],
                defaultProps: {
                    children: 'posResourceList',
                    label: 'resourceName'
                },
                rules: {
                    shopId: [
                        {required: true, message: '请选择店铺', trigger: 'blur'}
                    ],
                    roleName: [
                        {required: true, message: '请输入角色名称', trigger: 'blur'}
                    ]
                },
                postData: {},
                data1: [],
                data2: [],
                data3: [],
                resourcesIdArr: []
            }
        },
        computed: {},
        methods: {
            addMember() {
                let arr1 = this.$refs.posTree1.getCheckedKeys(true)
                let arr2 = this.$refs.posTree2.getCheckedKeys(true)
                this.formData.posResourceMap.back = this.$refs.posTree1.getCheckedKeys(true)
                this.formData.posResourceMap.cash = this.$refs.posTree2.getCheckedKeys(true)
                this.$refs.ruleForm.validate((valid) => {
                    this.mallList.forEach((mall) => {
                        if(mall.id == this.formData.shopId) {
                            this.formData.shopName = mall.name
                        }
                    })
                    if (this.$route.query.id) {
                        // 编辑
                        delete this.formData.created
                        delete this.formData.updated
                        api.editRole(this.formData).then((res) => {
                            this.$message.success({
                                message: '编辑成功！'
                            })
                            this.$router.push({
                                path: '/staffRole'
                            })

                        })
                    } else {
                        // 新增
                        console.log(this.formData)
                        api.addRole(this.formData).then((res) => {
                            this.$message.success({
                                message: '新增成功！'
                            })
                            this.$router.push({
                                path: '/staffRole'
                            })
                        })
                    }

                })
            },
            // 获取权限列表
            getResource() {
                // 后端权限
                api.getResourceList({source: 0}).then((res) => {
                    this.data1 = res.data.list
                })
                // 收银端权限
                api.getResourceList({source: 1}).then((res) => {
                    this.data2 = res.data.list
                })
            },
            // 递归获取id
            getAllIds(ResourceMap) {
                ResourceMap.forEach((item) => {
                    if (item.posResourceList) {
                        this.getAllIds(item.posResourceList)
                    } else {
                        if (item.checked) {
                            this.resourcesIdArr.push(item.id)
                        }
                    }
                })
            },
            // 获取角色详情
            getRoleDetail() {
                api.getRoleDetail({roleId: this.$route.query.id}).then((res) => {
                    this.formData = res.data
                    this.resourcesIdArr = []
                    // 将所有选中id收集
                    this.getAllIds(this.formData.posResourceMap.back)
                    this.getAllIds(this.formData.posResourceMap.cash)
                    this.$refs.posTree1.setCheckedKeys(this.resourcesIdArr)
                    this.$refs.posTree2.setCheckedKeys(this.resourcesIdArr)
                })
            },
            close() {
                this.$router.push({
                    path: '/staffRole'
                })
            }
        },
        created() {},
        activated() {
            this.$refs.ruleForm.resetFields()
            this.mallList = this.$store.state.home.shopList
            this.getResource()
            if (this.$route.query.id) {
                this.editFlag = true
                this.getRoleDetail()
            } else {
                this.$refs.posTree1.setCheckedKeys([])
                this.$refs.posTree2.setCheckedKeys([])
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
<style>
    .newRole .permission{
        overflow: hidden;
        padding-left: 30px;
        margin: 0;
    }
    .newRole .permission li{
        float: left;
        width: 320px;
        margin-right: 70px;
    }
    .newRole .permission li strong{
        margin-bottom: 10px;
        display: block;
    }
    .newRole .permission li .border{
        border: 1px solid #E4E7ED;
        max-height: 1040px;
        padding-bottom: 20px;
    }
    .newRole .permission li .el-tree-node__content{
        height: 39px;
        border-bottom: 1px dashed #DCDFE6;
    }

</style>