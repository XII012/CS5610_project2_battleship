// import SmallerSquare from "./SmallerSquare";
import React, { useContext, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import './Square.css';


export function Square(props) {

    const hit = props.hit;
    const ship = props.ship;
    let color = 'white';
    let content = '';

    const dispatch = useDispatch();

    if (ship) {
        content = "O";
    }

    if (hit && !ship) {
        color = "aqua";
    } else if(hit && ship) {
        color = "coral";
        content = "X";
    } else {
        color = "white";
    }

    if (props.board === "board2") {
        content = "";
    }


    if (props.winning) {
        return (<div id="square" class={color}> {content}</div>);
    } else {
        return (<div onClick={() => {
            dispatch({
                type: 'boardClick',
                x: props.x,
                y: props.y,
                board: props.board,
                playing: props.playing,
                hit: hit,
            })
        }
        } id="square" class={color}>
            {content}
        </div>);

    }
}

   // if (state === 'X') {
    //     setState('0');
    // } else if (state === '0') {
    //     setState('');
    // } else {
    //     setState('X')
    // }

// export function SmallerSquare(props) {
//     const [countState, setCountState] = useState(0)
//     return (<div onClick={() => setCountState(100 + countState)}>
//         Click Count: {countState}
//         </div>)
// }