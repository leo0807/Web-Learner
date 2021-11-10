let less = require('less');
function loader(source) {
    let css;
    less.render(source, function (err, r) { // r.css
        css = r.css; //渲染的结果给css
    })
    return css;
}
module.exports = loader;