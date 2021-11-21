// import SmallerSquare from "./SmallerSquare";
import React, { useContext, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import './Square.css';


export function Square(props) {

    const symbol = props.symbol;
    let borderColor = 'purpleBorder';
    if (symbol === '0') {
        borderColor = 'blueBorder';
    } else if (symbol === '') {
        borderColor = 'blackBorder';
    }

    const dispatch = useDispatch();

    return (<div onClick={() => {
        dispatch({
            type: 'boardClick',
            x: props.x,
            y: props.y,
            board: props.board,
        })
    }
    } id="square" class={borderColor}>
        {symbol}
    </div>);
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