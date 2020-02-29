/** Global variables */
var start, fruit, sqSize,
    directions = [], path = [], board = [],
    tries = 0;

function setup() {
    // randomSeed(5);
    randomSeed()
    createBoard();

    // Initializing variables
    start = board[3][1];
    start.snake = new Snake(3, 1, 3);

    // Adding the fruit
    var foundNewFruit = createNewFruit();
    if (!foundNewFruit) {
        noLoop();
        console.warn("No available spot found. (Game Won?)");
        return;
    }

    // Finding the new path
    findNewPath();

    createCanvas(windowWidth, windowHeight);
    frameRate(60);

    strokeCap(PROJECT);
    textAlign(CENTER, CENTER);

    // The size of one square
    sqSize = min(width / sizeX, height / sizeY);
}

function draw() {

    for (var i = 0; i < 1; ++i) {
        if (path.length != 0) {
            start = (path[path.length - 1]);
            path.splice(path.length - 1, 1);
        }

        if (fruit && start.snake.body[0].i == fruit.i && start.snake.body[0].j == fruit.j) {
            createBoard();

            // Initializing variables
            var newSnake = start.snake.copy();
            start = board[start.snake.body[0].i][start.snake.body[0].j];
            start.snake = newSnake//.grow();
            // current = start;

            // Adding the fruit
            var foundNewFruit = createNewFruit();
            if (!foundNewFruit) {
                noLoop();
                drawEverything();
                console.warn("No available spot found. (Game Won?)");
                return;
            }

            // Finding the new path
            findNewPath();
        }

    }
    drawEverything();

}