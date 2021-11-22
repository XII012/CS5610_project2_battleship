import React, { useReducer } from 'react';

export const LocalStorageContext = React.createContext();

function LocalStorageReducer(state, action) {
    if (action.type === "UPDATE") {
      state['clickCount'] = action.clickCount;
      state['playing'] = action.playing;
        return state;
    }
    if (action.type === "RESET") {
      resetStore(state);
        return state;
    }
    return state;
}

function resetStore(store) {
  store['clickCount'] = 0;
  store['playing'] = 'board1';
}


// Bonus Point 1: Local Storage
// Just to track some useful information in this storage
export function LocalStorageProvider(props) {
  const myStore = localStorage;
  resetStore(myStore);
  
  const [state, dispatch] = useReducer(LocalStorageReducer, myStore);

  return <LocalStorageContext.Provider value={[state, dispatch]}>
      {props.children}
  </LocalStorageContext.Provider>
} 