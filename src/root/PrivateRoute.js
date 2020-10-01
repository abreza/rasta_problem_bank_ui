import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = rest.isLoggedIn;
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.account.isLoggedIn,
})

export default connect(
  mapStateToProps,
  null
)(PrivateRoute);
