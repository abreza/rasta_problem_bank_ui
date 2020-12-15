import React from 'react';
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
          <PrivateRoute path="/problem/:id" component={ViewProblem} key={Math.random()} />
          <PrivateRoute path="/makeProblem/" component={Problem} />
          <PrivateRoute path="/editProblem/:id" component={Problem} key={Math.random()} />
          <Route path="/problemset/page/:id" render={() => <ProblemSet key={Math.random()} />} />
          <PrivateRoute path="/users_rating" component={UsersRating} />
          <Route path="/" component={Homepage} />
        </Switch>
      </NavBar>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.account.isLoggedIn,
  username: state.account.username,
})

export default connect(
  mapStateToProps,
  {
    logout
  })(Root);
