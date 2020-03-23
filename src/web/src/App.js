import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Container, BottomNavigation, BottomNavigationAction, AppBar} from '@material-ui/core'
import { AccessAlarm, WbIncandescentOutlined, List, Settings  } from '@material-ui/icons';
import { BrowserRouter as Router, Route, Link, useHistory } from 'react-router-dom';
import Problems from "./problems/problems";
import Layout from "./layout";

function App() {


  return (
    <Router>
    <Container>
      {/*<header className="App-header">*/}
      {/*  <img src={logo} className="App-logo" alt="logo" />*/}
      {/*  <p>*/}
      {/*    Edit <code>src/App.js</code> and save to reload.*/}
      {/*  </p>*/}
      {/*  <a*/}
      {/*    className="App-link"*/}
      {/*    href="https://reactjs.org"*/}
      {/*    target="_blank"*/}
      {/*    rel="noopener noreferrer"*/}
      {/*  >*/}
      {/*    Learn React*/}
      {/*  </a>*/}
      {/*</header>*/}

      <Layout/>

    </Container>
    </Router>
  );
}

export default App;
