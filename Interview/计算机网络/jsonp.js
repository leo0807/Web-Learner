// 服务端没有同源策略，称之为转发 Nginx代理
// 解释JSONP原理，为何不是真正AJAX
// 哪些html标签可以跨域


function jsonp(url, data = {}, callback = 'callback') {
    // 处理JSON对象，拼接URL
    data.callback = callback;
    let params = [];
    for (let key in data) {
        params.push(key + "=" + data[key]);
    }
    console.log(params.join('&'));
    // 创建script元素
    let script = document.createElement('script');
    script.src = url + '?' + params.join('&');
    document.body.appendChild(script);
    // 返回promise
    return new Promise((resolve, reject)=>{
        window[callback] = (data) =>{
            try {
                resolve(data);
            } catch (error) {
                reject(e);
            }finally{
                // 移除script元素
                script.parentNode.removeChild(script);
                console.log(script);
            }
        }
    });
}

jsonp('http://photo.sina.cn/aj/index', {
    page: 1,
    cate: 'recommend'
}, 'jsoncallback').then(data => {
    console.log(data);
})