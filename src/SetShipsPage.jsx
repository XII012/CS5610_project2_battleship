import React from 'react';
import Board from "./Board";
import Ship from './Ship';
import { useSelector } from 'react-redux';
import Button from "react-bootstrap/Button";
import './SetShipsPage.css'



export default function SetShipsPage() {

    const board1State = useSelector((state) => state.board1);

    let ships = [2, 3, 3, 4, 5];

    // get the indice of selected ships
    let selectedShipIndice = [];
    for (let i = 0; i < board1State.length; i++) {
        let row = board1State[i];
        for (let j = 0; j < row.length; j++) {
            let square = board1State[i][j];
            if (square.ship) {
                selectedShipIndice.push(square.ship-1);
            }
        }
    }

    selectedShipIndice = selectedShipIndice.filter((item,pos) =>(selectedShipIndice.indexOf(item) === pos))

    // let displayShips = [];
    // for (let i=0;i<ships.length;i++) {
    //     if (!(i in selectedShipIndice)) {
    //         displayShips.push(ships[i]);
    //         console.log(ships[i]);
    //     }
    // }
    // console.dir(selectedShipIndice);
    // console.dir(displayShips)


    // ships = ships.map((num)=><Ship num={num} id={ships.indexOf(num)+1}/>)
    console.dir(selectedShipIndice)
    for (let i=0;i<ships.length;i++) {
        ships[i] = <Ship hidden={selectedShipIndice.includes(i)} shipNum={ships[i]} shipId={i+1}/>;
    }


    return (
        <div>
            <h2>Set the ships</h2><br /><br />
            <div class="boards">
                
                <Board playing="board1" winning={false} boardState={board1State}/>
                <div class="dock">
                    <div class="ships">
                        {ships}
                    </div>
                    <Button href="/gameBoard/normal" variant="outline-primary" disabled={!ships.length > 0}>Start Game</Button>
                </div>
            </div>
        </div>
    )

}
