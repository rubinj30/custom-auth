import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import './App.css';
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import HomePage from './components/HomePage'
import UserProfile from './components/UserProfile'

class App extends Component {
  render() {
    return (
        <Router>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/login" component={LogIn} />
              <Route exact path="/:emailAddress" component={UserProfile} />
            </Switch>
        </Router>
    );
  }
}

export default App;
