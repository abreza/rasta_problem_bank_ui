import React from 'react';
import DevTools from '../containers/DevTools';
import { Route, Switch } from 'react-router-dom';

import LoginPage from '../containers/Login';
import RegistrationPage from '../containers/Registration';
import Homepage from '../containers/HomePage';
import QuestionView from '../containers/QuestionView';
import Question from '../containers/Question';
import AccountsRating from '../containers/AccountsRating';
import Menu from '../components/Menu';
import ProblemSet from '../containers/ProblemSet';

import '../styles/App.css';

const Root = () => (
  <div>
    <Menu />
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/registration" component={RegistrationPage} />
      <Route path="/viewQuestion" component={QuestionView} />
      <Route path="/question" component={Question} />
      <Route path="/accountsrating" component={AccountsRating} />
      <Route path="/problemset" component={ProblemSet} />
      <Route path="/" component={Homepage} />
    </Switch>
    <DevTools />
  </div>
);
export default Root;
