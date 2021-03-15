const parseQueryString = url=>{
     var json = {};
     var arr = url.substr(url.indexOf('?') + 1).split('&');
     arr.forEach(item=>{
        var tmp = item.split('=');
        json[tmp[0]] = tmp[1];
    });
    return json;
}
console.log(parseQueryString("https://www.google.com/search?q=%E8%A7%A3%E6%9E%90url%E4%B8%AD%E7%9A%84%E5%8F%82%E6%95%B0&oq=%E8%A7%A3%E6%9E%90url%E4%B8%AD%E7%9A%84%E5%8F%82%E6%95%B0&aqs=chrome..69i57&sourceid=chrome&ie=UTF-8"));