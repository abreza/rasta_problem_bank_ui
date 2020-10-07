import React, { Component } from 'react';
import DevTools from '../containers/DevTools';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginPage from '../containers/Login';
import RegistrationPage from '../containers/Registration';
import Homepage from '../containers/HomePage';
import QuestionView from '../containers/ViewProblem';
import Question from '../containers/Problem';
import ProblemSet from '../containers/ProblemSet';
import UsersRating from '../containers/UsersRating';
import NavBar from '../components/NavBar/NavBar';
import NavBarItems from '../components/NavBar/NavBarItems';

import '../styles/App.css';
import PrivateRoute from './PrivateRoute';
import { logout } from '../redux/actions/account'


const NewProblem = () => {
  return (
    <Question isProblemNew={true} />
  )
}


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
            <PrivateRoute path="/problem/:id" component={QuestionView} isProblemNew />
            <PrivateRoute path="/make_problem/" component={NewProblem} />
            <PrivateRoute path="/edit_problem/:id" component={Question} />
            <PrivateRoute path="/problemset" component={ProblemSet} />
            <PrivateRoute path="/users_rating" component={UsersRating} />
            <Route path="/" component={Homepage} />
          </Switch>
          <DevTools />
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
