export default class Snake {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.xSpeed = 1;
        this.ySpeed = 0;
        this.tail = [{x:0, y:0}]
    }

    update() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        // Shifting the values every update
        for( let i = 0; i < this.tail.length; i++ ) {
            if(this.tail[i+1]) {
                this.tail[i] = this.tail[i + 1];
            }
        }

        // Adding new value to the head of the snake
        this.tail[this.tail.length - 1] = {x: this.x, y: this.y};
    }

    grow() {
        // Add the last address
        this.tail.unshift(this.tail[0]);
    }
}