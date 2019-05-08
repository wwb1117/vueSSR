<template>
	<div>
		<div class="model_topcol">
			<span class="font600">打印设置</span>
			<span> - 编辑模板</span>
		</div>
		<div class="model_content printSet_wrap">
			<div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
				<el-row>
					<el-col class="border" :span="10">
						<div class="banner">
							收银小票基本信息设置
						</div>
						<div style="margin-top: 30px; padding-bottom: 30px">
							<el-form ref="printBaseForm" class="myForm" :inline="true" :model="printBaseForm" label-position="right" size="small" label-width="120px">
								<el-form-item prop="shopName" label="店铺名称">
									<el-input v-model="printBaseForm.shopName" placeholder="请输入店铺名称"></el-input>
									<el-radio-group v-model="printBaseForm.fontSize">
										<el-radio :label="0">默认</el-radio>
										<el-radio :label="1">16号字</el-radio>
										<el-radio :label="2">18号字</el-radio>
										<el-radio :label="3">20号字</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="顶部LOGO">
									<div style="display: inline-block">
										<el-upload
										:action="uploadURL"
										ref="imgLicenseUpload"
										:data="sendData"
										:show-file-list="false"
										list-type="picture-card"
										:on-success="handleAvatarSuccess1"
										>
										<img style="width: 139px; height: 139px;" v-if="printBaseForm.topLogo" :src="printBaseForm.topLogo" class="avatar">
										<i v-if="!printBaseForm.topLogo" class="el-icon-plus"></i>
										</el-upload>
										<span class="card_tip">仅支持JPG、BMP、JPEG格式，图片尺寸 130px * 80px</span>
									</div>
                        		</el-form-item>
								<el-form-item prop="footer" label="页脚">
									<el-input style="width: 290px" type="textarea" :rows="3" v-model="printBaseForm.footer" placeholder="请输入页脚内容"></el-input>
								</el-form-item>
								<el-form-item label="二维码信息">
									<!-- <div style="display: inline-block">
										<el-upload
										:action="uploadURL"
										ref="imgLicenseUpload"
										:data="sendData"
										:show-file-list="false"
										list-type="picture-card"
										:on-success="handleAvatarSuccess2"
										>
										<img style="width: 139px; height: 139px;" v-if="printBaseForm.qrCode" :src="printBaseForm.qrCode" class="avatar">
										<i v-if="!printBaseForm.qrCode" class="el-icon-plus"></i>
										</el-upload>
										<span class="color_red">微商城二维码，方便营销</span><br>
										<span class="card_tip">仅支持JPG、BMP、JPEG格式，图片尺寸 130px * 80px</span>
									</div> -->
									<el-input style="width: 290px" type="textarea" :rows="3" v-model="printBaseForm.qrCode" placeholder="请输入二维码信息"></el-input>
                        		</el-form-item>
								<el-form-item prop="remark" label="备注">
									<el-input style="width: 290px" type="textarea" :rows="3" v-model="printBaseForm.remark" placeholder="请输入备注内容"></el-input>
								</el-form-item>

							</el-form>
						</div>
					</el-col>
					<el-col class="border" style="margin: 0 10px" :span="10">
						<div class="banner">模板编辑区</div>
						<div style="padding: 15px; border-bottom: 1px solid #e4e8eb">
							<div class="font600">标签池</div>
							<draggable @add="tagAddEvent" class="list-group" element="ul" v-model="tagList" :options="dragOptions">
								<transition-group type="transition" :name="'flip-list'">
									<el-tag
										class="tag_item"
										v-for="item in tagList"
										:key="item.id"
										:id="item.id"
										>
										{{item.name}}
									</el-tag>
								</transition-group>
							</draggable>
						</div>
						<div class="middle_title">
							拖拽标签池标签到以下区域，鼠标拖动可以更换元素位置
						</div>
						<div>
							<draggable @add="dragAddEvent" class="list-group print_listgroup" element="ul" v-model="printBaseForm.template" :options="dragOptions2">
								<transition-group type="transition" :name="'flip-list'">
									<li class="printList_item" :id="item.id" v-for="item in printBaseForm.template" :key="item.id">
										<div v-if="item.id == 13">
											<el-tag style="margin-bottom: 5px" @close="printCloseEvent(item.id, item.name)" closable>{{item.name}}</el-tag>
											<br>
											<el-tag style="width: 150px" color="#fff">品名</el-tag>
											<el-tag style="width: 90px" color="#fff">数量</el-tag>
											<el-tag style="width: 90px" color="#fff">金额</el-tag>
											<el-tag style="width: 90px" color="#fff">小计</el-tag>
										</div>
										<div v-else-if="item.id == 15">
											<el-tag style="margin-bottom: 5px" @close="printCloseEvent(item.id, item.name)" closable>{{item.name}}</el-tag>
											<br>
											<el-tag style="width: 180px" color="#fff">会员号</el-tag>
											<br>
											<el-tag style="width: 90px" color="#fff">余额</el-tag>
											<el-tag style="width: 90px" color="#fff">积分</el-tag>
											<br>
											<el-tag style="width: 90px" color="#fff">本次扣款</el-tag>
											<el-tag style="width: 90px" color="#fff">本次积分</el-tag>
											<br>
											<el-tag style="width: 90px" color="#fff">剩余次数</el-tag>
											<el-tag style="width: 90px" color="#fff">已用次数</el-tag>
										</div>
										<el-tag @close="printCloseEvent(item.id, item.name)" v-else closable>{{item.name}}</el-tag>
									</li>
								</transition-group>
							</draggable>
						</div>

					</el-col>
					<el-col :span="3">
						<el-button @click="printLookEvent" style="margin: 0px 0 10px" type="primary" size="small" class="wid90">预览</el-button>
						<br>
						<el-button @click="printTestEvent" style="margin: 10px 0" size="small" class="wid90">打印测试</el-button>
						<br>
						<el-button @click="tagsResetEvent" style="margin: 10px 0" size="small" class="wid90">重置</el-button>
					</el-col>
				</el-row>

			</div>
		</div>
		<div class="model_footer">
			<el-button @click="pageCansoleEvent" size="small" style="width: 90px; margin-left: 25px;">取消</el-button>
			<el-button @click="setCashPrintData" type="primary" size="small" style="width: 90px; margin-left: 25px;">保存</el-button>
		</div>
		<el-dialog
			title="预览"
			:close-on-click-modal="false"
			:visible.sync="printDialogVisible"
			width="340px"
			>
			
			<print-view ref="cashPrintLook" :printData="printBaseForm.template"></print-view>
			<!-- <span slot="footer" class="dialog-footer">
				<el-button class="wid90" size="small" @click="printDialogVisible = false">取 消</el-button>
				<el-button class="wid90" size="small" type="primary" @click="printDialogVisible = false">确 定</el-button>
			</span>	 -->
		</el-dialog>
		
	</div>
