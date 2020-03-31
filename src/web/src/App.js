import React from 'react';
import './App.css';
import {Container} from '@material-ui/core'
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from "./layout";

function App() {
  return (
    <Router>
    <Container>
      <Layout/>
    </Container>
    </Router>
  );
}

export default App;
