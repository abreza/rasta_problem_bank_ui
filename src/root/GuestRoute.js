import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const GuestRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = rest.isLoggedIn;
  return (
    <Route
      {...rest}
      render={(props) =>
        !isLoggedIn ? (
          <Component {...props} />
        ) : (
            <Redirect to='/' />
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
  {}
)(GuestRoute);
