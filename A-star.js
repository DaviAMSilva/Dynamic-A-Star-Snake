/**
 * This function will calculate the optimal path from @param _start to @param _fruit in @param _board
 *
 * @param {Square} _start Start of the search
 * @param {Square} _fruit End of the search
 * @param {Function} _heuristic The heuristic (distance) function
 * 
 * @returns {Vector2D[]} contains the directions of the found path
 */
function aStar(_start, _fruit, _heuristic = heuristic) {
    openSet = [_start];
    closedSet = [];
    var path = [];

    while (openSet.length > 0) {
        // Chooses the best option to evaluate next
        var winner = 0;
        for (var i = 0; i < openSet.length; ++i) {
            if (openSet[i].f > openSet[winner].f) {
                winner = i;
            } else if (openSet[i].f === openSet[winner].f) {
                if (openSet[i].h > openSet[winner].h) {
                    winner = i;
                }
            }
        }

        // current = new best option
        var current = openSet[winner];

        // End condition
        if (current === _fruit) {
            var temp = current;
            while (temp.previous) {
                path.push(temp);
                temp = temp.previous;
            }

            tries = 0;
            return path;
        }

        // Switch current from open to closed
        var index = openSet.indexOf(current);
        openSet.splice(index, 1);
        closedSet.push(current);

        // Check all neighbors
        var neighborList = current.neighbors;
        for (var i = 0; i < neighborList.length; ++i) {
            var neighbor = neighborList[i];

            // Valid next spot ?
            if (
                !closedSet.includes(neighbor) &&
                !neighbor.wall &&
                !current.snake.collidesWith(neighbor, 1)
                // &&
                // pathExists(current, neighbor, board[current.snake.body[current.snake.body.length-2].i][current.snake.body[current.snake.body.length-2].j])
            ) {
                var tempG = current.g + _heuristic(neighbor, current);
                //if (!pathExists(current, neighbor, board[current.snake.body[current.snake.body.length - 1].i][current.snake.body[current.snake.body.length - 1].j])) {
                if (current.snake.lastTail && !pathExists(current, neighbor, board[current.snake.lastTail.i][current.snake.lastTail.j])) {
                    tempG -= Infinity;
                } else if (current == _fruit) {
                    tempG -= Infinity;
                }

                // Is this a better path than before?
                var newPathFound = false;
                if (openSet.includes(neighbor)) {
                    if (tempG > neighbor.g) {
                        neighbor.g = tempG;
                        newPathFound = true;
                        // neighbor.snake = current.snake.copy().move(getDirection(neighbor.i - current.i, neighbor.j - current.j));
                        // if (neighbor == _fruit) neighbor.snake.grow();
                    }
                } else {
                    neighbor.g = tempG;
                    newPathFound = true;
                    // neighbor.snake = current.snake.copy().move(getDirection(neighbor.i - current.i, neighbor.j - current.j));
                    // if (neighbor == _fruit) neighbor.snake.grow();
                    openSet.push(neighbor);
                }

                // Yes, it's a better path
                if (newPathFound) {
                    neighbor.h = _heuristic(neighbor, _fruit);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                    neighbor.snake = current.snake.copy().move(getDirection(neighbor.i - current.i, neighbor.j - current.j));
                    if (neighbor == _fruit) neighbor.snake.grow();
                }
            }

        }

        if (openSet.length == 0 && tries < 100) {
            // console.log("Tried");
            openSet = [_start];
            closedSet = [];
            ++tries;
        }
    }

    // No solution found
    console.log('No solution');
    return [];

}