import React, { useContext, useEffect, useState } from 'react';
import { Square } from "./Square"
import './Board.css'
import { useSelector } from 'react-redux';
import ResetButton from './ResetButton';
import ResetGameBoardOnly from './ResetGameBoardOnlyFunction'
import { useParams } from 'react-router';

function CreateBoardComponent(boardState, board) {
    let boardComponent = [];

    for (let i = 0; i < boardState.length; i++) {
        let row = boardState[i];
        for (let j = 0; j < row.length; j++) {
            boardComponent.push((<Square symbol={boardState[i][j]} x={i} y={j} board = {board} />))
        }
    }

    return boardComponent;
}

export default function Board() {

    const gameType = useParams().gameType;
    const clickCount = useSelector((state) => state.clickCount)
    const board1State = useSelector((state) => state.board1)
    const board2State = useSelector((state) => state.board2)

    // useEffect(() => dispatch({type: "CREATE_GAME_BOARD", gameType}), [])

    const boardComponent1 = CreateBoardComponent(board1State, "board1");
    const boardComponent2 = CreateBoardComponent(board2State, "board2");


    
    return (
        <div>
            <h3>{"This is an " + gameType + " game " + clickCount}</h3>
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
            <ResetButton text="Reset, pls"/>
            <ResetGameBoardOnly text="Game board only, pls" />
        </div>
    )
}