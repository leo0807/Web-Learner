import axios from 'axios';

export function request(config, success, failure) {
    // 创建实例
    const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000',
        timeout: 5000,
    })

    // axios 拦截器
    // 请求拦截
    instance.interceptors.request.use(configuration => {
        console.log(configuration);
        //  请求拦截的最用
        // 1 config中的信息不符合要求，需要进行改变
        // 2 在每次网络请求等待的时候， 在页面中展示等待页面
        // 3 登陆时候必须携带一些特殊信息， 比如token

        // 返回真正的请求
        return configuration;
    }, err => {
            console.log(err);
    })

    // 响应拦截
    instance.interceptors.response.use(res => {
        console.log(res);
        return res.data;
    }, err => {
        console.log(err);
    }
    )



    // 发送请求
    instance(config).then(res =>{
        success(res);
    })
        .catch(err => {
            failure(err);
    })
}


export function request1(config) {
 
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            baseURL: 'http://123.207.32.32:8000',
            timeout: 5000,
        })
        // 发送请求
        instance(config).then(res =>{
            resolve(res);
        })
            .catch(err => {
            reject(err);
        })
    })
    // 创建实例

}


export function request2(config) {
    const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000',
        timeout: 5000,
    })
    // 发送请求
    return instance(config)
    // instance 就是一个Promise对象
}