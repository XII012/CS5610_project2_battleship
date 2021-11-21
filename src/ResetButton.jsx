import React from 'react';
import { useDispatch } from 'react-redux';


export default function ResetButton(props) {
    const { text } = props;

    const dispatch = useDispatch();

    return (
        <button onClick={
            () => dispatch({
                type: "RESET",
            })

        }>
            {text}
        </button>
    )
}