function Gameboard(){
    const array = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]

    return{array}
}

function Player(name, marker){
    return {name, marker}
}

const Gamecontroller = (() => {
    const board = Gameboard();

    const winningLines = [
        //diagonal
            [[0,0],[1,1],[2,2]],
            [[0,2],[1,1],[2,0]],

        //vertical
            [[0,0],[1,0],[2,0]],
            [[0,1],[1,1],[2,1]],
            [[0,2],[1,2],[2,2]],
        
        //horizontal
            [[0,0],[0,1],[0,2]],
            [[1,0],[1,1],[1,2]],
            [[2,0],[2,1],[2,2]],
        ]; 

    let xWinner = false;
    let oWinner = false;
    let turns = 0;
    let gameOver = false;
    let marker = '';

    const checkWinner = function(board) {
        for (let i = 0; i < winningLines.length; i++) {
            let xCounter = 0;
            let oCounter = 0;

            for (let j = 0; j < winningLines[i].length; j++) {
                const [row, col] = winningLines[i][j];
                if (board[row][col] === 'x') {
                    xCounter++;
                }else if (board[row][col] === 'o'){
                    oCounter++;
                }
            }
            if (xCounter === 3) {
                xWinner = true;
                return true;
            }else if (oCounter === 3){
                oWinner = true;
                return true;
            }
        }
        
        return false;
    };

    const whoWon = () => {
        checkWinner(board.array)
        if(xWinner){
            console.log("x Won the game");
            divsBtnDiv.style.pointerEvents = "none";
            p.textContent = "X WON THE GAME!"
        }else if(oWinner){
            console.log("o Won the game");
            divsBtnDiv.style.pointerEvents = "none";
            p.textContent = "O WON THE GAME!"
        }

    };

    const turn = () => {
        turns++
        if(turns % 2 !== 0){
            marker = 'x';
        }
        if(turns % 2 == 0){
            marker = 'o';
        }
        if(turns === 9){
            gameOver = true;
            console.log("game over");
            p.textContent = "GAME OVER. NO WINNER"
        }
    }

    const createRestartBtn = () => {
        if(turns == 9 || xWinner || oWinner){
            const restart = document.createElement('button');
            restart.textContent = 'Restart?'
            restart.classList.add("restartBtn");

            restart.addEventListener('click', () => {
                 location.reload();
            })

            displayDiv.appendChild(restart);
        }
    }

    //map button ID -> row & column
    const getBoardPosition = (id) => {
    const index = Number(id) - 1;
    return {
        row: Math.floor(index / 3),
        col: index % 3
    };
    }

    //Extract shared logic into one function
    const handleMove = (cell) => {
    const { row, col } = getBoardPosition(cell.id);

    turn();
    board.array[row][col] = marker;
    
    cell.textContent = marker;
    cell.classList.add("played");
    cell.style.pointerEvents = "none";
    
    console.log(board.array);
    whoWon();
    createRestartBtn();
    }

    return{
        handleMove,
    }
})();

const divsBtnDiv = document.querySelector('.grid-container');
const p = document.querySelector('p')
const displayDiv = document.querySelector('.display-container')
const startBtn = document.getElementById('start-btn');

let gameStart = false;

if(!gameStart){
    divsBtnDiv.style.pointerEvents = "none";
}

function startGame() {
    gameStart = true;
    if(gameStart){
        divsBtnDiv.style.pointerEvents = "auto";
    }
}

//clean event listener no switch
divsBtnDiv.addEventListener("click", (event) => {
  const cell = event.target;

  if (!cell.id) return; // safety

  Gamecontroller.handleMove(cell);
});

startBtn.addEventListener('click', () => {
    startGame(gameStart)
    console.log("start button clicked");
    console.log(gameStart);
})
