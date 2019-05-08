<template>
	<div>
		<div class="model_topcol">
			<span>门店通知</span>
			<div>
				<el-button v-perss='177' @click="addEvent" class="wid90" type="primary" size="small">新增通知</el-button>
			</div>
		</div>
		<div class="model_content">
			<div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
				<div class="header_seach_wrap" style="padding: 15px">
					<el-select filterable clearable @change="searInput" v-model="tableParam.status" placeholder="全部通知">
						<el-option label="全部通知" :value="0"></el-option>
						<el-option label="有效通知" :value="1"></el-option>
						<el-option label="过期通知" :value="2"></el-option>
					</el-select>
				</div>
				<el-table
                    :data="tableData"
                    :height="$store.state.home.modelContentHeight - 84"
                    style="width: 100%">
					<el-table-column
                        type="index"
						label="序号"
                        width="50">
                    </el-table-column>
					<el-table-column
                        prop="title"
                        label="标题"
                        >
                    </el-table-column>
					<el-table-column
                        prop="content"
                        label="内容"
                        >
                    </el-table-column>
					<el-table-column
                        prop="expireTime"
                        label="截止日期"
                        >
						<template slot-scope="scope">
							<span>{{scope.row.expireTime | time_m}}</span>
						</template>
                    </el-table-column>
					<el-table-column
                        prop="noticeType"
                        label="状态"
                        >
						<template slot-scope="scope">
							<span v-if="scope.row.expireTime - (new Date().getTime() / 1000) > 0">有效通知</span>
							<span v-else>过期通知</span>
						</template>
                    </el-table-column>
					<!-- <el-table-column
                        prop="purchaseOrderNo"
                        width="150"
                        label="操作">
                        <template slot-scope="scope">
                            <div v-if="scope">
                                <el-button
									@click="propEvent(scope.row)"
                                    type="text"
                                    size="small">
                                    编辑
                                </el-button>
                            </div>
                        </template>
                    </el-table-column> -->
				</el-table>
			</div>
		</div>
		<div class="model_footer">
			<el-pagination :current-page="tableParam.pageNo"
				:page-sizes="[15, 30, 50, 100]"
				:page-size="tableParam.pageSize"
				@size-change="handleSizeChange"
                @current-change="handleCurrentChange"
				layout="total, sizes, prev, pager, next, jumper"
				:total="totalPage">
			</el-pagination>
		</div>

		<el-dialog
		:title="editNoticeType ? '编辑通知' : '新增通知'"
		:visible.sync="addDialogVisible"
		:close-on-click-modal="false"
		width="650px"
		>
			<el-form ref="addMessageForm" :inline="true" :model="addFormData" :rules="rules" label-position="right" size="small" label-width="90px">
				<el-form-item prop="receiveShopIds" label="通知门店">
					<el-select multiple @change="mallSelectChange" collapse-tags v-model="receiveShopIds" placeholder="请选择通知门店">
						<el-option v-for="item in $store.state.home.shopList" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<br>
				<el-form-item prop="expireTime" label="有效期至">
					<el-date-picker
					v-model="addFormData.expireTime"
					value-format="timestamp"
					type="datetime"
					placeholder="请选择有效期截止日期">
					</el-date-picker>
				</el-form-item>
				<br>
				<el-form-item prop="title" label="通知标题">
					<el-input style="width: 490px;" v-model="addFormData.title" placeholder="请输入通知标题"></el-input>
				</el-form-item>
				<el-form-item prop="content" label="通知内容">
					<el-input style="width: 490px" type="textarea" :rows="4" v-model="addFormData.content" placeholder="请输入通知内容"></el-input>
				</el-form-item>
			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button class="wid90" size="small" @click="addDialogVisible = false">取 消</el-button>
				<el-button class="wid90" size="small" type="primary" @click="addNoticeEvent">确 定</el-button>
			</span>	
		</el-dialog>
	</div>
</template>

<script>
    import api from 'api/setting'
	export default {
		data() {
			return {
				addDialogVisible: false,
				selectData: [],
				tableData: [],
				receiveShopIds: [],
				editNoticeType: 0, //0新增1修改
				totalPage: 10,
				tableParam: {
					status: 0,
					pageNo: 1,
					pageSize: 15
				},
				addFormData: {
					receiveShopIds: '',
					expireTime: '',
					title: '',
					content: ''
				},
				rules: {
					receiveShopIds: [
						{ required: true, message: '请选择通知门店', trigger: 'blur' }
					],
					expireTime: [
						{ required: true, message: '请选择有效期截止日期', trigger: 'blur' }
					],
					title: [
						{ required: true, message: '请输入通知标题', trigger: 'blur' }
					],
					content: [
						{ required: true, message: '请输入通知内容', trigger: 'blur' }
					]
				}
			}
		},
		computed: {},
		methods: {
			mallSelectChange(val){
				if (val.length > 0) {
					this.addFormData.receiveShopIds = val.join(',')
				} else {
					this.addFormData.receiveShopIds = ''
				}
			},
			handleSizeChange(val){
				this.tableParam.pageSize = val
				this.getNoticeList()
			},
			handleCurrentChange(val){
				this.tableParam.pageNo = val
				this.getNoticeList()
			},
			searInput(){
				if (this.tableParam.status == '') {
					this.tableParam.status = 0
				}
				
				this.getNoticeList()
			},
			getNoticeList(){
				api.getNoticeList(this.tableParam).then((response) => {
					this.tableData = response.data.listData
					this.totalPage = response.data.totalCount
				})
			},
			getNoticeData(){

			},
			propEvent(data){
				this.editNoticeType = 1
				this.addDialogVisible = true

				console.log(data)
			},  
			addEvent(){
				this.editNoticeType = 0
				this.addDialogVisible = true
				this.receiveShopIds = []
				this.addFormData.receiveShopIds = ''
				if (this.$refs.addMessageForm) {
					this.$refs.addMessageForm.resetFields()
				}
			},
			addNoticeEvent(){
				this.addFormData.expireTime = Math.round(this.addFormData.expireTime / 1000)
				api.addNotice(this.addFormData).then((response) => {
					this.addDialogVisible = false
					this.searInput()
					this.$message({
						type: 'success',
						duration: 1500,
						showClose: true,
						message: this.editNoticeType == 0 ? '新增通知成功！' : '编辑通知成功！'
					})
				})
			}

		},
		created() {},
		activated() {
			this.editNoticeType = 0
			this.getNoticeList()
		},
		mounted() {}
	}
</script>
<style scoped>
	.header_seach_wrap>div {
		margin-right: 10px;
	}
</style>