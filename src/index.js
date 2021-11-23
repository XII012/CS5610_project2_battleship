import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers/reducers';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import LandingPage from './LandingPage'
import RulesPage from './RulesPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar ,Container} from 'react-bootstrap';
import { LocalStorageProvider } from './LocalStorageProvider'
import SetShipsPage from './SetShipsPage';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PlayPage from './PlayPage';


// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
// import { PersistGate } from 'redux-persist/integration/react'


const store = createStore(reducers);

// const persistConfig = {
//   key: 'root',
//   storage,
// }

// const persistedReducer = persistReducer(persistConfig, reducers)

// let store = createStore(persistedReducer)
// let persistor = persistStore(store)
<DndProvider backend={HTML5Backend}>...</DndProvider>

ReactDOM.render(
  <LocalStorageProvider>
    <Provider store={store} >
      <DndProvider backend={HTML5Backend}>
        <Navbar bg="primary" variant="dark" sticky="top">
          <Container>
            <Navbar.Brand href="/">Kaiwen's Battleship</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/rules">Rules</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
    
        <Router>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/rules" element={<RulesPage />} />
            <Route path="/gameBoard" element={<LandingPage />} />
            {/* <Route path="/setShips" element={<SetShipsPage />} /> */}
            <Route path="/gameBoard/:gameType" element={<PlayPage />} />
          </Routes>
        </Router>
      </DndProvider>
    </Provider>
  </LocalStorageProvider>,
  document.getElementById('root')
);

