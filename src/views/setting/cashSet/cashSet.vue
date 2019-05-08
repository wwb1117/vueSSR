<template>
	<div>
		<div class="model_topcol">
			<span>收银设置</span>
		</div>
		<div class="model_content">
			<div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
				<div>
					<div class="banner">
						支付方式设置
					</div>
					<div>
						<el-row style="height: 57px; line-height: 57px; margin-top: 10px">
							<el-col style="text-align: right; padding-right: 10px" :span="2">现金</el-col>
							<el-col class="tips_text" :span="18" style="border-bottom: 1px dashed #e4e8eb;">
								<span class="color_gray">收银端可用</span>
								<span class="color_gray">充值可用</span>
								<span class="color_red">(默认支付方式)</span>
								<!-- <el-input class="nowrap_input" size="small" v-model="formParam.searchWord" placeholder="6-32位字符组成"></el-input> -->
							</el-col>
							<el-col :span="3" style="border-bottom: 1px dashed #e4e8eb; text-align: right;">
								<el-button v-perss='180' @click="editEvent(1)" style="width: 90px;" type="primary" size="small">编辑</el-button>
							</el-col>
						</el-row>
						<el-row style="height: 57px; line-height: 57px;">
							<el-col style="text-align: right; padding-right: 10px" :span="2">会员储值卡</el-col>
							<el-col class="tips_text" :span="18" style="border-bottom: 1px dashed #e4e8eb;">
								<span class="color_gray">收银端可用</span>
								<span class="color_gray">充值可用</span>
							</el-col>
							<el-col :span="3" style="border-bottom: 1px dashed #e4e8eb; text-align: right;">
								<el-button v-perss='180' @click="editEvent(5)" style="width: 90px;" type="primary" size="small">编辑</el-button>
							</el-col>
						</el-row>
						<el-row style="height: 57px; line-height: 57px;">
							<el-col style="text-align: right; padding-right: 10px" :span="2">银联卡</el-col>
							<el-col class="tips_text" :span="18" style="border-bottom: 1px dashed #e4e8eb;">
								<span class="color_gray">收银端可用</span>
								<span class="color_gray">充值可用</span>
							</el-col>
							<el-col :span="3" style="border-bottom: 1px dashed #e4e8eb; text-align: right;">
								<el-button v-perss='180' @click="editEvent(2)" style="width: 90px;" type="primary" size="small">编辑</el-button>
							</el-col>
						</el-row>
					</div>
				</div>

				<div style="margin-top: 45px">
					<div class="banner">
						手机支付
					</div>
					<div>
						<el-row style="height: 57px; line-height: 57px; margin-top: 10px">
							<el-col style="text-align: right; padding-right: 10px" :span="2">微信支付</el-col>
							<el-col class="tips_text" :span="18" style="border-bottom: 1px dashed #e4e8eb;">
								<span class="color_gray">系统集成微信当面付</span>
							</el-col>
							<el-col :span="3" style="border-bottom: 1px dashed #e4e8eb; text-align: right;">
								<el-button @click="helpEvent" style="width: 90px;" type="primary" size="small">新手指引</el-button>
							</el-col>
						</el-row>
						<el-row style="height: 57px; line-height: 57px;">
							<el-col style="text-align: right; padding-right: 10px" :span="2">支付宝支付</el-col>
							<el-col class="tips_text" :span="18" style="border-bottom: 1px dashed #e4e8eb;">
								<span class="color_gray">系统集成支付宝当面付</span>
							</el-col>
							<el-col :span="3" style="border-bottom: 1px dashed #e4e8eb; text-align: right;">
								<el-button @click="helpEvent" style="width: 90px;" type="primary" size="small">新手指引</el-button>
							</el-col>
						</el-row>
					</div>
				</div>

			</div>
		</div>
		<div class="model_footer">
			<!-- <el-button size="small" style="width: 90px; margin-left: 25px;">取消</el-button>
			<el-button type="primary" size="small" style="width: 90px; margin-left: 25px;">保存</el-button> -->
		</div>

		<el-dialog
		:title="dialogTitle"
		:close-on-click-modal="false"
		:visible.sync="dialogVisible"
		width="550px"
		>
			<div style="margin-bottom: 50px;">
				<!-- <el-checkbox-group v-model="checkList"> -->
					<el-checkbox v-model="activeCashData.isPay" :true-label="1" :false-label="0" style="margin-bottom: 15px">可用于收款</el-checkbox>
					<br>
					<el-checkbox v-model="activeCashData.isRecharge" :true-label="1" :false-label="0">可用于会员充值</el-checkbox>
				<!-- </el-checkbox-group> -->
			</div>

			<span slot="footer" class="dialog-footer">
				<el-checkbox :true-label="1" :false-label="0" class="fl" v-model="activeCashData.isDefault">设为默认支付方式</el-checkbox >
				<el-button class="wid90" size="small" @click="dialogVisible = false">取 消</el-button>
				<el-button class="wid90" size="small" type="primary" @click="setPayTypeEvent">确 定</el-button>
			</span>	
		</el-dialog>
	</div>
</template>

<script>
    import api from 'api/setting'
	export default {
		data() {
			return {
				isDefault: 0,
				dialogVisible: false,
				checkList: [],
				dialogTitle: '现金',
				cashType: 1,
				cashData: [],
				activeCashData: {
					isPay: 0,
					isRecharge: 0,
					isDefault: 0
				}
			}
		},
		methods: {
			editEvent(type){
				this.cashType = type
				this.activeCashData = this.selectTypeData(this.cashType)
				if (type == 1) {
					this.dialogTitle = "现金"
				}
				if (type == 5) {
					this.dialogTitle = "会员储值卡"
				}
				if (type == 2) {
					this.dialogTitle = "银联卡"
				}
				this.dialogVisible = true
				
			},
			helpEvent(){
				this.$router.push({
					path: '/cashSet/help'
				})
			},
			getCashData(){
				api.getPayTypeData().then((response) => {
					this.cashData = response.data
				})
			},
			selectTypeData(type){
				for (let item of this.cashData) {
					if (item.payType == type) {
						return item
					}
				}
			},
			setPayTypeEvent(){
				api.setPayTypeData(this.activeCashData).then((response) => {
					this.$message({
						type: 'success',
						duration: 1500,
						showClose: true,
						message: '支付方式设置成功！'
					})
					this.dialogVisible = false
					this.getCashData()
				})
			}
		},
		computed: {},
		created() {},
		activated() {
			this.getCashData()
		},
		mounted() {}
	}
</script>
<style scoped>
	.banner {
		height: 37px;
		font-weight: 600;
		color: #333;
		background: #f5f5f5;
		line-height: 37px;
		padding-left: 15px;
	}
	.tips_text>span{
		margin-right: 10px;
	}
</style>