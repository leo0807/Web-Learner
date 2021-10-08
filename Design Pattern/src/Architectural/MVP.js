/**
 * Model：提供应用程序需要的数据，这些数据在视图中显示
 * View：显示模型中的数据，它将用户操作/命令传递给Presenter以对该数据采取行动
 * Presenter：充当模型和视图之间的中间人。从模型中检索数据，对其进行操作，并将其返回到视图以供显示。它还对用户与视图的交互做出反应。
 * 
 * MVC和MVP的区别
 * 1. Controller和Presenter分别作为两个模式的中间人连接View和Model；
 * 2. Controller共享多个View；而Presenter和View的关系则是一对一。如果View比较复杂，则View可以使用多个Presenter；
 * 3. - 在MVC中，View可以通过观察Model的改变来直接与Model进行沟通并进行自身的更新；
 *    - 在MVP中，View和Model更加分离。因为Presenter通过检索和操作模型中的数据并将它返回给View进行展示，来对用户的行为产生反应。
 * 
 * 使用场景：
 * 1. 应用程序需要大量重用表示逻辑
 * 2. 应用程序需要大量用户交互
 * 3. 应用程序具有复杂的视图
 * 4. 为了更容易测试，Presenter可以提供可以进行单元测试的模拟界面
 */
// E.g.1
class Model {
    constructor(text) {
        this.text = text;
    }
    setText(text) {
        this.text = text;
    }
    getText() {
        return this.text;
    }
}

class View {
    constructor() {
        this.presenter = null;
    }

    registerWith(presenter) {
        this.presenter = presenter;
    }

    displayError() {
        console.log("Text is not in upper case");
    }

    displayMessage(text) {
        console.log("The text is: " + text);
    }

    changeText(text) {
        this.presenter.changeText(text);
    }
}

class Presenter {
    constructor(view) {
        this.view = view;
        this.model = null;
    }

    setModel(model) {
        this.model = model;
    }

    getView() {
        return this.view;
    }

    changeText(text) {
        if (text !== text.toUpperCase()) {
            this.view.displayError();
        } else {
            this.model.setText(text);
            this.view.displayMessage(this.model.getText());
        }
    }
}

var model = new Model("Hello world!")
var view = new View()
var presenter = new Presenter(view)
presenter.setModel(model)
view.registerWith(presenter)
presenter.getView().changeText("unagi")
presenter.getView().changeText("UNAGI")

// E.g.2
class Model {

    constructor() {
        this.senderName = "";
        this.receiverName = "";
        this.emailTitle = "";
    }

    setSenderName(senderName) {
        this.senderName = senderName;
    }

    getSenderName() {
        return this.senderName;
    }

    setReceiverName(receiverName) {
        this.receiverName = receiverName;
    }

    getReceiverName() {
        return this.receiverName;
    }

    setEmailTitle(emailTitle) {
        this.emailTitle = emailTitle;
    }

    getEmailTitle() {
        return this.emailTitle;
    }

}

class View {
    constructor() {
        this.presenter = null;
    }

    registerWith(presenter) {
        this.presenter = presenter;
    }

    sendEmail(to, fromWhom, emailTitle) {
        this.presenter.sendEmail(to, fromWhom, emailTitle)
    }

    displayEmailInfo(senderName, receiverName, emailTitle) {
        console.log("Email From: " + senderName + " To: " + receiverName + " Title: " + emailTitle);
    }

}

class Presenter {
    constructor(view) {
        this.view = view;
        this.model = null;
    }

    setModel(model) {
        this.model = model;
    }

    getView() {
        return this.view;
    }

    sendEmail(to, fromWhom, emailTitle) {
        this.model.setEmailTitle(emailTitle)
        this.model.setSenderName(fromWhom)
        this.model.setReceiverName(to)
        this.view.displayEmailInfo(this.model.getSenderName(), this.model.getReceiverName(), this.model.getEmailTitle())
    }
}