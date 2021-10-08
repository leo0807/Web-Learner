/**
 * 命令模式
 * 将一个请求封装成一个对象，从而让你使用不同的请求把客户端参数化，对请求排队或者记录请求日志，可以提供命令的撤销和恢复功能。
 * 
 * 优点：
 * 1. 对命令进行封装，使得命令易于拓展和修改
 * 2. 命令发出者和接受者解耦，使发出者不需要知道命令的具体执行过程即可执行
 * 
 * 缺点：
 * 使用命令模式可能导致某些系统命令过多
 * 
 * 使用场景：
 * 1. 在不同的时间排队和执行请求；
 * 2. 执行重置或撤销等操作；
 * 3. 保留提出请求对历史记录；
 * 
 * Invoker： 请求命令执行请求；
 * Command：有关动作的信息，并通过其调用相应操作将其绑定到接收者；
 * Receiver： 知道如何执行与命令相关的操作；
 * Client： 创建一个名命令，并设置接收者接受命令
 */

class Command {
    execute() { };
}

//TurnOnPrinter command
class TurnOnPrinter extends Command {

    constructor(printingMachine) {
        super();
        this.printingMachine = printingMachine;
        this.commandName = "turn on"
    }

    execute() {
        this.printingMachine.turnOn();
    }
}

//TurnOffPrinter command
class TurnOffPrinter extends Command {

    constructor(printingMachine) {
        super();
        this.printingMachine = printingMachine;
        this.commandName = "turn off"
    }

    execute() {
        this.printingMachine.turnOff();
    }

}

//Print command
class Print extends Command {

    constructor(printingMachine) {
        super();
        this.printingMachine = printingMachine;
        this.commandName = "print"
    }

    execute() {
        this.printingMachine.print();
    }

}

//Invoker
class PrinterControlPanel {
    pressButton(command) {
        console.log(`Pressing ${command.commandName} button`);
        command.execute();
    }
}

//Reciever: 
class PrintingMachine {

    turnOn() {
        console.log('Printing machine has been turned on');
    }

    turnOff() {
        console.log('Printing machine has been turned off');
    }

    print() {
        console.log('The printer is printing your document')
    }
}


const printingMachine = new PrintingMachine();
const turnOnCommand = new TurnOnPrinter(printingMachine);
const turnOffCommand = new TurnOffPrinter(printingMachine);
const printCommand = new Print(printingMachine)
const controlPanel = new PrinterControlPanel();
controlPanel.pressButton(turnOnCommand);
controlPanel.pressButton(turnOffCommand);
controlPanel.pressButton(printCommand);

// E.g.2
class Command {
    execute(args) { };
}

//Withdraw command
class WithDrawAmount extends Command {

    constructor(bankaccount) {
        super();
        this.bankaccount = bankaccount;
    }

    execute(args) {
        this.bankaccount.withdrawMoney(args);
    }
}

//CheckAmount command
class CheckAmount extends Command {

    constructor(bankaccount) {
        super();
        this.bankaccount = bankaccount
    }

    execute() {
        this.bankaccount.checkAmount()
    }
}

//DepositAmount command
class DepositAmount extends Command {

    constructor(bankaccount) {
        super();
        this.bankaccount = bankaccount
    }

    execute(args) {
        this.bankaccount.depositAmount(args)
    }
}

//Invoker
class AccountManager {
    request(command, args) {
        command.execute(args);
    }
}

//Reciever: 
class BankAccount {

    constructor(amount) {
        this.amount = amount
    }

    checkAmount() {
        console.log(this.amount)
    }

    withdrawMoney(withdrawamount) {
        if (withdrawamount > this.amount) {
            console.log("Not enough money")
        }
        else {
            this.amount -= withdrawamount
        }
    }
    depositAmount(money) {
        this.amount += money
    }
}