import axios from 'axios'
//import env from '../env'


const instance = axios.create({
    // 通用请求的地址前缀
    //baseURL: env.baseURL,
    baseURL: '/api',
    timeout: 6000, // 超时时间
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器, 接口错误拦截
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    const res = response.data
    const path = location.hash
    if (res.status === 0) { return res.data; }
    else if (res.status === 10) {
        if (path !== '#/index') {
            window.location.href = '/#/login'
        }
        return Promise.reject(res)
    } else {
        alert(res.msg)
        return Promise.reject(res)
    }

}, function (error) {
    // 对响应错误做点什么
    let res = error.response
    alert(res.data.message)
    return Promise.reject(res)
});

export default instance