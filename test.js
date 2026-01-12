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



for( let i = 0; i < winningLines.length; i++){
            for( let j = 0; j < winningLines[i].length; j++){
                for( let k = 0; k < winningLines[i][j].length; k++){
                    console.log(winningLines[i][j][k]);
                }
            }
        }

const board =
        ['x', 'o', 'x',
        'o', 'x', 'o',
        'x', '', '']


console.log(board[0][0]);

console.log(Gamecontroller.player1.marker);