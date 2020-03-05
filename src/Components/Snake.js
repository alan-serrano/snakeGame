export default class Snake {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.xSpeed = 1;
        this.ySpeed = 0;
    }

    update() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }
}