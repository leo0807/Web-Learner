class Score{
    // 记录分数和等级
    score = 0;
    level = 1;
    // 相对应的元素
    scoreELe: HTMLElement;
    levelELe: HTMLElement;
    // 等级限制变量
    maxLevel: number;
    // 设置变量表示多少分升一级
    upScore: number;
    constructor(maxLevel:number = 10,upScore: number = 10) {
        this.scoreELe = document.getElementById('score')!;
        this.levelELe = document.getElementById('level')!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

    addScore() {
        this.score++;
        this.scoreELe.innerHTML = this.score + '';
        this.score % this.upScore === 0 && this.levelUp();
    }
    // 提升等级
    levelUp() {
        if (this.level < this.maxLevel) {
            this.levelELe.innerHTML = ++this.level + '';
        }
        
    }
}
export default Score;