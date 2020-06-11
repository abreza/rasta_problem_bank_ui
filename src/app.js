import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import Menu from './components/Menu';
import Question from './components/question/Question';
import AccountList from './components/AccountList';
import './styles/App.css';
import QuestionView from './components/question/QuestionView';
import Tag from './components/question/Tag';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Menu handleLogout={this.handleLogout} />
        <Switch>
          <Route path="/login">
            <Login handleLogin={this.handleLogin} />
          </Route>
          <Route path="/tag">
            <Tag tag="salam"></Tag>
          </Route>
          <Route path="/viewQuestion">
            <QuestionView />
          </Route>
          <Route path="/question">
            <Question />
          </Route>
          <Route path="/registration">
            <Registration handleLogin={this.handleLogin} />
          </Route>
          <Route path="/rating">
            <AccountList />
          </Route>
        </Switch>
      </Router>
    );
  }
}
