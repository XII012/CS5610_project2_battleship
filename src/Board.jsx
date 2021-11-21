import { Square } from "./Square"
import './Board.css'
import { useSelector } from 'react-redux';
import ResetButton from './ResetButton';
// import StartGame from './StartGameButton'
import { useParams } from 'react-router';

function createBoardComponent(boardState,validClick) {
    let boardComponent = [];
    let playing;
    if (validClick % 2 === 0) {
        playing = "board1";
    } else {
        playing = "board2";
    }

    for (let i = 0; i < boardState.length; i++) {
        let row = boardState[i];
        for (let j = 0; j < row.length; j++) {
            let square = boardState[i][j];
            boardComponent.push(
                (<Square hit={square.hit} ship ={square.ship} x={i} y={j}
                     board={square.board} playing = {playing}/>))
        }
    }

    return boardComponent;
}

function calculateScore(boardState) {
    let score = 0;
    for (let i = 0; i < boardState.length; i++) {
        let row = boardState[i];
        for (let j = 0; j < row.length; j++) {
            let square = boardState[i][j];
            if (square.ship && square.hit) {
                score += 1;
            }
        }
    }

    return score;
}

export default function Board() {

    const gameType = useParams().gameType;
    const clickCount = useSelector((state) => state.clickCount)
    const board1State = useSelector((state) => state.board1)
    const board2State = useSelector((state) => state.board2)

    const boardComponent1 = createBoardComponent(board1State, clickCount);
    const boardComponent2 = createBoardComponent(board2State, clickCount);


    let winner;
    let score1 = calculateScore(board1State);
    let score2 = calculateScore(board2State);
    

    if (score2 >= 17) {
        winner = "Player"
    }
    if (score1 >= 17) {
        winner = "AI"
    }


    return (
        <div>
            <h3>{"This is an " + gameType + " game. " + clickCount}</h3>
            <ResetButton text="Reset"/>
            <div>{(winner) ? "Game over! " + winner + " Won!" :""}</div>
            <div class="boards">
                <div>
                    <h3>Player 1</h3>
                    <div class="board">
                        {boardComponent1}
                    </div>
                </div>
                <div>
                    <h3>Player 2</h3>
                    <div class="board">
                        {boardComponent2}
                    </div>
                </div>
            </div>
            {/* <StartGame text="StartGame" /> */}
        </div>
    )
}