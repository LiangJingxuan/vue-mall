import axios from 'axios'

export function request(config){
    // 创建axios的实例
    const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000',
        timeout: 5000
    })
    // axios拦截器-请求拦截
    instance.interceptors.request.use(config => {
        return config
    }, err => {

    })
    // axios拦截器-响应拦截
    instance.interceptors.response.use(res => {
        // 过滤数据
        return res.data
    }, err => {

    })
    // 发送网络请求
    return instance(config)
}