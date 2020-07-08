import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginPage from '../containers/Login';
import RegistrationPage from '../containers/Registration';
import Homepage from '../containers/Homepage';
import QuestionView from '../containers/QuestionView';
import Question from '../containers/Question';
import RatingPage from '../containers/RatingPage';
import ResponsiveContainer from '../containers/ResponsiveContainer';

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
        <Route path="/rating" component={RatingPage} />
        <Route path="/" component={Homepage} />
      </Switch>
    </ResponsiveContainer>
  </div>
);
export default Root;

//TODO: some changes in "Root.dev.js" are not applied here