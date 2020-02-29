const sizeX = 10,
    sizeY = 10;

const dirList = [
    new Vector2D(1, 0), // RIGHT
    new Vector2D(0, 1), // DOWN
    new Vector2D(-1, 0), // LEFT
    new Vector2D(0, -1) // UP
]

const RIGHT = dirList[0],
    DOWN = dirList[1],
    LEFT = dirList[2],
    UP = dirList[3];

/**
 * Takes two vectors and calculates the distance
 *
 * @param {Vector2D} a
 * @param {Vector2D} b
 * @returns {Number} distance
 */
function heuristic(a, b) {
    // return abs(a.i - b.i) + abs(a.j - b.j); // Orthogonal distance
    return dist(a.i, a.j, b.i, b.j); // Cartesian distance
}

/**
 * Generates a new random fruit
 * @returns Found new fruit?
 */
function createNewFruit() {
    var possible = [];
    for (var i = 0; i < sizeX; ++i) {
        for (var j = 0; j < sizeX; j++) {

            var atSnake = false;
            for (const s of start.snake.body) {
                if (board[s.i] && board[s.i][s.j] === board[i][j]) {
                    var atSnake = true;
                    break;
                }
            }

            if (!board[i][j].wall && !atSnake) possible.push(board[i][j]);
        }
    }

    fruit = random(possible);

    return (possible.length > 0);
}

/**
 * Returns the direction based on the given parameters
 *
 * @param {Number} a
 * @param {Number} b
 * @returns {Vector2D}
 */
function getDirection(a, b) {
    // if (a === -1 && b === +0) return RIGHT;
    // if (a === +0 && b === -1) return DOWN;
    // if (a === +1 && b === +0) return LEFT;
    // if (a === +0 && b === +1) return UP;

    switch (a + 2 * b) {
        case -1: return LEFT;
        case -2: return UP;
        case +1: return RIGHT;
        case +2: return DOWN;
        default: console.warn("Invalid direction: (" + a + ", " + b + ")");
    }
}



/**
 * Tells if a path between two points exists
 *
 * @param {*} start
 * @param {*} end
 * @returns {Boolean} Path exists?
 */
function pathExists(current, start, end) {
    var set = [];
    set.push(start);

    var temp, returnValue = false;
    while (set.length > 0) {

        temp = set.shift();
        temp.visited = true;

        for (neighbor of temp.neighbors) {
            if (!neighbor.visited && !current.snake.collidesWith(neighbor, 1)) {
                if (neighbor == end) {
                    returnValue = true;
                    break;
                } else {
                    neighbor.visited = true;
                    set.push(neighbor);
                }
            }
        }

    }

    // Resetting the values
    for (var i = 1; i < sizeX - 1; ++i) {
        for (var j = 1; j < sizeY - 1; ++j) {
            board[i][j].visited = false;
        }
    }

    return returnValue;
}

/**
 * Draws every single thing
 *
 */
function drawEverything() {
    background(245);

    // Drawing the board
    stroke(0);
    strokeWeight(1);
    for (const _s of board) {
        for (const s of _s) {
            switch (s) {
                case fruit: fill(255, 0, 0); break;
                case start: fill(100, 0, 255); break;
                default: fill(255);
            }
            if (!s.wall) {
                strokeWeight(1);
                square(s.i * sqSize, s.j * sqSize, sqSize);
            }
        }
    }

    // Drawing the snake
    strokeWeight(sqSize * .8);
    var body = start.snake.body;
    for (var i = body.length - 2; i >= 0; i--) {
        stroke(255 * i / (body.length - 1), 200, 0);
        line((body[i].i + .5) * sqSize, (body[i].j + .5) * sqSize,
            (body[i + 1].i + .5) * sqSize, (body[i + 1].j + .5) * sqSize);
    }

    // Drawing the snake's head
    fill(0, 100, 0);
    noStroke();
    square((body[0].i + .1) * sqSize, (body[0].j + .1) * sqSize, sqSize * .8)

    // Drawing the path
    strokeWeight(sqSize * .1);
    for (var i = path.length - 2; i >= 0; --i) {
        stroke(0, 0, 255);
        line((path[i].i + .5) * sqSize, (path[i].j + .5) * sqSize,
            (path[i + 1].i + .5) * sqSize, (path[i + 1].j + .5) * sqSize);
    }
    if (path.length > 0) line((path[path.length - 1].i + .5) * sqSize, (path[path.length - 1].j + .5) * sqSize, (start.i + .5) * sqSize, (start.j + .5) * sqSize);

    // Drawing the stats
    // for (var i = 1; i < sizeX - 1; ++i) {
    //     for (var j = 1; j < sizeY - 1; ++j) {
    //         if (!board[i][j].wall) {
    //             fill(0);
    //             noStroke();
    //             text(nf(board[i][j].f, 0, 2), (board[i][j].i + .25) * sqSize, (board[i][j].j + .25) * sqSize)
    //         }
    //     }
    // }
}