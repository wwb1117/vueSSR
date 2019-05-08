<template>
    <div>
        <div class="model_topcol">
            <span>打印设置</span>
        </div>
        <div class="model_content printSet_wrap">
            <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
                <div class="print_wrap">
                    <h3 style="margin-top: 10px">收银小票</h3>
                    <print-view :printData="tagList1"></print-view>
                    <div class="btn_wrap">
                        <el-button v-perss='185' type="primary" @click="editCashEvent" size="small" style="width: 90px;">编辑模板</el-button>
                    </div>
                </div>
                <div class="print_wrap">
                    <h3 style="margin-top: 10px">充值小票</h3>
                    <print-view :printData="tagList2"></print-view>
                    <div class="btn_wrap">
                        <el-button v-perss='185' type="primary" @click="editChargeEvent" size="small" style="width: 90px;">编辑模板</el-button>
                    </div>
                </div>

            </div>
        </div>
        <div class="model_footer">
            <!-- <el-button type="primary" size="small" style="width: 90px; margin-left: 25px;">保存</el-button> -->
            <!-- <el-button size="small" style="width: 90px; margin-left: 25px;">取消</el-button> -->

        </div>
    </div>
</template>

<script>
import printView from 'components/printView'
export default {
    components: {
        printView
    },
    data () {
        return {
            tagList1: [
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
                { name: '备注', id: 12 }
            ],
            tagList2: [
                { name: 'LOGO', id: 1 },
				{ name: '店铺名称', id: 2 },
				{ name: '空白行', id: 100 },
                { name: '交易类型', id: 18 },
                { name: '充值时间', id: 19 },
                { name: '收银员', id: 5 },
                { name: '导购员', id: 6 },
                { name: '分割线', id: 101 },
                { name: '会员卡号', id: 23 },
                { name: '会员姓名', id: 24 },
                { name: '充值金额', id: 20 },
                { name: '赠送金额', id: 21 },
                { name: '卡内余额', id: 22 },
                { name: '分割线', id: 101 },
                { name: '付款方式', id: 14 },
                { name: '收现', id: 16 },
                { name: '找零', id: 17 },
                { name: '二维码', id: 4 },
				{ name: '页脚', id: 3 },
				{ name: '备注', id: 12 }
            ],
            tagListAll: [
                { name: 'LOGO', id: 1 },
                { name: '店铺名称', id: 2 },
                { name: '页脚', id: 3 },
                { name: '二维码', id: 4 },
                { name: '收银员', id: 5 },
                { name: '导购员', id: 6 },
                { name: '单号', id: 7 },
                { name: '下单时间', id: 8 },
                { name: '合计', id: 9 },
                { name: '优惠金额', id: 10 },
                { name: '应付金额', id: 11 },
                { name: '备注', id: 12 },
                { name: '商品明细', id: 13 },
                { name: '付款方式', id: 14 },
                { name: '会员信息', id: 15 },
                { name: '收现', id: 16 },
                { name: '找零', id: 17 },

                { name: '交易类型', id: 18 },
                { name: '充值时间', id: 19 },
                { name: '充值金额', id: 20 },
                { name: '赠送金额', id: 21 },
                { name: '卡内余额', id: 22 },
                { name: '会员卡号', id: 23 },
                { name: '会员姓名', id: 24 },

                { name: '空白行', id: 100 },
                { name: '分割线', id: 101 }
            ]
        }
    },
    methods: {
        editCashEvent () {
            this.$router.push({
                path: '/printSet/editCash'
            })
        },
        editChargeEvent () {
            this.$router.push({
                path: '/printSet/editRecharge'
            })
        }
    },
    computed: {},
    created () { },
    activated () {

    },
    mounted () { }
}
</script>
<style scoped>
.print_wrap {
    float: left;
    margin: 0 50px;
    width: 300px;
    height: 700px;
}
.print_wrap h3 {
    text-align: center;
}
.btn_wrap {
    text-align: center;
    padding-top: 20px;
}
</style>