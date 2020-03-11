export default class Food {
    constructor(size) {
        this.x = this.random(1, size); // Position on the x axis. It represent the position in colum on the Grid
        this.y = this.random(1, size); // Position on the y axis. It represent the position in row on the Grid
        this.size = size; // Size of the Grid
    }

    /**
     * Changes position randomly 
     */
    show() {
        this.x = this.random(0, this.size);
        this.y = this.random(0, this.size);
    }

    /**
     * 
     * @param {number} min  - integer number
     * @param {number} max  - integer number
     * @return {number}     - Returns a random number between min and max value
     *  
     */
    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * 
     * @return {string} -   Returns the current position of the Food in the format "r0c0" where "r" mean "row", and "c" mean "column",
     *                      the numbers of the strings are the position
     */
    getR1C1() {
        return `r${this.y}c${this.x}`
    }
}