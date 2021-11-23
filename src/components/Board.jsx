import { Square } from "./Square"
import React from 'react';
import { useSelector } from "react-redux";


function createBoardComponent(boardState,playing, winning, shipNum) {
    let boardComponent = [];
    let canDrop = shipCanDrop(boardState, shipNum)

    for (let i = 0; i < boardState.length; i++) {
        let row = boardState[i];
        for (let j = 0; j < row.length; j++) {
            let square = boardState[i][j];
            boardComponent.push(
                (<Square hit={square.hit} ship ={square.ship} x={i} y={j}
                     board={square.board} playing = {playing} winning = {winning}
                     canDrop = {canDrop} isOver={square.isOver}/>))
        }
    }

    return boardComponent;
}

function shipCanDrop(boardState, shipNum) {
    let ship = [];
    for (let i=0; i < boardState.length;i++) {
        let row = boardState[i];
        for (let j=0;j <boardState.length;j++) {
            let square = boardState[i][j];
            if (square.isOver && !square.ship) {
                ship.push(square);
            }
        }
    }

    return ship.length === shipNum;
}

export default function Board(props) {

    let shipNum = useSelector((state) => state.shipNum);

    const boardComponent = createBoardComponent(props.boardState, props.playing, props.winning, shipNum);


    return (
        <div class="board" >
                {boardComponent}
        </div>
    )
}