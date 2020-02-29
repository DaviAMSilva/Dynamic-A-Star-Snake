function createBoard() {
    board = [];
    for (var i = 0; i < sizeX; ++i) {
        board[i] = [];
        for (var j = 0; j < sizeY; ++j) {
            var isWall = (i == 0 || j == 0 || i == sizeX - 1 || j == sizeY - 1);
            board[i][j] = new Square(i, j, isWall);
        }
    }

    for (var i = 1; i < sizeX - 1; ++i) {
        for (var j = 1; j < sizeY - 1; ++j) {
            for (const p of dirList) {
                if (!board[i + p.i][j + p.j].wall)
                    board[i][j].neighbors.push(board[i + p.i][j + p.j]);
            }
        }
    }
}

function findNewPath() {
    // Make new path
    path = aStar(start, fruit, heuristic);
    
    directions = [];
    for (var i = path.length - 2; i >= 0; --i) {
        directions.push(getDirection(path[i].i - path[i+1].i,path[i].j - path[i+1].j));
        // if (d.i === -1 && d.j === 0) { directions.push(RIGHT); continue; }
        // if (d.i === 0 && d.j === -1) { directions.push(DOWN); continue; }
        // if (d.i === +1 && d.j === 0) { directions.push(LEFT); continue; }
        // if (d.i === 0 && d.j === +1) { directions.push(UP); continue; }
    }
}