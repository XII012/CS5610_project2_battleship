import React from 'react';
import { Link } from 'react-router-dom';

export default function WelcomePage() {

    return (<div class="WelcomePage">
        <h1>
        Welcome to Battleship Game!
        </h1>
        <div><Link to={"/gameBoard"}>Play Battleship Game</Link></div>
    </div>)

}
