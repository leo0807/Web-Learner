$(function () {
    $(".btn").click(function () {
        $(".content").fadeOut(300).eq(index).fadeIn(300);
    })

    const httpURL = "https://api.apiopen.top/getJoke";
    const options = {
        page:1,
        count: 1,
        type: "image"
    }
    $.get(httpURL, options).then(function(res){
        console.log(res.result[0].text);
        res.result.forEach(function(item, i){
            $("body").append(`<h1>${item.text}</h1>`);
            $("body").append(`<img src="${item.images}">`);
        })
    })
})
