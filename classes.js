/**
 * Represents one square from the grid
 *
 * @class Square
 */
class Square {

    /**
     *Creates an instance of Square.
     * @param {Number} i
     * @param {Number} j
     * @param {Boolean} wall
     * @memberof Square
     */
    constructor(i, j, wall = false) {
        this.i = i;
        this.j = j;

        this.f = 0;
        this.g = 0;
        this.h = 0;

        this.wall = wall;
        this.neighbors = [];
        this.previous = [];
        this.visited = false;
        this.snake;
    }

}





/**
 * An object to store the snake information
 *
 * @class Snake
 */
class Snake {

    /**
     *Creates an instance of Snake.
     * @param {Number} i
     * @param {Number} j
     * @param {Number} l
     * @memberof Snake
     */
    constructor(i, j, l) {
        this.body = [];
        for (var s = 0; s < l; s++) {
            this.body[s] = new Vector2D(i - s, j)
        }

        // this.head = this.body[0];
        // this.tail = this.body[this.body.length - 1];
    }

    /**
     * Moves the body of the snake according to direction passed in
     *
     * @param {Vector2D} dir
     * @memberof Snake
     * @returns {Vector2D} this
     */
    move(dir) {
        var b = this.body;
        this.lastTail = b[b.length-1];

        b.splice(b.length - 1);

        var newHead = new Vector2D(b[0].i, b[0].j).sum(dir);

        // switch (dir) {
        //     case LEFT: newHead.sum(LEFT); break;
        //     case RIGHT: newHead.sum(RIGHT); break;
        //     case DOWN: newHead.sum(DOWN); break;
        //     case UP: newHead.sum(UP); break;
        //     default:
        //         console.warn(
        //             "Invalid direction: (" + dir + ")"
        //         );
        // }

        b.unshift(newHead);

        return this;
    }

    /**
     * Grows the snake
     *
     * @memberof Snake
     * @returns {Vector2D} this
     */
    grow() {
        // this.body.push(this.body[this.body.length - 1]);
        this.body.push(this.lastTail);
        // console.warn("Grew to size: " + this.body.length);
        return this;
    }

    /**
     * Does a deep clone of the snake and returns it
     *
     * @returns {Snake} A copy of the snake
     * @memberof Snake
     */
    copy() {
        var newReturnSnake = new Snake();
        newReturnSnake.body = [];
        newReturnSnake.lastTail = this.lastTail;

        for (const b of this.body) {
            newReturnSnake.body.push(new Vector2D(b.i, b.j));
        }

        return newReturnSnake;
    }

    /**
     *Checks to see if a specific Vector2D id colliding with this snake
     *
     * @param {Vector2D} a The Vector2D object
     * @param {Boolean} tailSkip Amount of pieces skipped in the tail
     * @memberof Snake
     * @returns {Boolean} True if the snake is colliding
     */
    collidesWith(a, tailSkip = 0) {
        var b = this.body;
        var loopEnd = b.length - tailSkip;

        // console.log(loopEnd);
        for (var i = 0; i < loopEnd; ++i) {
            if (a.i == b[i].i && a.j == b[i].j) {
                return true;
            }
        }

        return false;
    }

    /**
     * Checks to see if the snake is colliding with itself or the borders
     *
     * @returns {Boolean} Whether or not it's colliding
     * @memberof Snake
     * @returns If the snake is colliding with something
     */
    // checkCollision() {
    //     var b = this.body;

    //     for (var i = 1; i < b.length; ++i) {

    //         // try {
    //         //     if (b[i] == undefined) throw ("b[i], i:" + i);
    //         //     if (b[0] == undefined) throw ("b[0], i:" + i);
    //         // } catch (err) {
    //         //     console.log(err);
    //         // }
    //         if (b[i].i == b[0].i && b[i].j == b[0].j) {
    //             return true;
    //         }
    //     }

    //     return (
    //         b[0].i >= sizeX - 1 ||
    //         b[0].j >= sizeY - 1 ||
    //         b[0].i <= 0 ||
    //         b[0].j <= 0
    //     );
    // }

}




/**
 * Stores a 2-dimensional vector
 *
 * @class Vector2D
 * @property {Number} i
 * @property {Number} j
 */
class Vector2D {

    /**
     *Creates an instance of Vector.
     * @param {Number} i
     * @param {Number} j
     * @memberof Vector
     */
    constructor(i, j) {
        this.i = i;
        this.j = j;
    }

    /**
     * Sums two Vectors
     *
     * @param {Vector2D} dir
     * @returns {Vector2D} this
     */
    sum(dir) {
        this.i += dir.i;
        this.j += dir.j;
        return this;
    }

}