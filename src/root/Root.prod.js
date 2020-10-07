import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginPage from '../containers/Login';
import RegistrationPage from '../containers/Registration';
import Homepage from '../containers/Homepage';
import QuestionView from '../containers/QuestionView';
import Question from '../containers/Problem';
import AccountsRating from '../containers/AccountsRating';
import ProblemSet from '../containers/ProblemSet';

import NavBar from '../components/NavBar/NavBar';
import NavBarItems from '../components/NavBar/NavBarItems';

import '../styles/App.css';
import PrivateRoute from './PrivateRoute';

const Root = () => (
  <div>
    <NavBar config={NavBarItems({ loggedIn: false })}>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/registration" component={RegistrationPage} />
        <PrivateRoute path="/question/:id" component={QuestionView} />
        <PrivateRoute path="/edit_question/:id" component={Question} />
        <PrivateRoute path="/rating" component={AccountsRating} />
        <PrivateRoute path="/problemset" component={ProblemSet} />
        <Route path="/" component={Homepage} />
      </Switch>
    </NavBar>
  </div>
);
export default Root;
