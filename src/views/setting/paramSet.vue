<template>
	<div>
		<div class="model_topcol">
			<span>参数设置</span>
		</div>
		<div class="model_content">
			<div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
				<div>
					<div class="banner">
						连锁设置
					</div>
					<div>
						<el-row style="height: 57px; line-height: 57px; margin-top: 10px">
							<el-col style="text-align: right; padding-right: 15px" :span="3">连锁会员共享设置</el-col>
							<el-col class="tips_text" :span="17" style="border-bottom: 1px dashed #e4e8eb;">
								<span class="color_gray">连锁门店将共享会员，会员卡通用</span>
							</el-col>
							<el-col :span="3" style="border-bottom: 1px dashed #e4e8eb; text-align: right;">
								<el-select @change="editParamEvent" style="width: 100px" size="small" v-model="paramData.chainMemberCardShare" placeholder="全共享">
									<el-option :key="1" label="全共享" :value="true"></el-option>
									<el-option :key="2" label="全不共享" :value="false"></el-option>
								</el-select>
							</el-col>
						</el-row>
						<!-- <el-row style="height: 57px; line-height: 57px;">
							<el-col style="text-align: right; padding-right: 15px" :span="3">连锁会员隐私显示</el-col>
							<el-col class="tips_text" :span="17" style="border-bottom: 1px dashed #e4e8eb;">
								<span class="color_gray">连锁店共享的会员，是否在非开卡门店显示隐私信息，如姓名、电话等</span>
							</el-col>
							<el-col :span="3" style="border-bottom: 1px dashed #e4e8eb; text-align: right;">
								<el-switch v-model="secretShow"></el-switch>
							</el-col>
						</el-row> -->
						<el-row style="height: 57px; line-height: 57px;">
							<el-col style="text-align: right; padding-right: 15px" :span="3">连锁寄存取</el-col>
							<el-col class="tips_text" :span="17" style="border-bottom: 1px dashed #e4e8eb;">
								<span class="color_gray">是否允许在连锁门店内进行寄存取</span>
							</el-col>
							<el-col :span="3" style="border-bottom: 1px dashed #e4e8eb; text-align: right;">
								<span class="color_gray">暂只支持单店</span>
							</el-col>
						</el-row>
						<!-- <el-row style="height: 57px; line-height: 57px;">
							<el-col style="text-align: right; padding-right: 15px" :span="3">会员积分规则和充值规则</el-col>
							<el-col class="tips_text" :span="17" style="border-bottom: 1px dashed #e4e8eb;">
								<span class="color_gray">是否由连锁总部统一设置，默认为总部设置</span>
							</el-col>
							<el-col :span="3" style="border-bottom: 1px dashed #e4e8eb; text-align: right;">
								<el-button
                                    type="text"
									@click="setBtnEvent"
                                    size="small">
                                    设置
                                </el-button>
							</el-col>
						</el-row> -->
					</div>
				</div>
				<div style="margin-top: 45px;">
					<div class="banner">
						基本设置
					</div>
					<div>
						<el-row style="height: 57px; line-height: 57px; margin-top: 10px">
							<el-col style="text-align: right; padding-right: 15px" :span="3">会员收银找零转存</el-col>
							<el-col class="tips_text" :span="17" style="border-bottom: 1px dashed #e4e8eb;">
								<span class="color_gray">收银找零时，是否提示转存到会员储值卡</span>
							</el-col>
							<el-col :span="3" style="border-bottom: 1px dashed #e4e8eb; text-align: right;">
								<el-select @change="editParamEvent" style="width: 100px" size="small" v-model="paramData.memberChangeTransfer" placeholder="请选择">
									<el-option :key="1" label="转存" :value="true"></el-option>
									<el-option :key="2" label="不转存" :value="false"></el-option>
								</el-select>
							</el-col>
						</el-row>
						<!-- <el-row style="height: 57px; line-height: 57px; margin-top: 10px">
							<el-col style="text-align: right; padding-right: 15px" :span="3">会员储值消费</el-col>
							<el-col class="tips_text" :span="17" style="border-bottom: 1px dashed #e4e8eb;">
								<span class="color_gray">会员余额不足时，不享受会员折扣</span>
							</el-col>
							<el-col :span="3" style="border-bottom: 1px dashed #e4e8eb; text-align: right;">
								<el-switch @change="editParamEvent" v-model="paramData.memberBalanceDiscount"></el-switch>
							</el-col>
						</el-row> -->
						<el-row style="height: 57px; line-height: 57px; margin-top: 10px">
							<el-col style="text-align: right; padding-right: 15px" :span="3">会员储值卡余额退还</el-col>
							<el-col class="tips_text" :span="17" style="border-bottom: 1px dashed #e4e8eb;">
								<span class="color_gray">是否允许客户端进行退还会员储值卡余额</span>
							</el-col>
							<el-col :span="3" style="border-bottom: 1px dashed #e4e8eb; text-align: right;">
								<el-switch @change="editParamEvent" v-model="paramData.memberBalanceRefund"></el-switch>
							</el-col>
						</el-row>
						<el-row style="height: 57px; line-height: 57px; margin-top: 10px">
							<el-col style="text-align: right; padding-right: 15px" :span="3">按单寄存商品</el-col>
							<el-col class="tips_text" :span="17" style="border-bottom: 1px dashed #e4e8eb;">
								<span class="color_gray">会员寄存商品，需要关联购买商品的单据</span>
							</el-col>
							<el-col :span="3" style="border-bottom: 1px dashed #e4e8eb; text-align: right;">
								<el-switch @change="editParamEvent" v-model="paramData.depositAccordingToOrders"></el-switch>
							</el-col>
						</el-row>
						<!-- <el-row style="height: 57px; line-height: 57px; margin-top: 10px">
							<el-col style="text-align: right; padding-right: 15px" :span="3">商品库存小于0禁售</el-col>
							<el-col class="tips_text" :span="17" style="border-bottom: 1px dashed #e4e8eb;">
								<span class="color_gray">当系统中显示商品库存小于0时，是否禁止销售</span>
							</el-col>
							<el-col :span="3" style="border-bottom: 1px dashed #e4e8eb; text-align: right;">
								<el-switch @change="editParamEvent" v-model="paramData.prohibitionSalesThan0"></el-switch>
							</el-col>
						</el-row> -->
						<el-row style="height: 57px; line-height: 57px; margin-top: 10px">
							<el-col style="text-align: right; padding-right: 15px" :span="3">反结账已交接班单据</el-col>
							<el-col class="tips_text" :span="17" style="border-bottom: 1px dashed #e4e8eb;">
								<span class="color_gray">已交接班过的单据，是否允许进行反结账操作</span>
							</el-col>
							<el-col :span="3" style="border-bottom: 1px dashed #e4e8eb; text-align: right;">
								<el-switch @change="editParamEvent" v-model="paramData.reverseCheckoutHandedOver"></el-switch>
							</el-col>
						</el-row>
						<el-row style="height: 57px; line-height: 57px; margin-top: 10px">
							<el-col style="text-align: right; padding-right: 15px" :span="3">收银端对商品保质期预警</el-col>
							<el-col class="tips_text" :span="17" style="border-bottom: 1px dashed #e4e8eb;">
								<span class="color_gray">当距离商品过期时间为设置天数时，在收银端进行提醒</span>
							</el-col>
							<el-col :span="3" style="border-bottom: 1px dashed #e4e8eb; text-align: right;">
								<el-select @change="editParamEvent" style="width: 100px" size="small" v-model="paramData.qualityGuaranteePeriodWarning" placeholder="请选择">
									<el-option :key="1" label="7天" :value="7"></el-option>
									<el-option :key="2" label="15天" :value="15"></el-option>
									<el-option :key="3" label="30天" :value="30"></el-option>
								</el-select>
							</el-col>
						</el-row>
						<el-row style="height: 57px; line-height: 57px; margin-top: 10px">
							<el-col style="text-align: right; padding-right: 15px" :span="3">允许对每个商品设置导购员</el-col>
							<el-col class="tips_text" :span="17" style="border-bottom: 1px dashed #e4e8eb;">
								<span class="color_gray">收银端销售商品时可对每个商品设置导购员</span>
							</el-col>
							<el-col :span="3" style="border-bottom: 1px dashed #e4e8eb; text-align: right;">
								<el-switch @change="editParamEvent" v-model="paramData.shoppingGuideGoods"></el-switch>
							</el-col>
						</el-row>
						<!-- <el-row style="height: 57px; line-height: 57px; margin-top: 10px">
							<el-col style="text-align: right; padding-right: 15px" :span="3">寄存与库存的关系</el-col>
							<el-col class="tips_text" :span="17" style="border-bottom: 1px dashed #e4e8eb;">
								<span class="color_gray">寄存的商品数量默认不计入库存，如开启则计入库存</span>
							</el-col>
							<el-col :span="3" style="border-bottom: 1px dashed #e4e8eb; text-align: right;">
								<el-switch @change="editParamEvent" v-model="paramData.depositInventory"></el-switch>
							</el-col>
						</el-row> -->
						<el-row style="height: 57px; line-height: 57px; margin-top: 10px">
							<el-col style="text-align: right; padding-right: 15px" :span="3">销售单据多少天内可退货操作</el-col>
							<el-col class="tips_text" :span="17" style="border-bottom: 1px dashed #e4e8eb;">
								<span class="color_gray">销售单生成，默认15天内可进行退货操作</span>
							</el-col>
							<el-col :span="3" style="border-bottom: 1px dashed #e4e8eb; text-align: right;">
								<el-select @change="editParamEvent" style="width: 100px" size="small" v-model="paramData.returnOperationExpire" placeholder="请选择">
									<el-option :key="1" label="7天" :value="7"></el-option>
									<el-option :key="2" label="15天" :value="15"></el-option>
									<el-option :key="3" label="30天" :value="30"></el-option>
								</el-select>
							</el-col>
						</el-row>
					</div>
				</div>

			</div>
		</div>
		<div class="model_footer">
			
		</div>
		<el-dialog
			title="会员积分和充值设置"
			:visible.sync="dialogVisible"
			width="550px"
			>
			<el-form :model="paramData" label-width="120px">
				<el-form-item label="会员积分规则">
					<el-radio-group @change="editParamEvent" v-model="paramData.chainIntegralRuleSynchronize">
						<el-radio :label="true">总部统一维护</el-radio>
						<el-radio :label="false">分店各自维护</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="会员充值规则">
					<el-radio-group @change="editParamEvent" v-model="paramData.chainRechargeRuleSynchronize">
						<el-radio :label="true">总部统一维护</el-radio>
						<el-radio :label="false">分店各自维护</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button class="wid90" @click="dialogVisible = false">取 消</el-button>
				<el-button class="wid90" type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import api from 'api/setting'
	export default {
		data() {
			return {
				dialogVisible: false,
				paramData: {}
			}
		},
		methods: {
			setBtnEvent(){
				this.dialogVisible = true
			},
			editParamEvent(){
				if (this.myBase.isHasPerssion(182)) {
					this.$message({
						type: 'warning',
						duration: 1500,
						showClose: true,
						message: '本账号没有编辑权限！'
					})
					return
				}
				api.editParamSet(this.paramData).then((response) => {
					this.$message({
						type: 'success',
						duration: 1500,
						showClose: true,
						message: '修改参数成功！'
					})
				})
			},
			getEditData(){
				api.getParamSetData(1).then((response) => {
					this.paramData = response.data
				})
			}
		},
		computed: {},
		created() {},
		activated() {
			this.getEditData()
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
</style>