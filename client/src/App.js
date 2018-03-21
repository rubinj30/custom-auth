import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import './App.css';
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import HomePage from './components/HomePage'

class App extends Component {
  render() {
    return (
        <Router>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/login" component={LogIn} />
            </Switch>
        </Router>
    );
  }
}

export default App;
