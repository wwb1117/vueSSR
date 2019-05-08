<template>
    <div class="main_wrap">
        <!-- <div class="main_top" v-text="$store.state.home.userInfo.user.buyerCompanyName"></div> -->
        <div class="main_top">你好！ <span v-text="$store.state.home.currentShop.shopName"></span>，欢迎回来</div>
        <div class="main_content">
            <div class="main_cont_left">
                <ul class="main_jianbao_ul">
                    <div class="main_cont_left_top">
                        便捷导航
                    </div>
                    <li @mouseenter="showActive(1)" @mouseleave="showActive(0)">
                        <img v-show="active !== 1" src="../../../public/img/shouYe/main01.png" alt="">
                        <img v-show="active == 1" src="../../../public/img/shouYe/main1.png" alt="">
                        <span>商品分类</span>
                    </li>
                    <li @mouseenter="showActive(2)" @mouseleave="showActive(0)">
                        <img v-show="active !== 2" src="../../../public/img/shouYe/main02.png" alt="">
                        <img v-show="active == 2" src="../../../public/img/shouYe/main2.png" alt="">
                        <span>会员资料</span>
                    </li>
                    <li @mouseenter="showActive(3)" @mouseleave="showActive(0)">
                        <img v-show="active !== 3" src="../../../public/img/shouYe/main03.png" alt="">
                        <img v-show="active == 3" src="../../../public/img/shouYe/main3.png" alt="">
                        <span>销售单据</span>
                    </li>
                    <li @mouseenter="showActive(4)" @mouseleave="showActive(0)">
                        <img v-show="active !== 4" src="../../../public/img/shouYe/main04.png" alt="">
                        <img v-show="active == 4" src="../../../public/img/shouYe/main4.png" alt="">
                        <span>营销管理</span>
                    </li>
                    <li @mouseenter="showActive(5)" @mouseleave="showActive(0)">
                        <img v-show="active !== 5" src="../../../public/img/shouYe/main05.png" alt="">
                        <img v-show="active == 5" src="../../../public/img/shouYe/main5.png" alt="">
                        <span>商品维护</span>
                    </li>
                    <li @mouseenter="showActive(6)" @mouseleave="showActive(0)">
                        <img v-show="active !== 6" src="../../../public/img/shouYe/main06.png" alt="">
                        <img v-show="active == 6" src="../../../public/img/shouYe/main6.png" alt="">
                        <span>员工维护</span>
                    </li>
                    <li @mouseenter="showActive(7)" @mouseleave="showActive(0)">
                        <img v-show="active !== 7" src="../../../public/img/shouYe/main07.png" alt="">
                        <img v-show="active == 7" src="../../../public/img/shouYe/main7.png" alt="">
                        <span>货流管理</span>
                    </li>
                    <li @mouseenter="showActive(8)" @mouseleave="showActive(0)">
                        <img v-show="active !== 8" src="../../../public/img/shouYe/main08.png" alt="">
                        <img v-show="active == 8" src="../../../public/img/shouYe/main8.png" alt="">
                        <span>库存查询</span>
                    </li>
                </ul>
                <div class="main_jianbao_ul main_shop_ul">
                    <div class="main_cont_left_top">
                        <span>门店选择</span>
                        <el-select filterable v-model="shopKind" size="small" placeholder="全部门店" style="margin-left:10px;">
                            <el-option v-for="item in mallList" :key="item.id" :label="item.mallName" :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <!-- <ul>
                        
                    </ul> -->
                    <ul>
                        <li>
                            <span>3568</span>
                            <span>商品数量</span>
                        </li>
                        <li>
                            <span>30524</span>
                            <span>商品库存</span>
                        </li>
                        <li>
                            <span>1380.00</span>
                            <span>今日销售额</span>
                        </li>
                        <li>
                            <span>12</span>
                            <span>今日单数</span>
                        </li>
                        <li>
                            <span>58</span>
                            <span>今日销量</span>
                        </li>
                        <li>
                            <span>586.50</span>
                            <span>今日利润</span>
                        </li>
                    </ul>
                </div>
                <div id="main_chart_wrap">
                    <div id="main_chart_left">
                        <Echart :option="echartOpt"></Echart>
                    </div>
                    <div id="main_chart_right">
                        <div class="main_cont_left_top">
                            近七日热卖商品
                        </div>
                        <ul>
                            <li v-for="todo in hotData" v-bind:key="todo.id">
                                <img src="../../../public/img/shouYe/hotSale.png" alt="">
                                <div>
                                    <div>{{todo.name}}</div>
                                    <div>
                                        <span>{{todo.priceName}}:</span>
                                        <span>￥{{todo.price}}</span>
                                    </div>
                                    <div>
                                        <span>{{todo.sale}}：</span>
                                        <span>{{todo.saleNum}}</span>
                                    </div>
                                </div>
                            </li>
                            <!-- <li>
                                <img src="../../../public/img/shouYe/hotSale.png" alt="">
                                <div>
                                    <div>MUTUKI纸尿裤</div>
                                    <div>
                                        <span>价格:</span>
                                        <span>￥210</span>
                                    </div>
                                    <div>
                                        <span>销量：</span>
                                        <span>8960</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <img src="../../../public/img/shouYe/hotSale.png" alt="">
                                <div>
                                    <div>MUTUKI纸尿裤</div>
                                    <div>
                                        <span>价格:</span>
                                        <span>￥210</span>
                                    </div>
                                    <div>
                                        <span>销量：</span>
                                        <span>8960</span>
                                    </div>
                                </div>
                            </li> -->
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Echart from 'components/Echart'
export default {
    name: 'main',
    components: {
        Echart
    },
    data () {
        return {
            active: 0,
            mallList: [],
            echartOpt: {
                title: {
                    text: '近七日销售情况',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data: ['销售金额', '销售量']
                },
                xAxis: {
                    type: 'category',
                    data: ['09.24', '09.25', '09.26', '09.27', '09.28', '09.29', '09.30']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '销售量',
                        data: [20, 50, 80, 180, 90, 130, 320],
                        type: 'line'
                    },
                    {
                        name: '销售金额',
                        data: [120, 80, 60, 270, 40, 30, 300],
                        type: 'line'
                    }
                ]
            },
            shopKind: '',
            hotData: [
                {
                    name: 'MUTUKI纸尿裤',
                    priceName: '价格',
                    price: '210',
                    sale: '销量',
                    saleNum: '8960',
                },
                {
                    name: 'MUTUKI纸尿裤',
                    priceName: '价格',
                    price: '210',
                    sale: '销量',
                    saleNum: '8960',
                },
                {
                    name: 'MUTUKI纸尿裤',
                    priceName: '价格',
                    price: '210',
                    sale: '销量',
                    saleNum: '8960',
                },
                {
                    name: 'MUTUKI纸尿裤',
                    priceName: '价格',
                    price: '210',
                    sale: '销量',
                    saleNum: '8960',
                },
                {
                    name: 'MUTUKI纸尿裤',
                    priceName: '价格',
                    price: '210',
                    sale: '销量',
                    saleNum: '8960',
                },
                {
                    name: 'MUTUKI纸尿裤',
                    priceName: '价格',
                    price: '210',
                    sale: '销量',
                    saleNum: '8960',
                },
                {
                    name: 'MUTUKI纸尿裤',
                    priceName: '价格',
                    price: '210',
                    sale: '销量',
                    saleNum: '8960',
                },
                {
                    name: 'MUTUKI纸尿裤',
                    priceName: '价格',
                    price: '210',
                    sale: '销量',
                    saleNum: '8960',
                },
                {
                    name: 'MUTUKI纸尿裤',
                    priceName: '价格',
                    price: '210',
                    sale: '销量',
                    saleNum: '8960',
                },
                {
                    name: 'MUTUKI纸尿裤',
                    priceName: '价格',
                    price: '210',
                    sale: '销量',
                    saleNum: '8960',
                }
            ]
        }

    },
    methods: {
        showActive (index) {
            this.active = index;
        }
    },
    activated () {

    }

}
</script>

