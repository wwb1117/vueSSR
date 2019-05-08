<template>
    <div class="newGood">
        <div class="model_topcol">
            <span class="font600">商品资料</span>-<span>{{headTitle}}</span>
        </div>
        <div class="model_content">
            <div class="model_content_inner"
                 :style="{height: $store.state.home.modelContentHeight - 20 + 'px', overflow: 'auto'}">
                <el-form :model="formData" :rules="rules" ref="ruleForm" class="demoForm" label-width="122px">
                    <div class="title">
                        基本信息
                    </div>
                    <el-form-item label="商品名称" prop="itemName">
                        <el-input size="small" style="width:224px" v-model="formData.itemName"
                                  placeholder="请输入商品名称"></el-input>
                        <span style="margin-left:10px;">
                            <el-button v-if="type == 1" type="primary" size="small" @click="showSelect = true">选择模板创建商品</el-button>
                        </span>
                    </el-form-item>
                    <el-form-item label="商品分类" prop="categoryId">
                        <el-cascader
                                style="width: 360px;"
                                :options="categoryList"
                                v-model="formData.categoryId"
                                clearable
                                :show-all-levels="false"
                                :props="{
                                    value: 'id',
                                    label: 'categoryName',
                                    children: 'categoryList'
                                }"
                                @change="categoryChange">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="商品品牌" prop="brandId">
                        <el-select v-model="formData.brandId" clearable style="width:360px" size="small" placeholder="请选择商品品牌">
                            <el-option v-for="item in brandList" :key="item.id" :label="item.brandName"
                                       :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否启用" v-perss='83'>
                        <el-radio-group v-model="formData.enableStatus">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <div class="title">
                        价格库存<span class="litLabel">是否启用规格</span>
                        <el-radio-group v-model="formData.isSpecification" :disabled="this.type == '2'">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                    </div>
                    <!--不启用规格-->
                    <div v-show="!formData.isSpecification">
                        <div style="display:flex">
                            <el-form-item label="条码" prop="skuItemBarcode">
                                <el-input size="small" style="width:294px" v-model="formData.skuItemBarcode"
                                          placeholder="请输入商品条码"></el-input>
                                <span style="margin-left:10px;">
                                    <el-button type="primary" size="small" @click="creatBarcode">生成</el-button>
                                </span>
                            </el-form-item>
                            <el-form-item label="商品编码" prop="skuItemEncoding">
                                <el-input size="small" style="width:294px" v-model="formData.skuItemEncoding"
                                          placeholder="请输入商品编码"></el-input>
                                <span style="margin-left:10px;">
                                    <el-button type="primary" size="small" @click="creatEncode">生成</el-button>
                                </span>
                                <!--<el-checkbox v-model="equalCode" style="margin-left: 10px">与条码一致</el-checkbox>-->
                            </el-form-item>
                        </div>
                        <div style="display:flex">
                            <el-form-item label="售价" prop="skuSellPrice">
                                <el-input size="small" style="width:360px" v-model="formData.skuSellPrice"
                                          placeholder="请输入售价">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="进价" prop="skuPurchasePrice">
                                <el-input size="small" style="width:360px" v-model="formData.skuPurchasePrice"
                                          placeholder="请输入进价">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                        </div>
                        <div style="display: flex;">
                            <el-form-item label="库存" prop="stockNum">
                                <el-input size="small" style="width:360px" v-model="formData.stockNum"
                                          placeholder="请输入库存">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="规格" v-if="this.type == '2'" prop="skuProperties">
                                <el-input size="small" style="width:360px" v-model="formData.skuProperties"
                                          readonly>
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <!--启用规格-->
                    <div v-show="formData.isSpecification">
                        <div style="padding: 0 0 20px 20px">
                            根据需要，自行添加规格 <el-button size="small" type="primary" @click="addSku">添加规格</el-button>
                        </div>
                        <div class="skuWrap">
                            <div class="skuCon" v-for="(skuItem, index) in skuList" :key="index">
                                <el-row>
                                    <el-col :span="2" style="text-align: right;margin-right: 10px"><span>规格名</span></el-col>
                                    <el-col :span="20">
                                        <el-input size="small" style="width:360px;margin-right: 10px;"
                                                  :disabled="skuItem.disabled"
                                                  placeholder="请输入规格名称，如：颜色" v-model="skuItem.skuName"></el-input>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="2" style="text-align: right;margin-right: 10px"><span>规格值</span></el-col>
                                    <el-col :span="20">
                                        <el-checkbox-group v-model="skuItem.checkList" style="overflow: hidden;display: flex;flex-wrap: wrap">
                                            <div v-for="(skuChild, index2) in skuItem.skuValue" :key="index2" style="position: relative">
                                                <el-checkbox :disabled="skuChild.disabled"  :label="index2" :key="index2">
                                                    <el-input size="small" style="width:130px;margin-right: 10px;"
                                                              :disabled="skuChild.disabled"
                                                              placeholder="自定义规格值" v-model="skuChild.value">
                                                    </el-input>
                                                </el-checkbox>
                                                <i class="el-icon-close" v-if="skuChild.delete" style="cursor:pointer;font-size: 16px;margin-left: -30px"
                                                   @click="delSkuValue(index, index2, skuItem.checkList)"></i>
                                            </div>

                                        </el-checkbox-group>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="3" style="text-align: right;">
                                        <span style="color: #409EFF;cursor: pointer" @click="addSkuValue(index)">添加</span>
                                    </el-col>
                                </el-row>
                                <span style="color: #409EFF;cursor: pointer;position: absolute;top: 50%;right: 39px;margin-top: -16px" @click="delSku(index)">删除</span>
                            </div>
                        </div>
                        <div style="padding: 0 0 20px 20px">
                            <strong>宝贝销售规格</strong>  在标题栏输入内容可批量填充<el-button size="small" type="primary" style="margin-left: 10px" @click="LotInsert">批量填充</el-button>
                        </div>
                        <div class="skuTable">
                            <el-table
                                    :data="skuTableData"
                                    style="width: 100%">
                                <el-table-column v-for="(item, i) in tableSkuTitle" :key="i" :label="item" width="100">
                                    <template slot-scope="scope">
                                        <div class="wrapper">
                                            <span>{{scope.row.skuName.split(',')[i]}}</span>
                                        </div>
                                    </template>
                                </el-table-column>
                                <!--<el-table-column>-->
                                    <!--<template slot="header" slot-scope="scope">-->
                                        <!--<div class="wrapper">-->
                                            <!--<span v-for="(item, i) in tableSkuTitle" :key="i">{{item}}</span>-->
                                        <!--</div>-->
                                    <!--</template>-->
                                    <!--<template slot-scope="scope">-->
                                        <!--<div class="wrapper">-->
                                            <!--<span v-for="(item, i) in scope.row.skuName" :key="i">{{item}}</span>-->
                                        <!--</div>-->
                                    <!--</template>-->
                                <!--</el-table-column>-->
                                <el-table-column>
                                    <template slot="header" slot-scope="scope">
                                        <el-input
                                                v-model="Lotsku.skuItemEncoding"
                                                size="small"
                                                style="width: 130px;"
                                                placeholder="商品编码"/>
                                        <span :key="scope.row" style="color: #409EFF;cursor: pointer;display: inline-block;vertical-align: 15px;margin-left: 5px" @click="createLotEncoding">生成</span>
                                    </template>
                                    <template slot-scope="scope">
                                        <el-input
                                                v-model="scope.row.skuItemEncoding"
                                                size="small"
                                                style="width: 130px;"
                                                placeholder="必填"/>
                                    </template>
                                </el-table-column>
                                <el-table-column>
                                    <template slot="header" slot-scope="scope">
                                        <el-input
                                                v-model="Lotsku.skuItemBarcode"
                                                size="small"
                                                style="width: 130px;"
                                                placeholder="商品条码"/>
                                        <span :key="scope.row" style="color: #409EFF;cursor: pointer;display: inline-block;vertical-align: 15px;margin-left: 5px" @click="createLotBarcode">生成</span></template>
                                    <template slot-scope="scope">
                                        <el-input
                                                v-model="scope.row.skuItemBarcode"
                                                size="small"
                                                style="width: 130px;"
                                                placeholder="必填" />
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        >
                                    <template slot="header" slot-scope="scope">
                                        <el-input
                                                v-model="Lotsku.skuStock"
                                                size="small"
                                                :key="scope.row"
                                                style="width: 130px;"
                                                placeholder="库存"/>
                                    </template>
                                    <template slot-scope="scope">
                                        <el-input
                                                v-model="scope.row.skuStock"
                                                size="small"
                                                style="width: 130px;"/>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                >
                                    <template slot="header" slot-scope="scope">
                                        <el-input
                                                v-model="Lotsku.skuPurchasePrice"
                                                size="small"
                                                :key="scope.row"
                                                style="width: 130px;"
                                                placeholder="进价"/>
                                    </template>
                                    <template slot-scope="scope">
                                        <el-input
                                                v-model="scope.row.skuPurchasePrice"
                                                size="small"
                                                style="width: 130px;"/>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                >
                                    <template slot="header" slot-scope="scope">
                                        <el-input
                                                v-model="Lotsku.skuSellPrice"
                                                size="small"
                                                :key="scope.row"
                                                style="width: 130px;"
                                                placeholder="售价"/>
                                    </template>
                                    <template slot-scope="scope">
                                        <el-input
                                                v-model="scope.row.skuSellPrice"
                                                size="small"
                                                placeholder="必填"
                                                style="width: 130px;"/>
                                        <span style="margin-left: 5px" v-if="scope.row.skuSellPrice && scope.row.skuPurchasePrice">毛利{{((scope.row.skuSellPrice - scope.row.skuPurchasePrice) / scope.row.skuPurchasePrice * 100).toFixed(2) || 0}}%</span>
                                    </template>
                                </el-table-column>

                            </el-table>
                        </div>

                    </div>
                    <div class="title">
                        拓展信息<span class="litLabel">完善下列商品拓展信息，有助于日常的经营管理</span>
                        <el-radio-group v-model="formData.isExtend">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                    </div>
                    <div style="display: flex;width: 1000px;flex-wrap: wrap">
                        <el-form-item :label="elItem.propertyName" v-for="(elItem, index) in findPropertyList" :key="index">
                            <el-select :multiple="elItem.chooseType == 1" :disabled="!formData.isExtend" placeholder="请选择" style="width: 360px" size="small" v-model="elItem.bindValue">
                                <el-option v-for="item in elItem.itemCenterPropertyValueResponseList" :key="item.id" :label="item.propertyValueName"
                                           :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div style="display:flex">
                        <el-form-item label="单位" prop="unitId">
                            <el-select filterable v-model="formData.unitId" :disabled="!formData.isExtend || shopType != 0" style="width:360px" size="small"
                                       placeholder="请选择商品单位" clearable>
                                <el-option v-for="item in unitList" :key="item.id" :label="item.unitName"
                                           :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="供应商" prop="supplierId">
                            <el-select clearable filterable v-model="formData.supplierId" :disabled="!formData.isExtend" style="width:360px" size="small"
                                       placeholder="请选择供应商">
                                <el-option v-for="item in supplierList" :key="item.id" :label="item.supplierName"
                                           :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div style="display:flex">
                        <el-form-item label="库存上限" prop="stockUpper">
                            <el-input size="small" :disabled="!formData.isExtend" v-model="formData.stockUpper" placeholder="请输入库存上限"></el-input>
                        </el-form-item>
                        <el-form-item label="库存下限" prop="stockLower">
                            <el-input size="small" :disabled="!formData.isExtend" v-model="formData.stockLower" placeholder="请输入库存下限"></el-input>
                        </el-form-item>
                    </div>
                    <div style="display:flex">
                        <el-form-item label="保质期" prop="expirationNum">
                            <el-input size="small" :disabled="!formData.isExtend" v-model="formData.expirationNum" placeholder="请输入保质期"></el-input>
                        </el-form-item>
                    </div>
                    <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" :disabled="!formData.isExtend" :rows="3" style="width:360px;"
                                  placeholder="请输入内容" v-model="formData.remark">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="商品属性" style="width:100%">
                        <div class="propertyBox" v-for="(item,index) in property" :key='index'>
                            <el-input :disabled="!formData.isExtend" size="small" style="width:360px;margin-right: 10px;"
                                      placeholder="属性名" v-model="item.name"></el-input>
                            <el-input :disabled="!formData.isExtend" size="small" style="width:440px" placeholder="属性值"
                                      v-model="item.value"></el-input>
                            <i class="el-icon-close" v-show="index!=0" style="margin-left:10px;cursor:pointer"
                               @click="del(index)"></i>
                        </div>
                        <el-button :disabled="!formData.isExtend" type="text" size="small" @click="addProperty()">添加属性
                        </el-button>
                    </el-form-item>
                    <el-form-item label="上传图片">
                        <el-upload
                                :disabled="!formData.isExtend"
                                :action="upDateImgUrl"
                                :data='sendData'
                                list-type="picture-card"
                                :file-list="fileList"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload3M"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                        <span class="upTip">仅支持jpg、bmp、png、jpeg格式，图片大小不超过3MB</span>
                    </el-form-item>
                    <el-form-item label="电脑端描述" prop="itemDesc">
                        <div id='editorA' style="width: 1000px;"></div>
                    </el-form-item>
                    <div class="title">
                        折扣与兑换设置
                    </div>
                    <el-form-item label="启用打折" prop="isDiscount">
                        <el-radio-group v-model="formData.isDiscount">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="" v-show="formData.isDiscount" prop="memberPrice">
                        <el-radio v-model="formData.isDiscount2" :label="1">折扣价(售价*会员折扣率)</el-radio>
                        <el-radio v-model="formData.isDiscount2" :label="2">会员价
                            <el-input size="small" style="width:90px;" v-model="formData.memberPrice"></el-input>
                            元
                        </el-radio>
                    </el-form-item>
                    <el-form-item label="启用积分" prop="integralStatus">
                        <el-radio-group v-model="formData.integralStatus">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="" v-show="formData.integralStatus" prop="price2Integral">
                        1元钱积
                        <el-input size="small" style="width:90px;" v-model="formData.price2Integral"></el-input>
                        积分(最多保留两位小数)
                    </el-form-item>
                    <el-form-item label="可兑换积分" prop="isIntegralExchange">
                        <el-radio-group v-model="formData.isIntegralExchange">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="" v-show="formData.isIntegralExchange" prop="integralNumber">
                        兑换所需积分
                        <el-input size="small" style="width:90px;" v-model="formData.integralNumber"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="model_footer">
            <el-button size="small" @click="goBackEvent" style="width: 90px; margin-left: 25px;">返回</el-button>
            <el-button type="primary" size="small" style="width: 90px; margin-left: 25px;" @click="save">保存</el-button>
        </div>
        <select-good v-show="showSelect" @hide="hideSelect" @chooseValue="getFromtemp"></select-good>
    </div>
