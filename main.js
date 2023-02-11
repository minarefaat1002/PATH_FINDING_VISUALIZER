var board;
var rows = 60;
var cols = 120;
var count = 0;
var source = null;
var target = null;
window.onload = function() {
    initializer();
}

function reset() {
    initializer();
}

function initializer() {
    document.getElementById("board").innerHTML = "";
    count = 0;
    setBoard();
    $('.tile').click(function(e) {
        if (count == 0) {
            source = e.target;
            e.target.classList.add('source');
            count++;
        } else if (count == 1) {
            target = e.target;
            e.target.classList.add("destination");
            count++;
        } else {
            $("#board").mousedown(function() {
                $(".tile").mousemove(function(event) {
                    event.target.classList.add("red");
                });
            }).mouseup(function() {
                $('.tile').unbind('mousemove');
            }).mouseout(function() {
                $(this).unbind('mousemove');
            });
        }
    })
}


function setBoard() {
    board = [];
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < cols; c++) {
            row.push(' ');
            let tile = document.createElement("div");
            tile.id = r.toString() + '-' + c.toString();
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function shortestPath() {
    // Create a Queue and add our initial node in it
    var arr = [];
    for (var x = 0; x < rows; x++) {
        arr[x] = [];
        for (var y = 0; y < cols; y++) {
            arr[x][y] = "";
        }
    }

    let q = [source];
    let explored = new Set();
    q.push(source);

    // Mark the first node as explored explored.
    explored.add(node);

    // We'll continue till our queue gets empty
    directions = [
        [-1, 0],
        [1, 0],
        [0, 1],
        [0, -1],
    ]
    while (q.length != 0) {
        let t = q.shift();
        if (t === target) {
            break;
        }
        t.classList.remove("yellow");
        if (t != source && t != target)
            t.classList.add("aqua");
        let coords = t.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);
        for (direction of directions) {
            dr = direction[0];
            dc = direction[1];
            newR = r + dr;
            newC = c + dc;
            if (newR >= 0 && newC >= 0 && newR < rows && newC < cols) {
                newNode = document.getElementById(newR + "-" + newC);
                if (explored.has(newNode) || newNode.classList.contains("red"))
                    continue;
                if (newNode != target)
                    newNode.classList.add("yellow");
                arr[newR][newC] = t;
                explored.add(newNode);
                q.push(newNode);
            }
        }
        await sleep(.01);
    }
    var node = target;
    let coords = node.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    while (node != source) {
        let coords = node.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);
        node = arr[r][c];
        if (node != source) {
            node.classList.remove("aqua");
            node.classList.add("black");
        }
        await sleep(.01);
    }
}