import React from 'react';
import Button from "react-bootstrap/Button";

export default function LandingPage() {

    return (<div class="LandingPage">
        <div class = "twoButtons">
            <br />
            <Button href="/gameBoard/normal" variant="outline-primary">Play Normal Game</Button><br />
            <Button href="/gameBoard/free-play" variant="outline-primary">Play Free-play Game</Button>
        </div>
    </div>)

}