<style scoped>
.main_jianbao_ul li {
    cursor: pointer;
}
.main_wrap {
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    overflow: auto;
}
.main_top {
    height: 46px;
    border-bottom: 1px solid #e4e7ed;
    font-size: 18px;
    color: #606266;
    line-height: 46px;
    padding-left: 25px;
    background: #ffffff;
}
.main_content {
    padding: 10px;
    min-width: 1400px;
}
.main_cont_left_top {
    height: 44px;
    color: #2a3542;
    font-size: 16px;
}
ul {
    list-style: none;
}
.main_jianbao_ul {
    list-style: none;
    height: 164px;
    background: #ffffff;
    padding: 10px;
}
.main_jianbao_ul > li {
    width: 120px;
    height: 80px;
    float: left;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    text-align: center;
    margin-left: 40px;
}
.main_jianbao_ul > li:hover {
    background: #409eff;
    color: #fff;
}
.main_jianbao_ul > li > img {
    width: 24px;
    height: 24px;
    /* display: block; */
    margin-top: 10px;
}
.main_jianbao_ul > li > span {
    margin-top: 10px;
    display: block;
}
.main_jianbao_ul > li:nth-of-type(1) {
    margin-left: 35px;
}
.main_shop_ul {
    height: 164px;
    margin-bottom: 10px;
}
.main_shop_ul ul {
    overflow: hidden;
    margin-top: 30px;
    padding: 0;
}
.main_shop_ul ul > li {
    width: 16.6%;
    height: 60px;
    float: left;
    text-align: center;
    border-right: 1px solid #ebedf1;
}

