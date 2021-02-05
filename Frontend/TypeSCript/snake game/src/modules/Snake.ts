class Snake{
    // 蛇头元素
    head: HTMLElement;
    // 蛇的身体 包括蛇头 
    bodies: HTMLCollection;
    // 蛇的容器
    element: HTMLElement;
    constructor() {
        this.element = document.getElementById('snake')!;
        this.head = document.querySelector('#snake>div') as HTMLElement;
        this.bodies = this.element.getElementsByTagName('div');
    }
    get X() {
        return this.head.offsetLeft;
    }
    get Y() {
        return this.head.offsetTop;
    }
    set X(value: number) {
        if (this.X === value) return;
        // 是否撞墙 判断X的合法范围
        if (value < 0 || value > 290) {
            throw Error('Hit the wall');
        }
        // 禁止蛇左右掉头
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            // 如果发生了掉头 则令蛇继续按犯方向行进， 因为此时已经出发了掉头
            if (value > this.X) {
                // 如果新值value大于旧值X，说明此时蛇头方向为右
                value = this.X - 10;
            } else {
                value = this.X + 10;
            }
        }
        this.moveBody();
        this.head.style.left = value + 'px';
        this.checkHead();
    }
    set Y(value: number) {
        if (this.Y === value) return;
        if (value < 0 || value > 290) {
            throw Error('Hit the wall');
        }
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            // 如果发生了掉头 则令蛇继续按犯方向行进， 因为此时已经出发了掉头
            if (value > this.Y) {
                // 如果新值value大于旧值X，说明此时蛇头方向为右
                value = this.Y - 10;
            } else {
                value = this.Y + 10;
            }
        }
        this.moveBody();
        this.head.style.top = value + 'px';
        this.checkHead();
    }

    // 增加身体长度
    addBody() {
        this.element.insertAdjacentHTML('beforeend', '<div></div>');
    }

    moveBody() {
        for (let i = this.bodies.length - 1; i > 0; i--){
            // 获取身体的位置
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft; 
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
            
            // 将值设置到当前身体上
            (this.bodies[i - 1] as HTMLElement).style.left = X + 'px';
            (this.bodies[i - 1] as HTMLElement).style.top = Y + 'px';
        }
    }
    // 检查头是否和头相撞
    checkHead() {
        // 获取所有身体是否和头部相撞
        for (let i = 1; i < this.bodies.length; i++){
            let bd = this.bodies[i] as HTMLElement;
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                // 说明蛇头撞到身体
                throw new Error('Hit the body');

            }
        }
    }
}

export default Snake;