/**
 * 
 * 使用场景：
 * 1. 改进应用程序中的应用程序组织
 * 2. 更快的开发，以便开发人员可以同时处理应用程序的不同组件
 * 3. 开发一个加载速度快的应用程序，因为 MVC 支持异步技术
 * 4. 模型的多个视图
 * 5.增加应用程序的可扩展性，因为在单独的组件中修改更容易
 * 
 * Model：管理App需要的数据
 * View： 该视图用于当前模型的可视化表示。它在用户端呈现数据
 * Controller：控制器连接模型和视图组件
 * 
 * Model独立于View，而View则是Model的观察者，当Model有改变的时候，它会提醒View作出相应的反应
 * Contrller是Model和View之间的连接。Controller将来自用户的输入，诸如点击或按键，
 * 先更新View，然后更新Model。它有时也可以直接更新View
 */

// E.g.1
class EmployeeModel {
    constructor(name, designation, id) {
        this.name = name;
        this.designation = designation;
        this.id = id;
    }

    getDesignation() {
        return this.designation
    }
    getID() {
        return this.id
    }

    getName() {
        return this.name
    }
}

class EmployeeView {
    constructor() {
        this.controller = null;
    }
    registerWith(controller) {
        this.controller = controller;
        this.controller.addView(this);
    }

    printEmployeeInfo(name, designation, id) {
        console.log(`Employee info:\nName is: ${name}\nID is: ${id}\nDesignation is: ${designation}`);
    }
    hire(name, designation) {
        this.controller.hire(name, designation);
    }
    editName(id, name) {
        this.controller.setEmployeeName(id, name);
    }
}

class EmployeeController {
    constructor() {
        this.model = null;
        this.view = null;
        this.empList = [];
    }

    addView(view) {
        this.view = view;
    }
    addModel(model) {
        this.model = model;
    }
    setEmployeeName(id, name) {
        if (this.empList[id]) {
            this.empList[id].name = name;
            this.updateView();
        } else {
            console.log("Incorrect id");
        }
    }

    updateView() {
        console.log("List of employees:")

        for (let i in this.empList)
            this.view.printEmployeeInfo(this.empList[i].getName(), this.empList[i].getDesignation(), this.empList[i].getID());
        console.log("\n");
    }
    hire(name, designation) {
        this.empList.push(new EmployeeModel(name, designation, this.empList.length));
        this.updateView();
    }
}
var view = new EmployeeView();
var controller = new EmployeeController();
view.registerWith(controller);
console.log("Hiring a new employee Rachel");
view.hire("Rachel", "Team Lead");
console.log("Hiring a new employee Jack");
view.hire("Jack", "Software Engineer");
console.log("Updating the name of employee with id 0");
view.editName(0, "Monica");
console.log("Updating the name of an employee with id 7");
view.editName(7, "Joey");
// E.g.2
class ShoppingCartModel {
    constructor(itemNumber, itemName, itemQuantity, itemPrice) {
        this.itemName = itemName;
        this.itemQuantity = itemQuantity;
        this.itemPrice = itemPrice;
        this.itemNumber = itemNumber
    }

    getItemName() {
        return this.itemName;
    }

    getItemQuantity() {
        return this.itemQuantity
    }

    getItemPrice() {
        return this.itemPrice;
    }

    getItemNumber() {
        return this.itemNumber;
    }
}

class ShoppingCartView {
    constructor() {
        this.controller = null;
    }
    registerWith(controller) {
        this.controller = controller;
        this.controller.addView(this);
    }

    displayItem(itemNumber, itemName, itemQuantity, itemPrice) {
        console.log(`Item Number: ${itemNumber}\nItem: ${itemName}\nQuantity: ${itemQuantity}\nPrice: ${itemPrice}`);
    }

    buyItem(itemNumber, itemName, itemQuantity, itemPrice) {
        this.controller.buyItem(itemNumber, itemName, itemQuantity, itemPrice);
    }

    changeItemQuantity(itemNumber, newQuantity) {
        this.controller.setItemQuantity(itemNumber, newQuantity);
    }
}

class ShoppingCartController {
    constructor() {
        this.model = null;
        this.view = null;
        this.itemList = [];
    }

    addView(view) {
        this.view = view;
    }
    addModel(model) {
        this.model = model;
    }
    setItemQuantity(itemNumber, newQuantity) {
        if (this.itemList[itemNumber]) {
            this.itemList[itemNumber].itemQuantity = newQuantity;
            this.updateView();
        }
    }

    updateView() {
        for (let i in this.itemList)
            this.view.displayItem(this.itemList[i].getItemNumber(), this.itemList[i].getItemName(), this.itemList[i].getItemQuantity(), this.itemList[i].getItemPrice());
    }
    buyItem(itemName, itemQuantity, itemPrice) {
        this.itemList.push(new ShoppingCartModel(this.itemList.length, itemName, itemQuantity, itemPrice));
        this.updateView();
    }
}

var view = new ShoppingCartView();
var controller = new ShoppingCartController();
view.registerWith(controller);
view.buyItem("Popcorn", 3, 2.50);
console.log("\n");
view.buyItem("Soap", 5, 10.00);
console.log("\n");
view.changeItemQuantity(0, 6);