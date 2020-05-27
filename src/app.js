import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import Menu from './components/Menu';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: 'NOT_LOGGED_IN',
      user: {},
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  async checkLoginStatus() {
    const response = await axios.get('http://localhost:3001/logged_in', {
      withCredentials: true,
    });

    if (
      response.data.logged_in &&
      this.state.loggedInStatus === 'NOT_LOGGED_IN'
    ) {
      this.setState({
        loggedInStatus: 'LOGGED_IN',
        user: response.data.user,
      });
    } else if (
      !response.data.logged_in &
      (this.state.loggedInStatus === 'LOGGED_IN')
    ) {
      this.setState({
        loggedInStatus: 'NOT_LOGGED_IN',
        user: {},
      });
    }
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  async handleLogout() {
    await axios.delete('http://localhost:3001/logout', {
      withCredentials: true,
    });

    this.setState({
      loggedInStatus: 'NOT_LOGGED_IN',
      user: {},
    });
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: 'LOGGED_IN',
      user: data.user,
    });
  }

  render() {
    return (
      <Router>
        <Menu handleLogout={this.handleLogout} />
        <Switch>
          <Route path="/login">
            <Login handleLogin={this.handleLogin} />
          </Route>
          <Route path="/registration">
            <Registration handleLogin={this.handleLogin} />
          </Route>
        </Switch>
      </Router>
    );
  }
}
