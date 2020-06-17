import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginPage from '../containers/Login';
import RegistrationPage from '../containers/Registration';
import Homepage from '../containers/HomePage';
import QuestionView from '../containers/QuestionView';
import Question from '../containers/Question';
import RatingPage from '../containers/RatingPage';
import Menu from '../components/Menu';

import '../styles/App.css';

const Root = () => (
  <div>
    <Menu />
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/registration" component={RegistrationPage} />
      <Route path="/viewQuestion" component={QuestionView} />
      <Route path="/question" component={Question} />
      <Route path="/rating" component={RatingPage} />
      <Route path="/" component={Homepage} />
    </Switch>
  </div>
);
export default Root;
