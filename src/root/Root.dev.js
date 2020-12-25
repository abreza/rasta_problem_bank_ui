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
import NavBar from '../components/NavBar/NavBar';
import NavBarItems from '../components/NavBar/NavBarItems';

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
          <Route path="/login" component={LoginPage} />
          <Route path="/registration" component={RegistrationPage} />
          <PrivateRoute path="/problem/:id" component={ViewProblem} />
          <PrivateRoute path="/makeProblem/" component={Problem} />
          <PrivateRoute path="/editProblem/:id" component={Problem} />
          <PrivateRoute path="/problemset/page/:id" render={() => <ProblemSet key={Math.random()} />} />
          <Route path="/" component={Homepage} />
        </Switch>
        <DevTools />
      </NavBar>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.account.token,
})

export default connect(mapStateToProps, { logout })(Root);