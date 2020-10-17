import React, { Component } from 'react';
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



class Root extends Component {

  render() {
    return (
      <div>
        <NavBar config={NavBarItems({
          isLoggedIn: this.props.isLoggedIn,
          username: this.props.username,
          logout: this.props.logout,
        })}>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/registration" component={RegistrationPage} />
            <Route path="/problem/:id" component={ViewProblem} />
            <PrivateRoute path="/make_problem/" component={Problem} />
            <PrivateRoute path="/edit_problem/:id" component={Problem} />
            <PrivateRoute path="/problemset" component={ProblemSet} />
            <PrivateRoute path="/users_rating" component={UsersRating} />
            <Route path="/" component={Homepage} />
          </Switch>
        </NavBar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.account.isLoggedIn,
  username: state.account.username,
})



export default connect(mapStateToProps, { logout })(Root);
