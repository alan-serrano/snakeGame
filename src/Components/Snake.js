export default class Snake {
    constructor(limit) {
        this.x = 0;
        this.y = 0;
        this.xSpeed = 1;
        this.ySpeed = 0;
        this.tail = [{x:0, y:0}];
        this.limit = limit;
    }

    get isDeath() {
        // When it exceeds the limits of the grid
        if(this.x > this.limit || this.x < 0) {
            return true;
        }

        if(this.y > this.limit || this.y < 0) {
            return true;
        }

        // When it crosses some part of its tail
        for(let i = 0; i < this.tail.length - 1; i++) {
            let address = this.tail[i];

            if(this.x === address.x && this.y === address.y) {
                return true;
            }
        }

        return false;
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
        this.tail.push(this.tail[this.tail.length - 1]);
    }

    getR1C1() {
        let coordR1C1 = {};
        for (const coord of this.tail) {
            coordR1C1[`r${coord.y}c${coord.x}`] = null;
        }

        return coordR1C1;
    }
    
    getHeadR1C1() {
        return `r${this.y}c${this.x}`
    }
}