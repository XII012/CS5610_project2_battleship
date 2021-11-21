// const defaultState = {
//     count: 0,
//     gameBoard: [['','','','','','','','','',''],
//     ['','','','','','','','','',''],
//     ['','','','','','','','','',''],
//     ['','','','','','','','','',''],
//     ['','','','','','','','','',''],
//     ['','','','','','','','','',''],
//     ['','','','','','','','','',''],
//     ['','','','','','','','','',''],
//     ['','','','','','','','','',''],
//     ['','','','','','','','','',''],]
// }
const defaultBoard = [['','','','','','','','','',''],
['','','','','','','','','',''],
['','','','','','','','','',''],
['','','','','','','','','',''],
['','','','','','','','','',''],
['','','','','','','','','',''],
['','','','','','','','','',''],
['','','','','','','','','',''],
['','','','','','','','','',''],
['','','','','','','','','',''],]

// const board = {
//     ship: null,
//     hit: false,
// }

function generateGameBoard() {
    // for (let i=0;i<defaultBoard.length;i++) {
    //     for (let j=0;j<defaultBoard.length;j++) {
    //         defaultBoard[i][j] = board;
    //     }
    // }
    return defaultBoard;
}

export default function board2Reducer(state, action) {
    debugger;
    
    if (state === undefined) {
        return generateGameBoard()

    }

    // if (action.type === "CREATE_GAME_BOARD") {
    //     alert("created a game board!")
    // }

    if (action.type === 'boardClick' && action.board === "board2") {
        const value = state[action.x][action.y];
        if (value === 'X') {
            state[action.x][action.y] = '0';
        } else {
            state[action.x][action.y] = 'X';
        }
        // check winning condition

        return [...state];
    }

    if (action.type === 'RESET' || action.type === 'RESET_GAMEBOARD_ONLY') {
        for (let i = 0; i < state.length; i++) {
            for (let j = 0; j < state.length; j++){
                state[i][j] = '';
            }
        }
        return [...state];
    }
    return state;
}
