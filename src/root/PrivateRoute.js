import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux'

function PrivateRoute({ isLoggedIn, ...rest }) {
  return (
    <>
      {isLoggedIn ? (
        <Route {...rest} />
      ) : (
          <Route
            render={({ location }) => (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: location },
                }}
              />
            )}
          />
        )}
    </>
  );
}

const mapStateToProps = (state, ownProps) => ({
  isLoggedIn: state.account.token,
  ownProps,
})

export default connect(
  mapStateToProps,
  {}
)(PrivateRoute);
