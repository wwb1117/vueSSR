<template>
        <div>
            <div class="model_topcol">
                <span>会员等级</span>
                <div>
                    <el-button v-perss='145' class="wid90" type="primary" size="small" @click='addGrade()'>新增等级</el-button>
                </div>
            </div>
            <div class="model_content">
                <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
                    <div class="header_seach_wrap" style="padding: 15px">
                        <div class='notice'>
                            <p><i class='el-icon-warning'></i>会员等级由总部统一管理</p>
                            <p>会员每消费<span v-text = "newMonetary">0</span>元,交易完成后即可获得<span v-text="newGrowthValue">0</span>点成长值<el-button v-perss='149' size="small" style="margin-left:10px" @click='newGrade()'>设置成长规则</el-button></p>
                        </div>
                    </div>
                    <el-table
                        :data="tableData"
                        height = 'calc(100% - 62px)'
                        ref="purchaseListTable"
                        style="width: 100%;overflow-y: auto">
                        <el-table-column
                            prop="levelNo"
                            label="会员等级"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="levelName"
                            label="身份称谓"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="purchaseOrderNo"
                            label="所积成长分"
                            >
                            <template slot-scope="scope">
                                <span>{{scope.row.amountStart}} - {{scope.row.amountEnd}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="purchaseOrderNo"
                            label="人数(比重)"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="levelDiscount"
                            label="优惠折扣"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="isIntegral"
                            label="是否积分"
							>
							<template slot-scope="scope">
								<span v-if='scope.row.isIntegral == true'>是</span>
								<span v-if='scope.row.isIntegral == false'>否</span>
							</template>
                        </el-table-column>
                        <el-table-column
                            prop="purchaseOrderNo"
                            width="150"
                            label="操作">
                             <template slot-scope="scope">
                                <div v-if="scope">
									<el-button
										v-perss='146'
                                        @click="propEvent(2, scope.row.id)"
                                        type="text"
                                        size="small">
                                        设置
                                    </el-button>
									<el-button
										v-perss='148'
                                        v-if='scope.row.isEnabled == false'
                                        @click="propEvent(0, scope.row.id)"
                                        type="text"
                                        size="small">
                                        启用
                                    </el-button>
									<el-button
										v-perss='147'
                                        v-if='scope.row.isEnabled == true'
                                        @click="propEvent(1, scope.row.id)"
                                        type="text"
                                        size="small">
                                        禁用
                                    </el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="model_footer">
                <el-pagination 
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="tableMember.pageNo"
                    :page-sizes="[15, 30, 50, 100]"
                    :page-size="tableMember.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalPage">
                </el-pagination>
            </div>

            <el-dialog
                title="设置成长值规则"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                width="500px"
                >
                <div class='el-dialog-inner'>
                    <span>会员每消费
						<el-input oninput ="value=value.replace(/[^\d]/g,'')" type='text' size="small" v-model.number="monetary"></el-input>元,消费完成后可获得
						<el-input oninput ="value=value.replace(/[^\d]/g,'')" type='text' size="small" v-model.number="growthValue" ></el-input>点成长值
					</span>
                </div>
                <p style="color:#BABDC6"><span style="color:#F56C6C">注:</span>只能输入数字且不能为负数，该规则对所有成员生效</p>
                <span slot="footer" class="dialog-footer">
                    <el-button class="wid90" size="small" @click="dialogVisible = false">取消</el-button>
                    <el-button class="wid90" size="small" type="primary" @click="addRule">确定</el-button>
                </span>
            </el-dialog>
        </div>
    </template>
    
    <script>
        import api from 'api/member'
        export default {
            data() {
                return {
                    input:'',
                    dialogVisible: false,
                    tableData: [],
                    mallList: [],
					totalPage: 0,
					newMonetary:0,
                    newGrowthValue:0,
                    monetary:0,
                    growthValue:0,
                    tableMember: {
                        pageNo: 1,
                        pageSize: 15
                    }
                }
            },
            computed: {},
            methods: {
                getList(){
                    api.levelList(this.tableMember).then((res)=>{
                        console.log(res)
						this.tableData = res.data
                        this.totalPage = res.data.length
                    })
                },
                newGrade(){
					this.getGrowth()
                    this.dialogVisible = true
                },
                addGrade() {
                    this.$router.push({
                        path: '/newGrade'
                    })
                },
                addRule(){
                    if(this.monetary == ''){
                        this.$message({
                            type: 'warning',
                            duration: 1500,
                            showClose: true,
                            message: '请输入消费金额'
                        })
                    }
                    if(this.growthValue == ''){
                        this.$message({
                            type: 'warning',
                            duration: 1500,
                            showClose: true,
                            message: '请输入成长值'
                        })
                    }
                    let obj = {
                        monetary:this.monetary,
                        growthValue:this.growthValue
                    }
                    api.growthRule(obj).then((res)=>{
                        this.$message({
                            type: 'success',
                            duration: 1500,
                            showClose: true,
                            message: '设置成功'
						})
						this.getGrowth()
                        this.getList()
                        this.dialogVisible = false
                    })
                },
                propEvent(type, id){
                    if (type == 1) {
                        this.$confirm('你确定要禁用吗?', '禁用确认', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            api.disableMember(id).then((res)=>{
                                this.$message({
                                    type: 'success',
                                    duration: 1500,
                                    showClose: true,
                                    message: '禁用成功'
                                })
                                this.getList()
                            })
                        }).catch(() => {
                            this.$message({
                                showClose: true,
                                type: 'info',
                                message: '已取消操作'
                            });          
                        });
                    }
                    if (type == 0) { 
                        this.$confirm('你确定要启用吗?', '禁用确认', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            api.enableMember(id).then((res)=>{
                                this.$message({
                                    type: 'success',
                                    duration: 1500,
                                    showClose: true,
                                    message: '启用成功'
                                })
                                this.getList()
                            })
                        }).catch(() => {
                            this.$message({
                                showClose: true,
                                type: 'info',
                                message: '已取消操作'
                            });          
                        });
                    }
                    if (type == 2) { 
                        this.$store.commit('setPageData', id)
                        this.$router.push({
							path: '/newGrade',
							query:{
								id:id
							}
                        })
                    }
                },
                handleCurrentChange(val){
                    this.tableMember.pageNo = val
                    this.getList()
                },
                handleSizeChange(val){
                    //选择每页数据
                    this.tableMember.pageSize = val
                    this.getList()
				},
				getGrowth(){
					api.getGrowthRule().then((res)=>{
					this.newGrowthValue = res.data.growthValue
					this.newMonetary = res.data.monetary
					this.growthValue = res.data.growthValue
					this.monetary = res.data.monetary
				})
				}
            },
            created() {},
            activated() {
				this.getGrowth()
                this.getList()
            },
            mounted() {}
        }
    </script>
    <style lang="scss" scoped>
        .el-dialog-inner{
            margin:20px 0 30px 0; 
            .el-input{
                width:85px;
                margin:0 5px;
            }
        }
        .header_seach_wrap>div {
            margin-right: 10px;
        }
        .notice{
            /* padding:10px 0; */
            display: flex;
            justify-content:space-between;
            p{
                /* float: left */
                margin-bottom: 0;
                i{
                    margin-right: 10px;
                }
                span{
                    color:#F56C6C;
                }
            }
            
        }
    </style>