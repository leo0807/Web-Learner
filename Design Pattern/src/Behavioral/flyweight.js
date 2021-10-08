/**
 *
 * 享元模式
 * 运用共享技术有效地支持大量细粒度对象的复用。
 * 系统只使用少量的对象，而这些对象都很相似，状态变化很小，可以实现对象的多次复用。
 * 由于享元模式要求能够共享的对象必须是细粒度对象，因此它又称为轻量级模式，它是一种对象结构型模式。
 *
 * 一个享元对象有两种状态：
 * 内在：此状态存储在享元中。它包含对象内部方法所需的信息。它独立于享元的上下文，并且可以与其他对象共享。
 * 外在：这个状态取决于享元的上下文，它不能被共享。通常，客户端对象在需要时将外部状态传递给享元对象。
 *
 * 使用场景：
 * 1. 文件上传需要创建多个文件实例的时候
 * 2. 如果一个应用程序使用了大量的对象，而这些大量的对象造成了很大的存储开销时就应该考虑使用享元模式
 * 3.
 *
 * 优点：
 * 大大减少对象的创建，降低系统的内存，使效率提高。
 *
 * 缺点：
 * 提高了系统的复杂度，需要分离出外部状态和内部状态，而且外部状态具有固有化的性质
 */

// E.g.1
let examCarNum = 0         // 驾考车总数
/* 驾考车对象 */
class ExamCar {
    constructor(carType) {
        examCarNum++
        this.carId = examCarNum
        this.carType = carType ? '手动档' : '自动档'
        this.usingState = false    // 是否正在使用
    }

    /* 在本车上考试 */
    examine(candidateId) {
        return new Promise((resolve => {
            this.usingState = true
            console.log(`考生- ${candidateId} 开始在${this.carType}驾考车- ${this.carId} 上考试`)
            setTimeout(() => {
                this.usingState = false
                console.log(`%c考生- ${candidateId} 在${this.carType}驾考车- ${this.carId} 上考试完毕`, 'color:#f40')
                resolve()                       // 0~2秒后考试完毕
            }, Math.random() * 2000)
        }))
    }
}

/* 手动档汽车对象池 */
ManualExamCarPool = {
    _pool: [],                  // 驾考车对象池
    _candidateQueue: [],        // 考生队列

    /* 注册考生 ID 列表 */
    registCandidates(candidateList) {
        candidateList.forEach(candidateId => this.registCandidate(candidateId))
    },

    /* 注册手动档考生 */
    registCandidate(candidateId) {
        const examCar = this.getManualExamCar()    // 找一个未被占用的手动档驾考车
        if (examCar) {
            examCar.examine(candidateId)           // 开始考试，考完了让队列中的下一个考生开始考试
                .then(() => {
                    const nextCandidateId = this._candidateQueue.length && this._candidateQueue.shift()
                    nextCandidateId && this.registCandidate(nextCandidateId)
                })
        } else this._candidateQueue.push(candidateId)
    },

    /* 注册手动档车 */
    initManualExamCar(manualExamCarNum) {
        for (let i = 1; i <= manualExamCarNum; i++) {
            this._pool.push(new ExamCar(true))
        }
    },

    /* 获取状态为未被占用的手动档车 */
    getManualExamCar() {
        return this._pool.find(car => !car.usingState)
    }
}

ManualExamCarPool.initManualExamCar(3)          // 一共有3个驾考车
ManualExamCarPool.registCandidates([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])  // 10个考生来考试

// E.g.2
class CodeFile {
    constructor(codefileName) {
        this.codefileName = codefileName
    }
}


class Formatter {
    format(codefile) { }
}


class PythonFormatter extends Formatter {

    constructor() {
        super()
        console.log("Python Formatter instance created")
    }


    format(codefileName) {
        console.log(`"Formatting the Python ${codefileName} file you uploaded.`)
    }

}

class JavaFormatter extends Formatter {

    constructor() {
        super()
        console.log("Java Formatter instance created")
    }


    format(codefileName) {
        console.log(`"Formatting the Java ${codefileName} file you uploaded.`)
    }

}


class FormatterFactory {
    constructor() {
        this.myFormatterMap = new Map()
    }

    createFormatter(formatterType) {
        let formatter = this.myFormatterMap.get(formatterType)
        if (formatter == null) {
            if (formatterType == "Python") {
                formatter = new PythonFormatter()
            }
            else if (formatterType == "Java") {
                formatter = new JavaFormatter()
            }
            this.myFormatterMap.set(formatterType, formatter);
        }
        return formatter
    }
}

const codefile1 = new CodeFile("helloworld.py")
let formatter = new FormatterFactory()
const pythonFormatter = formatter.createFormatter("Python")
pythonFormatter.format(codefile1.codefileName)
//uploading new codefile Python file
const codefile2 = new CodeFile("test.py")
const anotherPythonFormatter = formatter.createFormatter("Python")
anotherPythonFormatter.format(codefile2.codefileName)
console.log("Both Python Formatter instances are the same? " + (anotherPythonFormatter === pythonFormatter))
//uploading a Java file
const codefile3 = new CodeFile("myfile.java")
const javaFormatter = formatter.createFormatter("Java")
javaFormatter.format(codefile3.codefileName)


// E.g.3
class Dress {
    constructor(serialNumber, type, color, designer, availability) {
        this.serialNumber = serialNumber
        this.type = type
        this.color = color
        this.designer = designer
        this.availability = availability
        this.price = 0
    }
    dressPrice() {
        if (this.type == "maxi") {
            this.price = 1000
        }
        if (this.type == "gown") {
            this.price = 2000
        }
        if (this.type = "skirt") {
            this.price = 500
        }
        return this.price
    }
}

class DressFactory {
    constructor() {
        this.existingDresses = {}
    }

    createDress(serialNumber, type, color, designer, availability) {
        var exists = this.existingDresses[serialNumber]

        if (!!exists) {
            return this.existingDresses[serialNumber]
        }
        else {
            var dress = new Dress(serialNumber, type, color, designer, availability)
            this.existingDresses[serialNumber] = dress
            return dress
        }
    }
}