<template>
	<div class="content_wrap border">
		<div v-for="item in printData" :key="item.id">
			<div class="logo_wrap" v-if="item.id == 1">
				<img src="../../public/img/setting/mamalogo.png" alt="LOGO">
			</div>
			<div class="mallName_wrap" v-else-if="item.id == 2">
				妈妈去哪儿(杭州店)
			</div>
			<div class="footer_wrap" v-else-if="item.id == 3">
				<span>*************************************************</span><br>
				欢迎下次光临
			</div>
			<div class="code_wrap" v-if="item.id == 4">
				<img src="../../public/img/setting/ercode.png" alt="二维码">
			</div>
			<el-row class="cashier_wrap" v-else-if="item.id == 5">
				<el-col class="item_label" :span="8">收银员：</el-col>
				<el-col class="item_cont" :span="16">wwb</el-col>
			</el-row>
			<el-row class="saler_wrap" v-else-if="item.id == 6">
				<el-col class="item_label" :span="8">导购员：</el-col>
				<el-col class="item_cont" :span="16">wwb</el-col>
			</el-row>
			<el-row class="orderNo_wrap" v-else-if="item.id == 7">
				<el-col class="item_label" :span="8">单号：</el-col>
				<el-col class="item_cont" :span="16">201901317758</el-col>
			</el-row>
			<el-row class="orderTime_wrap" v-else-if="item.id == 8">
				<el-col class="item_label" :span="8">下单时间：</el-col>
				<el-col class="item_cont" :span="16">2019-01-31 16:43</el-col>
			</el-row>
			<el-row class="total_wrap" v-else-if="item.id == 9">
				<el-col class="item_label" :span="8">合计：</el-col>
				<el-col class="item_cont" :span="16">138.00</el-col>
			</el-row>
			<el-row class="prefer_wrap" v-else-if="item.id == 10">
				<el-col class="item_label" :span="8">优惠金额：</el-col>
				<el-col class="item_cont" :span="16">0.00</el-col>
			</el-row>
			<el-row class="pay_wrap" v-else-if="item.id == 11">
				<el-col class="item_label" :span="8">应付金额：</el-col>
				<el-col class="item_cont" :span="16">138.00</el-col>
			</el-row>
			<el-row class="remark_wrap" v-else-if="item.id == 12">
				<el-col class="item_cont" :span="24">请妥善保管购物凭证，多谢惠顾！</el-col>
			</el-row>
			<el-row class="goodDetail_wrap" v-else-if="item.id == 13">
				<el-col class="table_title" :span="10">品名</el-col>
				<el-col class="table_title" :span="4">数量</el-col>
				<el-col class="table_title" :span="4">金额</el-col>
				<el-col class="table_title" :span="6">小计</el-col>

				<el-col class="center" :span="10">MUTUKI爱心系列</el-col>
				<el-col class="center" :span="4">3</el-col>
				<el-col class="center" :span="4">23.00</el-col>
				<el-col class="center" :span="6">69.00</el-col>
				<el-col class="center" :span="10">MUTUKI爱心系列</el-col>
				<el-col class="center" :span="4">3</el-col>
				<el-col class="center" :span="4">23.00</el-col>
				<el-col class="center" :span="6">69.00</el-col>
			</el-row>
			<el-row class="payType_wrap" v-else-if="item.id == 14">
				<el-col class="item_label" :span="8">付款方式：</el-col><br>
				<el-col class="item_label" :span="8">现金：</el-col>
				<el-col class="item_cont" :span="16">38.00</el-col>
				<el-col class="item_label" :span="8">微信：</el-col>
				<el-col class="item_cont" :span="16">100.00</el-col>
			</el-row>
			<el-row class="member_wrap" v-else-if="item.id == 15">
				<el-col class="item_label" :span="8">会员号：</el-col>
				<el-col class="item_cont" :span="16">13147758521</el-col>

				<el-col class="item_label" :span="12">
					<el-row>
						<el-col class="item_label" :span="16">余额：</el-col>
						<el-col class="item_cont" :span="8">750.00</el-col>
					</el-row>
				</el-col>
				<el-col class="item_label" :span="12">
					<el-row>
						<el-col class="item_label" :span="14">积分：</el-col>
						<el-col class="item_cont" :span="10">900</el-col>
					</el-row>
				</el-col>
				<el-col class="item_label" :span="12">
					<el-row>
						<el-col class="item_label" :span="16">本次扣款：</el-col>
						<el-col class="item_cont" :span="8">50.00</el-col>
					</el-row>
				</el-col>
				<el-col class="item_label" :span="12">
					<el-row>
						<el-col class="item_label" :span="14">本次积分：</el-col>
						<el-col class="item_cont" :span="10">10</el-col>
					</el-row>
				</el-col>
				<el-col class="item_label" :span="12">
					<el-row>
						<el-col class="item_label" :span="16">剩余次数：</el-col>
						<el-col class="item_cont" :span="8">10</el-col>
					</el-row>
				</el-col>
				<el-col class="item_label" :span="12">
					<el-row>
						<el-col class="item_label" :span="14">已用次数：</el-col>
						<el-col class="item_cont" :span="10">10</el-col>
					</el-row>
				</el-col>
			</el-row>
			<el-row class="nowpay_wrap" v-else-if="item.id == 16">
				<el-col class="item_label" :span="8">收现：</el-col>
				<el-col class="item_cont" :span="16">138.00</el-col>
			</el-row>
			<el-row class="odd_wrap" v-else-if="item.id == 17">
				<el-col class="item_label" :span="8">找零：</el-col>
				<el-col class="item_cont" :span="16">8.00</el-col>
			</el-row>
			<el-row class="odd_wrap" v-else-if="item.id == 18">
				<el-col class="item_label" :span="8">交易类型：</el-col>
				<el-col class="item_cont" :span="16">会员充值</el-col>
			</el-row>
			<el-row class="odd_wrap" v-else-if="item.id == 19">
				<el-col class="item_label" :span="8">充值时间：</el-col>
				<el-col class="item_cont" :span="16">2019-02-12 14:21</el-col>
			</el-row>
			<el-row class="odd_wrap" v-else-if="item.id == 20">
				<el-col class="item_label" :span="8">充值金额：</el-col>
				<el-col class="item_cont" :span="16">142.00</el-col>
			</el-row>
			<el-row class="odd_wrap" v-else-if="item.id == 21">
				<el-col class="item_label" :span="8">赠送金额：</el-col>
				<el-col class="item_cont" :span="16">42.00</el-col>
			</el-row>
			<el-row class="odd_wrap" v-else-if="item.id == 22">
				<el-col class="item_label" :span="8">卡内余额：</el-col>
				<el-col class="item_cont" :span="16">242.00</el-col>
			</el-row>
			<el-row class="odd_wrap" v-else-if="item.id == 23">
				<el-col class="item_label" :span="8">会员卡号：</el-col>
				<el-col class="item_cont" :span="16">156****5673</el-col>
			</el-row>
			<el-row class="odd_wrap" v-else-if="item.id == 24">
				<el-col class="item_label" :span="8">会员姓名：</el-col>
				<el-col class="item_cont" :span="16">wwb</el-col>
			</el-row>
			<div class="blank_wrap" v-if="item.id == 100">
			</div>
			<div style="padding: 0 15px;" v-if="item.id == 101">
				<div class="split_wrap"></div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: [
        'printData'
    ],
	data(){
		return {

		}
	}
}
</script>
<style scoped>
.center{
	text-align: center;
}
.content_wrap{
	width: 300px;
	background: #ffffff;
	padding: 20px 0;
}
.logo_wrap{
	width: 100%;
	height: 37px;
	position: relative;
	text-align: center;
	line-height: 37px;
}
.code_wrap{
	width: 100%;
	height: 110px;
	text-align: center;
	line-height: 110px;
}
.logo_wrap div{
	width: 150px;
	height: 57px;
	line-height: 57px;
	text-align: center;
	background: rgba(0, 0, 0, 0.1);
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	margin: auto;
}
.mallName_wrap{
	font-weight: 600px;
	font-size: 16px;
	text-align: center;
	/* margin-bottom: 15px; */
	/* height: 27px; */
	/* line-height: 27px; */
}
.goodDetail_wrap{
	padding: 0 15px;
}
.item_label{
	text-align: right;
}
.item_cont{
	text-align: left;
	padding-left: 10px;
}
.footer_wrap{
	text-align: center;
	margin: 5px 0
}
.table_title{
	text-align: center;
	font-weight: 600;
	margin: 10px 0
}
.blank_wrap{
	height: 20px;
}
.split_wrap{
	height: 1px;
	border-top: 1px dashed #333;
	margin: 7px 0;
}
.remark_wrap .item_cont{
	text-align: center;
}
</style>