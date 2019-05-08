<template>
	<div>
		<div class="model_topcol">
			<span class="font600">收银设置</span>
			<span> - 新手指引</span>
		</div>
		<div class="model_content">
			<div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
				<div class="top_title">
					<span>支持顾客使用各种移动扫码支付</span>
					<span style="margin-left: 100px">扫描枪扫支付码，轻松付款无需等待</span>
					<el-button style="float: right; margin-top: 35px;" size="small">操作演示视频<i style="margin-left: 3px" class="fa fa-play-circle-o"></i></el-button>
				</div>
				<el-row style="margin-top: 70px; text-align: center" class="border">
					<el-col class="row_title" :span="8">1.注册</el-col>
					<el-col class="row_title" :span="8">2.提供资料绑定</el-col>
					<el-col class="row_title" :span="8">3.开始使用</el-col>
					<el-col style="border-left: none" class="row_content" :span="8">
						<span class="inline" style="margin-top: 100px">注册支付宝账号(个人/企业)并进行实名认证</span>
						<br>
						<span style="margin: 10px 0" class="inline">注册微信公众号(服务号)并进行微信认证</span>
						<br>
						<span class="inline" style="margin-top: 60px">妈妈去哪儿客服</span>
						<br>
						<span>QQ：3366382667</span>
						<br>
						<span>9:00 - 18:00 (周一到周五)</span>
					</el-col>
					<el-col class="row_content" style="background: #f5f7fa;" :span="8">
						<span class="inline font600" style="margin-top: 60px">需要提供一下资料给我方绑定(3-5工作日)</span>
						<div style="margin-top: 30px; margin-bottom: 10px;">
							<img src="../../../../public/img/setting/zhifubao.png" alt="支付宝">
						</div>
						<span>支付宝现在是自助签约</span>
						<br>
						<span class="inline" style="margin-right: 10px;">申请地址</span>
						<el-button class="button_nopadding" type="text" size="small">点击查看</el-button>
						<br>
						<span class="inline" style="margin-right: 10px;">操作指导文档</span>
						<el-button class="button_nopadding" type="text" size="small">点击下载</el-button>
						<div style="margin-top: 30px; margin-bottom: 5px;">
							<img src="../../../../public/img/setting/wx.png" alt="微信">
						</div>
						<span class="inline" style="margin-right: 10px;">操作指导资料</span>
						<el-button class="button_nopadding" type="text" size="small">点击下载</el-button>
						<br>
						<span>营业执照照片</span>
						<br>
						<span>法人身份证正反面照片</span>
						<br>
						<span>组织机构代码证照片</span>
					</el-col>
					<el-col class="row_content" :span="8">
						<span class="inline" style="margin-top: 230px;">费率：</span>
						<span>0.6%</span>
						<span>(支付宝/微信收取)</span>
					</el-col>
				</el-row>

			</div>
		</div>
		<div class="model_footer">
			<el-button @click="pageCansole" size="small" style="width: 90px; margin-left: 25px;">返回</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				totalPage: 10,
				tableParam: {
					pageNo: 1,

				}
			}
		},
		computed: {},
		created() {},
		methods: {
			pageCansole(){
				this.$router.push({
					path: '/cashSet'
				})
			}
		},
		activated() {

		},
		mounted() {}
	}
</script>
<style scoped>
.model_content_inner{
	padding: 0 20px;
	padding-top: 10px;
}
.top_title{
	height: 107px;
	background: linear-gradient(to right, #7f5dfb , #7a5ffb, #4c76ff);
	color: #fff;
	line-height: 107px;
	font-size: 24px;
	padding: 0 30px;

}
.top_title>span{
	display: inline-block;
}
.row_title{
	height: 37px;
	line-height: 37px;
	background: #f5f5f5;
	font-weight: 600;
}
.row_content{
	height: 500px;
	border-top: 1px solid #e4e8eb;
	border-left: 1px solid #e4e8eb;
}
.inline{
	display: inline-block;
}
</style>