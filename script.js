let rows = 3;
let columns = 3;

let currTile;
let otherTile;

let turns = 0;

var finalOrder = ["1","2","3","4","5","6","7","8","9"];
var imgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];

window.onload = function () {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement('img');
            tile.id = r.toString() + "-" + c.toString();
            tile.className = "w-1/3 border-[1px] border-black";
            tile.src = "./images/" + imgOrder.shift() + ".jpg";

            tile.addEventListener('dragstart', dragStart);
            tile.addEventListener('dragover', dragOver);
            tile.addEventListener('dragenter', dragEnter);
            tile.addEventListener('dragleave', dragLeave);
            tile.addEventListener('drop', dragDrop);
            tile.addEventListener('dragend', dragEnd);

            document.getElementById('board').append(tile);
        }
    }
}

function dragStart() {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() { }

function dragDrop() {
    otherTile = this;
}

function dragEnd() {
    if (!otherTile.src.includes('3.jpg')) {
        return;
    }

    let CurrLoc = currTile.id.split("-");
    let r1 = parseInt(CurrLoc[0]);
    let c1 = parseInt(CurrLoc[1]);

    let OtherLoc = otherTile.id.split("-");
    let r2 = parseInt(OtherLoc[0]);
    let c2 = parseInt(OtherLoc[1]);

    // Check for adjacency
    let moveLeft = (r1 == r2 && c1 == c2 - 1);
    let moveRight = (r1 == r2 && c1 == c2 + 1);
    let moveUp = (c1 == c2 && r1 == r2 - 1);
    let moveDown = (c1 == c2 && r1 == r2 + 1);

    let isAdjacent = (moveLeft || moveRight || moveUp || moveDown);

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns++;
        document.getElementById('turn').innerText = turns;

        // Check
        setTimeout(() => {
            let arr = [];
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < columns; c++) {
                    let tile = document.getElementById(r.toString() + "-" + c.toString());
                    let url = tile.src;
                    let parts = url.split('/');
                    let fileName = parts[parts.length - 1]; // This will be '6.jpg'
                    let number = fileName.split('.')[0]; // This will be '6'
                    arr.push(number);
                }
            }

            if (arraysEqual(finalOrder, arr)) {
                alert(`Done in ${turns} moves`);
            }
        }, 100); 
    }
}


function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}
