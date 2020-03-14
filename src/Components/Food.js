export default class Food {
    constructor(limit) {
        this.x = this.getRandomNumber(1, limit);
        this.y = this.getRandomNumber(1, limit);
        this.limit = limit;
    }

    changePosition() {
        this.x = this.getRandomNumber(0, this.limit);
        this.y = this.getRandomNumber(0, this.limit);
    }

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    getR1C1() {
        return `r${this.y}c${this.x}`
    }
}