function Gameboard(){
    const board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]

    return{board}
}

function Player(name, marker){
    return {name, marker}
}

const Gamecontroller = (() => {
    const board = Gameboard();

    const winningLines = [
        //diagonal
            [[0,0],[1,2],[2,2]],
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
        checkWinner(board.board);
        if(xWinner){
            console.log("x Won the game");     
        }else if(oWinner){
            console.log("o Won the game");
        }
    }

    const turn = () => {
        turns++
        if(turns === 9){
            gameOver = true;
            console.log("game over");
        }
    }


    return{
        board,
        checkWinner,
        whoWon,
        // player1,
        // player2,
        turn,
    }
})();

const player1 = Player('Aem', 'x');
const player2 = Player('Jjae', 'o');
Gamecontroller.board.board[0][0] = player2.marker;
Gamecontroller.board.board[1][2] = player2.marker;
Gamecontroller.board.board[2][2] = player2.marker;
Gamecontroller.whoWon();
// const divsBtnDiv = document.querySelector('.grid-container');
