let render = (template, context) => {
    return template.replace(/{{(.*?)}}/g, function (match, key, index) {
        return context[key.trim()] || ''
    });
}
var template = "{{name}}很厉害，才{{age}}岁"
var context = { name: "bottle", age: "15" }

// console.log(render(template, context));


function render2(template, context) {
    return template.replace(/{{(.*?)}}/g, (match, key) => {
        console.log(match, key);
        return context[key.trim()];
    });
}


console.log(render2(template, context));