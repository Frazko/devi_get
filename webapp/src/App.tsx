import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import './App.css';
import About from './pages/About';
import Home from './pages/Home';
import Board from './pages/Board';

const linksStyle = {padding: '10px', margin: '10px'};
function App() {

  return (
    <div className="App">
      <Router>
        <div>
          <Typography style={linksStyle} >
            <Link href="/" style={linksStyle}>
              Home
            </Link>
            <Link href="/about" style={linksStyle}>
              About
            </Link>
          </Typography>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/board">
              <Board />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
