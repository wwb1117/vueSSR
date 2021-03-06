import axios from 'axios'
import Promise from 'es6-promise'
import qs from 'qs'
import { Message } from 'element-ui';
import { Loading } from 'element-ui'


// axios 配置
let instance = null

// 根据实际情况，调整为服务器地址
if (process.env.VUE_APP_MYENV == 'development') {
    instance = axios.create({
        baseURL: '/api',
        timeout: 50000,
        withCredentials: true
    })
} else {
    instance = axios.create({
        baseURL: '/',
        timeout: 50000,
        withCredentials: true
    })
}

var loader = null  //创建请求库实例

// http request 拦截器
instance.interceptors.request.use(
    config => {
        if (config.url.indexOf('list') == -1) {
            loader = Loading.service({
                lock: true,
                text: '处理中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);
// http response 拦截器
instance.interceptors.response.use(
    response => {
        if (loader) {
            loader.close()
        }
        return response;
    },
    error => {
        return Promise.reject(error.response) // 返回接口返回的错误信息
    }
);

function checkStatus(response) {
    return new Promise((resolve, reject) => {
        if (response.status === 200) {
            if (response.data.result === 1){
                resolve(response.data)
            }else if (response.data.result === 2){
                Message.warning({
                    message: response.data.message,
                    showClose: true,
                    type: 'warning',
                    duration: 1500
                })
                reject(response.data)
            }else if (response.data.result === 3){
                Message.warning({
                    message: response.data.message,
                    showClose: true,
                    type: 'warning',
                    duration: 1500
                })
                reject(response.data)
            }else if (response.data.result === 4){
                Message.warning({
                    message: response.data.message,
                    showClose: true,
                    type: 'warning',
                    duration: 1500
                })
                reject(response.data)
            }else if (response.data.result === 5){
                Message.warning({
                    message: response.data.message,
                    showClose: true,
                    type: 'warning',
                    duration: 1500
                })
                reject(response.data)
            }else if (response.data.result === 6){
                Message.warning({
                    message: response.data.message,
                    showClose: true,
                    type: 'warning',
                    duration: 1500
                })
                reject(response.data)
            }else if (response.data.result === 7){
                Message.warning({
                    message: response.data.message,
                    showClose: true,
                    type: 'warning',
                    duration: 1500

                })
                reject(response.data)
            }else if (response.data.result === 8){
                Message.warning({
                    message: response.data.message,
                    showClose: true,
                    type: 'warning',
                    duration: 1500
                })
                reject(response.data)
            }else{
                Message.warning({
                    message:'未知异常',
                    showClose: true,
                    type: 'warning',
                    duration: 1500

                })
                reject(response.data)
            }

        } else {
            reject(response.data)
        }

    })
}

export default {
    post(url, data) {
        return instance({
            method: 'post',
            url,
            data: qs.stringify(data),
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(checkStatus)
    },
    putform(url, data) {
        return instance({
            method: 'put',
            url,
            data: qs.stringify(data),
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(checkStatus)
    },
    postJSON(url, data) {
        return instance({
            method: 'post',
            url,
            data: JSON.stringify(data),
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then(checkStatus)
    },
    putJSON(url, data) {
        return instance({
            method: 'put',
            url,
            data: JSON.stringify(data),
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then(checkStatus)
    },
    get(url, params) {
        return instance({
            method: 'get',
            url,
            params,
            headers: {
				'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(checkStatus)
    },
    put(url, params) {
        return instance({
            method: 'put',
            url,
            params,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(checkStatus)
    },
    delete(url, params) {
        return instance({
            method: 'delete',
            url,
            params,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(checkStatus)
    }

}
