import React, { Component } from 'react';
import DevTools from '../containers/DevTools';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginPage from '../containers/Login';
import RegistrationPage from '../containers/Registration';
import Homepage from '../containers/Homepage';
import QuestionView from '../containers/QuestionView';
import Question from '../containers/Question';
import ProblemSet from '../containers/ProblemSet';
import UsersRating from '../containers/UsersRating';
import NavBar from '../components/NavBar/NavBar';
import NavBarItems from '../components/NavBar/NavBarItems';

import '../styles/App.css';
import PrivateRoute from './PrivateRoute';

class Root extends Component {

  render() {
    return (
      <div>
        <NavBar config={NavBarItems({ loggedIn: this.props.loggedIn, user: this.props.user })}>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/registration" component={RegistrationPage} />
            <PrivateRoute path="/question/:id" component={QuestionView} />
            <PrivateRoute path="/create_question/" component={Question} />
            <PrivateRoute path="/edit_question/:id" component={Question} />
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
  loggedIn: state.loggedIn,
  user: state.user
})

export default connect(mapStateToProps)(Root);
