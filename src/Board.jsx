import { Square } from "./Square"
import './Board.css'
import { useSelector } from 'react-redux';
import ResetButton from './ResetButton';
// import StartGame from './StartGameButton'
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { LocalStorageContext } from './LocalStorageProvider';
import React, { useContext, useEffect, useState } from 'react';


function createBoardComponent(boardState,playing, winning) {
    let boardComponent = [];

    for (let i = 0; i < boardState.length; i++) {
        let row = boardState[i];
        for (let j = 0; j < row.length; j++) {
            let square = boardState[i][j];
            boardComponent.push(
                (<Square hit={square.hit} ship ={square.ship} x={i} y={j}
                     board={square.board} playing = {playing} winning = {winning}/>))
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

    // Confrim who's turn
    let playing;
    if (clickCount % 2 === 0) {
        playing = "board1";
    } else {
        playing = "board2";
    }

    // Confirm the winner
    let winner;
    let winning=false;
    let score1 = calculateScore(board1State);
    let score2 = calculateScore(board2State);

    if (gameType !== "free-play") {
        if (score2 >= 17) {
            winner = "Player";
            winning = true;
        }
        if (score1 >= 17) {
            winner = "AI";
            winning = true;
        }}

    const boardComponent1 = createBoardComponent(board1State, playing, winning);
    const boardComponent2 = createBoardComponent(board2State, playing, winning);

    // AI part
    const dispatch = useDispatch();
    if (playing === "board2") {
        let completeClick = false;
        while (!completeClick) {
            let randomNum1 = Math.floor(Math.random() * board1State.length);
            let randomNum2 = Math.floor(Math.random() * board1State[randomNum1].length);
            if (!board1State[randomNum1][randomNum2].hit) {
                dispatch({
                    type: 'boardClick',
                    x: randomNum1,
                    y: randomNum2,
                    board: board1State[randomNum1][randomNum2].board,
                    playing: playing,
                    hit: board1State[randomNum1][randomNum2].hit,
                })
                completeClick = true
            }

        }
    }

    // Bonus Point 1: Local Storage 
    // Dispatch part
    const [localStorageState, localStorageDispatch] = useContext(LocalStorageContext);
    if (!winning) {
        localStorageDispatch({
            type: "UPDATE",
            clickCount: clickCount,
            playing: playing,
        })
    } else {
        localStorageDispatch({
            type:"RESET",
        })
    }
    console.log(localStorageState['clickCount']);


    return (
        <div>
            <h2>{gameType + " battle game "}</h2>
            <div class="oneButton">
                <ResetButton text="Reset"/>
            </div>
            <h1>{(winner) ? "Game over! " + winner + " Won!" :""}</h1>
            <div class="boards">
                <div class={(gameType === "free-play")? "hidden" : "not-hidden"}>
                    <h3>Player</h3>
                    <div class="board" >
                        {boardComponent1}
                    </div>
                </div>
                <div>
                    <h3>AI</h3>
                    <div class="board">
                        {boardComponent2}
                    </div>
                </div>
            </div>
        </div>
    )
}