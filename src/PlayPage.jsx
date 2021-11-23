import Board from './components/Board';
import { useSelector } from 'react-redux';
import ResetButton from './components/ResetButton';
// import StartGame from './StartGameButton'
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { LocalStorageContext } from './LocalStorageProvider';
import React, { useContext, useEffect, useState } from 'react';
import './styles/PlayPage.css';
import Ship from './components/Ship';
import Button from "react-bootstrap/Button";


function calculateScore(boardState) {
    let score = 0;
    for (let i = 0; i < boardState.length; i++) {
        let row = boardState[i];
        for (let j = 0; j < row.length; j++) {
            let square = boardState[i][j];
            if ((square.ship !== undefined) && square.hit) {
                score += 1;
            }
        }
    }

    return score;
}

export default function PlayPage() {

    const gameType = useParams().gameType;
    const clickCount = useSelector((state) => state.clickCount);
    const board1State = useSelector((state) => state.board1);
    const board2State = useSelector((state) => state.board2);


    let ships = [2, 3, 3, 4, 5];

    // get the indice of selected ships
    let selectedShipIndice = [];
    for (let i = 0; i < board1State.length; i++) {
        let row = board1State[i];
        for (let j = 0; j < row.length; j++) {
            let square = board1State[i][j];
            if (square.ship !== undefined) {
                selectedShipIndice.push(square.ship);
            }
        }
    }

    selectedShipIndice = selectedShipIndice.filter((item,pos) =>(selectedShipIndice.indexOf(item) === pos))

    console.dir(selectedShipIndice)
    for (let i=0;i<ships.length;i++) {
        ships[i] = <Ship hidden={selectedShipIndice.includes(i)} shipNum={ships[i]} shipId={i}/>;
    }



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

    if (gameType === "normal") {
        if (score2 >= 17) {
            winner = "Player";
            winning = true;
        }
        if (score1 >= 17) {
            winner = "AI";
            winning = true;
        }
    }

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
                    <Board playing={playing} winning={winning} boardState={board1State}/>
                </div>

                <div class={((selectedShipIndice.length >= 5) || (gameType === "free-play"))? "not-hidden" : "hidden"}>
                    <h3>AI</h3>
                    <Board playing={playing} winning={winning} boardState={board2State}/>
                </div>

                <div class={((selectedShipIndice.length >= 5) || (gameType === "free-play") ) ? "hidden" : "not-hidden"}>
                    <div class="dock">
                        <div class="ships">
                            {ships}
                        </div>
                        {/* <Button href="/gameBoard/normal" variant="outline-primary" disabled={!ships.length > 0}>Start Game</Button> */}
                    </div>
                </div>
            </div>
        </div>
    )

}
