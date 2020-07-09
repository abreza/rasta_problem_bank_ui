import React from 'react';
import DevTools from '../containers/DevTools';
import { Route, Switch } from 'react-router-dom';

import LoginPage from '../containers/Login';
import RegistrationPage from '../containers/Registration';
import Homepage from '../containers/HomePage';
import QuestionView from '../containers/QuestionView';
import Question from '../containers/Question';
import ResponsiveContainer from '../containers/ResponsiveContainer';
import AccountsRating from '../containers/AccountsRating';
import Menu from '../components/Menu';
import ProblemSet from '../containers/ProblemSet';

import '../styles/App.css';
import HomepageHeading from '../components/homepage/HomepageHeading';

const Root = () => (
  <div>
    <ResponsiveContainer heading={HomepageHeading}>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/registration" component={RegistrationPage} />
        <Route path="/question/:id" component={QuestionView} />
        <Route path="/edit_question/:id" component={Question} />
        <Route path="/rating" component={AccountsRating} />
        <Route path="/problemset" component={ProblemSet} />
        <Route path="/" component={Homepage} />
      </Switch>
      <DevTools />
    </ResponsiveContainer>
  </div>
);
export default Root;
