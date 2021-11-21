import { useDispatch } from 'react-redux';
import { useState } from 'react';


export default function StartGame(props) {
    const { text } = props;

    const dispatch = useDispatch();

    const [disable, setDisable] = useState(false);

    return (
        <button disabled={disable} onClick={() => {
            dispatch({
                type: "START_RANDOM",
            });
            setDisable(true);
            }
        }>
            {text}
        </button>
    )
}