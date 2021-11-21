import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './Board'
import { createStore} from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers/reducers';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import LandingPage from './LandingPage'
import Rules from './Rules';


const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store} >
    <h2>Kaiwen's Battleship</h2>
 
    <Router>
    <div class="header">
      <Link to={"/"}>Home</Link>
      <Link to={"/rules"}>Rules</Link>
    </div>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/gameBoard/:gameType" element={<Board />} />
        <Route path="/gameBoard" element={<LandingPage />} />
      </Routes>
    </Router>
  </Provider>,
  document.getElementById('root')
);

