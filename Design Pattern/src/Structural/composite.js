/**
 * 
 * 组合模式
 * 1. 将对象组合成树形结构，以表示“整体 - 部分”的层次结构。
 * 2. 通过对象的多态表现，使得用户对单个对象和组合对象的使用具有一致性。
 * 复合模式用于在树状层次结构中构建对象。在这里，树的每个节点可以由子节点或叶子（没有子对象）组成。
 * 这种模式允许客户端统一使用这些组件，即可以像对待一组对象一样准确地对待单个对象。
 * 
 * 如果要开发使用大量对象的可扩展应用程序，则可以使用此模式。在您处理对象的树状层次结构的情况下，它特别有用。
 * React 和 Vue 等库也使用这种模式来构建可重用的接口
 * 
 * 表示对象 - 整体层次结构
 * 希望用户忽略组合对象和单个对象的不同，用户将统一地使用组合结构中的所有对象（方法）
 * 缺点
 * 如果通过组合模式创建了太多的对象，那么这些对象可能会让系统负担不起。
 */

// E.g.1
class TrainOrder {
    create() {
        console.log('创建火车票订单')
    }
}
class HotelOrder {
    create() {
        console.log('创建酒店订单')
    }
}

class TotalOrder {
    constructor() {
        this.orderList = []
    }
    addOrder(order) {
        this.orderList.push(order)
        return this
    }
    create() {
        this.orderList.forEach(item => {
            item.create()
        })
        return this
    }
}
// 可以在购票网站买车票同时也订房间
let train = new TrainOrder()
let hotel = new HotelOrder()
let total = new TotalOrder()
total.addOrder(train).addOrder(hotel).create()



// 作者：九思
// 链接：https://juejin.cn/post/6844904032826294286
// 来源：稀土掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

// E.g.2
//Component
class Employee {
    constructor(name, position, progress) {
        this.name = name
        this.position = position
        this.progress = progress
    }
    getProgress() {
    }
}

//Leaf subclass
class Developers extends Employee {
    constructor(name, position, progress) {
        super(name, position, progress)
    }
    getProgress() {
        return this.progress
    }
}

//Leaf subclass
class FreeLanceDev extends Employee {
    constructor(name, position, progress) {
        super(name, position, progress)
    }
    getProgress() {
        return this.progress()
    }
}

//Composite subclass
class DevTeamLead extends Employee {
    constructor(name, position) {
        super(name, position)
        this.teamMembers = []
    }
    addMember(employee) {
        this.teamMembers.push(employee)
    }

    removeMember(employee) {
        for (var i = 0; i < this.teamMembers.length; i++) {
            if (this.teamMembers[i] == employee) {
                this.teamMembers.splice(i, 1)
            }
        }
        return this.teamMembers
    }

    getProgress() {
        for (var i = 0; i < this.teamMembers.length; i++) {
            console.log(this.teamMembers[i].getProgress())
        }
    }

    showTeam() {
        for (var i = 0; i < this.teamMembers.length; i++) {
            console.log(this.teamMembers[i].name)
        }
    }
}

const seniorDev = new Developers("Rachel", "Senior Developer", "60%")
const juniorDev = new Developers("Joey", "Junior Developer", "50%")
const teamLead = new DevTeamLead("Regina", "Dev Team Lead", "90%")
teamLead.addMember(seniorDev)
teamLead.addMember(juniorDev)
console.log("Team members list:")
teamLead.showTeam()
console.log("Get Team members progress:")
teamLead.getProgress()
console.log("Removing Rachel from team:")
teamLead.removeMember(seniorDev)
console.log("Updated team members list:")
teamLead.showTeam()
const freelanceDev = new Developers("Ross", "Free Lancer", "80%")
console.log("Get freelance developer's progress:")
console.log(freelanceDev.getProgress())