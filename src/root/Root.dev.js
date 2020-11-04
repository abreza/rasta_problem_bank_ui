import React, { Component } from 'react';
import DevTools from '../containers/DevTools';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginPage from '../containers/Login';
import RegistrationPage from '../containers/Registration';
import Homepage from '../containers/HomePage';
import ViewProblem from '../containers/ViewProblem';
import Problem from '../containers/Problem';
import ProblemSet from '../containers/ProblemSet';
import UsersRating from '../containers/UsersRating';
import NavBar from '../components/NavBar/NavBar';
import NavBarItems from '../components/NavBar/NavBarItems';
import Prompt from '../components/prompt/prompt'

import '../styles/App.css';
import PrivateRoute from './PrivateRoute';

import { logout } from '../redux/actions/account'


const Root = ({ isLoggedIn, username, logout }) => {
  return (
    <div>
      <NavBar config={NavBarItems({
        isLoggedIn: isLoggedIn,
        username: username,
        logout: logout,
      })}>
        <Switch>
          <Route path="/login" component={LoginPage} key={1} />
          <Route path="/registration" component={RegistrationPage} key={2} />
          <Route path="/problem/:id" component={ViewProblem} key={3} />
          <PrivateRoute path="/make_problem/" component={Problem} key={4} />
          <PrivateRoute path="/edit_problem/:id" component={Problem} key={5} />
          <PrivateRoute path="/problemset" component={ProblemSet} key={6} />
          <PrivateRoute path="/users_rating" component={UsersRating} key={7} />
          <Route path="/" component={Homepage} />
        </Switch>
        <DevTools />
      </NavBar>
      <Prompt />
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.account.isLoggedIn,
  username: state.account.username,
})

export default connect(mapStateToProps, { logout })(Root);
