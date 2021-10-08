/**
 * 职责链模式 Chain of Responsibi
 * 使多个对象都有机会处理请求，从而避免请求的发送者和接受者之间的耦合关系
 * ，将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止
 * 
 * 场景例子：
 * 1. JS 中的事件冒泡
 * 2. 作用域链
 * 3. 原形链
 * 4. DOM
 * 
 * 优点：
 * 1. 降低耦合度。它将请求的发送者和接受者解耦合
 * 2. 简化了对象。使得对象不需要知道链条的结构
 * 3. 动态地增加新的请求处理很方便
 * 4. 增强给对象指派指责的灵活性。通过改变链内的成员或者调动它们的次序，允许动态地新增或者删除责任
 * 
 * 缺点：
 * 1. 不能保证某个请求一定会被链中的节点处理，这种情况可以在链尾增加一个保底的接收者节点来处理这种即将离开链尾的请求。
 * 2. 使程序中多了很多节点对象，可能再一次请求的过程中，大部分的节点并没有起到实质性的作用。它们的作用仅仅是让请求
 * 传递下去。造成冗余。
 */
// E.g.1
// 请假审批，需要组长审批、经理审批、总监审批
class Action {
    constructor(name) {
        this.name = name
        this.nextAction = null
    }
    setNextAction(action) {
        this.nextAction = action
    }
    handle() {
        console.log(`${this.name} 审批`)
        if (this.nextAction != null) {
            this.nextAction.handle()
        }
    }
}

let a1 = new Action("组长")
let a2 = new Action("经理")
let a3 = new Action("总监")
a1.setNextAction(a2)
a2.setNextAction(a3)
a1.handle()
class EmployeeChain {
    setNextEmp(nextEmpInChain) { }
    assignWork(req) { }
}

class Employee {
    constructor(name, level) {
        this.name = name
        this.level = level
    }

    getLevel() {
        return this.level
    }

    getName() {
        return this.name
    }

}

class EasyLevelWorkHandler extends EmployeeChain {
    constructor() {
        super()
        this.nextEmpInChain = new EmployeeChain()
    }

    setNextEmp(nextEmpObj) {
        this.nextEmpInChain = nextEmpObj;
    }

    assignWork(req) {
        if (req.getLevel() == "Easy") {
            console.log("Easy work assigned to: " + req.getName());
        } else {
            this.nextEmpInChain.assignWork(req);
        }
    }
}

class MediumLevelWorkHandler extends EmployeeChain {
    constructor() {
        super()
        this.nextEmpInChain = new EmployeeChain()
    }

    setNextEmp(nextEmpObj) {
        this.nextEmpInChain = nextEmpObj;
    }

    assignWork(req) {
        if (req.getLevel() == "Medium") {
            console.log("Medium work assigned to: " + req.getName());
        } else {
            this.nextEmpInChain.assignWork(req);
        }
    }
}


class HardLevelWorkHandler extends EmployeeChain {
    constructor() {
        super()
        this.nextEmpInChain = new EmployeeChain()
    }

    setNextEmp(nextEmpObj) {
        this.nextEmpInChain = nextEmpObj;
    }

    assignWork(req) {
        if (req.getLevel() == "Hard") {
            console.log("Hard work assigned to: " + req.getName());
        } else {
            this.nextEmpInChain.assignWork(req);
        }
    }
}