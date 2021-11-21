import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {

    return (<div class="WelcomePage">
        <h1>
        Welcome to Battleship Game!
        </h1>
        <div><Link to={"/gameBoard/normal"}>Play Normal Game</Link></div>
        <div><Link to={"/gameBoard/free-play"}>Play Free play Game</Link></div>
    </div>)

}
