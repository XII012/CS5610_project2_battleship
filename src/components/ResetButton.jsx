import React from 'react';
import { useDispatch } from 'react-redux';
import Button from "react-bootstrap/Button";



export default function ResetButton(props) {
    const { text } = props;

    const dispatch = useDispatch();

    return (
            <Button variant="outline-primary" onClick={
                () => dispatch({
                    type: "RESET",
                })
    
            }>
                {text}
            </Button>
    )
}