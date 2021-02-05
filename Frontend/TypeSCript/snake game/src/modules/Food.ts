class Food{
    element: HTMLElement;
    constructor() {
        this.element = document.getElementById('food')!; //！表示不会为空
    }
    // 获取食物X轴坐标方法
    get X() {
        return this.element.offsetLeft;
    }
    get Y() {
        return this.element.offsetTop;
    }
    // 改变食物位置
    change() {
        // 生成随机位置 0-290
        // 蛇每移动一次就是一个格子，一格子大小为10单位 所以食物位置须为整10

        let top = Math.round(Math.random() * 29) * 10;
        let left = Math.round(Math.random() * 29) * 10;
        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px';
    }
}

export default Food;