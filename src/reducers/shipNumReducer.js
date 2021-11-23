

export default function shipNumReducer(
    state = 0, action
) {
    if (action.type === 'SHIP_DRAGGED' && action.board === "board1") {
        return action.shipNum;
    }
    if (action.type === 'SHIP_NOT_DRAGGED') {
        return 0;
    }
    return state;
}