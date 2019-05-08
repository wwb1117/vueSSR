<template>
	<div>
		<div class="model_topcol">
			<span class="font600">会员资料</span>
			<span> - 导入</span>
		</div>
		<div class="model_content">
			<div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
				<div style="padding: 15px;overflow: hidden">
					<step-bar :stepTexts="stepTexts" :currentStep="currentStep"></step-bar>
                </div>
                <div v-if='this.currentStep == 1'>
                    <div style="padding:10px 20px">
                        <p>1.选择导出类型</p>
                        <div class='second_inner_black'>
                            <el-select v-model="value" placeholder="请选择导入类型" size='small'>
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label" 
    
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <el-button size='small' style="margin-left:20px"><i class="el-icon-download"></i>下载导入数据文件模板</el-button>
                        </div>
                    </div>
                    <div style="padding:10px 20px">
                        <p>2.导入数据文件</p>
                        <div class='second_inner_black'>
                            <el-input size='small' style="width:30%" clearable prefix-icon="el-icon-search" placeholder="请输入导入文件"></el-input>
                            <el-upload
                                style="margin-left:20px;display: inline-block;"
                                class="upload-demo"
                                :data="sendData"
                                :action="uploadURL"
                                :show-file-list="false"
                                :file-list="fileList">
                                <el-button size="small" type="primary" class='wid90'>导入</el-button>
                            </el-upload>
                        </div>
                    </div>
                    <div style="padding:10px 20px;color:#9A999F">
                        <p><i class='el-icon-warning' style="color:#EAAE4C;margin-right:5px"></i>1.导入文件为.xls或.xlsx的excel文件，一次不超过1000条记录</p>
                        <p style="margin-left:20px">2.如果会员资料更新中，存在和导入会员一样的编号则会对会员进行更新。如果没有，进行新增会员处理。</p>
                    </div>
                </div>
                <!-- <div v-if='this.currentStep == 2' style="padding:10px;text-align: center">
                    <h3 style="margin-top:10%;color:#6FBD28;font-weight: 700">恭喜您</h3>
                    <p style="font-size:18px;">共有<span style="color:#6FBD28">36</span>条数据导入成功</p>
                </div> -->
                <div v-if='this.currentStep == 2' style="padding:10px;text-align: center;font-size:16px">
                    <h3 style="margin-top:10%;color:#F56C6C;font-weight: 700">导入失败</h3>
                    <p>共有6条数据，成功导入<span style="color:#6FBD28">36</span>条，失败导入<span style="color:#F56C6C">0</span>条</p>
                    <p style="font-weight:700;margin-top:40px">导入失败的原因可能有</p>
                    <p>1、系统中没有指定商品存在</p>
                    <p>2、盘点数量不能为空</p>
                    <p>3、商品编码、商品名称、商品规格完全相同的多条商品</p>
                    <el-button size='small' style="margin:20px 0"><i class="el-icon-download"></i>下载导入失败的数据</el-button>
                    <p style="color:#878A90">按上述要求检查修改后，重新上传</p>
                </div>
            </div>
        </div>
		<div class="model_footer">
            <el-button type="primary" size="small" @click='next' v-if='this.currentStep == 1' style="width: 90px; margin-left: 25px; float: left;">下一步</el-button>
            <el-button size="small" @click='goback()' v-if='this.currentStep == 2' style="width: 90px; margin-left: 25px; float: left;">返回</el-button>
		</div>
	</div>
</template>

<script>
	import stepBar from 'components/stepBar'
	
	export default {
		components: {
			stepBar
		},
		data() {
			return {
                uploadURL: '',
                sendData: {
                    file: '',
                    uploadType: 'cms-item'
                },
                fileList: [],
                options: [{   
                value: '选项1',
                label: '1111'
                }, {
                value: '选项2',
                label: '222222'
                }],
                value: '',
				totalPage: 10,
				tableParam: {
					pageNo: 1,

				},
				stepTexts: ['1.批量导入', '2.完成'],
				currentStep: 1
			}
        },
        activated() {
            this.currentStep = 1
        },
		methods: {
            next(){
                this.currentStep++
            },
			goback(){
				this.$router.push({
					path: '/memberList'
				})
			}
		},
		computed: {},
		created() {},
		
		mounted() {}
	}
</script>
<style scoped lang='scss'>
	.header_seach_wrap>div {
		margin-right: 10px;
	}
	.header_seach_wrap>div>span{
		margin-right: 10px;
	}
    .second_inner_black{
        margin-bottom:10px;
        padding: 20px 10px;
        /* margin-left:70px; */
        background: #F8F8F8;
        span:first-child{
            margin-left:20px;
            margin-right:50px;
            .chooseLength{
                color: #409EFF;margin:0 5px
            }
        }
    }
</style>