import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';

import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import { initRedirect } from './redux/actions/redirect';
import { StylesProvider } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import ZeroJourneyerMuiTheme from './Theme/RtlMuiTheme';
import jss from './utils/jssRTL';

import Root from './root/Root';

const Toast = () => (
  <ToastContainer
    rtl
    position="top-left"
    autoClose={5000}
    transition={Slide}
    hideProgressBar={false}
    pauseOnHover={false}
    pauseOnFocusLoss={false}
    closeOnClick
    limit={3}
  />
);

const App = ({ redirectTo, initRedirect }) => {
  const history = useHistory();
  useEffect(() => {
    if (redirectTo !== null) {
      history.push(redirectTo);
      initRedirect();
    }
  }, [redirectTo, initRedirect, history]);

  return (
    <>
      <ThemeProvider theme={ZeroJourneyerMuiTheme}>
        <StylesProvider jss={jss}>
          <Toast />
          <Root />
        </StylesProvider>
      </ThemeProvider>
    </>
  );
};

const mapStateToProps = (state) => ({
  redirectTo: state.redirect.redirectTo,
});

export default connect(mapStateToProps, { initRedirect })(App);
