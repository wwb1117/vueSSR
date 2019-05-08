<template>
	<div>
		<div class="model_topcol">
			<span class="font600">库存</span>
			<span> - 库存查询</span>
		</div>
		<div class="model_content">
			<div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">


			</div>
		</div>
		<div class="model_footer">
			<el-button size="small" style="width: 90px; margin-left: 25px;">取消</el-button>
			<el-button type="primary" size="small" style="width: 90px; margin-left: 25px;">保存</el-button>

			<!-- 底部是分页 -->
			<!-- <el-pagination
                :current-page="tableParam.pageNo"
                :page-sizes="[15, 30, 50, 100]"
                :page-size="15"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalPage">
            </el-pagination> -->
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
		activated() {

		},
		mounted() {}
	}
</script>
<style scoped>

</style>