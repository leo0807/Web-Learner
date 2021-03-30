class Scheduler {
    constructor(count = 2) {
        this.count = count;
        this.queue = [];
        this.run = [];
    }
    add(task) {
        this.queue.push(task);
        return this.schedule();
    }
    schedule() {
        if (this.run.length < this.count && this.queue.length) {
            const task = this.queue.shift();
            const promise = task().then(() => {
                this.run.splice(this.run.indexOf(promise, 1));
            });
            this.run.push(promise);
            return promise;
        } else {
            return Promise.race(this.run).then(() => this.schedule());
        }
    }
}

const timeout = (time) => new Promise(resolve => {
    setTimeout(resolve, time);
});
const scheduler = new Scheduler();
const addTask = (time, order) => {
    scheduler.add(() => timeout(time)).then(() => console.log(order));
}
addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')
// output: 2 3 1 4

class Schedule2 {
    constructor(count = 2) {
        this.count = count;
        this.tasks = [];
        this.cocurrent = 0;
    }
    add(promiseCreator) {
        return new Promise(resolve => {
            this.tasks.push(() => promiseCreator().then(resolve));
        });
    }
    runTask() {
        if (this.cocurrent >= this.count) return;
        let currentTask = this.tasks.shift();
        if (currentTask) {
            this.cocurrent++;
            currentTask().then(() => {
                this.cocurrent--;
                this.runTask();
            })
        }
    }
}