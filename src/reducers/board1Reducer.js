const defaultBoard = [[false, false, false, false, false, false, false, false, false, false],
[false, false, false, false, false, false, false, false, false, false],
[false, false, false, false, false, false, false, false, false, false],
[false, false, false, false, false, false, false, false, false, false],
[false, false, false, false, false, false, false, false, false, false],
[false, false, false, false, false, false, false, false, false, false],
[false, false, false, false, false, false, false, false, false, false],
[false, false, false, false, false, false, false, false, false, false],
[false, false, false, false, false, false, false, false, false, false],
[false, false, false, false, false, false, false, false, false, false],]

function generateGameBoard() {
    for (let i=0;i<defaultBoard.length;i++) {
        for (let j=0;j<defaultBoard.length;j++) {
            defaultBoard[i][j] = {
                board: "board1",
                ship: false,
                hit: false,
            };
        }
    }
    return defaultBoard;
}


function generateRandomShip(state, num, id) {
    let checkRepeat = false;
    let x = Math.floor(Math.random() * 9);
    let y = Math.floor(Math.random() * 9);
    let direction = Math.random();

    // Vertical
    if (direction >= 0.5) {
        if (x + num >= 9) {
            return false;
        } else {
            for (let i=0;i<num;i++) {
                if (state[x+i][y].ship) {
                    checkRepeat = true;
                }
            }
        }
    
        if (!checkRepeat) {
            for (let i=0;i<num;i++) {
                state[x+i][y].ship = "ship"+ id;
            }
            return true;
        }
    }

    // Horizontal
    if (direction < 0.5) {
        if (y + num >= 9) {
            return false;
        } else {
            for (let i=0;i<num;i++) {
                if (state[x][y+i].ship) {
                    checkRepeat = true;
                }
            }
        }
    
        if (!checkRepeat) {
            for (let i=0;i<num;i++) {
                state[x][y+i].ship = "ship"+ id;
            }
            return true;
        }
    }

    return false;
}

function startRandomGame(state) {
    let ships =[2, 3, 3, 4, 5,];
    for (let i=0;i<ships.length;i++) {
        let generateSucc = false;
        while(!generateSucc) {
            generateSucc = generateRandomShip(state, ships[i], i);
        }
    }

    return [...state];
}

export default function board1Reducer(state, action) {
    // debugger;

    
    if (state === undefined) {
        return generateGameBoard();

    }

    if (action.type === 'START_RANDOM') {
        startRandomGame(state);
        return [...state];
    }


    if (action.type === 'SELECT_SHIP' && action.board === "board1") {
        
        let checkRepeat = false;
        let max = action.y+action.shipNum-1;        

        if (max <= 9) {
            for (let i=0;i<action.shipNum;i++){
                if (state[action.x][action.y+i].ship) {
                    checkRepeat = true;
                }
            }

            if (!checkRepeat) {
                for (let i=0;i<action.shipNum;i++){
                    state[action.x][action.y+i].ship = action.shipId;
                }
            }
        }
        // if (max <= 9) {
        //     for (let i=0;i<action.shipNum;i++) {
        //         if (state[action.x][action.y+i].ship) {
        //             checkRepeat = true;
        //         }
        //     }

        //     if (!checkRepeat){
        //         for (let i=0;i<action.shipNum;i++){
        //             state[action.x][action.y+i].ship = action.shipId;
        //             }
        //     }
        // } else {
        //     return [...state];
        // }



        return [...state];
    }

    // if (action.type === 'SELECT_SHIP' && action.board === "board1") {
    //     let ship = action.ship;//[[x,y],[x,y]]
    //     let legal=true;
    //     for (let square in ship) {
    //         if (0 <= square[0] <= 9 && 0 <= square[1] <= 9) {
    //             if (state[square[0]][square[1]]) {
    //                 legal = false;
    //             }
    //         } else {
    //             legal = false;
    //         }
    //     }

    //     if (legal) {
    //         for (let square in ship) {
    //             state[square[0]][square[1]] = true;
    //         }
    //     }

    //     return [...state];
    // }


    if (action.type === 'boardClick' && action.board === "board1" && action.playing === "board2") {
        if (!state[action.x][action.y].hit) {
            state[action.x][action.y].hit = true;
        }
        // check winning condition

        return [...state];
    }

    if (action.type === 'RESET') {
        return startRandomGame(generateGameBoard());
    }
    return state;
}
