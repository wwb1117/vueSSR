import HttpClient from 'utils/HttpClient';

export default {
    // ---------------------------------- 商品列表 -----------------------------
    getGoodsList(data) {
        return HttpClient.get('/item/listQuerys', data);
    },//商品列表
    getSkuGoodsList(data) {
        return HttpClient.get('/item/listQuerys', data);
    },//商品列表
    addGoods(data) {
        return HttpClient.post('/item/add', data);
    },// 新增商品
    updateGoods(data) {
        return HttpClient.post('/item/update/parent', data);
    },// 总店编辑商品
    updateSkuGoods(data) {
        return HttpClient.post('/item/update/subbranch', data);
    },// 分店编辑商品
    editGoods(data) {
        return HttpClient.post('/item/category/update', data);
    },// 编辑商品
    getGoodDetail(id) {
        return HttpClient.get(`/item/${id}`);
    },// 获取商品详情
    getGoodSkuItem(data) {
        return HttpClient.get(`/item/get/one/skuItem`, data);
    },//根据sku获取商品详情
    // ---------------------------------- 分类列表 -------------------------------
    getCategoryList(data) {
        return HttpClient.get('/item/category/pageQuery', data);
    },//分类列表
    addCategory(data) {
        return HttpClient.post('/item/category/add', data);
    },// 新增分类
    editCategory(data) {
        return HttpClient.post('/item/category/update', data);
    },// 编辑分类
    checkCategory(id, data) {
        return HttpClient.get(`/item/category/${id}`, data);
    },// 分类id查询
    showCategory(id, data) {
        return HttpClient.post(`/item/category/changeShowStatus/${id}`, data);
    },// 分类是否显示
    // ---------------------------------- 品牌列表 ------------------------------------
    addBrand(data) {
        return HttpClient.post('/item/brand/add', data);
    },//添加品牌
    updataBrand(data) {
        return HttpClient.post('/item/brand/update', data);
    },//更新品牌信息
    removeBrand(id, data) {
        return HttpClient.delete(`/item/brand/${id}`, data);
    },//删除品牌
    checkBrandId(id, data) {
        return HttpClient.get(`/item/brand/${id}`, data);
    },//id查询
    getBrandList(data) {
        return HttpClient.get('/item/brand/pageQuery', data);
    },//商品列表
    getSearBrandList(data) {
        return HttpClient.get('/item/brand/queryParentShopId', data);
    },//商铺的所有品牌
    // ------------------------------- 供应商列表 -----------------------------
    getSupplierList(data) {
        return HttpClient.get('/supplier/pageQuery', data);
    },//供应商列表
    addSupplier(data) {
        return HttpClient.post('/supplier/add', data);
    },// 新增供应商
    editSupplier(data) {
        return HttpClient.post('/supplier/update', data);
    },// 编辑供应商
    newCode(data) {
        return HttpClient.get('/supplier/supplierCode', data);
    },// 生成供应商编码
    getSupplierDetail(id) {
        return HttpClient.get(`/supplier/${id}`)
    },// 获取供应商详情
    // ------------------------------- 新增商品 -----------------------------
    getUnitList(data) {
        return HttpClient.get(`/item/unit/listAll`, data)
    },// 获取商铺单位列表
    creatBarcode(data) {
        return HttpClient.get('/item/create/barcode', data)
    }, // 自动生成条码
    createEncode(data) {
        return HttpClient.get('/item/create/encoding', data)
    },
    getTempList(data) {
        return HttpClient.get('/item/temp/list', data)
    }, // 商品模板列表
    getTempDetail(id) {
        return HttpClient.get(`/item/temp/detials/${id}`)
    }, // 商品模板详情
    getStorageItem(data) {
        return HttpClient.get(`/storage/storage/storageItem`, data)
    }, //获取库存列表
    editStorageItem(data) {
        return HttpClient.putJSON(`/storage/storage/update`, data)
    }, //修改库存列表
    upload(url, data) {
        return HttpClient.post(url, data)
    }
}
