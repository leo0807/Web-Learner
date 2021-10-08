/**
 * Model      模型存储所需要的数据和信息；模型不干涉数据是如何被处理和展示的。
 * View       视图在接口展示信息。它也可以接收用户的输入，所以它包含了行为；在MVVM模型中，View并不是
 *            被动的。被动的View是被Controller或Presenter在没有任何关于Model的知识的情况下来展示信息的；
 * ViewModel  与MVC中的Controller类似，ViewModel在MVVM作为了一种Model和View的链接。它把在Model中的信息
 *            和数据进行转化，然后在View上进行展示。ViewModel类似于观察者模式。
 * 
 * 1. View和ViewModel 
 * - View和ViewModel通过事件，数据绑定，和方法的调用进行通信。当View通过命令将其事件映射到 ViewModel 时，ViewModel 通过双向数据绑定公开由视图更新的模型属性。
 * 2. Model和ViewModel
 * ViewModel 公开模型及其用于数据绑定的属性。它还包含用于获取和格式化它在视图中显示的属性的接口。
 * 
 * 使用场景：
 * 1. 在视图侧以不同的格式显示存储在模型中的数据
 * 2. 缩小模型的数量以查看控制器在 MVC 中处理的转换
 * 3. 为了使APP可以更易于维护、可重用和可扩展
 */
{/* 
    <html>
    <head>
    </head>
    <body>
        Color: <input type="text" name="color" id="color">
    </body>
    <html> 
*/}
class Model {
    constructor() {
        this.model = { color: "red" };
        this.observers = [];
    }
    subscribe(observer) {
        this.observers.push(observer);
    }
    notifyObservers(attrNm, newVal) {
        for (var i = 0; i < this.observers.length; i++) {
            this.observers[i](attrNm, newVal);
        }
    }
    getCurrentColor(key) {
        return this.model[key];
    }

    setColor(key, value) {
        this.model[key] = value;
        this.notifyObservers(key, value);
    }
}

class ViewModel {
    constructor(model) {
        this.bind = function (viewElement, modelElement) {
            viewElement.style.color = model.getCurrentColor(modelElement);
            model.subscribe(function (attrNm, newValue) {
                var elem = document.getElementById(attrNm);
                if (newValue == "red") {
                    elem.style.color = "blue"
                }
                else if (newValue == "green") {
                    elem.style.color = "red"
                }
                else if (newValue == "blue") {
                    elem.style.color = "green"
                }
            });
            viewElement.addEventListener('input', function () {
                model.setColor("color", viewElement.value);
            });
        }
    }
}


var nameInput = document.getElementById('color');
var model = new Model()
var viewModel = new ViewModel(model);
viewModel.bind(nameInput, 'color');