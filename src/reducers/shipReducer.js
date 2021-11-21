const defaultShip ={
    five1: false,
    four1: false,
    three1: false,
    three2: false,
    two1: false,
    one1: false,
}

function generateShipState() {
    return defaultShip;
}

export default function shipReducer(state, action) {
    if (state === undefined) {
        return generateShipState()
    }

    
}