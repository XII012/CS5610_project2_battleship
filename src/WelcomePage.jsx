import React from 'react';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";

export default function WelcomePage() {

    return (<div class="WelcomePage">
        <div class="oneButton">
            <br />
            <Button href="/gameBoard" variant="outline-primary">Play Battleship Game</Button>
        </div>
    </div>)

}
