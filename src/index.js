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
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar ,Container} from 'react-bootstrap';


const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store} >
    {/* <h1>Kaiwen's Battleship</h1> */}

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
    {/* <div class="header">
      <Link to={"/"}>Home</Link>
      <Link to={"/rules"}>Rules</Link>
    </div> */}
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