</template>

<script>
    import axios from 'axios'
    import api from 'api/good'
    import E from 'wangeditor'
    import mqn from 'utils/mqn'
    import selectGood from './selectTemp'
    export default {
        components: {
            selectGood
        },
        data() {
            return {
                depArr: [], // 临时储存全局
                categoryList: [],
                unitList: [], // 单位列表
                brandList: [], // 品牌列表
                supplierList: [], // 供应商列表
                equalCode: false, // 编码与条码一致
                id: '',
                headTitle: '新增商品',
                type: '',
                rules: {
                    itemName: [
                        {required: true, message: '请输入商品名称', trigger: 'blur'}
                    ],
                    skuItemBarcode: [
                        {required: true, message: '请输入商品条码', trigger: 'blur'},
                        {message: '请输入正确条码', validator: mqn.data.validator.num, trigger: 'blur' }
                    ],
                    skuSellPrice: [
                        {required: true, message: '请输入商品售价', trigger: 'blur'},
                        {message: '请输入正确售价', validator: mqn.data.validator.canFix2, trigger: 'blur' }
                    ]
                },
                fileList: [],
                dialogImageUrl: '',
                dialogVisible: false,
                upDateImgUrl: this.$store.state.home.baseUrl + '/f/upload',
                sendData: {
                    file: "",
                    uploadType: 'pos-shop'
                },
                property: [
                    {
                        name: '',
                        value: ''
                    }
                ],
                findPropertyList: [], // 商品模板带过来的属性
                formData: {
                    price2Integral: '',
                    integralNumber: '',
                    memberPrice: '',
                    categoryId: [],
                    brandId: '',
                    integralStatus: 0, // 启用积分
                    isSpecification: 0, // 启用规格
                    isIntegralExchange: 0, //启用积分兑换
                    isDiscount: 0, //折扣 0 不启用，1 折扣价，2 会员价
                    isExtend: 0, // 是否有拓展
                    enableStatus: 1, //启用状态
                    itemDesc: null,
                    skuItemBarcode: '',
                    skuItemEncoding: '',
                    skuPurchasePrice: null,
                    skuSellPrice: null,
                    stockNum: null,
                    itemName: '',
                    unitId: '',
                    supplierId: '',
                    stockUpper: '',
                    stockLower: '',
                    expirationNum: '',
                    remark: ''
                },
                postData: {},
                editor: '',
                skuList: [
                ],
                skuTableData: [],
                Lotsku: { // 批量操作表头绑定的数据
                    skuItemBarcode: '',
                    skuItemEncoding: '',
                    skuStock: '',
                    skuPurchasePrice: '',
                    skuSellPrice: ''
                },
                tableSkuTitle: [], // 表格头部数据
                results: [],
                result: [],
                showSelect: false,
                shopType: 0
            }
        },
        computed: {},
        watch: {
            skuList:{//深度监听，可监听到对象、数组的变化
                handler(val, oldVal){
                    // 更新table数据
                    let originalData = []
                    // 将选中的数据筛选出来
                    val.forEach((item, index) => {
                        if (item.checkList.length > 0) {
                            let copyData = JSON.parse(JSON.stringify(item))
                            copyData.skuValue = []
                            copyData.checkList.forEach((value) => {
                                copyData.skuValue.push(item.skuValue[value].value)
                            })
                            originalData.push(copyData)
                        }
                    })
                    let arr = []
                    this.tableSkuTitle = []
                    originalData.forEach((item) => {
                        this.tableSkuTitle.push(item.skuName)
                        arr.push(item.skuValue)
                    })
                    if (arr.length > 0) {
                        this.doExchange(arr, 0)
                    }
                    this.skuTableData = []
                    this.results.forEach((item) => {
                        this.skuTableData.push({
                            skuName: item,
                            skuItemBarcode: '',
                            skuItemEncoding: '',
                            skuStock: '',
                            skuPurchasePrice: '',
                            skuSellPrice: ''
                        })
                    })
                },
                deep:true
            },
            'formData.isSpecification': {
                handler(newVal) {
                    if (newVal) { // 启用规格
                        this.rules = {
                            itemName: [
                                {required: true, message: '请输入商品名称', trigger: 'blur'}
                            ]
                        }
                    } else {
                        this.rules = {
                            itemName: [
                                {required: true, message: '请输入商品名称', trigger: 'blur'}
                            ],
                            skuItemBarcode: [
                                {required: true, message: '请输入商品条码', trigger: 'blur'},
                                {message: '请输入正确条码', validator: mqn.data.validator.num, trigger: 'blur' }
                            ],
                            skuSellPrice: [
                                {required: true, message: '请输入商品售价', trigger: 'blur'},
                                {message: '请输入正确售价', validator: mqn.data.validator.num, trigger: 'blur' }
                            ]
                        }
                    }
                }
            },
            equalCode: {
                handler(val, oldVal){
                    if (val) {
                        this.$set(this.formData, 'skuItemEncoding', this.formData.skuItemBarcode)
                    }
                },
            },
            'formData.skuItemBarcode': {
                handler(val, oldVal){
                    if (this.equalCode) {
                        this.$set(this.formData, 'skuItemEncoding', this.formData.skuItemBarcode)
                    }
                },
                deep:true
            },
            categoryList: {
                handler(val){
                    if (val.length > 0 && this.type == '2') {
                        this.getGoodDetail()
                    }
                }
            }
        },
        methods: {
            // 收起选择商品
            hideSelect() {
                this.showSelect = false
            },
            // 排列组合拼接
            doExchange(arr, index){
                if(index == 0) {
                    this.results = []
                }
                for (let i = 0; i < arr[index].length; i++) {
                    this.result[index] = arr[index][i];
                    if (index != arr.length - 1) {
                        this.doExchange(arr, index + 1)
                    } else {
                        this.results.push(this.result.join(','))
                    }
                }
            },
            goBackEvent() {
                this.$router.push({
                    path: '/info'
                })
            },
            handleAvatarSuccess(res, file, fileList) {
                this.fileList = fileList
            },
            handleRemove(file, fileList) {
                this.fileList = fileList
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            beforeAvatarUpload3M(file) {
                const isLt1M = file.size / 1024 / 1024 < 3;
                const isPic = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
                if (!isPic) {
                    this.$message.error('上传图片格式有误!');
                }
                if (!isLt1M) {
                    this.$message.error('上传图片大小不能超过 3MB!');
                }
                return isLt1M && isPic;
            },
            getUnitList() {
                api.getUnitList().then((res) => {
                    this.unitList = res.data
                })
            },
            getBrandList() {
                api.getBrandList({pageSize: 999}).then((res) => {
                    this.brandList = res.data.listData
                })
            },
            getCategoryList() {
                api.getCategoryList({pageSize: 999}).then((res) => {
                    this.$set(this.$data, 'categoryList', res.data.listData)
                })
            },
            getSupplierList() {
                api.getSupplierList({pageSize: 999}).then((res) => {
                    this.supplierList = res.data.listData
                })
            },
            // 选择商品分类
            categoryChange() {
            },
            //添加属性
            addProperty() {
                this.property.push({
                    name: '',
                    value: ''
                })
            },
            //删除属性
            del(val) {
                if (this.property.length > 1) {
                    this.property.splice(val, 1)
                }
            },
            // 添加规格值
            addSkuValue(i) {
                this.skuList[i].skuValue.push({
                    value: '',
                    disabled: false,
                    delete: true
                })
            },
            // 添加规格
            addSku() {
                this.skuList.push({
                    skuName: '',
                    skuValue: [{
                        value: '',
                        disabled: false,
                        delete: true
                    }],
                    disabled: false,
                    checkList: []
                })
            },
            // 删除规格
            delSku(i) {
                if (this.skuList.length > 1) {
                    this.skuList.splice(i, 1)
                }
            },
            // 删除规格值
            delSkuValue(index, index2, checkList) {
                if (this.skuList[index].skuValue.length > 1) {
                    this.skuList[index].skuValue.splice(index2, 1)
                }
                for (let i = this.skuList[index].checkList.length - 1; i > 0; i--) {
                    if (index2 == this.skuList[index].checkList[i]) {
                        this.skuList[index].checkList.splice(i, 1)
                    }
                }
            },
            newEditor(id) {
                let that = this
                this.editor = new E(`#${id}`)
                this.editor.customConfig.customUploadImg = function(files, insert) {
                    let formData = new FormData()
                    formData.append('uploadType', 'pos-shop')
                    for (var i = 0 ; i < files.length ; i++) {
                        formData.append('file', files[i])
                    }
                    axios.post(that.upDateImgUrl, formData).then(res => {
                        insert(res.data.data.url)
                    }).catch((error) => {
                        that.$message.warning({
                            message: '上传失败',
                            showClose: true,
                            type: 'warning',
                            duration: 1500
                        })
                    })
                }
                this.editor.customConfig.onchange = (html) => {
                    this.formData.itemDesc = html
                }
                this.editor.create()
                this.editor.txt.html(this.formData.itemDesc)
            },
            // 随机生成5-15位的数字
            randomNum() {
                let num = 5 + Math.round(Math.random()*10)
                let arr = []
                for (let i = 0; i < num; i++) {
                    arr.push(Math.floor(Math.random() * 10))
                }
                return arr.join('')
            },
            // 生成商品条码
            creatBarcode() {
                api.creatBarcode({length: 13}).then((res) => {
                    this.$set(this.formData, 'skuItemBarcode', res.data)
                    this.formData.skuItemBarcode = res.data
                })
            },
            // 生成编码
            creatEncode() {
                api.createEncode().then((res) => {
                    this.$set(this.formData, 'skuItemEncoding', res.data)
                    this.formData.skuItemEncoding = res.data
                })
            },
            // 生成编码
            createLotEncoding() {
                api.createEncode().then((res) => {
                    this.$set(this.Lotsku, 'skuItemEncoding', res.data)
                })
            },
            // 生成条码
            createLotBarcode() {
                api.creatBarcode({length: 13}).then((res) => {
                    this.$set(this.Lotsku, 'skuItemBarcode', res.data)
                })
            },
            // 批量填充
            LotInsert() {
                this.skuTableData.forEach((item) => {
                    item.skuItemEncoding = this.Lotsku.skuItemEncoding
                    item.skuItemBarcode = this.Lotsku.skuItemBarcode
                    item.skuStock = this.Lotsku.skuStock
                    item.skuPurchasePrice = this.Lotsku.skuPurchasePrice
                    item.skuSellPrice = this.Lotsku.skuSellPrice
                })
            },
            // 获取商品模板
            getFromtemp(val) {
                console.log(val)
                if (val.id) {
                    api.getTempDetail(val.id).then((res) => {
                        if(res.data.property) {
                            if (JSON.parse(res.data.property).length > 0) {
                                this.property = JSON.parse(res.data.property)
                            }
                        }
                        this.$set(this.formData, 'brandId', res.data.brandId)
                        this.$set(this.formData, 'categoryId', [])
                        this.formData.categoryId.push(res.data.categoryId)
                        this.$set(this.formData, 'itemName', res.data.title)
                        if (this.type == 1) {
                            // 新增时候
                            this.formData.centreTempId = res.data.id
                        }
                        this.findPropertyList = res.data.itemCenterPropertyResponseList
                        this.formData.itemDesc = res.data.descriptionPcC
                        this.editor.txt.html(this.formData.itemDesc)
                    })
                }
            },
            // 根据id获取数组
            getCateArr(cateId, cateArr, list) {
                list.forEach((item) => {
                    if (item.categoryList && item.categoryList.length > 0) {
                        this.depArr.push(item)
                        this.getCateArr(cateId, cateArr, item.categoryList)
                    } else if (item.id == cateId) {
                        this.depArr.forEach((con) => {
                            cateArr.push(con.id)
                        })
                        cateArr.push(cateId)
                    } else {
                        this.depArr = []
                    }
                })
            },
            // 获取商品详情
            getGoodDetail() {
                api.getGoodDetail(this.id).then((res) => {
                    this.formData = JSON.parse(JSON.stringify(res.data))
                    delete this.formData.categoryId
                    this.formData.isSpecification = 0
                    this.$set(this.formData, 'skuItemBarcode', res.data.skuItemBarcode)
                    this.$set(this.formData, 'skuItemEncoding', res.data.skuItemEncoding)
                    this.$set(this.formData, 'skuSellPrice', res.data.skuSellPrice)
                    this.$set(this.formData, 'skuPurchasePrice', res.data.skuPurchasePrice)
                    this.formData.skuProperties = res.data.skuProperties.replace('[', '').replace(']', '')
                    this.$set(this.formData, 'categoryId', [])
                    // 商品分类
                    this.getCateArr(res.data.categoryId, this.formData.categoryId, this.categoryList)
                    this.$set(this.formData, 'isDiscount2', this.formData.isDiscount)
                    if (this.formData.isDiscount == 2) {
                        this.$set(this.formData, 'isDiscount', 1)
                    }
                    if(res.data.property) {
                        if (JSON.parse(res.data.property).length > 0) {
                            this.property = JSON.parse(res.data.property)
                        }
                    }
                    this.fileList = []
                    if (this.formData.itemImgList) {
                        this.formData.itemImgList.forEach((img) => {
                            let obj = {
                                status:'',
                                uid:'',
                                url: img.imgUrl
                            }
                            this.fileList.push(obj)
                        })
                    }
                    this.editor.txt.html(this.formData.itemDesc)
                })
            },
            save() {
                console.log(this.formData)
                this.postData = JSON.parse(JSON.stringify(this.formData))
                if (this.formData.categoryId && this.formData.categoryId.length > 0) {
                    this.postData.categoryId = this.formData.categoryId[this.formData.categoryId.length - 1] // 商品类目
                }
                if (this.postData.isDiscount == 0) {
                    delete this.postData.isDiscount2
                } else {
                    this.postData.isDiscount = this.postData.isDiscount2
                    delete this.postData.isDiscount2
                }
                // 启用规格
                if (this.postData.isSpecification == 1) {
                    this.postData.skuJson = []
                    this.skuTableData.forEach((item, i) => {
                        this.postData.skuJson.push({
                            skuProperties: [],
                            skuItemBarcode: item.skuItemBarcode,
                            skuItemEncoding: item.skuItemEncoding,
                            skuStock: item.skuStock,
                            skuPurchasePrice: item.skuPurchasePrice,
                            skuSellPrice: item.skuSellPrice
                        })
                        // 键值对拼接
                        item.skuName.split(',').forEach((value, index) => {
                            let obj = {}
                            let key = this.tableSkuTitle[index]
                            obj[key] = value
                            this.postData.skuJson[i].skuProperties.push(obj)
                        })
                    })
                    if (this.postData.skuJson.length > 0) {
                        this.postData.skuJson = JSON.stringify(this.postData.skuJson)
                    } else {
                        this.$message.warning({
                            message: '请选择规格！'
                        })
                        return
                    }
                } else {
                    delete this.postData.skuJson
                }
                // 拓展属性
                if (this.postData.isExtend == 1) {
                    // 属性添加
                    this.postData.property = []
                    this.property.forEach((item) => {
                        if (item.name && item.value) {
                            this.postData.property.push({
                                value: item.value,
                                name: item.name
                            })
                        }
                    })
                    this.postData.property = this.postData.property.length > 0 ? JSON.stringify(this.postData.property) : ''
                    // 图片添加
                    this.postData.itemImgList = []
                    this.fileList.forEach((file, index) => {
                        if (file.response) {
                            this.postData.itemImgList.push({
                                imgUrl: file.response.data.url,
                                isHeader: index == 0 ? 1 : 0
                            })
                        } else {
                            this.postData.itemImgList.push({
                                imgUrl: file.url,
                                isHeader: index == 0 ? 1 : 0
                            })
                        }
                    })
                    if (this.fileList.length > 0) {
                        this.postData.itemImgList = JSON.stringify(this.postData.itemImgList)
                    } else {
                        this.postData.itemImgList = ''
                    }
                }
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        if (this.type == '1') { // 新增
                            delete this.postData.shopSkuItemBrothers
                            api.addGoods(this.postData).then((res) => {
                                this.$message.success({
                                    message: '新增成功！'
                                })
                                this.$router.push({
                                    path: '/info'
                                })
                                this.resetForm()
                            })
                        } else if (this.type == '2'){
                            if (this.$store.state.home.currentShop.shopType == 0) {
                                // 总店编辑商品
                                console.log(this.findPropertyList, 'asdwsssss')
                                delete this.postData.itemPropertyKeys
                                delete this.postData.storages
                                delete this.postData.shopSkuItemBrothers
                                let copyPropertyList = JSON.parse(JSON.stringify(this.findPropertyList))
                                for (let i = 0; i < copyPropertyList.length; i++) {
                                    for (let j = copyPropertyList[i].itemCenterPropertyValueResponseList.length - 1; j >= 0 ; j--) {
                                        if(copyPropertyList[i].bindValue.indexOf(copyPropertyList[i].itemCenterPropertyValueResponseList[j].id) < 0) {
                                            copyPropertyList[i].itemCenterPropertyValueResponseList.splice(j, 1)
                                        }
                                    }
                                    delete copyPropertyList[i].bindValue
                                }
                                for (let i = copyPropertyList.length - 1; i >= 0 ; i--) {
                                    if(copyPropertyList[i].itemCenterPropertyValueResponseList.length == 0) {
                                        copyPropertyList.splice(i, 1)
                                    }
                                }
                                this.$set(this.postData, 'itemCenterPropertyList', copyPropertyList)
                                api.updateGoods(this.postData).then((res) => {
                                    this.$message.success({
                                        message: '编辑成功！'
                                    })
                                    this.$router.push({
                                        path: '/info'
                                    })
                                    this.resetForm()
                                })
                            } else {
                                // 分店编辑商品
                                delete this.postData.storages
                                delete this.postData.shopSkuItemBrothers
                                api.updateSkuGoods(this.postData).then((res) => {
                                    this.$message.success({
                                        message: '编辑成功！'
                                    })
                                    this.$router.push({
                                        path: '/info'
                                    })
                                    this.resetForm()
                                })
                            }

                        }
                    } else {
                        return false;
                    }
                })

            },
            resetForm() {
                this.property = [{
                        name: '',
                        value: ''
                    }]
                this.$refs.ruleForm.resetFields()
                this.fileList = []
                this.findPropertyList = []
                this.editor.txt.html('')
            }
        },
        created() {
        },
        activated() {
            this.depArr = []
            this.resetForm()
            this.type = this.$route.query.state
            // 获取当前店铺状态 0为总店，1为分店
            this.$set(this.$data, 'shopType', this.$store.state.home.currentShop.shopType)
            this.getCategoryList()
            this.getBrandList()
            this.getUnitList()
            this.getSupplierList()
            if (this.type == '1') {
                this.headTitle = '新增商品'
            } else if (this.type == '2') {
                this.headTitle = '编辑商品'
                this.id = this.$route.query.id
                this.getGoodDetail()
            }
        },
        mounted() {
            this.newEditor('editorA')
        }
    }
