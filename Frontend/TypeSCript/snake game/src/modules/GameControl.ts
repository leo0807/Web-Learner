import Snake from './Snake';
import Score from './Score';
import Food from './Food';

class GameControl{
    snake: Snake;
    food: Food;
    score: Score;
    // 创建一个属性 存储蛇的方向
    direction: string = 'Right';
    // 记录游戏是否结束
    isLive: boolean = true;
    constructo() {
        this.snake = new Snake();
        this.food = new Food();
        this.score = new Score();

        this.init();
    }

    // 游戏初始化
    init() {
        document.addEventListener('keydown', this.keyDownHandler.bind(this));
        this.run();
    }

    // 键盘按下的响应函数
    keyDownHandler(event:KeyboardEvent) {
        // 修改方向
        this.direction = event.key;
    }

    // 创建空值蛇移动方法
    run() {
        let X = this.snake.X;
        let Y = this.snake.Y;
        switch (this.direction) {
            case "ArrowUp":
            case "Up":
                Y -= 10;
                break;
            case "ArrowDown":
            case "Down":
                Y += 10;
                break;
            case "ArrowLeft":
            case "Left":
                X -= 10;
                break;
            case "ArrowRight":
            case "Right":
                X += 10;
                break;
            default:
                break;
        }   
        this.checkEat(X, Y);
        try {
            // 修改蛇的X和Y
            this.snake.X = X;
            this.snake.Y = Y;
        } catch(e){
            alert(e.message);
            this.isLive = false;
        }
        // 开启一个定时调用
        // 重复执行run函数
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.score.level - 1) * 30);
    }

    // 检查蛇是否吃到了食物
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            this.food.change();
            this.score.addScore();
            this.snake.addBody();
        }
    }

}
export default GameControl;