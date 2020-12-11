$(document).ready(function(){
    $("h1").css("color","red");
    $("h1").addClass("margin-50");
    console.log($("h1").hasClass("margin-50"));
    $("button").htm;("<em>Hey</hey>");
    console.log($("img").attr("src"));
    $("a").attr("href", "https://www.baidu.com");

    $("h1").click(function(){
        $("h1").text("clicked");
    });

    $("h1").on("mouseover", function(){
        $("h1").css("color","yellow");
    });
    $("h1").before("<button>hhh</button>");
    $("h2").show();
});