</script>
<style lang="scss">
    .newGood {
        position: relative;
        .demoForm {
            .title {
                height: 40px;
                line-height: 40px;
                padding-left: 16px;
                background: #f5f5f5;
                font-weight: bold;
                margin-bottom: 22px;
                .litLabel {
                    font-weight: normal;
                    color: rgba(96, 98, 102, 1);
                    margin-left: 20px;
                    margin-right: 24px;
                }
            }
            .propertyBox {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
            }
            .el-form-item {
                .el-form-item:first-child {
                    width: 34%;
                }
            }
            .el-input {
                width: 360px;
            }
            .upTip {
                font-size: 12px;
                color: rgba(144, 147, 153, 1);
            }
        }
        .model_footer {
            // margin-left: 24px;
            .el-button {
                width: 90px;
            }
        }
        .el-dialog__header{
            border-bottom: none;
        }
        .skuWrap{
            font-family: 'Microsoft YaHei';
            padding: 0 15px 5px 98px;
            font-size: 14px;
            .skuCon{
                background: #F5F5F5;
                padding: 15px 0;
                line-height: 32px;
                margin-bottom: 10px;
                position: relative;
                .el-row:first-child{
                    margin-bottom: 20px;
                }
            }
        }
        .skuTable{
            margin: 0 15px 10px;
            border: 1px solid #EEE;
            .el-table th{
                .cell{
                    white-space: nowrap;
                }
            }
            .el-table th .el-input{
                padding-left: 0;
                padding-right: 0;
            }
        }
    }
</style>