.main_shop_ul ul > li:last-child {
    border-right: none;
}
.main_shop_ul ul > li > span {
    display: block;
}

.main_shop_ul ul > li > span:nth-of-type(1) {
    color: #2a3542;
    font-size: 24px;
}
.main_shop_ul ul > li > span:nth-of-type(2) {
    color: #6e7381;
    font-size: 14px;
}

#main_chart_wrap {
    width: 100%;
    height: 370px;
    padding: 0 10px;
    background: #ffffff;
}
#main_chart_wrap > div {
    float: left;
    width: 50%;
    padding-top: 10px;
    height: 100%;
}
#main_chart_wrap > div:nth-of-type(1) {
    border-right: 5px solid #f5f5f5;
}
#main_chart_wrap > div:nth-of-type(2) {
    border-left: 5px solid #f5f5f5;
}
#main_chart_left {
    width: 20%;
    height: 100%;
}
#main_chart_right .main_cont_left_top {
    margin-left: 10px;
    font-weight: 600;
    color: #333333;
    font-size: 18px;
}
#main_chart_right ul {
    padding: 0;
    overflow-y: scroll;
    height: 300px;
}
#main_chart_right ul > li {
    height: 100px;
    width: 100%;
    border-bottom: 2px solid #ebedf1;
    overflow: hidden;
}
#main_chart_right ul > li:last-child {
    border-bottom: none;
}
#main_chart_right ul img {
    width: 70px;
    height: 70px;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    vertical-align: middle;
    margin-left: 30px;
    margin-top: 18px;
    float: left;
}
#main_chart_right ul li > div {
    margin-top: 18px;
}
#main_chart_right ul li div > div {
    font-size: 14px;
    line-height: 24px;
    margin-left: 130px;
}
#main_chart_right ul li div > div:nth-of-type(1),
#main_chart_right ul li div > div:nth-of-type(3) > span:nth-of-type(2) {
    color: #2a3542;
    font-weight: 600;
}
#main_chart_right ul li div > div:nth-of-type(2) > span:nth-of-type(2) {
    color: #f56c6c;
}
</style>
