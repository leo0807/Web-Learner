let render = (template, context) => {
    return template.replace(/{{(.*?)}}/g, function (match, key, index) {
        return context[key.trim()] || ''
    });
}
var template = "{{name}}很厉害，才{{age}}岁"
var context = { name: "bottle", age: "15" }

console.log(render(template, context));