</template>

<script>
    import api from 'api/setting'
	import draggable from 'vuedraggable'
	import printView from 'components/printView'
	export default {
		components: {
			draggable,
			printView
		},
		data() {
			return {
				printDialogVisible: false,
				dragOptions: {
					animation: 0,
					group: "description",
					ghostClass: "ghost"
				},
				dragOptions2: {
					animation: 0,
					group: "description",
					ghostClass: "ghost"
				},
				uploadURL: this.$store.state.home.baseUrl + '/f/upload',
				sendData: {
					file: "",
					uploadType: 'pos-shop'
				},
				tagListCopy: [],
				tagList: [
					{ name: 'LOGO', id: 1 },
					{ name: '店铺名称', id: 2 },
					{ name: '页脚', id: 3 },
					{ name: '二维码', id: 4},
					{ name: '收银员', id: 5 },
					{ name: '导购员', id: 6 },
					{ name: '单号', id: 7 },
					{ name: '下单时间', id: 8 },
					{ name: '合计', id: 9 },
					{ name: '优惠金额', id: 10 },
					{ name: '应付金额', id: 11 },
					{ name: '备注', id: 12},
					{ name: '商品明细', id: 13 },
					{ name: '付款方式', id: 14 },
					{ name: '会员信息', id: 15 },
					{ name: '收现', id: 16 },
					{ name: '找零', id: 17 },
					{ name: '空白行', id: 100},
					{ name: '分割线', id: 101}
				],
				printList: [
					{ name: 'LOGO', id: 1 },
					{ name: '店铺名称', id: 2 },
					{ name: '空白行', id: 100 },
					{ name: '单号', id: 7 },
					{ name: '下单时间', id: 8 },
					{ name: '收银员', id: 5 },
					{ name: '导购员', id: 6 },
					{ name: '分割线', id: 101 },
					{ name: '商品明细', id: 13 },
					{ name: '分割线', id: 24 },
					{ name: '合计', id: 9 },
					{ name: '优惠金额', id: 10 },
					{ name: '应付金额', id: 11 },
					{ name: '付款方式', id: 14 },
					{ name: '收现', id: 16 },
					{ name: '找零', id: 17 },
					{ name: '分割线', id: 101 },
					{ name: '会员信息', id: 15 },
					{ name: '页脚', id: 3 },
					{ name: '备注', id: 12}
				],
				printBaseForm: {
					remark: '请妥善保管购物凭证，多谢惠顾！',
					shopName: '妈妈去哪儿（杭州店）',
					fontSize: 0,
					footer: '欢迎下次光临',
					template: []
				}
			}
		},
		methods: {
			printTestEvent(){
				this.$print(this.$refs.cashPrintLook)
			},
			printLookEvent(){
				this.printDialogVisible = true
			},
			handleAvatarSuccess1(res, file){
				this.printBaseForm.topLogo = res.data.url
			},
			handleAvatarSuccess2(res, file){
				this.printBaseForm.qrCode = res.data.url
			},
			flilterTagList(){
				for(let i = this.tagList.length - 1; i >= 0; i--){
					let id = this.tagList[i].id

					if (id != 100 && id != 101) {
						if (this.isPrintListHave(id)) {
							this.tagList.splice(i, 1)
						}
					}
				}
			},
			isPrintListHave(id){
				let flg = false

				for(let item of this.printBaseForm.template){
					if (item.id == id) {
						flg = true
						break 
					}
				}
				return flg
			},
			tagsResetEvent(){
				this.tagList = [
					{ name: '二维码', id: 4},
					{ name: '空白行', id: 100},
					{ name: '分割线', id: 101}
				]
				this.printBaseForm.template = this.printList
			},
			dragAddEvent(com){
				if (com.item.id == 100) {
					this.tagList.push({ name: '空白行', id: 100})
				}
				if (com.item.id == 101) {
					this.tagList.push({ name: '分割线', id: 101})
				}
			},
			tagAddEvent(com){
				if (com.item.id == 100) {
					for (var i = this.tagList.length - 1; i >= 0; i--) {
						if (this.tagList[i].id == 100) {
							this.tagList.splice(i, 1)
							break
						}
					}
				}
				if (com.item.id == 101) {
					for (var j = this.tagList.length - 1; j >= 0; j--) {
						if (this.tagList[j].id == 101) {
							this.tagList.splice(j, 1)
							break
						}
					}
				}
			},
			printCloseEvent(id, name){
				for (var j = this.printBaseForm.template.length - 1; j >= 0; j--) {
					if (this.printBaseForm.template[j].id == id) {
						this.printBaseForm.template.splice(j, 1)
						break
					}
				}
				if (id != 100 && id != 101) {
					this.tagList.push({
						id,
						name
					})
				}
			},
			pageCansoleEvent(){
				this.$router.push({
					path: '/printSet'
				})
			},
			getCashPrintData(){
				api.getPayMentData().then((response) => {
					this.printBaseForm = response.data
					if (this.printBaseForm.template == '') {
						this.printBaseForm.template = this.printList
					} else {
						this.printBaseForm.template = JSON.parse(this.printBaseForm.template)
					}
					this.flilterTagList()
				})
			},
			setCashPrintData(){
				api.setPayMentData(this.printBaseForm).then((response) => {
					this.$message({
						type: 'success',
						duration: 1500,
						showClose: true,
						message: '收银小票模板编辑成功！'
					})
					this.$router.push({
						path: '/printSet'
					})
				})
			}
		},
		computed: {},
		created() {},
		activated() {
			this.getCashPrintData()
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
.border{
	background: #ffffff
}
.flip-list-move {
	transition: transform 0.5s;
}

.no-move {
	transition: transform 0s;
}

.ghost {
	opacity: 0.8;
}

.print_listgroup>span{
	display: inline-block;
	width: 100%;
	height: 357px;
}

.printList_item{
	cursor: move;
	padding: 10px 0;
	padding-left: 15px; 
	border-bottom: 1px solid #e4e8eb;
	/* border-top: none; */
}
.tag_item{
	cursor: move;
	margin: 5px 10px 5px 0px;
}
.middle_title{
	height: 37px;
	color: #333;
	background: #f5f5f5;
	line-height: 37px;
	text-align: right;
	padding-right: 15px;
}

</style>