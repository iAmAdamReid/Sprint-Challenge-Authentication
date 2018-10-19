import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Switch, Route, NavLink, withRouter} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import JokeList from './components/JokeList';
import Logout from './components/Logout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <NavLink to = '/'>Home</NavLink>
            <NavLink to ='/jokes'>Jokes</NavLink>
            <NavLink to = '/account'>My Account</NavLink>
            <NavLink to = '/logout'>Logout</NavLink>
          </nav>
        </header>
        <main>
          <Switch>
            <Route exact path = '/' component={Home} />
            <Route path = '/login' component = {Login} />
            <Route path = '/register' component = {Register} />
            <Route path = '/jokes' component = {JokeList} />
            <Route path = '/logout' component = {Logout} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default withRouter(App);
